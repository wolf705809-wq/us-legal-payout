import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Basic validation
  const { name, email, phone, state } = body;
  if (!name || !email || !phone || !state) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // TODO: persist to Supabase leads table and trigger Twilio SMS
  console.log('[submit-lead]', {
    name,
    email,
    phone,
    state,
    accidentType: body.accidentType,
    severity: body.severity,
    truckingCompany: body.truckingCompany,
    estimateLow: body.estimateLow,
    estimateHigh: body.estimateHigh,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
