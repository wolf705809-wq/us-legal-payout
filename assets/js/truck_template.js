/**
 * Nodal Truck Mode - Shared Page Interaction v1.0
 * [진짜배기] 버튼 활성화 및 트럭 모달 제어 로직
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚛 Truck template loaded (Static Mode).");
});

// 버튼 변수
const modal = document.getElementById('truck-audit-modal');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const totalSteps = 3;

// 모달 데이터를 저장할 객체
let modalData = {};

/**
 * [버튼 함수] START STATUTORY RECOVERY AUDIT 클릭 시 실행
 * - truck_template.html의 버튼 onclick="executeStatutoryAudit()"과 연결됨
 */
function executeStatutoryAudit() {
    console.log("🚀 Audit started.");
    
    // 모달 데이터 초기화
    modalData = {};
    
    // 모달 창 열기
    modal.classList.remove('hidden');
    
    // 모달 CSS 애니메이션 적용 (필요시 nodal.css에 정의)
    modal.classList.add('nodal-modal-active');
    
    // 첫 단계로 이동
    nextModalStep('step-truck-1', 1);
}

/**
 * 모달 창 닫기
 */
function closeTruckModal() {
    modal.classList.add('hidden');
    modal.classList.remove('nodal-modal-active');
}

/**
 * 모달 내부에서 선택 시 실행 (차량 종류 선택 등)
 */
function handleTruckChoice(key, value, nextStepId) {
    console.log(`✅ ${key}: ${value}`);
    
    // 데이터 저장
    modalData[key] = value;
    
    // 다음 단계로 이동 (2단계는 진행률 66%)
    nextModalStep(nextStepId, parseInt(nextStepId.split('-').pop()));
}

/**
 * 이전 단계로 이동 (뒤로가기)
 */
function prevStep(prevStepId) {
    nextModalStep(prevStepId, parseInt(prevStepId.split('-').pop()));
}

/**
 * 모달의 단계와 진행바를 업데이트하는 공통 함수
 */
function nextModalStep(stepId, stepNum) {
    // 모든 단계 숨기기
    const allSteps = document.querySelectorAll('.modal-step');
    allSteps.forEach(step => step.classList.add('hidden'));
    
    // 목표 단계 보여주기
    const currentStep = document.getElementById(stepId);
    if (currentStep) {
        currentStep.classList.remove('hidden');
    }
    
    // 진행바 & 진행 텍스트 업데이트
    const progressPercent = (stepNum / totalSteps) * 100;
    if (progressBar) progressBar.style.width = `${progressPercent}%`;
    if (progressText) progressText.innerText = `Audit Progress: Step ${stepNum}/${totalSteps}`;
    
    // 모달 스크롤 맨 위로 올리기
    document.getElementById('modal-body-content').scrollTop = 0;
}
