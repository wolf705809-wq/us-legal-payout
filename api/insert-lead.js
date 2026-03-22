import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from "@google/generative-ai";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;
const geminiApiKey = process.env.GEMINI_API_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const genAI = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const leadData = req.body;
  const token = leadData['cf-turnstile-response'];
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;

  try {
    // 1. 봇 차단 검증
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${turnstileSecretKey}&response=${token}`,
    });
    const verification = await verifyRes.json();
    if (!verification.success) return res.status(403).json({ success: false, error: 'Bot detected.' });

    // 2. AI 분석 (에러가 나도 저장은 되도록 설계)
    let aiBrief = "Summary unavailable (AI Error)";
    let aiScore = 0;

    if (genAI && leadData.narrative && leadData.narrative.length > 5) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Analyze this accident report: "${leadData.narrative}". 
        1. Summarize in 3 bullet points. 
        2. Give a priority score 1-10 based on severity. 
        Return strictly in JSON: {"brief": "string", "score": number}`;
        
        const result = await model.generateContent(prompt);
        const text = result.response.text().replace(/```json|```/g, "").trim();
        const aiRes = JSON.parse(text);
        aiBrief = aiRes.brief;
        aiScore = aiRes.score;
      } catch (e) { console.error("AI Error:", e.message); }
    }

    // 3. 최종 데이터 조립 및 저장
    delete leadData['cf-turnstile-response'];
    const finalData = {
      ...leadData,
      ip_address: ip,
      ai_brief: aiBrief,
      ai_score: aiScore,
      lead_grade: aiScore >= 8 ? 'High-Value' : 'Standard'
    };

    const { error } = await supabase.from('leads').insert([finalData]);
    if (error) throw error;

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
