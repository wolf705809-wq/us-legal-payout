import type { Metadata } from 'next';
import Link from 'next/link';
import NavHeader from '@/components/NavHeader';
import Footer from '@/components/Footer';
import StateFilterGrid from './StateFilterGrid';
import { ACTIVE_STATE_SLUGS, getStateBySlug } from '@/lib/state-laws';
import type { FaultRule } from '@/lib/state-laws';

export const metadata: Metadata = {
  title: 'Truck Accident Settlements by State — All 50 States | TruckSettlementPro',
  description:
    'Understand how your state\'s fault laws affect your truck accident settlement. Browse all 50 states — comparative fault rules, statutes of limitations, and settlement ranges.',
  openGraph: {
    title: 'Truck Accident Settlements by State — All 50 States | TruckSettlementPro',
    description:
      'Browse truck accident settlement information for all 50 states. State-specific comparative fault laws, statutes of limitations, and settlement data.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Truck Accident Settlements by State',
  description:
    'Comprehensive guide to truck accident settlements across all 50 US states, including fault rules, statutes of limitations, and estimated settlement ranges.',
  url: 'https://trucksettlementpro.com/settlements',
  publisher: {
    '@type': 'Organization',
    name: 'TruckSettlementPro',
    url: 'https://trucksettlementpro.com',
  },
};

function getFaultLabel(faultRule: FaultRule): string {
  switch (faultRule) {
    case 'pure_comparative':
      return 'Pure Comparative';
    case 'modified_51':
      return 'Modified 51% Bar';
    case 'modified_50':
      return 'Modified 50% Bar';
    case 'contributory':
      return 'Contributory Negligence';
    default:
      return faultRule;
  }
}

const FEATURED_SLUGS = ['texas', 'california', 'florida'];

export default function SettlementsHubPage() {
  // Build full allStates array
  const allStates = ACTIVE_STATE_SLUGS
    .map((slug) => {
      const state = getStateBySlug(slug);
      if (!state) return null;
      return {
        name: state.name,
        slug: state.slug,
        faultRule: state.faultRule,
        solYears: state.solYears,
      };
    })
    .filter((s): s is { name: string; slug: string; faultRule: FaultRule; solYears: number } => s !== null);

  // Featured state data
  const featuredStates = FEATURED_SLUGS
    .map((slug) => getStateBySlug(slug))
    .filter((s): s is NonNullable<ReturnType<typeof getStateBySlug>> => s !== null);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="flex flex-col min-h-screen font-sans">

        <NavHeader />

        {/* ── Hero ── */}
        <section
          style={{
            background: 'linear-gradient(168deg, #0a1422 0%, #0F1D32 50%, #132744 100%)',
            borderBottom: '3px solid #D4A84B',
          }}
        >
          <div className="max-w-5xl mx-auto px-6 py-24 md:py-28 text-center">
            <p
              className="text-xs font-black tracking-widest uppercase mb-6"
              style={{ color: '#D4A84B', letterSpacing: '0.25em' }}
            >
              All 50 States
            </p>
            <h1
              className="text-[2rem] sm:text-5xl lg:text-[3.5rem] font-black text-white"
              style={{ letterSpacing: '-0.02em', lineHeight: '1.12' }}
            >
              Truck Accident Settlements{' '}
              <span style={{ color: '#D4A84B' }}>by State</span>
            </h1>
            <p
              className="mt-6 text-lg max-w-2xl mx-auto"
              style={{ color: '#8A95A8', lineHeight: '1.75' }}
            >
              Your state&apos;s fault rule directly determines how much you can recover.
              Select your state below to see applicable comparative fault laws, the statute
              of limitations deadline, and estimated settlement ranges for truck accident cases.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/calculator"
                className="cta-gold inline-flex items-center rounded-lg text-base font-black"
                style={{
                  backgroundColor: '#D4A84B',
                  color: '#080f1a',
                  padding: '16px 36px',
                  minHeight: '52px',
                  boxShadow: '0 6px 32px rgba(212,168,75,0.38)',
                  letterSpacing: '-0.01em',
                }}
              >
                Start My Free Case Review →
              </Link>
              <p style={{ fontSize: '13px', color: '#4a6480' }}>
                Free · No sign-up · All 50 states
              </p>
            </div>
          </div>
        </section>

        {/* ── Main content ── */}
        <main style={{ backgroundColor: '#0a1829', flex: 1 }}>
          <div className="max-w-5xl mx-auto px-6 py-16">

            {/* ── Featured States ── */}
            <div className="mb-16">
              <p
                className="text-xs font-black tracking-widest uppercase mb-3"
                style={{ color: '#D4A84B', letterSpacing: '0.22em' }}
              >
                Featured States
              </p>
              <h2
                className="text-2xl sm:text-3xl font-black text-white mb-8"
                style={{ letterSpacing: '-0.02em' }}
              >
                Highest-Volume Truck Accident States
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {featuredStates.map((state) => (
                  <Link
                    key={state.slug}
                    href={`/settlements/${state.slug}`}
                    className="card-hover block rounded-xl p-6"
                    style={{
                      backgroundColor: '#0F1D32',
                      border: '1px solid rgba(212,168,75,0.18)',
                      borderLeft: '4px solid #D4A84B',
                      textDecoration: 'none',
                    }}
                  >
                    <h3
                      className="text-xl font-black text-white mb-2"
                      style={{ letterSpacing: '-0.01em' }}
                    >
                      {state.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#D4A84B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '10px',
                      }}
                    >
                      {getFaultLabel(state.faultRule)}
                    </p>
                    <p style={{ fontSize: '13px', color: '#8A95A8', marginBottom: '4px' }}>
                      Statute of limitations:{' '}
                      <strong style={{ color: '#C8CADA' }}>{state.solYears} year{state.solYears !== 1 ? 's' : ''}</strong>
                    </p>
                    <p
                      style={{
                        fontSize: '13px',
                        color: '#D4A84B',
                        marginTop: '14px',
                        fontWeight: 600,
                      }}
                    >
                      View {state.name} guide →
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── All States searchable grid ── */}
            <div>
              <p
                className="text-xs font-black tracking-widest uppercase mb-3"
                style={{ color: '#D4A84B', letterSpacing: '0.22em' }}
              >
                All 50 States
              </p>
              <h2
                className="text-2xl sm:text-3xl font-black text-white mb-2"
                style={{ letterSpacing: '-0.02em' }}
              >
                Find Your State
              </h2>
              <p style={{ fontSize: '14px', color: '#8A95A8', marginBottom: '8px' }}>
                Search or scroll to find your state&apos;s fault rule and statute of limitations.
              </p>

              <StateFilterGrid allStates={allStates} />
            </div>

            {/* ── Fault Rule Legend ── */}
            <div
              className="mt-16 rounded-xl p-6"
              style={{
                backgroundColor: '#0F1D32',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <h3
                className="text-base font-black text-white mb-5"
                style={{ letterSpacing: '-0.01em' }}
              >
                Fault Rule Quick Reference
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: 'Pure Comparative',
                    color: '#86efac',
                    desc: 'You can recover even if you are mostly at fault. Your award is reduced by your percentage of fault.',
                    states: '13 states — CA, NY, WA, FL*, and others',
                  },
                  {
                    label: 'Modified (51% Bar)',
                    color: '#D4A84B',
                    desc: 'You cannot recover if you are 51% or more at fault. Below that threshold, damages are reduced proportionally.',
                    states: '33 states — TX, IL, PA, and others',
                  },
                  {
                    label: 'Modified (50% Bar)',
                    color: '#D4A84B',
                    desc: 'Recovery is barred if your fault equals or exceeds 50%. Damages reduced for lower fault percentages.',
                    states: '12 states — CO, GA, TN, and others',
                  },
                  {
                    label: 'Contributory Negligence',
                    color: '#fca5a5',
                    desc: 'Any fault on your part — even 1% — bars all recovery. Only 4 states still use this harsh rule.',
                    states: '4 states — AL, MD, NC, VA',
                  },
                ].map(({ label, color, desc, states }) => (
                  <div
                    key={label}
                    style={{
                      borderLeft: `3px solid ${color}`,
                      paddingLeft: '14px',
                    }}
                  >
                    <p style={{ fontSize: '13px', fontWeight: 700, color, marginBottom: '4px' }}>
                      {label}
                    </p>
                    <p style={{ fontSize: '12px', color: '#8A95A8', lineHeight: '1.65', marginBottom: '4px' }}>
                      {desc}
                    </p>
                    <p style={{ fontSize: '11px', color: '#4a6480' }}>{states}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Why State Law Matters ── */}
            <div className="mt-16">
              <p
                className="text-xs font-black tracking-widest uppercase mb-3"
                style={{ color: '#D4A84B', letterSpacing: '0.22em' }}
              >
                Why It Matters
              </p>
              <h2
                className="text-2xl sm:text-3xl font-black text-white mb-5"
                style={{ letterSpacing: '-0.02em' }}
              >
                Why State Law Affects Your Settlement
              </h2>
              <div
                className="rounded-xl p-6 md:p-8"
                style={{
                  backgroundColor: '#0F1D32',
                  border: '1px solid rgba(212,168,75,0.15)',
                }}
              >
                <p style={{ color: '#C8CADA', lineHeight: '1.8', marginBottom: '16px', fontSize: '15px' }}>
                  The single biggest legal variable in a truck accident settlement is your state&apos;s
                  fault rule. In a pure comparative fault state like California or New York, you can
                  recover compensation even if you are found 80% at fault — your award is simply
                  reduced by 80%. In a contributory negligence state like Alabama or Maryland, even
                  1% of fault on your part legally bars all recovery.
                </p>
                <p style={{ color: '#8A95A8', lineHeight: '1.8', marginBottom: '16px', fontSize: '14px' }}>
                  The majority of states — including Texas, Florida, and Illinois — use modified
                  comparative fault with a 51% bar. This means you can recover if you are less than
                  51% at fault, but your damages are reduced proportionally. A $1,000,000 case where
                  you are found 30% at fault yields $700,000 in a modified fault state, compared to
                  $0 in a contributory negligence state.
                </p>
                <p style={{ color: '#8A95A8', lineHeight: '1.8', fontSize: '14px' }}>
                  Insurance adjusters are fully aware of these rules and use them aggressively when
                  making initial settlement offers. Understanding your state&apos;s fault rule before
                  you negotiate is one of the most important steps you can take to protect your claim.
                </p>
              </div>
            </div>

            {/* ── CTA ── */}
            <div
              className="mt-14 rounded-2xl p-8 md:p-10 text-center"
              style={{
                background: 'linear-gradient(135deg, #0a1829 0%, #0F1D32 100%)',
                border: '1px solid rgba(212,168,75,0.25)',
                borderTop: '3px solid #D4A84B',
              }}
            >
              <p
                className="text-xs font-black tracking-widest uppercase mb-4"
                style={{ color: '#D4A84B', letterSpacing: '0.22em' }}
              >
                Free · No Sign-Up Required
              </p>
              <h3
                className="text-2xl sm:text-3xl font-black text-white mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                Calculate Your Settlement Estimate
              </h3>
              <p
                className="max-w-xl mx-auto mb-8 text-sm"
                style={{ color: '#8A95A8', lineHeight: '1.75' }}
              >
                Our calculator applies your state&apos;s exact fault rule, injury multipliers,
                and FMCSA insurance minimums to generate a realistic settlement range — in under 3 minutes.
              </p>
              <Link
                href="/calculator"
                className="cta-gold inline-flex items-center rounded-lg text-base font-black"
                style={{
                  backgroundColor: '#D4A84B',
                  color: '#080f1a',
                  padding: '16px 40px',
                  minHeight: '52px',
                  boxShadow: '0 6px 32px rgba(212,168,75,0.38)',
                  letterSpacing: '-0.01em',
                }}
              >
                Start My Free Case Review →
              </Link>
            </div>

          </div>
        </main>

        {/* ── Footer ── */}
        <Footer />

      </div>
    </>
  );
}
