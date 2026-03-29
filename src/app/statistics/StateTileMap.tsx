'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { STATE_STATISTICS, StateStatistics } from '@/lib/state-statistics';

// Tile grid layout: [row, col] — 12 columns × 8 rows
const TILE_GRID: Record<string, [number, number]> = {
  AK: [0, 0],  ME: [0, 11],
  WA: [1, 0],  MT: [1, 1],  ND: [1, 2],  MN: [1, 5],  VT: [1, 9],  NH: [1, 10],
  OR: [2, 0],  ID: [2, 1],  WY: [2, 2],  SD: [2, 3],  NE: [2, 4],  IA: [2, 5],  WI: [2, 6],  MI: [2, 7],  NY: [2, 9],  MA: [2, 10], RI: [2, 11],
  CA: [3, 0],  NV: [3, 1],  UT: [3, 2],  CO: [3, 3],  KS: [3, 4],  MO: [3, 5],  IL: [3, 6],  IN: [3, 7],  OH: [3, 8],  PA: [3, 9],  NJ: [3, 10], CT: [3, 11],
  AZ: [4, 1],  NM: [4, 2],  OK: [4, 4],  AR: [4, 5],  TN: [4, 6],  KY: [4, 7],  WV: [4, 8],  VA: [4, 9],  MD: [4, 10], DE: [4, 11],
  TX: [5, 2],  LA: [5, 4],  MS: [5, 5],  AL: [5, 6],  GA: [5, 7],  NC: [5, 8],  SC: [5, 9],
  FL: [6, 7],
  HI: [7, 0],
};

const CELL = 48;
const GAP = 4;
const STRIDE = CELL + GAP;
const COLS = 12;
const ROWS = 8;
const W = COLS * STRIDE - GAP;
const H = ROWS * STRIDE - GAP;

const maxCrashes = Math.max(...STATE_STATISTICS.map(s => s.annualCrashes));
const minCrashes = Math.min(...STATE_STATISTICS.map(s => s.annualCrashes));

function tileColor(crashes: number): string {
  const t = (crashes - minCrashes) / (maxCrashes - minCrashes);
  // interpolate: #0a1829 (navy) → #D4A84B (gold)
  const r = Math.round(10 + t * (212 - 10));
  const g = Math.round(24 + t * (168 - 24));
  const b = Math.round(41 + t * (75 - 41));
  return `rgb(${r},${g},${b})`;
}

function textColor(crashes: number): string {
  const t = (crashes - minCrashes) / (maxCrashes - minCrashes);
  return t > 0.45 ? '#0a0f1a' : '#C8CADA';
}

export default function StateTileMap() {
  const router = useRouter();
  const [hovered, setHovered] = useState<{ stat: StateStatistics; x: number; y: number } | null>(null);

  const statByCode = Object.fromEntries(STATE_STATISTICS.map(s => [s.stateCode, s]));

  return (
    <div>
      {/* Desktop: tile map */}
      <div className="hidden md:block relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: '100%', maxWidth: '680px', display: 'block', margin: '0 auto', overflow: 'visible' }}
          onMouseLeave={() => setHovered(null)}
        >
          {Object.entries(TILE_GRID).map(([code, [row, col]]) => {
            const stat = statByCode[code];
            if (!stat) return null;
            const x = col * STRIDE;
            const y = row * STRIDE;
            const fill = tileColor(stat.annualCrashes);
            const tc = textColor(stat.annualCrashes);
            return (
              <g
                key={code}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  const svgEl = e.currentTarget.closest('svg') as SVGSVGElement;
                  const rect = svgEl.getBoundingClientRect();
                  const svgW = rect.width;
                  const scaleX = svgW / W;
                  const scaleY = rect.height / H;
                  setHovered({
                    stat,
                    x: rect.left + (x + CELL / 2) * scaleX,
                    y: rect.top + y * scaleY,
                  });
                }}
                onClick={() => router.push(`/settlements/${stat.slug}`)}
              >
                <rect
                  x={x} y={y}
                  width={CELL} height={CELL}
                  rx={4}
                  fill={fill}
                  style={{ transition: 'opacity 0.15s' }}
                />
                <text
                  x={x + CELL / 2}
                  y={y + CELL / 2 + 4}
                  textAnchor="middle"
                  style={{ fontSize: '10px', fontWeight: 700, fill: tc, pointerEvents: 'none', letterSpacing: '-0.3px' }}
                >
                  {code}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Color legend */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <span className="text-xs" style={{ color: '#5a7090' }}>Fewer crashes</span>
          <div style={{
            width: '120px', height: '10px', borderRadius: '5px',
            background: 'linear-gradient(to right, rgb(10,24,41), rgb(212,168,75))',
          }} />
          <span className="text-xs" style={{ color: '#5a7090' }}>More crashes</span>
        </div>

        {/* Tooltip */}
        {hovered && (
          <div
            style={{
              position: 'fixed',
              left: hovered.x,
              top: hovered.y - 8,
              transform: 'translate(-50%, -100%)',
              zIndex: 50,
              pointerEvents: 'none',
              backgroundColor: '#060e1c',
              border: '1px solid rgba(212,168,75,0.4)',
              borderRadius: '8px',
              padding: '10px 14px',
              minWidth: '180px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <p className="font-black text-sm mb-2" style={{ color: '#D4A84B' }}>{hovered.stat.name}</p>
            <div className="space-y-1">
              {[
                { label: 'Annual Crashes', value: hovered.stat.annualCrashes.toLocaleString() },
                { label: 'Fatalities', value: hovered.stat.fatalities.toLocaleString() },
                { label: 'Injuries', value: hovered.stat.injuries.toLocaleString() },
                { label: 'Rate per 100K', value: hovered.stat.fatalityRatePer100K.toFixed(2) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-6 text-xs">
                  <span style={{ color: '#5a7090' }}>{label}</span>
                  <span className="font-bold" style={{ color: '#C8CADA' }}>{value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs mt-2" style={{ color: '#4a6480' }}>Click to view state details →</p>
          </div>
        )}
      </div>

      {/* Mobile: list view */}
      <div className="md:hidden">
        <div className="space-y-2">
          {[...STATE_STATISTICS]
            .sort((a, b) => b.annualCrashes - a.annualCrashes)
            .map((stat, i) => (
              <a
                key={stat.stateCode}
                href={`/settlements/${stat.slug}`}
                className="flex items-center gap-4 px-4 py-3 rounded-lg hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#0a1829', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-xs font-black w-6 text-right flex-shrink-0" style={{ color: '#5a7090' }}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-sm font-bold text-white truncate">{stat.name}</span>
                    <span className="text-sm font-black flex-shrink-0" style={{ color: '#D4A84B' }}>
                      {stat.annualCrashes.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1" style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${(stat.annualCrashes / maxCrashes) * 100}%`,
                        backgroundColor: tileColor(stat.annualCrashes),
                        borderRadius: '2px',
                      }}
                    />
                  </div>
                </div>
                <span className="text-xs flex-shrink-0" style={{ color: '#5a7090' }}>
                  {stat.fatalities} deaths
                </span>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
