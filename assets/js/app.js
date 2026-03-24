const MASTER_DB = {
    alabama: { name: 'Alabama', statute: 'Ala. Code § 6-5-410', law_type: 'Contributory Negligence' },
    alaska: { name: 'Alaska', statute: 'Alaska Stat. § 09.17.060', law_type: 'Pure Comparative Negligence' },
    arizona: { name: 'Arizona', statute: 'Ariz. Rev. Stat. § 12-2505', law_type: 'Pure Comparative Negligence' },
    arkansas: { name: 'Arkansas', statute: 'Ark. Code § 16-64-122', law_type: 'Modified Comparative Fault' },
    california: { name: 'California', statute: 'CA Civ. Code § 1714', law_type: 'Pure Comparative Negligence' },
    colorado: { name: 'Colorado', statute: 'Colo. Rev. Stat. § 13-21-111', law_type: 'Modified Comparative Fault' },
    connecticut: { name: 'Connecticut', statute: 'Conn. Gen. Stat. § 52-572h', law_type: 'Modified Comparative Fault' },
    delaware: { name: 'Delaware', statute: 'Del. Code tit. 10, § 8132', law_type: 'Modified Comparative Fault' },
    florida: { name: 'Florida', statute: 'Fla. Stat. § 768.81', law_type: 'Modified Comparative Fault' },
    georgia: { name: 'Georgia', statute: 'O.C.G.A. § 51-12-33', law_type: 'Modified Comparative Fault' },
    hawaii: { name: 'Hawaii', statute: 'Haw. Rev. Stat. § 663-31', law_type: 'Modified Comparative Fault' },
    idaho: { name: 'Idaho', statute: 'Idaho Code § 6-801', law_type: 'Modified Comparative Fault' },
    illinois: { name: 'Illinois', statute: '735 ILCS 5/2-1116', law_type: 'Modified Comparative Fault' },
    indiana: { name: 'Indiana', statute: 'Ind. Code § 34-51-2', law_type: 'Modified Comparative Fault' },
    iowa: { name: 'Iowa', statute: 'Iowa Code § 668.3', law_type: 'Modified Comparative Fault' },
    kansas: { name: 'Kansas', statute: 'Kan. Stat. § 60-258a', law_type: 'Modified Comparative Fault' },
    kentucky: { name: 'Kentucky', statute: 'Ky. Rev. Stat. § 411.182', law_type: 'Pure Comparative Negligence' },
    louisiana: { name: 'Louisiana', statute: 'La. Civ. Code art. 2323', law_type: 'Pure Comparative Fault' },
    maine: { name: 'Maine', statute: '14 M.R.S. § 156', law_type: 'Modified Comparative Fault' },
    maryland: { name: 'Maryland', statute: 'Md. Cts. & Jud. Proc. § 10-101', law_type: 'Contributory Negligence' },
    massachusetts: { name: 'Massachusetts', statute: 'Mass. Gen. Laws ch. 231, § 85', law_type: 'Modified Comparative Fault' },
    michigan: { name: 'Michigan', statute: 'Mich. Comp. Laws § 600.2959', law_type: 'Modified Comparative Fault' },
    minnesota: { name: 'Minnesota', statute: 'Minn. Stat. § 604.01', law_type: 'Modified Comparative Fault' },
    mississippi: { name: 'Mississippi', statute: 'Miss. Code § 11-7-15', law_type: 'Pure Comparative Negligence' },
    missouri: { name: 'Missouri', statute: 'Mo. Rev. Stat. § 537.765', law_type: 'Pure Comparative Fault' },
    montana: { name: 'Montana', statute: 'Mont. Code § 27-1-702', law_type: 'Modified Comparative Fault' },
    nebraska: { name: 'Nebraska', statute: 'Neb. Rev. Stat. § 25-21,185.09', law_type: 'Modified Comparative Fault' },
    nevada: { name: 'Nevada', statute: 'Nev. Rev. Stat. § 41.141', law_type: 'Modified Comparative Fault' },
    new_hampshire: { name: 'New Hampshire', statute: 'N.H. Rev. Stat. § 507:7-d', law_type: 'Modified Comparative Fault' },
    new_jersey: { name: 'New Jersey', statute: 'N.J. Stat. § 2A:15-5.1', law_type: 'Modified Comparative Fault' },
    new_mexico: { name: 'New Mexico', statute: 'N.M. Stat. § 41-3A-1', law_type: 'Pure Comparative Negligence' },
    new_york: { name: 'New York', statute: 'CPLR § 1411', law_type: 'Pure Comparative Negligence' },
    north_carolina: { name: 'North Carolina', statute: 'N.C. Gen. Stat. § 1-139', law_type: 'Contributory Negligence' },
    north_dakota: { name: 'North Dakota', statute: 'N.D. Cent. Code § 32-03.2-02', law_type: 'Modified Comparative Fault' },
    ohio: { name: 'Ohio', statute: 'Ohio Rev. Code § 2315.33', law_type: 'Modified Comparative Fault' },
    oklahoma: { name: 'Oklahoma', statute: '23 Okla. Stat. § 13', law_type: 'Modified Comparative Negligence' },
    oregon: { name: 'Oregon', statute: 'Or. Rev. Stat. § 31.600', law_type: 'Modified Comparative Fault' },
    pennsylvania: { name: 'Pennsylvania', statute: '42 Pa. Cons. Stat. § 7102', law_type: 'Modified Comparative Negligence' },
    rhode_island: { name: 'Rhode Island', statute: 'R.I. Gen. Laws § 9-20-4', law_type: 'Pure Comparative Negligence' },
    south_carolina: { name: 'South Carolina', statute: 'S.C. Code § 15-38-15', law_type: 'Modified Comparative Negligence' },
    south_dakota: { name: 'South Dakota', statute: 'S.D. Codified Laws § 20-9-2', law_type: 'Slight/Gross Comparative Negligence' },
    tennessee: { name: 'Tennessee', statute: 'McIntyre v. Balentine', law_type: 'Modified Comparative Fault' },
    texas: { name: 'Texas', statute: 'TX Civ. Prac. § 33.001', law_type: 'Proportionate Responsibility' },
    utah: { name: 'Utah', statute: 'Utah Code § 78B-5-818', law_type: 'Modified Comparative Fault' },
    vermont: { name: 'Vermont', statute: '12 V.S.A. § 1036', law_type: 'Modified Comparative Fault' },
    virginia: { name: 'Virginia', statute: 'Va. Code § 8.01-58', law_type: 'Contributory Negligence' },
    washington: { name: 'Washington', statute: 'Wash. Rev. Code § 4.22.005', law_type: 'Pure Comparative Fault' },
    west_virginia: { name: 'West Virginia', statute: 'W. Va. Code § 55-7-13a', law_type: 'Modified Comparative Fault' },
    wisconsin: { name: 'Wisconsin', statute: 'Wis. Stat. § 895.045', law_type: 'Modified Comparative Negligence' },
    wyoming: { name: 'Wyoming', statute: 'Wyo. Stat. § 1-1-109', law_type: 'Modified Comparative Fault' }
};

