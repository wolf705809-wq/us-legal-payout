import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/api/leads',
};

// In-memory sliding window per Edge instance.
// Sufficient for single-region deployments; swap to Upstash Redis for multi-region.
const rateLimitMap = new Map<string, number[]>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5;

export default function middleware(req: NextRequest) {
  // Only rate-limit POST (GET is rejected by the route itself)
  if (req.method !== 'POST') return NextResponse.next();

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(t => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return NextResponse.next();
}
