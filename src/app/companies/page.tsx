import type { Metadata } from 'next';
import Link from 'next/link';
import NavHeader from '@/components/NavHeader';

export const metadata: Metadata = {
  title: 'Trucking Company Safety Records — FMCSA Data Lookup | TruckSettlementPro',
  description:
    'Search any trucking company\'s public FMCSA safety record by name or DOT number. Learn how BASIC scores, HOS violations, and maintenance records affect your truck accident claim.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Trucking Company Safety Records — FMCSA Data Lookup',
  description:
    'Search FMCSA carrier safety data. Learn what BASIC scores, violation history, and crash records mean for your truck accident case.',
  url: 'https://trucksettlementpro.com/companies',
};

const BASIC_CATEGORIES = [
  {
    name: 'Unsafe Driving',
    icon: '⚠',
    description:
      'Tracks violations related to speeding, reckless driving, improper lane changes, and other unsafe driving behaviors observed during roadside inspections.',
    impact:
      'High scores suggest a pattern of dangerous driving. In litigation, these records support a negligence per se argument — the driver violated a specific safety regulation causing the crash.',
  },
  {
    name: 'Hours-of-Service Compliance',
    icon: '⏱',
    description:
      'Monitors violations of federal driving-time limits: the 11-hour driving limit, 14-hour on-duty window, and mandatory 30-minute rest break after 8 hours of driving.',
    impact:
      'HOS violations are among the strongest evidence of driver fatigue. A carrier with HOS Alert status has a documented history of pressuring drivers beyond safe limits.',
  },
  {
    name: 'Driver Fitness',
    icon: '📋',
    description:
      'Tracks whether drivers have valid commercial driver\'s licenses (CDLs), medical certificates, and required endorsements for the type of cargo they carry.',
    impact:
      'A carrier allowing an unfit or unlicensed driver on the road faces negligent entrustment claims on top of standard negligence liability.',
  },
  {
    name: 'Controlled Substances/Alcohol',
    icon: '🧪',
    description:
      'Records positive drug and alcohol test results, testing program violations, and instances of drivers operating under the influence of prohibited substances.',
    impact:
      'Substance violations dramatically increase punitive damage exposure. Juries respond strongly to evidence a carrier knew a driver had substance issues and kept them on the road.',
  },
  {
    name: 'Vehicle Maintenance',
    icon: '🔧',
    description:
      'Captures violations related to brake systems, tires, lighting, steering, and other safety-critical mechanical components found during roadside inspections.',
    impact:
      'Brake failures and tire blowouts are leading causes of truck accidents. Maintenance records establish whether a carrier ignored known defects.',
  },
  {
    name: 'Hazardous Materials Compliance',
    icon: '☢',
    description:
      'Applies to carriers transporting hazmat cargo. Tracks violations of placarding requirements, package integrity, emergency response documentation, and handling procedures.',
    impact:
      'For hazmat accidents, FMCSA requires carriers to carry up to $5 million in insurance — and HazMat compliance violations can trigger additional regulatory penalties.',
  },
  {
    name: 'Crash Indicator',
    icon: '💥',
    description:
      'Measures a carrier\'s crash history relative to the number of miles driven. Includes DOT-reportable crashes even when the carrier was not at fault.',
    impact:
      'A high Crash Indicator BASIC score establishes that this carrier has a pattern of involvement in serious accidents — powerful context for a jury evaluating negligence.',
  },
];