const TRUCK_STATE_OVERRIDES = {
    california: { major_highway: 'I-5 / I-10', crash_stats: 'Approx. 13,000 annual large-truck injury/fatal collisions', weather_factor: 'Dense fog + mountain grade brake-fade risk', state_sol: '2 years (injury)' },
    texas: { major_highway: 'I-10 / I-35', crash_stats: 'Approx. 38,000 annual large-truck crashes', weather_factor: 'Extreme heat + long-haul fatigue corridors', state_sol: '2 years (injury)' },
    florida: { major_highway: 'I-4 / I-95', crash_stats: 'Approx. 10,000 annual commercial truck crashes', weather_factor: 'Heavy rain + hydroplaning on freight lanes', state_sol: '2 years (injury)' },
    georgia: { major_highway: 'I-75 / I-85', crash_stats: 'Approx. 6,000 annual large-truck crashes', weather_factor: 'Freight bottlenecks + wet-weather lane shifts', state_sol: '2 years (injury)' },
    new_york: { major_highway: 'I-87 / I-90', crash_stats: 'Approx. 8,000 annual commercial truck crashes', weather_factor: 'Black ice + winter visibility drop', state_sol: '3 years (injury)' },
};

const stateConfigs = Object.fromEntries(
    Object.entries(MASTER_DB).map(([key, data]) => {
        const truckOverride = TRUCK_STATE_OVERRIDES[key] || {};
        return [key, {
            auto: {
                name: data.name,
                statute: data.statute,
                law_type: data.law_type,
            },
            truck: {
                name: data.name,
                statute: data.statute,
                law_type: data.law_type,
                major_highway: truckOverride.major_highway || 'Primary interstate freight corridor',
                fmcsa_code: '49 CFR Parts 390-399',
                min_insurance: '$750,000',
                state_sol: truckOverride.state_sol || '2-3 years (varies by claim type)',
                crash_stats: truckOverride.crash_stats || 'Regional commercial truck crash data monitored annually',
                weather_factor: truckOverride.weather_factor || 'High-wind and low-visibility freight risk windows',
            },
        }];
    })
);

