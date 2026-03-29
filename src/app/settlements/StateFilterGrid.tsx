'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { FaultRule } from '@/lib/state-laws';

interface StateItem {
  name: string;
  slug: string;
  faultRule: FaultRule;
  solYears: number;
}

interface Props {
  allStates: StateItem[];
}

function getFaultLabel(faultRule: FaultRule): string {
  switch (faultRule) {
    case 'pure_comparative':
      return 'Pure Comparative';
    case 'modified_51':
      return 'Modified (51% Bar)';
    case 'modified_50':
      return 'Modified (50% Bar)';
    case 'contributory':
      return 'Contributory Negligence';
    default:
      return faultRule;
  }
}

function getFaultColor(faultRule: FaultRule): string {
  switch (faultRule) {
    case 'pure_comparative':
      return '#86efac'; // green-ish
    case 'modified_51':
      return '#D4A84B'; // gold
    case 'modified_50':
      return '#D4A84B'; // gold
    case 'contributory':
      return '#fca5a5'; // red-ish
    default:
      return '#D4A84B';
  }
}

export default function StateFilterGrid({ allStates }: Props) {
  const [query, setQuery] = useState('');

  const filtered = allStates.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ marginTop: '48px' }}>
      {/* Search input */}
      <div style={{ maxWidth: '448px', margin: '0 auto 16px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search states..."
          aria-label="Search states"
          style={{
            width: '100%',
            backgroundColor: '#0F1D32',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '10px',
            padding: '12px 18px',
            fontSize: '15px',
            color: '#C8CADA',
            outline: 'none',
          }}
        />
      </div>

      {/* Count */}
      <p
        style={{
          textAlign: 'center',
          fontSize: '13px',
          color: '#8A95A8',
          marginBottom: '28px',
        }}
      >
        Showing{' '}
        <strong style={{ color: '#D4A84B' }}>{filtered.length}</strong> of{' '}
        <strong style={{ color: '#C8CADA' }}>50</strong> states
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#5a7090', fontSize: '14px', padding: '40px 0' }}>
          No states match &ldquo;{query}&rdquo;
        </p>
      ) : (
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filtered.map((state) => {
            const indicatorColor = getFaultColor(state.faultRule);
            const faultLabel = getFaultLabel(state.faultRule);

            return (
              <Link
                key={state.slug}
                href={`/settlements/${state.slug}`}
                className="card-hover"
                style={{
                  display: 'block',
                  backgroundColor: '#0F1D32',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '12px',
                  padding: '16px',
                  textDecoration: 'none',
                }}
              >
                {/* State name */}
                <p
                  style={{
                    fontWeight: 600,
                    color: '#ffffff',
                    fontSize: '15px',
                    marginBottom: '8px',
                    lineHeight: '1.3',
                  }}
                >
                  {state.name}
                </p>

                {/* Fault rule badge */}
                <p
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: indicatorColor,
                    marginBottom: '6px',
                    lineHeight: '1.4',
                  }}
                >
                  {faultLabel}
                </p>

                {/* SOL */}
                <p
                  style={{
                    fontSize: '11px',
                    color: '#8A95A8',
                  }}
                >
                  {state.solYears} yr SOL
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
