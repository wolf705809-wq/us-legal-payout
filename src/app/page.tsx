import type { Metadata } from "next";
import Link from "next/link";
import StatsCounter from "@/components/StatsCounter";
import NavHeader from "@/components/NavHeader";

export const metadata: Metadata = {
  title: "TruckSettlementPro — Truck Accident Settlement Calculator",
  description:
    "Injured in a truck accident? Find out what your case may be worth with our free, state-specific settlement calculator — powered by FMCSA and NHTSA data.",
  openGraph: {
    title: "TruckSettlementPro — Truck Accident Settlement Calculator",
    description:
      "State-specific truck accident settlement estimates based on real crash data, state law, and carrier safety records.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "TruckSettlementPro",
  description:
    "US truck accident settlement calculator with state-specific legal data and FMCSA carrier profiles.",
  url: "https://trucksettlementpro.com",
  serviceType: "Legal Information Service",
  areaServed: { "@type": "Country", name: "United States" },
};

const STATS = [
  {
    label: "Annual Truck Crashes",
    num: 500000,
    prefix: "",
    suffix: "+",
    sub: "large truck crashes reported to FMCSA annually",
  },
  {
    label: "Fatal Crashes in 2022",
    num: 4998,
    prefix: "",
    suffix: "",
    sub: "large truck crash deaths (NHTSA FARS 2022)",
  },
  {
    label: "Annual Economic Cost",
    num: 73,
    prefix: "$",
    suffix: "B",
    sub: "in total economic losses from truck crashes per year",
  },
  {
    label: "Federal Min. Insurance",
    num: 750,
    prefix: "$",
    suffix: "K",
    sub: "FMCSA minimum carrier liability coverage per incident",
  },
];

const TRUST_ITEMS = [
  "State-specific comparative fault laws applied automatically",
  "FMCSA carrier safety records integrated",
  "Based on NHTSA FARS crash data",
  "All 50 states — no personal info required",
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Enter Your Accident Details",
    body: "Select your state, accident type, injury severity, and financial losses. Takes about 3 minutes.",
  },
  {
    step: "02",
    title: "We Apply Your State's Laws",
    body: "Our engine applies your state's comparative fault rule, damage caps, and FMCSA insurance minimums automatically.",
  },
  {
    step: "03",
    title: "Receive a Realistic Estimate",
    body: "Get a low-to-high settlement range grounded in real NHTSA crash data and public settlement records.",
  },
];

