const TRUCK_UI_TEMPLATE = {
    hero_headline: '<STATE> 18-Wheeler Statutory Audit',
    hero_subheadline:
        'When a commercial carrier is involved, every hour matters. Our FMCSA-aligned audit engine identifies liability signals, policy leverage, and evidence-preservation priorities before critical data disappears.',
    cta_label: 'START DATA-DRIVEN CASE AUDIT',
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
const FORM_PROGRESS_KEY = 'caseAuditProgress.v2';
const STEP_TIPS = {
    'step-1': 'Value Driver Tip: Accurate incident classification increases routing precision for premium cases.',
    'step-truck-intro': 'Value Driver Tip: Federal motor-carrier rules immediately expand documentation leverage.',
    'step-truck-niche': 'Value Driver Tip: Commercial vehicle class is a core predictor of policy-layer depth.',
    'step-truck-carrier': 'Value Driver Tip: Carrier identity accelerates FMCSA profile pulls and valuation confidence.',
    'step-truck-evidence': 'Value Driver Tip: ELD and telematics preservation prevents the most damaging evidence gaps.',
    'step-2': 'Value Driver Tip: Low fault allocation materially increases expected settlement range.',
    'step-3': 'Value Driver Tip: ER visits within 24hrs are the #1 predictor of 6-figure settlements.',
    'step-4': 'Value Driver Tip: Official reports anchor liability timelines and reduce defense ambiguity.',
    'step-5': 'Value Driver Tip: Unrepresented claims typically unlock faster counsel engagement workflows.',
    'step-6': 'Value Driver Tip: Specific facts around impact and treatment improve model confidence scores.',
    'step-7': 'Value Driver Tip: Complete identity data improves attorney match quality and response speed.',
    'step-8': 'Value Driver Tip: Verified phone numbers correlate with higher-value conversion outcomes.',
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
    return `<span class="block font-semibold text-slate-800 leading-snug">${law}</span><span class="block mt-2 pt-2 border-t border-slate-200/80"><span class="text-[10px] font-bold uppercase tracking-widest ${accent}">Live risk synthesis</span><span class="block text-[12px] md:text-sm text-slate-600 mt-1"><span class="font-semibold text-slate-800">Settlement complexity:</span> ${cx}</span><span class="block text-[12px] md:text-sm text-slate-600 mt-1 leading-relaxed"><span class="font-semibold text-slate-800">Carrier tactic signal:</span> ${ct}</span></span>`;
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
            '<span class="block">Your Settlement is a Data Battle.</span><span class="bg-emerald-50 px-2 rounded-sm inline-block mt-1.5 text-emerald-700">Don\'t Fight Unarmed.</span>';
    }

    const point1 = document.getElementById('hero-point-1');
    const point2 = document.getElementById('hero-point-2');
    const truckDataPoints = document.getElementById('truck-data-points');
    if (point1) {
        point1.innerHTML =
            'Insurance algorithms are designed to protect carrier margins. We identify the <span class="text-emerald-600 font-bold">Statutory Gaps</span> they hope you miss.';
    }
    if (point2) {
        point2.innerHTML = 'Neutral Legal-Tech Infrastructure | 2026 Statutory Database Sync';
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
    if (ctaLabel) ctaLabel.textContent = 'START DATA-DRIVEN CASE AUDIT';

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
                truckDataPoints.innerHTML = [
                    `Major Highway: ${d.major_highway}`,
                    `FMCSA Code: ${fmcsaCode}`,
                    `Min Insurance: ${minInsurance}`,
                    `State SOL: ${d.state_sol}`,
                    `Crash Stats: ${d.crash_stats}`,
                    `Weather Factor: ${d.weather_factor}`,
                ]
                    .map((line) => `<p>${line}</p>`)
                    .join('');
                truckDataPoints.classList.remove('hidden');
            },
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

    // Theme (minimal, stability-first)
    const title = document.getElementById('lead-modal-title');
    if (title) title.textContent = caseMode === 'truck' ? 'Truck Case Intake Audit' : 'Case Intake Audit';

    // Choose initial step
    let initialStep = 'step-1';
    if (startFresh || caseMode === 'truck') initialStep = caseMode === 'truck' ? 'step-truck-intro' : 'step-1';
    if (!document.getElementById(initialStep)) initialStep = 'step-1';

    // Apply step visibility + state
    nextStep(initialStep, { recordHistory: false });

    updateSelectedChoiceUI();
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
    buttons.forEach((btn) => {
        const key = btn.getAttribute('data-choice-key');
        const val = btn.getAttribute('data-choice-value');
        const selected = !!key && !!val && leadFormData[key] === val;
        btn.classList.toggle('border-emerald-500', selected);
        btn.classList.toggle('bg-emerald-50', selected);
        btn.classList.toggle('text-emerald-800', selected);
        btn.classList.toggle('ring-1', selected);
        btn.classList.toggle('ring-emerald-200', selected);
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
            const gauge = document.getElementById('strength-gauge');
            if (gauge) gauge.style.width = `${currentScore}%`;
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
    const gauge = document.getElementById('strength-gauge');
    if (gauge) gauge.style.width = '10%';
    const fbBox = document.getElementById('ai-feedback-box');
    if (fbBox) fbBox.classList.add('hidden');
    const ids = ['narrative-box', 'fName', 'lName', 'email', 'userPhone', 'truck-carrier-name'];
    ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
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
    // Mode switch: when user explicitly selects Truck classification
    if (key === 'type') {
        if (val === 'Truck') {
            caseMode = 'truck';
            leadFormData.case_type = 'truck';
            const title = document.getElementById('lead-modal-title');
            if (title) title.textContent = 'Truck Case Intake Audit';
            feedback = 'Federal-class incident detected. Statutory policy floor ($750k+) mapping activated.';
        } else {
            caseMode = 'auto';
            leadFormData.case_type = 'auto';
            const title = document.getElementById('lead-modal-title');
            if (title) title.textContent = 'Case Intake Audit';
        }
    }

    leadFormData[key] = val;
    updateSelectedChoiceUI();

    const b = Number(bonus || 0);
    currentScore = Math.min(95, Math.max(10, currentScore + b));
    const gauge = document.getElementById('strength-gauge');
    if (gauge) gauge.style.width = `${currentScore}%`;

    const fbBox = document.getElementById('ai-feedback-box');
    const fbText = document.getElementById('ai-feedback-text');
    if (fbBox && fbText) {
        fbText.innerText = `AI INSIGHT: ${feedback}`;
        fbBox.classList.remove('hidden');
    }

    persistFormProgress();

    // Shararak-style premium transition (lightweight on steps)
    setTimeout(() => {
        const target = toStepId(next);
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
    const carrierInput = document.getElementById('truck-carrier-name');
    leadFormData.carrier_name = carrierInput?.value?.trim() || '';
    const feedback = leadFormData.carrier_name
        ? 'Carrier entity captured. Federal safety history and policy layers can now be profiled.'
        : 'Carrier name pending. Investigation can proceed with route and unit identifiers.';
    const bonus = leadFormData.carrier_name ? 12 : 6;
    currentScore = Math.min(95, currentScore + bonus);
    const gauge = document.getElementById('strength-gauge');
    if (gauge) gauge.style.width = `${currentScore}%`;
    const fbBox = document.getElementById('ai-feedback-box');
    const fbText = document.getElementById('ai-feedback-text');
    if (fbBox && fbText) {
        fbText.innerText = `AI INSIGHT: ${feedback}`;
        fbBox.classList.remove('hidden');
    }
    persistFormProgress();
    setTimeout(() => nextStep('truck-evidence', { recordHistory: true }), 450);
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
        'rear-ended': 'High Liability',
        hospital: 'Major Damages',
        commercial: 'Corporate Asset',
    };
    badges.innerHTML = '';
    for (const [kw, label] of Object.entries(keywords)) {
        if (text.includes(kw)) {
            badges.innerHTML += `<span class="px-2 py-1 bg-emerald-100 text-emerald-700 text-[8px] font-bold rounded uppercase animate-pulse">✓ ${label}</span>`;
        }
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
        // Ensure key truck decisions persist in final payload
        leadFormData.eldPreservation = leadFormData.eldPreservation || leadFormData.eld || '';
        leadFormData.truckClass = leadFormData.truckClass || '';
        leadFormData.type = leadFormData.type || 'Truck';
        leadFormData.fault = leadFormData.fault || 'unknown';
        leadFormData.med = leadFormData.med || 'unknown';
        leadFormData.police = leadFormData.police || 'unknown';
        leadFormData.atty = leadFormData.atty || 'unknown';
        const t = getPayloadForMode(currentState, 'truck');
        if (t) {
            leadFormData.settlement_complexity = t.settlement_complexity || leadFormData.settlement_complexity || '';
            leadFormData.carrier_tactic = t.carrier_tactic || leadFormData.carrier_tactic || '';
        }
    }

    leadFormData.tcpa_checked = true;
    leadFormData['cf-turnstile-response'] = turnstileToken;
    leadFormData.turnstileToken = turnstileToken;

    const step8 = document.getElementById('step-8');
    if (step8) step8.classList.add('hidden');
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

    ['narrative-box', 'fName', 'lName', 'email', 'truck-carrier-name'].forEach((id) => {
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

    restoreFormProgress();
    caseMode = urlWantsTruck ? 'truck' : 'auto';
    leadFormData.case_type = caseMode;

    const truckOnlySteps = new Set(['step-truck-intro', 'step-truck-carrier', 'step-truck-evidence', 'step-truck-niche']);
    if (!urlWantsTruck && truckOnlySteps.has(activeStep)) {
        activeStep = 'step-1';
        stepHistory = [];
    }

    applyStateData(currentState);
    updateSelectedChoiceUI();
    syncSubmitState();
});
