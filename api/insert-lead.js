import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const leadData = req.body;
  const token = leadData['cf-turnstile-response'];

  // [디버그 로그] 서버에 들어온 값 확인
  console.log("--- DEBUG START ---");
  console.log("Token Received:", token ? "YES (exists)" : "NO (empty)");
  console.log("Secret Key Exists:", turnstileSecretKey ? "YES" : "NO");

  try {
    // 1. Cloudflare 검증 요청
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${turnstileSecretKey}&response=${token}`,
    });

    const verification = await verifyRes.json();
    console.log("Cloudflare Response:", JSON.stringify(verification));

    if (!verification.success) {
      console.error("Verification Failed. Errors:", verification['error-codes']);
      return res.status(403).json({ 
        success: false, 
        error: 'Bot detected.', 
        details: verification['error-codes'] 
      });
    }

    // 2. Supabase 저장
    delete leadData['cf-turnstile-response'];
    const { data, error } = await supabase.from('leads').insert([leadData]);

    if (error) {
        console.error("Supabase Error:", error);
        throw error;
    }

    console.log("Save Success!");
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Fatal Error:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}
