/**
 * One-off / repeatable: reads assets/js/data.js, normalizes truck rows, writes data.js.
 * Run: node scripts/refactor-state-data.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'assets', 'js', 'data.js');

function extractStateDataObject(raw) {
    const marker = 'const stateData =';
    const mi = raw.indexOf(marker);
    if (mi === -1) throw new Error('const stateData not found');
    const braceStart = raw.indexOf('{', mi);
    let depth = 0;
    let inString = false;
    let quote = '';
    let escaped = false;
    for (let i = braceStart; i < raw.length; i++) {
        const ch = raw[i];
        if (escaped) {
            escaped = false;
            continue;
        }
        if (inString) {
            if (ch === '\\') {
                escaped = true;
                continue;
            }
            if (ch === quote) inString = false;
            continue;
        }
        if (ch === '"' || ch === "'") {
            inString = true;
            quote = ch;
            continue;
        }
        if (ch === '{') depth++;
        else if (ch === '}') {
            depth--;
            if (depth === 0) return raw.slice(braceStart, i + 1);
        }
    }
    throw new Error('Unterminated stateData object');
}

function settlementComplexity(lawType) {
    if (!lawType) return 'Moderate';
    if (lawType === 'Contributory Negligence' || lawType.includes('Slight/Gross')) return 'Critical';
    if (lawType.startsWith('Pure ') || lawType === 'Proportionate Responsibility') return 'Moderate';
    if (lawType.includes('Modified')) return 'High';
    return 'Moderate';
}

/** 50 unique carrier tactics in alphabetical state-key order (jurisdiction-neutral phrasing) */
const T50 = [
    'Aggressive liability denial emphasizing contributory fault standards',
    'Algorithm-driven settlement suppression before discovery matures',
    'Comparative-fault spreadsheets targeting speed-and-spacing narratives',
    'Modified-comparative discounting on multi-vehicle corridor losses',
    'Reserve compression anchored to fleet-average severity curves',
    'Mountain-grade and braking narratives that underweight maintenance faults',
    'Urban-density fault allocation inflating plaintiff comparative percentages',
    'Quick-close packages with broad general releases before experts engage',
    'Catastrophe-season hurry-up tenders with confidentiality riders',
    'Hub congestion tropes diluting carrier duty-to-operate arguments',
    'Port and logistics complexity as a negotiation choke point',
    'Wind-shear and rollover scripts minimizing vehicle configuration defects',
    'Interchange chaos leveraged for rapid walk-away mediation anchors',
    'Crossroads freight volume used to cap noneconomic damage bands',
    'Open-highway wind narratives targeting trailer stability and loading',
    'Short statute-of-limitations pressure compressing investigation timelines',
    'Flood and hydroplaning templates accelerating low signatures',
    'Rural two-lane visibility defenses and early denial postures',
    'High-volume corridor statistics cited against consortium-style damages',
    'Metro complexity packages favoring first-offer acceptance',
    'Winter-loss modeling that trims ice and snow severity bands',
    'Cold-snap superseding-cause framing on jackknife loss sets',
    'Gust and blow-over templates minimizing driver training gaps',
    'River-valley fog tropes splitting fault on grade curves',
    'Hydroplaning playbooks on major freight arterials',
    'Intermodal handoffs obscuring carrier operational control',
    'Freight surge statistics cited as market-rate settlement anchors',
    'High-plains wind corridors used to deny equipment maintenance faults',
    'Crossroads timing defenses on yellow-light underride sequences',
    'Heat and tire blowout scripts minimizing retread and inflation faults',
    'Freeze-thaw maintenance disclaimers on bridge decks',
    'Humidity and brake-fade attribution in coastal-adjacent corridors',
    'Structured mediation matrices emphasizing comparative fault',
    'Mountain routing complexity as a liability shield in discovery',
    'Speed-variance arguments in rear-end and merge-loss sets',
    'Narrow-highway contributory narratives on state routes',
    'Venue shopping to anchor lower statistical jurisdictions',
    'Discovery-delay tactics paired with discounted reservation anchors',
    'Wind-shear tropes on open-span and elevated bridge corridors',
    'Long-haul fatigue defenses minimizing hours-of-service angles',
    'Multilane interchange fault spreadsheets in toll-road stacks',
    'Crosswind scripts on exposed high-desert and plateau legs',
    'Proportionate-responsibility spreadsheets at independent medical exams',
    'Early mediation surge pricing coupled with policy-limit theater',
    'Blizzard templates compressing wage-loss and earnings proofs',
    'Grade-curve speed-limit defenses in rolling terrain corridors',
    'Industrial corridor releases with sweeping indemnity clauses',
    'Docket-pressure invitations before coordinated IME strategy',
    'Paper summary-judgment posture before expert designations lock in',
    'Claims analytics tagging roadside volatility as a reserve driver',
];

