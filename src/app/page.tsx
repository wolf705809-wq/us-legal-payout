import type { Metadata } from "next";
import Link from "next/link";
import StatsCounter from "@/components/StatsCounter";
import NavHeader from "@/components/NavHeader";

export const metadata: Metadata = {
  title: "TruckSettlementPro — Free Truck Accident Settlement Calculator",
  description:
    "See what your truck accident case is worth. Free calculator applies your state's fault laws, FMCSA data, and injury multipliers. No sign-up required.",
  openGraph: {
    title: "TruckSettlementPro — Free Truck Accident Settlement Calculator",
    description:
      "See what your truck accident case is worth. Free calculator applies your state's fault laws, FMCSA data, and injury multipliers. No sign-up required.",
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
            background: "linear-gradient(168deg, #0a1422 0%, #080f1e 45%, #132744 100%)",
            borderBottom: "3px solid #D4A84B",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Radial glow — top right gold */}
          <div
            style={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "320px",
              height: "320px",
              background: "radial-gradient(circle, rgba(212,168,75,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          {/* Radial glow — bottom left blue */}
          <div
            style={{
              position: "absolute",
              bottom: "-60px",
              left: "-60px",
              width: "240px",
              height: "240px",
              background: "radial-gradient(circle, rgba(99,140,255,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div className="max-w-5xl mx-auto px-6 py-28 md:py-32 text-center" style={{ position: "relative", zIndex: 1 }}>

            {/* Eyebrow — pill badge [8] */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(212,168,75,0.10)",
                border: "0.5px solid rgba(212,168,75,0.35)",
                color: "#E8C46A",
                fontSize: "12px",
                padding: "4px 12px",
                borderRadius: "20px",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#4ade80",
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              Free · Instant Results · No Signup
            </div>

            {/* Headline */}
            <h1
              className="text-[2.25rem] sm:text-5xl lg:text-[4rem] font-black text-white"
              style={{ letterSpacing: "-0.02em", lineHeight: "1.12" }}
            >
              The Trucking Company Has a Legal Team.{" "}
              <span style={{ color: "#D4A84B", letterSpacing: "-0.02em" }}>You Deserve the Facts.</span>
            </h1>

            {/* Gold divider [6] */}
            <div
              style={{
                width: "48px",
                height: "2px",
                background: "linear-gradient(90deg, transparent, #D4A84B, transparent)",
                margin: "16px auto",
              }}
            />

            {/* Sub-headline */}
            <p
              className="mt-7 text-lg sm:text-xl max-w-2xl mx-auto"
              style={{ color: "#8A95A8", lineHeight: "1.75" }}
            >
              Before you speak with an insurance adjuster or sign anything, see what your case is actually worth. Our calculator applies your state&apos;s fault rules, FMCSA carrier data, and injury-specific multipliers — free, no sign-up, no personal info required.
            </p>

            {/* CTA [4] — gradient border */}
            <div className="mt-12">
              <div
                style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #D4A84B, #F5D078, #D4A84B)",
                  borderRadius: "14px",
                  padding: "1.5px",
                }}
              >
                <Link
                  href="/calculator"
                  className="cta-gold inline-flex items-center text-lg font-black"
                  style={{
                    background: "linear-gradient(135deg, #B8820A, #E8B832)",
                    color: "#050d1a",
                    letterSpacing: "-0.01em",
                    padding: "18px 48px",
                    minHeight: "60px",
                    borderRadius: "13px",
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 900,
                  }}
                >
                  Calculate My Settlement →
                </Link>
              </div>
            </div>

            {/* Trust text [9] */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                color: "#4B5A72",
                fontSize: "11px",
                marginTop: "12px",
                flexWrap: "wrap",
              }}
            >
              <span>No personal info</span>
              <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#4B5A72", display: "inline-block", flexShrink: 0 }} />
              <span>Your info is never shared for advertising purposes</span>
              <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#4B5A72", display: "inline-block", flexShrink: 0 }} />
              <span>Instant results</span>
            </div>

            {/* Stat cards [5] */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
                marginTop: "28px",
              }}
            >
              {[
                { num: "500K+", label: "Crashes / yr" },
                { num: "$750K", label: "Avg insurance" },
                { num: "50", label: "States covered" },
              ].map((s) => (
                <div
                  key={s.num}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "0.5px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      color: "#E8C46A",
                      fontSize: "20px",
                      fontWeight: 900,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      color: "#4B5A72",
                      fontSize: "11px",
                      marginTop: "2px",
                    }}
                  >
                    {s.label}
                  </div>
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
          <p className="text-center text-sm max-w-2xl mx-auto px-6 pb-6" style={{ color: "#8A95A8", lineHeight: "1.75" }}>
            Every one of these numbers represents a real person navigating the hardest moment of their life. This data exists so you don&apos;t have to face it without information.
          </p>
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
              className="text-center text-sm max-w-xl mx-auto mb-8 pt-8"
              style={{ color: "#5a7090", lineHeight: "1.75", fontStyle: "italic" }}
            >
              We built this tool because we kept seeing people accept the first settlement offer — before they ever understood what they were entitled to.
            </p>

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
              <div style={{ display: "inline-block", background: "linear-gradient(135deg, #D4A84B, #F5D078, #D4A84B)", borderRadius: "14px", padding: "1.5px" }}>
                <Link
                  href="/calculator"
                  className="cta-gold inline-flex items-center px-10 text-base font-black"
                  style={{
                    background: "linear-gradient(135deg, #B8820A, #E8B832)",
                    color: "#050d1a",
                    letterSpacing: "-0.01em",
                    minHeight: "48px",
                    borderRadius: "13px",
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 900,
                  }}
                >
                  Start Free Calculation →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why We Built This ── */}
        <section style={{ backgroundColor: "#F5F3EE", borderTop: "1px solid rgba(15,29,50,0.08)" }}>
          <div className="max-w-3xl mx-auto px-6 py-20">
            <p
              className="text-center text-xs font-black tracking-widest uppercase mb-4"
              style={{ color: "#D4A84B", letterSpacing: "0.22em" }}
            >
              Our Mission
            </p>
            <h2
              className="text-3xl sm:text-4xl font-black text-center mb-10"
              style={{ color: "#0F1D32", letterSpacing: "-0.02em" }}
            >
              Why This Tool Exists
            </h2>
            <div className="space-y-5 text-sm" style={{ color: "#5a7090", lineHeight: "1.85" }}>
              <p>
                We kept seeing the same impossible situation play out for families. A devastating truck accident happens. Before victims even understand their rights, the insurance company arrives with a settlement offer representing a fraction of what the case is actually worth.
              </p>
              <p>
                Most settlement calculators online ignore state law entirely. Law firm websites just want your phone number. We built TruckSettlementPro to fill that gap — a free, independent tool that shows you real numbers based on real data, before you talk to anyone.
              </p>
              <p style={{ color: "#0F1D32", fontWeight: 600 }}>
                You deserve to make an informed decision on your own terms.
              </p>
              <p>
                We are not a law firm and we do not represent you. But we believe you have the right to know what your case is worth before someone pressures you to settle.
              </p>
            </div>
          </div>
        </section>

        {/* ── Diagonal divider: how it works → why ── */}
        <div className="divider-wrap" style={{ backgroundColor: "#F5F3EE" }}>
          <svg viewBox="0 0 1440 44" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "44px" }}>
            <path d="M0,44 L1440,0 L1440,44 Z" fill="#080f1e" />
          </svg>
        </div>

        {/* ── Why section ── */}
        <section style={{ backgroundColor: "#080f1e" }}>
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
                className="why-grid-main glass-card p-8 rounded-xl flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "0.5px solid rgba(255,255,255,0.10)",
                  borderTop: "3px solid #D4A84B",
                  borderRadius: "12px",
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
                  className="why-card glass-card p-6 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "0.5px solid rgba(255,255,255,0.10)",
                    borderTop: "3px solid rgba(212,168,75,0.35)",
                    borderRadius: "12px",
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
        <div className="divider-wrap" style={{ backgroundColor: "#080f1e" }}>
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
              Why The Insurance Company Is Fighting Harder Than You Think
            </p>
            <h2
              className="text-3xl sm:text-4xl font-black text-center mb-4"
              style={{ color: "#0F1D32", letterSpacing: "-0.02em" }}
            >
              Your Case Isn&apos;t a Simple Car Accident — and They Know It
            </h2>
            <p className="text-center max-w-xl mx-auto mb-12 text-sm" style={{ color: "#5a7090" }}>
              Commercial truck accidents involve federal regulations, multiple liable parties, and insurance policies up to 7x larger than standard auto. That&apos;s why trucking companies retain attorneys on day one — and why you need to know your number before you negotiate.
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
                style={{ backgroundColor: "#080f1e", border: "2px solid rgba(212,168,75,0.4)", boxShadow: "0 8px 32px rgba(0,0,0,0.25)", position: "relative", overflow: "hidden" }}
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
                  className="glass-card p-6 rounded-xl flex flex-col"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "0.5px solid rgba(255,255,255,0.10)",
                    borderTop: "3px solid rgba(212,168,75,0.4)",
                    borderRadius: "12px",
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
              The Insurance Adjuster Already Knows Your Number. Do You?
            </h2>
            <p className="text-lg mb-12 max-w-xl mx-auto" style={{ color: "#8A95A8", lineHeight: "1.75" }}>
              Trucking companies calculate your case value on day one of the accident. Our tool lets you run the same calculation — same data, same state laws, same injury multipliers. It takes 3 minutes. It&apos;s free. And it might change everything about how you negotiate.
            </p>
            <div style={{ display: "inline-block", background: "linear-gradient(135deg, #D4A84B, #F5D078, #D4A84B)", borderRadius: "14px", padding: "1.5px" }}>
              <Link
                href="/calculator"
                className="cta-gold inline-flex items-center px-10 md:px-12 text-lg md:text-xl font-black tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #B8820A, #E8B832)",
                  color: "#050d1a",
                  letterSpacing: "-0.01em",
                  minHeight: "56px",
                  borderRadius: "13px",
                  display: "inline-flex",
                  alignItems: "center",
                  fontWeight: 900,
                }}
              >
                Calculate My Settlement — Free
              </Link>
            </div>
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
                <p className="text-xs mb-1" style={{ color: "#3d5270" }}>
                  TruckSettlementPro
                </p>
                <p className="text-xs mb-1" style={{ color: "#3d5270" }}>
                  300 Delaware Ave, Ste 210 #209, Wilmington, DE 19801
                </p>
                <p className="text-xs mb-4" style={{ color: "#3d5270" }}>
                  +1 (302) 273-1345
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
                    { label: "About", href: "/about" },
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
              className="flex flex-col gap-4 pt-8 text-xs"
              style={{ borderTop: "1px solid rgba(255,255,255,0.04)", color: "#2d3f54" }}
            >
              <p style={{ lineHeight: "1.8" }}>
                <strong style={{ color: "#3d5270" }}>Attorney Advertising.</strong>{" "}
                This website is for informational purposes only and does not constitute legal advice.
                No attorney-client relationship is created by use of this site.
              </p>
              <p style={{ lineHeight: "1.8" }}>
                By submitting your information, you consent to be contacted by a licensed attorney in your state regarding
                your potential legal matter. You may receive calls, texts, or emails. Consent is not a condition of service.
                Message and data rates may apply. Reply STOP to opt out.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
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
                  &copy; 2026 TruckSettlementPro. Operated by Nodal Logics.
                </p>
              </div>
            </div>

          </div>
        </footer>

      </div>
    </>
  );
}
