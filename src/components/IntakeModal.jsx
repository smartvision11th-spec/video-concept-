import React, { useState, useEffect } from 'react';

export default function IntakeModal({ isOpen, onClose, initialTier = 'Performance', initialMode = 'membership' }) {
  const [tier, setTier] = useState(initialTier);
  const [mode, setMode] = useState(initialMode); // 'membership' | 'tour' | 'evaluation'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    setTier(initialTier);
    setMode(initialMode);
    setConfirmed(false);
  }, [initialTier, initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#131313] border border-[#b58a58] p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9c8e82] hover:text-[#eebe87] transition-colors p-1"
          aria-label="Close dialog"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {confirmed ? (
          <div className="py-6 sm:py-8 text-center space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#b58a58]/20 border border-[#b58a58] mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[#eebe87] text-3xl">done_all</span>
            </div>
            <h3 className="font-headline-lg text-xl sm:text-2xl uppercase text-[#e5e2e1] tracking-wider font-bold">
              REQUEST REGISTERED
            </h3>
            <p className="font-body-sm text-xs sm:text-sm text-[#d3c4b6] max-w-md mx-auto leading-relaxed">
              Your intake dossier for <span className="text-[#eebe87] font-semibold">{tier}</span> has been logged. Our Admissions Director will confirm your biometric onboarding details via {email}.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 sm:px-8 py-3 bg-[#b58a58] hover:bg-[#eebe87] text-[#402500] font-label-lg text-xs uppercase tracking-widest font-bold active:scale-95"
            >
              RETURN TO SANCTUARY
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <span className="font-label-sm text-[10px] sm:text-xs uppercase tracking-widest text-[#eebe87] block font-semibold">
                [ ADMISSIONS GATEWAY ] // STRICT ENCLAVE
              </span>
              <h3 className="font-headline-lg text-xl sm:text-2xl uppercase text-[#e5e2e1] tracking-wider font-bold mt-1">
                {mode === 'tour' ? 'BOOK PRIVATE FACILITY TOUR' : mode === 'evaluation' ? 'REQUEST INTRODUCTORY EVALUATION' : 'MEMBERSHIP ADMISSION APPLICATION'}
              </h3>
            </div>

            {/* Tier Select */}
            <div>
              <label className="block text-[10px] sm:text-[11px] font-label-sm uppercase tracking-wider text-[#9c8e82] mb-1.5">
                Target Membership Tier
              </label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="w-full bg-[#1c1b1b] border border-[#2a2a2a] focus:border-[#eebe87] px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-[#e5e2e1] outline-none"
              >
                <option value="Essential">Tier 01 // Essential ($195/mo)</option>
                <option value="Performance">Tier 02 // Performance ($320/mo) - Core Athlete</option>
                <option value="Elite">Tier 03 // Elite ($550/mo) - Bespoke Mentorship</option>
              </select>
            </div>

            {/* Applicant Details */}
            <div>
              <label className="block text-[10px] sm:text-[11px] font-label-sm uppercase tracking-wider text-[#9c8e82] mb-1.5">
                Full Name *
              </label>
              <input
                required
                type="text"
                placeholder="Marcus Aurelius"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#1c1b1b] border border-[#2a2a2a] focus:border-[#eebe87] px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-[#e5e2e1] placeholder:text-[#4f453a] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[10px] sm:text-[11px] font-label-sm uppercase tracking-wider text-[#9c8e82] mb-1.5">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  placeholder="athlete@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1c1b1b] border border-[#2a2a2a] focus:border-[#eebe87] px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-[#e5e2e1] placeholder:text-[#4f453a] outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] sm:text-[11px] font-label-sm uppercase tracking-wider text-[#9c8e82] mb-1.5">
                  Preferred Contact Phone
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#1c1b1b] border border-[#2a2a2a] focus:border-[#eebe87] px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-[#e5e2e1] placeholder:text-[#4f453a] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] sm:text-[11px] font-label-sm uppercase tracking-wider text-[#9c8e82] mb-1.5">
                Preferred Evaluation / Visit Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#1c1b1b] border border-[#2a2a2a] focus:border-[#eebe87] px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs text-[#e5e2e1] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 sm:py-4 bg-[#b58a58] hover:bg-[#eebe87] text-[#402500] font-label-lg text-xs uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <span>SUBMIT FOR ADMISSION REVIEW</span>
              <span className="material-symbols-outlined text-[16px]">north_east</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
