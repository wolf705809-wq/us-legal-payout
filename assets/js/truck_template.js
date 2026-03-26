/**
 * Nodal Truck Mode - Integrated Interaction & Search v1.2
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚛 Truck template infrastructure active.");

    // --- [1] 검색 엔진 로직 추가 ---
    const searchInput = document.getElementById('state-search-input');
    const resultsContainer = document.getElementById('state-search-results');
    let truckStates = [];

    // 1-1. 검색 대상 데이터(JSON) 가져오기
    fetch('/truck_state_profiles.json')
        .then(response => response.json())
        .then(data => {
            truckStates = data;

            // Populate dossier fields on state pages (environmental risk + SOL urgency)
            try {
                const pathname = String(window.location.pathname || '');
                const m = pathname.match(/^\/truck\/([^/?#]+)/i);
                const slug = m && m[1] ? m[1] : '';
                const key = slug ? slug.toLowerCase() : '';
                const row = key ? truckStates.find((s) => String(s.state_key || '').toLowerCase() === key) : null;
                if (row) {
                    const weatherEl = document.getElementById('env-weather-factor');
                    const highwayEl = document.getElementById('env-major-highway');
                    const solEl = document.getElementById('state-sol');

                    if (weatherEl) weatherEl.textContent = row.weather_factor || '—';
                    if (highwayEl) highwayEl.textContent = row.major_highway || '—';
                    if (solEl) {
                        solEl.textContent = row.state_sol || '—';
                        const isUrgent = String(row.state_sol || '').trim().toLowerCase() === '1 year';
                        solEl.classList.toggle('sol-urgent', isUrgent);
                    }
                }
            } catch (err) {
                console.warn('State dossier injection failed:', err);
            }
        })
        .catch(err => console.error("Data sync failed:", err));

    // 1-2. 검색창에 글자를 칠 때마다 실행
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            
            if (term.length < 1) {
                resultsContainer.innerHTML = '';
                resultsContainer.classList.add('hidden');
                return;
            }

            // 검색어와 일치하는 주(State) 찾기
            const matches = truckStates.filter(s => 
                s.state_name.toLowerCase().includes(term) || 
                s.state_key.toLowerCase().includes(term)
            );

            // 결과 화면에 그리기
            if (matches.length > 0) {
                resultsContainer.innerHTML = matches.map(s => `
                    <button type="button" class="state-result-btn w-full px-5 py-4 text-left hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-none transition-colors flex justify-between items-center"
                         onclick="selectJurisdiction('${s.state_key}')">
                        <span class="font-bold text-slate-800">${s.state_name}</span>
                    </button>
                `).join('');
                resultsContainer.classList.remove('hidden');
            } else {
                resultsContainer.innerHTML = '<div class="px-5 py-4 text-sm text-slate-400">No matching node found.</div>';
                resultsContainer.classList.remove('hidden');
            }
        });
    }

    // 1-3. 검색창 바깥쪽 클릭하면 결과창 닫기
    document.addEventListener('click', (e) => {
        if (searchInput && !searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.classList.add('hidden');
        }
    });
});

/**
 * --- [2] 기존 기능 유지 ---
 */

// START STATUTORY RECOVERY AUDIT 버튼 클릭 시
function executeStatutoryAudit() {
    console.log("🚀 Audit started.");
    try { window.navigator?.vibrate?.(15); } catch { /* no-op */ }
    const modal = document.getElementById('truck-audit-modal');
    if (modal) {
        modal.classList.remove('hidden');
        // 첫 번째 단계(step-truck-1)가 보이도록 설정
        document.querySelectorAll('.modal-step').forEach(s => s.classList.add('hidden'));
        document.getElementById('step-truck-1').classList.remove('hidden');
    }
}

// 모달 닫기
function closeTruckModal() {
    const modal = document.getElementById('truck-audit-modal');
    if (modal) modal.classList.add('hidden');
}

// 5개 주 카드 또는 검색 결과 클릭 시 이동
function selectJurisdiction(stateKey) {
    if (!stateKey) return;
    try { window.navigator?.vibrate?.(15); } catch { /* no-op */ }
    const stateSlug = stateKey.toLowerCase().replace(/\s+/g, '_'); // 공백 처리
    console.log(`✈️ Redirecting to ${stateSlug.toUpperCase()}...`);
    window.location.href = `/truck/${stateSlug}`;
}

// 모달 내 선택 처리
function handleTruckChoice(key, value, nextStepId) {
    console.log(`✅ ${key}: ${value}`);
    document.querySelectorAll('.modal-step').forEach(s => s.classList.add('hidden'));
    document.getElementById(nextStepId).classList.remove('hidden');
    
    // 진행바 업데이트 (3단계 기준)
    const stepNum = nextStepId.split('-').pop();
    const progress = (stepNum / 3) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}


document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('statute-display');
    
    if (display) {
        // 1.8초(1800ms) 후에 실행 (분석하는 척하는 시간)
        setTimeout(() => {
            // 숨겨둔 실제 데이터 가져오기
            const realCode = display.getAttribute('data-real-code');
            
            // 글자 교체 및 스타일 변경
            display.innerText = realCode;
            display.classList.remove('animate-pulse', 'text-slate-400');
            display.classList.add('text-slate-200'); // 원래 밝은 색으로 복구
            
            // 선택 사항: 완료 시 살짝 '치익' 하는 느낌의 콘솔 로그
            console.log("✔️ Statutory Audit Injection Complete.");
        }, 1800); 
    }
});
