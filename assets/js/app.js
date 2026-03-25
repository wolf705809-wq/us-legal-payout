const TRUCK_UI_TEMPLATE = {
    hero_headline: '<STATE> 18-Wheeler Statutory Audit',
    hero_subheadline:
        'When a commercial carrier is involved, every hour matters. Our FMCSA-aligned audit engine identifies liability signals, policy leverage, and evidence-preservation priorities before critical data disappears.',
    cta_label: 'EXECUTE STATUTORY CASE AUDIT',
    value_stack: [
        'FMCSA Compliance Mapping (49 CFR Parts 390-399)',
        'Carrier & Policy Layer Intelligence',
        'ELD / Telematics Preservation Workflow',
        'State-Specific SOL and Highway Risk Factors',
    ],
    trust_strip: 'FMCSR COMPLIANT | CERTIFIED DATA SOURCE | STATUTORY AUDIT v2.1 | ENCRYPTION SECURE',
    conversion_block:
        'Insurance carriers defend truck claims with specialized teams and rapid evidence controls. Nodal gives you a structured federal-state analysis layer so your case starts with documented leverage, not guesswork.',
    legal_safe_line:
        'Nodal is a legal-technology infrastructure provider, not a law firm. All outputs are statutory data estimates for evaluation support.',
    qualifying_questions: [
        {
            id: 'carrier_usdot',
            prompt: 'Do you know the trucking company (carrier) and USDOT number?',
            value_reason:
                'Carrier and USDOT identification accelerates policy trace and liability mapping, increasing lead monetization quality.',
        },
        {
            id: 'eld_preservation',
            prompt: 'Should we prioritize ELD, dashcam, and telematics preservation before data overwrite?',
            value_reason:
                'Early preservation requests secure high-impact evidence, materially increasing expected settlement posture.',
        },
        {
            id: 'commercial_policy_layer',
            prompt: 'Was this a tractor-trailer, hazmat unit, or multi-trailer commercial load?',
            value_reason:
                'Commercial class determines policy layer depth and often correlates with higher recovery ceilings.',
        },
    ],
};

const INSIGHT_CONTENT = {
    trap: {
        title: 'Why Insurance Adjusters Fear Statutory Data.',
        body: 'Adjusters perform best when claimants do not anchor demands to enforceable statutes and precedent-backed liability structures. Statutory data creates a verifiable baseline that compresses negotiation spread and exposes lowball reserve strategy.',
    },
    gold: {
        title: 'The $750,000 Minimum: Federal Trucking Policy Limits.',
        body: 'Federal motor carrier frameworks often place meaningful policy floors in play. Understanding these limits changes valuation posture immediately by reframing what is collectible, what is provable, and what leverage is realistic before litigation spend accelerates.',
    },
    system: {
        title: 'Man vs Machine: How AI Detects Settlement Gaps.',
        body: 'Nodal compares narrative facts, injury signals, and jurisdictional doctrine against historical outcomes to detect valuation deltas. The model highlights where carrier offers diverge from statistically supportable ranges so users can negotiate from evidence, not guesswork.',
    },
};

const LOCAL_LEADS_KEY = 'caseAuditLocalLeads.v1';

let currentScore = 10;
let currentState = 'california';
let leadFormData = {};
let turnstileVerified = false;
let turnstileToken = '';
let stateSyncTimer = null;
let isStateSyncRunning = false;
let activeStep = 'step-1';
let stepHistory = [];
let caseMode = 'auto';
let truckTemplate = TRUCK_UI_TEMPLATE;
let hasShownFederalModalScan = false;
const FORM_PROGRESS_KEY = 'caseAuditProgress.v2';
const TOTAL_AUDIT_STEPS = 9;
const STEP_TIPS = {
    'step-1': 'Value Driver Tip: Precise classification improves routing for premium cases.',
    'step-2': 'Value Driver Tip: Jurisdiction confirmation anchors the statutory floor and doctrine weighting.',
    'step-3': 'Value Driver Tip: ER visits and surgery recommendations correlate with higher recovery ceilings.',
    'step-4': 'Value Driver Tip: Carrier identity accelerates policy layer tracing and FMCSA safety pulls.',
    'step-5': 'Value Driver Tip: SOL compliance protects leverage—timing is a valuation constraint.',
    'step-6': 'Value Driver Tip: 0% fault signals strengthen liability posture under comparative analysis.',
    'step-7': 'Value Driver Tip: Representation status controls eligibility for this automated audit pathway.',
    'step-8': 'Value Driver Tip: Specific impact + treatment facts increase model confidence.',
    'step-9': 'Value Driver Tip: Verification enables secure report generation and rapid policy-layer review.',
    'step-disqualify': 'Protocol Notice: Manual review required for represented matters.',
};

const STATE_DATA_SCRIPT_SRC = '/assets/js/data.js';

