(function () {
    let currentStep = 1;
    let turnstileVerified = false;
    let turnstileToken = '';
    const leadFormData = { case_type: 'truck' };

    function getStateRows() {
        const sd = globalThis.stateData;
        return sd && typeof sd === 'object' ? sd : {};
    }

    // [0.1% 디테일] 주 선택 시 화면에 '데이터 플래시' 효과를 주는 함수
    function triggerDataAuditEffect() {
        const card = document.getElementById('active-jurisdiction-card');
        if (!card) return;
        
        // 1. 기존의 '조잡한' 느낌을 지우는 정교한 스캔 라인 플래시
        card.classList.remove('scan-line-flash');
        void card.offsetWidth; // 리플로우 강제 실행 (애니메이션 재시작)
        card.classList.add('scan-line-flash');
        
        // 2. 텍스트 글리치 효과 추가 (권위 있는 엔진의 느낌)
        const stateName = document.getElementById('hero-state-name');
        if (stateName) {
            stateName.classList.remove('nodal-glitch-in');
            void stateName.offsetWidth;
            stateName.classList.add('nodal-glitch-in');
        }
    }

    // [기존 함수 튜닝] 주 선택 로직에 시각적 피드백 통합
    window.selectJurisdiction = function(key) {
        const rows = getStateRows();
        const data = rows[key];
        if (!data) return;

        // 1. 상단 내비게이션 주 이름 동기화
        const navState = document.getElementById('nav-state-name');
        if (navState) navState.innerText = `${data.auto.name} · TRUCK SPECIALIST AUDIT`;

        // 2. 메인 카드 데이터 업데이트
        document.getElementById('hero-state-name').innerText = data.auto.name;
        document.getElementById('statute-info').innerText = data.truck?.statute || data.auto.statute;
        document.getElementById('stats-info').innerText = data.truck?.doctrine || data.auto.doctrine;

        // 3. 상위 0.00001%의 데이터 시뮬레이션 효과 실행
        triggerDataAuditEffect();
    };

    // [Audit 실행 로직] 버튼 클릭 시 즉시 모달을 띄우지 않고 '분석 중'이라는 인상을 줌
    window.executeStatutoryAudit = function() {
        const btn = document.getElementById('main-cta-btn');
        const originalLabel = document.getElementById('main-cta-label');
        
        if (btn && originalLabel) {
            btn.disabled = true;
            originalLabel.innerText = "Initializing Neural Audit...";
            
            // 사용자로 하여금 "진짜 분석 중이구나"라고 느끼게 만드는 딜레이
            setTimeout(() => {
                openModal(); // 실제 모달 오픈
                btn.disabled = false;
                originalLabel.innerText = "EXECUTE STATUTORY CASE AUDIT";
            }, 850);
        }
    };

    // [기존 로직 유지 및 최적화]
    function renderStateSearchResults(query) {
        const box = document.getElementById('state-search-results');
        if (!box) return;
        const q = (query || '').trim().toLowerCase();
        if (!q) { box.classList.add('hidden'); return; }

        const sd = getStateRows();
        const matches = Object.keys(sd).filter(k => sd[k]?.auto?.name?.toLowerCase().includes(q)).slice(0, 10);
        
        box.innerHTML = matches.map(key => `
            <button type="button" data-state-key="${key}" class="state-result-btn w-full text-left px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-orange-50 transition-colors border-b border-slate-50">
                ${sd[key].auto.name}
            </button>
        `).join('');
        box.classList.remove('hidden');
    }

    // DOM 로드 시 초기화
    document.addEventListener('DOMContentLoaded', () => {
        // CTA 버튼 클릭 이벤트 바인딩 (HTML에서 onclick 대신 이걸 써도 됨)
        const cta = document.getElementById('main-cta-btn');
        if (cta) cta.setAttribute('onclick', 'executeStatutoryAudit()');

        const input = document.getElementById('state-search-input');
        if (input) {
            input.addEventListener('input', e => renderStateSearchResults(e.target.value));
        }
    });

    // 전역 함수 노출
    window.updateGauge = (delta) => {
        const gauge = document.getElementById('strength-gauge');
        if (!gauge) return;
        const now = parseFloat(gauge.style.width) || 10;
        gauge.style.width
