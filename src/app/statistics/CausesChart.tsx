'use client';
import { useEffect, useRef, useState } from 'react';

const CAUSES = [
  { label: 'Brake Failure / Defects', category: 'Vehicle', pct: 29, color: '#6b8fa8' },
  { label: 'Driver Fatigue / Hours of Service Violation', category: 'Driver', pct: 18, color: '#D4A84B' },
  { label: 'Speeding / Too Fast for Conditions', category: 'Driver', pct: 12, color: '#D4A84B' },
  { label: 'Driver Distraction / Inattention', category: 'Driver', pct: 9, color: '#D4A84B' },
  { label: 'Adverse Weather Conditions', category: 'Environmental', pct: 8, color: '#7aab8a' },
  { label: 'Tire Failure / Blowout', category: 'Vehicle', pct: 6, color: '#6b8fa8' },
  { label: 'Improper Cargo Loading / Unsecured Load', category: 'Vehicle/Operator', pct: 5, color: '#6b8fa8' },
  { label: 'Road / Surface Conditions', category: 'Environmental', pct: 4, color: '#7aab8a' },
  { label: 'Following Too Closely', category: 'Driver', pct: 3, color: '#D4A84B' },
  { label: 'Drugs / Alcohol Impairment', category: 'Driver', pct: 3, color: '#D4A84B' },
];

const MAX_PCT = 29;

export default function CausesChart() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-3">
      {CAUSES.map(({ label, category, pct, color }) => (
        <div key={label}>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 flex-1 min-w-0 pr-4">
              <span
                className="flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded"
                style={{
                  backgroundColor: `${color}18`,
                  color,
                  fontSize: '10px',
                  letterSpacing: '0.05em',
                }}
              >
                {category.toUpperCase()}
              </span>
              <span className="text-sm truncate" style={{ color: '#C8CADA' }}>{label}</span>
            </div>
            <span className="flex-shrink-0 font-black text-sm" style={{ color: '#D4A84B' }}>{pct}%</span>
          </div>
          <div style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: animated ? `${(pct / MAX_PCT) * 100}%` : '0%',
                backgroundColor: color,
                borderRadius: '4px',
                transition: 'width 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${CAUSES.findIndex(c => c.label === label) * 60}ms`,
              }}
            />
          </div>
        </div>
      ))}
      <p className="text-xs pt-2" style={{ color: '#3d5270' }}>
        Source: FMCSA Large Truck Crash Causation Study (LTCCS). Percentages represent contributing factor in crashes; multiple factors may apply per crash.
      </p>
    </div>
  );
}
