// 설정 데이터
const TRUCK_UI_TEMPLATE = {
    hero_headline: '<STATE> 18-Wheeler Statutory Audit',
    hero_subheadline: 'When a commercial carrier is involved, every hour matters. Our FMCSA-aligned audit engine identifies liability signals...',
    cta_label: 'Generate Truck Case Valuation Report',
    value_stack: ['FMCSA Compliance Mapping', 'Carrier & Policy Layer Intelligence', 'ELD / Telematics Preservation Workflow'],
    trust_strip: 'FMCSR COMPLIANT | CERTIFIED DATA SOURCE | SECURE',
    conversion_block: 'Nodal gives you a structured federal-state analysis layer so your case starts with documented leverage.',
    legal_safe_line: 'Nodal is a legal-technology infrastructure provider, not a law firm.',
    qualifying_questions: [
        { id: 'carrier_usdot', prompt: 'Do you know the trucking company (carrier) name?' },
        { id: 'eld_preservation', prompt: 'Should we prioritize ELD / telematics preservation?' },
        { id: 'commercial_policy_layer', prompt: 'Was this a 18-wheeler or commercial semi-truck?' }
    ]
};

// 상태 관리 변수
let currentScore = 10;
let currentState = 'california';
let leadFormData = {};
let turnstileVerified = false;
let turnstileToken = '';
let caseMode = 'auto'; // 기본값

// [중요] 현재 페이지가 트럭 페이지인지 확인하는 함수
function detectMode() {
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    
    // 주소창에 /truck/ 이 들어있거나 type=truck 파라미터가 있으면 트럭모드
    if (path.includes('/truck/') || urlParams.get('type') === 'truck') {
        caseMode = 'truck';
    } else {
        caseMode = 'auto';
    }
}

// UI 업데이트 로직 (기존 기능 유지 + 트럭 대응)
function applyStateData(key) {
    if (!typeof stateData !== 'undefined' || !stateData[key]) return;
    
    currentState = key;
    const d = stateData[key][caseMode] || stateData[key].auto;
    
    // 트럭 페이지일 때만 실행되는 UI 변경
    if (caseMode === 'truck') {
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) heroTitle.innerText = `${d.name} 18-Wheeler Statutory Audit`;
        
        // 트럭 전용 질문 셋팅
        const qCarrier = document.getElementById('truck-q-carrier');
        if (qCarrier) qCarrier.innerText = TRUCK_UI_TEMPLATE.qualifying_questions[0].prompt;
    }
    
    // 공통 UI 업데이트 (안전하게 존재 여부 확인 후 실행)
    const navState = document.getElementById('nav-state-name');
    if (navState) navState.innerText = `${d.name} ${caseMode === 'truck' ? 'Truck' : 'Case'} Audit Division`;
    
    const heroState = document.getElementById('hero-state-name');
    if (heroState) heroState.innerText = d.name;

    leadFormData.state = d.name;
    leadFormData.case_type = caseMode;
}

// 모달 제어
function openModal() {
    const modal = document.getElementById('leadModal');
    if (modal) modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // 트럭 모드면 트럭 첫 질문으로, 아니면 일반 질문으로
    const startStep = (caseMode === 'truck') ? 'step-1' : 'step-1'; 
    nextStep(startStep, { recordHistory: false });
}

function closeModal() {
    const modal = document.getElementById('leadModal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// 단계 이동 (기존 로직 유지)
let stepHistory = [];
function nextStep(s, options = {}) {
    const targetId = s.startsWith('step-') ? s : `step-${s}`;
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    document.querySelectorAll('.step-container').forEach(el => el.classList.add('hidden'));
    targetEl.classList.remove('hidden');
    if (options.recordHistory !== false) stepHistory.push(targetId);
}

// 최종 제출
function submitFinalLead(e) {
    e.preventDefault();
    if (!turnstileVerified) { alert('Security check required.'); return; }
    
    // 데이터 수집
    leadFormData.fName = document.getElementById('fName')?.value;
    leadFormData.lName = document.getElementById('lName')?.value;
    leadFormData.phone = document.getElementById('userPhone')?.value;
    
    console.log('Final Data:', leadFormData);
    window.location.href = '/success.html';
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    detectMode(); // 1. 모드 감지
    
    // 2. 현재 경로에서 주(State) 이름 추출 (예: /truck/alabama -> alabama)
    const pathParts = window.location.pathname.split('/').filter(p => p);
    const stateInPath = pathParts[pathParts.length - 1];
    
    if (stateInPath && typeof stateData !== 'undefined' && stateData[stateInPath]) {
        applyStateData(stateInPath);
    } else {
        applyStateData('california'); // 기본값
    }

    // 전화번호 포맷팅 등 기타 이벤트 리스너 생략 (기존 것 유지 가능)
});

// Turnstile 콜백용 전역 함수
window.onTurnstileVerified = (token) => {
    turnstileToken = token;
    turnstileVerified = true;
    const btn = document.getElementById('submit-btn');
    if (btn) btn.disabled = false;
};
