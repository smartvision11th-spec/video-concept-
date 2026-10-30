import React from 'react';

const STANDARDS = [
  {
    num: '01 //',
    title: 'EXPERIENCED COACHING',
    desc: 'Led exclusively by CSCS-certified strength directors and national Olympic medalists. Every movement cue is grounded in functional mechanics, not trends.'
  },
  {
    num: '02 //',
    title: 'STRUCTURED PERIODIZATION',
    desc: 'Programmed 12-week micro and macro cycles calibrated to your specific physiological profile. Progressive overload governed by data to eliminate plateaus.'
  },
  {
    num: '03 //',
    title: 'CALIBRATED HARDWARE',
    desc: 'Swedish competition plates, aggressive knurling on 29mm bars, custom 4x4 steel uprights. Equipment engineered to handle extreme force without deformation.'
  },
  {
    num: '04 //',
    title: 'ZERO-DISTRACTION ATMOSPHERE',
    desc: 'Strictly capped membership base. Zero cell phone tripods, no influencers, no queuing for racks. An environment dedicated entirely to focused execution.'
  }
];

export default function WhyIronSection() {
  return (
    <section className="w-full bg-[#1c1b1b] py-16 sm:py-24 lg:py-32 border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Headline */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="font-label-md text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#eebe87] block mb-2 sm:mb-3 font-semibold">
            STANDARDS &amp; CODE
          </span>
          <h2 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl uppercase text-[#e5e2e1] tracking-tight leading-none mb-4 sm:mb-6 font-bold">
            NO SHORTCUTS.<br />
            JUST PROGRESS.
          </h2>
          <p className="font-body-lg text-xs sm:text-base lg:text-lg text-[#d3c4b6] font-light leading-relaxed">
            We reject the mainstream fitness model built on high-churn memberships, crowded lobbies, and superficial trends. Our space is built around a singular philosophy: uncompromising physical capability.
          </p>
        </div>

        {/* 4 Editorial Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STANDARDS.map((std, idx) => (
            <div
              key={idx}
              className="luxury-card p-6 sm:p-8 bg-[#0e0e0e] border border-[#2a2a2a] hover:border-[#b58a58] space-y-5 sm:space-y-6 flex flex-col justify-between transition-all duration-300 group"
            >
              <div className="space-y-3 sm:space-y-4">
                <span className="font-headline-md text-lg sm:text-xl text-[#eebe87] font-mono group-hover:tracking-wider transition-all">
                  {std.num}
                </span>
                <h3 className="font-headline-md text-base sm:text-lg uppercase text-[#e5e2e1] tracking-wider font-semibold">
                  {std.title}
                </h3>
                <p className="font-body-sm text-xs sm:text-sm text-[#d3c4b6] leading-relaxed">
                  {std.desc}
                </p>
              </div>
              <div className="h-0.5 w-10 sm:w-12 bg-[#b58a58] group-hover:w-20 transition-all duration-300"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
