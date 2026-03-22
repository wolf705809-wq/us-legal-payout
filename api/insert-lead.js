import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from "@google/generative-ai";
const twilio = require('twilio');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;
const twilioClient = (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) 
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN) : null;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const leadData = req.body;
  const token = leadData['cf-turnstile-response'];
  const phoneDigits = leadData.phone.replace(/\D/g, '');
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;

  try {
    // [1] Cloudflare 봇 검증
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
    });
    const verification = await verifyRes.json();
    if (!verification.success) return res.status(403).json({ success: false, error: 'Bot detected.' });

    // [2] Twilio 통신사 조회
    let carrierName = "Unknown";
    let lineType = "Unknown";
    if (twilioClient && phoneDigits.length === 10) {
      try {
        const lookup = await twilioClient.lookups.v2.phoneNumbers(`+1${phoneDigits}`).fetch({ fields: 'line_type_intelligence' });
        carrierName = lookup.lineTypeIntelligence?.carrier_name || "Unknown";
        lineType = lookup.lineTypeIntelligence?.type || "Unknown";
      } catch (e) { console.error("Twilio Error:", e.message); }
    }

    // [3] AI 분석 (정식 모델명 사용 및 에러 핸들링)
    let aiBrief = "Pending Analysis";
    let aiScore = 5;
    const text = (leadData.narrative || "").toLowerCase();

    if (genAI && text.length > 5) {
      try {
        // 가장 안정적인 gemini-1.5-flash 모델 사용
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Analyze this accident description: "${text}". 
        Provide a 1-sentence summary and a score from 1-10 based on severity (trucks, injuries, surgery are high score). 
        Return ONLY valid JSON format like this: {"brief": "summary here", "score": 10}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text().replace(/```json|```/g, "").trim();
        const aiRes = JSON.parse(responseText);
        
        aiBrief = aiRes.brief;
        aiScore = aiRes.score;
      } catch (aiErr) {
        // AI 실패 시 사령관님의 v9.3 키워드 엔진 자동 가동
        aiBrief = `Manual Analysis (AI logic applied)`;
        if (text.includes("truck") || text.includes("18-wheeler")) aiScore += 3;
        if (text.includes("hospital") || text.includes("surgery") || text.includes("broken")) aiScore += 4;
        if (aiScore > 10) aiScore = 10;
      }
    }

    // [4] 데이터 최종 저장
    delete leadData['cf-turnstile-response'];
    const { error } = await supabase.from('leads').insert([{
      ...leadData,
      ip_address: ip,
      carrier_name: carrierName,
      line_type: lineType,
      ai_brief: aiBrief,
      ai_score: aiScore,
      lead_grade: (aiScore >= 8 && lineType === 'mobile') ? 'High-Value' : 'Standard'
    }]);

    if (error) throw error;
    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
