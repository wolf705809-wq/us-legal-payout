import { createClient } from '@supabase/supabase-js';

// Vercel 환경 변수에서 열쇠들을 가져옵니다.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  // POST 요청이 아니면 거절
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const leadData = req.body;
  const token = leadData['cf-turnstile-response'];

  // [보안 핵심] Vercel 서버를 통과하는 실제 사용자의 IP 주소를 캡처합니다.
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;

  console.log("--- SECURE INTAKE START ---");
  console.log("IP Address Captured:", ip);

  try {
    // 1. Cloudflare Turnstile 봇 검증 (이건 필수!)
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${turnstileSecretKey}&response=${token}`,
    });

    const verification = await verifyRes.json();
    
    if (!verification.success) {
      console.error("Bot Check Failed:", verification['error-codes']);
      return res.status(403).json({ success: false, error: 'Bot detected.' });
    }

    // 2. DB에 넣기 전 데이터 정리
    // Turnstile 토큰은 DB에 저장할 필요 없으니 삭제합니다.
    delete leadData['cf-turnstile-response'];
    
    // 프론트엔드에서 보낸 가짜 IP 대신, 서버에서 확인한 진짜 IP를 넣습니다.
    leadData.ip_address = ip;

    // 3. Supabase 장부에 최종 저장
    const { data, error } = await supabase.from('leads').insert([leadData]);

    if (error) {
        console.error("Supabase Write Error:", error);
        throw error;
    }

    console.log("Lead Secured Successfully!");
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Critical Server Error:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}
