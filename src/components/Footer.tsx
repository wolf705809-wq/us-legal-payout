import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#040b16', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-12 mb-12">

          {/* Col 1 — Brand */}
          <div>
            <p className="font-black text-lg mb-1" style={{ color: '#D4A84B', letterSpacing: '-0.01em' }}>
              TruckSettlementPro
            </p>
            <p className="text-xs mb-1" style={{ color: '#3d5270' }}>
              TruckSettlementPro
            </p>
            <p className="text-xs mb-1" style={{ color: '#3d5270' }}>
              300 Delaware Ave, Ste 210 #209, Wilmington, DE 19801
            </p>
            <p className="text-xs mb-4" style={{ color: '#3d5270' }}>
              +1 (302) 273-1345
            </p>
            <p className="text-xs mb-4" style={{ color: '#3d5270', lineHeight: '1.8' }}>
              Data sourced from FMCSA Large Truck and Bus Crash Facts, NHTSA Fatality Analysis Reporting
              System (FARS), and state public court records. All estimates are based on typical case
              parameters and publicly available data.
            </p>
            <p className="text-xs" style={{ color: '#2d3f54', lineHeight: '1.8' }}>
              <strong style={{ color: '#3d5270' }}>Not Legal Advice.</strong> This tool provides general
              information only and does not constitute legal advice. No attorney-client relationship is
              formed by use of this site. Consult a licensed attorney for advice specific to your situation.
            </p>
          </div>

          {/* Col 2 — Popular States */}
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-5" style={{ color: '#5a7090', letterSpacing: '0.18em' }}>
              Popular States
            </p>
            <ul className="space-y-3">
              {[
                { name: 'Texas', slug: 'texas' },
                { name: 'California', slug: 'california' },
                { name: 'Florida', slug: 'florida' },
                { name: 'Georgia', slug: 'georgia' },
                { name: 'Illinois', slug: 'illinois' },
              ].map(({ name, slug }) => (
                <li key={slug}>
                  <Link
                    href={`/settlements/${slug}`}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: '#4a6480' }}
                  >
                    {name} Truck Accident Settlements →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Resources */}
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-5" style={{ color: '#5a7090', letterSpacing: '0.18em' }}>
              Resources
            </p>
            <ul className="space-y-3">
              {[
                { label: 'About', href: '/about' },
                { label: 'Case Evaluation Tool', href: '/calculator' },
                { label: 'Truck Accident Guides', href: '/guides' },
                { label: 'Carrier Company Profiles', href: '/companies' },
                { label: 'State Fault Laws', href: '/settlements' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: '#4a6480' }}
                  >
                    {label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Legal */}
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-5" style={{ color: '#5a7090', letterSpacing: '0.18em' }}>
              Legal
            </p>
            <ul className="space-y-3">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Use', href: '/terms' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: '#4a6480' }}
                  >
                    {label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col gap-3 pt-8 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)', color: '#2d3f54' }}
        >
          <p style={{ lineHeight: '1.8' }}>
            Attorney Advertising · Not a law firm · Not legal advice · Consent is not a condition of service · Prior results do not guarantee a similar outcome.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p>By submitting, you may receive calls, texts, or emails. Reply STOP to opt out.</p>
            <p className="flex-shrink-0">&copy; 2026 TruckSettlementPro. Operated by Nodal Logics.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
