import type { Metadata } from 'next';
import NavHeader from '@/components/NavHeader';
import { STATE_STATISTICS } from '@/lib/state-statistics';
import CiteButton from './CiteButton';
import StateTileMap from './StateTileMap';
import TrendChart from './TrendChart';
import CausesChart from './CausesChart';
import DeadliestTable from './DeadliestTable';
import DownloadForm from './DownloadForm';

export const metadata: Metadata = {
  title: 'US Truck Accident Statistics 2024 | TruckSettlementPro',
  description:
    'Comprehensive large truck crash data for all 50 US states. Annual crashes, fatalities, injury rates, deadliest corridors, and trend analysis sourced from FMCSA MCMIS and NHTSA FARS.',
  openGraph: {
    title: 'US Truck Accident Statistics 2024',
    description:
      'State-by-state large truck crash data, fatality rates, and trend analysis — sourced from FMCSA and NHTSA.',
    url: 'https://trucksettlementpro.com/statistics',
    type: 'website',
  },
  alternates: {
    canonical: 'https://trucksettlementpro.com/statistics',
  },
};

const DATASET_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'US Truck Accident Statistics 2024',
  description:
    'Comprehensive large truck crash data for all 50 US states, sourced from FMCSA MCMIS and NHTSA FARS.',
  url: 'https://trucksettlementpro.com/statistics',
  creator: {
    '@type': 'Organization',
    name: 'TruckSettlementPro',
    url: 'https://trucksettlementpro.com',
  },
  temporalCoverage: '2018/2023',
  spatialCoverage: { '@type': 'Place', name: 'United States' },
  license: 'https://creativecommons.org/licenses/by/4.0/',
  keywords: [
    'truck accident statistics',
    'FMCSA data',
    'commercial vehicle crashes',
    'traffic fatalities',
  ],
  dateModified: '2026-03-01',
  measurementTechnique:
    'FMCSA Motor Carrier Management Information System (MCMIS); NHTSA Fatality Analysis Reporting System (FARS)',
};

const HIGHLIGHTS = [
  {
    label: 'Total Crashes (2023)',
    value: '164,347',
    change: '+5.6%',
    up: true,
    sub: 'FMCSA MCMIS 2023',
  },
  {
    label: 'Traffic Fatalities',
    value: '5,461',
    change: '+9.3%',
    up: true,
    sub: 'NHTSA FARS 2023',
  },
  {
    label: 'Truck Occupant Injuries',
    value: '83,179',
    change: '+4.2%',
    up: true,
    sub: 'FMCSA MCMIS 2023',
  },
  {
    label: 'Economic Cost (Annual)',
    value: '$73B',
    change: '+3.8%',
    up: true,
    sub: 'ATRI Economic Analysis',
  },
];

const CORRIDORS = [
  {
    highway: 'I-35',
    region: 'Texas (Dallas-San Antonio)',
    crashes: 38,
    context:
      'Highest density of FMCSA-reportable truck crashes on any interstate segment',
  },
  {
    highway: 'I-10',
    region: 'Texas / Arizona / California',
    crashes: 33,
    context: 'Critical east-west freight corridor spanning 2,460 miles',
  },
  {
    highway: 'I-40',
    region: 'New Mexico / Texas',
    crashes: 37,
    context:
      'Historic Route 66 corridor; major truck freight route to California ports',
  },
  {
    highway: 'I-75',
    region: 'Georgia / Florida',
    crashes: 29,
    context:
      'Southeastern freight artery; congestion hotspot near Atlanta metro',
  },
  {
    highway: 'I-95',
    region: 'Florida / East Coast',
    crashes: 27,
    context:
      'Highest-volume interstate on the East Coast; 1,900-mile corridor',
  },
  {
    highway: 'I-20',
    region: 'Texas / Louisiana / Mississippi',
    crashes: 25,
    context: 'Southern freight corridor connecting Texas ports to I-95',
  },
  {
    highway: 'I-80',
    region: 'Pennsylvania / Ohio',
    crashes: 24,
    context:
      'Primary northern cross-country route; significant weather-related incidents',
  },
  {
    highway: 'I-65',
    region: 'Alabama / Indiana',
    crashes: 22,
    context: 'North-south Midwest corridor; heavy auto industry freight',
  },
  {
    highway: 'I-44',
    region: 'Missouri / Oklahoma',
    crashes: 20,
    context: 'Former Route 66; connects Dallas to St. Louis',
  },
  {
    highway: 'I-30',
    region: 'Texas / Arkansas',
    crashes: 18,
    context:
      'East Texas freight link between Dallas-Fort Worth and Little Rock',
  },
];