function loadStateDataScript() {
    return new Promise((resolve, reject) => {
        if (globalThis.stateData && typeof globalThis.stateData === 'object' && Object.keys(globalThis.stateData).length > 0) {
            resolve();
            return;
        }
        for (const node of document.querySelectorAll('script[src]')) {
            const src = node.getAttribute('src') || '';
            let pathOnly = src;
            try {
                pathOnly = src.startsWith('http') ? new URL(src).pathname : (src.startsWith('/') ? src : new URL(src, window.location.origin).pathname);
            } catch {
                /* keep pathOnly as src */
            }
            if (pathOnly === STATE_DATA_SCRIPT_SRC || pathOnly.endsWith('/assets/js/data.js')) {
                const finalize = () => {
                    if (globalThis.stateData && typeof globalThis.stateData === 'object' && Object.keys(globalThis.stateData).length > 0) {
                        resolve();
                    }
                };
                node.addEventListener('load', finalize, { once: true });
                node.addEventListener('error', () => reject(new Error('Failed to load data.js')), { once: true });
                queueMicrotask(finalize);
                return;
            }
        }
        const s = document.createElement('script');
        s.src = STATE_DATA_SCRIPT_SRC;
        s.async = false;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load ${STATE_DATA_SCRIPT_SRC}`));
        document.head.appendChild(s);
    });
}

let stateKeysCache = null;

function getStateRows() {
    const sd = globalThis.stateData;
    if (!sd || typeof sd !== 'object') {
        console.error('[app] stateData is missing. Load assets/js/data.js before app.js.');
        return {};
    }
    return sd;
}

function getStateKeys() {
    if (stateKeysCache) return stateKeysCache;
    const sd = getStateRows();
    const keys = Object.keys(sd);
    if (!keys.length) return [];
    stateKeysCache = keys.sort((a, b) => sd[a].auto.name.localeCompare(sd[b].auto.name));
    return stateKeysCache;
}

function resolveStateKeyFromPathname(pathname) {
    const rows = getStateRows();
    const raw = pathname.replace(/^\//, '').replace(/\/$/, '').toLowerCase();
    if (!raw) return '';
    const parts = raw.split('/').filter(Boolean);
    if (parts[0] === 'truck' && parts[1] && rows[parts[1]]) return parts[1];
    if (parts.length === 1 && rows[parts[0]]) return parts[0];
    const last = parts[parts.length - 1];
    if (rows[last]) return last;
    return '';
}

function getPayloadForMode(stateKey, mode) {
    const row = getStateRows()[stateKey];
    if (!row) return null;
    if (mode === 'truck') return row.truck || null;
    return row.auto || null;
}

const FEDERAL_TRUCK_FIELD_KEYS = new Set(['fmcsa_code', 'min_insurance']);

function resolveFederalTruckField(field) {
    if (!FEDERAL_TRUCK_FIELD_KEYS.has(field)) return '';
    const defs = globalThis.FEDERAL_TRUCK_DEFAULTS;
    const fromFile = defs && defs[field];
    if (fromFile != null && String(fromFile).trim() !== '') return String(fromFile).trim();
    if (field === 'fmcsa_code') return '49 CFR Parts 390-399';
    return '$750,000';
}

/** Truck rows may omit fmcsa_code / min_insurance; always merge FEDERAL_TRUCK_DEFAULTS from data.js. */
function resolveTruckRowField(truckRow, field) {
    if (!FEDERAL_TRUCK_FIELD_KEYS.has(field)) {
        const v = truckRow?.[field];
        return v != null && String(v).trim() !== '' ? String(v).trim() : '';
    }
    const v = truckRow?.[field];
    if (v != null && String(v).trim() !== '') return String(v).trim();
    return resolveFederalTruckField(field);
}

function escapeHtml(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function parseFirstInt(text) {
    const m = String(text || '').match(/([\d,]+)/);
    if (!m) return 0;
    const n = Number(m[1].replace(/,/g, ''));
    return Number.isFinite(n) ? n : 0;
}

function parseMoney(text) {
    return parseFirstInt(String(text || '').replace(/\$/g, ''));
}

function extractWeatherTags(text) {
    const t = String(text || '').toLowerCase();
    const tags = [];
    if (t.includes('heat')) tags.push('Heat');
    if (t.includes('fatigue')) tags.push('Fatigue');
    if (t.includes('wind')) tags.push('High Winds');
    if (tags.length) return tags;

    const raw = String(text || '')
        .replace(/[.]/g, '')
        .split(/[,;:]/)
        .map((s) => s.trim())
        .filter(Boolean);
    return raw
        .slice(0, 3)
        .map((s) => s.replace(/\b(and|or|the|a)\b/gi, '').trim())
        .filter(Boolean);
}

function buildDeterministicSparklinePoints({ ratio, width = 96, height = 22, pad = 2, points = 10 }) {
    const r = Number.isFinite(ratio) ? Math.max(0, Math.min(1.25, ratio)) : 0;
    const pts = [];
    for (let i = 0; i < points; i++) {
        const x = pad + (i * (width - pad * 2)) / (points - 1);
        const wave = Math.sin((i / (points - 1)) * Math.PI * 2) * 0.35 + Math.cos((i / (points - 1)) * Math.PI * 3) * 0.18;
        const yNorm = 0.55 - wave * (0.7 * r + 0.25);
        const y = pad + yNorm * (height - pad * 2);
        pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(' ');
}

function buildTruckAuditNodeCardHtml({ title, tooltip = 'View Case Law', bodyHtml, spanClass = '' }) {
    return `
        <div class="group relative rounded-xl border border-[#1E2D48] bg-[#0F1E35]/85 p-4 md:p-5 shadow-[0_0_0_1px_rgba(10,25,47,0.6)_inset] transition-all duration-300 hover:border-[#64FFDA]/70 hover:shadow-[0_0_0_1px_rgba(100,255,218,0.22)_inset,0_0_22px_rgba(100,255,218,0.10)] ${spanClass}">
            <div class="pointer-events-none absolute -top-2 right-3 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                <div class="rounded-md border border-[#1E2D48] bg-[#0A192F]/90 px-2 py-1 text-[10px] font-semibold tracking-[0.08em] text-[#E6F1FF]/80 backdrop-blur">
                    ${escapeHtml(tooltip)}
                </div>
            </div>
            <div class="flex items-start justify-between gap-3">
                <div class="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.06em] text-[#E6F1FF]/55">
                    ${escapeHtml(title)}
                </div>
            </div>
            <div class="mt-3">
                ${bodyHtml}
            </div>
        </div>
    `;
}

function buildTruckAuditGridHtml({ d, fmcsaCode, minInsurance }) {
    const solYears = parseFirstInt(d.state_sol);
    const crashes = parseFirstInt(d.crash_stats);
    const nationalAvg = 42000; // baseline reference for relative bar (US truck crashes/year ~ 42k)
    const crashRatio = nationalAvg > 0 ? Math.max(0, Math.min(1.25, crashes / nationalAvg)) : 0;
    const crashPct = Math.round(Math.min(100, crashRatio * 100));

    const insuranceDollars = parseMoney(minInsurance);
    const weatherTags = extractWeatherTags(d.weather_factor);
    const sparkPoints = buildDeterministicSparklinePoints({ ratio: crashRatio });

    return `
        <div id="nodal-truck-audit-grid" class="nodal-scan-once mt-5 rounded-2xl border border-[#1E2D48]/80 bg-[#0A192F]/35 p-4 md:p-5">
            <div class="flex items-center justify-between gap-4 mb-4">
                <div class="text-[10px] font-bold uppercase tracking-[0.22em] text-[#E6F1FF]/55">Data Audit · Truck Mode</div>
                <div class="text-[10px] font-mono tracking-[0.12em] text-[#64FFDA]/80">LIVE COMPUTE</div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                ${buildTruckAuditNodeCardHtml({
    title: 'Insurance Baseline',
    spanClass: 'lg:col-span-2',
    bodyHtml: `
        <div class="flex flex-col">
            <div class="flex items-center justify-between w-full">
                <div class="font-mono text-[22px] md:text-[26px] font-black tracking-tighter text-[#64FFDA] flex items-center gap-1">
                    <span class="text-[14px] opacity-70">$</span>
                    <span data-counter data-counter-to="${insuranceDollars}" data-counter-format="money">0</span>
                </div>
                <span class="flex-shrink-0 rounded border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[8px] font-black text-amber-500 tracking-wider">MIN. BASELINE</span>
            </div>
            <div class="mt-2 text-[9px] font-mono text-[#E6F1FF]/40 uppercase tracking-widest">
                Reg: 49 CFR Part 387.7
            </div>
        </div>
    `,
})}
                ${buildTruckAuditNodeCardHtml({
                    title: 'Statute of Limitations',
                    bodyHtml: `
                        <div class="flex items-center justify-between gap-3">
                            <div class="font-mono text-[22px] md:text-[24px] font-bold text-[#64FFDA]">
                                <span data-counter data-counter-to="${solYears}" data-counter-format="years">0</span>
                            </div>
                            <div class="inline-flex items-center gap-2">
                                <span class="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#E6F1FF]/55">Verified</span>
                                <span class="relative inline-flex h-2 w-2">
                                    <span class="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40 animate-ping"></span>
                                    <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                                </span>
                            </div>
                        </div>
                        <div class="mt-2 text-[11px] text-[#E6F1FF]/65">Jurisdiction window: <span class="font-mono text-[#E6F1FF]/85">${escapeHtml(
                            d.state_sol
                        )}</span></div>
                    `,
                })}

                ${buildTruckAuditNodeCardHtml({
                    title: 'FMCSA Compliance',
                    tooltip: 'View Case Law',
                    bodyHtml: `
                        <a href="https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B" target="_blank" rel="noopener noreferrer"
                           class="inline-flex items-center gap-2 rounded-lg border border-[#1E2D48] bg-[#0A192F]/35 px-3 py-2 transition hover:border-[#64FFDA]/70 hover:bg-[#0A192F]/55">
                            <span class="font-mono text-[13px] md:text-[14px] font-semibold text-[#64FFDA]">${escapeHtml(
                                fmcsaCode
                            )}</span>
                            <svg class="h-3.5 w-3.5 text-[#E6F1FF]/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                                <path d="M14 3h7v7"></path>
                                <path d="M10 14L21 3"></path>
                                <path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6"></path>
                            </svg>
                        </a>
                        <div class="mt-2 text-[11px] text-[#E6F1FF]/60">Federal rule-set mapped to carrier obligations.</div>
                    `,
                })}

                ${buildTruckAuditNodeCardHtml({
                    title: 'Crash Telemetry',
                    spanClass: 'sm:col-span-2 lg:col-span-2',
                    bodyHtml: `
                        <div class="flex items-end justify-between gap-3">
                            <div>
                                <div class="font-mono text-[20px] md:text-[22px] font-bold text-[#64FFDA]">
                                    <span data-counter data-counter-to="${crashes}" data-counter-format="int">0</span>
                                </div>
                                <div class="mt-1 text-[11px] text-[#E6F1FF]/60">Annual crashes (state telemetry rollups)</div>
                            </div>
                            <svg class="h-[22px] w-[96px]" viewBox="0 0 96 22" aria-hidden="true">
                                <polyline points="${sparkPoints}" fill="none" stroke="rgba(100,255,218,0.85)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></polyline>
                                <polyline points="2,20 94,20" fill="none" stroke="rgba(30,45,72,0.9)" stroke-width="1"></polyline>
                            </svg>
                        </div>
                        <div class="mt-3">
                            <div class="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-[#E6F1FF]/55">
                                <span>Relative to national avg</span>
                                <span class="font-mono text-[#E6F1FF]/70">${crashPct}%</span>
                            </div>
                            <div class="mt-2 h-2 rounded-full border border-[#1E2D48] bg-[#0A192F]/35 overflow-hidden">
                                <div class="h-full bg-[#64FFDA]/70" style="width:${Math.min(100, crashPct)}%"></div>
                            </div>
                        </div>
                    `,
                })}

                ${buildTruckAuditNodeCardHtml({
                    title: 'Weather Factor',
                    bodyHtml: `
                        <div class="flex flex-wrap gap-2">
                            ${weatherTags
                                .map(
                                    (tag) => `
                                <span class="rounded-full border border-[#1E2D48] bg-[#0A192F]/30 px-3 py-1 text-[10px] font-semibold tracking-[0.06em] text-[#E6F1FF]/80">
                                    ${escapeHtml(tag)}
                                </span>
                            `
                                )
                                .join('')}
                        </div>
                        <div class="mt-3 text-[11px] text-[#E6F1FF]/60 leading-relaxed">${escapeHtml(d.weather_factor)}</div>
                    `,
                })}
            </div>
        </div>
    `;
}

function initCountersWhenInView({ rootEl, threshold = 0.35 }) {
    if (!rootEl) return;
    const counters = Array.from(rootEl.querySelectorAll('[data-counter]'));
    if (!counters.length) return;

    const animateCounter = (el) => {
        const to = Number(el.getAttribute('data-counter-to') || '0');
        const fmt = String(el.getAttribute('data-counter-format') || 'int');
        const duration = 820;
        const start = performance.now();
        const from = 0;
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);
        const render = (v) => {
            if (fmt === 'money') {
                el.textContent = `$${Math.round(v).toLocaleString('en-US')}`;
                return;
            }
            if (fmt === 'years') {
                const years = Math.max(0, Math.round(v));
                el.textContent = `${years} ${years === 1 ? 'Year' : 'Years'}`;
                return;
            }
            el.textContent = Math.round(v).toLocaleString('en-US');
        };
        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const v = from + (to - from) * easeOut(t);
            render(v);
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const fired = new WeakSet();
    const io = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                for (const el of counters) {
                    if (fired.has(el)) continue;
                    fired.add(el);
                    animateCounter(el);
                }
                io.disconnect();
                break;
            }
        },
        { threshold }
    );
    io.observe(rootEl);
}

/** Plain-text risk line (matches scripts/build-truck-pages.mjs buildRiskSummary). */
function buildTruckRiskSummaryText(t) {
    if (!t) return '';
    const highway = t.major_highway || 'primary freight corridors';
    const crash = t.crash_stats || 'regional truck incident data';
    const weather = t.weather_factor || 'local road hazard factors';
    return `High-risk freight exposure across ${highway}; ${crash}; weather threat profile: ${weather}.`;
}

function isTruckStaticPath() {
    return /^\/truck\/[^/]+\/?$/i.test(window.location.pathname || '');
}

function runTruckSpaShimmer() {
    const el = document.getElementById('truck-spa-shimmer');
    if (!el) return;
    el.classList.remove('opacity-0');
    el.classList.add('opacity-100');
    window.setTimeout(() => {
        el.classList.remove('opacity-100');
        el.classList.add('opacity-0');
    }, 220);
}

function buildTruckRiskSignalHtml(truckRow) {
    const law = escapeHtml(truckRow.law_type || '—');
    const cx = escapeHtml(truckRow.settlement_complexity || '—');
    const ct = escapeHtml(truckRow.carrier_tactic || '—');
    const accent = document.body.classList.contains('truck-mode') ? 'text-amber-700' : 'text-emerald-700';

    const cxNorm = String(truckRow.settlement_complexity || '').toLowerCase();
    const led = cxNorm.includes('critical') ? 3 : cxNorm.includes('high') ? 3 : cxNorm.includes('moderate') ? 2 : 1;
    const weightPct = led === 3 ? 78 : led === 2 ? 52 : 28;

    return `
        <div class="font-mono">
            <div class="text-slate-900 font-bold leading-tight text-[13px] sm:text-sm">${law}</div>
            <div class="mt-3">
                <div class="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.15em] text-slate-500">
                    <span>Algorithmic weight</span>
                    <span class="text-slate-900">${weightPct}%</span>
                </div>
                <div class="mt-1.5 h-1.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200/50">
                    <div class="h-full bg-emerald-500/80 transition-all duration-1000" style="width:${weightPct}%"></div>
                </div>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-100 relative">
                <div class="text-[9px] font-black uppercase tracking-widest ${accent} mb-2">Live risk synthesis</div>

                <div class="flex items-center justify-between gap-2 mb-2">
                    <div class="text-[11px] text-slate-600 truncate flex-1">
                        <span class="font-bold text-slate-900">Complexity:</span> ${cx}
                    </div>
                    <div class="flex items-center gap-1 flex-shrink-0" aria-label="Complexity indicator">
                        <span class="nodal-led-step ${led >= 1 ? 'is-on' : ''} w-1.5 h-1.5"></span>
                        <span class="nodal-led-step ${led >= 2 ? 'is-on' : ''} w-1.5 h-1.5"></span>
                        <span class="nodal-led-step ${led >= 3 ? 'is-on' : ''} w-1.5 h-1.5"></span>
                    </div>
                </div>

                <div class="text-[11px] text-slate-600 leading-relaxed">
                    <span class="font-bold text-slate-900">Carrier Signal:</span> 
                    <span class="text-slate-800">${ct}</span>
                </div>
            </div>
        </div>
    `;
}

function animateContentSwap({ el, update, addScanLine = false }) {
    if (!el) return;
    el.classList.remove('content-shimmer');
    el.classList.remove('scan-line-flash');
    el.classList.add('opacity-0');

    requestAnimationFrame(() => {
        update();
        requestAnimationFrame(() => {
            el.classList.remove('opacity-0');
            el.classList.add('content-shimmer');
            if (addScanLine) {
                el.classList.add('scan-line-flash');
                window.setTimeout(() => el.classList.remove('scan-line-flash'), 320);
            }
        });
    });
}

function _syncGlobalUI(d, mode) {
    const navName = document.getElementById('nav-state-name');
    const isTruckPseo = document.body.classList.contains('truck-pseo-page');
    if (navName) {
        if (isTruckPseo && mode === 'truck') {
            navName.innerText = `${d.name} · Truck Specialist Audit`;
        } else {
            navName.innerText = `${d.name} Case Audit Division`;
        }
    }

    const metaDescription = document.querySelector('meta[name="description"]');
    if (mode === 'truck') {
        if (isTruckPseo) {
            document.title = `${d.name} Truck Specialist Audit | Nodal`;
            if (metaDescription) {
                metaDescription.setAttribute('content', buildTruckRiskSummaryText(d));
            }
        } else {
            document.title = `${d.name} Truck Accident Evaluation | FMCSA Compliance | Nodal`;
            if (metaDescription) {
                metaDescription.setAttribute(
                    'content',
                    `${d.name} 18-wheeler statutory audit with FMCSA Parts 390-399 review, carrier liability analysis, and evidence preservation workflow.`
                );
            }
        }
        document.body.classList.add('truck-mode');
    } else {
        document.title = `${d.name} High-Value Case Evaluation | Nodal`;
        if (metaDescription) {
            metaDescription.setAttribute(
                'content',
                'Data-driven statutory case evaluation for injury claims across U.S. jurisdictions.'
            );
        }
        document.body.classList.remove('truck-mode');
    }
}

function formatLocalSyncMarker() {
    const d = new Date();
    return `${d.getUTCFullYear()}:${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

function updateSyncLabel() {
    const syncLabel = document.getElementById('system-sync-label');
    if (syncLabel) syncLabel.innerText = `${formatLocalSyncMarker()} SYNC ACTIVE`;
}

function toStepId(stepTarget) {
    if (typeof stepTarget === 'number' && Number.isFinite(stepTarget)) return `step-${stepTarget}`;
    if (typeof stepTarget === 'string') return stepTarget.startsWith('step-') ? stepTarget : `step-${stepTarget}`;
    return 'step-1';
}

function getAuditStepIndex(stepId) {
    const id = toStepId(stepId);
    const m = id.match(/^step-(\d+)$/);
    if (!m) return 0;
    const n = Number(m[1]);
    if (!Number.isFinite(n)) return 0;
    return Math.max(1, Math.min(TOTAL_AUDIT_STEPS, n));
}

function updateGaugeForStep(stepId) {
    const gauge = document.getElementById('strength-gauge');
    if (!gauge) return;
    const idx = getAuditStepIndex(stepId);
    if (!idx) return;
    const pct = Math.round((idx / TOTAL_AUDIT_STEPS) * 100);
    gauge.style.width = `${pct}%`;
}

function updateValueDriverTip(stepId) {
    const tipEl = document.getElementById('value-driver-tip');
    if (!tipEl) return;
    const tip = STEP_TIPS[toStepId(stepId)] || '';
    if (!tip) {
        tipEl.classList.add('hidden');
        tipEl.textContent = '';
        return;
    }
    const body = String(tip).replace(/^Value Driver Tip:\s*/i, '').trim();
    tipEl.innerHTML = `<span class="system-note-label">SYSTEM NOTE:</span><span class="audit-feed-body">${escapeHtml(body)}</span>`;
    tipEl.classList.remove('hidden');
}

function syncAuditJurisdictionLabel() {
    const label = document.getElementById('audit-jurisdiction-label');
    if (!label) return;
    const d = getPayloadForMode(currentState, caseMode) || getPayloadForMode(currentState, 'auto');
    if (d?.name) label.textContent = d.name;
}

function isTruckClassificationSelected() {
    return leadFormData.classification === 'Commercial Truck Accident' || caseMode === 'truck';
}

function applyModalTheme() {
    const card = document.getElementById('lead-modal-card');
    const modalBody = document.getElementById('modalBody');
    const header = document.querySelector('#lead-modal-card > div');
    const title = document.getElementById('lead-modal-title');
    const isTruck = isTruckClassificationSelected();

    if (title) {
        title.textContent = isTruck ? 'FEDERAL MOTOR CARRIER STATUTORY AUDIT MODE' : 'Case Intake Audit';
    }

    if (!card || !modalBody || !header) return;

    if (isTruck) {
        card.classList.add('is-federal-audit');
        card.classList.add('relative');
        card.style.backgroundColor = '#0B1120';
        card.style.borderColor = 'rgba(212,175,55,0.35)';
        card.classList.add('text-slate-100');
        modalBody.style.backgroundColor = '#0B1120';
        modalBody.classList.remove('text-slate-900');
        modalBody.classList.add('text-slate-100');
        header.style.backgroundColor = '#0B1120';
        header.style.borderColor = 'rgba(212,175,55,0.22)';

        if (!hasShownFederalModalScan) {
            hasShownFederalModalScan = true;
            card.classList.add('federal-audit-scan-once');
            window.setTimeout(() => card.classList.remove('federal-audit-scan-once'), 650);
        }
    } else {
        card.classList.remove('is-federal-audit');
        card.style.backgroundColor = '';
        card.style.borderColor = '';
        card.classList.remove('text-slate-100');
        modalBody.style.backgroundColor = '';
        modalBody.classList.remove('text-slate-100');
        modalBody.classList.add('text-slate-900');
        header.style.backgroundColor = '';
        header.style.borderColor = '';
    }
}

function syncCarrierDetailsPanelVisibility() {
    const panel = document.getElementById('carrier-details-panel');
    if (!panel) return;
    const shouldShow = isTruckClassificationSelected() && leadFormData.carrier_identifier_available === 'Yes';
    panel.classList.toggle('hidden', !shouldShow);
}

function getCurrentStepId() {
    const visible = document.querySelector('.step-container:not(.hidden)');
    return visible?.id || 'step-1';
}

function getModeStateData(key = currentState) {
    return getPayloadForMode(key, caseMode);
}

function applyTruckTemplateToUI(stateName) {
    if (caseMode !== 'truck' || !truckTemplate) return;
    const headline = (truckTemplate.hero_headline || '').replace('<STATE>', stateName || '');
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle && headline) heroTitle.textContent = headline;

    const heroPoint1 = document.getElementById('hero-point-1');
    if (heroPoint1 && truckTemplate.hero_subheadline) heroPoint1.textContent = truckTemplate.hero_subheadline;

    const ctaLabel = document.getElementById('main-cta-label');
    if (ctaLabel && truckTemplate.cta_label) ctaLabel.textContent = truckTemplate.cta_label;

    const conversionHeadline = document.getElementById('truck-conversion-headline');
    if (conversionHeadline && Array.isArray(truckTemplate.value_stack) && truckTemplate.value_stack.length) {
        conversionHeadline.textContent = truckTemplate.value_stack[0];
    }

    const conversionCopy = document.getElementById('truck-conversion-copy');
    if (conversionCopy && truckTemplate.conversion_block) conversionCopy.textContent = truckTemplate.conversion_block;

    const trustStrip = document.getElementById('truck-trust-strip');
    if (trustStrip && truckTemplate.trust_strip) {
        trustStrip.innerHTML = truckTemplate.trust_strip
            .split('|')
            .map((part) => `<span class="trusted-by-chip">${part.trim()}</span>`)
            .join('');
    }

    const legalSafeLine = document.getElementById('legal-safe-line');
    if (legalSafeLine && truckTemplate.legal_safe_line) {
        legalSafeLine.textContent = truckTemplate.legal_safe_line;
    }

    if (Array.isArray(truckTemplate.qualifying_questions)) {
        const carrier = truckTemplate.qualifying_questions.find((q) => q.id === 'carrier_usdot');
        const eld = truckTemplate.qualifying_questions.find((q) => q.id === 'eld_preservation');
        const vehicleClass = truckTemplate.qualifying_questions.find((q) => q.id === 'commercial_policy_layer');
        const qCarrier = document.getElementById('truck-q-carrier');
        const qEld = document.getElementById('truck-q-eld');
        const qVehicleClass = document.getElementById('truck-q-vehicle-class');
        const qCarrierReason = document.getElementById('truck-q-carrier-reason');
        const qEldReason = document.getElementById('truck-q-eld-reason');
        const qVehicleClassReason = document.getElementById('truck-q-vehicle-class-reason');
        if (qCarrier && carrier?.prompt) qCarrier.textContent = carrier.prompt;
        if (qEld && eld?.prompt) qEld.textContent = eld.prompt;
        if (qVehicleClass && vehicleClass?.prompt) qVehicleClass.textContent = vehicleClass.prompt;
        if (qCarrierReason && carrier?.value_reason) qCarrierReason.textContent = `Value Driver: ${carrier.value_reason}`;
        if (qEldReason && eld?.value_reason) qEldReason.textContent = `Value Driver: ${eld.value_reason}`;
        if (qVehicleClassReason && vehicleClass?.value_reason)
            qVehicleClassReason.textContent = `Value Driver: ${vehicleClass.value_reason}`;
    }
}

function applyAutoPageShell(d) {
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        heroTitle.innerHTML =
            '<span class="block">Your Settlement is a Data Battle.</span><span class="nodal-hero-highlight inline-block mt-1.5">Don\'t Fight Unarmed.</span>';
    }

    const point1 = document.getElementById('hero-point-1');
    const point2 = document.getElementById('hero-point-2');
    const truckDataPoints = document.getElementById('truck-data-points');
    if (point1) {
        point1.innerHTML =
            'Carrier algorithms minimize recovery by design. We decode the <strong>Statutory Discrepancies</strong> they expect you to overlook.';
    }
    if (point2) {
        point2.innerHTML = 'AUTONOMOUS STATUTORY INFRASTRUCTURE | REAL-TIME CASE-LAW SYNC [v2026.03]';
    }
    if (truckDataPoints) {
        animateContentSwap({
            el: truckDataPoints,
            update: () => {
                truckDataPoints.classList.add('hidden');
                truckDataPoints.innerHTML = '';
            },
        });
    }

    const ctaLabel = document.getElementById('main-cta-label');
    if (ctaLabel) ctaLabel.textContent = 'EXECUTE STATUTORY CASE AUDIT';

    _syncGlobalUI(d, 'auto');
}

function applyTruckPageShell(d) {
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        heroTitle.innerHTML = `${d.name} 18-Wheeler Statutory Audit`;
    }

    const point1 = document.getElementById('hero-point-1');
    const point2 = document.getElementById('hero-point-2');
    const truckDataPoints = document.getElementById('truck-data-points');
    if (point1 && point2 && truckDataPoints) {
        const fmcsaCode = resolveTruckRowField(d, 'fmcsa_code');
        const minInsurance = resolveTruckRowField(d, 'min_insurance');
        point1.innerHTML = `Commercial carriers on <strong>${d.major_highway}</strong> are governed by <strong>${fmcsaCode}</strong>.`;
        point2.innerHTML = `Minimum insurance baseline <strong>${minInsurance}</strong> | Statute of limitations: <strong>${d.state_sol}</strong>.`;

        animateContentSwap({
            el: truckDataPoints,
            update: () => {
                truckDataPoints.innerHTML = buildTruckAuditGridHtml({ d, fmcsaCode, minInsurance });
                truckDataPoints.classList.remove('hidden');
            },
        });

        // Count-up animation: triggers once when grid enters viewport
        window.requestAnimationFrame(() => {
            const grid = document.getElementById('nodal-truck-audit-grid');
            initCountersWhenInView({ rootEl: grid, threshold: 0.35 });
        });
    }

    _syncGlobalUI(d, 'truck');
    applyTruckTemplateToUI(d.name);
}

function applyStateData(key) {
    const rows = getStateRows();
    if (!rows[key]) return;

    currentState = key;
    truckTemplate = TRUCK_UI_TEMPLATE;

    const d = getPayloadForMode(key, caseMode);
    if (!d) return;

    // Update jurisdiction chips (visual active state)
    document.querySelectorAll('[data-jurisdiction-chip][data-state-key]').forEach((btn) => {
        const btnKey = btn.getAttribute('data-state-key');
        btn.classList.toggle('is-active', btnKey === key);
    });

    if (caseMode === 'truck') {
        applyTruckPageShell(d);
    } else {
        applyAutoPageShell(d);
    }

    const inlineState = document.getElementById('hero-state-name-inline');
    if (inlineState) inlineState.innerText = d.name;

    const heroState = document.getElementById('hero-state-name');
    if (heroState) heroState.innerText = d.name;
    const statuteEl = document.getElementById('statute-info');
    if (statuteEl) statuteEl.innerText = d.statute;
    const statsEl = document.getElementById('stats-info');
    const row = rows[key];
    if (statsEl) {
        if (caseMode === 'truck' && row?.truck) {
            const t = row.truck;
            animateContentSwap({
                el: statsEl,
                addScanLine: true,
                update: () => {
                    statsEl.innerHTML = buildTruckRiskSignalHtml(t);
                },
            });
            leadFormData.settlement_complexity = t.settlement_complexity || '';
            leadFormData.carrier_tactic = t.carrier_tactic || '';
        } else {
            animateContentSwap({
                el: statsEl,
                update: () => {
                    statsEl.textContent = d.law_type;
                },
            });
            delete leadFormData.settlement_complexity;
            delete leadFormData.carrier_tactic;
        }
    }

    leadFormData.state = d.name;
    leadFormData.case_type = caseMode;
    updateSyncLabel();

    console.debug('[Nodal · Expert Mode] Data Integrity Check', {
        stateKey: key,
        mode: caseMode,
        statutePresent: !!(d && d.statute),
        federalDefaultsLoaded: !!globalThis.FEDERAL_TRUCK_DEFAULTS,
        truckEnriched:
            caseMode === 'truck' && row?.truck
                ? !!(row.truck.settlement_complexity && row.truck.carrier_tactic)
                : null,
        status: 'OK',
    });
}

function bindCopyButtons() {
    document.addEventListener('click', async (e) => {
        const btn = e.target.closest('button[data-copy-target]');
        if (!btn) return;
        const id = btn.getAttribute('data-copy-target') || '';
        const target = id ? document.getElementById(id) : null;
        const text = target ? (target.textContent || '').trim() : '';
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            btn.classList.add('text-emerald-300');
            window.setTimeout(() => btn.classList.remove('text-emerald-300'), 520);
        } catch {
            // fallback
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand('copy');
            } finally {
                ta.remove();
            }
        }
    });
}

