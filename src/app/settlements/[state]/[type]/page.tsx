import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getStateBySlug, ACTIVE_STATE_SLUGS } from '@/lib/state-laws';
import { ACCIDENT_TYPES, getAccidentTypeBySlug } from '@/lib/accident-types';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import FAQAccordion from '@/components/FAQAccordion';
import ExitIntentPopup from '@/components/common/ExitIntentPopup';
import StickyCtaBar from '@/components/common/StickyCtaBar';
import CallNowButton from '@/components/common/CallNowButton';

// ── Static generation ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return ACTIVE_STATE_SLUGS.flatMap(state =>
    ACCIDENT_TYPES.map(t => ({ state, type: t.slug })),
  );
}

// ── Metadata ───────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ state: string; type: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, type } = await params;
  const sd = getStateBySlug(state);
  const at = getAccidentTypeBySlug(type);
  if (!sd || !at) return { title: 'Not Found' };

  const title = `${sd.name} ${at.name} Truck Accident Settlement — What Is Your Case Worth?`;
  const description = `Average ${at.name.toLowerCase()} truck accident settlement ranges in ${sd.name}, state comparative fault rules, and how ${sd.name} law affects your recovery. Includes free calculator.`;

  return {
    title,
    description,
    alternates: { canonical: `/settlements/${state}/${type}` },
    openGraph: {
      title,
      description,
      type: 'article',
    },
  };
}

// ── Settlement range table data ────────────────────────────────────────────────

const SEVERITY_TABLE = [
  { label: 'Minor', sub: 'Soft tissue, minor fractures, full recovery', baseEcon: 25_000, mult: 2 },
  { label: 'Moderate', sub: 'Surgery possible, partial long-term effects', baseEcon: 75_000, mult: 4 },
  { label: 'Severe', sub: 'Permanent partial disability, extended treatment', baseEcon: 200_000, mult: 6.5 },
  { label: 'Catastrophic', sub: 'Permanent total disability, lifetime care', baseEcon: 600_000, mult: 9 },
  { label: 'Wrongful Death', sub: 'Fatal injuries, survivor loss of support', baseEcon: 500_000, mult: 10 },
];

function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  return `$${Math.round(n / 1_000)}K`;
}

function settlementRange(baseEcon: number, mult: number) {
  const total = baseEcon * (1 + mult);
  return { low: fmt(total * 0.7), high: fmt(total * 1.35) };
}

// ── FAQ generator ──────────────────────────────────────────────────────────────

