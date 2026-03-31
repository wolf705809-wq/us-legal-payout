import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { getSupabaseServer } from '@/lib/supabase';
import { sendTelegramLeadAlert } from '@/lib/telegram';
import { buildLeadConfirmationEmail } from '@/lib/email-templates/lead-confirmation';
// ── Turnstile verification ────────────────────────────────────────────────────
async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Skip if not configured

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token }),
  });
  const data = await res.json() as { success: boolean };
  return data.success;
}

// ── Zod schema ────────────────────────────────────────────────────────────────

const LeadSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().transform((val, ctx) => {
    if (!val) return undefined;
    const digits = val.replace(/\D/g, '');
    const normalized = digits.startsWith('1') && digits.length === 11 ? digits.slice(1) : digits;
    if (normalized.length !== 10) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Phone must be a 10-digit US number' });
      return z.NEVER;
    }
    return `(${normalized.slice(0, 3)}) ${normalized.slice(3, 6)}-${normalized.slice(6)}`;
  }),
  state: z.string().trim().max(100).optional(),
  accident_type: z.string().trim().max(200).optional(),
  injury_type: z.string().trim().max(200).optional(),
  severity: z.enum(['minor', 'moderate', 'serious', 'severe', 'catastrophic']).optional(),
  accident_date: z.string().optional()
    .transform(val => val === '' ? undefined : val)
    .refine(val => {
    if (!val) return true;
    const d = new Date(val);
    return !isNaN(d.getTime()) && d <= new Date();
  }, 'accident_date must be a valid ISO date in the past'),
  fault_percentage: z.number().int().min(0).max(100).optional(),
  carrier_name: z.string().max(200).optional(),
  estimated_low: z.number().positive().optional(),
  estimated_high: z.number().positive().optional(),
  source_page: z.string().optional(),
  trusted_form_url: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

// ── Logging helper ────────────────────────────────────────────────────────────
function log(stage: string, msg: string, err?: unknown) {
  const ts = new Date().toISOString();
  console.log(`[LEAD_API] ${ts} [${stage}] ${msg}`, err ?? '');
}

// ── POST handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  if (req.method && req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  // Parse body
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Turnstile verification
  const turnstileToken = (raw as Record<string, unknown>).turnstile_token as string | undefined;
  if (process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    if (!turnstileToken) {
      return NextResponse.json({ error: 'CAPTCHA verification required' }, { status: 400 });
    }
    const valid = await verifyTurnstile(turnstileToken);
    if (!valid) {
      log('turnstile', 'Verification failed');
      return NextResponse.json({ error: 'CAPTCHA verification failed. Please refresh and try again.' }, { status: 400 });
    }
  }

  // Validate
  const parsed = LeadSchema.safeParse(raw);
  if (!parsed.success) {
    log('validation', 'Zod validation failed', parsed.error.flatten());
    return NextResponse.json(
      { error: 'Validation failed', fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? req.headers.get('x-real-ip') ?? 'unknown';

  // Duplicate detection: same email + source_page within 24 hours
  const { data: existing } = await getSupabaseServer()
    .from('leads')
    .select('id')
    .eq('email', data.email)
    .eq('source_page', data.source_page ?? '')
    .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    .limit(1);

  if (existing && existing.length > 0) {
    log('duplicate', `Duplicate submission: email=${data.email} source_page=${data.source_page}`);
    return NextResponse.json({ error: 'You have already submitted a request from this page in the last 24 hours.' }, { status: 409 });
  }

  // Persist to Supabase
  const { data: insertedRows, error: dbError } = await getSupabaseServer()
    .from('leads')
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      state: data.state ?? null,
      accident_type: data.accident_type ?? null,
      injury_type: data.injury_type ?? null,
      severity: data.severity ?? null,
      accident_date: data.accident_date ?? null,
      fault_percentage: data.fault_percentage ?? null,
      carrier_name: data.carrier_name ?? null,
      estimated_low: data.estimated_low ?? null,
      estimated_high: data.estimated_high ?? null,
      source_page: data.source_page ?? null,
      trusted_form_url: data.trusted_form_url ?? null,
      utm_source: data.utm_source ?? null,
      utm_medium: data.utm_medium ?? null,
      utm_campaign: data.utm_campaign ?? null,
      ip_address: ip,
      user_agent: req.headers.get('user-agent') ?? null,
    })
    .select('id')
    .single();

  if (dbError) {
    log('db', 'Supabase insert failed', dbError);
    return NextResponse.json({ error: 'Failed to save your submission. Please try again.' }, { status: 500 });
  }

  log('db', `Lead saved: id=${insertedRows?.id}`);

  // Fire email + Telegram notifications concurrently (non-blocking)
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailPayload = buildLeadConfirmationEmail({
      name: data.name,
      email: data.email,
      state: data.state,
      accidentType: data.accident_type,
      injuryType: data.injury_type,
      severity: data.severity,
      estimatedLow: data.estimated_low,
      estimatedHigh: data.estimated_high,
    });

    const results = await Promise.allSettled([
      resend.emails.send(emailPayload),
      sendTelegramLeadAlert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        state: data.state,
        accidentType: data.accident_type,
        injuryType: data.injury_type,
        severity: data.severity,
        estimatedLow: data.estimated_low,
        estimatedHigh: data.estimated_high,
        faultPercentage: data.fault_percentage,
        carrierName: data.carrier_name,
        sourcePage: data.source_page,
      }),
    ]);

    if (results[0].status === 'rejected') {
      log('email', 'Resend failed (non-fatal)', results[0].reason);
    }
    if (results[1].status === 'rejected') {
      log('telegram', 'Telegram failed (non-fatal)', results[1].reason);
    }
  } catch (err) {
    log('notifications', 'Notification failed (non-fatal)', err);
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
