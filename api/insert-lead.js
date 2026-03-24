import { createClient } from '@supabase/supabase-js';
import twilio from 'twilio';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const twilioClient =
    process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
        ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
        : null;

const isProduction =
    process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 40;
const rateState = new Map();

function allowRateLimit(ip) {
    if (!ip || ip === 'unknown') return true;
    const now = Date.now();
    let entry = rateState.get(ip);
    if (!entry || now > entry.resetAt) {
        entry = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
        rateState.set(ip, entry);
        return true;
    }
    entry.count += 1;
    return entry.count <= RATE_LIMIT_MAX;
}

function sanitizeStr(value, maxLen) {
    if (value == null) return '';
    const s = String(value).trim();
    return s.length > maxLen ? s.slice(0, maxLen) : s;
}

function parseBody(req) {
    if (req.body == null) return {};
    if (typeof req.body === 'string') {
        try {
            return JSON.parse(req.body);
        } catch {
            return {};
        }
    }
    return req.body;
}

function clientIp(req) {
    const xf = req.headers['x-forwarded-for'];
    if (typeof xf === 'string' && xf.length) {
        return xf.split(',')[0].trim();
    }
    return req.socket?.remoteAddress || '';
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    const ip = clientIp(req);
    if (!allowRateLimit(ip)) {
        return res.status(429).json({ success: false, error: 'Too many requests. Please try again later.' });
    }

    try {
        const leadData = parseBody(req);
        const token =
            leadData['cf-turnstile-response'] ||
            leadData.turnstileToken ||
            '';

        if (!token || typeof token !== 'string') {
            return res.status(400).json({ success: false, error: 'Security verification required.' });
        }

        const phoneDigits = String(leadData.phone || '').replace(/\D/g, '');
        if (phoneDigits.length !== 10) {
            return res.status(400).json({ success: false, error: 'Please enter a valid 10-digit US phone number.' });
        }

        const required = ['fName', 'lName', 'email', 'state', 'type', 'fault', 'med', 'police', 'atty'];
        for (const key of required) {
            if (!sanitizeStr(leadData[key], 500)) {
                return res.status(400).json({ success: false, error: 'Missing required fields.' });
            }
        }

        const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                secret: process.env.TURNSTILE_SECRET_KEY || '',
                response: token,
                ...(ip ? { remoteip: ip } : {}),
            }).toString(),
        });
        const verification = await verifyRes.json();
        if (!verification.success) {
            return res.status(403).json({ success: false, error: 'Bot detected.' });
        }

        let carrierName = 'Unknown';
        let lineType = 'Unknown';
        if (twilioClient && phoneDigits.length === 10) {
            try {
                const lookup = await twilioClient.lookups.v2
                    .phoneNumbers(`+1${phoneDigits}`)
                    .fetch({ fields: 'line_type_intelligence' });
                carrierName = lookup.lineTypeIntelligence?.carrier_name || 'Unknown';
                lineType = lookup.lineTypeIntelligence?.type || 'Unknown';
            } catch (e) {
                console.error('Twilio Error:', e.message);
            }
        }

        let finalScore = 5;
        const detectedTags = [];
        const narrativeText = sanitizeStr(leadData.narrative, 8000).toLowerCase();

        const scoringMap = [
            { key: ['truck', '18-wheeler', 'semi'], score: 3, label: 'Commercial Vehicle' },
            { key: ['hospital', 'surgery', 'ambulance'], score: 3, label: 'Severe Medical' },
            { key: ['broken', 'fracture', 'spine'], score: 2, label: 'Critical Injury' },
        ];

        scoringMap.forEach((item) => {
            if (item.key.some((k) => narrativeText.includes(k))) {
                finalScore += item.score;
                detectedTags.push(item.label);
            }
        });

        let grade = 'Standard';
        if (lineType === 'voip') {
            finalScore -= 5;
            detectedTags.push('VOIP (Low Quality)');
            grade = 'Low-Quality';
        } else if (finalScore >= 8 && lineType === 'mobile') {
            grade = 'High-Value';
        }
        finalScore = Math.max(0, Math.min(10, finalScore));

        const row = {
            first_name: sanitizeStr(leadData.fName, 120),
            last_name: sanitizeStr(leadData.lName, 120),
            email: sanitizeStr(leadData.email, 255),
            phone: phoneDigits,
            state: sanitizeStr(leadData.state, 120),
            case_type: sanitizeStr(leadData.type, 80),
            fault_status: sanitizeStr(leadData.fault, 80),
            medical_status: sanitizeStr(leadData.med, 80),
            police_report: sanitizeStr(leadData.police, 80),
            has_attorney: sanitizeStr(leadData.atty, 80),
            narrative: sanitizeStr(leadData.narrative, 8000),
            user_ip: sanitizeStr(ip, 45) || null,
            carrier_name: sanitizeStr(carrierName, 120),
            line_type: sanitizeStr(lineType, 40),
            ai_score: finalScore,
            ai_brief: detectedTags.join(' | ') || 'Standard Case',
            lead_grade: sanitizeStr(grade, 40),
        };

        const { error } = await supabase.from('leads').insert([row]);

        if (error) throw error;
        return res.status(200).json({ success: true, grade });
    } catch (err) {
        console.error('insert-lead error:', err);
        const message = isProduction
            ? 'Unable to save your request. Please try again later.'
            : err.message || 'Server error';
        return res.status(500).json({ success: false, error: message });
    }
}
