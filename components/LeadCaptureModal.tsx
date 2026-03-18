"use client";
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Phone, User, ArrowRight, Loader2 } from 'lucide-react';

const LeadCaptureModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [error, setError] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length < 12) {
      setError('Please enter a valid US phone number.');
      return;
    }
    console.log("S-Tier Lead Captured:", formData);
    setStep(2);
  };

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-slate-900">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="bg-[#0A192F] p-6 text-white text-center">
          <ShieldCheck className="mx-auto mb-2 h-10 w-10 text-emerald-400" />
          <h2 className="text-xl font-bold tracking-tight uppercase leading-tight">Free Case Review</h2>
          <p className="text-[10px] text-slate-300 tracking-widest uppercase mt-1">Secure & Confidential</p>
        </div>
        <div className="p-8">
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Full Name" className="w-full rounded-lg border p-4 outline-none focus:border-blue-600 transition-all" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input required type="text" maxLength={12} placeholder="Phone: 555-555-5555" className="w-full rounded-lg border p-4 outline-none focus:border-blue-600 transition-all" value={formData.phone} onChange={handlePhoneChange} />
              {error && <p className="text-xs text-red-500 font-bold">{error}</p>}
              <button type="submit" className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95">CONNECT WITH SPECIALIST</button>
              <div className="text-center text-[10px] text-slate-400 uppercase tracking-widest mt-6">
                <Lock className="inline h-3 w-3 mr-1" /> Attorney-Client Privilege Protected
              </div>
            </form>
          )}
          {step === 2 && (
            <div className="py-10 text-center">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
              <h3 className="mt-6 font-bold text-slate-800 text-lg uppercase tracking-tight">Analyzing Case Details</h3>
              <p className="text-sm text-slate-500 mt-2">Connecting with California Specialist...</p>
              <div className="mt-8 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${loadingProgress}%` }} />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="py-10 text-center">
              <ShieldCheck className="mx-auto h-16 w-16 text-emerald-600 mb-4" />
              <h3 className="text-2xl font-bold text-slate-900">Application Received</h3>
              <p className="mt-2 text-slate-600 font-medium">Expect a call within 5-10 minutes.</p>
              <button onClick={onClose} className="mt-10 w-full rounded-xl bg-slate-100 py-4 font-bold text-slate-800 hover:bg-slate-200 transition-all">RETURN TO CALCULATOR</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureModal;
