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
    // 1. 봇 검증
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
    });
    const verification = await verifyRes.json();
    if (!verification.success) return res.status(403).json({ success: false, error: 'Bot detected.' });

    // 2. [비상 대책] 기본 점수 계산기 (AI 실패 대비용)
    let aiBrief = "AI Analysis skipped/failed. Manual keywords detected.";
    let aiScore = 5; // 기본 점수
    const text = (leadData.narrative || "").toLowerCase();

    // 키워드 기반 수동 채점 (사령관님의 v9.3 로직 이식)
    if (text.includes("truck") || text.includes("18-wheeler")) aiScore += 3;
    if (text.includes("hospital") || text.includes("er") || text.includes("surgery")) aiScore += 2;
    if (text.includes("broken") || text.includes("fracture") || text.includes("spine")) aiScore += 2;
    if (aiScore > 10) aiScore = 10;

    // 3. AI 분석 시도 (실패해도 중단되지 않음)
    if (genAI && text.length > 5) {
      try {
        // 가장 안정적인 3가지 이름을 순차적으로 시도
        const modelNames = ["gemini-1.5-flash-latest", "gemini-1.5-pro", "gemini-pro"];
        for (const name of modelNames) {
          try {
            const model = genAI.getGenerativeModel({ model: name });
            const result = await model.generateContent(`Analyze: "${text}". Return ONLY JSON: {"brief": "3 key points", "score": 1-10}`);
            const response = await result.response;
            const aiRes = JSON.parse(response.text().replace(/```json|```/g, "").trim());
            aiBrief = aiRes.brief;
            aiScore = aiRes.score;
            break; // 하나라도 성공하면 루프 탈출
          } catch (e) { console.log(`${name} failed, trying next...`); }
        }
      } catch (aiErr) {
        console.error("All AI models failed, using manual score.");
      }
    }

    // 4. 데이터 저장 (여기서 실패는 없다)
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
    return res.status(500).json({ success: false, error: err.message });
  }
}