if (T50.length !== 50) {
    console.error('Expected 50 tactics, got', T50.length);
    process.exit(1);
}

function extractCrashNumber(s) {
    const m = String(s).match(/[\d,]+/);
    return m ? m[0] : s;
}

const CRASH_TEMPLATES = [
    (n) => `Roughly ${n} truck-involved crashes are logged statewide each year.`,
    (n) => `Each year, agencies record on the order of ${n} heavy-truck collisions.`,
    (n) => `About ${n} CMV crashes appear in annual crash extracts.`,
    (n) => `Yearly data shows ~${n} police-reported truck-related incidents.`,
    (n) => `The state tallies approximately ${n} truck-involved crashes per annum.`,
    (n) => `Expect near ${n} truck collisions annually in reporting systems.`,
    (n) => `Crash volumes hover around ${n} truck-involved events yearly.`,
    (n) => `Sustained exposure: ~${n} truck crashes tracked each calendar year.`,
    (n) => `${n} truck-involved crashes surface in the most recent annual cohorts.`,
    (n) => `Annually, figures land near ${n} heavy-commercial vehicle crashes.`,
    (n) => `Reporting systems attribute about ${n} incidents to large trucks per year.`,
    (n) => `On average, ${n} truck-involved collisions enter the statewide register yearly.`,
    (n) => `Year-in-review summaries cite ${n} CMV-involved crashes.`,
    (n) => `There are roughly ${n} truck crashes per year in published tallies.`,
    (n) => `Historical series show ~${n} annual truck-involved crash events.`,
    (n) => `The annual count approaches ${n} for truck-related collisions.`,
    (n) => `Across 12 months, analysts see near ${n} heavy-truck crashes.`,
    (n) => `Fleet-risk monitors flag ~${n} truck-involved crashes per annum.`,
    (n) => `Statewide, ${n} truck crashes typify a busy traffic year.`,
    (n) => `Collision archives list approximately ${n} truck-involved cases yearly.`,
    (n) => `Under current reporting, ${n} truck crashes recur each year.`,
    (n) => `Safety dashboards track on the order of ${n} truck collisions annually.`,
    (n) => `Yearly snapshots include ~${n} CMV crash records.`,
    (n) => `The heavy-truck slice totals near ${n} crashes per year.`,
    (n) => `Insurers model around ${n} truck-involved crashes annually.`,
    (n) => `Public datasets reference ${n} truck crashes in a typical year.`,
    (n) => `Annualized, one should plan for ~${n} truck-related collisions.`,
    (n) => `Roughly ${n} events per year involve trucks in crash filings.`,
    (n) => `The corridor load implies ~${n} truck crashes yearly.`,
    (n) => `Normalized counts land near ${n} truck-involved crashes.`,
    (n) => `Each reporting cycle adds ~${n} truck collision entries.`,
    (n) => `Statistical briefs use ${n} as the truck crash baseline.`,
    (n) => `About ${n} truck crashes are captured in annual DOT-style rolls.`,
    (n) => `Experience curves anchor on ${n} truck-involved crashes per year.`,
    (n) => `Benchmarking assumes ${n} statewide truck collisions annually.`,
    (n) => `Trend lines oscillate around ${n} truck-related crashes.`,
    (n) => `Exposure models start from ${n} truck crashes in a median year.`,
    (n) => `Field teams cite ${n} truck-involved crashes as typical volume.`,
    (n) => `Litigation dockets reflect ~${n} truck crashes yearly.`,
    (n) => `Carrier reserving often keys off ${n} annual truck collisions.`,
    (n) => `Risk maps highlight ${n} truck crashes as the yearly norm.`,
    (n) => `Underwriting decks reference ${n} truck-involved events per annum.`,
    (n) => `Telemetry rollups align with ${n} truck crashes per calendar year.`,
    (n) => `State summaries enumerate ~${n} truck collision outcomes yearly.`,
    (n) => `Analysts peg annual truck crash incidence near ${n}.`,
    (n) => `The heavy-freight footprint correlates with ${n} crashes a year.`,
    (n) => `Year-over-year files show ${n} truck-involved crash records.`,
    (n) => `Planning assumptions include ${n} truck crashes in annual stress tests.`,
    (n) => `Signal strength tracks ~${n} truck collisions per reporting year.`,
    (n) => `Portfolio stress tests assume ${n} truck crashes in the forward view.`,
];

