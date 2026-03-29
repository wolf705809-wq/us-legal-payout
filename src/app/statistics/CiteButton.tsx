'use client';
import { useState } from 'react';

export default function CiteButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const citation = `TruckSettlementPro. (2026). US Truck Accident Statistics (2024). Retrieved ${today}, from https://trucksettlementpro.com/statistics`;
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback: select text
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all"
      style={{
        backgroundColor: copied ? 'rgba(212,168,75,0.2)' : 'rgba(212,168,75,0.1)',
        border: '1px solid rgba(212,168,75,0.4)',
        color: copied ? '#D4A84B' : '#C8CADA',
      }}
    >
      {copied ? (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5L13 4.5" stroke="#D4A84B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Citation Copied!
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="5" y="5" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 5V3a1 1 0 00-1-1H3a1 1 0 00-1 1v7a1 1 0 001 1h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Cite This Page
        </>
      )}
    </button>
  );
}