function syncSubmitState() {
    const tcpa = document.getElementById('tcpa');
    const submitBtn = document.getElementById('submit-btn');
    if (!submitBtn) return;

    const canSubmit = !!tcpa && tcpa.checked && turnstileVerified && !!turnstileToken;
    submitBtn.disabled = !canSubmit;
    submitBtn.classList.toggle('cursor-not-allowed', !canSubmit);
    submitBtn.classList.toggle('opacity-50', !canSubmit);
    submitBtn.classList.toggle('opacity-100', canSubmit);

    // Visual polish: look "live" when validated
    submitBtn.classList.toggle('bg-slate-950', canSubmit);
    submitBtn.classList.toggle('text-white', canSubmit);
    submitBtn.classList.toggle('animate-pulse', canSubmit);
    submitBtn.classList.toggle('shadow-xl', canSubmit);
    if (canSubmit) {
        submitBtn.classList.remove('cursor-not-allowed');
        submitBtn.classList.remove('opacity-50');
        submitBtn.classList.add('opacity-100');
    } else {
        submitBtn.classList.remove('animate-pulse');
    }
}

function onTurnstileVerified(token) {
    turnstileToken = token || '';
    turnstileVerified = !!turnstileToken;
    syncSubmitState();
}

function onTurnstileExpired() {
    turnstileToken = '';
    turnstileVerified = false;
    syncSubmitState();
}