const WEATHER_TEMPLATES = [
    (w) => `${w}: a recurring constraint on stopping distance and sight lines.`,
    (w) => `Exposure profile—${w.toLowerCase()}—drives elevated loss frequency.`,
    (w) => `Carriers routinely cite ${w.toLowerCase()} when contesting speed and spacing.`,
    (w) => `What insurers emphasize: ${w.toLowerCase()}.`,
    (w) => `Weather drag shows up as ${w.toLowerCase()}.`,
    (w) => `Underwriters anchor narratives to ${w.toLowerCase()}.`,
    (w) => `Loss teams model ${w.toLowerCase()} as a first-order hazard.`,
    (w) => `Corridor risk concentrates around ${w.toLowerCase()}.`,
    (w) => `You should expect arguments about ${w.toLowerCase()}.`,
    (w) => `Defense bundles often lead with ${w.toLowerCase()}.`,
    (w) => `Seasonal stressors include ${w.toLowerCase()}.`,
    (w) => `Operational briefings flag ${w.toLowerCase()}.`,
    (w) => `Roadway intelligence highlights ${w.toLowerCase()}.`,
    (w) => `Hazard telemetry correlates with ${w.toLowerCase()}.`,
    (w) => `Fleet safety memos stress ${w.toLowerCase()}.`,
    (w) => `Incident reviews repeatedly surface ${w.toLowerCase()}.`,
    (w) => `Plaintiffs face weather scripts around ${w.toLowerCase()}.`,
    (w) => `Mediation talking points reference ${w.toLowerCase()}.`,
    (w) => `Discovery fights often touch ${w.toLowerCase()}.`,
    (w) => `Scene reconstruction budgets ${w.toLowerCase()} as baseline.`,
    (w) => `Carrier SIU playbooks lean on ${w.toLowerCase()}.`,
    (w) => `Independent audits watch for ${w.toLowerCase()}.`,
    (w) => `Nodal maps ${w.toLowerCase()} into reserve pressure.`,
    (w) => `Jurisdiction files show ${w.toLowerCase()} as persistent noise.`,
    (w) => `Trucking counsel foreground ${w.toLowerCase()}.`,
    (w) => `Evidence preservation should assume ${w.toLowerCase()}.`,
    (w) => `Policy narratives recycle ${w.toLowerCase()}.`,
    (w) => `CAT modeling layers in ${w.toLowerCase()}.`,
    (w) => `Terminal operations see ${w.toLowerCase()} spike severity.`,
    (w) => `Cross-dock timing worsens under ${w.toLowerCase()}.`,
    (w) => `Interstate merges compound ${w.toLowerCase()}.`,
    (w) => `Mountain grades amplify ${w.toLowerCase()}.`,
    (w) => `Coastal bands add ${w.toLowerCase()}.`,
    (w) => `Urban canyons intensify ${w.toLowerCase()}.`,
    (w) => `Rural two-lanes magnify ${w.toLowerCase()}.`,
    (w) => `Night hauls worsen ${w.toLowerCase()}.`,
    (w) => `Peak freight hours overlap ${w.toLowerCase()}.`,
    (w) => `Holiday surcharges coincide with ${w.toLowerCase()}.`,
    (w) => `Construction zones intersect ${w.toLowerCase()}.`,
    (w) => `Work-zone pacing fails under ${w.toLowerCase()}.`,
    (w) => `Brake thermal fade pairs with ${w.toLowerCase()}.`,
    (w) => `Tire contact patches suffer when ${w.toLowerCase()}.`,
    (w) => `Lane departures cluster where ${w.toLowerCase()}.`,
    (w) => `Jackknife risk rises with ${w.toLowerCase()}.`,
    (w) => `Following-distance disputes invoke ${w.toLowerCase()}.`,
    (w) => `Visibility budgets collapse under ${w.toLowerCase()}.`,
    (w) => `Black-box deltas align with ${w.toLowerCase()}.`,
    (w) => `Telematics alerts spike during ${w.toLowerCase()}.`,
    (w) => `Road-weather APIs weight ${w.toLowerCase()} heavily.`,
    (w) => `Claims analytics tag ${w.toLowerCase()} as a volatility driver.`,
];

