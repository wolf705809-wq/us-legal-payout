"use client"; // 갤탭에서 에러 안 나게 해주는 필수 마법의 주문입니다.

import { useState } from 'react';
import LeadCaptureModal from '@/components/LeadCaptureModal';

export default function Home() {
  // 모달 창이 열려있는지(true), 닫혀있는지(false) 관리하는 스위치입니다.
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      
      {/* 메인 섹션: 안톤이 보고 감동할 깔끔한 디자인 */}
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-slate-100">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          California Settlement Calculator
        </h1>
        <p className="text-lg text-slate-500 mb-10">
          Estimate your potential payout in seconds based on 2026 California Case Law.
        </p>

        {/* 계산기 박스 (시각적 효과) */}
        <div className="bg-slate-50 rounded-2xl p-8 mb-8 border border-dashed border-slate-300">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
            Legal-Specific Engine v3.1
          </p>
          <div className="text-slate-400 italic">
            Calculator Engine Ready...
          </div>
        </div>

        {/* 🔥 바로 이 버튼이 돈을 벌어다 줄 '갈고리'입니다! */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-5 rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-200"
        >
          CALCULATE MY PAYOUT
        </button>

        <p className="mt-6 text-[10px] text-slate-400">
          © 2026 Legal Payout Estimator. Not legal advice until verified by a specialist.
        </p>
      </div>

      {/* 🚀 승제님이 만든 'S-Tier 모달'이 여기서 대기 중입니다. */}
      <LeadCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}
