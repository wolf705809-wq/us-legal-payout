import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from "@google/generative-ai";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const leadData = req.body;
  const token = leadData['cf-turnstile-response'];
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;

  try {
    // 1. 봇 검증 (Cloudflare)
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
    });
    const verification = await verifyRes.json();
    if (!verification.success) return res.status(403).json({ success: false, error: 'Bot detected.' });

    // 2. AI 분석 (이중 백업 로직)
    let aiBrief = "Summary unavailable";
    let aiScore = 0;

    if (genAI && leadData.narrative) {
      // 시도할 모델 리스트 (Flash가 안 되면 Pro로!)
      const modelNames = ["gemini-1.5-flash", "gemini-pro", "gemini-1.0-pro"];
      
      for (const modelName of modelNames) {
        try {
          console.log(`Trying AI Model: ${modelName}...`);
          const model = genAI.getGenerativeModel({ model: modelName });
          const prompt = `Analyze accident: "${leadData.narrative}". 
          Return ONLY JSON: {"brief": "3 key points", "score": number 1-10}`;
          
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text().replace(/```json|```/g, "").trim();
          const aiRes = JSON.parse(text);
          
          aiBrief = aiRes.brief;
          aiScore = aiRes.score;
          console.log(`Success with ${modelName}!`);
          break; // 성공하면 반복 중단
        } catch (aiErr) {
          console.error(`${modelName} failed:`, aiErr.message);
          aiBrief = `AI Error: ${aiErr.message}`;
          // 다음 모델로 넘어가서 다시 시도함
        }
      }
    }

    // 3. 데이터 저장
    delete leadData['cf-turnstile-response'];
    const { error } = await supabase.from('leads').insert([{
      ...leadData,
      ip_address: ip,
      ai_brief: aiBrief,
      ai_score: aiScore,
      lead_grade: aiScore >= 8 ? 'High-Value' : 'Standard'
    }]);

    if (error) throw error;
    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("Critical Error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}
