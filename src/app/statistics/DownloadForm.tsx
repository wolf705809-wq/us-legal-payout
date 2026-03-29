'use client';
import { useState } from 'react';

export default function DownloadForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'statistics-download' }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <p className="text-xl font-black text-white mb-2">Check your inbox</p>
        <p className="text-sm" style={{ color: '#8A95A8' }}>
          The 2024 Truck Accident Data Report will be delivered to {email} within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1"
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255,255,255,0.15)',
            backgroundColor: '#0a1829',
            color: 'white',
            fontSize: '0.875rem',
            outline: 'none',
            minHeight: '48px',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="cta-gold font-black text-sm px-6 rounded-lg flex-shrink-0 inline-flex items-center justify-center"
          style={{
            backgroundColor: loading ? '#a07e34' : '#D4A84B',
            color: '#080f1a',
            cursor: loading ? 'wait' : 'pointer',
            minHeight: '48px',
          }}
        >
          {loading ? 'Sending...' : 'Download Free Report ->'}
        </button>
      </div>
      <p className="mt-3 text-xs" style={{ color: '#3d5270' }}>
        No spam. Unsubscribe at any time.{' '}
        <a href="/privacy" style={{ color: '#4a6480', textDecoration: 'underline' }}>Privacy Policy</a>.
      </p>
    </form>
  );
}
