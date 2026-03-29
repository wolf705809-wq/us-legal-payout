'use client';
import { useState } from 'react';

const TREND_DATA = [
  { year: 2018, crashes: 148672, fatalities: 4862 },
  { year: 2019, crashes: 150564, fatalities: 4479 },
  { year: 2020, crashes: 117988, fatalities: 4444 },
  { year: 2021, crashes: 142462, fatalities: 5788 },
  { year: 2022, crashes: 155618, fatalities: 4998 },
  { year: 2023, crashes: 164347, fatalities: 5461 },
];

const ML = 72, MR = 72, MT = 20, MB = 44;
const PW = 560, PH = 220;
const SVG_W = PW + ML + MR;
const SVG_H = PH + MT + MB;

const CRASH_MIN = 100000, CRASH_MAX = 180000;
const FATAL_MIN = 4000, FATAL_MAX = 6500;

function xPos(year: number): number {
  return ML + ((year - 2018) / 5) * PW;
}
function yCrash(val: number): number {
  return MT + PH - ((val - CRASH_MIN) / (CRASH_MAX - CRASH_MIN)) * PH;
}
function yFatal(val: number): number {
  return MT + PH - ((val - FATAL_MIN) / (FATAL_MAX - FATAL_MIN)) * PH;
}

const crashPath = TREND_DATA.map((d, i) =>
  `${i === 0 ? 'M' : 'L'}${xPos(d.year).toFixed(1)},${yCrash(d.crashes).toFixed(1)}`
).join(' ');
const fatalPath = TREND_DATA.map((d, i) =>
  `${i === 0 ? 'M' : 'L'}${xPos(d.year).toFixed(1)},${yFatal(d.fatalities).toFixed(1)}`
).join(' ');

// Y-axis ticks
const crashTicks = [100000, 120000, 140000, 160000, 180000];
const fatalTicks = [4000, 4500, 5000, 5500, 6000, 6500];

function fmtCrash(n: number): string {
  return `${(n / 1000).toFixed(0)}K`;
}

export default function TrendChart() {
  const [tooltip, setTooltip] = useState<{ d: typeof TREND_DATA[0]; x: number; y: number } | null>(null);

  return (
    <div style={{ position: 'relative' }}>
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        style={{ width: '100%', display: 'block', overflow: 'visible' }}
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Grid lines */}
        {crashTicks.map(v => (
          <line
            key={v}
            x1={ML} y1={yCrash(v)}
            x2={ML + PW} y2={yCrash(v)}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
          />
        ))}

        {/* X axis */}
        <line x1={ML} y1={MT + PH} x2={ML + PW} y2={MT + PH} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />

        {/* Left Y-axis labels (crashes) */}
        {crashTicks.map(v => (
          <text key={v} x={ML - 8} y={yCrash(v) + 4} textAnchor="end"
            style={{ fontSize: '10px', fill: '#D4A84B', fontWeight: 600 }}>
            {fmtCrash(v)}
          </text>
        ))}

        {/* Right Y-axis labels (fatalities) */}
        {fatalTicks.map(v => (
          <text key={v} x={ML + PW + 8} y={yFatal(v) + 4} textAnchor="start"
            style={{ fontSize: '10px', fill: '#ef8080', fontWeight: 600 }}>
            {v.toLocaleString()}
          </text>
        ))}

        {/* X-axis labels */}
        {TREND_DATA.map(d => (
          <text key={d.year} x={xPos(d.year)} y={MT + PH + 20} textAnchor="middle"
            style={{ fontSize: '11px', fill: '#8A95A8' }}>
            {d.year}
          </text>
        ))}

        {/* Left axis label */}
        <text transform={`rotate(-90) translate(-${MT + PH / 2}, 16)`} textAnchor="middle"
          style={{ fontSize: '10px', fill: '#D4A84B', fontWeight: 700 }}>
          Annual Crashes
        </text>

        {/* Right axis label */}
        <text transform={`rotate(90) translate(${MT + PH / 2}, -${ML + PW + MR - 12})`} textAnchor="middle"
          style={{ fontSize: '10px', fill: '#ef8080', fontWeight: 700 }}>
          Fatalities
        </text>

        {/* Crash line */}
        <path d={crashPath} fill="none" stroke="#D4A84B" strokeWidth={2.5} strokeLinejoin="round" />
        {/* Crash area fill */}
        <path
          d={`${crashPath} L${xPos(2023).toFixed(1)},${MT + PH} L${xPos(2018).toFixed(1)},${MT + PH} Z`}
          fill="rgba(212,168,75,0.08)"
        />

        {/* Fatal line */}
        <path d={fatalPath} fill="none" stroke="#ef8080" strokeWidth={2.5} strokeLinejoin="round" strokeDasharray="6 3" />

        {/* Data points — crashes */}
        {TREND_DATA.map(d => (
          <circle
            key={d.year}
            cx={xPos(d.year)} cy={yCrash(d.crashes)} r={5}
            fill="#D4A84B" stroke="#0a1829" strokeWidth={2}
            style={{ cursor: 'pointer' }}
            onMouseEnter={(e) => {
              const svg = e.currentTarget.closest('svg') as SVGSVGElement;
              const rect = svg.getBoundingClientRect();
              const scaleX = rect.width / SVG_W;
              const scaleY = rect.height / SVG_H;
              setTooltip({
                d,
                x: rect.left + xPos(d.year) * scaleX,
                y: rect.top + yCrash(d.crashes) * scaleY,
              });
            }}
          />
        ))}

        {/* Data points — fatalities */}
        {TREND_DATA.map(d => (
          <circle
            key={`f-${d.year}`}
            cx={xPos(d.year)} cy={yFatal(d.fatalities)} r={4}
            fill="#ef8080" stroke="#0a1829" strokeWidth={2}
            style={{ cursor: 'pointer' }}
            onMouseEnter={(e) => {
              const svg = e.currentTarget.closest('svg') as SVGSVGElement;
              const rect = svg.getBoundingClientRect();
              const scaleX = rect.width / SVG_W;
              const scaleY = rect.height / SVG_H;
              setTooltip({
                d,
                x: rect.left + xPos(d.year) * scaleX,
                y: rect.top + yFatal(d.fatalities) * scaleY,
              });
            }}
          />
        ))}
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 mt-3">
        <div className="flex items-center gap-2">
          <div style={{ width: '24px', height: '3px', backgroundColor: '#D4A84B', borderRadius: '2px' }} />
          <span className="text-xs" style={{ color: '#8A95A8' }}>Total Crashes</span>
        </div>
        <div className="flex items-center gap-2">
          <div style={{ width: '24px', height: '3px', backgroundColor: '#ef8080', borderRadius: '2px', borderTop: '2px dashed #ef8080', background: 'none' }} />
          <span className="text-xs" style={{ color: '#8A95A8' }}>Fatalities</span>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y - 8,
            transform: 'translate(-50%, -100%)',
            zIndex: 50,
            pointerEvents: 'none',
            backgroundColor: '#060e1c',
            border: '1px solid rgba(212,168,75,0.4)',
            borderRadius: '8px',
            padding: '10px 14px',
            minWidth: '160px',
          }}
        >
          <p className="font-black text-sm mb-2" style={{ color: '#D4A84B' }}>{tooltip.d.year}</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-4">
              <span style={{ color: '#5a7090' }}>Crashes</span>
              <span className="font-bold" style={{ color: '#D4A84B' }}>{tooltip.d.crashes.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span style={{ color: '#5a7090' }}>Fatalities</span>
              <span className="font-bold" style={{ color: '#ef8080' }}>{tooltip.d.fatalities.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
