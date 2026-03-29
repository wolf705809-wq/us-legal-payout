'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItem {
  label: string;
  num: number;
  prefix: string;
  suffix: string;
  sub: string;
}

function CountUp({
  num,
  prefix,
  suffix,
  duration = 1500,
}: {
  num: number;
  prefix: string;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTs: number | null = null;
    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [started, num, duration]);

  const formatted = count >= 10000
    ? count.toLocaleString()
    : count >= 1000
    ? count.toLocaleString()
    : count.toString();

  return (
    <span ref={spanRef}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

export default function StatsCounter({ stats }: { stats: StatItem[] }) {
  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4"
      style={{ gap: '1px', backgroundColor: 'rgba(212,168,75,0.18)' }}
    >
      {stats.map(({ label, num, prefix, suffix, sub }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center text-center px-6 py-14"
          style={{ backgroundColor: '#0a1829' }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: '#8A95A8', letterSpacing: '0.18em' }}
          >
            {label}
          </p>
          <p
            className="text-4xl sm:text-5xl font-black tracking-tight mb-3 tabular-nums"
            style={{ color: '#D4A84B', fontVariantNumeric: 'tabular-nums' }}
          >
            <CountUp num={num} prefix={prefix} suffix={suffix} />
          </p>
          <p className="text-xs leading-snug max-w-[140px]" style={{ color: '#3d5270' }}>
            {sub}
          </p>
        </div>
      ))}
    </div>
  );
}
