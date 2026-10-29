import React from 'react';

export default function MaximBanner({ onOpenIntake }) {
  return (
    <section className="relative w-full py-28 sm:py-36 bg-[#0e0e0e] overflow-hidden border-b border-[#2a2a2a]">
      {/* Texture Backdrop */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-25"
          style={{
            backgroundImage: "url('/banner-barbell-knurl.jpg')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/85 to-[#0e0e0e]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
        <span className="font-label-md text-xs uppercase tracking-[0.3em] text-[#eebe87] block mb-6 font-semibold">
          FOUNDATIONAL MAXIM // 05
        </span>
        
        <h2 className="font-display-xl text-3xl sm:text-5xl lg:text-7xl uppercase text-[#e5e2e1] tracking-tight leading-none mb-8 font-bold">
          YOUR ONLY COMPETITION<br />
          <span className="text-[#b58a58]">IS WHO YOU WERE.</span>
        </h2>
        
        <p className="font-body-lg text-sm sm:text-base lg:text-lg text-[#d3c4b6] max-w-2xl font-light leading-relaxed mb-10">
          The barbell does not negotiate. It does not validate ego or care for excuses. It reflects with absolute fidelity the exact measure of preparation and disciplined effort you bring to it.
        </p>
        
        <button
          onClick={() => onOpenIntake('evaluation')}
          className="inline-flex items-center justify-center bg-[#b58a58] hover:bg-[#eebe87] text-[#402500] font-label-lg text-xs tracking-widest uppercase px-10 py-4 transition-all duration-200 font-bold shadow-lg"
        >
          REQUEST INTRODUCTORY EVALUATION
          <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
        </button>
      </div>
    </section>
  );
}
