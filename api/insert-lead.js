import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. 환경 변수 로드
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

  // [보안] IP 및 브라우저 정보 수집
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || 'Unknown';

  try {
    // 2. Cloudflare Turnstile 검증
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${turnstileSecretKey}&response=${token}`,
    });
    const verification = await verifyRes.json();
    if (!verification.success) return res.status(403).json({ success: false, error: 'Bot detected.' });

    // 3. [AI 분석 단계] 에러가 나도 전체 프로세스가 죽지 않도록 내부 try-catch 사용
    let aiBrief = "Summary unavailable (AI Error)";
    let aiScore = 0;

    if (genAI && leadData.narrative && leadData.narrative.length > 5) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Analyze this accident: "${leadData.narrative}". 
        Summarize in 3 professional bullet points (brief) and give a 1-10 priority score (score). 
        Return strictly JSON: {"brief": "summary", "score": number}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text().replace(/```json|```/g, "").trim();
        const aiResponse = JSON.parse(text);
        
        aiBrief = aiResponse.brief;
        aiScore = aiResponse.score;
      } catch (aiErr) {
        console.error("AI processing failed but saving lead anyway:", aiErr.message);
        // AI가 실패해도 aiBrief는 기본값을 유지하며 다음 단계(DB저장)로 넘어갑니다.
      }
    }

    // 4. 데이터 조립 및 저장
    delete leadData['cf-turnstile-response'];
    const finalLead = {
      ...leadData,
      ip_address: ip,
      user_agent: userAgent,
      ai_brief: aiBrief,
      ai_score: aiScore,
      lead_grade: aiScore >= 8 ? 'High-Value' : 'Standard'
    };

    const { error } = await supabase.from('leads').insert([finalLead]);
    if (error) throw error;

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Critical Server Error:", error.message);
    // 여기가 아까 사령관님이 보신 에러 창의 범인입니다. 
    // JSON 형태로 에러를 보내서 프론트엔드가 당황하지 않게 만듭니다.
    return res.status(500).json({ success: false, error: error.message });
  }
}
