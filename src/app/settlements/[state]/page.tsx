import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getStateBySlug, ACTIVE_STATE_SLUGS } from '@/lib/state-laws';
import { ACCIDENT_TYPES } from '@/lib/accident-types';
import { INJURY_TYPES } from '@/lib/injury-types';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import NavHeader from '@/components/NavHeader';

// ── Static generation ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return ACTIVE_STATE_SLUGS.map(state => ({ state }));
}

// ── Metadata ───────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ state: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params;
  const sd = getStateBySlug(state);
  if (!sd) return { title: 'Not Found' };

  const title = `${sd.name} Truck Accident Settlements — State Laws, Data & Attorney Resources`;
  const description = `Truck accident settlement data for ${sd.name}. Covers ${sd.name}'s ${sd.faultRule.replace(/_/g, ' ')} fault rule, ${sd.solYears}-year statute of limitations, and average settlement ranges for all 12 accident types.`;

  return {
    title,
    description,
    alternates: { canonical: `/settlements/${state}` },
    openGraph: { title, description, type: 'article' },
  };
}

// ── Settlement range helper ────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  return `$${Math.round(n / 1_000)}K`;
}

// "Moderate" baseline: $75K econ × (1 + 4) multiplier
const MODERATE_RANGE = { low: fmt(75_000 * 5 * 0.70), high: fmt(75_000 * 5 * 1.35) };

// ── Fault rule labels ──────────────────────────────────────────────────────────

const FAULT_LABELS: Record<string, { label: string; badge: string }> = {
  pure_comparative:  { label: 'Pure Comparative Fault',           badge: 'Most plaintiff-friendly' },
  modified_51:       { label: 'Modified Comparative (51% Bar)',    badge: 'You must be <51% at fault' },
  modified_50:       { label: 'Modified Comparative (50% Bar)',    badge: 'You must be <50% at fault' },
  contributory:      { label: 'Contributory Negligence',           badge: 'Any fault bars recovery' },
};

// ── JSON-LD ────────────────────────────────────────────────────────────────────

