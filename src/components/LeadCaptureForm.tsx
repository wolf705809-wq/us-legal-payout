'use client';

import { useState, useEffect } from 'react';
import { captureUtmParams, getStoredUtmParams } from '@/lib/utm';
import CallNowButton from '@/components/common/CallNowButton';

interface Props {
  stateName: string;
  accidentType?: string;
  estimateLow?: number;
  estimateHigh?: number;
  source?: string;
}

// ── Phone formatting ─────────────────────────────────────────────────────────

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// ── Email domain oops detection ───────────────────────────────────────────────

const COMMON_DOMAINS: Record<string, string> = {
  'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gamil.com': 'gmail.com',
  'gnail.com': 'gmail.com', 'gmaill.com': 'gmail.com',
  'yaho.com': 'yahoo.com', 'yahooo.com': 'yahoo.com', 'yhaoo.com': 'yahoo.com',
  'hotmial.com': 'hotmail.com', 'hotmal.com': 'hotmail.com',
  'outlok.com': 'outlook.com', 'otlook.com': 'outlook.com',
  'iclod.com': 'icloud.com', 'icould.com': 'icloud.com',
};

function suggestEmail(email: string): string | null {
  const at = email.lastIndexOf('@');
  if (at < 1) return null;
  const domain = email.slice(at + 1).toLowerCase();
  return COMMON_DOMAINS[domain] ? `${email.slice(0, at + 1)}${COMMON_DOMAINS[domain]}` : null;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function LeadCaptureForm({
  stateName, accidentType, estimateLow, estimateHigh, source = 'pseo-page',
}: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);

  useEffect(() => { captureUtmParams(); }, []);

  const handlePhoneChange = (raw: string) => {
    setForm(p => ({ ...p, phone: formatPhone(raw) }));
  };

  const handleEmailChange = (val: string) => {
    setForm(p => ({ ...p, email: val }));
    setEmailSuggestion(suggestEmail(val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setLoading(true);
    const utm = getStoredUtmParams();
    try {
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          state: stateName,
          accidentType,
          estimateLow,
          estimateHigh,
          source,
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
          ...utm,
        }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid rgba(255,255,255,0.15)',
    backgroundColor: '#1a2e4a',
    color: 'white',
    fontSize: '0.875rem',
    outline: 'none',
  };

  if (submitted) {
    return (
      <div className="text-center py-8 space-y-4">
        <p className="text-2xl font-black text-white">✅ We&apos;ve received your information.</p>
        <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
          A licensed attorney in <strong style={{ color: '#D4A84B' }}>{stateName}</strong> will
          contact you within 24 hours. In the meantime, save this page for reference.
        </p>
        <div className="pt-2">
          <CallNowButton size="sm" />
          <p className="text-xs mt-2" style={{ color: '#4a5e78' }}>For urgent matters, call us directly.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: '#8A95A8' }}>
            Full Name *
          </label>
          <input
            type="text" required
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            placeholder="John Smith"
            style={fieldStyle}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: '#8A95A8' }}>
            Phone Number *
          </label>
          <input
            type="tel" required
            value={form.phone}
            onChange={e => handlePhoneChange(e.target.value)}
            placeholder="(555) 555-5555"
            style={fieldStyle}
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#8A95A8' }}>
          Email Address *
        </label>
        <input
          type="email" required
          value={form.email}
          onChange={e => handleEmailChange(e.target.value)}
          placeholder="john@example.com"
          style={fieldStyle}
        />
        {emailSuggestion && (
          <p className="text-xs mt-1.5 px-1" style={{ color: '#D4A84B' }}>
            Did you mean{' '}
            <button
              type="button"
              onClick={() => { setForm(p => ({ ...p, email: emailSuggestion })); setEmailSuggestion(null); }}
              className="underline font-semibold"
              style={{ color: '#D4A84B' }}
            >
              {emailSuggestion}
            </button>
            ?
          </p>
        )}
      </div>

      {/* Consent */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
          className="mt-0.5 flex-shrink-0"
          style={{ width: '16px', height: '16px', accentColor: '#D4A84B' }}
        />
        <span className="text-xs leading-relaxed" style={{ color: '#8A95A8' }}>
          I understand that TruckSettlementPro is <strong style={{ color: '#C8CADA' }}>not a law firm</strong>, that settlement estimates are for informational purposes only, and that by submitting this form I consent to being contacted by licensed attorneys in my state.{' '}
          <a href="/terms" style={{ color: '#5a7090', textDecoration: 'underline' }}>Terms</a>
          {' · '}
          <a href="/privacy" style={{ color: '#5a7090', textDecoration: 'underline' }}>Privacy Policy</a>
        </span>
      </label>

      <button
        type="submit"
        disabled={loading || !consent}
        className="w-full py-4 rounded-lg font-black text-sm transition-opacity"
        style={{
          backgroundColor: (!consent || loading) ? '#5a4820' : '#D4A84B',
          color: (!consent || loading) ? '#8a7040' : '#0F1D32',
          cursor: (!consent || loading) ? 'not-allowed' : 'pointer',
          opacity: !consent ? 0.7 : 1,
        }}
      >
        {loading
          ? 'Connecting you with an attorney…'
          : `Get My Free Case Evaluation`}
      </button>

      {/* What happens next */}
      <div
        className="mt-6 pt-6 space-y-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
      >
        <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#5a7090', letterSpacing: '0.18em' }}>
          What happens next?
        </p>
        {[
          { n: '1', text: 'A licensed truck accident attorney in your state reviews your submission — usually within hours.' },
          { n: '2', text: 'They contact you for a free, no-obligation consultation to discuss the facts of your case.' },
          { n: '3', text: 'If they take your case, they work on contingency — you pay nothing unless you win.' },
        ].map(({ n, text }) => (
          <div key={n} className="flex items-start gap-3">
            <div
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
              style={{
                backgroundColor: 'rgba(212,168,75,0.15)',
                border: '1px solid rgba(212,168,75,0.35)',
                color: '#D4A84B',
              }}
            >
              {n}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#8A95A8' }}>{text}</p>
          </div>
        ))}
      </div>
    </form>
  );
}