const STATE_KEYS = Object.keys(stateConfigs).sort((a, b) => stateConfigs[a].auto.name.localeCompare(stateConfigs[b].auto.name));
const INSIGHT_CONTENT = {
    trap: {
        title: 'Why Insurance Adjusters Fear Statutory Data.',
        body: 'Adjusters perform best when claimants do not anchor demands to enforceable statutes and precedent-backed liability structures. Statutory data creates a verifiable baseline that compresses negotiation spread and exposes lowball reserve strategy.'
    },
    gold: {
        title: 'The $750,000 Minimum: Federal Trucking Policy Limits.',
        body: 'Federal motor carrier frameworks often place meaningful policy floors in play. Understanding these limits changes valuation posture immediately by reframing what is collectible, what is provable, and what leverage is realistic before litigation spend accelerates.'
    },
    system: {
        title: 'Man vs Machine: How AI Detects Settlement Gaps.',
        body: 'Nodal compares narrative facts, injury signals, and jurisdictional doctrine against historical outcomes to detect valuation deltas. The model highlights where carrier offers diverge from statistically supportable ranges so users can negotiate from evidence, not guesswork.'
    }
};

let currentScore = 10;
let currentState = 'california';
let leadFormData = {};
let turnstileVerified = false;
let turnstileToken = '';
let diagnosticsPollTimer = null;
let stateSyncTimer = null;
let isStateSyncRunning = false;
let activeStep = 'step-1';
let stepHistory = [];
let caseMode = 'auto';
let truckTemplate = null;
const FORM_PROGRESS_KEY = 'caseAuditProgress.v2';

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
    const cfg = stateConfigs[key];
    if (!cfg) return null;
    return cfg[caseMode] || cfg.auto;
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
        trustStrip.innerHTML = truckTemplate.trust_strip.split('|').map((part) => `<span class="trusted-by-chip">${part.trim()}</span>`).join('');
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
        if (qVehicleClassReason && vehicleClass?.value_reason) qVehicleClassReason.textContent = `Value Driver: ${vehicleClass.value_reason}`;
    }
}

function syncSubmitState() {
    const tcpa = document.getElementById('tcpa');
    const submitBtn = document.getElementById('submit-btn');
    if (!submitBtn) return;

    const canSubmit = !!tcpa && tcpa.checked && turnstileVerified;
    submitBtn.disabled = !canSubmit;
    submitBtn.classList.toggle('cursor-not-allowed', !canSubmit);
    submitBtn.classList.toggle('opacity-50', !canSubmit);
    submitBtn.classList.toggle('opacity-100', canSubmit);
}

function onTurnstileVerified(token) {
    turnstileToken = token || '';
    turnstileVerified = true;
    syncSubmitState();
}

function onTurnstileExpired() {
    turnstileToken = '';
    turnstileVerified = false;
    syncSubmitState();
}