function main() {
    const raw = fs.readFileSync(dataPath, 'utf8');
    const jsonText = extractStateDataObject(raw);
    const stateData = JSON.parse(jsonText);
    const keys = Object.keys(stateData).sort();

    keys.forEach((key, idx) => {
        const row = stateData[key];
        const t = row.truck;
        if (!t) return;
        const law = t.law_type || row.auto?.law_type;
        delete t.fmcsa_code;
        delete t.min_insurance;
        t.settlement_complexity = settlementComplexity(law);
        t.carrier_tactic = T50[idx];
        const n = extractCrashNumber(t.crash_stats || '');
        t.crash_stats = CRASH_TEMPLATES[idx % CRASH_TEMPLATES.length](n);
        const w = (t.weather_factor || 'local road hazards').replace(/\.$/, '');
        t.weather_factor = WEATHER_TEMPLATES[idx % WEATHER_TEMPLATES.length](w);
    });

    const body = JSON.stringify(stateData, null, 4);
    const header = `/**
 * State registry for Nodal (auto + truck). Scales to thousands of pages by adding keys.
 *
 * How to add a new state (5k+ page roadmap):
 * 1. Append a new key (lowercase snake, e.g. "new_state") to the stateData object.
 * 2. Include both "auto" and "truck" objects; truck must have name, statute, law_type,
 *    major_highway, state_sol, crash_stats, weather_factor, settlement_complexity, carrier_tactic.
 * 3. Do NOT repeat fmcsa_code or min_insurance on truck rows—use FEDERAL_TRUCK_DEFAULTS via app.js.
 * 4. Run: node scripts/build-truck-pages.mjs
 */

`;

    const footer = `
const FEDERAL_TRUCK_DEFAULTS = Object.freeze({
    fmcsa_code: "49 CFR Parts 390-399",
    min_insurance: "$750,000"
});

globalThis.FEDERAL_TRUCK_DEFAULTS = FEDERAL_TRUCK_DEFAULTS;
globalThis.stateData = stateData;
`;

    const out = `${header}const stateData = ${body};\n${footer}`;
    fs.writeFileSync(dataPath, out, 'utf8');
    console.log('Wrote', dataPath, '—', keys.length, 'states');
}

main();