export default function CompaniesPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#060e1c', color: '#C8CADA' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <NavHeader />

      {/* ── Hero ── */}
      <section
        style={{
          background: 'linear-gradient(168deg, #060e1c 0%, #0F1D32 60%, #0a1829 100%)',
          borderBottom: '3px solid #D4A84B',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p
            className="text-xs font-black uppercase tracking-widest mb-4"
            style={{ color: '#D4A84B', letterSpacing: '0.25em' }}
          >
            Carrier Safety Data
          </p>
          <h1
            className="text-4xl sm:text-5xl font-black text-white mb-5"
            style={{ letterSpacing: '-0.02em', lineHeight: '1.12' }}
          >
            Look Up a Trucking Company&apos;s Safety Record
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#8A95A8', lineHeight: '1.75' }}>
            Search any carrier&apos;s public FMCSA data by company name or DOT number.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-16 w-full space-y-16">

        {/* ── FMCSA Search ── */}
        <section>
          <div
            className="rounded-2xl p-8"
            style={{
              backgroundColor: '#0F1D32',
              border: '2px solid rgba(212,168,75,0.25)',
            }}
          >
            <h2 className="text-xl font-black text-white mb-2" style={{ letterSpacing: '-0.01em' }}>
              Search FMCSA SAFER System
            </h2>
            <p className="text-sm mb-6" style={{ color: '#8A95A8', lineHeight: '1.75' }}>
              Enter a trucking company name or DOT number to view their publicly available safety data
              from the Federal Motor Carrier Safety Administration (FMCSA). You will be taken directly
              to the official FMCSA SAFER database.
            </p>

            {/* Form submits directly to FMCSA */}
            <form
              action="https://safer.fmcsa.dot.gov/query.asp"
              method="GET"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  name="searchstring"
                  placeholder="e.g. Werner Enterprises, Swift Transportation, or DOT# 123456"
                  required
                  style={{
                    flex: 1,
                    backgroundColor: '#0a1829',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    padding: '14px 18px',
                    fontSize: '15px',
                    color: '#C8CADA',
                    outline: 'none',
                  }}
                />
                <input type="hidden" name="query_type" value="queryCarrierSnapshot" />
                <input type="hidden" name="searchType" value="ANY" />
                <button
                  type="submit"
                  className="cta-gold flex-shrink-0 rounded-lg font-black text-sm"
                  style={{
                    backgroundColor: '#D4A84B',
                    color: '#0F1D32',
                    padding: '14px 28px',
                    minHeight: '48px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Search FMCSA SAFER →
                </button>
              </div>
            </form>

            <p className="text-xs mt-4" style={{ color: '#3d5270' }}>
              You will be redirected to{' '}
              <span style={{ color: '#5a7090' }}>safer.fmcsa.dot.gov</span>, the official federal
              carrier database. All data is public record.
            </p>
          </div>

          {/* How to find the company name */}
          <div
            className="mt-6 px-5 py-5 rounded-xl"
            style={{
              borderLeft: '4px solid #D4A84B',
              backgroundColor: 'rgba(212,168,75,0.05)',
              border: '1px solid rgba(212,168,75,0.15)',
              borderLeftWidth: '4px',
              borderLeftColor: '#D4A84B',
            }}
          >
            <p className="text-sm font-bold text-white mb-3">How to Find the Trucking Company Name</p>
            <ul className="space-y-2 text-sm" style={{ color: '#C8CADA' }}>
              {[
                'Look for the company name and DOT number on the truck\'s door panel or cab door',
                'Check the accident or police report — the responding officer records carrier information',
                'Review your insurance claim documents and the driver\'s insurance card',
                'The US DOT number (USDOT#) is required on all commercial vehicles over 10,001 lbs — it appears on the cab door',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 flex-shrink-0 text-xs font-black" style={{ color: '#D4A84B' }}>→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── BASIC Scores Explainer ── */}
        <section>
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#D4A84B', letterSpacing: '0.2em' }}>
            FMCSA Safety Methodology
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            Understanding FMCSA BASIC Safety Scores
          </h2>
          <p className="text-sm mb-10" style={{ color: '#8A95A8', lineHeight: '1.75' }}>
            FMCSA&apos;s Safety Measurement System (SMS) uses seven Behavior Analysis and Safety Improvement
            Categories (BASICs) to measure carrier safety performance. Carriers in the top 25–30% of
            their peer group in any category receive an &ldquo;Alert&rdquo; designation — a red flag
            visible on the FMCSA website.
          </p>

          <div className="space-y-4">
            {BASIC_CATEGORIES.map(({ name, icon, description, impact }) => (
              <div
                key={name}
                className="rounded-xl p-6"
                style={{
                  backgroundColor: '#0F1D32',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{icon}</span>
                  <h3 className="text-base font-black text-white">{name}</h3>
                </div>
                <p className="text-sm mb-3" style={{ color: '#C8CADA', lineHeight: '1.7' }}>
                  {description}
                </p>
                <div
                  className="px-4 py-3 rounded-lg text-xs leading-relaxed"
                  style={{
                    backgroundColor: 'rgba(212,168,75,0.05)',
                    border: '1px solid rgba(212,168,75,0.12)',
                    color: '#8A95A8',
                  }}
                >
                  <strong style={{ color: '#D4A84B' }}>In litigation: </strong>
                  {impact}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How violations help your case ── */}
        <section>
          <h2 className="text-2xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            How FMCSA Violations Strengthen Your Case
          </h2>
          <div className="space-y-4 text-sm" style={{ color: '#C8CADA', lineHeight: '1.8' }}>
            <p>
              Federal trucking regulations exist specifically to prevent accidents. When a carrier or
              driver violates those regulations and an accident results, attorneys argue a doctrine called
              <strong className="text-white"> negligence per se</strong> — meaning the violation itself
              constitutes negligence as a matter of law, without requiring expert testimony about whether
              the conduct was "unreasonable."
            </p>
            <p>
              Hours-of-Service violations are particularly powerful evidence. If the truck driver&apos;s
              ELD data shows they exceeded the 11-hour driving limit before your accident, that is direct
              evidence of legally prohibited fatigue. Combined with a carrier that has an HOS BASIC Alert
              status, you have evidence of both individual negligence and a systemic pattern of regulatory
              disregard — a fact pattern that frequently produces significantly larger settlements.
            </p>
            <p>
              Vehicle maintenance violations work similarly. If the truck involved in your accident had
              a history of brake or tire violations, and the accident was caused by brake failure or a
              tire blowout, that maintenance history creates an inference that the carrier knew about the
              defect and ignored it — opening the door to claims of gross negligence or recklessness.
            </p>

            <div
              className="px-5 py-4 rounded-xl"
              style={{
                backgroundColor: 'rgba(212,168,75,0.06)',
                border: '1px solid rgba(212,168,75,0.2)',
              }}
            >
              <p>
                <strong style={{ color: '#D4A84B' }}>Key insight: </strong>
                A carrier with BASIC scores in the Alert range (top 25–30% of unsafe carriers) faces
                materially stronger negligence claims in court. These scores are admissible evidence
                in many jurisdictions and are frequently cited in settlement negotiations to support
                higher compensation demands.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="rounded-2xl p-10 text-center"
          style={{
            background: 'linear-gradient(135deg, #0F1D32 0%, #0a1829 100%)',
            border: '2px solid rgba(212,168,75,0.3)',
          }}
        >
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#D4A84B', letterSpacing: '0.22em' }}>
            Free · No Sign-Up · 3 Minutes
          </p>
          <h2 className="text-2xl font-black text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
            Had an Accident With a Trucking Company?
          </h2>
          <p className="text-sm mb-7 max-w-lg mx-auto" style={{ color: '#8A95A8', lineHeight: '1.75' }}>
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
            Calculate My Settlement →
          </Link>
        </section>

        {/* ── Disclaimer ── */}
        <div
          className="px-5 py-4 rounded-xl text-xs leading-relaxed"
          style={{
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: '#3d5270',
          }}
        >
          <strong style={{ color: '#4a6480' }}>Disclaimer: </strong>
          This page provides general information about FMCSA safety data. TruckSettlementPro does not
          rate, rank, evaluate, or endorse individual carriers. All carrier-specific data is sourced
          directly from FMCSA at{' '}
          <a
            href="https://safer.fmcsa.dot.gov/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#5a7090', textDecoration: 'underline' }}
          >
            safer.fmcsa.dot.gov
          </a>
          . Information on this page is for educational purposes only and does not constitute legal advice.
        </div>

      </main>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: '#040b16', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
        <div className="max-w-4xl mx-auto px-6 py-8 text-xs flex flex-col sm:flex-row justify-between gap-3" style={{ color: '#2d3f54' }}>
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