function applyStateData(key) {
    if (!stateConfigs[key]) return;

    currentState = key;
    const d = getModeStateData(key);
    if (!d) return;

    const navName = document.getElementById('nav-state-name');
    if (navName) navName.innerText = `${d.name} Case Audit Division`;

    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        heroTitle.innerHTML = caseMode === 'truck'
            ? `${d.name} 18-Wheeler Statutory Audit`
            : 'Assess Your True <span class="bg-emerald-50 px-2 rounded-sm">Recovery Potential</span>';
    }

    const point1 = document.getElementById('hero-point-1');
    const point2 = document.getElementById('hero-point-2');
    const truckDataPoints = document.getElementById('truck-data-points');
    if (point1 && point2 && truckDataPoints) {
        if (caseMode === 'truck') {
            point1.innerHTML = `Commercial carriers on <strong>${d.major_highway}</strong> are governed by <strong>${d.fmcsa_code}</strong>.`;
            point2.innerHTML = `Minimum insurance baseline <strong>${d.min_insurance}</strong> | Statute of limitations: <strong>${d.state_sol}</strong>.`;
            truckDataPoints.innerHTML = [
                `Major Highway: ${d.major_highway}`,
                `FMCSA Code: ${d.fmcsa_code}`,
                `Min Insurance: ${d.min_insurance}`,
                `State SOL: ${d.state_sol}`,
                `Crash Stats: ${d.crash_stats}`,
                `Weather Factor: ${d.weather_factor}`,
            ].map((line) => `<p>${line}</p>`).join('');
            truckDataPoints.classList.remove('hidden');
        } else {
            point1.innerHTML = 'Insurance algorithms undervalue claims by <span class="text-emerald-600">68%</span>.';
            point2.innerHTML = 'Independent Data Infrastructure | No Law Firm Bias.';
            truckDataPoints.classList.add('hidden');
            truckDataPoints.innerHTML = '';
        }
    }

    const metaDescription = document.querySelector('meta[name="description"]');
    if (caseMode === 'truck') {
        document.title = `${d.name} Truck Accident Evaluation | FMCSA Compliance | Nodal`;
        if (metaDescription) {
            metaDescription.setAttribute(
                'content',
                `${d.name} 18-wheeler statutory audit with FMCSA Parts 390-399 review, carrier liability analysis, and evidence preservation workflow.`
            );
        }
    } else {
        document.title = `${d.name} High-Value Case Evaluation | Nodal`;
        if (metaDescription) {
            metaDescription.setAttribute(
                'content',
                'Data-driven statutory case evaluation for injury claims across U.S. jurisdictions.'
            );
        }
    }

    document.body.classList.toggle('truck-mode', caseMode === 'truck');
    const inlineState = document.getElementById('hero-state-name-inline');
    if (inlineState) inlineState.innerText = d.name;

    document.getElementById('hero-state-name').innerText = d.name;
    document.getElementById('statute-info').innerText = d.statute;
    document.getElementById('stats-info').innerText = d.law_type;

    leadFormData.state = d.name;
    leadFormData.case_type = caseMode;
    refreshStateDiagnostics(key);
}

function startAudit(s) {
    const modeQuery = caseMode === 'truck' ? '?type=truck' : '';
    window.history.pushState({}, '', `/${s}${modeQuery}`);
    applyStateData(s);
    openModal();
}

function selectJurisdiction(stateKey) {
    if (!stateConfigs[stateKey]) return;
    startStateSyncFlow(stateKey);
}

