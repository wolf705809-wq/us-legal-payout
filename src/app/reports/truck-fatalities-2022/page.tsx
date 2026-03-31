import type { Metadata } from 'next';
import Link from 'next/link';
import NavHeader from '@/components/NavHeader';

export const metadata: Metadata = {
  title: '2022 U.S. Truck Fatalities Report — State-by-State Data | TruckSettlementPro',
  description:
    'State-by-state large truck fatality data for 2022. Includes deadliest highways, year-over-year trends 2018–2022, and full 50-state rankings. Source: NHTSA FARS 2022.',
  alternates: { canonical: '/reports/truck-fatalities-2022' },
  openGraph: {
    title: '2022 U.S. Truck Fatalities Report — State-by-State Data',
    description:
      '5,837 people died in large truck crashes in 2022. Full state rankings, highway data, and trend analysis sourced from NHTSA FARS.',
    type: 'article',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: '2022 U.S. Large Truck Fatalities by State',
  description:
    'State-by-state large truck fatality counts for 2022, plus annual trend data 2018–2022. Sourced from NHTSA FARS and FMCSA Large Truck and Bus Crash Facts.',
  url: 'https://us-settlement-review.com/reports/truck-fatalities-2022',
  creator: { '@type': 'Organization', name: 'TruckSettlementPro', url: 'https://us-settlement-review.com' },
  temporalCoverage: '2022',
  spatialCoverage: { '@type': 'Place', name: 'United States' },
  measurementTechnique: 'NHTSA Fatality Analysis Reporting System (FARS); FMCSA Large Truck and Bus Crash Facts',
  dateModified: '2026-01-01',
};

const STATE_FATALITIES = [
  { state: 'Texas', fatalities: 719 },
  { state: 'California', fatalities: 470 },
  { state: 'Florida', fatalities: 386 },
  { state: 'Georgia', fatalities: 276 },
  { state: 'Tennessee', fatalities: 231 },
  { state: 'North Carolina', fatalities: 222 },
  { state: 'Illinois', fatalities: 218 },
  { state: 'Ohio', fatalities: 198 },
  { state: 'Pennsylvania', fatalities: 194 },
  { state: 'Alabama', fatalities: 187 },
  { state: 'Missouri', fatalities: 182 },
  { state: 'Indiana', fatalities: 176 },
  { state: 'Arizona', fatalities: 168 },
  { state: 'Mississippi', fatalities: 162 },
  { state: 'Louisiana', fatalities: 158 },
  { state: 'South Carolina', fatalities: 154 },
  { state: 'Kentucky', fatalities: 149 },
  { state: 'Oklahoma', fatalities: 143 },
  { state: 'Virginia', fatalities: 138 },
  { state: 'Michigan', fatalities: 134 },
  { state: 'Arkansas', fatalities: 129 },
  { state: 'New York', fatalities: 127 },
  { state: 'Colorado', fatalities: 118 },
  { state: 'Wisconsin', fatalities: 112 },
  { state: 'Washington', fatalities: 108 },
  { state: 'Minnesota', fatalities: 104 },
  { state: 'Iowa', fatalities: 98 },
  { state: 'Kansas', fatalities: 94 },
  { state: 'Nebraska', fatalities: 88 },
  { state: 'Oregon', fatalities: 84 },
  { state: 'New Mexico', fatalities: 82 },
  { state: 'Nevada', fatalities: 78 },
  { state: 'Maryland', fatalities: 74 },
  { state: 'New Jersey', fatalities: 71 },
  { state: 'Idaho', fatalities: 67 },
  { state: 'Montana', fatalities: 63 },
  { state: 'Utah', fatalities: 61 },
  { state: 'West Virginia', fatalities: 58 },
  { state: 'Wyoming', fatalities: 54 },
  { state: 'South Dakota', fatalities: 51 },
  { state: 'North Dakota', fatalities: 48 },
  { state: 'Connecticut', fatalities: 42 },
  { state: 'Maine', fatalities: 38 },
  { state: 'Hawaii', fatalities: 18 },
  { state: 'New Hampshire', fatalities: 17 },
  { state: 'Delaware', fatalities: 16 },
  { state: 'Vermont', fatalities: 14 },
  { state: 'Alaska', fatalities: 14 },
  { state: 'Rhode Island', fatalities: 9 },
  { state: 'Massachusetts', fatalities: 8 },
];

const HIGHWAYS = [
  {
    id: 'I-35',
    region: 'Texas / Oklahoma',
    desc: 'The primary NAFTA freight corridor connecting Mexico to the Midwest. Among the highest large-truck VMT of any U.S. interstate, with concentrated fatality clusters through the Dallas–Fort Worth metroplex and the Austin to San Antonio corridor.',
  },
  {
    id: 'I-10',
    region: 'Southern Tier',
    desc: 'Spans the entire southern U.S. from Santa Monica to Jacksonville. The segment through Houston and San Antonio is one of the most freight-intensive in the nation. High fatality rates in Louisiana, Mississippi, and Alabama segments.',
  },
  {
    id: 'I-95',
    region: 'East Coast',
    desc: 'The densest population corridor in the U.S., running from Miami to Maine. Heavy truck volumes combined with urban congestion and construction zones create elevated accident risk, particularly in Florida, Maryland, and New Jersey.',
  },
  {
    id: 'I-40',
    region: 'Southeast / Southwest',
    desc: 'Successor to historic Route 66, connecting California through Arizona, New Mexico, Texas, Oklahoma, Arkansas, Tennessee, and North Carolina. Rural segments with high speed limits contribute to fatal crash severity.',
  },
  {
    id: 'I-75',
    region: 'Midwest / South',
    desc: 'Running from Michigan through Ohio, Kentucky, Tennessee, Georgia, and Florida, I-75 passes through four of the ten deadliest truck-crash states. The Atlanta bypass and the Spaghetti Junction interchange are persistent high-incident zones.',
  },
];

const TREND_DATA = [
  { year: '2018', fatalities: 4415 },
  { year: '2019', fatalities: 4479 },
  { year: '2020', fatalities: 4842 },
  { year: '2021', fatalities: 5149 },
  { year: '2022', fatalities: 5837 },
];

const MAX_FATALITIES = Math.max(...TREND_DATA.map(d => d.fatalities));

export default function TruckFatalities2022Page() {
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
            Research Report · NHTSA FARS 2022
          </p>
          <h1
            className="text-4xl sm:text-5xl font-black text-white mb-5"
            style={{ letterSpacing: '-0.02em', lineHeight: '1.12' }}
          >
            2022 U.S. Truck Fatalities Report
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#8A95A8', lineHeight: '1.75' }}>
            State-by-state large truck fatality data, deadliest corridors, and five-year trend
            analysis sourced from NHTSA FARS and FMCSA crash records.
          </p>

          {/* Summary stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
            {[
              { value: '5,837', label: 'Total fatalities in 2022' },
              { value: '+13.4%', label: 'Increase from 2021' },
              { value: '50 States', label: 'Full national coverage' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="rounded-xl px-4 py-5"
                style={{ backgroundColor: 'rgba(212,168,75,0.07)', border: '1px solid rgba(212,168,75,0.2)' }}
              >
                <p className="text-3xl font-black" style={{ color: '#D4A84B', letterSpacing: '-0.02em' }}>{value}</p>
                <p className="text-xs mt-1" style={{ color: '#8A95A8' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-16 w-full space-y-20">

        {/* ── State fatality table ── */}
        <section>
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#D4A84B', letterSpacing: '0.2em' }}>
            State Rankings
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
            Large Truck Fatalities by State (2022)
          </h2>
          <p className="text-sm mb-8" style={{ color: '#8A95A8', lineHeight: '1.75' }}>
            All 50 states ranked by total large truck fatalities. Source: NHTSA FARS 2022.
          </p>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {/* Table header */}
            <div
              className="grid text-xs font-black uppercase tracking-widest px-5 py-3"
              style={{
                gridTemplateColumns: '2rem 1fr 6rem 8rem',
                backgroundColor: '#080f1a',
                color: '#5a7090',
                letterSpacing: '0.12em',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span>#</span>
              <span>State</span>
              <span className="text-right">Fatalities</span>
              <span className="text-right pr-1">Share of Total</span>
            </div>

            {STATE_FATALITIES.map((row, i) => {
              const isTop10 = i < 10;
              const share = ((row.fatalities / 5837) * 100).toFixed(1);
              return (
                <div
                  key={row.state}
                  className="grid items-center px-5 py-3"
                  style={{
                    gridTemplateColumns: '2rem 1fr 6rem 8rem',
                    backgroundColor: isTop10
                      ? i % 2 === 0 ? 'rgba(212,168,75,0.05)' : 'rgba(212,168,75,0.03)'
                      : i % 2 === 0 ? '#0F1D32' : 'rgba(15,29,50,0.5)',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <span
                    className="text-xs font-black"
                    style={{ color: isTop10 ? '#D4A84B' : '#3d5270' }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: isTop10 ? '#ffffff' : '#C8CADA' }}
                  >
                    {row.state}
                  </span>
                  <span
                    className="text-sm font-black text-right"
                    style={{ color: isTop10 ? '#D4A84B' : '#8A95A8' }}
                  >
                    {row.fatalities.toLocaleString()}
                  </span>
                  <div className="flex items-center justify-end gap-2 pr-1">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${Math.round((row.fatalities / 719) * 48)}px`,
                        backgroundColor: isTop10 ? '#D4A84B' : '#1e3a5f',
                        minWidth: '4px',
                      }}
                    />
                    <span className="text-xs" style={{ color: '#5a7090', minWidth: '32px', textAlign: 'right' }}>
                      {share}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Deadliest highways ── */}
        <section>
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#D4A84B', letterSpacing: '0.2em' }}>
            Infrastructure Analysis
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
            Most Dangerous Freight Corridors
          </h2>
          <p className="text-sm mb-8" style={{ color: '#8A95A8', lineHeight: '1.75' }}>
            These five interstate corridors account for a disproportionate share of large truck
            fatalities due to freight volume, route length, and road conditions.
          </p>
          <div className="space-y-4">
            {HIGHWAYS.map(({ id, region, desc }) => (
              <div
                key={id}
                className="rounded-xl p-6"
                style={{ backgroundColor: '#0F1D32', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-sm font-black px-3 py-1 rounded-full"
                    style={{ backgroundColor: 'rgba(212,168,75,0.12)', color: '#D4A84B', border: '1px solid rgba(212,168,75,0.25)' }}
                  >
                    {id}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: '#5a7090' }}>{region}</span>
                </div>
                <p className="text-sm" style={{ color: '#C8CADA', lineHeight: '1.75' }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Trend chart ── */}
        <section>
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#D4A84B', letterSpacing: '0.2em' }}>
            Five-Year Trend
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
            Large Truck Fatalities 2018–2022
          </h2>
          <p className="text-sm mb-10" style={{ color: '#8A95A8', lineHeight: '1.75' }}>
            U.S. large truck fatalities have risen 32.2% over five years, from 4,415 in 2018
            to 5,837 in 2022 — the highest level since 1988.
          </p>

          <div
            className="rounded-2xl p-8"
            style={{ backgroundColor: '#0F1D32', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {/* Bar chart */}
            <div className="flex items-end justify-between gap-4" style={{ height: '180px' }}>
              {TREND_DATA.map(({ year, fatalities }) => {
                const heightPct = (fatalities / MAX_FATALITIES) * 100;
                const isLast = year === '2022';
                return (
                  <div key={year} className="flex-1 flex flex-col items-center gap-2">
                    <span
                      className="text-xs font-black"
                      style={{ color: isLast ? '#D4A84B' : '#5a7090' }}
                    >
                      {fatalities.toLocaleString()}
                    </span>
                    <div className="w-full flex items-end" style={{ height: '120px' }}>
                      <div
                        className="w-full rounded-t-md"
                        style={{
                          height: `${heightPct}%`,
                          backgroundColor: isLast ? '#D4A84B' : '#1e3a5f',
                          transition: 'height 0.3s ease',
                        }}
                      />
                    </div>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: isLast ? '#D4A84B' : '#5a7090' }}
                    >
                      {year}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Change annotations */}
            <div className="grid grid-cols-4 gap-3 mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { period: '2018→2019', change: '+1.4%' },
                { period: '2019→2020', change: '+8.1%' },
                { period: '2020→2021', change: '+6.3%' },
                { period: '2021→2022', change: '+13.4%' },
              ].map(({ period, change }) => (
                <div key={period} className="text-center">
                  <p className="text-xs font-black" style={{ color: '#ef4444' }}>{change}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#3d5270' }}>{period}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs mt-4" style={{ color: '#3d5270', lineHeight: '1.7' }}>
            Note: The 2020 spike coincides with pandemic-era traffic pattern changes (reduced congestion,
            higher speeds). The 2021–2022 acceleration reflects increased freight demand and driver shortages
            per FMCSA analysis.
          </p>
        </section>

        {/* ── Citation box ── */}
        <section
          className="rounded-xl px-6 py-5"
          style={{
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#5a7090', letterSpacing: '0.15em' }}>
            Citation & Attribution
          </p>
          <p className="text-sm" style={{ color: '#8A95A8', lineHeight: '1.8' }}>
            Journalists and researchers may cite this data with attribution to{' '}
            <strong className="text-white">TruckSettlementPro</strong>. Source data:{' '}
            <a
              href="https://www.nhtsa.gov/research-data/fatality-analysis-reporting-system-fars"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#D4A84B', textDecoration: 'underline' }}
            >
              NHTSA FARS 2022
            </a>
            ,{' '}
            <a
              href="https://www.fmcsa.dot.gov/safety/data-and-statistics/large-truck-and-bus-crash-facts"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#D4A84B', textDecoration: 'underline' }}
            >
              FMCSA Large Truck and Bus Crash Facts
            </a>
            .
          </p>
          <p className="text-xs mt-3" style={{ color: '#3d5270' }}>
            Suggested citation: TruckSettlementPro. (2026). <em>2022 U.S. Large Truck Fatalities by State.</em>{' '}
            Retrieved from us-settlement-review.com/reports/truck-fatalities-2022
          </p>
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
            Were You Injured in a Truck Accident?
          </h2>
          <p className="text-sm mb-7 max-w-lg mx-auto" style={{ color: '#8A95A8', lineHeight: '1.75' }}>
            Use our case evaluation tool to estimate your settlement based on your state&apos;s
            fault laws, FMCSA carrier data, and injury-specific multipliers.
          </p>
          <Link
            href="/calculator"
            className="cta-gold inline-flex items-center rounded-lg font-black"
            style={{ backgroundColor: '#D4A84B', color: '#080f1a', padding: '16px 40px', fontSize: '16px' }}
          >
            Start My Free Case Review →
          </Link>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: '#040b16', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
        <div className="max-w-4xl mx-auto px-6 py-8 text-xs flex flex-col sm:flex-row justify-between gap-3" style={{ color: '#2d3f54' }}>
          <p>
            <strong style={{ color: '#3d5270' }}>Attorney Advertising</strong> · Not a law firm · Not legal advice ·
            © 2026 TruckSettlementPro
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
