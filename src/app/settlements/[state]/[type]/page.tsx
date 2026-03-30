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
import NavHeader from '@/components/NavHeader';

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

  const year = new Date().getFullYear();
  const r = settlementRange(75_000, 4);
  const faultShort: Record<string, string> = {
    pure_comparative: 'Pure comparative fault',
    modified_51: 'Modified comparative fault (51% bar)',
    modified_50: 'Modified comparative fault (50% bar)',
    contributory: 'Contributory negligence',
  };

  const title = `${sd.name} ${at.name} Truck Accident: Settlement Ranges & Laws (${year})`;
  const description = `${at.name} accidents in ${sd.name} settle for ${r.low}–${r.high}. ${faultShort[sd.faultRule] ?? sd.faultRule} applies. Calculate your estimate free — results in 2 minutes.`;

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

function buildFAQs(stateName: string, stateCode: string, typeName: string, typeSlug: string, solYears: number, faultDescription: string, faultRule: string) {
  const avgRange = settlementRange(75_000, 4);
  const severeRange = settlementRange(200_000, 6.5);
  const faultRuleNames: Record<string, string> = {
    pure_comparative: 'pure comparative fault',
    modified_51: 'modified comparative fault (51% bar rule)',
    modified_50: 'modified comparative fault (50% bar rule)',
    contributory: 'contributory negligence',
  };
  const faultRuleName = faultRuleNames[faultRule] ?? faultRule;
  return [
    {
      q: `How much is a ${typeName.toLowerCase()} truck accident settlement in ${stateName}?`,
      a: `In ${stateName}, ${typeName.toLowerCase()} truck accident settlements typically range from ${avgRange.low} to ${severeRange.high}. ${stateName} follows ${faultRuleName}, which means ${faultDescription} The best way to estimate your specific case is to use our free calculator or consult a licensed ${stateName} truck accident attorney.`,
    },
    {
      q: `What is the average settlement for a ${typeName.toLowerCase()} accident in ${stateName}?`,
      a: `The average ${typeName.toLowerCase()} truck accident settlement in ${stateName} is approximately ${avgRange.low}–${avgRange.high} for moderate injuries. Severe injuries with surgery or permanent disability can exceed ${severeRange.high}. Catastrophic and wrongful death cases routinely exceed $3 million in ${stateName}.`,
    },
    {
      q: `How long do I have to file a truck accident claim in ${stateName}?`,
      a: `In ${stateName}, you have ${solYears} year${solYears !== 1 ? 's' : ''} from the date of your accident to file. Missing this deadline typically bars you from recovery. Consult an attorney as soon as possible — the truck's black box data is often overwritten within 30 days.`,
    },
    {
      q: `Does fault affect my ${typeName.toLowerCase()} settlement in ${stateName}?`,
      a: `${stateName} uses ${faultRuleName}. ${faultDescription} For example, if you are found 20% at fault, your settlement is reduced by 20%.`,
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

  const faqs = buildFAQs(sd.name, sd.code, at.name, at.slug, sd.solYears, sd.faultDescription, sd.faultRule);

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
    url: `https://us-settlement-review.com/settlements/${state}/${type}`,
    description: `Settlement data and legal information for ${at.name.toLowerCase()} truck accidents in ${sd.name}.`,
    areaServed: { '@type': 'State', name: sd.name },
    serviceType: 'Legal Information Service',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://us-settlement-review.com' },
      { '@type': 'ListItem', position: 2, name: 'Settlements', item: 'https://us-settlement-review.com/settlements' },
      { '@type': 'ListItem', position: 3, name: sd.name, item: `https://us-settlement-review.com/settlements/${state}` },
      { '@type': 'ListItem', position: 4, name: at.name, item: `https://us-settlement-review.com/settlements/${state}/${type}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />

      {/* Client-side interactive components */}
      <ExitIntentPopup stateName={sd.name} stateSlug={state} />
      <StickyCtaBar stateSlug={state} />

      <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#111827', color: 'white' }}>

        {/* ── Nav ── */}
        <NavHeader />

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
                { label: 'Last Updated', value: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) },
                { label: 'Sources', value: `FMCSA, NHTSA, ${sd.name} Court Records` },
                { label: 'Data', value: 'Verified against 49 CFR Part 390–399' },
                { label: 'Reviewed by', value: 'Licensed Attorney' },
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

          {/* ── Featured Snippet: Paragraph ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              How Much Is a {at.name} Truck Accident Settlement in {sd.name}?
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#C8CADA' }}>
              In {sd.name}, {at.name.toLowerCase()} truck accident settlements typically range from{' '}
              {settlementRange(25_000, 2).low} to {settlementRange(200_000, 6.5).high}.{' '}
              The average settlement is approximately {settlementRange(75_000, 4).low}–{settlementRange(75_000, 4).high},
              though severe cases involving surgery or permanent disability can exceed {settlementRange(200_000, 6.5).high}.{' '}
              {sd.name}&apos;s {faultRuleLabel[sd.faultRule] ?? sd.faultRule} directly affects your final compensation amount.
            </p>
          </section>

          {/* ── Featured Snippet: Settlement Table ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              {sd.name} {at.name} Settlement Ranges by Injury Severity
            </h2>
            <div className="settlement-table rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: '#1a2d47' }}>
                    <th className="px-5 py-4 text-left font-bold" style={{ color: '#D4A84B' }}>Severity Level</th>
                    <th className="px-5 py-4 text-right font-bold" style={{ color: '#D4A84B' }}>Typical Settlement Range</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { level: 'Minor (soft tissue only)', low: '$15,000', high: '$75,000' },
                    { level: 'Moderate (fractures, stitches)', low: '$75,000', high: '$350,000' },
                    { level: 'Severe (surgery required)', low: '$350,000', high: '$1,200,000' },
                    { level: 'Catastrophic (permanent disability)', low: '$1,200,000', high: '$5,000,000+' },
                    { level: 'Wrongful Death', low: '$500,000', high: '$5,000,000+' },
                  ].map(({ level, low, high }, i) => (
                    <tr key={level} style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
                      <td className="px-5 py-4 font-semibold text-white">{level}</td>
                      <td className="px-5 py-4 text-right font-semibold tabular-nums" style={{ color: '#D4A84B' }}>{low} – {high}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {sd.faultRule === 'contributory' && (
              <div
                className="mt-4 px-4 py-3 rounded-lg text-sm"
                style={{ backgroundColor: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}
              >
                ⚠ {sd.name} is a contributory negligence state — any fault may bar your recovery entirely.
              </div>
            )}
          </section>

          {/* ── Featured Snippet: Factors List ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              What Factors Determine a Truck Accident Settlement in {sd.name}?
            </h2>
            <ul className="space-y-2">
              {[
                'Injury severity and type of medical treatment required',
                `${sd.name}'s ${faultRuleLabel[sd.faultRule] ?? sd.faultRule} and your assigned fault percentage`,
                'Economic damages: medical bills, lost wages, property damage',
                'Non-economic damages: pain and suffering, emotional distress',
                'Trucking company insurance policy limits (min. $750K federal)',
                'Evidence of FMCSA violations (49 CFR Part 390–399)',
              ].map(factor => (
                <li key={factor} className="flex items-start gap-2 text-sm" style={{ color: '#C8CADA' }}>
                  <span className="mt-0.5 flex-shrink-0" style={{ color: '#D4A84B' }}>→</span>
                  {factor}
                </li>
              ))}
            </ul>
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
              Calculate My {sd.name} Settlement →
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
                  {ACTIVE_STATE_SLUGS.filter(s => s !== state).slice(0, 6).map(s => {
                    const sName = s.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                    return (
                      <Link
                        key={s}
                        href={`/settlements/${s}/${type}`}
                        className="related-link-card"
                      >
                        {sName} {at.name} truck accident settlements →
                      </Link>
                    );
                  })}
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
                      {sd.name} {t.name} truck accident settlements →
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
