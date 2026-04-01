import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const dot = searchParams.get('dot')?.trim();
  const mc = searchParams.get('mc')?.trim();
  const name = searchParams.get('name')?.trim();

  if (!dot && !mc && !name) {
    return NextResponse.json({ error: 'Missing required parameter: dot, mc, or name' }, { status: 400 });
  }

  let upstreamUrl: string;
  if (dot) {
    upstreamUrl = `https://verifycarrier.com/api/lookup/dot/${encodeURIComponent(dot)}`;
  } else if (mc) {
    upstreamUrl = `https://verifycarrier.com/api/lookup/dot/MC${encodeURIComponent(mc)}`;
  } else {
    upstreamUrl = `https://verifycarrier.com/api/search?q=${encodeURIComponent(name!)}`;
  }

  try {
    const res = await fetch(upstreamUrl, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return NextResponse.json(
        { error: `Upstream error: ${res.status}`, detail: text },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to reach carrier data service', detail: message }, { status: 502 });
  }
}
