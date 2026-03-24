const MASTER_DB = {
    california: { name: 'California', statute: 'CA Civ. Code § 1714', law_type: 'Pure Comparative Negligence' },
    texas: { name: 'Texas', statute: 'TX Civ. Prac. § 33.001', law_type: 'Proportionate Responsibility' },
    florida: { name: 'Florida', statute: 'Fla. Stat. § 768.81', law_type: 'Modified Comparative Fault' },
    georgia: { name: 'Georgia', statute: 'O.C.G.A. § 51-12-33', law_type: 'Modified Comparative Fault' },
    new_york: { name: 'New York', statute: 'CPLR § 1411', law_type: 'Pure Comparative Negligence' },
    atlanta: { name: 'Atlanta', statute: 'O.C.G.A. § 51-12-33', law_type: 'Modified Comparative Fault' },
};

let currentScore = 10;
let currentState = 'california';
let leadFormData = {};
let turnstileVerified = false;
let turnstileToken = '';

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
    if (!MASTER_DB[key]) return;

    currentState = key;
    const d = MASTER_DB[key];

    document.title = `${d.name} High-Value Case Evaluation | JDS Global`;

    const navName = document.getElementById('nav-state-name');
    if (navName) navName.innerText = `${d.name} Case Audit Division`;

    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        heroTitle.innerHTML =
            'Calculate Your <span class="gold-text">Case Value</span> & Recovery Potential';
    }

    const inlineState = document.getElementById('hero-state-name-inline');
    if (inlineState) inlineState.innerText = d.name;

    document.getElementById('hero-state-name').innerText = d.name;
    document.getElementById('statute-info').innerText = d.statute;
    document.getElementById('stats-info').innerText = d.law_type;

    leadFormData.state = d.name;
}

function startAudit(s) {
    window.history.pushState({}, '', `/${s}`);
    applyStateData(s);
    openModal();
}

function openModal() {
    document.getElementById('leadModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('leadModal').classList.add('hidden');
    document.body.style.overflow = '';
}

function handleSelect(key, val, next, feedback, bonus) {
    leadFormData[key] = val;
    currentScore = Math.min(95, currentScore + bonus);
    document.getElementById('strength-gauge').style.width = `${currentScore}%`;
    const fbBox = document.getElementById('ai-feedback-box');
    document.getElementById('ai-feedback-text').innerText = `AI INSIGHT: ${feedback}`;
    fbBox.classList.remove('hidden');
    setTimeout(() => nextStep(next), 600);
}

function nextStep(s) {
    document.querySelectorAll('.step-container').forEach((el) => el.classList.add('hidden'));
    document.getElementById(`step-${s}`).classList.remove('hidden');
}

function analyzeText() {
    const text = document.getElementById('narrative-box').value.toLowerCase();
    const badges = document.getElementById('keyword-badges');
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
}


async function submitFinalLead(e) {
    e.preventDefault();
    const tcpa = document.getElementById('tcpa');
    if (!tcpa || !tcpa.checked) {
        alert('FCC 규정에 따라 1:1 매칭 동의가 반드시 필요합니다.');
        return;
    }
    if (!turnstileVerified) {
        alert('보안 확인을 완료해 주세요.');
        return;
    }

    if (e.target && typeof e.target.checkValidity === 'function' && !e.target.checkValidity()) {
        e.target.reportValidity();
        return;
    }

    leadFormData.fName = document.getElementById('fName').value;
    leadFormData.lName = document.getElementById('lName').value;
    leadFormData.email = document.getElementById('email').value;
    leadFormData.phone = document.getElementById('userPhone').value;
    leadFormData.narrative = document.getElementById('narrative-box').value;

    leadFormData.tcpa_checked = true;
    leadFormData['cf-turnstile-response'] = turnstileToken;
    leadFormData.turnstileToken = turnstileToken;

    document.getElementById('step-8').classList.add('hidden');
    document.getElementById('step-scan').classList.remove('hidden');

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
    const path = window.location.pathname.replace(/^\//, '').toLowerCase();
    if (path && MASTER_DB[path]) {
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
        });
    }

    const tcpaEl = document.getElementById('tcpa');
    if (tcpaEl) tcpaEl.addEventListener('change', syncSubmitState);
    syncSubmitState();
});
