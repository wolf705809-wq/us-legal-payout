// index.js (Vercel/Node.js 환경)
import { createClient } from '@supabase/supabase-js';
import twilio from 'twilio'; // require 대신 import 사용

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Twilio 클라이언트를 핸들러 외부에서 초기화 (재사용성)
const twilioClient = (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) 
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN) : null;

export default async function handler(req, res) {
    // CORS 처리 (필요시)
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    try {
        const leadData = req.body;
        const { 
            fName, lName, email, phone, narrative, 
            state, type, fault, med, police, atty,
            'cf-turnstile-response': token 
        } = leadData;

        const phoneDigits = phone.replace(/\D/g, '');

        // [1] Cloudflare Turnstile (봇 차단) 검증
        const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
        });
        const verification = await verifyRes.json();
        if (!verification.success) {
            return res.status(403).json({ success: false, error: '보안 검증에 실패했습니다. (Bot detected)' });
        }

        // [2] Twilio 통신사 조회 (VOIP 여부 확인)
        let carrierName = "Unknown";
        let lineType = "Unknown";
        if (twilioClient && phoneDigits.length === 10) {
            try {
                const lookup = await twilioClient.lookups.v2.phoneNumbers(`+1${phoneDigits}`).fetch({ fields: 'line_type_intelligence' });
                carrierName = lookup.lineTypeIntelligence?.carrier_name || "Unknown";
                lineType = lookup.lineTypeIntelligence?.type || "Unknown";
            } catch (e) { console.error("Twilio Error:", e.message); }
        }

        // [3] AI 정밀 분석 엔진 (V10.1)
        let finalScore = 5;
        let detectedTags = [];
        const textContent = (narrative || "").toLowerCase();

        const scoringMap = [
            { key: ["truck", "18-wheeler", "semi", "commercial"], score: 3, label: "Commercial Vehicle" },
            { key: ["hospital", "surgery", "ambulance", "er"], score: 3, label: "Severe Medical" },
            { key: ["broken", "fracture", "spine", "brain"], score: 2, label: "Critical Injury" }
        ];

        scoringMap.forEach(item => {
            if (item.key.some(k => textContent.includes(k))) {
                finalScore += item.score;
                detectedTags.push(item.label);
            }
        });

        // VOIP 페널티 및 등급 판정
        let grade = "Standard";
        if (lineType === 'voip') {
            finalScore -= 5;
            detectedTags.push("VOIP (Low Quality)");
            grade = "Low-Quality";
        } else if (finalScore >= 8 && lineType === 'mobile') {
            grade = "High-Value";
        }

        finalScore = Math.max(0, Math.min(10, finalScore));

        // [4] DB 저장 (Supabase)
        const { error: dbError } = await supabase.from('leads').insert([{
            first_name: fName,
            last_name: lName,
            email: email,
            phone: phoneDigits,
            narrative: narrative,
            state: state,
            case_type: type,
            fault_status: fault,
            medical_status: med,
            police_report: police,
            has_attorney: atty,
            ip_address: req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress,
            carrier_name: carrierName,
            line_type: lineType,
            ai_score: finalScore,
            ai_brief: detectedTags.join(" | ") || "Standard Case",
            lead_grade: grade
        }]);

        if (dbError) throw dbError;

        return res.status(200).json({ success: true, grade: grade });

    } catch (err) {
        console.error("API Error:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
}
