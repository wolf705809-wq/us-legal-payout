'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Carrier {
  dot_number?: string;
  legal_name?: string;
  dba_name?: string;
  physical_city?: string;
  physical_state?: string;
  power_units?: number;
  drivers?: number;
  safety_rating?: string | null;
  out_of_service_date?: string | null;
}

interface ApiResponse {
  query?: string;
  count?: number;
  results?: Carrier[];
  error?: string;
}

const RATING_COLOR: Record<string, string> = {
  Satisfactory: '#4ade80',
  Conditional: '#facc15',
  Unsatisfactory: '#f87171',
};

function buildApiUrl(q: string): string {
  if (/^MC\d+$/i.test(q)) {
    return `/api/carrier?mc=${encodeURIComponent(q.replace(/^MC/i, ''))}`;
  }
  if (/^\d+$/.test(q)) {
    return `/api/carrier?dot=${encodeURIComponent(q)}`;
  }
  return `/api/carrier?name=${encodeURIComponent(q)}`;
}

export default function FMCSASearchForm() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Carrier[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    const q = query.trim();
    if (!q) return;

    setLoading(true);
    setResults(null);
    setError(null);

    try {
      const res = await fetch(buildApiUrl(q));
      const data: ApiResponse = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setResults(data.results ?? []);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div>
      {/* Search input row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Company name, DOT number, or MC number"
          style={{
            flex: 1,
            backgroundColor: '#0a1829',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '8px',
            padding: '14px 18px',
            fontSize: '15px',
            color: '#C8CADA',
            outline: 'none',
          }}
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={!query.trim() || loading}
          className="cta-gold flex-shrink-0 rounded-lg font-black text-sm"
          style={{
            backgroundColor: query.trim() && !loading ? '#D4A84B' : '#5a4a20',
            color: '#0F1D32',
            padding: '14px 28px',
            minHeight: '48px',
            whiteSpace: 'nowrap',
            cursor: query.trim() && !loading ? 'pointer' : 'not-allowed',
            opacity: query.trim() && !loading ? 1 : 0.5,
          }}
        >
          {loading ? 'Searching…' : 'Search Carrier →'}
        </button>
      </div>

      <div className="mt-6">

        {/* Loading */}
        {loading && (
          <div className="text-sm text-center py-8" style={{ color: '#8A95A8' }}>
            Looking up carrier data…
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div
            className="rounded-xl px-5 py-4 text-sm"
            style={{ backgroundColor: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171' }}
          >
            {error}
          </div>
        )}

        {/* No results */}
        {results !== null && results.length === 0 && !loading && (
          <div
            className="rounded-xl px-5 py-4 text-sm"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: '#8A95A8' }}
          >
            No carriers found for &ldquo;{query}&rdquo;. Try a different name, DOT number, or MC number.
          </div>
        )}

        {/* Results */}
        {results && results.length > 0 && !loading && (
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#5a7090', letterSpacing: '0.15em' }}>
              {results.length} carrier{results.length > 1 ? 's' : ''} found
            </p>
            {results.map((carrier, i) => {
              const rating = carrier.safety_rating;
              const ratingLabel = rating ?? 'Not Rated';
              const ratingColor = RATING_COLOR[rating ?? ''] ?? '#8A95A8';
              const location = [carrier.physical_city, carrier.physical_state].filter(Boolean).join(', ');

              return (
                <div
                  key={carrier.dot_number ?? i}
                  className="rounded-xl p-5"
                  style={{ backgroundColor: '#0a1829', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                    {/* Left: carrier info */}
                    <div className="flex-1 space-y-3">

                      {/* Name */}
                      <div>
                        <p className="text-base font-black text-white leading-snug">
                          {carrier.legal_name ?? '—'}
                        </p>
                        {carrier.dba_name && carrier.dba_name !== carrier.legal_name && (
                          <p className="text-xs mt-0.5" style={{ color: '#8A95A8' }}>
                            DBA: {carrier.dba_name}
                          </p>
                        )}
                        {carrier.dot_number && (
                          <p className="text-xs mt-0.5" style={{ color: '#5a7090' }}>
                            DOT# {carrier.dot_number}
                          </p>
                        )}
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-semibold"
                          style={{
                            backgroundColor: `${ratingColor}18`,
                            border: `1px solid ${ratingColor}44`,
                            color: ratingColor,
                          }}
                        >
                          {ratingLabel}
                        </span>
                        {carrier.out_of_service_date && (
                          <span
                            className="text-xs px-2.5 py-1 rounded-full font-semibold"
                            style={{ backgroundColor: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', color: '#f87171' }}
                          >
                            Out of Service
                          </span>
                        )}
                      </div>

                      {/* Details row */}
                      <div className="flex flex-wrap gap-4 text-xs" style={{ color: '#5a7090' }}>
                        {location && (
                          <span>
                            <span className="font-semibold" style={{ color: '#C8CADA' }}>{location}</span>
                          </span>
                        )}
                        {carrier.power_units != null && (
                          <span>
                            <span className="font-black" style={{ color: '#C8CADA' }}>{carrier.power_units}</span> power units
                          </span>
                        )}
                        {carrier.drivers != null && (
                          <span>
                            <span className="font-black" style={{ color: '#C8CADA' }}>{carrier.drivers}</span> drivers
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: CTA */}
                    <Link
                      href="/calculator"
                      className="flex-shrink-0 rounded-lg font-black text-xs flex items-center justify-center"
                      style={{
                        backgroundColor: '#D4A84B',
                        color: '#0F1D32',
                        padding: '10px 18px',
                        whiteSpace: 'nowrap',
                        alignSelf: 'flex-start',
                      }}
                    >
                      Start My Free Case Review →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
