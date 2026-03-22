import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. 환경 변수 설정 (Vercel에서 설정한 키들을 가져옵니다)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;
const geminiApiKey = process.env.GEMINI_API_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const genAI = new GoogleGenerativeAI(geminiApiKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const leadData = req.body;
  const token = leadData['cf-turnstile-response'];

  // [보안] 실사용자 IP 주소 캡처
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;

  try {
    // 2. Cloudflare Turnstile 봇 검증
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${turnstileSecretKey}&response=${token}`,
    });
    const verification = await verifyRes.json();
    if (!verification.success) return res.status(403).json({ success: false, error: 'Bot detected.' });

    // 3. [핵심] Gemini AI를 통한 사고 리포트 분석 (v9.3 알고리즘 반영)
    let aiBrief = "Processing failed";
    let aiScore = 0;

    if (leadData.narrative && leadData.narrative.length > 10) {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `
        You are a senior legal intake specialist analyzing a personal injury case in the US.
        Based on the customer's narrative: "${leadData.narrative}"
        
        Task:
        1. Summarize the incident in 3 professional bullet points (AI_Brief).
        2. Assign a 'Lead_Grade' score from 1 to 10 based on legal recovery potential (AI_Score). 
           - High scores for commercial truck accidents, clear liability, or severe hospitalizations.
        3. Mention the relevant state law (e.g., Texas Chapter 33 Proportionate Responsibility) if applicable.

        Return strictly in JSON format: {"brief": "summary string", "score": number}
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text().replace(/```json|```/g, "").trim();
      const aiResponse = JSON.parse(responseText);
      
      aiBrief = aiResponse.brief;
      aiScore = aiResponse.score;
    }

    // 4. 데이터 최종 조립
    delete leadData['cf-turnstile-response']; // 토큰 제거
    const finalData = {
      ...leadData,
      ip_address: ip,
      user_agent: req.headers['user-agent'],
      ai_brief: aiBrief,
      ai_score: aiScore,
      lead_grade: aiScore >= 8 ? 'High-Value' : 'Standard' // 8점 이상 시 자동 태그
    };

    // 5. Supabase 저장
    const { error } = await supabase.from('leads').insert([finalData]);
    if (error) throw error;

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Server Error:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}
