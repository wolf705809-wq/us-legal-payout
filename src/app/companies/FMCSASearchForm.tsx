'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FMCSASearchForm() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query.trim()) return;
    const url = `https://safer.fmcsa.dot.gov/CompanySnapshot.aspx?searchtype=ANY&query=${encodeURIComponent(query.trim())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Werner Enterprises, Swift Transportation, or DOT# 123456"
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
          disabled={!query.trim()}
          className="cta-gold flex-shrink-0 rounded-lg font-black text-sm"
          style={{
            backgroundColor: query.trim() ? '#D4A84B' : '#5a4a20',
            color: '#0F1D32',
            padding: '14px 28px',
            minHeight: '48px',
            whiteSpace: 'nowrap',
            cursor: query.trim() ? 'pointer' : 'not-allowed',
            opacity: query.trim() ? 1 : 0.5,
          }}
        >
          Search FMCSA SAFER →
        </button>
        <Link
          href="/calculator"
          className="flex-shrink-0 rounded-lg font-black text-sm flex items-center justify-center"
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #D4A84B',
            color: '#D4A84B',
            padding: '14px 24px',
            minHeight: '48px',
            whiteSpace: 'nowrap',
          }}
        >
          Start My Free Case Review →
        </Link>
      </div>

      <p className="text-xs mt-4" style={{ color: '#3d5270' }}>
        You will be redirected to{' '}
        <span style={{ color: '#5a7090' }}>safer.fmcsa.dot.gov</span>, the official federal
        carrier database. All data is public record.
      </p>
    </>
  );
}