function startAudit(s) {
    const modeQuery = caseMode === 'truck' ? '?type=truck' : '';
    window.history.pushState({}, '', `/${s}${modeQuery}`);
    applyStateData(s);
    openModal();
}

function selectJurisdiction(stateKey) {
    if (!getStateRows()[stateKey]) return;

    if (isTruckStaticPath()) {
        const cur = resolveStateKeyFromPathname(window.location.pathname);
        if (cur === stateKey) return;
        window.history.pushState({ truckPseo: true, stateKey }, '', `/truck/${stateKey}/`);
        runTruckSpaShimmer();
        applyStateData(stateKey);
        return;
    }

    startStateSyncFlow(stateKey);
}

function renderStateSearchResults(query) {
    const box = document.getElementById('state-search-results');
    if (!box) return;

    const q = (query || '').trim().toLowerCase();
    if (!q) {
        box.classList.add('hidden');
        box.innerHTML = '';
        return;
    }

    const sd = getStateRows();
    const keys = getStateKeys();
    const matches = keys.filter((key) => sd[key]?.auto?.name?.toLowerCase().includes(q)).slice(0, 12);
    if (!matches.length) {
        box.innerHTML = '<div class="px-4 py-3 text-xs font-semibold text-slate-400">No matching state found</div>';
        box.classList.remove('hidden');
        return;
    }

    box.innerHTML = matches
        .map(
            (key) =>
                `<button type="button" data-state-key="${key}" class="state-result-btn w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">${sd[key].auto.name}</button>`
        )
        .join('');
    box.classList.remove('hidden');
}

