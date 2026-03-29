import type { Metadata } from 'next';
import NavHeader from '@/components/NavHeader';

export const metadata: Metadata = {
  title: 'Terms of Service | TruckSettlementPro',
  description:
    'Terms of Service for TruckSettlementPro. Important disclaimers: not a law firm, not legal advice, no attorney-client relationship.',
};

const SECTIONS = [
  { id: 'not-legal-advice', label: 'NOT LEGAL ADVICE' },
  { id: 'no-attorney-client', label: 'No Attorney-Client Relationship' },
  { id: 'estimate-disclaimer', label: 'Estimate Disclaimer' },
  { id: 'attorney-referral', label: 'Attorney Referral Disclosure' },
  { id: 'third-party-attorneys', label: 'Third-Party Attorneys' },
  { id: 'past-results', label: 'Past Results Disclaimer' },
  { id: 'data-sources', label: 'Data Sources' },
  { id: 'limitation-of-liability', label: 'Limitation of Liability' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'attorney-advertising', label: 'Attorney Advertising Notice' },
  { id: 'user-consent', label: 'User Consent' },
];

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: '#060e1c', minHeight: '100vh', color: '#C8CADA' }}>
      <NavHeader />

      {/* ── Full-width amber warning banner ─────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-0">
        <div
          className="px-5 py-4 rounded-xl text-sm leading-relaxed"
          style={{
            backgroundColor: 'rgba(251,191,36,0.08)',
            border: '2px solid rgba(251,191,36,0.4)',
            color: '#fde68a',
          }}
        >
          <strong>⚠ IMPORTANT:</strong> TruckSettlementPro is NOT a law firm and does NOT provide
          legal advice. The settlement estimates provided by our calculator are for informational and
          educational purposes only. They do NOT constitute legal advice, legal opinion, or a
          guarantee of any outcome. Consult a licensed attorney for advice specific to your
          situation.
        </div>
      </div>

      {/* ── Page header ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-4">
        <p
          className="text-xs font-black uppercase tracking-widest mb-3"
          style={{ color: '#D4A84B', letterSpacing: '0.22em' }}
        >
          Legal
        </p>
        <h1
          className="text-4xl font-black text-white"
          style={{ letterSpacing: '-0.03em' }}
        >
          Terms of Service
        </h1>
      </div>

      {/* ── Two-column layout ───────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex gap-12 items-start">

          {/* Sidebar */}
          <aside className="hidden lg:block flex-shrink-0" style={{ width: '220px' }}>
            <div style={{ position: 'sticky', top: '88px' }}>
              <p
                className="text-xs font-black uppercase tracking-widest mb-5"
                style={{ color: '#5a7090', letterSpacing: '0.18em' }}
              >
                Contents
              </p>
              <nav className="space-y-1">
                {SECTIONS.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="block text-sm py-1.5 px-3 rounded transition-colors hover:text-white"
                    style={{ color: '#4a6480' }}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 space-y-16">

            {/* NOT LEGAL ADVICE */}
            <section id="not-legal-advice">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                NOT LEGAL ADVICE — INFORMATION ONLY
              </h2>
              <div
                className="px-5 py-4 rounded-xl text-sm leading-relaxed mb-6"
                style={{
                  backgroundColor: 'rgba(251,191,36,0.07)',
                  border: '1.5px solid rgba(251,191,36,0.35)',
                  color: '#fde68a',
                }}
              >
                <strong>⚠ This is not legal advice.</strong> Reading this website does not create
                an attorney-client relationship. Do not act on any information here without first
                consulting a licensed attorney in your state.
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                TruckSettlementPro is NOT a law firm and does NOT provide legal advice. The
                settlement estimates provided by our calculator are for informational and educational
                purposes only. They are based on general legal principles, publicly available data,
                and statistical multipliers. They do NOT constitute legal advice, legal opinion, or a
                guarantee of any outcome. Every case is unique. Actual settlement amounts depend on
                case-specific facts, evidence quality, attorney skill, jury composition, and many
                other factors that cannot be predicted by any calculator.
              </p>
            </section>

            {/* NO ATTORNEY-CLIENT RELATIONSHIP */}
            <section id="no-attorney-client">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                No Attorney-Client Relationship
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                Using this website, including the settlement calculator and any forms, does NOT
                create an attorney-client relationship between you and TruckSettlementPro, Nodal
                Logics, or any attorney. An attorney-client relationship is only formed when you
                sign a written retainer agreement directly with a licensed attorney.
              </p>
            </section>

            {/* ESTIMATE DISCLAIMER */}
            <section id="estimate-disclaimer">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Estimate Disclaimer
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                All settlement ranges displayed on this website (including on state pages, injury
                pages, and calculator results) are rough approximations derived from publicly
                available multiplier methods, FMCSA data, and general legal principles. These
                numbers should NOT be relied upon as predictions of actual case outcomes. They may
                be significantly higher or lower than actual settlements in any individual case.
              </p>
            </section>

            {/* ATTORNEY REFERRAL DISCLOSURE */}
            <section id="attorney-referral">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Attorney Referral Disclosure
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                When you submit your contact information through our consultation request form, your
                information will be shared with one or more independent licensed attorneys in your
                state who may contact you to discuss your case. TruckSettlementPro may receive
                compensation from attorneys or attorney referral services for these referrals. This
                compensation does not affect the legal services you receive. You are under no
                obligation to retain any attorney who contacts you.
              </p>
            </section>

            {/* THIRD-PARTY ATTORNEYS */}
            <section id="third-party-attorneys">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Third-Party Attorneys
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                Attorneys who may contact you through our platform are independent practitioners or
                law firms. They are not employees, agents, or partners of TruckSettlementPro or
                Nodal Logics. We do not control, supervise, or guarantee the quality of their legal
                services. We do not endorse or recommend any specific attorney.
              </p>
            </section>

            {/* PAST RESULTS DISCLAIMER */}
            <section id="past-results">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Past Results Disclaimer
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                Any settlement amounts, case results, or statistics referenced on this website
                represent past outcomes and do NOT guarantee similar results in your case. Each
                legal matter depends on its own unique facts and circumstances.
              </p>
            </section>

            {/* DATA SOURCES */}
            <section id="data-sources">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Data Sources
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                Settlement estimates and statistics on this website are derived from publicly
                available sources including the Federal Motor Carrier Safety Administration (FMCSA),
                National Highway Traffic Safety Administration (NHTSA) Fatality Analysis Reporting
                System (FARS), state civil codes, and published court records. While we strive for
                accuracy, we make no warranty that all data is current, complete, or error-free.
              </p>
            </section>

            {/* LIMITATION OF LIABILITY */}
            <section id="limitation-of-liability">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Limitation of Liability
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                To the maximum extent permitted by law, TruckSettlementPro, Nodal Logics, and their
                officers, directors, employees, and agents shall not be liable for any direct,
                indirect, incidental, consequential, or punitive damages arising from your use of
                this website, reliance on any settlement estimates, or any actions taken based on
                information provided herein.
              </p>
            </section>

            {/* GOVERNING LAW */}
            <section id="governing-law">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Governing Law
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                These Terms shall be governed by the laws of the State of Delaware, without regard
                to conflict of law principles. Any disputes arising from these Terms shall be
                resolved in the courts of the State of Delaware.
              </p>
            </section>

            {/* ATTORNEY ADVERTISING NOTICE */}
            <section id="attorney-advertising">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Attorney Advertising Notice
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                This website may be considered attorney advertising in some jurisdictions. Prior
                results do not guarantee a similar outcome.
              </p>
            </section>

            {/* USER CONSENT */}
            <section id="user-consent">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                User Consent
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                By using this website and our settlement calculator, you acknowledge that you have
                read and understood these Terms of Service, and you agree that the estimates
                provided are for informational purposes only and do not constitute legal advice.
              </p>
            </section>

            {/* Footer metadata */}
            <div
              className="pt-8 border-t text-xs space-y-1"
              style={{ borderColor: 'rgba(255,255,255,0.08)', color: '#5a7090' }}
            >
              <p>Effective Date: April 1, 2026</p>
              <p>Last Updated: March 28, 2026</p>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
