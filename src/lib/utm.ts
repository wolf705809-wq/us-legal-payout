'use client';

const SESSION_KEY = 'utm_params';

export interface UtmParams {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
}

export function captureUtmParams(): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const source = params.get('utm_source');
  if (!source) return; // only persist when UTM params are present in URL
  const utm: UtmParams = {
    utmSource: source ?? '',
    utmMedium: params.get('utm_medium') ?? '',
    utmCampaign: params.get('utm_campaign') ?? '',
    utmContent: params.get('utm_content') ?? '',
  };
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(utm));
  } catch {
    // sessionStorage unavailable (private browsing edge case)
  }
}

export function getStoredUtmParams(): UtmParams {
  const empty: UtmParams = { utmSource: '', utmMedium: '', utmCampaign: '', utmContent: '' };
  if (typeof window === 'undefined') return empty;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return empty;
    return JSON.parse(raw) as UtmParams;
  } catch {
    return empty;
  }
}