function openModal(options = {}) {
    const startFresh = options.startFresh === true;
    const modal = document.getElementById('leadModal');
    if (!modal) {
        console.error('[Fatal Error] LeadModal element not found in DOM.');
        return;
    }

    // Hard show modal
    modal.classList.remove('hidden');
    // Tailwind positioning relies on flex on these pages
    modal.classList.add('flex');
    modal.classList.remove('hidden');

    document.body.classList.add('overflow-hidden');
    document.body.style.overflow = 'hidden';

    // Essential reset: always start from a known step state
    activeStep = 'step-1';
    stepHistory = [];
    currentScore = 10;

    // Choose initial step (always start at classification)
    let initialStep = 'step-1';
    if (!document.getElementById(initialStep)) initialStep = 'step-1';

    // Apply step visibility + state
    nextStep(initialStep, { recordHistory: false });

    updateSelectedChoiceUI();
    syncAuditJurisdictionLabel();
    applyModalTheme();
    syncCarrierDetailsPanelVisibility();
    syncSubmitState();

    console.log('[DEBUG] openModal executed. leadModal: flex; step:', activeStep);
}

function closeModal() {
    const modal = document.getElementById('leadModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
    document.body.classList.remove('overflow-hidden');

    // Reset questionnaire state for next open (prevents stale-step bugs)
    resetFlowState();
    // [추가] 트럭 모드 기억 삭제 및 테마 복구
    caseMode = 'standard';
    document.body.classList.remove('truck-mode');
}

function openAboutModal() {
    const modal = document.getElementById('aboutModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeAboutModal() {
    const modal = document.getElementById('aboutModal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function openInsightModal(kind) {
    const modal = document.getElementById('insightModal');
    const title = document.getElementById('insight-modal-title');
    const body = document.getElementById('insight-modal-body');
    const content = INSIGHT_CONTENT[kind];
    if (!modal || !title || !body || !content) return;
    title.innerText = content.title;
    body.innerText = content.body;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeInsightModal() {
    const modal = document.getElementById('insightModal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function updateSelectedChoiceUI() {
    const buttons = document.querySelectorAll('[data-choice-key][data-choice-value]');
    const isTruck = isTruckClassificationSelected();
    buttons.forEach((btn) => {
        const key = btn.getAttribute('data-choice-key');
        const val = btn.getAttribute('data-choice-value');
        const selected = !!key && !!val && leadFormData[key] === val;
        const truckBorder = '#D4AF37';

        if (selected) {
            if (isTruck) {
                btn.style.borderColor = truckBorder;
                btn.style.boxShadow = '0 0 0 1px rgba(212,175,55,0.25) inset';
                btn.classList.add('ring-1');
                btn.classList.remove('border-emerald-500', 'bg-emerald-50', 'text-emerald-800', 'ring-emerald-200');
            } else {
                btn.style.borderColor = '';
                btn.style.boxShadow = '';
                btn.classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-800', 'ring-1', 'ring-emerald-200');
            }
        } else {
            btn.style.borderColor = '';
            btn.style.boxShadow = '';
            btn.classList.remove('border-emerald-500', 'bg-emerald-50', 'text-emerald-800', 'ring-1', 'ring-emerald-200');
        }
    });
}

function persistFormProgress() {
    try {
        const tcpa = document.getElementById('tcpa');
        const payload = {
            activeStep,
            stepHistory,
            caseMode,
            currentScore,
            leadFormData,
            inputs: {
                narrative: document.getElementById('narrative-box')?.value || '',
                fName: document.getElementById('fName')?.value || '',
                lName: document.getElementById('lName')?.value || '',
                email: document.getElementById('email')?.value || '',
                userPhone: document.getElementById('userPhone')?.value || '',
                truckCarrierName: document.getElementById('truck-carrier-name')?.value || '',
                carrierUsdot: document.getElementById('carrier-usdot')?.value || '',
                tcpa: !!tcpa?.checked,
            },
        };
        sessionStorage.setItem(FORM_PROGRESS_KEY, JSON.stringify(payload));
    } catch {
        // ignore storage errors
    }
}

function restoreFormProgress() {
    try {
        const raw = sessionStorage.getItem(FORM_PROGRESS_KEY);
        if (!raw) return;
        const saved = JSON.parse(raw);
        if (!saved || typeof saved !== 'object') return;

        if (saved.leadFormData && typeof saved.leadFormData === 'object') {
            leadFormData = { ...leadFormData, ...saved.leadFormData };
        }
        if (typeof saved.currentScore === 'number') {
            currentScore = Math.max(0, Math.min(95, saved.currentScore));
        }
        if (saved.inputs && typeof saved.inputs === 'object') {
            const setValue = (id, value) => {
                const el = document.getElementById(id);
                if (el && typeof value === 'string') el.value = value;
            };
            setValue('narrative-box', saved.inputs.narrative);
            setValue('fName', saved.inputs.fName);
            setValue('lName', saved.inputs.lName);
            setValue('email', saved.inputs.email);
            setValue('userPhone', saved.inputs.userPhone);
            setValue('truck-carrier-name', saved.inputs.truckCarrierName);
            setValue('carrier-usdot', saved.inputs.carrierUsdot);
            const tcpa = document.getElementById('tcpa');
            if (tcpa) tcpa.checked = !!saved.inputs.tcpa;
        }
        if (typeof saved.caseMode === 'string' && (saved.caseMode === 'auto' || saved.caseMode === 'truck')) {
            leadFormData.case_type = saved.caseMode;
        }
        if (typeof saved.activeStep === 'number') {
            activeStep = toStepId(saved.activeStep);
        } else if (typeof saved.activeStep === 'string') {
            activeStep = toStepId(saved.activeStep);
        }
        if (Array.isArray(saved.stepHistory)) {
            stepHistory = saved.stepHistory.map((s) => toStepId(s)).filter((id) => !!document.getElementById(id));
        }
        analyzeText();
        updateSelectedChoiceUI();
        syncAuditJurisdictionLabel();
        applyModalTheme();
        syncCarrierDetailsPanelVisibility();
        updateGaugeForStep(activeStep);
        updateValueDriverTip(activeStep);
    } catch {
        // ignore parse errors
    }
}

function resetFlowState() {
    const stateOnly = leadFormData.state;
    leadFormData = stateOnly ? { state: stateOnly, case_type: caseMode } : { case_type: caseMode };
    if (caseMode === 'truck' && currentState) {
        const t = getPayloadForMode(currentState, 'truck');
        if (t) {
            leadFormData.settlement_complexity = t.settlement_complexity || '';
            leadFormData.carrier_tactic = t.carrier_tactic || '';
        }
    }
    currentScore = 10;
    activeStep = 'step-1';
    stepHistory = [];
    updateGaugeForStep('step-1');
    const fbBox = document.getElementById('ai-feedback-box');
    if (fbBox) fbBox.classList.add('hidden');
    const ids = ['narrative-box', 'fName', 'lName', 'email', 'userPhone', 'truck-carrier-name'];
    ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    const usdot = document.getElementById('carrier-usdot');
    if (usdot) usdot.value = '';
    const badges = document.getElementById('keyword-badges');
    if (badges) badges.innerHTML = '';
    updateSelectedChoiceUI();
    sessionStorage.removeItem(FORM_PROGRESS_KEY);
}

function runStateSyncOverlay(stateKey) {
    const d = getPayloadForMode(stateKey, caseMode);
    const overlay = document.getElementById('stateSyncOverlay');
    const panel = document.getElementById('stateSyncPanel');
    const ticker = document.getElementById('stateSyncTicker');
    const progress = document.getElementById('stateSyncProgress');
    if (!overlay || !panel || !ticker || !progress || !d) return Promise.resolve();

    const row = getStateRows()[stateKey];
    const truck = caseMode === 'truck' && row?.truck ? row.truck : null;

    const l1 = document.getElementById('sync-line-1');
    const l2 = document.getElementById('sync-line-2');
    const l3 = document.getElementById('sync-line-3');
    const l4 = document.getElementById('sync-line-4');
    const l5 = document.getElementById('sync-line-5');
    if (l1) l1.innerText = d.statute || '';
    if (l2) l2.innerText = d.law_type || '';
    if (truck) {
        const fmcsa = resolveTruckRowField(truck, 'fmcsa_code');
        const minIns = resolveTruckRowField(truck, 'min_insurance');
        if (l3) l3.innerText = `${fmcsa} · Federal min. liability ${minIns}`;
        if (l4) {
            const cx = truck.settlement_complexity || '—';
            const sol = truck.state_sol || '—';
            l4.innerText = `Settlement tier: ${cx} · SOL ${sol} · ${truck.major_highway || ''}`.trim();
        }
        if (l5) {
            const tactic = truck.carrier_tactic || '';
            l5.innerText =
                tactic.length > 140 ? `${tactic.slice(0, 137).trim()}…` : tactic || 'Carrier tactic signal — verified';
        }
    } else {
        if (l3) l3.innerText = `${d.name} · 2026 statutory framework sync`;
        if (l4) l4.innerText = 'Independent data layer validation';
        if (l5) l5.innerText = 'Jurisdiction signal verified';
    }

    if (stateSyncTimer) clearTimeout(stateSyncTimer);
    panel.classList.remove('state-sync-exit');
    ticker.classList.remove('state-sync-ticker');
    progress.style.transition = 'none';
    progress.style.width = '0%';
    overlay.classList.remove('hidden');

    void ticker.offsetWidth;
    ticker.classList.add('state-sync-ticker');
    const SYNC_MS = 150;
    requestAnimationFrame(() => {
        progress.style.transition = `width ${SYNC_MS}ms ${'cubic-bezier(0.16, 1, 0.3, 1)'}`;
        progress.style.width = '100%';
    });

    return new Promise((resolve) => {
        stateSyncTimer = setTimeout(() => {
            panel.classList.add('state-sync-exit');
            setTimeout(() => {
                overlay.classList.add('hidden');
                panel.classList.remove('state-sync-exit');
                resolve();
            }, 160);
        }, SYNC_MS);
    });
}

async function startStateSyncFlow(stateKey) {
    if (isStateSyncRunning) return;
    isStateSyncRunning = true;
    try {
        const modeQuery = caseMode === 'truck' ? '?type=truck' : '';
        window.history.pushState({}, '', `/${stateKey}${modeQuery}`);
        applyStateData(stateKey);
        resetFlowState();
        await runStateSyncOverlay(stateKey);
        openModal({ startFresh: true });
    } finally {
        isStateSyncRunning = false;
    }
}

function handleSelect(key, val, next, feedback, bonus) {
    // Mode switch: pivot theme only when user selects Commercial Truck Accident classification
    if (key === 'classification') {
        if (val === 'Commercial Truck Accident') {
            caseMode = 'truck';
            leadFormData.case_type = 'truck';
        } else {
            caseMode = 'auto';
            leadFormData.case_type = 'auto';
        }
    }

    leadFormData[key] = val;
    updateSelectedChoiceUI();
    applyModalTheme();
    syncCarrierDetailsPanelVisibility();

    const b = Number(bonus || 0);
    currentScore = Math.min(95, Math.max(10, currentScore + b));

    const fbBox = document.getElementById('ai-feedback-box');
    const fbText = document.getElementById('ai-feedback-text');
    if (fbBox && fbText) {
        fbText.innerHTML = `<span class="ai-insight-label">AI INSIGHT:</span><span class="audit-feed-body">${escapeHtml(String(feedback ?? ''))}</span>`;
        fbBox.classList.remove('hidden');
    }

    persistFormProgress();

    // Shararak-style premium transition (lightweight on steps)
    setTimeout(() => {
        const target = toStepId(next);
        // Branch rule: carrier info step is Truck-only
        if (target === 'step-4' && !isTruckClassificationSelected()) {
            nextStep(5, { recordHistory: true });
            return;
        }
        nextStep(next, { recordHistory: true });
        const el = document.getElementById(target);
        if (el) {
            el.classList.remove('content-shimmer');
            void el.offsetWidth;
            el.classList.add('content-shimmer');
            window.setTimeout(() => el.classList.remove('content-shimmer'), 450);
        }
    }, 180);
}

function nextStep(s, options = {}) {
    const { recordHistory = true } = options;
    const targetStepId = toStepId(s);
    const targetStepEl = document.getElementById(targetStepId);
    const currentStepId = getCurrentStepId();

    if (!targetStepEl) return;

    if (recordHistory && currentStepId && currentStepId !== targetStepId) stepHistory.push(currentStepId);

    document.querySelectorAll('.step-container').forEach((el) => el.classList.add('hidden'));
    targetStepEl.classList.remove('hidden');
    activeStep = targetStepId;
    updateSelectedChoiceUI();
    syncAuditJurisdictionLabel();
    applyModalTheme();
    syncCarrierDetailsPanelVisibility();
    updateGaugeForStep(activeStep);
    updateValueDriverTip(activeStep);
    persistFormProgress();
}

function prevStep() {
    if (!stepHistory.length) return closeModal();
    const previousStepId = stepHistory.pop();
    if (!previousStepId) return closeModal();
    if (!document.getElementById(previousStepId)) return closeModal();
    nextStep(previousStepId, { recordHistory: false });
}

function handleTruckCarrierStep() {
    // Legacy-safe hook (older pages may still call this)
    const carrierInput = document.getElementById('truck-carrier-name');
    const usdotInput = document.getElementById('carrier-usdot');
    leadFormData.carrier_name = carrierInput?.value?.trim() || '';
    leadFormData.carrier_usdot = usdotInput?.value?.trim() || '';

    const feedback =
        leadFormData.carrier_name || leadFormData.carrier_usdot
            ? 'Carrier identifiers captured. Policy layer tracing and FMCSA profile pulls are now enabled.'
            : 'Carrier identifiers not captured. Audit will proceed; carrier discovery remains flagged.';

    const fbBox = document.getElementById('ai-feedback-box');
    const fbText = document.getElementById('ai-feedback-text');
    if (fbBox && fbText) {
        fbText.innerHTML = `<span class="ai-insight-label">AI INSIGHT:</span><span class="audit-feed-body">${escapeHtml(String(feedback ?? ''))}</span>`;
        fbBox.classList.remove('hidden');
    }
    persistFormProgress();
    nextStep(5, { recordHistory: true });
}

function analyzeText() {
    const narrativeEl = document.getElementById('narrative-box');
    const badges = document.getElementById('keyword-badges');
    if (!narrativeEl || !badges) {
        persistFormProgress();
        return;
    }
    const text = narrativeEl.value.toLowerCase();
    const keywords = {
        'rear-end': { label: 'Liability Signal', tier: 'high' },
        'rear ended': { label: 'Liability Signal', tier: 'high' },
        'rear-ended': { label: 'Liability Signal', tier: 'high' },
        't-bone': { label: 'Impact Vector', tier: 'high' },
        'tbone': { label: 'Impact Vector', tier: 'high' },
        'intersection': { label: 'Signal Control', tier: 'med' },
        'ambulance': { label: 'Medical Severity', tier: 'high' },
        'er': { label: 'Medical Severity', tier: 'high' },
        hospital: { label: 'Medical Severity', tier: 'high' },
        surgery: { label: 'Surgical Indicator', tier: 'high' },
        fracture: { label: 'Objective Injury', tier: 'high' },
        concussion: { label: 'Objective Injury', tier: 'med' },
        herniated: { label: 'Spine Indicator', tier: 'high' },
        'missed work': { label: 'Wage Loss', tier: 'med' },
        'lost wages': { label: 'Wage Loss', tier: 'med' },
        'truck': { label: 'Federal Carrier Exposure', tier: 'high' },
        'tractor trailer': { label: 'Federal Carrier Exposure', tier: 'high' },
        '18-wheeler': { label: 'Federal Carrier Exposure', tier: 'high' },
        'usdot': { label: 'Carrier Identifier', tier: 'med' },
        'police report': { label: 'Primary Evidence', tier: 'med' },
    };
    badges.innerHTML = '';
    const isTruck = isTruckClassificationSelected();
    const seen = new Set();
    for (const [kw, meta] of Object.entries(keywords)) {
        if (!text.includes(kw)) continue;
        const key = meta.label;
        if (seen.has(key)) continue;
        seen.add(key);

        const tier = meta.tier || 'med';
        const base =
            isTruck
                ? tier === 'high'
                    ? 'bg-amber-500/15 text-amber-200 border border-amber-500/30'
                    : 'bg-slate-800/60 text-slate-200 border border-slate-700'
                : tier === 'high'
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200';
        badges.innerHTML += `<span class="px-2 py-1 text-[9px] font-bold rounded-full uppercase tracking-wider ${base}">✓ ${escapeHtml(
            meta.label
        )}</span>`;
    }
    persistFormProgress();
}

function submitFinalLead(e) {
    e.preventDefault();
    const tcpa = document.getElementById('tcpa');
    if (!tcpa || !tcpa.checked) {
        alert('Express written consent is required before submitting your case.');
        return;
    }
    if (!turnstileVerified || !turnstileToken) {
        alert('Please complete the security verification.');
        return;
    }

    if (e.target && typeof e.target.checkValidity === 'function' && !e.target.checkValidity()) {
        e.target.reportValidity();
        return;
    }

    leadFormData.fName = document.getElementById('fName')?.value || '';
    leadFormData.lName = document.getElementById('lName')?.value || '';
    leadFormData.email = document.getElementById('email')?.value || '';
    leadFormData.phone = document.getElementById('userPhone')?.value || '';
    leadFormData.narrative = document.getElementById('narrative-box')?.value || '';
    leadFormData.case_type = caseMode;
    if (caseMode === 'truck') {
        leadFormData.carrier_name = document.getElementById('truck-carrier-name')?.value?.trim() || leadFormData.carrier_name || '';
        leadFormData.carrier_usdot = document.getElementById('carrier-usdot')?.value?.trim() || leadFormData.carrier_usdot || '';
        // Ensure key truck decisions persist in final payload
        leadFormData.eldPreservation = leadFormData.eldPreservation || leadFormData.eld || '';
        leadFormData.truckClass = leadFormData.truckClass || '';
        leadFormData.type = leadFormData.type || 'Truck';
        leadFormData.represented = leadFormData.represented || 'unknown';
        const t = getPayloadForMode(currentState, 'truck');
        if (t) {
            leadFormData.settlement_complexity = t.settlement_complexity || leadFormData.settlement_complexity || '';
            leadFormData.carrier_tactic = t.carrier_tactic || leadFormData.carrier_tactic || '';
        }
    }

    leadFormData.tcpa_checked = true;
    leadFormData['cf-turnstile-response'] = turnstileToken;
    leadFormData.turnstileToken = turnstileToken;

    const step9 = document.getElementById('step-9');
    if (step9) step9.classList.add('hidden');
    const stepScan = document.getElementById('step-scan');
    if (stepScan) stepScan.classList.remove('hidden');
    const scanStatusText = document.getElementById('scan-status-text');
    if (scanStatusText) {
        scanStatusText.innerText =
            caseMode === 'truck' ? 'Analyzing Federal FMCSA Compliance...' : 'Syncing Data Streams...';
    }

    try {
        const prev = JSON.parse(localStorage.getItem(LOCAL_LEADS_KEY) || '[]');
        const queue = Array.isArray(prev) ? prev : [];
        queue.push({ ...leadFormData, submittedAt: new Date().toISOString() });
        localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(queue.slice(-100)));
        if (caseMode === 'truck') {
            // 0.1% finish: in-modal scan → generated report → safe redirect
            if (scanStatusText) scanStatusText.innerText = 'Final Scan & Analysis (FMCSA + policy layers)…';
            window.setTimeout(() => {
                const stepScanEl = document.getElementById('step-scan');
                if (stepScanEl) {
                    stepScanEl.innerHTML = [
                        '<div class="text-center">',
                        '  <div class="mx-auto w-12 h-12 mb-6 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-900 font-bold">✓</div>',
                        '  <h3 class="font-serif font-bold text-xl text-slate-950 mb-2">REPORT GENERATED</h3>',
                        '  <p class="text-sm text-slate-600 leading-relaxed mb-6">Your truck audit has been finalized. A verification specialist may contact you shortly to validate carrier/policy-layer details.</p>',
                        '  <button type="button" id="truck-report-download" class="w-full py-5 rounded-2xl bg-slate-950 text-white font-bold uppercase tracking-[0.2em] text-[13px] shadow-xl hover:bg-slate-800 active:scale-[0.98] transition-all">Download Report</button>',
                        '</div>',
                    ].join('');
                    const btn = document.getElementById('truck-report-download');
                    if (btn) {
                        btn.addEventListener('click', () => {
                            window.location.href = '/success.html?mode=truck';
                        });
                    }
                } else {
                    window.location.href = '/success.html?mode=truck';
                }
            }, 3000);
        } else {
            window.location.href = '/success.html';
        }
    } catch (err) {
        console.error(err);
        window.location.href = caseMode === 'truck' ? '/success.html?mode=truck' : '/success.html';
    }
}

function disqualify() {
    alert('Already represented cases require manual review. Please contact support.');
    closeModal();
}

function bindMainPageGlobals() {
    const w = window;
    w.selectJurisdiction = selectJurisdiction;
    w.startAudit = startAudit;
    w.openModal = openModal;
    w.closeModal = closeModal;
    w.openAboutModal = openAboutModal;
    w.closeAboutModal = closeAboutModal;
    w.openInsightModal = openInsightModal;
    w.closeInsightModal = closeInsightModal;
    w.handleSelect = handleSelect;
    w.nextStep = nextStep;
    w.prevStep = prevStep;
    w.handleTruckCarrierStep = handleTruckCarrierStep;
    w.submitFinalLead = submitFinalLead;
    w.disqualify = disqualify;
    w.analyzeText = analyzeText;
    w.onTurnstileVerified = onTurnstileVerified;
    w.onTurnstileExpired = onTurnstileExpired;
}

bindMainPageGlobals();

function initScrollPerformanceToggles() {
    // Safari/iOS: backdrop-filter + large blur surfaces are a known scroll-performance killer.
    // We temporarily disable them while the user is actively scrolling.
    let ticking = false;
    let scrollTimer = 0;

    const setScrolling = () => {
        document.body.classList.add('is-scrolling');
        if (scrollTimer) window.clearTimeout(scrollTimer);
        scrollTimer = window.setTimeout(() => {
            document.body.classList.remove('is-scrolling');
        }, 140);
    };

    window.addEventListener(
        'scroll',
        () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    ticking = false;
                    setScrolling();
                });
            }
        },
        { passive: true }
    );
}