async function refreshStateDiagnostics(stateKey) {
    try {
        const modeQuery = caseMode === 'truck' ? '&mode=truck' : '';
        const res = await fetch(`/api/state-diagnostics?state=${encodeURIComponent(stateKey)}${modeQuery}`);
        const json = await res.json();
        if (!json?.success) return;
        if (currentState !== stateKey) return;

        if (!stateConfigs[stateKey]) return;
        stateConfigs[stateKey].auto = {
            name: json.state_name,
            statute: json.statute_authority,
            law_type: json.liability_doctrine,
        };
        stateConfigs[stateKey].truck = {
            ...stateConfigs[stateKey].truck,
            name: json.state_name,
            statute: json.statute_authority,
            law_type: json.liability_doctrine,
            ...(json?.truck?.profile || {}),
        };
        if (json?.truck?.template) {
            truckTemplate = json.truck.template;
        }

        const syncLabel = document.getElementById('system-sync-label');
        if (syncLabel) syncLabel.innerText = `${json.sync_marker} SYNC ACTIVE`;

        const d = getModeStateData(stateKey);
        if (!d) return;
        document.getElementById('hero-state-name').innerText = d.name;
        document.getElementById('statute-info').innerText = d.statute;
        document.getElementById('stats-info').innerText = d.law_type;
        const inlineState = document.getElementById('hero-state-name-inline');
        if (inlineState) inlineState.innerText = json.state_name;
        const navName = document.getElementById('nav-state-name');
        if (navName) navName.innerText = `${json.state_name} Case Audit Division`;
        leadFormData.state = json.state_name;
        applyTruckTemplateToUI(json.state_name);
    } catch (err) {
        console.error('refreshStateDiagnostics error:', err);
    }
}

function startDiagnosticsPolling() {
    if (diagnosticsPollTimer) clearInterval(diagnosticsPollTimer);
    diagnosticsPollTimer = setInterval(() => {
        refreshStateDiagnostics(currentState);
    }, 15000);
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

    const matches = STATE_KEYS.filter((key) => stateConfigs[key].auto.name.toLowerCase().includes(q)).slice(0, 12);
    if (!matches.length) {
        box.innerHTML = '<div class="px-4 py-3 text-xs font-semibold text-slate-400">No matching state found</div>';
        box.classList.remove('hidden');
        return;
    }

    box.innerHTML = matches
        .map((key) => `<button type="button" data-state-key="${key}" class="state-result-btn w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">${stateConfigs[key].auto.name}</button>`)
        .join('');
    box.classList.remove('hidden');
}

