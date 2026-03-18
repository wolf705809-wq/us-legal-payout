import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Phone, User, ArrowRight, Loader2 } from 'lucide-react';

const LeadCaptureModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1); // 1: Form, 2: Processing, 3: Success
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [error, setError] = useState('');

  // 미국 전화번호 마스킹 (XXX-XXX-XXXX)
  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, '');
    if (phone.length < 4) return phone;
    if (phone.length < 7) return `${phone.slice(0, 3)}-${phone.slice(3)}`;
    return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length < 12) {
      setError('Please enter a valid US phone number.');
      return;
    }
    
    // 데이터 처리 (추후 안톤의 API로 연결할 지점)
    console.log("S-Tier Lead Captured:", formData);
    
    setStep(2); // 프로세싱 단계로 이동
  };

  // 심리적 장치: 전문가 연결 애니메이션
  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(3), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Header: 권위 부여 */}
        <div className="bg-[#0A192F] p-6 text-white text-center">
          <ShieldCheck className="mx-auto mb-2 h-10 w-10 text-emerald-400" />
          <h2 className="text-xl font-bold tracking-tight">FREE CASE REVIEW</h2>
          <p className="text-sm text-slate-300">SECURE & CONFIDENTIAL ANALYSIS</p>
        </div>

        <div className="p-8">
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-center text-sm font-medium text-slate-600">
                To see your full settlement estimate, please confirm your contact details.
              </p>
              
              {/* Name Input */}
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Phone Input with Masking */}
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  required
                  type="text"
                  maxLength={12}
                  placeholder="Phone (e.g. 555-555-5555)"
                  className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                />
              </div>

              {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-4 text-lg font-bold text-white transition-all hover:bg-blue-700 active:scale-95"
              >
                CONNECT WITH SPECIALIST
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Trust Triggers */}
              <div className="mt-6 border-t pt-4 text-center">
                <div className="mb-2 flex items-center justify-center gap-1 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                  <Lock className="h-3 w-3" />
                  Attorney-Client Privilege Protected
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  By clicking above, you agree to our Terms and consent to be contacted via phone/SMS for a free consultation. Data rates may apply.
                </p>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="py-10 text-center">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
              <h3 className="mt-6 text-xl font-bold text-slate-800 tracking-tight">ANALYZING CASE DETAILS</h3>
              <p className="text-sm text-slate-500">Matching with your California Specialist...</p>
              
              {/* Progress Bar: 심리적 대기 시간 부여 (가치 상승) */}
              <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="mt-2 text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">
                {loadingProgress < 100 ? 'Verification in progress...' : 'Connection established'}
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="py-10 text-center animate-in fade-in slide-in-from-bottom-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <ShieldCheck className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Application Received</h3>
              <p className="mt-3 text-slate-600">
                A California specialist has been assigned to your case. 
                <span className="block font-bold text-blue-600 mt-1">Expect a call within 5-10 minutes.</span>
              </p>
              <button
                onClick={onClose}
                className="mt-8 w-full rounded-lg bg-slate-100 py-3 font-semibold text-slate-800 hover:bg-slate-200 transition-all"
              >
                Return to Calculator
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureModal;
