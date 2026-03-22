import { createClient } from '@supabase/supabase-js';

// Vercel 환경 변수에 등록한 값들을 가져옵니다.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const leadData = req.body;
  const token = leadData['cf-turnstile-response']; // 프론트에서 보낸 봇 검증 토큰

  try {
    // 1. Cloudflare Turnstile 봇 검증
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${turnstileSecretKey}&response=${token}`,
    });

    const verification = await verifyRes.json();

    if (!verification.success) {
      return res.status(403).json({ success: false, error: 'Bot detected. Access denied.' });
    }

    // 2. 봇이 아니면 Supabase에 데이터 저장
    // 봇 검증 토큰은 DB에 저장할 필요 없으므로 삭제
    delete leadData['cf-turnstile-response'];

    const { data, error } = await supabase
      .from('leads') // 본인의 Supabase 테이블 이름 확인 (보통 leads)
      .insert([leadData]);

    if (error) throw error;

    // 3. 성공 응답
    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
