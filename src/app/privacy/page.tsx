import type { Metadata } from 'next';
import NavHeader from '@/components/NavHeader';

export const metadata: Metadata = {
  title: 'Privacy Policy | TruckSettlementPro',
  description:
    'Privacy Policy for TruckSettlementPro. Learn how we collect, use, and protect your personal information.',
};

const SECTIONS = [
  { id: 'information-collected', label: 'Information We Collect' },
  { id: 'how-we-use', label: 'How We Use Your Information' },
  { id: 'how-we-share', label: 'How We Share Your Information' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'cookies', label: 'Cookies and Tracking' },
  { id: 'data-security', label: 'Data Security' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'childrens-privacy', label: "Children's Privacy" },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact Us' },
];

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: '#060e1c', minHeight: '100vh', color: '#C8CADA' }}>
      <NavHeader />

      {/* ── Page header ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-4">
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
          Privacy Policy
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

            {/* INFORMATION WE COLLECT */}
            <section id="information-collected">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Information We Collect
              </h2>

              <div className="space-y-8">
                {/* Calculator Inputs */}
                <div>
                  <h3
                    className="text-base font-black mb-3"
                    style={{ color: '#D4A84B' }}
                  >
                    Calculator Inputs
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                    State, accident type, injury type, severity, and financial figures. This data is
                    processed entirely in your browser to generate your estimate. We do NOT store
                    your calculator inputs on our servers.
                  </p>
                </div>

                {/* Lead Form Submissions */}
                <div>
                  <h3
                    className="text-base font-black mb-3"
                    style={{ color: '#D4A84B' }}
                  >
                    Lead Form Submissions
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                    Name, email address, and phone number. This information is collected ONLY when
                    you voluntarily submit the consultation request form.
                  </p>
                </div>

                {/* Automatically Collected */}
                <div>
                  <h3
                    className="text-base font-black mb-3"
                    style={{ color: '#D4A84B' }}
                  >
                    Automatically Collected
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                    IP address, browser type, pages visited, time spent on site, and referral source
                    — collected via cookies and analytics tools when you visit our website.
                  </p>
                </div>
              </div>
            </section>

            {/* HOW WE USE YOUR INFORMATION */}
            <section id="how-we-use">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                How We Use Your Information
              </h2>
              <ul className="space-y-4 text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                <li className="flex gap-3">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#D4A84B' }}
                  />
                  <span>
                    <strong className="text-white">Calculator data</strong> is processed locally in
                    your browser and is not stored on our servers.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#D4A84B' }}
                  />
                  <span>
                    <strong className="text-white">Contact information</strong> is shared ONLY with
                    licensed attorneys in your state for the purpose of providing you a free case
                    evaluation, as described at the point of collection.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#D4A84B' }}
                  />
                  <span>
                    <strong className="text-white">Analytics data</strong> is used to improve site
                    performance and content quality. Your info is never shared for advertising purposes.
                  </span>
                </li>
              </ul>
            </section>

            {/* HOW WE SHARE YOUR INFORMATION */}
            <section id="how-we-share">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                How We Share Your Information
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                We share your contact information ONLY with independent licensed attorneys or
                attorney referral services when you explicitly request a free consultation by
                submitting our contact form. We may receive compensation for these referrals. We do
                NOT sell, rent, or share your personal information with any other third parties for
                marketing purposes.
              </p>
            </section>

            {/* YOUR RIGHTS */}
            <section id="your-rights">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Your Rights
              </h2>
              <ul className="space-y-4 text-sm leading-relaxed mb-6" style={{ color: '#C8CADA' }}>
                <li className="flex gap-3">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#D4A84B' }}
                  />
                  <span>Right to know what data we hold about you</span>
                </li>
                <li className="flex gap-3">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#D4A84B' }}
                  />
                  <span>
                    Right to request deletion — contact{' '}
                    <a
                      href="mailto:contact@us-settlement-review.com"
                      className="underline hover:text-white transition-colors"
                      style={{ color: '#D4A84B' }}
                    >
                      contact@us-settlement-review.com
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#D4A84B' }}
                  />
                  <span>Right to opt out of data sharing</span>
                </li>
                <li className="flex gap-3">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#D4A84B' }}
                  />
                  <span>
                    <strong className="text-white">California residents:</strong> You have CCPA
                    rights including the right to know, right to delete, and right to opt-out of
                    the sale of personal information.
                  </span>
                </li>
              </ul>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                To exercise any of these rights, email us at{' '}
                <a
                  href="mailto:contact@us-settlement-review.com"
                  className="underline hover:text-white transition-colors"
                  style={{ color: '#D4A84B' }}
                >
                  contact@us-settlement-review.com
                </a>
              </p>
            </section>

            {/* COOKIES AND TRACKING */}
            <section id="cookies">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Cookies and Tracking
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                We use Google Analytics to understand how visitors use our site. Google Analytics
                collects anonymized data about your visit. You can opt out by installing the Google
                Analytics Opt-out Browser Add-on or by using your browser&apos;s &quot;Do Not
                Track&quot; setting.
              </p>
            </section>

            {/* DATA SECURITY */}
            <section id="data-security">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Data Security
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                We use industry-standard SSL/TLS encryption and security measures to protect your
                personal information during transmission and storage. However, no internet
                transmission is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* DATA RETENTION */}
            <section id="data-retention">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Data Retention
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                Lead form submissions (name, email, phone) are retained for 90 days and then
                automatically deleted unless you have been connected with an attorney and an active
                engagement exists. Analytics data is retained per Google Analytics&apos; standard
                data retention policy (14 months).
              </p>
            </section>

            {/* CHILDREN'S PRIVACY */}
            <section id="childrens-privacy">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Children&apos;s Privacy
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                This website is not directed to individuals under 18 years of age. We do not
                knowingly collect personal information from minors. If you believe we have
                inadvertently collected information from a minor, please contact us immediately at{' '}
                <a
                  href="mailto:contact@us-settlement-review.com"
                  className="underline hover:text-white transition-colors"
                  style={{ color: '#D4A84B' }}
                >
                  contact@us-settlement-review.com
                </a>
                .
              </p>
            </section>

            {/* CHANGES TO THIS POLICY */}
            <section id="changes">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Changes to This Policy
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                We may update this Privacy Policy from time to time to reflect changes in our
                practices or applicable law. Changes will be posted on this page with an updated
                effective date. Continued use of the website after changes constitutes acceptance of
                the updated policy.
              </p>
            </section>

            {/* CONTACT US */}
            <section id="contact">
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Contact Us
              </h2>
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#C8CADA' }}>
                For privacy inquiries, data deletion requests, or to exercise your rights:
              </p>
              <div
                className="p-5 rounded-xl text-sm space-y-2"
                style={{
                  backgroundColor: '#0a1829',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: '#C8CADA',
                }}
              >
                <p>
                  <span style={{ color: '#8A95A8' }}>Email: </span>
                  <a
                    href="mailto:contact@us-settlement-review.com"
                    className="underline hover:text-white transition-colors"
                    style={{ color: '#D4A84B' }}
                  >
                    contact@us-settlement-review.com
                  </a>
                </p>
                <p>
                  <span style={{ color: '#8A95A8' }}>Mailing Address: </span>
                  Nodal Logics, [Address on file]
                </p>
              </div>
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
