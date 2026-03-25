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

    // Modal logic is intentionally NOT overridden here.
    // Truck pages use the shared `assets/js/app.js` modal engine for stability.

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
