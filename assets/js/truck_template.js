/**
 * Nodal Truck Mode - Shared Page Interaction v1.0
 * [진짜배기] 버튼 활성화 및 검색 제어 로직
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚛 Truck template loaded (Static Mode).");
});

/**
 * [버튼 함수] START STATUTORY RECOVERY AUDIT 클릭 시 실행
 * - truck_template.html의 버튼 onclick="executeStatutoryAudit()"과 연결됨
 */
function executeStatutoryAudit() {
    console.log("🚀 Audit started.");
    
    // 모달 데이터를 저장할 객체 초기화 (데이터 pipeline 용)
    window.modalData = {};
    
    // 모달 창 열기
    openModal('step-1', 1);
}

/**
 * [검색 함수] 5개 주 카드 클릭 시 해당 트럭 페이지로 이동
 */
function selectJurisdiction(stateKey) {
    if (!stateKey) return;
    
    // URL을 /truck/texas 형식으로 만듭니다. (파이썬이 생성한 형식)
    const stateSlug = stateKey.toLowerCase();
    
    console.log(`✈️ Redirecting to ${stateSlug.toUpperCase()} Statutory Audit...`);
    window.location.href = `/truck/${stateSlug}`;
}

// 모달 및 단계별 제어 함수 (필요시 기존 코드 통합)
function openModal(stepId, stepNum) {
    console.log(`Opening modal at ${stepId}...`);
    // 모달 UI 제어 로직 (기존 successModal 등을 여기로 통합 가능)
}
