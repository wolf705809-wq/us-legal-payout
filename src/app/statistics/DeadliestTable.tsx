'use client';
import { useState } from 'react';
import Link from 'next/link';
import { STATE_STATISTICS, DEADLIEST_STATES_ORDER } from '@/lib/state-statistics';
import { getStateBySlug } from '@/lib/state-laws';

type SortKey = 'rank' | 'fatalCrashes' | 'fatalities' | 'fatalityRatePer100K';
type SortDir = 'asc' | 'desc';

const FAULT_LABELS: Record<string, string> = {
  pure_comparative: 'Pure Comparative',
  modified_51: 'Modified 51%',
  modified_50: 'Modified 50%',
  contributory: 'Contributory',
};

const BASE_DATA = DEADLIEST_STATES_ORDER.map((slug, i) => {
  const stat = STATE_STATISTICS.find(s => s.slug === slug)!;
  const law = getStateBySlug(slug);
  return {
    rank: i + 1,
    slug,
    name: stat.name,
    fatalCrashes: stat.fatalCrashes,
    fatalities: stat.fatalities,
    fatalityRatePer100K: stat.fatalityRatePer100K,
    faultRule: law?.faultRule ?? 'modified_51',
  };
});

export default function DeadliestTable() {
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir(key === 'rank' ? 'asc' : 'desc');
    }
  };

  const sorted = [...BASE_DATA].sort((a, b) => {
    const v = sortDir === 'asc' ? 1 : -1;
    return (a[sortKey] > b[sortKey] ? 1 : -1) * v;
  });

  const SortIcon = ({ k }: { k: SortKey }) => (
    <span className="ml-1 opacity-60" style={{ fontSize: '10px' }}>
      {sortKey === k ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  );

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid rgba(212,168,75,0.3)' }}>
            {([
              { key: 'rank' as SortKey, label: 'Rank' },
              { key: null, label: 'State' },
              { key: 'fatalCrashes' as SortKey, label: 'Fatal Crashes' },
              { key: 'fatalities' as SortKey, label: 'Fatalities' },
              { key: 'fatalityRatePer100K' as SortKey, label: 'Rate / 100K' },
              { key: null, label: 'Fault Law' },
            ]).map(({ key, label }) => (
              <th
                key={label}
                onClick={key ? () => handleSort(key) : undefined}
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  color: '#8A95A8',
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: key ? 'pointer' : 'default',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                }}
              >
                {label}{key && <SortIcon k={key} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={row.slug}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
              }}
            >
              <td style={{ padding: '12px 16px', color: '#5a7090', fontWeight: 700 }}>
                {row.rank}
              </td>
              <td style={{ padding: '12px 16px' }}>
                <Link
                  href={`/settlements/${row.slug}`}
                  className="font-bold hover:underline"
                  style={{ color: '#D4A84B' }}
                >
                  {row.name}
                </Link>
              </td>
              <td style={{ padding: '12px 16px', color: '#C8CADA', fontWeight: 600 }}>
                {row.fatalCrashes.toLocaleString()}
              </td>
              <td style={{ padding: '12px 16px', color: '#ef8080', fontWeight: 700 }}>
                {row.fatalities.toLocaleString()}
              </td>
              <td style={{ padding: '12px 16px', color: '#C8CADA' }}>
                {row.fatalityRatePer100K.toFixed(2)}
              </td>
              <td style={{ padding: '12px 16px' }}>
                <span
                  className="text-xs font-bold px-2 py-1 rounded"
                  style={{
                    backgroundColor: row.faultRule === 'contributory' ? 'rgba(239,68,68,0.1)' : 'rgba(212,168,75,0.1)',
                    color: row.faultRule === 'contributory' ? '#fca5a5' : '#D4A84B',
                    fontSize: '11px',
                  }}
                >
                  {FAULT_LABELS[row.faultRule] ?? row.faultRule}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
