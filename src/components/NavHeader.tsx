'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/calculator', label: 'Calculator' },
  { href: '/settlements', label: 'By State' },
  { href: '/companies', label: 'Companies' },
  { href: '/guides', label: 'Guides' },
];

export default function NavHeader() {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when nav is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        style={{
          backgroundColor: '#080f1a',
          borderBottom: '1px solid rgba(212,168,75,0.18)',
          position: 'relative',
          zIndex: 40,
        }}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-black tracking-tight"
            style={{ color: '#D4A84B', letterSpacing: '-0.01em' }}
          >
            TruckSettlementPro
          </Link>

          {/* Desktop nav */}
          <div
            className="hidden md:flex items-center gap-8 text-sm font-medium"
            style={{ color: '#5a7090' }}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/calculator"
              className="cta-gold text-sm font-black px-5 rounded inline-flex items-center"
              style={{
                backgroundColor: '#D4A84B',
                color: '#080f1a',
                minHeight: '48px',
              }}
            >
              Free Calculator
            </Link>

            {/* Hamburger button — mobile only */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              style={{ color: '#8A95A8', position: 'relative', zIndex: 60 }}
            >
              {/* Animated hamburger — three lines → X */}
              <span style={{ display: 'block', width: '20px', position: 'relative', height: '16px' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: 0, right: 0,
                    height: '2px',
                    backgroundColor: 'currentColor',
                    borderRadius: '1px',
                    top: open ? '7px' : '0',
                    transform: open ? 'rotate(45deg)' : 'none',
                    transition: 'top 0.2s ease, transform 0.2s ease 0.1s',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    left: 0, right: 0,
                    height: '2px',
                    backgroundColor: 'currentColor',
                    borderRadius: '1px',
                    top: '7px',
                    opacity: open ? 0 : 1,
                    transition: 'opacity 0.15s ease',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    left: 0, right: 0,
                    height: '2px',
                    backgroundColor: 'currentColor',
                    borderRadius: '1px',
                    top: open ? '7px' : '14px',
                    transform: open ? 'rotate(-45deg)' : 'none',
                    transition: 'top 0.2s ease, transform 0.2s ease 0.1s',
                  }}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen mobile overlay */}
      {open && (
        <div
          className="nav-overlay md:hidden"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            backgroundColor: '#080f1a',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%', padding: '0 32px' }}>
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  padding: '16px',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#C8CADA',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4A84B')}
                onMouseLeave={e => (e.currentTarget.style.color = '#C8CADA')}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div style={{ marginTop: '32px', width: '100%', padding: '0 32px' }}>
            <Link
              href="/calculator"
              onClick={() => setOpen(false)}
              className="cta-gold"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '56px',
                backgroundColor: '#D4A84B',
                color: '#080f1a',
                fontWeight: 900,
                fontSize: '16px',
                borderRadius: '10px',
              }}
            >
              Free Settlement Calculator →
            </Link>
          </div>
          <p style={{ marginTop: '24px', fontSize: '12px', color: '#3d5270' }}>
            No sign-up · No personal info required
          </p>
        </div>
      )}
    </>
  );
}
