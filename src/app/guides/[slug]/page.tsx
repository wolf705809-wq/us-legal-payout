import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NavHeader from '@/components/NavHeader';
import FAQAccordion from '@/components/FAQAccordion';
import { GUIDES, getGuideBySlug } from '@/lib/guides';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: 'Not Found' };
  return {
    title: `${guide.title} | TruckSettlementPro`,
    description: guide.description,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: { title: guide.title, description: guide.description, type: 'article' },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    dateModified: '2026-03-28',
    author: { '@type': 'Organization', name: 'TruckSettlementPro' },
    publisher: { '@type': 'Organization', name: 'TruckSettlementPro', url: 'https://trucksettlementpro.com' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const relatedGuides = GUIDES.filter((g) => guide.relatedSlugs.includes(g.slug));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />

      <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#060e1c', color: '#C8CADA' }}>
        <NavHeader />

        {/* ── Hero ── */}
        <section style={{ background: 'linear-gradient(168deg, #060e1c 0%, #0F1D32 60%, #0a1829 100%)', borderBottom: '3px solid #D4A84B' }}>
          <div className="max-w-6xl mx-auto px-6 pt-12 pb-14">
            {/* Breadcrumb */}
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#D4A84B', letterSpacing: '0.2em' }}>
              <Link href="/guides" className="hover:underline">Guides</Link>
              <span style={{ color: '#3d5270', margin: '0 8px' }}>/</span>
              <span style={{ color: '#5a7090' }}>{guide.title}</span>
            </p>

            {/* Back */}
            <Link
              href="/guides"
              className="inline-flex items-center gap-1 text-sm mb-6 transition-colors hover:text-white"
              style={{ color: '#5a7090' }}
            >
              ← All Guides
            </Link>

            {/* H1 */}
            <h1
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white mb-5"
              style={{ letterSpacing: '-0.02em', lineHeight: '1.15', maxWidth: '800px' }}
            >
              {guide.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: '#5a7090' }}>
              <span>Last updated: <strong style={{ color: '#8A95A8' }}>{guide.lastUpdated}</strong></span>
              <span style={{ color: '#2d3f54' }}>·</span>
              <span>Reading time: <strong style={{ color: '#8A95A8' }}>{guide.readingTimeMin} min</strong></span>
            </div>
          </div>
        </section>

        {/* ── Two-column layout ── */}
        <div className="max-w-6xl mx-auto px-6 py-14 w-full">
          <div className="flex gap-14 items-start">

            {/* Sidebar */}
            <aside className="hidden lg:block flex-shrink-0" style={{ width: '220px' }}>
              <div style={{ position: 'sticky', top: '96px' }}>
                <p className="text-xs font-black uppercase tracking-widest mb-5" style={{ color: '#D4A84B', letterSpacing: '0.18em' }}>
                  Contents
                </p>
                <nav className="space-y-1">
                  {guide.sections.map(({ id, title }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="block text-sm py-1.5 px-3 rounded transition-colors hover:text-white"
                      style={{ color: '#4a6480' }}
                    >
                      {title}
                    </a>
                  ))}
                  <a
                    href="#faq"
                    className="block text-sm py-1.5 px-3 rounded transition-colors hover:text-white"
                    style={{ color: '#4a6480' }}
                  >
                    FAQs
                  </a>
                </nav>

                {/* Sidebar CTA */}
                <div className="mt-8 p-4 rounded-xl" style={{ backgroundColor: '#0F1D32', border: '1px solid rgba(212,168,75,0.2)' }}>
                  <p className="text-xs font-bold text-white mb-2">Estimate Your Settlement</p>
                  <p className="text-xs mb-3" style={{ color: '#8A95A8', lineHeight: '1.6' }}>
                    Apply what you learned — free calculator.
                  </p>
                  <Link
                    href="/calculator"
                    className="cta-gold block text-center text-xs font-black py-2.5 rounded-lg"
                    style={{ backgroundColor: '#D4A84B', color: '#0F1D32' }}
                  >
                    Free Calculator →
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0 space-y-14">

              {/* Sections */}
              {guide.sections.map(({ id, title, body, keyTakeaway }) => (
                <section key={id} id={id}>
                  <h2
                    className="text-2xl font-black text-white mb-5"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {title}
                  </h2>

                  {/* Body paragraphs */}
                  <div className="space-y-4">
                    {body.split('\n\n').map((para, i) => (
                      <p key={i} className="text-base leading-relaxed" style={{ color: '#C8CADA', lineHeight: '1.8' }}>
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Key Takeaway */}
                  {keyTakeaway && (
                    <div
                      className="mt-6 px-5 py-4 rounded-r-xl"
                      style={{
                        borderLeft: '4px solid #D4A84B',
                        backgroundColor: 'rgba(212,168,75,0.06)',
                      }}
                    >
                      <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#D4A84B', letterSpacing: '0.15em' }}>
                        Key Takeaway
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: '#C8CADA' }}>
                        {keyTakeaway}
                      </p>
                    </div>
                  )}
                </section>
              ))}

              {/* FAQ */}
              <section id="faq">
                <h2 className="text-2xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
                  Frequently Asked Questions
                </h2>
                <FAQAccordion faqs={guide.faqs} />
              </section>

              {/* Related Guides */}
              {relatedGuides.length > 0 && (
                <section>
                  <h2 className="text-xl font-black text-white mb-5" style={{ letterSpacing: '-0.01em' }}>
                    Related Guides
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {relatedGuides.map((g) => (
                      <Link
                        key={g.slug}
                        href={`/guides/${g.slug}`}
                        className="card-hover block rounded-xl p-5"
                        style={{
                          backgroundColor: '#0F1D32',
                          border: '1px solid rgba(212,168,75,0.15)',
                          borderTop: '3px solid rgba(212,168,75,0.4)',
                          textDecoration: 'none',
                        }}
                      >
                        <p className="text-xs mb-2" style={{ color: '#5a7090' }}>{g.readingTimeMin} min read</p>
                        <h3 className="text-sm font-bold text-white mb-2 leading-snug">{g.title}</h3>
                        <p className="text-xs" style={{ color: '#D4A84B' }}>Read Guide →</p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* CTA Box */}
              <section
                className="rounded-2xl p-8 text-center"
                style={{
                  background: 'linear-gradient(135deg, #0F1D32 0%, #0a1829 100%)',
                  border: '2px solid rgba(212,168,75,0.3)',
                }}
              >
                <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#D4A84B', letterSpacing: '0.22em' }}>
                  Free · No Sign-Up · 3 Minutes
                </p>
                <h2 className="text-2xl font-black text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
                  Ready to Estimate Your Settlement?
                </h2>
                <p className="text-sm mb-7 max-w-lg mx-auto" style={{ color: '#8A95A8', lineHeight: '1.75' }}>
                  Apply what you&apos;ve learned. Our calculator uses your state&apos;s exact fault laws,
                  FMCSA data, and injury-specific multipliers for a realistic estimate.
                </p>
                <Link
                  href="/calculator"
                  className="cta-gold inline-flex items-center rounded-lg font-black"
                  style={{ backgroundColor: '#D4A84B', color: '#080f1a', padding: '16px 40px', fontSize: '16px' }}
                >
                  Start My Free Case Review →
                </Link>
              </section>

              {/* Disclaimer */}
              <div className="text-xs leading-relaxed" style={{ color: '#3d5270' }}>
                <p>
                  <strong style={{ color: '#4a6480' }}>Attorney Advertising.</strong>{' '}
                  This guide is for informational purposes only and does not constitute legal advice. No attorney-client relationship is formed by reading this content. Consult a licensed attorney for advice specific to your situation.
                </p>
              </div>

            </main>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ backgroundColor: '#040b16', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
          <div className="max-w-6xl mx-auto px-6 py-8 text-xs flex flex-col sm:flex-row justify-between gap-3" style={{ color: '#2d3f54' }}>
            <p>
              <strong style={{ color: '#3d5270' }}>Attorney Advertising</strong> · Not a law firm · Not legal advice ·
              Past results do not guarantee similar outcomes. © 2026 TruckSettlementPro
            </p>
            <div className="flex gap-4">
              <Link href="/terms" style={{ color: '#3d5270' }} className="hover:text-white transition-colors">Terms</Link>
              <Link href="/privacy" style={{ color: '#3d5270' }} className="hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
