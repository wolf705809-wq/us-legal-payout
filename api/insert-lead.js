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

  console.log("--- SYSTEM START ---");
  console.log("Using Model: gemini-1.5-flash"); // 디버깅 로그

  try {
    // 1. 봇 검증
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${turnstileSecretKey}&response=${token}`,
    });
    const verification = await verifyRes.json();
    if (!verification.success) return res.status(403).json({ success: false, error: 'Bot detected.' });

    // 2. AI 분석 (가장 표준적인 모델 이름 사용)
    let aiBrief = "Summary unavailable (AI skipped)";
    let aiScore = 0;

    if (genAI && leadData.narrative && leadData.narrative.length > 5) {
      try {
        // [수정] 가장 안정적인 기본 모델명으로 변경
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `Analyze: "${leadData.narrative}". 
        Return ONLY JSON: {"brief": "3 bullet points", "score": number 1-10}`;
        
        const result = await model.generateContent(prompt);
        const text = result.response.text().replace(/```json|```/g, "").trim();
        const aiRes = JSON.parse(text);
        
        aiBrief = aiRes.brief;
        aiScore = aiRes.score;
        console.log("AI Analysis Success!");
      } catch (aiErr) { 
        console.error("AI Error Detailed:", aiErr.message);
        aiBrief = `AI Analysis failed: ${aiErr.message}`;
      }
    }

    // 3. 데이터 저장 (AI가 실패해도 DB에는 무조건 저장되게 함)
    delete leadData['cf-turnstile-response'];
    const { error } = await supabase.from('leads').insert([{
      ...leadData,
      ip_address: ip,
      ai_brief: aiBrief,
      ai_score: aiScore,
      lead_grade: aiScore >= 8 ? 'High-Value' : 'Standard'
    }]);
    
    if (error) {
      console.error("DB Error:", error.message);
      throw error;
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Global Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}