function openModal() {
    document.getElementById('leadModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    const initialStep = caseMode === 'truck' ? 'truck-intro' : (activeStep || 'step-1');
    nextStep(initialStep, { recordHistory: false });
}

function closeModal() {
    document.getElementById('leadModal').classList.add('hidden');
    document.body.style.overflow = '';
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
            caseMode = saved.caseMode;
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
    const d = getModeStateData(stateKey);
    const overlay = document.getElementById('stateSyncOverlay');
    const panel = document.getElementById('stateSyncPanel');
    const ticker = document.getElementById('stateSyncTicker');
    const progress = document.getElementById('stateSyncProgress');
    if (!overlay || !panel || !ticker || !progress || !d) return Promise.resolve();

    const l1 = document.getElementById('sync-line-1');
    const l2 = document.getElementById('sync-line-2');
    const l3 = document.getElementById('sync-line-3');
    const l4 = document.getElementById('sync-line-4');
    const l5 = document.getElementById('sync-line-5');
    if (l1) l1.innerText = d.statute;
    if (l2) l2.innerText = d.law_type;
    if (l3) l3.innerText = `${d.name} 2026 Statute Sync`;
    if (l4) l4.innerText = 'Independent Data Layer Validation';
    if (l5) l5.innerText = 'Jurisdiction Signal Verified';

    if (stateSyncTimer) clearTimeout(stateSyncTimer);
    panel.classList.remove('state-sync-exit');
    ticker.classList.remove('state-sync-ticker');
    progress.style.transition = 'none';
    progress.style.width = '0%';
    overlay.classList.remove('hidden');

    void ticker.offsetWidth;
    ticker.classList.add('state-sync-ticker');
    requestAnimationFrame(() => {
        progress.style.transition = 'width 0.5s ease-in-out';
        progress.style.width = '100%';
    });

    return new Promise((resolve) => {
        stateSyncTimer = setTimeout(() => {
            panel.classList.add('state-sync-exit');
            setTimeout(() => {
                overlay.classList.add('hidden');
                panel.classList.remove('state-sync-exit');
                resolve();
            }, 220);
        }, 500);
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
        openModal();
    } finally {
        isStateSyncRunning = false;
    }
}

function handleSelect(key, val, next, feedback, bonus) {
    leadFormData[key] = val;
    updateSelectedChoiceUI();
    currentScore = Math.min(95, currentScore + bonus);
    document.getElementById('strength-gauge').style.width = `${currentScore}%`;
    const fbBox = document.getElementById('ai-feedback-box');
    document.getElementById('ai-feedback-text').innerText = `AI INSIGHT: ${feedback}`;
    fbBox.classList.remove('hidden');
    persistFormProgress();
    setTimeout(() => nextStep(next, { recordHistory: true }), 600);
}

function nextStep(s, options = {}) {
    const { recordHistory = true } = options;
    const targetStepId = toStepId(s);
    const targetStepEl = document.getElementById(targetStepId);
    if (!targetStepEl) return;
    const currentStepId = getCurrentStepId();
    if (recordHistory && currentStepId && currentStepId !== targetStepId) {
        stepHistory.push(currentStepId);
    }
    document.querySelectorAll('.step-container').forEach((el) => el.classList.add('hidden'));
    targetStepEl.classList.remove('hidden');
    activeStep = targetStepId;
    updateSelectedChoiceUI();
    persistFormProgress();
}

function prevStep() {
    if (!stepHistory.length) {
        closeModal();
        return;
    }
    const previousStepId = stepHistory.pop();
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


async function submitFinalLead(e) {
    e.preventDefault();
    const tcpa = document.getElementById('tcpa');
    if (!tcpa || !tcpa.checked) {
        alert('Express written consent is required before submitting your case.');
        return;
    }
    if (!turnstileVerified) {
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
        // Keep backend compatibility for truck-only templates that skip generic questions.
        leadFormData.type = leadFormData.type || 'Truck';
        leadFormData.fault = leadFormData.fault || 'unknown';
        leadFormData.med = leadFormData.med || 'unknown';
        leadFormData.police = leadFormData.police || 'unknown';
        leadFormData.atty = leadFormData.atty || 'unknown';
    }

    leadFormData.tcpa_checked = true;
    leadFormData['cf-turnstile-response'] = turnstileToken;
    leadFormData.turnstileToken = turnstileToken;

    const step8 = document.getElementById('step-8');
    if (step8) step8.classList.add('hidden');
    document.getElementById('step-scan').classList.remove('hidden');
    const scanStatusText = document.getElementById('scan-status-text');
    if (scanStatusText) {
        scanStatusText.innerText = caseMode === 'truck'
            ? 'Analyzing Federal FMCSA Compliance...'
            : 'Syncing Data Streams...';
    }

    try {
        const response = await fetch('/api/insert-lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadFormData),
        });
        const result = await response.json();
        if (result.success) {
            window.location.href = 'success.html';
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (err) {
        console.error(err);
    }
}

function disqualify() {
    alert('Already represented cases require manual review. Please contact support.');
    closeModal();
}

document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    caseMode = url.searchParams.get('type') === 'truck' ? 'truck' : 'auto';
    const path = window.location.pathname.replace(/^\//, '').toLowerCase();
    if (path && stateConfigs[path]) {
        applyStateData(path);
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
        stateSearchInput.addEventListener('focus', (e) => renderStateSearchResults(e.target.value));
        stateSearchInput.addEventListener('input', (e) => renderStateSearchResults(e.target.value));

        stateResults.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-state-key]');
            if (!btn) return;
            const key = btn.getAttribute('data-state-key');
            if (!key || !stateConfigs[key]) return;
            stateSearchInput.value = stateConfigs[key].auto.name;
            selectJurisdiction(key);
            stateResults.classList.add('hidden');
        });

        document.addEventListener('click', (e) => {
            if (e.target === stateSearchInput || stateResults.contains(e.target)) return;
            stateResults.classList.add('hidden');
        });
    }

    restoreFormProgress();
    applyStateData(currentState);
    startDiagnosticsPolling();
    updateSelectedChoiceUI();
    syncSubmitState();
});
