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
    // [1] Cloudflare 검증
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
        const lookup = await twilioClient.lookups.v2.phoneNumbers(`+1${phoneDigits}`)
          .fetch({ fields: 'line_type_intelligence' });
        carrierName = lookup.lineTypeIntelligence?.carrier_name || "Unknown";
        lineType = lookup.lineTypeIntelligence?.type || "Unknown";
      } catch (e) { console.error("Twilio Error:", e.message); }
    }

    // [3] AI 분석 (에러 디버깅 강화 버전)
    let aiBrief = "Pending Analysis";
    let aiScore = 5;
    const text = (leadData.narrative || "").toLowerCase();

    if (!genAI) {
      aiBrief = "Error: GEMINI_API_KEY is missing in Vercel settings.";
    } else if (text.length < 5) {
      aiBrief = "Error: Narrative too short for AI analysis.";
    } else {
      // 구글 모델들을 순차적으로 시도
      const models = ["gemini-1.5-flash", "gemini-pro"];
      let lastError = "";

      for (const modelName of models) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(`Analyze accident: "${text}". Return ONLY JSON: {"brief": "summary", "score": 1-10}`);
          const response = await result.response;
          const aiRes = JSON.parse(response.text().replace(/```json|```/g, "").trim());
          aiBrief = aiRes.brief;
          aiScore = aiRes.score;
          lastError = ""; // 성공 시 에러 초기화
          break; 
        } catch (e) {
          lastError = `[${modelName}] ${e.message}`;
        }
      }
      
      // 모든 모델 실패 시 에러 내용 기록
      if (lastError) {
        aiBrief = `AI Analysis failed. Error: ${lastError}`;
      }
    }

    // [4] AI 실패 시 수동 키워드 보정 (사령관님 로직)
    if (aiBrief.includes("failed") || aiBrief.includes("Error")) {
      if (text.includes("truck") || text.includes("18-wheeler")) aiScore += 3;
      if (text.includes("hospital") || text.includes("er") || text.includes("surgery")) aiScore += 2;
      if (text.includes("broken") || text.includes("fracture")) aiScore += 2;
      if (aiScore > 10) aiScore = 10;
    }

    // [5] 최종 저장
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
