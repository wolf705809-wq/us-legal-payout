'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { STATES, type FaultRule } from '@/data/states';
import { captureUtmParams, getStoredUtmParams } from '@/lib/utm';
import CallNowButton from '@/components/common/CallNowButton';
import { useScrollDepth } from '@/hooks/useScrollDepth';

// ── Types ──────────────────────────────────────────────────────────────────────

interface FormData {
  state: string;
  accidentType: string;
  accidentDate: string;
  injuryTypes: string[];
  severity: string;
  hospitalized: boolean | null;
  surgery: boolean | null;
  medicalBills: string;
  futureMedicalUnknown: boolean;
  futureMedical: string;
  lostWages: string;
  futureWages: string;
  propertyDamage: string;
  faultPct: number;
  truckingCompany: string;
}

interface CalcResult {
  totalEconomic: number;
  generalDamages: number;
  rawTotal: number;
  adjusted: number;
  low: number;
  high: number;
  multiplierUsed: number;
  faultRule: FaultRule;
  stateName: string;
  zeroReason?: string;
  isHazmat: boolean;
}

interface SOLResult {
  deadline: Date;
  daysRemaining: number;
  years: number;
  expired: boolean;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const ACCIDENT_TYPES = [
  'Jackknife',
  'Rear-End Collision',
  'Rollover',
  'Head-On Collision',
  'T-Bone / Side-Impact',
  'Underride',
  'Wide Turn',
  'Blind Spot',
  'Tire Blowout',
  'Hazmat Spill',
  'Brake Failure / Runaway',
  'Multi-Vehicle Pileup',
];

const INJURY_TYPES = [
  'Traumatic Brain Injury (TBI)',
  'Spinal Cord Injury / Paralysis',
  'Wrongful Death',
  'Broken Bones / Fractures',
  'Internal Organ Damage',
  'Burns',
  'Whiplash / Neck Injury',
  'Back Injury / Herniated Disc',
  'Amputation',
  'PTSD / Emotional Distress',
];

// Context hint shown when an injury is selected — drives urgency and education
const INJURY_HINTS: Record<string, string> = {
  'Traumatic Brain Injury (TBI)':
    'TBI cases typically settle 7–10× higher than soft tissue injuries — TBI is the single highest-value injury category in truck accident litigation.',
  'Spinal Cord Injury / Paralysis':
    'Spinal cord injuries rank among the highest-value truck accident claims. Lifetime care costs alone can exceed $3–5 million — both economic and non-economic damages are substantial.',
  'Wrongful Death':
    'Wrongful death claims use a separate calculation: funeral costs + lost lifetime earnings + loss of consortium. Cases with surviving minor children routinely exceed $3 million.',
  'Broken Bones / Fractures':
    'Fracture settlements depend heavily on complexity — a simple fracture settles very differently from a comminuted pelvic fracture requiring multiple surgeries.',
  'Internal Organ Damage':
    'Internal injuries are often "silent" at the scene. Delayed diagnosis documentation and expert testimony on long-term organ function are critical to these claims.',
  'Burns':
    'Burn cases involving 3rd-degree burns or skin grafting typically use a 5–9× multiplier. Disfigurement adds substantial non-economic value beyond medical costs.',
  'Whiplash / Neck Injury':
    'Defense insurers routinely dispute whiplash — but truck collisions generate far greater neck forces than typical car crashes. A biomechanics expert is often essential.',
  'Back Injury / Herniated Disc':
    'If surgery is required (discectomy or fusion), settlement value increases significantly. A pre-accident MRI comparison is often the key evidence battleground.',
  'Amputation':
    'Lifetime prosthetic costs ($100K–$600K per decade) and home modification make amputation one of the highest-value non-fatal injury categories, using an 8–10× multiplier.',
  'PTSD / Emotional Distress':
    'PTSD requires licensed mental health expert testimony and objective functional impairment documentation. Driving phobia from a truck accident is a recognized and compensable injury.',
};

const SEVERITIES = [
  { value: 'minor', label: 'Minor', desc: 'Soft tissue, minor fractures, full recovery expected', multiplier: 2 },
  { value: 'moderate', label: 'Moderate', desc: 'Significant injury, some long-term effects', multiplier: 4 },
  { value: 'severe', label: 'Severe', desc: 'Surgery required, permanent partial disability', multiplier: 6.5 },
  { value: 'catastrophic', label: 'Catastrophic', desc: 'Permanent total disability or loss of function', multiplier: 9 },
  { value: 'fatal', label: 'Fatal / Wrongful Death', desc: 'Fatality resulting from the accident', multiplier: 10 },
];

const INITIAL_FORM: FormData = {
  state: '', accidentType: '', accidentDate: '',
  injuryTypes: [], severity: '', hospitalized: null, surgery: null,
  medicalBills: '', futureMedicalUnknown: false, futureMedical: '',
  lostWages: '', futureWages: '', propertyDamage: '',
  faultPct: 0, truckingCompany: '',
};

const STEP_TITLES = ['Accident Info', 'Injury Details', 'Financial Damages', 'Fault Assessment'];

// ── Helpers ────────────────────────────────────────────────────────────────────

function parseMoney(s: string): number {
  return Math.max(0, parseFloat(s.replace(/,/g, '')) || 0);
}

function formatRange(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n).toLocaleString()}`;
}

function formatDollars(n: number): string {
  return `$${Math.round(n).toLocaleString()}`;
}

function calculate(form: FormData): CalcResult {
  const medical = parseMoney(form.medicalBills);
  const futureMed = form.futureMedicalUnknown ? medical * 1.5 : parseMoney(form.futureMedical);
  const lost = parseMoney(form.lostWages);
  const futureLost = parseMoney(form.futureWages);
  const property = parseMoney(form.propertyDamage);

  const totalEconomic = medical + futureMed + lost + futureLost + property;
  const sev = SEVERITIES.find(s => s.value === form.severity);
  const multiplier = sev?.multiplier ?? 2;
  const generalDamages = totalEconomic * multiplier;
  const rawTotal = totalEconomic + generalDamages;

  const stateData = STATES[form.state];
  const rule: FaultRule = stateData?.faultRule ?? 'modified_51';
  const faultFrac = form.faultPct / 100;

  let adjusted = rawTotal;
  let zeroReason: string | undefined;

  if (rule === 'contributory' && faultFrac > 0) {
    adjusted = 0;
    zeroReason = `${stateData.name} follows contributory negligence — any fault on your part bars all recovery.`;
  } else if (rule === 'modified_51' && faultFrac >= 0.51) {
    adjusted = 0;
    zeroReason = `${stateData.name} follows the 51% bar rule — recovery is barred when you are 51% or more at fault.`;
  } else if (rule === 'modified_50' && faultFrac >= 0.50) {
    adjusted = 0;
    zeroReason = `${stateData.name} follows the 50% bar rule — recovery is barred when you are 50% or more at fault.`;
  } else {
    adjusted = rawTotal * (1 - faultFrac);
  }

  const isHazmat = form.accidentType === 'Hazmat Spill';

  return {
    totalEconomic, generalDamages, rawTotal, adjusted,
    low: Math.round(adjusted * 0.75),
    high: Math.round(adjusted * 1.25),
    multiplierUsed: multiplier,
    faultRule: rule,
    stateName: stateData?.name ?? form.state,
    zeroReason, isHazmat,
  };
}

function getSOL(accidentDate: string, stateCode: string): SOLResult | null {
  if (!accidentDate || !stateCode) return null;
  const state = STATES[stateCode];
  if (!state) return null;
  const accident = new Date(accidentDate);
  const deadline = new Date(accident);
  deadline.setFullYear(deadline.getFullYear() + state.solYears);
  const today = new Date();
  const daysRemaining = Math.floor((deadline.getTime() - today.getTime()) / 86_400_000);
  return { deadline, daysRemaining, years: state.solYears, expired: daysRemaining <= 0 };
}

// ── Shared input style ─────────────────────────────────────────────────────────

const fieldStyle: React.CSSProperties = {
  backgroundColor: '#0F1D32',
  border: '1px solid rgba(255,255,255,0.15)',
  color: 'white',
  borderRadius: '0.5rem',
  width: '100%',
  padding: '0.75rem 1rem',
  fontSize: '0.875rem',
  outline: 'none',
};

// ── Trust Shield Bar ───────────────────────────────────────────────────────────

function TrustShieldBar() {
  const items = [
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      text: 'No personal information required to get your estimate',
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      text: 'Your data is never sold or shared with third parties',
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      text: 'Results are instant — no waiting for a callback',
    },
  ];

  return (
    <div
      className="flex flex-col sm:flex-row gap-3 mb-7 px-4 py-3.5 rounded-xl"
      style={{
        backgroundColor: 'rgba(212,168,75,0.05)',
        border: '1px solid rgba(212,168,75,0.18)',
      }}
    >
      {items.map(({ icon, text }) => (
        <div key={text} className="flex items-center gap-2.5 flex-1">
          <span className="flex-shrink-0" style={{ color: '#D4A84B' }}>{icon}</span>
          <span className="text-xs leading-tight" style={{ color: '#8A95A8' }}>{text}</span>
        </div>
      ))}
    </div>
  );
}

// ── Progress Bar ───────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold mb-3 text-center" style={{ color: '#8A95A8' }}>
        Step {step} of 4 &middot; Takes about 2 minutes
      </p>
      <div className="flex items-center mb-3">
        {STEP_TITLES.map((title, i) => {
          const n = i + 1;
          const done = n < step;
          const active = n === step;
          return (
            <div key={n} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all${active ? ' step-pulse' : ''}`}
                  style={{
                    backgroundColor: done || active ? '#D4A84B' : '#1a2e4a',
                    color: done || active ? '#0F1D32' : '#4a5e78',
                    border: active ? '2px solid #D4A84B' : '2px solid transparent',
                  }}
                >
                  {done ? '✓' : n}
                </div>
                <span
                  className="text-xs mt-1 hidden sm:block text-center"
                  style={{ color: active ? '#D4A84B' : done ? '#8A95A8' : '#4a5e78', whiteSpace: 'nowrap' }}
                >
                  {title}
                </span>
              </div>
              {i < STEP_TITLES.length - 1 && (
                <div
                  className="flex-1 h-px mx-2 mb-4 transition-all"
                  style={{ backgroundColor: done ? '#D4A84B' : '#1a2e4a' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 1: Accident Info ──────────────────────────────────────────────────────

function Step1({ form, update }: { form: FormData; update: (k: keyof FormData, v: FormData[keyof FormData]) => void }) {
  const sortedStates = Object.entries(STATES).sort((a, b) => a[1].name.localeCompare(b[1].name));
  return (
    <div className="space-y-5">
      {/* State */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">State of Accident *</label>
        <select
          value={form.state}
          onChange={e => update('state', e.target.value)}
          style={{ ...fieldStyle, color: form.state ? 'white' : '#4a5e78' }}
        >
          <option value="">Select your state…</option>
          {sortedStates.map(([code, s]) => (
            <option key={code} value={code}>{s.name}</option>
          ))}
        </select>
        {form.state && (
          <div
            className="mt-2 px-3 py-2.5 rounded-lg text-xs leading-relaxed"
            style={{
              backgroundColor: 'rgba(212,168,75,0.06)',
              border: '1px solid rgba(212,168,75,0.18)',
              color: '#8A95A8',
            }}
          >
            <strong style={{ color: '#D4A84B' }}>{STATES[form.state].name} fault rule: </strong>
            {STATES[form.state].faultDescription}
          </div>
        )}
      </div>

      {/* Accident Type */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Accident Type *</label>
        <select
          value={form.accidentType}
          onChange={e => update('accidentType', e.target.value)}
          style={{ ...fieldStyle, color: form.accidentType ? 'white' : '#4a5e78' }}
        >
          <option value="">Select accident type…</option>
          {ACCIDENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {form.accidentType === 'Hazmat Spill' && (
          <p className="text-xs mt-1.5 px-1" style={{ color: '#D4A84B' }}>
            Hazmat carriers carry $1M–$5M minimum insurance — significantly higher than the standard $750K minimum.
          </p>
        )}
      </div>

      {/* Accident Date */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Accident Date{' '}
          <span style={{ color: '#4a5e78', fontWeight: 400 }}>(for statute of limitations calculation)</span>
        </label>
        <input
          type="date"
          value={form.accidentDate}
          max={new Date().toISOString().split('T')[0]}
          onChange={e => update('accidentDate', e.target.value)}
          style={{ ...fieldStyle, colorScheme: 'dark' }}
        />
        <p className="text-xs mt-1.5 px-1" style={{ color: '#4a5e78' }}>
          Truck black box (EDR) data is typically overwritten within 30 days. Time matters.
        </p>
      </div>
    </div>
  );
}

// ── Step 2: Injury Details ─────────────────────────────────────────────────────

function Step2({
  form, update, toggleInjury,
}: {
  form: FormData;
  update: (k: keyof FormData, v: FormData[keyof FormData]) => void;
  toggleInjury: (t: string) => void;
}) {
  // Show hint for the most recently selected (highest-value) injury
  const hint = form.injuryTypes.length > 0
    ? INJURY_HINTS[form.injuryTypes[form.injuryTypes.length - 1]]
    : null;

  return (
    <div className="space-y-7">
      {/* Injury types */}
      <div>
        <label className="block text-sm font-semibold text-white mb-3">
          Injury Types * <span style={{ color: '#4a5e78', fontWeight: 400 }}>— select all that apply</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {INJURY_TYPES.map(type => {
            const checked = form.injuryTypes.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleInjury(type)}
                className="px-3 py-2.5 rounded-lg text-left text-sm transition-all"
                style={{
                  backgroundColor: checked ? 'rgba(212,168,75,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${checked ? '#D4A84B' : 'rgba(255,255,255,0.1)'}`,
                  color: checked ? '#D4A84B' : '#C8CADA',
                  fontWeight: checked ? 600 : 400,
                }}
              >
                <span className="mr-2">{checked ? '✓' : '○'}</span>{type}
              </button>
            );
          })}
        </div>

        {/* Contextual hint for selected injury */}
        {hint && (
          <div
            className="mt-3 px-3 py-2.5 rounded-lg text-xs leading-relaxed"
            style={{
              backgroundColor: 'rgba(212,168,75,0.06)',
              border: '1px solid rgba(212,168,75,0.2)',
              color: '#C8CADA',
            }}
          >
            <strong style={{ color: '#D4A84B' }}>What to know: </strong>{hint}
          </div>
        )}
      </div>

      {/* Severity */}
      <div>
        <label className="block text-sm font-semibold text-white mb-3">Overall Severity *</label>
        <div className="space-y-2">
          {SEVERITIES.map(({ value, label, desc, multiplier }) => {
            const selected = form.severity === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => update('severity', value)}
                className="w-full px-4 py-3 rounded-lg text-left transition-all flex items-center justify-between"
                style={{
                  backgroundColor: selected ? 'rgba(212,168,75,0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selected ? '#D4A84B' : 'rgba(255,255,255,0.1)'}`,
                }}
              >
                <div>
                  <span className="text-sm font-semibold" style={{ color: selected ? '#D4A84B' : 'white' }}>
                    {label}
                  </span>
                  <span className="text-xs ml-2" style={{ color: '#4a5e78' }}>{desc}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs hidden sm:block" style={{ color: selected ? '#D4A84B' : '#4a5e78' }}>
                    {multiplier}× multiplier
                  </span>
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0 border-2 transition-all"
                    style={{
                      borderColor: selected ? '#D4A84B' : '#4a5e78',
                      backgroundColor: selected ? '#D4A84B' : 'transparent',
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hospitalized / Surgery */}
      <div className="grid grid-cols-2 gap-5">
        {(
          [
            { key: 'hospitalized' as const, label: 'Were you hospitalized?' },
            { key: 'surgery' as const, label: 'Surgery required?' },
          ] as const
        ).map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-white mb-2">{label}</label>
            <div className="flex gap-2">
              {([true, false] as const).map(val => (
                <button
                  key={String(val)}
                  type="button"
                  onClick={() => update(key, val)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    backgroundColor:
                      form[key] === val
                        ? val ? 'rgba(212,168,75,0.12)' : 'rgba(255,255,255,0.07)'
                        : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${form[key] === val ? (val ? '#D4A84B' : 'rgba(255,255,255,0.3)') : 'rgba(255,255,255,0.1)'}`,
                    color: form[key] === val ? (val ? '#D4A84B' : 'white') : '#4a5e78',
                  }}
                >
                  {val ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Step 3: Financial Damages ──────────────────────────────────────────────────

function MoneyField({
  label, value, onChange, required, placeholder, hint,
}: {
  label: string; value: string; onChange: (v: string) => void;
  required?: boolean; placeholder?: string; hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-white mb-2">
        {label}{required && ' *'}
        {hint && <span className="text-xs ml-1.5 font-normal" style={{ color: '#4a5e78' }}>— {hint}</span>}
      </label>
      <div className="relative">
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium select-none"
          style={{ color: '#4a5e78' }}
        >
          $
        </span>
        <input
          type="number"
          min="0"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder ?? '0'}
          style={{ ...fieldStyle, paddingLeft: '1.75rem' }}
        />
      </div>
    </div>
  );
}

function Step3({
  form, update, onSkip,
}: {
  form: FormData;
  update: (k: keyof FormData, v: FormData[keyof FormData]) => void;
  onSkip: () => void;
}) {
  const hint = (
    <span className="text-xs ml-1.5" style={{ color: '#4a5e78', fontWeight: 400 }}>
      — Don&apos;t know? Enter 0, we&apos;ll use state averages
    </span>
  );
  return (
    <div className="space-y-5">
      {/* Skip link */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSkip}
          className="text-xs transition-colors hover:text-white"
          style={{ color: '#4a5e78' }}
        >
          Skip this step →
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Medical bills to date *{hint}
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium select-none" style={{ color: '#4a5e78' }}>$</span>
          <input
            type="number" min="0" required
            value={form.medicalBills}
            onChange={e => update('medicalBills', e.target.value)}
            placeholder="0"
            style={{ ...fieldStyle, paddingLeft: '1.75rem' }}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-white">Estimated future medical costs</label>
          <label className="flex items-center gap-2 text-xs cursor-pointer select-none" style={{ color: '#8A95A8' }}>
            <input
              type="checkbox"
              checked={form.futureMedicalUnknown}
              onChange={e => update('futureMedicalUnknown', e.target.checked)}
              style={{ accentColor: '#D4A84B' }}
            />
            Not sure — auto-estimate
          </label>
        </div>
        {form.futureMedicalUnknown ? (
          <div
            className="px-4 py-3 rounded-lg text-sm"
            style={{
              backgroundColor: 'rgba(212,168,75,0.07)',
              border: '1px solid rgba(212,168,75,0.25)',
              color: '#C8CADA',
            }}
          >
            Will be estimated at <strong style={{ color: '#D4A84B' }}>1.5× your current medical bills</strong>.
          </div>
        ) : (
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium" style={{ color: '#4a5e78' }}>$</span>
            <input
              type="number" min="0"
              value={form.futureMedical}
              onChange={e => update('futureMedical', e.target.value)}
              placeholder="0"
              style={{ ...fieldStyle, paddingLeft: '1.75rem' }}
            />
          </div>
        )}
      </div>

      <MoneyField label="Lost wages to date" hint="Don't know? Enter 0" value={form.lostWages} onChange={v => update('lostWages', v)} />
      <MoneyField label="Future lost earning capacity" hint="Don't know? Enter 0" value={form.futureWages} onChange={v => update('futureWages', v)} />
      <MoneyField label="Vehicle / property damage" hint="Don't know? Enter 0" value={form.propertyDamage} onChange={v => update('propertyDamage', v)} />
    </div>
  );
}

// ── Step 4: Fault Assessment ───────────────────────────────────────────────────

function Step4({ form, update }: { form: FormData; update: (k: keyof FormData, v: FormData[keyof FormData]) => void }) {
  const stateData = STATES[form.state];
  return (
    <div className="space-y-7">
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-white">Your estimated fault percentage</label>
          <span className="text-3xl font-black" style={{ color: '#D4A84B' }}>{form.faultPct}%</span>
        </div>
        <input
          type="range" min={0} max={50} step={5}
          value={form.faultPct}
          onChange={e => update('faultPct', Number(e.target.value))}
          className="w-full"
          style={{ accentColor: '#D4A84B', cursor: 'pointer' }}
        />
        <div className="flex justify-between text-xs mt-1.5" style={{ color: '#4a5e78' }}>
          <span>0% — Not at fault</span>
          <span>25%</span>
          <span>50%</span>
        </div>
        {stateData && (
          <p
            className="text-xs mt-3 px-3 py-2.5 rounded-lg leading-relaxed"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: '#8A95A8' }}
          >
            <strong style={{ color: '#C8CADA' }}>{stateData.name}:</strong> {stateData.faultDescription}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Trucking company name{' '}
          <span style={{ color: '#4a5e78', fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          type="text"
          value={form.truckingCompany}
          onChange={e => update('truckingCompany', e.target.value)}
          placeholder="e.g., Werner Enterprises, Swift Transportation…"
          style={fieldStyle}
        />
        <p className="text-xs mt-1.5 px-1" style={{ color: '#4a5e78' }}>
          We&apos;ll pull their FMCSA safety scores and insurance minimums.
        </p>
      </div>
    </div>
  );
}

// ── Donut Chart ────────────────────────────────────────────────────────────────

function DonutChart({ economic, general }: { economic: number; general: number }) {
  const total = economic + general;
  if (total === 0) return null;
  const r = 58;
  const cx = 80;
  const cy = 80;
  const C = 2 * Math.PI * r;
  const econDash = C * (economic / total);

  return (
    <svg width="160" height="160" viewBox="0 0 160 160" aria-label="Damages breakdown">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a2e4a" strokeWidth="24" />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke="#D4A84B" strokeWidth="24"
        strokeDasharray={`${C}`}
        style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px` }}
      />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke="#4a7aba" strokeWidth="24"
        strokeDasharray={`${econDash} ${C - econDash}`}
        style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px` }}
      />
    </svg>
  );
}

// ── How We Calculated This — Accordion ────────────────────────────────────────

function CalcBreakdownAccordion({
  results, form,
}: {
  results: CalcResult;
  form: FormData;
}) {
  const [open, setOpen] = useState(false);
  const stateData = STATES[form.state];
  const sev = SEVERITIES.find(s => s.value === form.severity);

  const faultRuleLabel: Record<string, string> = {
    pure_comparative: 'pure comparative fault — any fault percentage is allowed',
    modified_51: '51% bar rule — recovery barred at 51%+ fault',
    modified_50: '50% bar rule — recovery barred at 50%+ fault',
    contributory: 'contributory negligence — any fault bars recovery',
  };

  const rows = [
    {
      label: 'Economic damages',
      value: formatDollars(results.totalEconomic),
      detail: 'Your medical bills + lost wages + future costs + property damage',
    },
    {
      label: `Non-economic multiplier`,
      value: `${results.multiplierUsed}×`,
      detail: `Applied to economic damages for "${sev?.label ?? form.severity}" severity — reflects pain, suffering, and impact on quality of life`,
    },
    {
      label: 'Total before fault adjustment',
      value: formatDollars(results.rawTotal),
      detail: `Economic (${formatDollars(results.totalEconomic)}) + Non-economic (${formatDollars(results.generalDamages)})`,
    },
    ...(form.faultPct > 0 ? [{
      label: `${stateData?.name ?? ''} ${faultRuleLabel[results.faultRule] ?? results.faultRule}`,
      value: `−${form.faultPct}%`,
      detail: `Your ${form.faultPct}% fault reduces the total by ${form.faultPct}% — net adjusted: ${formatDollars(results.adjusted)}`,
    }] : []),
    {
      label: 'Settlement range (±25% of adjusted)',
      value: `${formatRange(results.low)} – ${formatRange(results.high)}`,
      detail: 'Real settlements vary based on evidence quality, attorney skill, and insurance policy limits. This range reflects the 25th–90th percentile of likely outcomes.',
    },
    ...(results.isHazmat ? [{
      label: 'FMCSA Hazmat insurance minimum',
      value: '$1M–$5M',
      detail: 'Hazardous materials carriers must carry $1,000,000–$5,000,000 minimum — far exceeding the standard $750,000 minimum for general freight.',
    }] : []),
  ];

  return (
    <div
      className="rounded-xl mb-5 overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
        style={{ backgroundColor: '#0F1D32' }}
      >
        <span className="text-sm font-bold text-white">How we calculated this</span>
        <span style={{ color: '#D4A84B', fontSize: '1.1rem', lineHeight: 1 }}>
          {open ? '−' : '+'}
        </span>
      </button>

      {open && (
        <div style={{ backgroundColor: '#080f1e' }}>
          {rows.map(({ label, value, detail }, i) => (
            <div
              key={label}
              className="px-5 py-4"
              style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="flex items-start justify-between gap-4 mb-1">
                <span className="text-sm font-semibold text-white">{label}</span>
                <span className="text-sm font-black flex-shrink-0" style={{ color: '#D4A84B' }}>{value}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#4a6480' }}>{detail}</p>
            </div>
          ))}
          <div
            className="px-5 py-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(212,168,75,0.04)' }}
          >
            <p className="text-xs" style={{ color: '#3d5270' }}>
              Methodology based on NHTSA FARS 2022, FMCSA safety data, and general principles from published truck accident settlements. Not legal advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Results View ───────────────────────────────────────────────────────────────

interface LeadFormData { name: string; email: string; phone: string; }

// ── Phone formatting (results view) ──────────────────────────────────────────

function fmtPhone(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

const EMAIL_TYPOS: Record<string, string> = {
  'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gamil.com': 'gmail.com',
  'yaho.com': 'yahoo.com', 'yahooo.com': 'yahoo.com',
  'hotmial.com': 'hotmail.com', 'outlok.com': 'outlook.com',
};

function suggestEmailFix(email: string): string | null {
  const at = email.lastIndexOf('@');
  if (at < 1) return null;
  const domain = email.slice(at + 1).toLowerCase();
  return EMAIL_TYPOS[domain] ? `${email.slice(0, at + 1)}${EMAIL_TYPOS[domain]}` : null;
}

// ─────────────────────────────────────────────────────────────────────────────

function ResultsView({
  results, form, sol,
  leadForm, setLeadForm,
  leadSubmitted, leadLoading,
  onSubmitLead, onBack,
}: {
  results: CalcResult;
  form: FormData;
  sol: SOLResult | null;
  leadForm: LeadFormData;
  setLeadForm: React.Dispatch<React.SetStateAction<LeadFormData>>;
  leadSubmitted: boolean;
  leadLoading: boolean;
  onSubmitLead: (e: React.FormEvent) => void;
  onBack: () => void;
}) {
  const stateData = STATES[form.state];
  const isZero = results.adjusted === 0;
  const scrollDepth = useScrollDepth();
  const [timerDone, setTimerDone] = useState(false);
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);

  // 8-second timer to show lead form
  useEffect(() => {
    const t = setTimeout(() => setTimerDone(true), 8_000);
    return () => clearTimeout(t);
  }, []);

  const formVisible = scrollDepth >= 400 || timerDone;

  const handlePhoneChange = (raw: string) => {
    setLeadForm(p => ({ ...p, phone: fmtPhone(raw) }));
  };

  const handleEmailChange = (val: string) => {
    setLeadForm(p => ({ ...p, email: val }));
    setEmailSuggestion(suggestEmailFix(val));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Back */}
      <button
        onClick={onBack}
        className="text-sm mb-6 flex items-center gap-1 transition-colors hover:text-white"
        style={{ color: '#4a5e78' }}
      >
        ← Recalculate
      </button>

      {/* ── Settlement Range ── */}
      <div
        className="rounded-xl p-8 text-center mb-5"
        style={{
          background: isZero
            ? 'linear-gradient(135deg, #1a0f0f, #2a1515)'
            : 'linear-gradient(135deg, #0F1D32, #0F1D32)',
          border: `2px solid ${isZero ? 'rgba(239,68,68,0.4)' : 'rgba(212,168,75,0.5)'}`,
        }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: isZero ? '#ef4444' : '#D4A84B', letterSpacing: '0.2em' }}
        >
          Estimated Settlement Range
        </p>

        {isZero ? (
          <>
            <p className="text-5xl font-black text-white mb-3">$0</p>
            <p className="text-sm max-w-sm mx-auto leading-relaxed" style={{ color: '#fca5a5' }}>
              {results.zeroReason}
            </p>
            <p className="text-xs mt-3" style={{ color: '#8A95A8' }}>
              An attorney may still be able to help. Request a free consultation below.
            </p>
          </>
        ) : (
          <>
            <p
              className="text-4xl sm:text-5xl font-black tracking-tight"
              style={{
                color: '#D4A84B',
                textShadow: '0 0 40px rgba(212,168,75,0.25)',
              }}
            >
              {formatRange(results.low)}&nbsp;—&nbsp;{formatRange(results.high)}
            </p>
            <p className="text-sm mt-3" style={{ color: '#8A95A8' }}>
              {stateData?.name} · {form.severity} injury ·{' '}
              {form.faultPct > 0 ? `${form.faultPct}% fault applied` : 'no fault reduction'}
            </p>
          </>
        )}
      </div>

      {/* ── Estimate disclaimer ── */}
      {!isZero && (
        <div
          className="flex items-start gap-3 px-4 py-3 rounded-lg mb-5 text-xs leading-relaxed"
          style={{ backgroundColor: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)', color: '#8A95A8' }}
        >
          <span className="flex-shrink-0 mt-0.5" style={{ color: '#D4A84B' }}>⚠</span>
          <span>
            <strong style={{ color: '#C8CADA' }}>This estimate is for informational purposes only.</strong>{' '}
            It is NOT legal advice and does NOT guarantee any outcome. Actual settlements vary significantly based on case-specific facts, evidence, attorney skill, and many other factors.{' '}
            <a href="/terms" style={{ color: '#5a7090', textDecoration: 'underline' }}>Terms of Service</a>
          </span>
        </div>
      )}

      {/* ── Breakdown ── */}
      {!isZero && results.totalEconomic > 0 && (
        <div
          className="rounded-xl p-6 mb-5"
          style={{ backgroundColor: '#0F1D32', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <h2 className="text-sm font-bold text-white mb-4">Settlement Breakdown</h2>
          <div className="flex items-center gap-6">
            <DonutChart economic={results.totalEconomic} general={results.generalDamages} />
            <div className="space-y-3 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-sm" style={{ color: '#C8CADA' }}>
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#4a7aba' }} />
                  Economic Damages
                </span>
                <span className="text-sm font-semibold text-white tabular-nums">
                  {formatDollars(results.totalEconomic)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-sm" style={{ color: '#C8CADA' }}>
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4A84B' }} />
                  Non-Economic Damages
                </span>
                <span className="text-sm font-semibold text-white tabular-nums">
                  {formatDollars(results.generalDamages)}
                </span>
              </div>
              <div className="pt-3 mt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#8A95A8' }}>Raw total</span>
                  <span className="font-semibold text-white tabular-nums">{formatDollars(results.rawTotal)}</span>
                </div>
                {form.faultPct > 0 && (
                  <div className="flex justify-between text-sm mt-1.5">
                    <span style={{ color: '#8A95A8' }}>After {form.faultPct}% fault deduction</span>
                    <span className="font-bold tabular-nums" style={{ color: '#D4A84B' }}>
                      {formatDollars(results.adjusted)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {results.isHazmat && (
            <p className="text-xs mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', color: '#C8CADA' }}>
              <strong style={{ color: '#D4A84B' }}>Hazmat note:</strong> FMCSA requires hazmat carriers to carry a minimum of $5,000,000 in insurance — significantly higher than the standard $750,000 minimum.
            </p>
          )}
        </div>
      )}

      {/* ── How We Calculated This ── */}
      {!isZero && results.totalEconomic > 0 && (
        <CalcBreakdownAccordion results={results} form={form} />
      )}

      {/* ── State Law Card ── */}
      {stateData && (
        <div
          className="rounded-xl p-5 mb-4"
          style={{
            backgroundColor: '#0F1D32',
            border: '1px solid rgba(255,255,255,0.07)',
            borderLeft: '4px solid #D4A84B',
          }}
        >
          <h2 className="text-sm font-bold text-white mb-1.5">
            {stateData.name} Fault Law
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
            {stateData.faultDescription}
          </p>
        </div>
      )}

      {/* ── Statute of Limitations ── */}
      {sol && (() => {
        const solClass = sol.expired
          ? 'sol-red'
          : sol.daysRemaining < 180
          ? 'sol-yellow'
          : 'sol-green';
        const textColor = sol.expired
          ? '#fca5a5'
          : sol.daysRemaining < 180
          ? '#fde68a'
          : '#86efac';
        const daysColor = sol.expired
          ? '#fca5a5'
          : sol.daysRemaining < 180
          ? '#fbbf24'
          : '#4ade80';
        return (
          <div
            className={`rounded-xl p-5 mb-6 ${solClass}`}
            style={{ border: '1px solid transparent' }}
          >
            <h2 className="text-sm font-bold text-white mb-1.5">Statute of Limitations</h2>
            {sol.expired ? (
              <p className="text-sm leading-relaxed" style={{ color: textColor }}>
                Your {sol.years}-year filing deadline appears to have passed. Consult an attorney immediately — exceptions may apply (tolling, discovery rule).
              </p>
            ) : (
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                You have approximately{' '}
                <strong style={{ color: daysColor }}>
                  {sol.daysRemaining} days
                </strong>{' '}
                to file (deadline:{' '}
                {sol.deadline.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}).{' '}
                {stateData?.name} allows {sol.years} year{sol.years !== 1 ? 's' : ''} to file a personal injury claim.
              </p>
            )}
          </div>
        );
      })()}

      {/* ── Lead Capture (delayed reveal) ── */}
      <div
        style={{
          opacity: formVisible ? 1 : 0,
          transform: formVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          pointerEvents: formVisible ? 'auto' : 'none',
        }}
      >
        {/* Call CTA */}
        <div
          className="rounded-xl px-5 py-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between"
          style={{ backgroundColor: '#0F1D32', border: '1px solid rgba(212,168,75,0.2)' }}
        >
          <p className="text-sm" style={{ color: '#C8CADA' }}>
            Prefer to talk?{' '}
            <strong style={{ color: 'white' }}>Call now for a free consultation.</strong>
          </p>
          <CallNowButton size="sm" />
        </div>

        <div
          className="rounded-xl p-6"
          style={{ backgroundColor: '#0F1D32', border: '2px solid rgba(212,168,75,0.35)' }}
        >
          <h2 className="text-lg font-bold text-white mb-1">
            Get a Free Case Review from a Licensed Attorney in {stateData?.name ?? 'Your State'}
          </h2>
          <p className="text-sm mb-6" style={{ color: '#C8CADA' }}>
            A licensed truck accident attorney will review your case details — confidentially, for free, with no obligation to proceed.
            {form.truckingCompany && ` We'll include ${form.truckingCompany}'s FMCSA safety record.`}
          </p>

          {leadSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <p className="text-2xl font-black text-white">✅ We&apos;ve received your information.</p>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                A licensed attorney in <strong style={{ color: '#D4A84B' }}>{stateData?.name ?? 'your state'}</strong> will
                contact you within 24 hours. In the meantime, save this page for reference.
              </p>
              <div className="pt-2">
                <CallNowButton size="sm" />
                <p className="text-xs mt-2" style={{ color: '#4a5e78' }}>For urgent matters, call us directly.</p>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={onSubmitLead} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#8A95A8' }}>Full Name *</label>
                    <input
                      type="text" required
                      value={leadForm.name}
                      onChange={e => setLeadForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="John Smith"
                      style={{ ...fieldStyle, backgroundColor: '#1a2e4a' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#8A95A8' }}>Phone Number *</label>
                    <input
                      type="tel" required
                      value={leadForm.phone}
                      onChange={e => handlePhoneChange(e.target.value)}
                      placeholder="(555) 555-5555"
                      style={{ ...fieldStyle, backgroundColor: '#1a2e4a' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#8A95A8' }}>Email Address *</label>
                  <input
                    type="email" required
                    value={leadForm.email}
                    onChange={e => handleEmailChange(e.target.value)}
                    placeholder="john@example.com"
                    style={{ ...fieldStyle, backgroundColor: '#1a2e4a' }}
                  />
                  {emailSuggestion && (
                    <p className="text-xs mt-1.5 px-1" style={{ color: '#D4A84B' }}>
                      Did you mean{' '}
                      <button
                        type="button"
                        onClick={() => { setLeadForm(p => ({ ...p, email: emailSuggestion })); setEmailSuggestion(null); }}
                        className="underline font-semibold"
                        style={{ color: '#D4A84B' }}
                      >
                        {emailSuggestion}
                      </button>
                      ?
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={leadLoading}
                  className="w-full py-4 rounded-lg font-black text-sm transition-all hover:opacity-90"
                  style={{
                    backgroundColor: leadLoading ? '#a07e34' : '#D4A84B',
                    color: '#0F1D32',
                    cursor: leadLoading ? 'wait' : 'pointer',
                  }}
                >
                  {leadLoading
                    ? 'Connecting you with an attorney…'
                    : 'Get My Free Case Evaluation →'}
                </button>
              </form>

              {/* What happens next */}
              <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#4a6480', letterSpacing: '0.15em' }}>
                  What happens next?
                </p>
                <ol className="space-y-2.5">
                  {[
                    `We match you with a licensed truck accident attorney in ${stateData?.name ?? 'your state'}`,
                    'They review your case details confidentially — for free',
                    'You decide if you want to proceed. No pressure, no obligation.',
                  ].map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs" style={{ color: '#8A95A8' }}>
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black mt-0.5"
                        style={{ backgroundColor: 'rgba(212,168,75,0.12)', color: '#D4A84B', border: '1px solid rgba(212,168,75,0.25)' }}
                      >
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
                <p className="text-xs mt-4 leading-relaxed" style={{ color: '#3d5270' }}>
                  We partner with attorneys who specialize in truck accident cases. Your information is shared only with your matched attorney.{' '}
                  <a href="/privacy" className="hover:underline" style={{ color: '#4a6480' }}>See our Privacy Policy.</a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-xs leading-relaxed text-center" style={{ color: '#2d3f54' }}>
        This estimate is based on publicly available data and general legal principles. It is not legal advice.
        Results vary significantly based on case-specific facts, evidence, jurisdiction, and the skill of your attorney.
        Consult a licensed attorney for advice specific to your situation.
      </p>
    </div>
  );
}

// ── Main Wizard ────────────────────────────────────────────────────────────────

export default function CalculatorWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [results, setResults] = useState<CalcResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [leadForm, setLeadForm] = useState<LeadFormData>({ name: '', email: '', phone: '' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);

  // ── Capture UTM params on mount ──
  useEffect(() => { captureUtmParams(); }, []);

  // ── beforeunload warning: active on Step 2+ until results shown ──
  useEffect(() => {
    if (results || step < 2) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Modern browsers ignore custom messages but still show a generic dialog
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [step, results]);

  const update = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors([]);
  }, []);

  const toggleInjury = useCallback((type: string) => {
    setForm(prev => ({
      ...prev,
      injuryTypes: prev.injuryTypes.includes(type)
        ? prev.injuryTypes.filter(t => t !== type)
        : [...prev.injuryTypes, type],
    }));
    setErrors([]);
  }, []);

  const validate = (s: number): string[] => {
    const e: string[] = [];
    if (s === 1) {
      if (!form.state) e.push('Please select a state.');
      if (!form.accidentType) e.push('Please select the accident type.');
    }
    if (s === 2) {
      if (form.injuryTypes.length === 0) e.push('Please select at least one injury type.');
      if (!form.severity) e.push('Please select the injury severity.');
    }
    if (s === 3) {
      if (!form.medicalBills || parseMoney(form.medicalBills) === 0)
        e.push('Please enter your medical bills to date.');
    }
    return e;
  };

  const next = () => {
    const errs = validate(step);
    if (errs.length) { setErrors(errs); return; }
    if (step < 4) {
      setStep(s => s + 1);
      setErrors([]);
    } else {
      setResults(calculate(form));
    }
  };

  const back = () => {
    if (results) { setResults(null); return; }
    setStep(s => Math.max(1, s - 1));
    setErrors([]);
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadLoading(true);
    const utm = getStoredUtmParams();
    try {
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadForm,
          state: form.state,
          accidentType: form.accidentType,
          injuryType: form.injuryTypes.join(', '),
          severity: form.severity,
          calculatedLow: results?.low,
          calculatedHigh: results?.high,
          accidentDate: form.accidentDate,
          faultPercentage: form.faultPct,
          truckingCompany: form.truckingCompany,
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
          ...utm,
        }),
      });
      setLeadSubmitted(true);
    } finally {
      setLeadLoading(false);
    }
  };

  const sol = getSOL(form.accidentDate, form.state);

  if (results) {
    return (
      <ResultsView
        results={results} form={form} sol={sol}
        leadForm={leadForm} setLeadForm={setLeadForm}
        leadSubmitted={leadSubmitted} leadLoading={leadLoading}
        onSubmitLead={submitLead} onBack={back}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <ProgressBar step={step} />

      <div key={`step-${step}`} style={{ animation: 'fadeSlideIn 0.2s ease-out' }}>

        {/* Trust shield — Step 1 only */}
        {step === 1 && <TrustShieldBar />}

        <h2 className="text-2xl font-extrabold text-white mb-1">{STEP_TITLES[step - 1]}</h2>
        <p className="text-sm mb-7" style={{ color: '#4a5e78' }}>
          {step === 1 && 'Tell us the basics about where and how the accident happened.'}
          {step === 2 && 'Describe your injuries. Select everything that applies.'}
          {step === 3 && 'Enter your financial losses. Use your best estimate — you can always update.'}
          {step === 4 && 'Help us understand the fault situation. If unsure, leave at 0%.'}
        </p>

        {step === 1 && <Step1 form={form} update={update} />}
        {step === 2 && <Step2 form={form} update={update} toggleInjury={toggleInjury} />}
        {step === 3 && (
          <Step3
            form={form}
            update={update}
            onSkip={() => {
              // Zero out all financial fields and advance
              update('medicalBills', '0');
              update('futureMedical', '0');
              update('futureMedicalUnknown', false);
              update('lostWages', '0');
              update('futureWages', '0');
              update('propertyDamage', '0');
              setStep(4);
              setErrors([]);
            }}
          />
        )}
        {step === 4 && <Step4 form={form} update={update} />}

        {errors.length > 0 && (
          <div
            className="mt-5 p-4 rounded-lg text-sm"
            style={{
              backgroundColor: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#fca5a5',
            }}
          >
            {errors.map(err => <p key={err}>• {err}</p>)}
          </div>
        )}

        <div className="mt-8 flex gap-3">
          {step > 1 && (
            <button
              onClick={back}
              className="px-6 py-3 rounded-lg text-sm font-semibold transition-colors hover:text-white"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#8A95A8',
              }}
            >
              ← Back
            </button>
          )}
          <button
            onClick={next}
            className="cta-gold flex-1 rounded-lg font-black transition-all active:scale-[0.98]"
            style={{
              backgroundColor: '#D4A84B',
              color: '#0F1D32',
              fontSize: '17px',
              height: '56px',
            }}
          >
            {step === 4 ? 'Calculate My Settlement →' : `Next: ${STEP_TITLES[step]} →`}
          </button>
        </div>
      </div>
    </div>
  );
}
