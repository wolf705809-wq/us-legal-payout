import type { Metadata } from 'next';
import Link from 'next/link';
import NavHeader from '@/components/NavHeader';

export const metadata: Metadata = {
  title: 'Truck Accident Legal Guides | TruckSettlementPro',
  description:
    'Expert legal guides to help truck accident victims understand their rights, how settlements work, FMCSA regulations, and comparative fault laws across all 50 states.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Truck Accident Legal Guides',
  description: 'Comprehensive guides on truck accident law, settlements, and FMCSA regulations.',
  url: 'https://trucksettlementpro.com/guides',
};

const GUIDES = [
  {
    slug: 'what-to-do-after-truck-accident',
    title: 'What to Do After a Truck Accident: A Step-by-Step Guide',
    description:
      'The 10 critical steps to protect your health, preserve evidence, and maximize your settlement — starting from the moment of impact.',
    readingTimeMin: 8,
    tags: ['Evidence', 'Medical', 'Legal'],
  },
  {
    slug: 'how-truck-accident-settlements-work',
    title: 'How Truck Accident Settlements Work',
    description:
      'A complete walkthrough of how damages are calculated, how negotiations work, and what factors most affect your final settlement amount.',
    readingTimeMin: 7,
    tags: ['Settlements', 'Damages', 'Negotiation'],
  },
  {
    slug: 'fmcsa-regulations-and-your-rights',
    title: 'Understanding FMCSA Regulations and Your Rights',
    description:
      'How federal trucking regulations — Hours of Service, ELD, BASIC scores — create the legal framework for your personal injury claim.',
    readingTimeMin: 6,
    tags: ['FMCSA', 'Regulations', 'Evidence'],
  },
  {
    slug: 'comparative-fault-laws-by-state',
    title: 'Comparative Fault Laws: How Your State Affects Your Settlement',
    description:
      'Pure comparative, modified 51% bar, contributory negligence — your state\'s fault rule can be the difference between a full recovery and zero.',
    readingTimeMin: 6,
    tags: ['Fault Laws', 'State Law', '50 States'],
  },
  {
    slug: 'trucking-company-liability',
    title: 'Trucking Company Liability: Who Pays for Your Injuries?',
    description:
      'Beyond the driver: how respondeat superior, negligent hiring, cargo liability, and manufacturer defects can multiply your recovery.',
    readingTimeMin: 7,
    tags: ['Liability', 'Defendants', 'Strategy'],
  },
  {
    slug: 'preserve-black-box-evidence',
    title: 'How to Preserve Black Box Evidence After a Truck Accident',
    description:
      'The ECM data that can prove your case — and why you have only days to secure it before carriers legally destroy it.',
    readingTimeMin: 6,
    tags: ['Evidence', 'ECM', 'Strategy'],
  },
  {
    slug: 'reject-insurance-first-offer',
    title: 'Why You Should Reject the Insurance Company\'s First Offer',
    description:
      'First offers are almost always lowball figures. Learn how to evaluate, counter, and negotiate for full compensation.',
    readingTimeMin: 5,
    tags: ['Negotiation', 'Insurance', 'Settlements'],
  },
  {
    slug: 'settle-without-lawyer',
    title: 'Can You Settle a Truck Accident Without a Lawyer?',
    description:
      'The honest pros and cons of self-representation — and the specific situations where hiring an attorney pays for itself many times over.',
    readingTimeMin: 7,
    tags: ['Legal', 'Strategy', 'Settlements'],
  },
  {
    slug: 'how-trucking-companies-hide-liability',
    title: 'How Trucking Companies Hide Liability After Accidents',
    description:
      'The tactics carriers use to minimize payouts — and how experienced attorneys counter each one to protect your claim.',
    readingTimeMin: 6,
    tags: ['Liability', 'Strategy', 'Evidence'],
  },
  {
    slug: 'fmcsa-violations-settlement',
    title: 'How FMCSA Violations Increase Your Settlement Value',
    description:
      'Regulatory violations transform ordinary negligence claims into multi-defendant cases with punitive damage exposure.',
    readingTimeMin: 6,
    tags: ['FMCSA', 'Damages', 'Negligence'],
  },
  {
    slug: 'how-long-truck-cases-take',
    title: 'How Long Does a Truck Accident Case Take to Settle?',
    description:
      'A realistic timeline from accident to settlement — and the factors that accelerate or delay your case.',
    readingTimeMin: 5,
    tags: ['Timeline', 'Settlements', 'Legal'],
  },
  {
    slug: 'jackknife-accident-claims',
    title: 'Jackknife Accident Claims: Causes, Liability, and Settlements',
    description:
      'Why jackknife crashes produce some of the largest truck accident verdicts — and how to build a strong claim.',
    readingTimeMin: 7,
    tags: ['Jackknife', 'Liability', 'Damages'],
  },
  {
    slug: 'document-injuries-compensation',
    title: 'How to Document Your Injuries for Maximum Compensation',
    description:
      'The medical records, photos, and documentation that separate a $50,000 settlement from a $500,000 one.',
    readingTimeMin: 6,
    tags: ['Medical', 'Evidence', 'Damages'],
  },
  {
    slug: 'what-to-say-insurance-adjusters',
    title: 'What to Say (and Never Say) to Insurance Adjusters',
    description:
      'Adjusters are trained negotiators working against your interests. Know exactly how to protect your claim in every conversation.',
    readingTimeMin: 6,
    tags: ['Insurance', 'Negotiation', 'Strategy'],
  },
  {
    slug: 'underride-accidents-legal-complexity',
    title: 'Underride Accidents: The Legal Complexity and How to Win',
    description:
      'Underride crashes involve multiple defendants, federal equipment standards, and catastrophic injuries — here\'s how claims work.',
    readingTimeMin: 8,
    tags: ['Underride', 'Liability', 'Damages'],
  },
  {
    slug: 'fault-multi-vehicle-truck-accidents',
    title: 'Determining Fault in Multi-Vehicle Truck Accidents',
    description:
      'When multiple drivers, carriers, and vehicles are involved, fault allocation directly determines your recovery.',
    readingTimeMin: 6,
    tags: ['Fault Laws', 'Liability', 'Multi-Vehicle'],
  },
  {
    slug: 'sue-trucking-company-directly',
    title: 'Can You Sue the Trucking Company Directly?',
    description:
      'Yes — and in most cases you should. The legal theories that make carriers directly liable for driver negligence and corporate misconduct.',
    readingTimeMin: 6,
    tags: ['Liability', 'Legal', 'Strategy'],
  },
  {
    slug: 'pre-existing-conditions-claim',
    title: 'Pre-Existing Conditions and Your Truck Accident Claim',
    description:
      'Insurers weaponize your medical history. Learn how the eggshell plaintiff doctrine and aggravation theory protect your full recovery.',
    readingTimeMin: 6,
    tags: ['Medical', 'Damages', 'Legal'],
  },
  {
    slug: 'fair-settlement-herniated-disc',
    title: 'What Is a Fair Settlement for a Herniated Disc From a Truck Accident?',
    description:
      'Herniated disc settlements range from $75,000 to over $1 million. Understand the variables that determine where your case falls.',
    readingTimeMin: 7,
    tags: ['Injuries', 'Settlements', 'Damages'],
  },
  {
    slug: 'truck-driver-prior-violations',
    title: 'How a Truck Driver\'s Prior Violations Affect Your Case',
    description:
      'A driver\'s history of HOS violations, suspensions, or prior crashes can open the door to punitive damages and negligent hiring claims.',
    readingTimeMin: 6,
    tags: ['FMCSA', 'Negligence', 'Damages'],
  },
];

