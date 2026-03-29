'use client';

import Link from 'next/link';
import { useScrollDepth } from '@/hooks/useScrollDepth';

interface Props {
  stateSlug: string;
}

export default function StickyCtaBar({ stateSlug }: Props) {
  const scrollDepth = useScrollDepth();
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER ?? '';

  const visible = scrollDepth >= 200;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 sm:hidden"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <div
        className="flex items-stretch"
        style={{
          backgroundColor: '#0F1D32',
          borderTop: '1px solid rgba(212,168,75,0.35)',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.4)',
        }}
      >
        <Link
          href={`/calculator?state=${stateSlug}`}
          className="flex-1 flex items-center justify-center py-4 font-black text-sm"
          style={{ backgroundColor: '#D4A84B', color: '#0F1D32' }}
        >
          Get Free Estimate →
        </Link>
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center justify-center gap-2 px-5 font-bold text-sm"
            style={{
              color: '#D4A84B',
              borderLeft: '1px solid rgba(212,168,75,0.2)',
            }}
          >
            <span>📞</span>
            <span>Call Now</span>
          </a>
        )}
      </div>
    </div>
  );
}