function buildJsonLd(stateName: string, stateSlug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `TruckSettlementPro — ${stateName} Truck Accident Settlements`,
    url: `https://trucksettlementpro.com/settlements/${stateSlug}`,
    description: `Settlement data, state fault laws, and attorney resources for ${stateName} truck accident victims.`,
    areaServed: { '@type': 'State', name: stateName },
    serviceType: 'Legal Information Service',
  };
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function StateLandingPage({ params }: Props) {
  const { state } = await params;
  const sd = getStateBySlug(state);
  if (!sd) notFound();

  const faultInfo = FAULT_LABELS[sd.faultRule] ?? { label: sd.faultRule, badge: '' };
  const jsonLd = buildJsonLd(sd.name, state);

  // Type-specific ranges for the card grid — three representative severity levels
  const CARD_RANGES = [
    { severity: 'Minor',       baseEcon: 25_000,  mult: 2   },
    { severity: 'Moderate',    baseEcon: 75_000,  mult: 4   },
    { severity: 'Severe',      baseEcon: 200_000, mult: 6.5 },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#111827', color: 'white' }}>

        {/* ── Nav ── */}
        <NavHeader />

        {/* ── Hero ── */}
        <section style={{ background: 'linear-gradient(160deg, #0a1422 0%, #080f1e 100%)', borderBottom: '3px solid #D4A84B' }}>
          <div className="max-w-5xl mx-auto px-6 py-16">

            {/* Breadcrumb [3-1] */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <a href="/settlements" style={{ color: '#D4A84B', textDecoration: 'none' }}>Settlements</a>
              <span style={{ color: '#4B5A72' }}>›</span>
              <span style={{ color: '#8A95A8' }}>{sd.name}</span>
            </nav>

            {/* Gold accent line [3-2] */}
            <div style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, #D4A84B, #F5D078)', borderRadius: '2px', marginBottom: '12px' }} />

            <h1 style={{ fontSize: 'clamp(24px, 6vw, 40px)', fontWeight: 900, letterSpacing: '-0.5px', lineHeight: 1.2, color: 'white', marginBottom: '12px' }}>
              {sd.name} Truck Accident Settlements
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: '#C8CADA' }}>
              State-specific settlement ranges, {sd.name}&apos;s{' '}
              <strong className="text-white">{faultInfo.label.toLowerCase()}</strong> rule, and
              attorney resources for all 12 accident types.
            </p>

            {/* Warning banner [3-4] */}
            {sd.specialNote && (
              <div style={{ background: 'rgba(212,168,75,0.08)', border: '1px solid rgba(212,168,75,0.30)', borderLeft: '3px solid #D4A84B', borderRadius: '8px', padding: '14px 16px', margin: '16px 0' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '16px', flexShrink: 0 }}>⚠️</span>
                  <div style={{ color: '#C8CADA', fontSize: '13px', lineHeight: 1.6 }}>{sd.specialNote}</div>
                </div>
              </div>
            )}

            {/* Trust badges [3-5] */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '16px 0 4px' }}>
              {[
                { label: 'Updated', value: 'March 2026' },
                { label: 'Sources', value: 'FMCSA · NHTSA' },
                { label: 'Reviewed', value: 'Licensed Attorney' },
              ].map((badge) => (
                <div key={badge.label} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.10)', borderRadius: '6px', padding: '4px 10px', fontSize: '11px' }}>
                  <span style={{ color: '#D4A84B', fontWeight: 600 }}>{badge.label}:</span>
                  <span style={{ color: '#8A95A8' }}>{badge.value}</span>
                </div>
              ))}
            </div>

            {/* Key stat strip */}
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { label: 'Fault Rule', value: faultInfo.label },
                { label: 'Time to File', value: `${sd.solYears} Year${sd.solYears !== 1 ? 's' : ''}` },
                ...(sd.annualFatalities2022
                  ? [{ label: '2022 Fatalities', value: sd.annualFatalities2022.toLocaleString() }]
                  : []),
                { label: 'Federal Min. Insurance', value: '$750,000' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="glass-card px-4 py-3 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.10)' }}
                >
                  <p className="text-xs uppercase tracking-wide mb-0.5" style={{ color: '#4a5e78' }}>{label}</p>
                  <p className="text-sm font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-12 w-full space-y-14">

          {/* ── State Profile ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Truck Accidents in {sd.name}: What You Need to Know
            </h2>
            {sd.stateIntro && (
              <p className="text-base leading-relaxed mb-6" style={{ color: '#C8CADA' }}>
                {sd.stateIntro}
              </p>
            )}
            {sd.keyFacts && sd.keyFacts.length > 0 && (
              <div
                className="glass-card p-5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.10)' }}
              >
                <h3 className="text-sm font-bold mb-3" style={{ color: '#D4A84B' }}>
                  {sd.name} Key Facts
                </h3>
                <ul className="space-y-3">
                  {sd.keyFacts.map(fact => (
                    <li
                      key={fact}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: '#C8CADA' }}
                    >
                      <span className="flex-shrink-0 mt-0.5 font-bold" style={{ color: '#D4A84B' }}>→</span>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* ── Fault Law Summary ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              {sd.name} Comparative Fault Law
            </h2>
            <div
              className="glass-card p-6 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(212,168,75,0.25)' }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-lg font-bold text-white">{faultInfo.label}</p>
                  <p className="text-sm mt-0.5" style={{ color: '#D4A84B' }}>{faultInfo.badge}</p>
                </div>
                <div
                  className="text-xs px-3 py-1.5 rounded-full font-bold flex-shrink-0"
                  style={{ backgroundColor: 'rgba(212,168,75,0.15)', color: '#D4A84B', border: '1px solid rgba(212,168,75,0.3)' }}
                >
                  {sd.statuteShort}
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                {sd.faultDescription}
              </p>
              {sd.majorHighways.length > 0 && (
                <p className="text-xs mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: '#4a5e78' }}>
                  <strong style={{ color: '#8A95A8' }}>Major {sd.name} freight corridors: </strong>
                  {sd.majorHighways.join(' · ')}
                </p>
              )}
            </div>
          </section>

          {/* ── Accident Types Grid ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-2">
              {sd.name} Truck Accident Types — Settlements & Legal Information
            </h2>
            <p className="text-sm mb-6" style={{ color: '#8A95A8' }}>
              Select your accident type for state-specific settlement ranges, fault law analysis, and liability factors.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ACCIDENT_TYPES.map(at => {
                // Moderate range for each type card
                const total = 75_000 * (1 + 4);
                const lo = fmt(total * 0.70);
                const hi = fmt(total * 1.35);
                return (
                  <Link
                    key={at.slug}
                    href={`/settlements/${state}/${at.slug}`}
                    className="block p-5 rounded-xl transition-all hover:scale-[1.01]"
                    style={{
                      backgroundColor: '#0F1D32',
                      border: '1px solid rgba(255,255,255,0.07)',
                      textDecoration: 'none',
                    }}
                  >
                    <h3 className="text-base font-bold text-white mb-1">{at.name}</h3>
                    <p className="text-xs mb-3 line-clamp-2" style={{ color: '#8A95A8' }}>
                      {at.description.split('.')[0]}.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wide" style={{ color: '#4a5e78' }}>Moderate injury est.</p>
                        <p className="text-sm font-bold" style={{ color: '#D4A84B' }}>
                          {lo} – {hi}
                        </p>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: '#8A95A8' }}>→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ── Injury Types Grid ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-2">
              {sd.name} Truck Accident Settlements by Injury Type
            </h2>
            <p className="text-sm mb-6" style={{ color: '#8A95A8' }}>
              Select your injury type for state-specific compensation ranges, treatment cost data, and how {sd.name} law affects your recovery.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {INJURY_TYPES.map(it => (
                <Link
                  key={it.slug}
                  href={`/settlements/${state}/injury/${it.slug}`}
                  className="block p-5 rounded-xl transition-all hover:scale-[1.01]"
                  style={{ backgroundColor: '#0F1D32', border: '1px solid rgba(255,255,255,0.07)', textDecoration: 'none' }}
                >
                  <h3 className="text-base font-bold text-white mb-1">{it.shortName}</h3>
                  <p className="text-xs mb-3 line-clamp-2" style={{ color: '#8A95A8' }}>
                    {it.description.split('.')[0]}.
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide" style={{ color: '#4a5e78' }}>
                        {it.isWrongfulDeath ? 'Special Formula' : `Multiplier`}
                      </p>
                      <p className="text-sm font-bold" style={{ color: '#D4A84B' }}>
                        {it.isWrongfulDeath
                          ? `${fmt(it.settlementRows[0].low)}–${fmt(it.settlementRows[it.settlementRows.length - 1].high)}`
                          : `${it.multiplierLow}–${it.multiplierHigh}× damages`}
                      </p>
                    </div>
                    <span className="text-sm font-semibold" style={{ color: '#8A95A8' }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Settlement Ranges by Severity ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-2">
              Typical {sd.name} Truck Accident Settlement Ranges
            </h2>
            <p className="text-sm mb-5" style={{ color: '#8A95A8' }}>
              Based on typical economic damages. Assumes 0% plaintiff fault. Amounts vary significantly.
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: '#0F1D32' }}>
                    <th className="px-5 py-4 text-left font-bold text-white">Severity</th>
                    <th className="px-5 py-4 text-left font-bold text-white hidden sm:table-cell">Typical Profile</th>
                    <th className="px-5 py-4 text-right font-bold" style={{ color: '#D4A84B' }}>Estimated Range</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Minor',          sub: 'Soft tissue, minor fractures',            base: 25_000,  mult: 2   },
                    { label: 'Moderate',        sub: 'Surgery possible, partial effects',       base: 75_000,  mult: 4   },
                    { label: 'Severe',          sub: 'Permanent partial disability',            base: 200_000, mult: 6.5 },
                    { label: 'Catastrophic',    sub: 'Permanent total disability',              base: 600_000, mult: 9   },
                    { label: 'Wrongful Death',  sub: 'Fatal injury, survivor loss of support', base: 500_000, mult: 10  },
                  ].map(({ label, sub, base, mult }, i) => {
                    const total = base * (1 + mult);
                    return (
                      <tr
                        key={label}
                        style={{
                          backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.005)',
                          borderTop: '1px solid rgba(255,255,255,0.05)',
                        }}
                      >
                        <td className="px-5 py-4 font-semibold text-white">{label}</td>
                        <td className="px-5 py-4 hidden sm:table-cell" style={{ color: '#8A95A8' }}>{sub}</td>
                        <td className="px-5 py-4 text-right font-bold tabular-nums" style={{ color: '#D4A84B' }}>
                          {fmt(total * 0.70)} – {fmt(total * 1.35)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-2" style={{ color: '#2d3f54' }}>
              Ranges do not account for {sd.name}&apos;s fault deductions. Use the calculator for a personalized estimate.
            </p>
          </section>

          {/* ── Calculator CTA ── */}
          <section
            className="rounded-xl p-8 text-center"
            style={{ background: 'linear-gradient(135deg, #0F1D32, #0F1D32)', border: '2px solid rgba(212,168,75,0.35)' }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#D4A84B', letterSpacing: '0.2em' }}>
              Free · No Sign-Up · 3 Minutes
            </p>
            <h2 className="text-2xl font-extrabold text-white mb-3">
              Calculate Your {sd.name} Truck Accident Settlement
            </h2>
            <p className="text-sm mb-7 max-w-lg mx-auto" style={{ color: '#C8CADA' }}>
              Enter your specific damages and fault percentage. Our calculator applies{' '}
              {sd.name}&apos;s {faultInfo.label.toLowerCase()} rule to your exact numbers.
            </p>
            <Link
              href="/calculator"
              className="inline-block px-10 py-4 rounded-lg font-black text-base transition-all hover:scale-105"
              style={{ backgroundColor: '#D4A84B', color: '#0F1D32', boxShadow: '0 6px 24px rgba(212,168,75,0.3)' }}
            >
              Calculate My Settlement →
            </Link>
          </section>

          {/* ── Lead Capture ── */}
          <section
            className="rounded-xl p-6 sm:p-8"
            style={{ backgroundColor: '#0F1D32', border: '2px solid rgba(212,168,75,0.3)' }}
          >
            <h2 className="text-xl font-bold text-white mb-1">Get a Free Case Evaluation</h2>
            <p className="text-sm mb-6" style={{ color: '#C8CADA' }}>
              Connect with a truck accident attorney licensed in {sd.name}. Free consultation,
              no obligation — attorneys work on contingency.
            </p>
            <LeadCaptureForm stateName={sd.name} source="state-landing" />
          </section>

          {/* ── Related States ── */}
          <section>
            <h3 className="text-sm font-bold text-white mb-3">Other States</h3>
            <div className="flex flex-wrap gap-3">
              {ACTIVE_STATE_SLUGS.filter(s => s !== state).map(s => {
                const other = getStateBySlug(s);
                if (!other) return null;
                return (
                  <Link
                    key={s}
                    href={`/settlements/${s}`}
                    className="px-4 py-2 rounded-lg text-sm transition-colors hover:text-white"
                    style={{ backgroundColor: '#0F1D32', border: '1px solid rgba(255,255,255,0.07)', color: '#8A95A8' }}
                  >
                    {other.name} →
                  </Link>
                );
              })}
            </div>
          </section>

        </div>

        {/* ── Footer ── */}
        <footer style={{ backgroundColor: '#080f1a', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 'auto' }}>
          <div className="max-w-6xl mx-auto px-6 py-8 text-xs" style={{ color: '#2d3f54' }}>
            <p>
              <strong style={{ color: '#4a5e78' }}>Disclaimer:</strong> This page provides general legal information
              about truck accident settlements in {sd.name}. It is not legal advice. Settlement estimates are based on
              typical case parameters. Actual results vary. Consult a licensed attorney for advice specific to your
              situation. Data sourced from FMCSA, NHTSA FARS, and {sd.name} public court records. Last reviewed March 2026.
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}
