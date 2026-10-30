import React, { useState } from 'react';

export default function IntakeSection({ onOpenIntake }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    discipline: 'Strength & Conditioning',
    experienceYears: '1-3 years',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;
    setSubmitted(true);
  };

  return (
    <section id="intake" className="w-full bg-[#0e0e0e] py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="border border-[#2a2a2a] bg-[#1c1b1b] p-5 sm:p-8 lg:p-16 relative overflow-hidden">
          
          {/* Decorative Ambient Wireframe Graphic (Subtle) */}
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 translate-x-12 translate-y-12">
            <svg fill="none" height="400" stroke="currentColor" viewBox="0 0 100 100" width="400">
              <circle cx="50" cy="50" r="45" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="30" strokeWidth="0.5" />
              <line strokeWidth="0.5" x1="5" x2="95" y1="50" y2="50" />
              <line strokeWidth="0.5" x1="50" x2="50" y1="5" y2="95" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
            {/* Left Column Narrative */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <span className="font-label-md text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#eebe87] block font-semibold">
                [ INITIATE INTAKE ] // ADMISSIONS OPEN
              </span>
              <h2 className="font-display-xl text-2xl sm:text-4xl lg:text-5xl uppercase text-[#e5e2e1] tracking-tight leading-none font-bold">
                YOUR NEXT REP<br />
                <span className="text-[#b58a58]">STARTS HERE.</span>
              </h2>
              <p className="font-body-lg text-xs sm:text-base text-[#d3c4b6] font-light leading-relaxed max-w-xl">
                Schedule your introductory biomechanical intake and private facility walk-through. Admissions are reviewed on a rolling weekly basis to protect active member density.
              </p>

              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => onOpenIntake('tour')}
                  className="inline-flex items-center justify-center bg-transparent hover:bg-[#201f1f] text-[#e5e2e1] hover:text-[#eebe87] font-label-lg text-xs tracking-widest uppercase px-6 py-3.5 border border-[#4f453a] hover:border-[#b58a58] transition-all font-semibold active:scale-95"
                >
                  <span className="material-symbols-outlined mr-2 text-[18px]">calendar_today</span>
                  BOOK PRIVATE TOUR
                </button>
              </div>

              <div className="pt-6 sm:pt-8 border-t border-[#2a2a2a] flex flex-wrap items-center gap-4 sm:gap-6 font-label-sm text-[10px] sm:text-[11px] uppercase tracking-widest text-[#9c8e82]">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#eebe87]"></span>
                  IMMEDIATE 48-HR RESPONSE
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#eebe87]"></span>
                  NO COMMITMENT EVALUATION
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#eebe87]"></span>
                  STRICT CAPACITY ENFORCED
                </span>
              </div>
            </div>

            {/* Right Column: Direct Intake Submission Form */}
            <div className="lg:col-span-6 bg-[#0e0e0e] border border-[#2a2a2a] p-5 sm:p-8">
              {submitted ? (
                <div className="text-center py-8 sm:py-12 space-y-4 animate-in fade-in">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#eebe87]/20 border border-[#eebe87] mx-auto flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#eebe87] text-2xl sm:text-3xl">check</span>
                  </div>
                  <h3 className="font-headline-md text-lg sm:text-xl uppercase text-[#e5e2e1] tracking-wider font-semibold">
                    INTAKE DOSSIER RECEIVED
                  </h3>
                  <p className="font-body-sm text-xs text-[#d3c4b6] max-w-sm mx-auto leading-relaxed">
                    Director Marcus V. Roth will review your background and reach out at <span className="text-[#eebe87] font-mono break-all">{formData.email}</span> within 48 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-label-sm text-[#eebe87] uppercase tracking-widest hover:underline"
                  >
                    SUBMIT ANOTHER PROFILE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <span className="font-label-sm text-[11px] sm:text-xs uppercase tracking-widest text-[#eebe87] block font-semibold">
                    CONFIDENTIAL APPLICANT INTAKE
                  </span>
                  
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-label-sm uppercase tracking-wider text-[#9c8e82] mb-1.5">
                      Full Legal Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Vance Montgomery"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#1c1b1b] border border-[#2a2a2a] focus:border-[#eebe87] px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-[#e5e2e1] placeholder:text-[#4f453a] outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-label-sm uppercase tracking-wider text-[#9c8e82] mb-1.5">
                        Direct Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="vance@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#1c1b1b] border border-[#2a2a2a] focus:border-[#eebe87] px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-[#e5e2e1] placeholder:text-[#4f453a] outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-label-sm uppercase tracking-wider text-[#9c8e82] mb-1.5">
                        Mobile Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#1c1b1b] border border-[#2a2a2a] focus:border-[#eebe87] px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-[#e5e2e1] placeholder:text-[#4f453a] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-label-sm uppercase tracking-wider text-[#9c8e82] mb-1.5">
                        Primary Focus
                      </label>
                      <select
                        value={formData.discipline}
                        onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                        className="w-full bg-[#1c1b1b] border border-[#2a2a2a] focus:border-[#eebe87] px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs text-[#e5e2e1] outline-none transition-colors"
                      >
                        <option>Strength & Conditioning</option>
                        <option>Personal 1-on-1 Coaching</option>
                        <option>Functional & Hyrox</option>
                        <option>Recovery & Longevity</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-label-sm uppercase tracking-wider text-[#9c8e82] mb-1.5">
                        Lifting Background
                      </label>
                      <select
                        value={formData.experienceYears}
                        onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                        className="w-full bg-[#1c1b1b] border border-[#2a2a2a] focus:border-[#eebe87] px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs text-[#e5e2e1] outline-none transition-colors"
                      >
                        <option>Novice (0 - 1 Years)</option>
                        <option>Intermediate (1 - 3 Years)</option>
                        <option>Advanced (3 - 6 Years)</option>
                        <option>Elite / Competitive (6+ Years)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 sm:py-4 bg-[#b58a58] hover:bg-[#eebe87] text-[#402500] font-label-lg text-xs uppercase tracking-widest font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>SUBMIT ADMISSIONS APPLICATION</span>
                    <span className="material-symbols-outlined text-[16px]">north_east</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
