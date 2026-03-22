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
    // [1] 봇 차단
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
    });
    const verification = await verifyRes.json();
    if (!verification.success) return res.status(403).json({ success: false, error: 'Bot detected.' });

    // [2] Twilio 통신사 정밀 조회
    let carrierName = "Unknown";
    let lineType = "Unknown";
    if (twilioClient && phoneDigits.length === 10) {
      try {
        const lookup = await twilioClient.lookups.v2.phoneNumbers(`+1${phoneDigits}`).fetch({ fields: 'line_type_intelligence' });
        carrierName = lookup.lineTypeIntelligence?.carrier_name || "Unknown";
        lineType = lookup.lineTypeIntelligence?.type || "Unknown"; // mobile, landline, voip 등
      } catch (e) { console.error("Twilio Error:", e.message); }
    }

    // [3] v10.1 정밀 분석 엔진
    let finalBrief = "V10.1 Analysis: ";
    let finalScore = 5;
    const text = (leadData.narrative || "").toLowerCase();

    // 키워드 분석
    const scoringMap = [
      { key: ["truck", "18-wheeler", "semi"], score: 3, label: "Commercial Vehicle" },
      { key: ["hospital", "surgery", "ambulance"], score: 3, label: "Severe Medical" },
      { key: ["broken", "fracture", "spine"], score: 2, label: "Critical Injury" }
    ];

    let detectedTags = [];
    scoringMap.forEach(item => {
      if (item.key.some(k => text.includes(k))) {
        finalScore += item.score;
        detectedTags.push(item.label);
      }
    });

    // [중요] VOIP(인터넷전화) 페널티 로직
    let grade = "Standard";
    if (lineType === 'voip') {
      finalScore -= 5; // 점수 폭락
      detectedTags.push("VOIP DETECTED (Low Quality)");
      grade = "Low-Quality (VOIP)";
    } else if (finalScore >= 8 && lineType === 'mobile') {
      grade = "High-Value";
    }

    finalScore = Math.max(0, Math.min(10, finalScore));
    finalBrief += detectedTags.length > 0 ? detectedTags.join(" | ") : "Standard Case";

    // [4] DB 저장
    delete leadData['cf-turnstile-response'];
    const { error } = await supabase.from('leads').insert([{
      ...leadData,
      ip_address: ip,
      carrier_name: carrierName,
      line_type: lineType,
      ai_brief: finalBrief,
      ai_score: finalScore,
      lead_grade: grade // 여기서 'Low-Quality'가 찍힙니다.
    }]);

    if (error) throw error;
    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
