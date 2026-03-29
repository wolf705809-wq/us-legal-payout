'use client';

import { useExitIntent } from '@/hooks/useExitIntent';
import Link from 'next/link';

interface Props {
  stateName: string;
  stateSlug: string;
}

export default function ExitIntentPopup({ stateName, stateSlug }: Props) {
  const { shouldShow, dismiss } = useExitIntent({ minTimeMs: 15_000 });

  if (!shouldShow) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Before You Go"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-8 text-center"
        style={{
          backgroundColor: '#0F1D32',
          border: '2px solid rgba(212,168,75,0.4)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          animation: 'fadeSlideIn 0.25s ease-out',
        }}
      >
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-lg leading-none transition-colors hover:text-white"
          style={{ color: '#4a5e78' }}
          aria-label="Close"
        >
          ✕
        </button>

        <p
          className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: '#D4A84B', letterSpacing: '0.2em' }}
        >
          Before You Go
        </p>

        <h2 className="text-2xl font-extrabold text-white mb-3 leading-tight">
          Know What Your Case Is Worth
        </h2>

        <p className="text-sm mb-7 leading-relaxed" style={{ color: '#C8CADA' }}>
          Get a free estimate based on{' '}
          <strong style={{ color: '#D4A84B' }}>{stateName}</strong> law in under 2 minutes.
          No sign-up required.
        </p>

        <Link
          href={`/calculator?state=${stateSlug}`}
          onClick={dismiss}
          className="block w-full py-4 rounded-lg font-black text-sm transition-all hover:opacity-90 mb-4"
          style={{ backgroundColor: '#D4A84B', color: '#0F1D32' }}
        >
          Get My Free Estimate →
        </Link>

        <button
          onClick={dismiss}
          className="text-xs transition-colors hover:text-white"
          style={{ color: '#4a5e78' }}
        >
          No thanks, I&apos;ll figure it out myself
        </button>
      </div>
    </div>
  );
}