window.addEventListener('popstate', () => {
    if (!isTruckStaticPath()) return;
    const k = resolveStateKeyFromPathname(window.location.pathname);
    const rows = getStateRows();
    if (k && rows[k]) applyStateData(k);
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadStateDataScript();
        stateKeysCache = null;
    } catch (err) {
        console.error('[app] Could not ensure state data:', err);
    }

    const url = new URL(window.location.href);
    const onTruckStaticPath = /^\/truck\/[^/]+\/?$/i.test(url.pathname);
    const urlWantsTruck = url.searchParams.get('type') === 'truck' || onTruckStaticPath;
    caseMode = urlWantsTruck ? 'truck' : 'auto';
    truckTemplate = TRUCK_UI_TEMPLATE;

    const pathKey = resolveStateKeyFromPathname(url.pathname);
    const rows = getStateRows();
    if (pathKey && rows[pathKey]) {
        applyStateData(pathKey);
    } else {
        applyStateData('california');
    }

    const userPhone = document.getElementById('userPhone');
    if (userPhone) {
        userPhone.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            const m = v.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !m[2] ? m[1] : `(${m[1]}) ${m[2]}${m[3] ? `-${m[3]}` : ''}`;
            persistFormProgress();
        });
    }

    const tcpaEl = document.getElementById('tcpa');
    if (tcpaEl) {
        tcpaEl.addEventListener('change', () => {
            syncSubmitState();
            persistFormProgress();
        });
    }

    ['narrative-box', 'fName', 'lName', 'email', 'truck-carrier-name', 'carrier-usdot'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', persistFormProgress);
    });

    const stateSearchInput = document.getElementById('state-search-input');
    const stateResults = document.getElementById('state-search-results');
    if (stateSearchInput && stateResults) {
        let rafToken = 0;
        const scheduleRender = (value) => {
            if (rafToken) cancelAnimationFrame(rafToken);
            rafToken = requestAnimationFrame(() => {
                rafToken = 0;
                renderStateSearchResults(value);
            });
        };
        stateSearchInput.addEventListener('focus', (e) => scheduleRender(e.target.value));
        stateSearchInput.addEventListener('input', (e) => scheduleRender(e.target.value));

        stateResults.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-state-key]');
            if (!btn) return;
            const key = btn.getAttribute('data-state-key');
            if (!key || !rows[key]) return;
            stateSearchInput.value = rows[key].auto.name;
            selectJurisdiction(key);
            stateResults.classList.add('hidden');
        });

        document.addEventListener('click', (e) => {
            if (e.target === stateSearchInput || stateResults.contains(e.target)) return;
            stateResults.classList.add('hidden');
        });
    }

    bindCopyButtons();
    initScrollPerformanceToggles();

    restoreFormProgress();
    caseMode = urlWantsTruck ? 'truck' : 'auto';
    leadFormData.case_type = caseMode;

    applyStateData(currentState);
    updateSelectedChoiceUI();
    syncSubmitState();
});
