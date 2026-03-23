import { createClient } from '@supabase/supabase-js';
import twilio from 'twilio';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const twilioClient = (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) 
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN) : null;

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    try {
        const leadData = req.body;
        const token = leadData['cf-turnstile-response'];
        const phoneDigits = (leadData.phone || "").replace(/\D/g, '');
        const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

        // [1] Cloudflare Turnstile 봇 체크
        const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
        });
        const verification = await verifyRes.json();
        if (!verification.success) return res.status(403).json({ success: false, error: 'Bot detected.' });

        // [2] Twilio 통신사 정밀 조회
        let carrierName = "Unknown", lineType = "Unknown";
        if (twilioClient && phoneDigits.length === 10) {
            try {
                const lookup = await twilioClient.lookups.v2.phoneNumbers(`+1${phoneDigits}`).fetch({ fields: 'line_type_intelligence' });
                carrierName = lookup.lineTypeIntelligence?.carrier_name || "Unknown";
                lineType = lookup.lineTypeIntelligence?.type || "Unknown";
            } catch (e) { console.error("Twilio Error:", e.message); }
        }

        // [3] AI 점수 분석 엔진 (V10.1)
        let finalScore = 5;
        let detectedTags = [];
        const narrativeText = (leadData.narrative || "").toLowerCase();

        const scoringMap = [
            { key: ["truck", "18-wheeler", "semi"], score: 3, label: "Commercial Vehicle" },
            { key: ["hospital", "surgery", "ambulance"], score: 3, label: "Severe Medical" },
            { key: ["broken", "fracture", "spine"], score: 2, label: "Critical Injury" }
        ];

        scoringMap.forEach(item => {
            if (item.key.some(k => narrativeText.includes(k))) {
                finalScore += item.score;
                detectedTags.push(item.label);
            }
        });

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
        const { error } = await supabase.from('leads').insert([{
            first_name: leadData.fName,
            last_name: leadData.lName,
            email: leadData.email,
            phone: phoneDigits,
            state: leadData.state,
            case_type: leadData.type,
            fault_status: leadData.fault,
            medical_status: leadData.med,
            police_report: leadData.police,
            has_attorney: leadData.atty,
            narrative: leadData.narrative,
            ip_address: ip,
            carrier_name: carrierName,
            line_type: lineType,
            ai_score: finalScore,
            ai_brief: detectedTags.join(" | ") || "Standard Case",
            lead_grade: grade
        }]);

        if (error) throw error;
        return res.status(200).json({ success: true, grade });

    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
