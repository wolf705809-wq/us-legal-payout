import { createClient } from '@supabase/supabase-js';
const twilio = require('twilio');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
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
    // [1] 봇 차단 (Cloudflare)
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
    });
    const verification = await verifyRes.json();
    if (!verification.success) return res.status(403).json({ success: false, error: 'Bot detected.' });

    // [2] 통신사 조회 (Twilio)
    let carrierName = "Unknown";
    let lineType = "Unknown";
    if (twilioClient && phoneDigits.length === 10) {
      try {
        const lookup = await twilioClient.lookups.v2.phoneNumbers(`+1${phoneDigits}`).fetch({ fields: 'line_type_intelligence' });
        carrierName = lookup.lineTypeIntelligence?.carrier_name || "Unknown";
        lineType = lookup.lineTypeIntelligence?.type || "Unknown";
      } catch (e) { console.error("Twilio Lookup Error:", e.message); }
    }

    // [3] v10.0 고정밀 키워드 분석 엔진 (AI 대체)
    let finalBrief = "System V10.0 Analysis: ";
    let finalScore = 5; // 기본 점수
    const text = (leadData.narrative || "").toLowerCase();

    // 키워드별 가중치 부여
    const scoringMap = [
      { key: ["truck", "18-wheeler", "semi", "commercial"], score: 3, label: "Commercial Vehicle" },
      { key: ["hospital", "er", "surgery", "ambulance", "icu"], score: 3, label: "Severe Medical" },
      { key: ["broken", "fracture", "spine", "neck", "brain"], score: 2, label: "Critical Injury" },
      { key: ["police", "report", "citation"], score: 1, label: "Law Enforcement Involved" }
    ];

    let detectedTags = [];
    scoringMap.forEach(item => {
      if (item.key.some(k => text.includes(k))) {
        finalScore += item.score;
        detectedTags.push(item.label);
      }
    });

    finalScore = Math.min(10, finalScore);
    finalBrief += detectedTags.length > 0 ? detectedTags.join(" | ") : "Standard Personal Injury Case";

    // [4] 최종 데이터 저장
    delete leadData['cf-turnstile-response'];
    const { error } = await supabase.from('leads').insert([{
      ...leadData,
      ip_address: ip,
      carrier_name: carrierName,
      line_type: lineType,
      ai_brief: finalBrief, // 이름은 유지하되 내용은 우리가 만든 분석글로!
      ai_score: finalScore,
      lead_grade: (finalScore >= 8 && lineType === 'mobile') ? 'High-Value' : 'Standard'
    }]);

    if (error) throw error;
    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("Critical System Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}