function buildFAQs(stateName: string, stateCode: string, typeName: string, typeSlug: string, solYears: number, faultDescription: string) {
  const avgRange = settlementRange(75_000, 4); // "typical moderate" for the headline FAQ
  return [
    {
      q: `How much is the average ${typeName.toLowerCase()} truck accident settlement in ${stateName}?`,
      a: `Settlement amounts vary widely based on injury severity, economic losses, and fault allocation. For moderate injuries in ${stateName}, a ${typeName.toLowerCase()} truck accident settlement typically falls in the range of ${avgRange.low}–${avgRange.high}. Catastrophic or fatal crashes can exceed $3 million. The best way to estimate your specific case is to use our free calculator or consult a licensed ${stateName} truck accident attorney.`,
    },
    {
      q: `How long do I have to file a truck accident lawsuit in ${stateName}?`,
      a: `${stateName} allows ${solYears} year${solYears !== 1 ? 's' : ''} from the date of the accident to file a personal injury lawsuit (statute of limitations). Missing this deadline permanently bars your claim. If the accident involved a government vehicle or entity, shorter deadlines may apply. Consult an attorney as soon as possible — evidence like the truck's black box data is often overwritten within 30 days.`,
    },
    {
      q: `Can I still recover compensation if I was partially at fault in ${stateName}?`,
      a: faultDescription,
    },
    {
      q: `What evidence is most important in a ${typeName.toLowerCase()} truck accident case?`,
      a: `Key evidence in a ${typeName.toLowerCase()} case includes: the truck's Event Data Recorder (black box) showing speed and braking data; the driver's Electronic Logging Device (ELD) for hours-of-service compliance; pre-trip inspection reports (DVIRs); the carrier's FMCSA BASIC safety scores; maintenance records; dashcam footage; and witness statements. Critical evidence is often time-sensitive — the FMCSA requires carriers to preserve crash data, but private dashcam footage may be overwritten quickly.`,
    },
    {
      q: `Who can be held liable in a ${typeName.toLowerCase()} truck accident in ${stateName}?`,
      a: `Liability in commercial truck accidents often extends beyond the driver. Potentially liable parties include: the trucking company (respondeat superior, negligent hiring/training/retention); the cargo shipper or loader (if improper loading contributed); the truck or equipment manufacturer (product liability); a maintenance contractor; and in some cases, a broker who arranged the shipment. An experienced ${stateName} truck accident attorney will investigate all potentially liable parties to maximize your recovery.`,
    },
  ];
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function SettlementPage({ params }: Props) {
  const { state, type } = await params;
  const sd = getStateBySlug(state);
  const at = getAccidentTypeBySlug(type);
  if (!sd || !at) notFound();

  const faqs = buildFAQs(sd.name, sd.code, at.name, at.slug, sd.solYears, sd.faultDescription);

  const faultRuleLabel: Record<string, string> = {
    pure_comparative: 'Pure Comparative Fault',
    modified_51: 'Modified Comparative Fault (51% Bar)',
    modified_50: 'Modified Comparative Fault (50% Bar)',
    contributory: 'Contributory Negligence',
  };

  // Related links
  const relatedTypes = ACCIDENT_TYPES.filter(t => t.slug !== at.slug);
  const relatedTypeLinks = relatedTypes.slice(0, 5);

  // JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const legalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `TruckSettlementPro — ${sd.name} ${at.name} Truck Accident`,
    url: `https://trucksettlementpro.com/settlements/${state}/${type}`,
    description: `Settlement data and legal information for ${at.name.toLowerCase()} truck accidents in ${sd.name}.`,
    areaServed: { '@type': 'State', name: sd.name },
    serviceType: 'Legal Information Service',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema).replace(/</g, '\\u003c') }} />

      {/* Client-side interactive components */}
      <ExitIntentPopup stateName={sd.name} stateSlug={state} />
      <StickyCtaBar stateSlug={state} />

      <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#111827', color: 'white' }}>

        {/* ── Nav ── */}
        <header style={{ backgroundColor: '#0F1D32', borderBottom: '1px solid rgba(212,168,75,0.2)' }}>
          <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold" style={{ color: '#D4A84B' }}>TruckSettlementPro</Link>
            <div className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
              <Link href="/calculator" className="hover:text-white transition-colors">Calculator</Link>
              <Link href="/settlements" className="hover:text-white transition-colors">By State</Link>
              <Link
                href="/calculator"
                className="px-4 py-2 rounded font-bold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#D4A84B', color: '#0F1D32' }}
              >
                Free Calculator
              </Link>
            </div>
          </nav>
        </header>

        {/* ── Hero ── */}
        <section style={{ background: 'linear-gradient(160deg, #0a1422 0%, #080f1e 100%)', borderBottom: '3px solid #D4A84B' }}>
          <div className="max-w-4xl mx-auto px-6 py-16">

            {/* Breadcrumb [3-1] */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <a href="/settlements" style={{ color: '#D4A84B', textDecoration: 'none' }}>Settlements</a>
              <span style={{ color: '#4B5A72' }}>›</span>
              <a href={`/settlements/${state}`} style={{ color: '#D4A84B', textDecoration: 'none' }}>{sd.name}</a>
              <span style={{ color: '#4B5A72' }}>›</span>
              <span style={{ color: '#8A95A8' }}>{at.name}</span>
            </nav>

            {/* Gold accent line [3-2] */}
            <div style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, #D4A84B, #F5D078)', borderRadius: '2px', marginBottom: '12px' }} />

            <h1 style={{ fontSize: 'clamp(24px, 6vw, 40px)', fontWeight: 900, letterSpacing: '-0.5px', lineHeight: 1.2, color: 'white', marginBottom: '12px' }}>
              {sd.name} {at.name} Truck Accident Settlements
            </h1>
            <p className="text-lg" style={{ color: '#C8CADA' }}>
              Average settlement ranges, {sd.name} fault laws, and what to expect after a {at.name.toLowerCase()} accident
              {sd.majorHighways.length > 0 && ` on ${sd.majorHighways.slice(0, 3).join(', ')}`}.
            </p>
            {sd.truckFatalitiesNote && (
              <p className="mt-4 text-sm" style={{ color: '#8A95A8' }}>
                <strong style={{ color: '#C8CADA' }}>Note: </strong>{sd.truckFatalitiesNote}
              </p>
            )}

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
          </div>
        </section>

        {/* ── Statute of Limitations Banner ── */}
        <div style={{ backgroundColor: '#0a1624', borderBottom: '1px solid rgba(212,168,75,0.15)' }}>
          <div className="max-w-4xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-sm" style={{ color: '#C8CADA' }}>
              <span style={{ color: '#fbbf24' }}>⚠️</span>{' '}
              <strong style={{ color: 'white' }}>{sd.name}</strong> has a{' '}
              <strong style={{ color: '#D4A84B' }}>{sd.solYears}-year</strong> statute of limitations on truck accident claims.{' '}
              Acting quickly protects your right to compensation.
            </p>
            <CallNowButton size="sm" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12 w-full space-y-14">

          {/* ── Quick Facts [3-3] ── */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Quick Facts: {sd.name} Truck Accidents</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {[
                { label: 'FAULT RULE', value: faultRuleLabel[sd.faultRule] ?? sd.faultRule },
                { label: 'TIME TO FILE', value: `${sd.solYears} Year${sd.solYears !== 1 ? 's' : ''}` },
                { label: 'FED. MIN. INSURANCE', value: at.slug === 'hazmat-spill' ? '$1M–$5M' : '$750,000' },
                {
                  label: 'TYPICAL MODERATE SETTLEMENT',
                  value: (() => { const r = settlementRange(75_000, 4); return `${r.low}–${r.high}`; })(),
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="glass-card"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.10)', borderRadius: '10px', padding: '14px' }}
                >
                  <div style={{ color: '#4B5A72', fontSize: '10px', letterSpacing: '0.5px', marginBottom: '6px' }}>{label}</div>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 700, lineHeight: 1.3 }}>{value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── What Is a [Type] Accident? ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              What Is a {at.name} Truck Accident?
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#C8CADA' }}>
              {at.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl" style={{ backgroundColor: '#0F1D32', border: '1px solid rgba(255,255,255,0.07)' }}>
                <h3 className="text-sm font-bold mb-3" style={{ color: '#D4A84B' }}>Common Causes</h3>
                <ul className="space-y-2">
                  {at.causes.map(c => (
                    <li key={c} className="flex items-start gap-2 text-sm" style={{ color: '#C8CADA' }}>
                      <span className="mt-0.5 flex-shrink-0" style={{ color: '#D4A84B' }}>→</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 rounded-xl" style={{ backgroundColor: '#0F1D32', border: '1px solid rgba(255,255,255,0.07)' }}>
                <h3 className="text-sm font-bold mb-3" style={{ color: '#D4A84B' }}>Common Injuries</h3>
                <ul className="space-y-2">
                  {at.commonInjuries.map(i => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#C8CADA' }}>
                      <span className="mt-0.5 flex-shrink-0" style={{ color: '#D4A84B' }}>→</span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 p-5 rounded-xl" style={{ backgroundColor: '#0F1D32', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h3 className="text-sm font-bold mb-3" style={{ color: '#D4A84B' }}>Key Evidence & Liability Factors</h3>
              <ul className="grid sm:grid-cols-2 gap-2">
                {at.liabilityFactors.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: '#C8CADA' }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: '#4a5e78' }}>▸</span>{f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs px-3 py-2.5 rounded-lg leading-relaxed" style={{ backgroundColor: 'rgba(212,168,75,0.06)', border: '1px solid rgba(212,168,75,0.15)', color: '#C8CADA' }}>
                <strong style={{ color: '#D4A84B' }}>FMCSA note: </strong>{at.fmcsaNote}
              </p>
            </div>
          </section>

          {/* ── Texas Law Section ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              {sd.name} Fault Laws and How They Affect Your Settlement
            </h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: '#C8CADA' }}>
              {sd.faultDescription} This is governed by{' '}
              <strong className="text-white">{sd.statuteCitation}</strong>.
            </p>

            {/* Fault rule callout */}
            <div
              className="p-5 rounded-xl mb-5"
              style={{ backgroundColor: '#0F1D32', border: '1px solid rgba(212,168,75,0.25)' }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#D4A84B' }}>
                {sd.name} Fault Rule: {faultRuleLabel[sd.faultRule]}
              </p>
              {sd.faultRule === 'modified_51' && (
                <div className="space-y-3 text-sm" style={{ color: '#C8CADA' }}>
                  <p>Under {sd.statuteShort}, if you are assigned <strong className="text-white">50% or less</strong> of the fault, your damages are reduced proportionally. If you are assigned <strong className="text-white">51% or more</strong>, you recover nothing.</p>
                  <p className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <strong style={{ color: '#D4A84B' }}>Example:</strong> Your damages total $800,000. You are found 20% at fault. Your net recovery:{' '}
                    <strong className="text-white">$800,000 × (1 − 0.20) = $640,000.</strong>
                  </p>
                  <p className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <strong style={{ color: '#D4A84B' }}>Example:</strong> You are found 51% at fault in the same case. Your recovery:{' '}
                    <strong className="text-white">$0.</strong> Defense attorneys aggressively seek to push your fault above 50%.
                  </p>
                </div>
              )}
              {sd.faultRule === 'pure_comparative' && (
                <div className="space-y-3 text-sm" style={{ color: '#C8CADA' }}>
                  <p>Under {sd.statuteShort}, you can recover damages even if you were <strong className="text-white">99% at fault</strong> — your award is simply reduced by your percentage of fault.</p>
                  <p className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <strong style={{ color: '#D4A84B' }}>Example:</strong> Your damages total $1,000,000. You are found 40% at fault. Your net recovery:{' '}
                    <strong className="text-white">$1,000,000 × (1 − 0.40) = $600,000.</strong>
                  </p>
                </div>
              )}
              {sd.faultRule === 'modified_50' && (
                <div className="space-y-3 text-sm" style={{ color: '#C8CADA' }}>
                  <p>Under {sd.statuteShort}, if you are assigned <strong className="text-white">49% or less</strong> of the fault, your damages are reduced proportionally. If you are assigned <strong className="text-white">50% or more</strong>, you recover nothing.</p>
                  <p className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <strong style={{ color: '#D4A84B' }}>Example:</strong> Your damages are $600,000 and you are 30% at fault. Recovery:{' '}
                    <strong className="text-white">$600,000 × 0.70 = $420,000.</strong>
                  </p>
                </div>
              )}
              {sd.faultRule === 'contributory' && (
                <div className="space-y-3 text-sm" style={{ color: '#C8CADA' }}>
                  <p>Under {sd.statuteShort}, {sd.name} follows the strict contributory negligence doctrine — if you are found <strong className="text-white">even 1% at fault</strong>, you are barred from any recovery.</p>
                  <p className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <strong style={{ color: '#fca5a5' }}>Warning:</strong> Defense attorneys in contributory negligence states are highly incentivized to find any fault on your part. Expert legal representation is particularly critical in {sd.name}. The last clear chance doctrine may provide a path to recovery in some cases.
                  </p>
                </div>
              )}
            </div>

            {sd.majorHighways.length > 0 && (
              <p className="text-sm" style={{ color: '#8A95A8' }}>
                <strong className="text-white">Major {sd.name} freight corridors: </strong>
                {sd.majorHighways.join(', ')} — these interstates carry the highest commercial truck traffic volume in the state and account for a disproportionate share of large truck crashes.
              </p>
            )}
          </section>

          {/* ── Settlement Estimates Table ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-2">
              {sd.name} {at.name} Settlement Ranges by Injury Severity
            </h2>
            <p className="text-sm mb-5" style={{ color: '#8A95A8' }}>
              Based on typical economic damages for commercial truck accidents. Assumes 0% plaintiff fault.
              Actual amounts vary significantly based on case-specific evidence, attorney skill, and insurance policy limits.
            </p>
            <div
              className="settlement-table rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: '#1a2d47' }}>
                    <th className="px-5 py-4 text-left font-bold" style={{ color: '#D4A84B' }}>Injury Severity</th>
                    <th className="px-5 py-4 text-left font-bold hidden sm:table-cell" style={{ color: '#D4A84B' }}>Description</th>
                    <th className="px-5 py-4 text-right font-bold" style={{ color: '#D4A84B' }}>Est. Settlement Range</th>
                  </tr>
                </thead>
                <tbody>
                  {SEVERITY_TABLE.map(({ label, sub, baseEcon, mult }, i) => {
                    const r = settlementRange(baseEcon, mult);
                    return (
                      <tr
                        key={label}
                        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <td className="px-5 py-4 font-semibold text-white">{label}</td>
                        <td className="px-5 py-4 hidden sm:table-cell" style={{ color: '#8A95A8' }}>{sub}</td>
                        <td className="px-5 py-4 text-right font-semibold tabular-nums" style={{ color: '#D4A84B' }}>
                          {r.low} – {r.high}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3" style={{ color: '#2d3f54' }}>
              Range represents the 25th–90th percentile of estimated outcomes. Does not account for {sd.name} fault deductions.
              Commercial truck policies typically carry $750K–$5M in coverage, which may cap your actual recovery.
            </p>
            <div
              className="mt-4 px-4 py-3 rounded-lg text-xs leading-relaxed"
              style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#3d5270' }}
            >
              <strong style={{ color: '#4a6480' }}>Disclaimer:</strong> Settlement ranges shown are estimates based on general multiplier methods and publicly available data. They do not predict outcomes for any specific case. Every truck accident case is unique. <a href="/terms" style={{ color: '#4a6480', textDecoration: 'underline' }}>Terms of Service</a>
            </div>
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
              Calculate Your {sd.name} {at.name} Settlement
            </h2>
            <p className="text-sm mb-7 max-w-lg mx-auto" style={{ color: '#C8CADA' }}>
              Enter your specific injury details, economic losses, and fault percentage.
              Our calculator applies {sd.name}&apos;s exact comparative fault rules to your numbers.
            </p>
            <Link
              href="/calculator"
              className="inline-block px-10 py-4 rounded-lg font-black text-base transition-all hover:scale-105"
              style={{ backgroundColor: '#D4A84B', color: '#0F1D32', boxShadow: '0 6px 24px rgba(212,168,75,0.3)' }}
            >
              Calculate My Settlement →
            </Link>
          </section>

          {/* ── FAQ Section ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <FAQAccordion faqs={faqs} />
          </section>

          {/* ── Lead Capture ── */}
          <section
            className="rounded-xl p-6 sm:p-8"
            style={{ backgroundColor: '#0F1D32', border: '2px solid rgba(212,168,75,0.3)' }}
          >
            <h2 className="text-xl font-bold text-white mb-1">
              Get a Free Case Evaluation
            </h2>
            <p className="text-sm mb-6" style={{ color: '#C8CADA' }}>
              Connect with a truck accident attorney in {sd.name} who handles {at.name.toLowerCase()} cases.
              Free consultation, no obligation, no upfront costs — attorneys work on contingency.
            </p>
            <LeadCaptureForm
              stateName={sd.name}
              accidentType={at.name}
              source="pseo-page"
            />
          </section>

          {/* ── Related Links ── */}
          <section>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#5a7090', letterSpacing: '0.12em' }}>
                  {at.name} in Other States
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ACTIVE_STATE_SLUGS.filter(s => s !== state).slice(0, 6).map(s => (
                    <Link
                      key={s}
                      href={`/settlements/${s}/${type}`}
                      className="related-link-card capitalize"
                    >
                      {s.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} →
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#5a7090', letterSpacing: '0.12em' }}>
                  Other Accident Types in {sd.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {relatedTypeLinks.map(t => (
                    <Link
                      key={t.slug}
                      href={`/settlements/${state}/${t.slug}`}
                      className="related-link-card"
                    >
                      {t.name} →
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* ── Footer ── */}
        <footer style={{ backgroundColor: '#080f1a', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 'auto' }}>
          <div className="max-w-6xl mx-auto px-6 py-8 text-xs" style={{ color: '#2d3f54' }}>
            <p className="mb-2">
              <strong style={{ color: '#4a5e78' }}>Disclaimer:</strong> This page provides general legal information about truck accident settlements in {sd.name}. It is not legal advice. Settlement estimates are based on typical case parameters and publicly available data. Actual results vary. Consult a licensed attorney for advice specific to your situation.
            </p>
            <p>
              Data sourced from FMCSA Large Truck and Bus Crash Facts, NHTSA Fatality Analysis Reporting System (FARS), and {sd.name} public court records. Last reviewed March 2026.
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}