export default function GuidesPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#0a1422' }}>
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
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <p
            className="text-xs font-black uppercase tracking-widest mb-4"
            style={{ color: '#D4A84B', letterSpacing: '0.25em' }}
          >
            Legal Resources
          </p>
          <h1
            className="text-4xl sm:text-5xl font-black text-white mb-5"
            style={{ letterSpacing: '-0.02em', lineHeight: '1.12' }}
          >
            Truck Accident Legal Guides
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#8A95A8', lineHeight: '1.75' }}>
            Expert resources to help you understand your rights, navigate the legal process,
            and maximize your truck accident settlement.
          </p>
        </div>
      </section>

      {/* ── Guides grid ── */}
      <main className="max-w-5xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDES.map((guide, i) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="card-hover flex flex-col rounded-xl p-6"
              style={{
                backgroundColor: '#0F1D32',
                border: '1px solid rgba(212,168,75,0.15)',
                borderTop: '3px solid #D4A84B',
                textDecoration: 'none',
              }}
            >
              {/* Guide number */}
              <p
                className="text-xs font-black mb-4"
                style={{ color: 'rgba(212,168,75,0.4)', letterSpacing: '0.1em' }}
              >
                GUIDE {String(i + 1).padStart(2, '0')}
              </p>

              {/* Title */}
              <h2
                className="text-base font-bold text-white mb-3 leading-snug flex-1"
                style={{ letterSpacing: '-0.01em' }}
              >
                {guide.title}
              </h2>

              {/* Description */}
              <p className="text-sm mb-5" style={{ color: '#8A95A8', lineHeight: '1.65' }}>
                {guide.description}
              </p>

              {/* Tags + read time */}
              <div className="flex items-center justify-between gap-2 mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {guide.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: 'rgba(212,168,75,0.08)',
                        border: '1px solid rgba(212,168,75,0.2)',
                        color: '#D4A84B',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs flex-shrink-0" style={{ color: '#5a7090' }}>
                  {guide.readingTimeMin} min read
                </span>
              </div>

              {/* CTA */}
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold" style={{ color: '#D4A84B' }}>
                Read Guide
                <span style={{ transition: 'transform 0.2s ease' }}>→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className="mt-20 rounded-2xl p-10 text-center"
          style={{
            background: 'linear-gradient(135deg, #0F1D32 0%, #0a1829 100%)',
            border: '2px solid rgba(212,168,75,0.3)',
          }}
        >
          <p
            className="text-xs font-black uppercase tracking-widest mb-3"
            style={{ color: '#D4A84B', letterSpacing: '0.22em' }}
          >
            Free · No Sign-Up · 3 Minutes
          </p>
          <h2
            className="text-2xl sm:text-3xl font-black text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            Ready to Estimate Your Settlement?
          </h2>
          <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: '#8A95A8', lineHeight: '1.75' }}>
            Apply everything you&apos;ve learned. Our calculator uses your state&apos;s exact fault
            laws, FMCSA data, and injury-specific multipliers to give you a realistic range.
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
            Start My Free Case Review →
          </Link>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: '#040b16', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-5xl mx-auto px-6 py-8 text-xs flex flex-col sm:flex-row justify-between gap-3" style={{ color: '#2d3f54' }}>
          <p>
            <strong style={{ color: '#3d5270' }}>Attorney Advertising</strong> · Not a law firm · Not legal advice ·
            Past results do not guarantee similar outcomes.
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