const maxCorridorCrashes = Math.max(...CORRIDORS.map(c => c.crashes));

export default function StatisticsPage() {
  const totalStates = STATE_STATISTICS.length;

  return (
    <>
      <style>{`
        @media print {
          nav, button, .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          section { break-inside: avoid; }
          a { color: black !important; text-decoration: underline; }
          * { box-shadow: none !important; }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DATASET_JSONLD) }}
      />

      <div style={{ backgroundColor: '#0F1D32', minHeight: '100vh', color: '#C8CADA' }}>
        <NavHeader />

        {/* Hero */}
        <section
          id="hero"
          style={{
            background: 'linear-gradient(180deg, #060e1c 0%, #0F1D32 100%)',
            borderBottom: '1px solid rgba(212,168,75,0.15)',
          }}
        >
          <div
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            style={{ paddingTop: '4rem', paddingBottom: '3rem' }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-xs" style={{ color: '#5a7090' }}>
              <a href="/" style={{ color: '#5a7090', textDecoration: 'none' }} className="hover:underline">
                Home
              </a>
              <span>/</span>
              <span style={{ color: '#8A95A8' }}>Statistics</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
                  style={{
                    backgroundColor: 'rgba(212,168,75,0.1)',
                    border: '1px solid rgba(212,168,75,0.3)',
                    color: '#D4A84B',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#D4A84B',
                      display: 'inline-block',
                    }}
                  />
                  Updated March 2026 — 2023 Data
                </div>

                <h1
                  className="font-black leading-tight mb-3"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: 'white' }}
                >
                  US Truck Accident{' '}
                  <span style={{ color: '#D4A84B' }}>Statistics 2024</span>
                </h1>

                <p className="text-base leading-relaxed mb-5 max-w-2xl" style={{ color: '#8A95A8' }}>
                  State-by-state large truck crash data, fatality rates, trend analysis, and deadliest
                  corridors across all {totalStates} states — sourced from FMCSA MCMIS and NHTSA FARS.
                </p>

                <div className="flex flex-wrap gap-3">
                  <CiteButton />
                  <a
                    href="#state-map"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:opacity-80"
                    style={{
                      backgroundColor: '#D4A84B',
                      color: '#080f1a',
                    }}
                  >
                    Explore by State
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1l6 6-6 6M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Source badges */}
              <div className="flex-shrink-0 flex flex-col gap-2 sm:items-end">
                {['FMCSA MCMIS', 'NHTSA FARS', 'ATRI Research'].map(src => (
                  <div
                    key={src}
                    className="text-xs font-bold px-3 py-1.5 rounded"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#5a7090',
                    }}
                  >
                    Source: {src}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Highlights */}
        <section id="highlights" style={{ padding: '3rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: '3px', height: '20px', backgroundColor: '#D4A84B', borderRadius: '2px' }} />
              <h2 className="text-lg font-black text-white">Key Highlights</h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(212,168,75,0.1)', color: '#D4A84B' }}>
                2023 Data
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {HIGHLIGHTS.map(({ label, value, change, up, sub }) => (
                <div
                  key={label}
                  style={{
                    backgroundColor: '#0a1829',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                  }}
                >
                  <p className="text-xs font-bold mb-2" style={{ color: '#5a7090', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {label}
                  </p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-black" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'white', lineHeight: 1 }}>
                      {value}
                    </span>
                    <span
                      className="text-xs font-bold px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: up ? 'rgba(239,128,128,0.12)' : 'rgba(122,171,138,0.12)',
                        color: up ? '#ef8080' : '#7aab8a',
                      }}
                    >
                      {change} YoY
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: '#3d5270' }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* State Tile Map */}
        <section id="state-map" style={{ padding: '3rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div style={{ width: '3px', height: '20px', backgroundColor: '#D4A84B', borderRadius: '2px' }} />
                  <h2 className="text-lg font-black text-white">Crashes by State</h2>
                </div>
                <p className="text-sm ml-5" style={{ color: '#5a7090' }}>
                  Annual large truck crash volume across all 50 states. Hover a tile for details, click to view state law page.
                </p>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#0a1829',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                padding: '1.5rem',
              }}
            >
              <StateTileMap />
            </div>
          </div>
        </section>

        {/* Trend Chart */}
        <section id="trends" style={{ padding: '3rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <div style={{ width: '3px', height: '20px', backgroundColor: '#D4A84B', borderRadius: '2px' }} />
              <h2 className="text-lg font-black text-white">6-Year Crash Trend (2018-2023)</h2>
            </div>
            <p className="text-sm mb-6 ml-5" style={{ color: '#5a7090' }}>
              Annual large truck crashes and fatalities. Note the 2020 dip due to reduced miles traveled during the pandemic.
            </p>

            <div
              style={{
                backgroundColor: '#0a1829',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                padding: '1.5rem',
              }}
            >
              <TrendChart />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {[
                { label: 'Crash Peak', value: '164,347', year: '2023', note: 'Highest recorded in 6 years' },
                { label: 'Fatality Peak', value: '5,788', year: '2021', note: 'Post-pandemic spike' },
                { label: 'COVID Low', value: '117,988', year: '2020', note: 'Reduced freight activity' },
              ].map(({ label, value, year, note }) => (
                <div
                  key={label}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '10px',
                    padding: '1rem',
                  }}
                >
                  <p className="text-xs font-bold mb-1" style={{ color: '#5a7090', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                  <p className="font-black text-xl text-white">{value}</p>
                  <p className="text-xs" style={{ color: '#D4A84B' }}>{year} — {note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Crash Causes */}
        <section id="causes" style={{ padding: '3rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div style={{ width: '3px', height: '20px', backgroundColor: '#D4A84B', borderRadius: '2px' }} />
                  <h2 className="text-lg font-black text-white">Top Crash Causes</h2>
                </div>
                <p className="text-sm mb-6 ml-5" style={{ color: '#5a7090' }}>
                  Contributing factors in large truck crashes per FMCSA Large Truck Crash Causation Study.
                </p>
                <CausesChart />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div style={{ width: '3px', height: '20px', backgroundColor: '#D4A84B', borderRadius: '2px' }} />
                  <h3 className="text-lg font-black text-white">Why This Matters for Your Claim</h3>
                </div>
                <div className="space-y-4 ml-5">
                  {[
                    {
                      title: 'Brake Defects = Trucking Company Liability',
                      body: 'When brake failure causes a crash, federal regulations (49 CFR 396) hold the motor carrier responsible for vehicle maintenance — creating strong liability claims.',
                      color: '#6b8fa8',
                    },
                    {
                      title: 'Hours of Service Violations',
                      body: 'FMCSA logs are discoverable evidence. If a driver exceeded 11-hour driving limits, it significantly strengthens negligence arguments and damages.',
                      color: '#D4A84B',
                    },
                    {
                      title: 'Multi-Party Liability',
                      body: 'Truck accidents often involve the driver, motor carrier, cargo loaders, and vehicle manufacturer — each potentially liable and insured separately.',
                      color: '#7aab8a',
                    },
                  ].map(({ title, body, color }) => (
                    <div
                      key={title}
                      style={{
                        borderLeft: `3px solid ${color}`,
                        paddingLeft: '1rem',
                        paddingTop: '0.25rem',
                        paddingBottom: '0.25rem',
                      }}
                    >
                      <p className="font-bold text-sm text-white mb-1">{title}</p>
                      <p className="text-sm" style={{ color: '#8A95A8' }}>{body}</p>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-6 p-4 rounded-xl"
                  style={{ backgroundColor: 'rgba(212,168,75,0.06)', border: '1px solid rgba(212,168,75,0.2)' }}
                >
                  <p className="text-sm font-bold text-white mb-1">Free Case Evaluation</p>
                  <p className="text-sm mb-3" style={{ color: '#8A95A8' }}>
                    If you were injured in a truck accident, understanding the cause is the first step to determining liability.
                  </p>
                  <a
                    href="/calculator"
                    className="inline-flex items-center gap-2 text-sm font-black hover:opacity-80 transition-opacity"
                    style={{ color: '#D4A84B' }}
                  >
                    Estimate Your Settlement
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1l6 6-6 6M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deadliest States Table */}
        <section id="deadliest-states" style={{ padding: '3rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <div style={{ width: '3px', height: '20px', backgroundColor: '#D4A84B', borderRadius: '2px' }} />
              <h2 className="text-lg font-black text-white">15 Deadliest States for Truck Accidents</h2>
            </div>
            <p className="text-sm mb-6 ml-5" style={{ color: '#5a7090' }}>
              Ranked by total fatal crashes. Click column headers to sort. Fault law affects how settlements are calculated in each state.
            </p>

            <div
              style={{
                backgroundColor: '#0a1829',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <DeadliestTable />
            </div>

            <p className="text-xs mt-3 ml-1" style={{ color: '#3d5270' }}>
              Source: FMCSA MCMIS 2023. Fatal crashes defined as crashes involving at least one fatality within 30 days.
              Fault law classifications per state statutes as of January 2026.
            </p>
          </div>
        </section>

        {/* Deadliest Corridors */}
        <section id="corridors" style={{ padding: '3rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <div style={{ width: '3px', height: '20px', backgroundColor: '#D4A84B', borderRadius: '2px' }} />
              <h2 className="text-lg font-black text-white">Deadliest Highway Corridors</h2>
            </div>
            <p className="text-sm mb-6 ml-5" style={{ color: '#5a7090' }}>
              Fatal truck crashes per 100 million vehicle miles traveled (VMT) on major freight interstates.
            </p>

            <div className="space-y-3">
              {CORRIDORS.map(({ highway, region, crashes, context }, idx) => (
                <div
                  key={highway}
                  style={{
                    backgroundColor: '#0a1829',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    padding: '1rem 1.25rem',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="flex-shrink-0 text-xs font-black w-6 text-center"
                      style={{ color: '#3d5270', paddingTop: '2px' }}
                    >
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                        <span
                          className="font-black text-base"
                          style={{ color: '#D4A84B', fontFamily: 'monospace' }}
                        >
                          {highway}
                        </span>
                        <span className="text-sm font-bold text-white">{region}</span>
                      </div>
                      <div
                        style={{
                          height: '6px',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          borderRadius: '3px',
                          marginBottom: '0.5rem',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${(crashes / maxCorridorCrashes) * 100}%`,
                            backgroundColor: '#D4A84B',
                            borderRadius: '3px',
                            opacity: 0.7,
                          }}
                        />
                      </div>
                      <p className="text-xs" style={{ color: '#5a7090' }}>{context}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className="font-black text-lg" style={{ color: '#ef8080' }}>{crashes}</span>
                      <p className="text-xs" style={{ color: '#3d5270' }}>fatal/100M VMT</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* State by State Browse */}
        <section id="browse-states" style={{ padding: '3rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <div style={{ width: '3px', height: '20px', backgroundColor: '#D4A84B', borderRadius: '2px' }} />
              <h2 className="text-lg font-black text-white">Browse All 50 States</h2>
            </div>
            <p className="text-sm mb-6 ml-5" style={{ color: '#5a7090' }}>
              Click any state to view its specific fault rules, statute of limitations, and settlement calculator.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {[...STATE_STATISTICS]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(stat => (
                  <a
                    key={stat.stateCode}
                    href={`/settlements/${stat.slug}`}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:opacity-80 transition-opacity group"
                    style={{
                      backgroundColor: '#0a1829',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-black" style={{ color: '#D4A84B' }}>{stat.stateCode}</p>
                      <p className="text-xs truncate" style={{ color: '#8A95A8' }}>{stat.name}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="text-xs font-bold text-white">{(stat.annualCrashes / 1000).toFixed(1)}K</p>
                      <p className="text-xs" style={{ color: '#3d5270' }}>crashes</p>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section id="methodology" style={{ padding: '3rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div style={{ width: '3px', height: '20px', backgroundColor: '#D4A84B', borderRadius: '2px' }} />
                  <h2 className="text-lg font-black text-white">Data Sources & Methodology</h2>
                </div>

                <div className="space-y-4 ml-5">
                  <div>
                    <h3 className="font-bold text-sm text-white mb-1">FMCSA Motor Carrier Management Information System (MCMIS)</h3>
                    <p className="text-sm" style={{ color: '#8A95A8' }}>
                      Primary source for crash counts, fatal crashes, and injury data. Includes all crashes
                      involving large trucks (GVWR over 10,000 lbs) reported to FMCSA through state police reports.
                      Data covers calendar year 2023 (most recent published dataset).
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white mb-1">NHTSA Fatality Analysis Reporting System (FARS)</h3>
                    <p className="text-sm" style={{ color: '#8A95A8' }}>
                      Census of all motor vehicle traffic crashes that result in death of a person within 30 days.
                      Used for fatality counts and fatality rates per 100,000 population.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white mb-1">American Transportation Research Institute (ATRI)</h3>
                    <p className="text-sm" style={{ color: '#8A95A8' }}>
                      Economic cost estimates based on ATRI's Comprehensive Costs of Motor Vehicle Crashes methodology.
                      Includes medical, emergency services, legal, productivity, and property damage costs.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white mb-1">FMCSA Large Truck Crash Causation Study (LTCCS)</h3>
                    <p className="text-sm" style={{ color: '#8A95A8' }}>
                      In-depth study of 963 crashes involving large trucks. Used for crash cause percentages.
                      Note: multiple causal factors may apply to a single crash.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div
                  className="p-5 rounded-xl"
                  style={{
                    backgroundColor: '#0a1829',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <h3 className="font-black text-sm text-white mb-3">Important Definitions</h3>
                  <div className="space-y-3">
                    {[
                      { term: 'Large Truck', def: 'Commercial motor vehicle with GVWR over 10,000 lbs, including semi-trucks, box trucks, and buses' },
                      { term: 'Fatal Crash', def: 'Any crash involving at least one fatality within 30 days of the crash date' },
                      { term: 'Injury Crash', def: 'Crash resulting in at least one non-fatal injury requiring medical attention' },
                      { term: 'VMT', def: 'Vehicle Miles Traveled — used to normalize crash rates across states with different traffic volumes' },
                    ].map(({ term, def }) => (
                      <div key={term} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                        <p className="text-xs font-bold mb-0.5" style={{ color: '#D4A84B' }}>{term}</p>
                        <p className="text-xs" style={{ color: '#5a7090' }}>{def}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download CTA */}
        <section id="download" style={{ padding: '3rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'linear-gradient(135deg, #0a1829 0%, #0f2040 100%)',
                border: '1px solid rgba(212,168,75,0.2)',
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div
                    className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-4"
                    style={{
                      backgroundColor: 'rgba(212,168,75,0.1)',
                      border: '1px solid rgba(212,168,75,0.25)',
                      color: '#D4A84B',
                    }}
                  >
                    Free Download
                  </div>
                  <h2 className="text-xl font-black text-white mb-2">
                    2024 Truck Accident Data Report
                  </h2>
                  <p className="text-sm mb-0" style={{ color: '#8A95A8' }}>
                    The full dataset in PDF and CSV format — state-by-state crash data, corridor analysis,
                    fault rule guide, and settlement benchmarks. Used by attorneys and insurers nationwide.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      'All 50-state crash tables (CSV + PDF)',
                      'Corridor fatality rate rankings',
                      'State fault law quick-reference',
                      'Average settlement ranges by injury type',
                    ].map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#C8CADA' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                          <circle cx="7" cy="7" r="6" fill="rgba(212,168,75,0.15)" />
                          <path d="M4 7l2 2 4-4" stroke="#D4A84B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <DownloadForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Legal disclaimer */}
        <section id="disclaimer" style={{ padding: '2rem 0' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="rounded-xl p-5"
              style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <p className="text-xs leading-relaxed" style={{ color: '#3d5270' }}>
                <strong style={{ color: '#5a7090' }}>Data Disclaimer:</strong> Statistics on this page are derived from publicly available
                federal datasets (FMCSA MCMIS, NHTSA FARS) and research publications. State-level figures represent
                the most recent available data and may differ from final published FMCSA annual reports due to
                reporting lag and data revisions. Economic cost estimates are approximations based on ATRI methodology.
                This page is for informational purposes only and does not constitute legal advice.{' '}
                <a href="/disclaimer" style={{ color: '#4a6480', textDecoration: 'underline' }}>Full Disclaimer</a>
              </p>
            </div>
          </div>
        </section>

        {/* Footer spacing */}
        <div style={{ height: '2rem' }} />
      </div>
    </>
  );
}
