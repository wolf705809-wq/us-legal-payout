(function () {
    let currentStep = 1;
    let turnstileVerified = false;
    let turnstileToken = '';
    const LOCAL_LEADS_KEY = 'caseAuditLocalLeads.v1';
    const leadFormData = {
        case_type: 'truck',
    };

    function getStateRows() {
        const sd = globalThis.stateData;
        return sd && typeof sd === 'object' ? sd : {};
    }

    let stateKeysCache = null;
    function getStateKeys() {
        if (stateKeysCache) return stateKeysCache;
        const sd = getStateRows();
        const keys = Object.keys(sd);
        if (!keys.length) return [];
        stateKeysCache = keys.sort((a, b) =>
            (sd[a].auto.name || '').localeCompare(sd[b].auto.name || '')
        );
        return stateKeysCache;
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
            box.innerHTML =
                '<div class="px-4 py-3 text-xs font-semibold text-slate-400">No matching state found</div>';
            box.classList.remove('hidden');
            return;
        }

        box.innerHTML = matches
            .map(
                (key) =>
                    `<button type="button" data-state-key="${key}" class="state-result-btn w-full text-left px-4 py-3 text-sm font-semibold text-slate-700">${sd[key].auto.name}</button>`
            )
            .join('');
        box.classList.remove('hidden');
    }

    window.selectJurisdiction = function selectJurisdiction(stateKey) {
        const rows = getStateRows();
        if (!rows[stateKey]) return;
        const path = `/truck/${stateKey}/`;
        const cur = (window.location.pathname || '/').replace(/\/$/, '') || '/';
        const target = path.replace(/\/$/, '');
        if (cur === target) return;
        window.location.href = path;
    };

    function showStep(stepNum) {
        document.querySelectorAll('.step-container').forEach((el) => el.classList.add('hidden'));
        const target = document.getElementById(`step-${stepNum}`);
        if (target) {
            target.classList.remove('hidden');
            currentStep = stepNum;
        }
    }

    function syncSubmitState() {
        const submitBtn = document.getElementById('submit-btn');
        const tcpa = document.getElementById('tcpa');
        if (!submitBtn) return;
        const enabled = !!tcpa?.checked && turnstileVerified;
        submitBtn.disabled = !enabled;
        submitBtn.classList.toggle('opacity-50', !enabled);
        submitBtn.classList.toggle('cursor-not-allowed', !enabled);
    }

    function updateGauge(delta) {
        const gauge = document.getElementById('strength-gauge');
        if (!gauge) return;
        const now = parseFloat(gauge.style.width || '10') || 10;
        const next = Math.max(10, Math.min(95, now + delta));
        gauge.style.width = `${next}%`;
    }

    function showInsight(text) {
        const box = document.getElementById('ai-feedback-box');
        const label = document.getElementById('ai-feedback-text');
        if (!box || !label) return;
        label.textContent = `AI INSIGHT: ${text}`;
        box.classList.remove('hidden');
    }

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

    window.openInsightModal = function openInsightModal(kind) {
        const modal = document.getElementById('insightModal');
        const title = document.getElementById('insight-modal-title');
        const body = document.getElementById('insight-modal-body');
        const content = INSIGHT_CONTENT[kind];
        if (!modal || !title || !body || !content) return;
        title.innerText = content.title;
        body.innerText = content.body;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    window.closeInsightModal = function closeInsightModal() {
        const modal = document.getElementById('insightModal');
        if (!modal) return;
        modal.classList.add('hidden');
        const leadOpen = document.getElementById('leadModal');
        if (!leadOpen || leadOpen.classList.contains('hidden')) {
            document.body.style.overflow = '';
        }
    };

    window.openModal = function openModal() {
        const modal = document.getElementById('leadModal');
        if (!modal) return;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        showStep(1);
    };

    window.closeModal = function closeModal() {
        const modal = document.getElementById('leadModal');
        if (!modal) return;
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    };

    window.nextStep = function nextStep(stepNum) {
        showStep(Number(stepNum));
    };

    window.prevStep = function prevStep() {
        if (currentStep <= 1) {
            window.closeModal();
            return;
        }
        showStep(currentStep - 1);
    };

    window.handleSelect = function handleSelect(key, val, next, feedback, bonus) {
        leadFormData[key] = val;
        updateGauge(Number(bonus || 0));
        showInsight(feedback || 'Truck evidence profile updated.');
        setTimeout(() => showStep(Number(next)), 250);
    };

    window.onTurnstileVerified = function onTurnstileVerified(token) {
        turnstileToken = token || '';
        turnstileVerified = !!turnstileToken;
        syncSubmitState();
    };

    window.onTurnstileExpired = function onTurnstileExpired() {
        turnstileToken = '';
        turnstileVerified = false;
        syncSubmitState();
    };

    window.submitFinalLead = function submitFinalLead(event) {
        event.preventDefault();
        const tcpa = document.getElementById('tcpa');
        if (!tcpa?.checked) {
            alert('Express written consent is required before submitting your case.');
            return;
        }
        if (!turnstileVerified) {
            alert('Please complete the security verification.');
            return;
        }

        leadFormData.fName = document.getElementById('fName')?.value || '';
        leadFormData.lName = document.getElementById('lName')?.value || '';
        leadFormData.email = document.getElementById('email')?.value || '';
        leadFormData.phone = document.getElementById('userPhone')?.value || '';
        leadFormData.narrative = '';
        leadFormData.state = document.getElementById('hero-state-name')?.textContent?.trim() || '';
        leadFormData.type = 'Truck';
        leadFormData.fault = 'unknown';
        leadFormData.med = 'unknown';
        leadFormData.police = 'unknown';
        leadFormData.atty = 'unknown';
        leadFormData['cf-turnstile-response'] = turnstileToken;
        leadFormData.turnstileToken = turnstileToken;
        leadFormData.tcpa_checked = true;

        const step5 = document.getElementById('step-5');
        if (step5) step5.classList.add('hidden');
        const body = document.getElementById('modalBody');
        if (body) {
            const loading = document.createElement('div');
            loading.className = 'py-10 text-center text-slate-700 font-semibold';
            loading.textContent = 'Analyzing Federal FMCSA Compliance...';
            body.appendChild(loading);
        }

        try {
            const prev = JSON.parse(localStorage.getItem(LOCAL_LEADS_KEY) || '[]');
            const queue = Array.isArray(prev) ? prev : [];
            queue.push({ ...leadFormData, submittedAt: new Date().toISOString(), source: 'truck_pseo' });
            localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(queue.slice(-100)));
            window.location.href = '/success.html';
        } catch (err) {
            console.error(err);
            window.location.href = '/success.html';
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        const tcpa = document.getElementById('tcpa');
        if (tcpa) tcpa.addEventListener('change', syncSubmitState);
        syncSubmitState();

        const stateSearchInput = document.getElementById('state-search-input');
        const stateResults = document.getElementById('state-search-results');
        const rows = getStateRows();
        const hero = document.getElementById('hero-state-name');
        if (stateSearchInput && hero?.textContent?.trim()) {
            const name = hero.textContent.trim();
            const key = Object.keys(rows).find((k) => rows[k]?.auto?.name === name);
            if (key) stateSearchInput.value = name;
        }

        if (stateSearchInput && stateResults) {
            stateSearchInput.addEventListener('focus', (e) => renderStateSearchResults(e.target.value));
            stateSearchInput.addEventListener('input', (e) => renderStateSearchResults(e.target.value));

            stateResults.addEventListener('click', (e) => {
                const btn = e.target.closest('button[data-state-key]');
                if (!btn) return;
                const key = btn.getAttribute('data-state-key');
                if (!key || !rows[key]) return;
                stateSearchInput.value = rows[key].auto.name;
                window.selectJurisdiction(key);
                stateResults.classList.add('hidden');
            });

            document.addEventListener('click', (e) => {
                if (e.target === stateSearchInput || stateResults.contains(e.target)) return;
                stateResults.classList.add('hidden');
            });
        }
    });
})();
