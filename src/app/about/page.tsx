import type { Metadata } from 'next';
import Link from 'next/link';
import NavHeader from '@/components/NavHeader';

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TruckSettlementPro',
  url: 'https://trucksettlementpro.com',
  description: 'Data platform providing truck accident settlement estimates for victims in all 50 U.S. states.',
  foundingDate: '2025',
  areaServed: 'US',
  knowsAbout: ['Truck accident law', 'Personal injury settlements', 'FMCSA regulations', 'Comparative fault law'],
};

export const metadata: Metadata = {
  title: 'About TruckSettlementPro — We Represent the Number',
  description:
    'TruckSettlementPro gives truck accident victims access to the same settlement data trucking companies use — free, before you sign anything.',
};

export default function AboutPage() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: '#060e1c', color: '#C8CADA' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema).replace(/</g, '\\u003c') }}
      />
      <NavHeader />

      {/* ── Hero ── */}
      <section
        style={{
          background: 'linear-gradient(168deg, #060e1c 0%, #0F1D32 60%, #0a1829 100%)',
          borderBottom: '3px solid #D4A84B',
        }}
      >
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p
            className="text-xs font-black uppercase tracking-widest mb-4"
            style={{ color: '#D4A84B', letterSpacing: '0.25em' }}
          >
            About Us
          </p>
          <h1
            className="text-4xl sm:text-5xl font-black text-white mb-5"
            style={{ letterSpacing: '-0.02em', lineHeight: '1.12' }}
          >
            About TruckSettlementPro
          </h1>
          <p className="text-lg" style={{ color: '#8A95A8', lineHeight: '1.75' }}>
            We don&apos;t represent you. We don&apos;t represent the insurance company.{' '}
            <span className="text-white font-semibold">We represent the number.</span>
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <main className="max-w-3xl mx-auto px-6 py-20 w-full space-y-14">

        {/* The problem */}
        <section>
          <div className="space-y-6 text-base" style={{ color: '#C8CADA', lineHeight: '1.85' }}>
            <p>
              When a commercial truck accident happens, two things occur simultaneously.
            </p>
            <p>
              You try to survive.
            </p>
            <p>
              The trucking company&apos;s legal team starts calculating.
            </p>
            <p>
              They know the FMCSA data. They know your state&apos;s fault rules. They know what
              cases like yours have settled for. They build their offer around that number — and
              then they offer you less.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(212,168,75,0.15)' }} />

        {/* Why we built this */}
        <section>
          <h2
            className="text-2xl font-black text-white mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            Why We Built This
          </h2>
          <div className="space-y-5 text-base" style={{ color: '#C8CADA', lineHeight: '1.85' }}>
            <p>
              We built TruckSettlementPro to close that gap. Not with lawyers. Not with advice.
              With the same data they use — open to anyone, free, before you sign anything.
            </p>
            <p>
              Every estimate on this site is traceable to a public record. Every fault rule is
              sourced to a specific state statute. Every multiplier is derived from real settlement
              data. Nothing is invented. Nothing is sold.
            </p>
            <p className="text-white font-semibold">
              You deserve to know your number before someone pressures you to accept theirs.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

        {/* How it works */}
        <section>
          <h2
            className="text-2xl font-black text-white mb-8"
            style={{ letterSpacing: '-0.02em' }}
          >
            How It Works
          </h2>
          <div className="space-y-4">
            {[
              {
                label: 'Public Data Only',
                text: 'FMCSA carrier safety records, NHTSA crash statistics, and state civil codes are all public record. We organize and surface what already exists.',
              },
              {
                label: 'State-Specific Fault Rules',
                text: 'Your state\'s comparative fault rule — pure comparative, modified 51% bar, or contributory negligence — directly determines what you can recover. We apply the correct rule for your jurisdiction.',
              },
              {
                label: 'Real Settlement Benchmarks',
                text: 'Our multipliers are grounded in documented settlement data by injury type and severity. We show ranges, not false precision.',
              },
              {
                label: 'No Sign-Up. No Upsell.',
                text: 'The calculator is free and requires no registration. If you choose to speak with an attorney, that is your decision — we never pressure or require it.',
              },
            ].map(({ label, text }) => (
              <div
                key={label}
                className="flex gap-4 p-5 rounded-xl"
                style={{
                  backgroundColor: '#0F1D32',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div
                  className="w-1.5 flex-shrink-0 rounded-full mt-1"
                  style={{ backgroundColor: '#D4A84B', alignSelf: 'flex-start', height: '18px' }}
                />
                <div>
                  <p className="text-sm font-black text-white mb-1">{label}</p>
                  <p className="text-sm" style={{ color: '#8A95A8', lineHeight: '1.7' }}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

        {/* Operated By */}
        <section>
          <h2
            className="text-2xl font-black text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            Operated By
          </h2>
          <p className="text-sm" style={{ color: '#C8CADA', lineHeight: '1.8' }}>
            TruckSettlementPro is operated by{' '}
            <span className="text-white font-semibold">Nodal Logics</span>, a legal technology
            company focused on making complex legal and regulatory information accessible to
            people who need it most.
          </p>
        </section>

        {/* ── CTA ── */}
        <section
          className="rounded-2xl p-10 text-center"
          style={{
            background: 'linear-gradient(135deg, #0F1D32 0%, #0a1829 100%)',
            border: '2px solid rgba(212,168,75,0.3)',
          }}
        >
          <p
            className="text-xs font-black uppercase tracking-widest mb-3"
            style={{ color: '#D4A84B', letterSpacing: '0.22em' }}
          >
            Free · No Sign-Up · 3 Minutes
          </p>
          <h2
            className="text-2xl font-black text-white mb-3"
            style={{ letterSpacing: '-0.02em' }}
          >
            Know Your Number Before You Sign Anything
          </h2>
          <p className="text-sm mb-7 max-w-md mx-auto" style={{ color: '#8A95A8', lineHeight: '1.75' }}>
            Use our calculator to estimate your settlement based on your state&apos;s fault laws,
            FMCSA carrier data, and injury-specific multipliers.
          </p>
          <Link
            href="/calculator"
            className="cta-gold inline-flex items-center rounded-lg font-black"
            style={{
              backgroundColor: '#D4A84B',
              color: '#080f1a',
              padding: '16px 40px',
              fontSize: '16px',
            }}
          >
            See What Your Case Is Worth →
          </Link>
        </section>

        {/* ── Disclaimer ── */}
        <div
          className="px-6 py-5 rounded-xl text-sm leading-relaxed"
          style={{
            backgroundColor: 'rgba(212,168,75,0.04)',
            border: '1.5px solid rgba(212,168,75,0.2)',
            color: '#8A95A8',
          }}
        >
          <p className="font-black text-white mb-3" style={{ fontSize: '13px' }}>Important Disclaimers</p>
          <div className="space-y-2 text-xs" style={{ color: '#5a7090', lineHeight: '1.8' }}>
            <p>
              <strong style={{ color: '#8A95A8' }}>NOT A LAW FIRM.</strong> TruckSettlementPro is
              not a law firm. Nothing on this website constitutes legal advice or creates an
              attorney-client relationship.
            </p>
            <p>
              <strong style={{ color: '#8A95A8' }}>CONSULT AN ATTORNEY.</strong> If you have been
              injured in a truck accident, consult a licensed attorney in your state as soon as
              possible. Legal claims are subject to strict statutes of limitations.
            </p>
          </div>
        </div>

      </main>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: '#040b16', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
        <div className="max-w-3xl mx-auto px-6 py-8 text-xs flex flex-col sm:flex-row justify-between gap-3" style={{ color: '#2d3f54' }}>
          <p>
            <strong style={{ color: '#3d5270' }}>Attorney Advertising</strong> · Not a law firm · Not legal advice ·
            © 2026 Nodal Logics
          </p>
          <div className="flex gap-4">
            <Link href="/terms" style={{ color: '#3d5270' }} className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" style={{ color: '#3d5270' }} className="hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
