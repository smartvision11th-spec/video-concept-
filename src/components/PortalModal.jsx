import React, { useState } from 'react';

export default function PortalModal({ isOpen, onClose }) {
  const [memberId, setMemberId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!memberId) return;
    setLoggedIn(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-[#131313] border border-[#b58a58] p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9c8e82] hover:text-[#eebe87] transition-colors p-1"
          aria-label="Close dialog"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div>
          <span className="font-label-sm text-[10px] sm:text-xs uppercase tracking-widest text-[#eebe87] block font-semibold">
            [ BIOMETRIC ACCESS ] // ATHLETE TERMINAL
          </span>
          <h3 className="font-headline-lg text-xl sm:text-2xl uppercase text-[#e5e2e1] tracking-wider font-bold mt-1">
            MEMBER PORTAL
          </h3>
          <p className="font-body-sm text-xs text-[#d3c4b6] mt-1 font-light leading-relaxed">
            Access your DEXA telemetry, velocity charts, and facility keycard tokens.
          </p>
        </div>

        {loggedIn ? (
          <div className="py-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#eebe87]/20 border border-[#eebe87] mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[#eebe87] text-2xl">fingerprint</span>
            </div>
            <p className="font-headline-sm text-sm sm:text-base uppercase text-[#e5e2e1] tracking-wide font-semibold">
              BIOMETRIC ID: {memberId.toUpperCase()} VERIFIED
            </p>
            <div className="p-3 bg-[#0e0e0e] border border-[#2a2a2a] text-left text-xs space-y-1.5 text-[#d3c4b6] font-mono">
              <div>// ACTIVE STATUS: VALIDATED</div>
              <div>// VELOCITY RADAR: SYNCED</div>
              <div>// NEXT DEXA AUDIT: IN 14 DAYS</div>
              <div>// KEYCARD NFC: BROADCASTING</div>
            </div>
            <button
              onClick={() => {
                setLoggedIn(false);
                onClose();
              }}
              className="w-full py-3 bg-[#b58a58] hover:bg-[#eebe87] text-[#402500] font-label-lg text-xs uppercase tracking-widest font-bold active:scale-95"
            >
              CLOSE TERMINAL
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] sm:text-[11px] font-label-sm uppercase tracking-wider text-[#9c8e82] mb-1.5">
                Biometric Keycard ID / Email
              </label>
              <input
                required
                type="text"
                placeholder="IF-80174 or member@irongym.com"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                className="w-full bg-[#1c1b1b] border border-[#2a2a2a] focus:border-[#eebe87] px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm text-[#e5e2e1] placeholder:text-[#4f453a] outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-[11px] font-label-sm uppercase tracking-wider text-[#9c8e82] mb-1.5">
                Access Passcode / PIN
              </label>
              <input
                required
                type="password"
                placeholder="••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-[#1c1b1b] border border-[#2a2a2a] focus:border-[#eebe87] px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm text-[#e5e2e1] placeholder:text-[#4f453a] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#b58a58] hover:bg-[#eebe87] text-[#402500] font-label-lg text-xs uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2 active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">lock_open</span>
              AUTHENTICATE ATHLETE
            </button>

            <p className="text-[10px] text-center text-[#9c8e82] font-mono leading-relaxed">
              Protected by 256-bit biometric hardware telemetry. Lost credentials require physical re-authentication at Reception.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
