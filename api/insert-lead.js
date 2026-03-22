import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from "@google/generative-ai";
const twilio = require('twilio');

// 1. 환경 변수 로드
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
    // [검증 1] Cloudflare 봇 차단
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
    });
    const verification = await verifyRes.json();
    if (!verification.success) return res.status(403).json({ success: false, error: 'Bot detected.' });

    // [검증 2] Twilio 통신사 조회 (경제적 우량성 확인)
    let carrierName = "Unknown";
    let lineType = "Unknown";
    if (twilioClient && phoneDigits.length === 10) {
      try {
        const lookup = await twilioClient.lookups.v2.phoneNumbers(`+1${phoneDigits}`)
          .fetch({ fields: 'line_type_intelligence' });
        carrierName = lookup.lineTypeIntelligence?.carrier_name || "Unknown";
        lineType = lookup.lineTypeIntelligence?.type || "Unknown";
      } catch (e) { console.error("Twilio Lookup Error:", e.message); }
    }

    // [검증 3] AI 사고 분석 (이중 백업 로직)
    let aiBrief = "AI Analysis skipped. Manual keywords applied.";
    let aiScore = 5; // 기본 시작 점수
    const narrativeText = (leadData.narrative || "").toLowerCase();

    // AI 시도
    if (genAI && narrativeText.length > 5) {
      const modelNames = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
      for (const modelName of modelNames) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(`Analyze accident: "${narrativeText}". Return strictly JSON: {"brief": "3 key points", "score": number 1-10}`);
          const aiRes = JSON.parse(result.response.text().replace(/```json|```/g, "").trim());
          aiBrief = aiRes.brief;
          aiScore = aiRes.score;
          break; // 성공 시 중단
        } catch (e) { console.log(`${modelName} failed, trying next...`); }
      }
    }

    // [로직 보정] AI 실패 시 사령관님의 v9.3 키워드 로직 강제 가동
    if (aiBrief.includes("skipped")) {
      if (narrativeText.includes("truck") || narrativeText.includes("18-wheeler")) aiScore += 3;
      if (narrativeText.includes("hospital") || narrativeText.includes("er")) aiScore += 2;
      if (narrativeText.includes("broken") || narrativeText.includes("spine")) aiScore += 2;
      if (aiScore > 10) aiScore = 10;
    }

    // [최종 데이터 조립]
    delete leadData['cf-turnstile-response'];
    const finalLead = {
      ...leadData,
      ip_address: ip,
      carrier_name: carrierName,
      line_type: lineType,
      ai_brief: aiBrief,
      ai_score: aiScore,
      lead_grade: (aiScore >= 8 && lineType === 'mobile') ? 'High-Value' : 'Standard'
    };

    // [DB 저장]
    const { error } = await supabase.from('leads').insert([finalLead]);
    if (error) throw error;

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Critical Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}
