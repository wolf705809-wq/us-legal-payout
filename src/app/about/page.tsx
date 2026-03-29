import type { Metadata } from 'next';
import NavHeader from '@/components/NavHeader';

export const metadata: Metadata = {
  title: 'About TruckSettlementPro — Free Truck Accident Settlement Calculator',
  description:
    'Learn about TruckSettlementPro, our data sources, and our mission to help truck accident victims understand their legal rights.',
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#060e1c', minHeight: '100vh', color: '#C8CADA' }}>
      <NavHeader />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <p
          className="text-xs font-black uppercase tracking-widest mb-4"
          style={{ color: '#D4A84B', letterSpacing: '0.22em' }}
        >
          About Us
        </p>
        <h1
          className="text-4xl md:text-5xl font-black text-white mb-5"
          style={{ letterSpacing: '-0.03em' }}
        >
          About TruckSettlementPro
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: '#8A95A8' }}>
          Helping truck accident victims understand the potential value of their case since 2024.
        </p>
      </section>

      {/* ── Our Mission ──────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-14 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <h2
          className="text-3xl font-black text-white mb-6"
          style={{ letterSpacing: '-0.02em' }}
        >
          Our Mission
        </h2>
        <p className="text-sm leading-relaxed mb-8 max-w-3xl" style={{ color: '#C8CADA' }}>
          Every year, thousands of people are injured or killed in crashes involving large commercial
          trucks. The aftermath — medical bills, lost wages, pain and suffering — can be
          overwhelming. Insurance companies and trucking carriers have experienced legal teams
          working to minimize payouts from day one.
        </p>
        <p className="text-sm leading-relaxed mb-10 max-w-3xl" style={{ color: '#C8CADA' }}>
          TruckSettlementPro was built to level the information playing field. Using publicly
          available FMCSA data, NHTSA crash statistics, and general legal principles, we give
          injured individuals a free, instant estimate of what their case might be worth — so they
          can walk into any attorney consultation informed and prepared.
        </p>

        {/* NOT a law firm disclaimer box */}
        <div
          className="px-6 py-5 rounded-xl max-w-3xl"
          style={{
            backgroundColor: 'rgba(212,168,75,0.07)',
            border: '1.5px solid rgba(212,168,75,0.35)',
          }}
        >
          <p className="text-sm leading-relaxed font-semibold" style={{ color: '#fde68a' }}>
            Important: TruckSettlementPro is NOT a law firm and does NOT provide legal advice. Our
            tools are for informational and educational purposes only. Nothing on this website
            creates an attorney-client relationship.
          </p>
        </div>
      </section>

      {/* ── What We Provide ──────────────────────────────────── */}
      <section
        className="max-w-6xl mx-auto px-6 py-14 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <h2
          className="text-3xl font-black text-white mb-10"
          style={{ letterSpacing: '-0.02em' }}
        >
          What We Provide
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Settlement Estimates',
              description:
                'Instant, data-driven estimates of potential settlement value based on injury severity, accident type, and state-specific legal factors — calculated entirely in your browser.',
            },
            {
              title: 'State Legal Information',
              description:
                'Detailed breakdowns of truck accident laws, liability rules, statute of limitations, and damage caps for all 50 states and Washington D.C.',
            },
            {
              title: 'FMCSA Carrier Data',
              description:
                'Access to Federal Motor Carrier Safety Administration records including carrier safety ratings, violation history, and insurance information for trucking companies involved in accidents.',
            },
            {
              title: 'Attorney Connections',
              description:
                'Optional free consultations with independent licensed truck accident attorneys in your state — at no cost and with no obligation to retain.',
            },
          ].map(({ title, description }) => (
            <div
              key={title}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: '#0a1829',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="w-2 h-2 rounded-full mb-4"
                style={{ backgroundColor: '#D4A84B' }}
              />
              <h3 className="text-base font-black text-white mb-3">{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#8A95A8' }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Data Sources ─────────────────────────────────────── */}
      <section
        className="max-w-6xl mx-auto px-6 py-14 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <h2
          className="text-3xl font-black text-white mb-4"
          style={{ letterSpacing: '-0.02em' }}
        >
          Data Sources
        </h2>
        <p className="text-sm leading-relaxed mb-10 max-w-2xl" style={{ color: '#8A95A8' }}>
          Our estimates are grounded in authoritative public datasets — not guesswork.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              badge: 'Federal',
              title: 'FMCSA MCMIS',
              subtitle: 'Motor Carrier Management Information System',
              description:
                'Carrier safety ratings, inspection records, crash history, and insurance data for over 500,000 registered motor carriers.',
            },
            {
              badge: 'Federal',
              title: 'NHTSA FARS',
              subtitle: 'Fatality Analysis Reporting System',
              description:
                'Nationwide census of fatal motor vehicle crashes, including detailed truck accident data going back decades.',
            },
            {
              badge: 'State',
              title: 'State Civil Codes',
              subtitle: 'All 50 States + D.C.',
              description:
                'Statute of limitations, comparative fault rules, damage caps, and negligence per se standards for every U.S. jurisdiction.',
            },
          ].map(({ badge, title, subtitle, description }) => (
            <div
              key={title}
              className="p-6 rounded-xl flex flex-col gap-3"
              style={{
                backgroundColor: '#0a1829',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <span
                className="text-xs font-black uppercase tracking-widest self-start px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: 'rgba(212,168,75,0.12)',
                  color: '#D4A84B',
                  letterSpacing: '0.16em',
                }}
              >
                {badge}
              </span>
              <div>
                <h3 className="text-base font-black text-white">{title}</h3>
                <p className="text-xs mt-0.5" style={{ color: '#D4A84B' }}>
                  {subtitle}
                </p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#8A95A8' }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Operated By ──────────────────────────────────────── */}
      <section
        className="max-w-6xl mx-auto px-6 py-14 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <h2
          className="text-3xl font-black text-white mb-6"
          style={{ letterSpacing: '-0.02em' }}
        >
          Operated By
        </h2>
        <p className="text-sm leading-relaxed max-w-3xl" style={{ color: '#C8CADA' }}>
          TruckSettlementPro is operated by{' '}
          <span className="text-white font-semibold">Nodal Logics</span>, a legal technology
          company specializing in public safety data analysis and consumer legal information. Nodal
          Logics builds tools that make complex legal and regulatory information accessible to
          everyday people navigating difficult situations.
        </p>
      </section>

      {/* ── Legal Review ─────────────────────────────────────── */}
      <section
        className="max-w-6xl mx-auto px-6 py-14 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <h2
          className="text-3xl font-black text-white mb-6"
          style={{ letterSpacing: '-0.02em' }}
        >
          Legal Review
        </h2>
        <p className="text-sm leading-relaxed max-w-3xl" style={{ color: '#C8CADA' }}>
          Our content is reviewed for accuracy by legal professionals familiar with commercial truck
          accident law across multiple U.S. jurisdictions. We strive to keep our state-specific
          legal information current as statutes and case law evolve.
        </p>
        <p className="text-sm mt-3 font-semibold" style={{ color: '#8A95A8' }}>
          Last reviewed: March 2026
        </p>
      </section>

      {/* ── Important Disclaimers ─────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-14 pb-24 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div
          className="p-7 rounded-2xl"
          style={{
            border: '2px solid rgba(212,168,75,0.45)',
            backgroundColor: 'rgba(212,168,75,0.04)',
          }}
        >
          <h2
            className="text-xl font-black mb-5"
            style={{ color: '#D4A84B', letterSpacing: '-0.01em' }}
          >
            Important Disclaimers
          </h2>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
            <p>
              <strong className="text-white">NOT A LAW FIRM.</strong> TruckSettlementPro is NOT a
              law firm and the people associated with this website are NOT acting as your attorneys.
              Nothing on this website should be interpreted as the practice of law.
            </p>
            <p>
              <strong className="text-white">NOT LEGAL ADVICE.</strong> The information and
              estimates provided on this website are for informational and educational purposes only.
              They do NOT constitute legal advice, legal opinion, or professional legal guidance of
              any kind. Do not rely on any information on this website as a substitute for
              professional legal advice.
            </p>
            <p>
              <strong className="text-white">NO ATTORNEY-CLIENT RELATIONSHIP.</strong> Using this
              website, completing the settlement calculator, or submitting a contact form does NOT
              create an attorney-client relationship between you and TruckSettlementPro, Nodal
              Logics, or any attorney. An attorney-client relationship is only established when you
              sign a written retainer agreement with a licensed attorney.
            </p>
            <p>
              <strong className="text-white">CONSULT AN ATTORNEY.</strong> If you have been injured
              in a truck accident, you should consult a licensed attorney in your state as soon as
              possible. Legal claims are subject to strict statutes of limitations and evidence can
              be lost or destroyed quickly. An attorney can evaluate the specific facts of your case
              and advise you of your actual legal rights.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
