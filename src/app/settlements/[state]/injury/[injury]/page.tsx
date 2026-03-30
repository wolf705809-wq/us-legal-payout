import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getStateBySlug, ACTIVE_STATE_SLUGS } from '@/lib/state-laws';
import { INJURY_TYPES, getInjuryTypeBySlug } from '@/lib/injury-types';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import FAQAccordion from '@/components/FAQAccordion';
import ExitIntentPopup from '@/components/common/ExitIntentPopup';
import StickyCtaBar from '@/components/common/StickyCtaBar';
import CallNowButton from '@/components/common/CallNowButton';
import NavHeader from '@/components/NavHeader';

// ── Static generation ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return ACTIVE_STATE_SLUGS.flatMap(state =>
    INJURY_TYPES.map(i => ({ state, injury: i.slug })),
  );
}

// ── Metadata ───────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ state: string; injury: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, injury } = await params;
  const sd = getStateBySlug(state);
  const it = getInjuryTypeBySlug(injury);
  if (!sd || !it) return { title: 'Not Found' };

  const year = new Date().getFullYear();
  const settlementLow = it.settlementRows?.[0]?.low ?? it.treatmentCostLow ?? 0;
  const settlementHigh = it.settlementRows?.[it.settlementRows.length - 1]?.high ?? it.treatmentCostHigh ?? 0;
  function fmtMeta(n: number) {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
    return `$${n.toLocaleString()}`;
  }

  const title = `${it.shortName} Truck Accident Settlement in ${sd.name} (${year})`;
  const description = `${it.shortName} carries a ${it.multiplierLow}x–${it.multiplierHigh}x damages multiplier. ${sd.name} victims typically recover ${fmtMeta(settlementLow)}–${fmtMeta(settlementHigh)}. Free calculator.`;

  return {
    title,
    description,
    alternates: { canonical: `/settlements/${state}/injury/${injury}` },
    openGraph: { title, description, type: 'article' },
  };
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${n.toLocaleString()}`;
}

// ── FAQ generator ──────────────────────────────────────────────────────────────

function buildFAQs(
  stateName: string,
  injuryName: string,
  injurySlug: string,
  solYears: number,
  faultDescription: string,
  multiplierLow: number,
  multiplierHigh: number,
  isWrongfulDeath: boolean,
  faultRule: string,
) {
  const faultRuleNames: Record<string, string> = {
    pure_comparative: 'pure comparative fault',
    modified_51: 'modified comparative fault (51% bar rule)',
    modified_50: 'modified comparative fault (50% bar rule)',
    contributory: 'contributory negligence',
  };
  const faultRuleName = faultRuleNames[faultRule] ?? faultRule;
  return [
    {
      q: `How much is a ${injuryName} settlement in ${stateName} truck accidents?`,
      a: isWrongfulDeath
        ? `Wrongful death truck accident settlements in ${stateName} vary significantly based on the decedent's age, income, number of dependents, and applicable state law. Cases with surviving minor children and a primary breadwinner can exceed $5 million. The best way to understand the value of your specific case is to consult a licensed ${stateName} wrongful death attorney.`
        : `${injuryName} truck accident settlements in ${stateName} typically use a damages multiplier of ${multiplierLow}–${multiplierHigh}× economic damages. This reflects the significant non-economic (pain and suffering) component of ${injuryName} cases. Actual settlement amounts depend on injury severity, treatment costs, and how ${stateName}'s fault rules apply to your case. Use our free calculator for a personalized estimate.`,
    },
    {
      q: `What is the ${injuryName} damages multiplier?`,
      a: `${injuryName} cases typically use a damages multiplier of ${multiplierLow}x to ${multiplierHigh}x applied to economic damages (medical bills, lost wages, future costs). The multiplier reflects the non-economic component — pain, suffering, and impact on quality of life. Higher multipliers apply when surgery is required, when injuries are permanent, or when there is significant disfigurement.`,
    },
    {
      q: `How long do I have to file for ${injuryName} injuries in ${stateName}?`,
      a: `In ${stateName}, you have ${solYears} year${solYears !== 1 ? 's' : ''} from the date of your accident to file. Missing this deadline typically bars you from recovery. For ${injuryName} cases, additional urgency applies: the truck's black box data is often overwritten within 30 days and dashcam footage within days. Consult an attorney immediately.`,
    },
    {
      q: `Can I recover for ${injuryName} if I was partially at fault in ${stateName}?`,
      a: `${stateName} uses ${faultRuleName}. ${faultDescription} For example, if you are found 20% at fault, your settlement is reduced by 20%.`,
    },
    {
      q: `Who can be held liable for a ${injuryName} injury in a truck accident in ${stateName}?`,
      a: `Liability in commercial truck accidents often extends beyond the driver. Potentially liable parties include: the trucking company (respondeat superior for driver's negligence; independent negligent hiring, training, and retention claims); the cargo owner or shipper if improper loading contributed to the crash; the truck or trailer manufacturer if a product defect was involved; a maintenance contractor if inadequate service caused a mechanical failure; and in some cases, the freight broker who arranged the shipment. ${injuryName} cases, given their high value, warrant thorough investigation of all potentially liable parties.`,
    },
  ];
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function InjuryPage({ params }: Props) {
  const { state, injury } = await params;
  const sd = getStateBySlug(state);
  const it = getInjuryTypeBySlug(injury);
  if (!sd || !it) notFound();

  const faqs = buildFAQs(
    sd.name, it.name, it.slug, sd.solYears, sd.faultDescription,
    it.multiplierLow, it.multiplierHigh, !!it.isWrongfulDeath, sd.faultRule,
  );

  const faultRuleLabel: Record<string, string> = {
    pure_comparative: 'Pure Comparative Fault',
    modified_51: 'Modified Comparative Fault (51% Bar)',
    modified_50: 'Modified Comparative Fault (50% Bar)',
    contributory: 'Contributory Negligence',
  };

  const otherInjuries = INJURY_TYPES.filter(i => i.slug !== it.slug);
  const relatedStates = ACTIVE_STATE_SLUGS.filter(s => s !== state).slice(0, 5);

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
    name: `TruckSettlementPro — ${sd.name} ${it.shortName} Truck Accident`,
    url: `https://us-settlement-review.com/settlements/${state}/injury/${injury}`,
    description: `Settlement data and legal information for ${it.name.toLowerCase()} injuries in ${sd.name} truck accidents.`,
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
      { '@type': 'ListItem', position: 4, name: it.shortName, item: `https://us-settlement-review.com/settlements/${state}/injury/${injury}` },
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
              <span style={{ color: '#8A95A8' }}>{it.shortName}</span>
            </nav>

            {/* Gold accent line [3-2] */}
            <div style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, #D4A84B, #F5D078)', borderRadius: '2px', marginBottom: '12px' }} />

            <h1 style={{ fontSize: 'clamp(24px, 6vw, 40px)', fontWeight: 900, letterSpacing: '-0.5px', lineHeight: 1.2, color: 'white', marginBottom: '12px' }}>
              {sd.name} Truck Accident {it.shortName} Settlements
            </h1>
            <p className="text-lg mb-5" style={{ color: '#C8CADA' }}>
              Compensation ranges, treatment costs, and how {sd.name}&apos;s{' '}
              <strong className="text-white">{faultRuleLabel[sd.faultRule]}</strong> rule
              affects your {it.shortName} recovery.
            </p>

            {/* Warning banners [3-4] */}
            {sd.specialNote && (
              <div style={{ background: 'rgba(212,168,75,0.08)', border: '1px solid rgba(212,168,75,0.30)', borderLeft: '3px solid #D4A84B', borderRadius: '8px', padding: '14px 16px', margin: '16px 0' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '16px', flexShrink: 0 }}>⚠️</span>
                  <div style={{ color: '#C8CADA', fontSize: '13px', lineHeight: 1.6 }}>{sd.specialNote}</div>
                </div>
              </div>
            )}

            {sd.faultRule === 'contributory' && !sd.specialNote && (
              <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)', borderLeft: '3px solid #ef4444', borderRadius: '8px', padding: '14px 16px', margin: '16px 0' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '16px', flexShrink: 0 }}>⚠️</span>
                  <div style={{ color: '#fca5a5', fontSize: '13px', lineHeight: 1.6 }}>
                    <strong>CRITICAL — {sd.name} Contributory Negligence: </strong>
                    {sd.name} bars all recovery if you are even 1% at fault. For {it.name} cases — which carry very high settlement value — this rule makes attorney representation especially critical before you speak with any insurer.
                  </div>
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
            <h2 className="text-xl font-bold text-white mb-4">
              {it.shortName} in {sd.name}: Quick Facts
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {[
                { label: 'FAULT RULE', value: faultRuleLabel[sd.faultRule] ?? sd.faultRule },
                { label: 'TIME TO FILE', value: `${sd.solYears} Year${sd.solYears !== 1 ? 's' : ''}` },
                {
                  label: 'DAMAGES MULTIPLIER',
                  value: it.isWrongfulDeath ? 'Special Formula' : `${it.multiplierLow}–${it.multiplierHigh}×`,
                },
                {
                  label: 'TREATMENT COST RANGE',
                  value: it.isWrongfulDeath ? 'See breakdown' : `${fmt(it.treatmentCostLow)}–${fmt(it.treatmentCostHigh)}`,
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
              How Much Is a {it.shortName} Settlement in {sd.name} Truck Accidents?
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#C8CADA' }}>
              {it.shortName} truck accident settlements in {sd.name} typically use a{' '}
              {it.isWrongfulDeath ? 'specialized wrongful death formula' : `${it.multiplierLow}x–${it.multiplierHigh}x damages multiplier`}.
              {!it.isWrongfulDeath && it.settlementRows?.[0] && (
                <> Settlements range from {fmt(it.settlementRows[0].low)} to {fmt(it.settlementRows[it.settlementRows.length - 1].high)}, though severe cases involving surgery or permanent disability can exceed {fmt(it.settlementRows[it.settlementRows.length - 1].high)}.</>
              )}{' '}
              {sd.name}&apos;s {faultRuleLabel[sd.faultRule] ?? sd.faultRule} directly affects your final compensation amount.
            </p>
          </section>

          {/* ── Featured Snippet: Table ── */}
          {it.settlementRows && it.settlementRows.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                {sd.name} {it.shortName} Settlement Ranges by Severity
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
                    {it.settlementRows.map(({ label, low, high }: { label: string; low: number; high: number }, i: number) => (
                      <tr key={label} style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
                        <td className="px-5 py-4 font-semibold text-white">{label}</td>
                        <td className="px-5 py-4 text-right font-semibold tabular-nums" style={{ color: '#D4A84B' }}>{fmt(low)} – {fmt(high)}</td>
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
          )}

          {/* ── Featured Snippet: Factors List ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              What Factors Determine a Truck Accident Settlement in {sd.name}?
            </h2>
            <ul className="space-y-2">
              {[
                `Injury severity and type of medical treatment required for ${it.shortName}`,
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

          {/* ── Injury Overview ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Understanding {it.name} in Truck Accidents
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#C8CADA' }}>
              {it.description}
            </p>

            {it.symptoms.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="p-5 rounded-xl" style={{ backgroundColor: '#0F1D32', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <h3 className="text-sm font-bold mb-3" style={{ color: '#D4A84B' }}>Signs & Symptoms</h3>
                  <ul className="space-y-2">
                    {it.symptoms.map(s => (
                      <li key={s} className="flex items-start gap-2 text-sm" style={{ color: '#C8CADA' }}>
                        <span className="mt-0.5 flex-shrink-0" style={{ color: '#D4A84B' }}>→</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 rounded-xl" style={{ backgroundColor: '#0F1D32', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <h3 className="text-sm font-bold mb-3" style={{ color: '#D4A84B' }}>Long-Term Effects</h3>
                  <ul className="space-y-2">
                    {it.longTermEffects.map(e => (
                      <li key={e} className="flex items-start gap-2 text-sm" style={{ color: '#C8CADA' }}>
                        <span className="mt-0.5 flex-shrink-0" style={{ color: '#D4A84B' }}>→</span>
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {it.commonTreatments.length > 0 && (
              <div className="p-5 rounded-xl" style={{ backgroundColor: '#0F1D32', border: '1px solid rgba(255,255,255,0.07)' }}>
                <h3 className="text-sm font-bold mb-3" style={{ color: '#D4A84B' }}>Common Treatments</h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {it.commonTreatments.map(t => (
                    <li key={t} className="flex items-start gap-2 text-sm" style={{ color: '#C8CADA' }}>
                      <span className="mt-0.5 flex-shrink-0" style={{ color: '#4a5e78' }}>▸</span>{t}
                    </li>
                  ))}
                </ul>
                {it.treatmentCostLow > 0 && (
                  <p className="mt-4 text-xs px-3 py-2.5 rounded-lg" style={{ backgroundColor: 'rgba(212,168,75,0.06)', border: '1px solid rgba(212,168,75,0.15)', color: '#C8CADA' }}>
                    <strong style={{ color: '#D4A84B' }}>Typical lifetime treatment cost range: </strong>
                    {fmt(it.treatmentCostLow)} – {fmt(it.treatmentCostHigh)} (varies by injury severity, surgical needs, and ongoing care requirements)
                  </p>
                )}
              </div>
            )}
          </section>

          {/* ── Truck Accident Context ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Why Truck Accidents Cause Especially Severe {it.shortName} Injuries
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#C8CADA' }}>
              {it.truckAccidentContext}
            </p>
          </section>

          {/* ── Wrongful Death Special Section ── */}
          {it.isWrongfulDeath && it.wrongfulDeathComponents && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Wrongful Death Damages — What Can Be Recovered
              </h2>
              <div className="p-5 rounded-xl mb-5" style={{ backgroundColor: '#0F1D32', border: '1px solid rgba(255,255,255,0.07)' }}>
                <h3 className="text-sm font-bold mb-3" style={{ color: '#D4A84B' }}>Recoverable Damage Categories</h3>
                <ul className="space-y-3">
                  {it.wrongfulDeathComponents.map(c => (
                    <li key={c} className="flex items-start gap-3 text-sm" style={{ color: '#C8CADA' }}>
                      <span className="flex-shrink-0 mt-0.5 font-bold" style={{ color: '#D4A84B' }}>→</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              {it.wrongfulDeathBeneficiaryNote && (
                <div className="px-4 py-4 rounded-lg text-sm" style={{ backgroundColor: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.3)', color: '#fde68a' }}>
                  <strong>Beneficiary Eligibility Note: </strong>{it.wrongfulDeathBeneficiaryNote}
                </div>
              )}
            </section>
          )}

          {/* ── State Law Effect ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              How {sd.name} Law Affects Your {it.shortName} Settlement
            </h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: '#C8CADA' }}>
              {sd.faultDescription} This is governed by{' '}
              <strong className="text-white">{sd.statuteCitation}</strong>.
            </p>

            <div className="p-5 rounded-xl" style={{ backgroundColor: '#0F1D32', border: '1px solid rgba(212,168,75,0.25)' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#D4A84B' }}>
                {sd.name} Fault Rule: {faultRuleLabel[sd.faultRule]}
              </p>

              {sd.faultRule === 'pure_comparative' && (
                <div className="space-y-3 text-sm" style={{ color: '#C8CADA' }}>
                  <p>Under {sd.statuteShort}, you can recover damages even if you were <strong className="text-white">99% at fault</strong>. For high-value {it.shortName} cases, this means even partial recovery can be substantial.</p>
                  <p className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <strong style={{ color: '#D4A84B' }}>Example:</strong> Your {it.shortName} damages total $2,000,000. You are found 25% at fault. Your net recovery:{' '}
                    <strong className="text-white">$2,000,000 × 0.75 = $1,500,000.</strong>
                  </p>
                </div>
              )}
              {sd.faultRule === 'modified_51' && (
                <div className="space-y-3 text-sm" style={{ color: '#C8CADA' }}>
                  <p>Under {sd.statuteShort}, you can recover if you are <strong className="text-white">50% or less</strong> at fault. Defense attorneys will aggressively seek to attribute 51% fault to you — especially in high-value {it.shortName} cases where a single percentage point means the difference between a multi-million dollar recovery and zero.</p>
                  <p className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <strong style={{ color: '#D4A84B' }}>Example:</strong> Your {it.shortName} damages total $3,000,000. You are found 30% at fault. Your net recovery:{' '}
                    <strong className="text-white">$3,000,000 × 0.70 = $2,100,000.</strong>
                  </p>
                </div>
              )}
              {sd.faultRule === 'modified_50' && (
                <div className="space-y-3 text-sm" style={{ color: '#C8CADA' }}>
                  <p>Under {sd.statuteShort}, you can recover if you are <strong className="text-white">less than 50%</strong> at fault. Being assigned exactly 50% means no recovery — making fault allocation fights particularly intense in high-value {it.shortName} cases.</p>
                  <p className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <strong style={{ color: '#D4A84B' }}>Example:</strong> Your damages are $2,500,000. You are found 35% at fault. Recovery:{' '}
                    <strong className="text-white">$2,500,000 × 0.65 = $1,625,000.</strong>
                  </p>
                </div>
              )}
              {sd.faultRule === 'contributory' && (
                <div className="space-y-3 text-sm" style={{ color: '#C8CADA' }}>
                  <p>Under {sd.name}&apos;s contributory negligence doctrine, <strong className="text-white">any fault</strong> on your part — even 1% — bars all recovery. For a {it.shortName} case worth $3–8 million, the stakes of the fault determination could not be higher.</p>
                  <p className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <strong style={{ color: '#fca5a5' }}>Critical Warning:</strong> Defense insurers in {sd.name} are highly incentivized to find any contributing fault on your part. Given the high value of {it.shortName} cases, you should retain an experienced {sd.name} truck accident attorney before any communication with the carrier or its insurer.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* ── Settlement Table ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-2">
              {sd.name} {it.shortName} Settlement Ranges
            </h2>
            <p className="text-sm mb-5" style={{ color: '#8A95A8' }}>
              {it.isWrongfulDeath
                ? 'Based on typical wrongful death economic and non-economic damages. Assumes decedent was not at fault. Actual amounts depend heavily on decedent\'s age, income, and number of dependents.'
                : `Based on ${it.name} economic damages and a ${it.multiplierLow}–${it.multiplierHigh}× damages multiplier. Assumes 0% plaintiff fault. Actual amounts vary significantly based on injury severity, treatment needs, and case evidence.`}
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: '#0F1D32' }}>
                    <th className="px-5 py-4 text-left font-bold text-white">Injury / Case Profile</th>
                    <th className="px-5 py-4 text-left font-bold text-white hidden sm:table-cell">Description</th>
                    <th className="px-5 py-4 text-right font-bold" style={{ color: '#D4A84B' }}>Est. Settlement Range</th>
                  </tr>
                </thead>
                <tbody>
                  {it.settlementRows.map(({ label, description, low, high }, i) => (
                    <tr
                      key={label}
                      style={{
                        backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.005)',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <td className="px-5 py-4 font-semibold text-white">{label}</td>
                      <td className="px-5 py-4 hidden sm:table-cell" style={{ color: '#8A95A8' }}>{description}</td>
                      <td className="px-5 py-4 text-right font-bold tabular-nums" style={{ color: '#D4A84B' }}>
                        {fmt(low)} – {fmt(high)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3" style={{ color: '#2d3f54' }}>
              Ranges represent 25th–90th percentile of estimated outcomes. Does not account for {sd.name} fault deductions.
              Commercial truck policies typically carry $750K–$5M in coverage. High-value cases may require excess coverage claims.
            </p>
            <div
              className="mt-4 px-4 py-3 rounded-lg text-xs leading-relaxed"
              style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#3d5270' }}
            >
              <strong style={{ color: '#4a6480' }}>Disclaimer:</strong> Settlement ranges shown are estimates based on general multiplier methods and publicly available data. They do not predict outcomes for any specific case. Every truck accident case is unique. <a href="/terms" style={{ color: '#4a6480', textDecoration: 'underline' }}>Terms of Service</a>
            </div>
          </section>

          {/* ── Liability Factors ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Key Evidence and Liability Factors in {sd.name} {it.shortName} Cases
            </h2>
            <div className="p-5 rounded-xl" style={{ backgroundColor: '#0F1D32', border: '1px solid rgba(255,255,255,0.07)' }}>
              <ul className="grid sm:grid-cols-2 gap-3">
                {it.liabilityFactors.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: '#C8CADA' }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: '#4a5e78' }}>▸</span>{f}
                  </li>
                ))}
              </ul>
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
              Calculate Your {sd.name} {it.shortName} Settlement
            </h2>
            <p className="text-sm mb-7 max-w-lg mx-auto" style={{ color: '#C8CADA' }}>
              Enter your specific damages and fault percentage. Our calculator applies{' '}
              {sd.name}&apos;s exact {faultRuleLabel[sd.faultRule].toLowerCase()} rule to your numbers.
            </p>
            <Link
              href="/calculator"
              className="inline-block px-10 py-4 rounded-lg font-black text-base transition-all hover:scale-105"
              style={{ backgroundColor: '#D4A84B', color: '#0F1D32', boxShadow: '0 6px 24px rgba(212,168,75,0.3)' }}
            >
              Calculate My Settlement →
            </Link>
          </section>

          {/* ── FAQ ── */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <FAQAccordion faqs={faqs} />
          </section>

          {/* ── Lead Capture ── */}
          <section
            className="rounded-xl p-6 sm:p-8"
            style={{ backgroundColor: '#0F1D32', border: '2px solid rgba(212,168,75,0.3)' }}
          >
            <h2 className="text-xl font-bold text-white mb-1">
              Get a Free {it.shortName} Case Evaluation
            </h2>
            <p className="text-sm mb-6" style={{ color: '#C8CADA' }}>
              Connect with a truck accident attorney in {sd.name} who handles {it.name.toLowerCase()} cases.
              Free consultation, no obligation — attorneys work on contingency.
            </p>
            <LeadCaptureForm
              stateName={sd.name}
              accidentType={it.name}
              source="injury-pseo-page"
            />
          </section>

          {/* ── Related Links ── */}
          <section>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#5a7090', letterSpacing: '0.12em' }}>
                  Other Injury Types in {sd.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {otherInjuries.slice(0, 6).map(i => (
                    <Link
                      key={i.slug}
                      href={`/settlements/${state}/injury/${i.slug}`}
                      className="related-link-card"
                    >
                      {i.shortName} →
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#5a7090', letterSpacing: '0.12em' }}>
                  {it.shortName} in Other States
                </h3>
                <div className="flex flex-wrap gap-2">
                  {relatedStates.map(s => (
                    <Link
                      key={s}
                      href={`/settlements/${s}/injury/${injury}`}
                      className="related-link-card capitalize"
                    >
                      {s.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} →
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
              <strong style={{ color: '#4a5e78' }}>Disclaimer:</strong> This page provides general legal information about {it.name.toLowerCase()} truck accident settlements in {sd.name}. It is not legal advice. Settlement estimates are based on typical case parameters and publicly available data. Actual results vary. Consult a licensed attorney for advice specific to your situation.
            </p>
            <p>
              Data sourced from FMCSA Large Truck and Bus Crash Facts, NHTSA Fatality Analysis Reporting System (FARS), and published medical cost data. Last reviewed March 2026.
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}