const WHY_CARDS = [
  {
    stat: "50",
    statLabel: "States",
    title: "50-State Comparative Fault Engine",
    body: "Pure comparative, 51% bar, 50% bar, or contributory negligence — every state's exact fault rule is baked into your estimate. Texas (modified 51% bar), California (pure comparative), Florida (post-HB 837 51% bar), and all 47 remaining states are individually coded. No rounding, no averaging across state lines.",
    isMain: true,
    detail: [
      "Pure comparative: 13 states — no fault percentage bars recovery",
      "Modified 51% bar: 33 states — the most common US standard",
      "Modified 50% bar: 12 states — bars recovery at exactly 50% fault",
      "Contributory negligence: 4 states — any fault bars all recovery",
    ],
  },
  {
    stat: "$750K",
    statLabel: "Min. Coverage",
    title: "FMCSA Carrier Safety Integration",
    body: "Federal minimum insurance is $750,000 — but many carriers carry $1M–$5M. Look up your carrier's BASIC safety scores, crash history, and insurance filings from federal data.",
    isMain: false,
  },
  {
    stat: "10",
    statLabel: "Injury Types",
    title: "Injury-Specific Multipliers",
    body: "TBI (7–10×), spinal cord (8–10×), amputation (8–10×), wrongful death, and 6 more injury types — each carrying distinct multipliers derived from real settlement data.",
    isMain: false,
  },
  {
    stat: "30 days",
    statLabel: "Before data expires",
    title: "Statute of Limitations Tracker",
    body: "Enter your accident date and state — we calculate your filing deadline precisely. Black box data is overwritten in 30 days. Time is always working against you.",
    isMain: false,
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="flex flex-col min-h-screen font-sans">

        {/* ── Header (client component — hamburger) ── */}
        <NavHeader />

        {/* ── Hero ── */}
        <section
          className="hero-pattern"
          style={{
            background: "linear-gradient(168deg, #0a1422 0%, #0F1D32 45%, #132744 100%)",
            borderBottom: "3px solid #D4A84B",
          }}
        >
          <div className="max-w-5xl mx-auto px-6 py-28 md:py-32 text-center">

            {/* Eyebrow */}
            <p
              className="text-xs font-black tracking-widest uppercase mb-8"
              style={{ color: "#D4A84B", letterSpacing: "0.25em" }}
            >
              Free Truck Accident Settlement Calculator
            </p>

            {/* Headline */}
            <h1
              className="text-[2.25rem] sm:text-5xl lg:text-[4rem] font-black text-white"
              style={{ letterSpacing: "-0.02em", lineHeight: "1.12" }}
            >
              Injured in a Truck Accident?
              <br />
              <span style={{ color: "#D4A84B", letterSpacing: "-0.02em" }}>Know What Your Case Is Worth.</span>
            </h1>

            {/* Sub-headline */}
            <p
              className="mt-7 text-lg sm:text-xl max-w-2xl mx-auto"
              style={{ color: "#8A95A8", lineHeight: "1.75" }}
            >
              The only calculator that applies your state&apos;s exact comparative fault
              law, FMCSA carrier data, and injury-specific multipliers — free, no sign-up.
            </p>

            {/* CTA */}
            <div className="mt-12">
              <Link
                href="/calculator"
                className="cta-gold inline-flex items-center rounded-lg text-lg font-black"
                style={{
                  backgroundColor: "#D4A84B",
                  color: "#080f1a",
                  boxShadow: "0 8px 40px rgba(212,168,75,0.4)",
                  letterSpacing: "-0.01em",
                  padding: "20px 48px",
                  minHeight: "60px",
                }}
              >
                Calculate My Settlement →
              </Link>
            </div>

            {/* Social proof — gold thin line + text */}
            <div className="mt-6 flex flex-col items-center gap-2">
              <div style={{ width: "40px", height: "1px", backgroundColor: "#D4A84B", opacity: 0.6 }} />
              <p className="text-sm" style={{ color: "#4a6480" }}>
                Trusted by <strong className="text-white">10,000+</strong> truck accident victims &middot; No personal information required
              </p>
            </div>

            {/* Trust items — glassmorphism cards */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
              {TRUST_ITEMS.map((item) => (
                <div
                  key={item}
                  className="glass-card flex items-start gap-3 px-4 py-3.5 rounded-lg"
                  style={{
                    backgroundColor: "rgba(15,29,50,0.6)",
                    border: "1px solid rgba(212,168,75,0.15)",
                  }}
                >
                  <span className="mt-0.5 font-black flex-shrink-0 text-sm" style={{ color: "#D4A84B" }}>✓</span>
                  <span className="text-sm" style={{ color: "#8A95A8", lineHeight: "1.6" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Wave divider: hero → stats ── */}
        <div className="divider-wrap" style={{ backgroundColor: "#132744" }}>
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "64px" }}>
            <path d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z" fill="#0a1829" />
          </svg>
        </div>

        {/* ── Stats ── */}
        <section style={{ backgroundColor: "#0a1829" }}>
          <StatsCounter stats={STATS} />
          <p className="text-center text-xs py-5 pb-10" style={{ color: "#2d4160" }}>
            Sources: FMCSA Large Truck and Bus Crash Facts &middot; NHTSA Fatality Analysis Reporting System (FARS) &middot; ATRI Economic Analysis
          </p>
        </section>

        {/* ── Gradient transition: stats → how it works ── */}
        <div style={{ height: "80px", background: "linear-gradient(to bottom, #0a1829 0%, #F5F3EE 100%)" }} />

        {/* ── How It Works ── */}
        <section style={{ backgroundColor: "#F5F3EE" }}>
          <div className="max-w-5xl mx-auto px-6 pb-24">

            <p
              className="text-center text-xs font-black tracking-widest uppercase mb-4"
              style={{ color: "#D4A84B", letterSpacing: "0.22em" }}
            >
              How It Works
            </p>
            <h2
              className="text-3xl sm:text-4xl font-black text-center mb-14"
              style={{ color: "#0a1829", letterSpacing: "-0.02em" }}
            >
              A Settlement Estimate in Under 3 Minutes
            </h2>

            {/* Step progress bar */}
            <div className="flex items-start justify-center mb-12">
              {HOW_IT_WORKS.map(({ step }, i) => (
                <div key={step} className="flex items-start">
                  {/* Circle + label */}
                  <div className="flex flex-col items-center gap-2" style={{ width: "90px" }}>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-black text-base flex-shrink-0"
                      style={{
                        backgroundColor: "#D4A84B",
                        color: "#080f1a",
                        boxShadow: "0 0 20px rgba(212,168,75,0.45)",
                      }}
                    >
                      {i + 1}
                    </div>
                    <span
                      className="text-xs font-bold text-center leading-tight"
                      style={{ color: "#4a5e78" }}
                    >
                      Step {i + 1}
                    </span>
                  </div>
                  {/* Connector line */}
                  {i < 2 && (
                    <div
                      style={{
                        width: "60px",
                        height: "2px",
                        backgroundColor: "rgba(212,168,75,0.3)",
                        flexShrink: 0,
                        marginTop: "23px",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HOW_IT_WORKS.map(({ step, title, body }) => (
                <div
                  key={step}
                  className="card-hover p-8 rounded-xl"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid rgba(15,29,50,0.12)",
                    borderTop: "3px solid #D4A84B",
                  }}
                >
                  <h3
                    className="text-xl font-semibold mb-4"
                    style={{ color: "#0F1D32", letterSpacing: "-0.01em" }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm" style={{ color: "#5a7090", lineHeight: "1.75" }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-14 text-center">
              <Link
                href="/calculator"
                className="cta-gold inline-flex items-center px-10 rounded-lg text-base font-black"
                style={{
                  backgroundColor: "#D4A84B",
                  color: "#080f1a",
                  letterSpacing: "-0.01em",
                  boxShadow: "0 6px 28px rgba(212,168,75,0.35)",
                  minHeight: "48px",
                }}
              >
                Start Free Calculation →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Diagonal divider: how it works → why ── */}
        <div className="divider-wrap" style={{ backgroundColor: "#F5F3EE" }}>
          <svg viewBox="0 0 1440 44" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "44px" }}>
            <path d="M0,44 L1440,0 L1440,44 Z" fill="#0F1D32" />
          </svg>
        </div>

        {/* ── Why section ── */}
        <section style={{ backgroundColor: "#0F1D32" }}>
          <div className="max-w-5xl mx-auto px-6 py-24">
            <p
              className="text-center text-xs font-black tracking-widest uppercase mb-4"
              style={{ color: "#D4A84B", letterSpacing: "0.22em" }}
            >
              Why TruckSettlementPro
            </p>
            <h2
              className="text-3xl sm:text-4xl font-black text-center text-white mb-14"
              style={{ letterSpacing: "-0.02em" }}
            >
              Most Calculators Ignore State Law.{" "}
              <span style={{ color: "#D4A84B" }}>Ours Don&apos;t.</span>
            </h2>

            <div className="why-grid">

              {/* Main card — spans all 3 rows on desktop */}
              <div
                className="why-grid-main p-8 rounded-xl flex flex-col"
                style={{
                  backgroundColor: "#0a1829",
                  border: "1px solid rgba(212,168,75,0.25)",
                  borderTop: "3px solid #D4A84B",
                }}
              >
                <div className="mb-6">
                  <p
                    className="text-7xl font-black leading-none mb-1"
                    style={{ color: "#D4A84B", letterSpacing: "-0.04em" }}
                  >
                    {WHY_CARDS[0].stat}
                  </p>
                  <p className="text-sm font-bold" style={{ color: "#8A95A8" }}>
                    {WHY_CARDS[0].statLabel}
                  </p>
                </div>
                <h3
                  className="text-xl font-black text-white mb-4"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {WHY_CARDS[0].title}
                </h3>
                <p className="text-sm mb-6" style={{ color: "#8A95A8", lineHeight: "1.75" }}>
                  {WHY_CARDS[0].body}
                </p>
                {WHY_CARDS[0].detail && (
                  <ul className="mt-auto space-y-3">
                    {WHY_CARDS[0].detail.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-3 text-sm px-4 py-3 rounded-lg"
                        style={{
                          backgroundColor: "rgba(212,168,75,0.06)",
                          border: "1px solid rgba(212,168,75,0.12)",
                          color: "#8A95A8",
                          lineHeight: "1.5",
                        }}
                      >
                        <span className="flex-shrink-0 font-black mt-0.5" style={{ color: "#D4A84B" }}>→</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Three smaller cards */}
              {WHY_CARDS.slice(1).map(({ stat, statLabel, title, body }) => (
                <div
                  key={title}
                  className="why-card p-6 rounded-xl"
                  style={{
                    backgroundColor: "#0a1829",
                    border: "1px solid rgba(212,168,75,0.12)",
                    borderTop: "3px solid rgba(212,168,75,0.35)",
                  }}
                >
                  <div className="flex items-end gap-3 mb-4">
                    <p
                      className="text-3xl font-black leading-none"
                      style={{ color: "#D4A84B", letterSpacing: "-0.03em" }}
                    >
                      {stat}
                    </p>
                    <p className="text-xs font-bold pb-1" style={{ color: "#8A95A8" }}>
                      {statLabel}
                    </p>
                  </div>
                  <h3
                    className="text-base font-black text-white mb-3"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm" style={{ color: "#8A95A8", lineHeight: "1.75" }}>
                    {body}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* ── Wave divider: why → car comparison ── */}
        <div className="divider-wrap" style={{ backgroundColor: "#0F1D32" }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
            <path d="M0,0 C360,60 1080,0 1440,45 L1440,60 L0,60 Z" fill="#F5F3EE" />
          </svg>
        </div>

        {/* ── Car vs Truck Comparison ── */}
        <section style={{ backgroundColor: "#F5F3EE" }}>
          <div className="max-w-5xl mx-auto px-6 py-20">
            <p
              className="text-center text-xs font-black tracking-widest uppercase mb-4"
              style={{ color: "#D4A84B", letterSpacing: "0.22em" }}
            >
              Why Truck Cases Are Different
            </p>
            <h2
              className="text-3xl sm:text-4xl font-black text-center mb-4"
              style={{ color: "#0F1D32", letterSpacing: "-0.02em" }}
            >
              Car Accident vs. Truck Accident
            </h2>
            <p className="text-center max-w-xl mx-auto mb-12 text-sm" style={{ color: "#5a7090" }}>
              Commercial truck cases involve layers of federal regulation, multiple liable parties,
              and insurance minimums up to 7× higher than passenger vehicle policies.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Car accident card */}
              <div
                className="rounded-2xl p-7 space-y-4"
                style={{ backgroundColor: "#ffffff", border: "2px solid #e5e7eb", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-lg"
                    style={{ backgroundColor: "#e5e7eb", color: "#6b7280" }}
                  >
                    🚗
                  </div>
                  <h3 className="font-black text-lg" style={{ color: "#374151" }}>Car Accident</h3>
                </div>
                {[
                  ["Min. Insurance", "$25,000–$50,000 state minimums"],
                  ["Liable Parties", "Driver only (typically)"],
                  ["Federal Rules", "State traffic law only"],
                  ["Data Sources", "Police report, dashcam"],
                  ["Avg. Settlement", "$15,000–$50,000 (moderate injury)"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 text-sm py-2.5" style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <span className="font-semibold" style={{ color: "#6b7280" }}>{label}</span>
                    <span className="text-right" style={{ color: "#374151" }}>{value}</span>
                  </div>
                ))}
              </div>
              {/* Truck accident card */}
              <div
                className="rounded-2xl p-7 space-y-4"
                style={{ backgroundColor: "#0F1D32", border: "2px solid rgba(212,168,75,0.4)", boxShadow: "0 8px 32px rgba(0,0,0,0.25)", position: "relative", overflow: "hidden" }}
              >
                {/* COMMERCIAL badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "#D4A84B",
                    color: "#0F1D32",
                    fontSize: "10px",
                    fontWeight: 900,
                    letterSpacing: "0.12em",
                    padding: "3px 10px",
                    borderRadius: "100px",
                  }}
                >
                  COMMERCIAL
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-lg"
                    style={{ backgroundColor: "rgba(212,168,75,0.15)", color: "#D4A84B" }}
                  >
                    🚛
                  </div>
                  <h3 className="font-black text-lg" style={{ color: "#D4A84B" }}>Truck Accident</h3>
                </div>
                {[
                  ["Min. Insurance", "$750,000–$5M (FMCSA requirement)"],
                  ["Liable Parties", "Driver + carrier + shipper + manufacturer"],
                  ["Federal Rules", "FMCSA HOS, BASIC, maintenance regs"],
                  ["Data Sources", "ELD, black box, DVIR, FMCSA records"],
                  ["Avg. Settlement", "$150,000–$1.5M+ (moderate injury)"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 text-sm py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    <span className="font-semibold" style={{ color: "#5a7090" }}>{label}</span>
                    <span className="text-right font-semibold" style={{ color: "#C8CADA" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-xs mt-8" style={{ color: "#9ca3af" }}>
              Higher minimums and multiple defendants mean truck accident victims often recover significantly more — but cases require specialized legal expertise.
            </p>
          </div>
        </section>

        {/* ── Diagonal divider: comparison → verified data ── */}
        <div className="divider-wrap" style={{ backgroundColor: "#F5F3EE" }}>
          <svg viewBox="0 0 1440 44" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "44px" }}>
            <path d="M0,0 L1440,44 L0,44 Z" fill="#060e1c" />
          </svg>
        </div>

        {/* ── Built on Verified Data ── */}
        <section style={{ backgroundColor: "#060e1c" }}>
          <div className="max-w-5xl mx-auto px-6 py-20">
            <p
              className="text-center text-xs font-black tracking-widest uppercase mb-4"
              style={{ color: "#D4A84B", letterSpacing: "0.22em" }}
            >
              Data Integrity
            </p>
            <h2
              className="text-3xl sm:text-4xl font-black text-center text-white mb-6"
              style={{ letterSpacing: "-0.02em" }}
            >
              Built on Verified Data
            </h2>
            <p className="text-center max-w-xl mx-auto mb-14 text-sm" style={{ color: "#8A95A8", lineHeight: "1.75" }}>
              Our estimates are powered by authoritative federal and state sources — not guesswork.
              Every multiplier, fault rule, and insurance figure is traceable to a public record.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
              {[
                {
                  badge: "FMCSA",
                  badgeSub: "Safety Data",
                  title: "FMCSA Large Truck Crash Facts",
                  body: "Federal Motor Carrier Safety Administration publishes annual crash statistics for large trucks, carrier BASIC safety scores, and insurance filing records. Our insurance minimums and carrier risk flags derive from this dataset.",
                  link: "Federal Motor Carrier Safety Administration",
                },
                {
                  badge: "NHTSA",
                  badgeSub: "FARS",
                  title: "NHTSA Fatality Analysis Reporting System",
                  body: "The NHTSA FARS database contains every fatal motor vehicle crash in the US since 1975. Our annual fatality figures by state and crash-type severity multipliers are calibrated against FARS 2022 data.",
                  link: "National Highway Traffic Safety Administration",
                },
                {
                  badge: "COURT",
                  badgeSub: "Public Records",
                  title: "State Court Public Records",
                  body: "Settlement ranges reflect publicly filed and reported verdicts and settlements from state court records, legal databases, and attorney-published case results — filtered specifically to commercial truck accident cases.",
                  link: "State Court Systems",
                },
              ].map(({ badge, badgeSub, title, body, link }) => (
                <div
                  key={badge}
                  className="p-6 rounded-xl flex flex-col"
                  style={{
                    backgroundColor: "#0a1829",
                    border: "1px solid rgba(212,168,75,0.15)",
                    borderTop: "3px solid rgba(212,168,75,0.4)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="px-3 py-1 rounded font-black text-xs tracking-widest"
                      style={{
                        backgroundColor: "rgba(212,168,75,0.12)",
                        border: "1px solid rgba(212,168,75,0.3)",
                        color: "#D4A84B",
                        letterSpacing: "0.15em",
                      }}
                    >
                      {badge}
                    </div>
                    <span className="text-xs font-bold" style={{ color: "#5a7090" }}>
                      {badgeSub}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white mb-3" style={{ letterSpacing: "-0.01em" }}>
                    {title}
                  </h3>
                  <p className="text-xs flex-1" style={{ color: "#8A95A8", lineHeight: "1.75" }}>
                    {body}
                  </p>
                  <p className="mt-4 text-xs" style={{ color: "#3d5270" }}>
                    Source: {link}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6 py-4 rounded-xl text-sm"
              style={{
                backgroundColor: "rgba(212,168,75,0.05)",
                border: "1px solid rgba(212,168,75,0.15)",
              }}
            >
              <span style={{ color: "#D4A84B", fontSize: "1.1rem" }}>⚖</span>
              <p style={{ color: "#8A95A8", lineHeight: "1.75" }}>
                <strong style={{ color: "#C8CADA" }}>Legal content reviewed for accuracy.</strong>{" "}
                Fault rule classifications and statute of limitations figures are reviewed against current state civil practice codes. Last updated: March 2026.
              </p>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section style={{ backgroundColor: "#060e1c", borderTop: "3px solid #D4A84B" }}>
          <div className="max-w-3xl mx-auto px-6 py-24 md:py-28 text-center">
            <p
              className="text-xs font-black tracking-widest uppercase mb-6"
              style={{ color: "#D4A84B", letterSpacing: "0.22em" }}
            >
              No Sign-Up · No Personal Info · 3 Minutes
            </p>
            <h2
              className="text-3xl sm:text-4xl font-black text-white mb-6"
              style={{ letterSpacing: "-0.02em" }}
            >
              Don&apos;t Settle for Less Than You Deserve
            </h2>
            <p className="text-lg mb-12 max-w-xl mx-auto" style={{ color: "#8A95A8", lineHeight: "1.75" }}>
              The average truck accident settlement is significantly higher than passenger vehicle crashes.
              Federal minimum insurance starts at $750,000. Know your number before you negotiate.
            </p>
            <Link
              href="/calculator"
              className="cta-gold inline-flex items-center px-10 md:px-12 rounded-lg text-lg md:text-xl font-black tracking-tight"
              style={{
                backgroundColor: "#D4A84B",
                color: "#060e1c",
                boxShadow: "0 10px 50px rgba(212,168,75,0.45)",
                letterSpacing: "-0.01em",
                minHeight: "56px",
              }}
            >
              Calculate My Settlement — Free
            </Link>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{ backgroundColor: "#040b16", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">

            {/* 3-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-12">

              {/* Col 1 — Brand */}
              <div>
                <p className="font-black text-lg mb-1" style={{ color: "#D4A84B", letterSpacing: "-0.01em" }}>
                  TruckSettlementPro
                </p>
                <p className="text-xs mb-4" style={{ color: "#3d5270" }}>
                  Operated by Nodal Logics
                </p>
                <p className="text-xs mb-4" style={{ color: "#3d5270", lineHeight: "1.8" }}>
                  Data sourced from FMCSA Large Truck and Bus Crash Facts, NHTSA Fatality Analysis Reporting
                  System (FARS), and state public court records. All estimates are based on typical case
                  parameters and publicly available data.
                </p>
                <p className="text-xs" style={{ color: "#2d3f54", lineHeight: "1.8" }}>
                  <strong style={{ color: "#3d5270" }}>Not Legal Advice.</strong> This tool provides general
                  information only and does not constitute legal advice. No attorney-client relationship is
                  formed by use of this site. Consult a licensed attorney for advice specific to your situation.
                </p>
              </div>

              {/* Col 2 — Popular States */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-5" style={{ color: "#5a7090", letterSpacing: "0.18em" }}>
                  Popular States
                </p>
                <ul className="space-y-3">
                  {[
                    { name: "Texas", slug: "texas" },
                    { name: "California", slug: "california" },
                    { name: "Florida", slug: "florida" },
                    { name: "Georgia", slug: "georgia" },
                    { name: "Illinois", slug: "illinois" },
                  ].map(({ name, slug }) => (
                    <li key={slug}>
                      <Link
                        href={`/settlements/${slug}`}
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: "#4a6480" }}
                      >
                        {name} Truck Accident Settlements →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3 — Resources */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-5" style={{ color: "#5a7090", letterSpacing: "0.18em" }}>
                  Resources
                </p>
                <ul className="space-y-3">
                  {[
                    { label: "Settlement Calculator", href: "/calculator" },
                    { label: "Truck Accident Guides", href: "/guides" },
                    { label: "Carrier Company Profiles", href: "/companies" },
                    { label: "State Fault Laws", href: "/settlements" },
                    { label: "Privacy Policy", href: "/privacy" },
                    { label: "Terms of Use", href: "/terms" },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: "#4a6480" }}
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
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-8 text-xs"
              style={{ borderTop: "1px solid rgba(255,255,255,0.04)", color: "#2d3f54" }}
            >
              <p>
                <strong style={{ color: "#3d5270" }}>Attorney Advertising</strong>
                {" · "}
                <span>Not a law firm</span>
                {" · "}
                <span>Not legal advice</span>
                {" · "}
                Prior results do not guarantee a similar outcome.
              </p>
              <p className="flex-shrink-0">
                &copy; 2026 TruckSettlementPro. All rights reserved.
              </p>
            </div>

          </div>
        </footer>

      </div>
    </>
  );
}
