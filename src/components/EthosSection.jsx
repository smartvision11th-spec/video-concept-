import React from 'react';

export default function EthosSection() {
  return (
    <section id="philosophy" className="w-full bg-[#0e0e0e] py-16 sm:py-24 lg:py-32 border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Display Anchor */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 text-[#eebe87] font-label-md text-xs uppercase tracking-[0.2em] font-semibold">
              <span className="w-1.5 h-1.5 bg-[#eebe87]"></span>
              [ 01 / ETHOS ]
            </div>
            
            <h2 className="font-display-xl text-3xl sm:text-5xl lg:text-6xl uppercase text-[#e5e2e1] tracking-tight leading-none font-bold">
              STRENGTH<br />
              IS EARNED.
            </h2>
            
            <div className="w-12 sm:w-16 h-1 bg-[#b58a58]"></div>
            
            <p className="font-body-sm text-xs sm:text-sm text-[#9c8e82] uppercase tracking-widest pt-1 sm:pt-2">
              Zero mirrors. Zero shortcuts. Pure mechanical truth.
            </p>
          </div>

          {/* Right Column: Manifesto Copy & Architectural Block */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <p className="font-body-lg text-sm sm:text-base lg:text-lg text-[#e5e2e1] leading-relaxed font-light">
              True physical resilience is forged in silence and sustained by relentless consistency. At IRON, we strip away the noise of modern fitness fads to return to uncompromised mechanical mastery, calibrated periodization, and unapologetic physical effort.
            </p>

            {/* Quote Block */}
            <div className="p-4 sm:p-6 lg:p-8 bg-[#1c1b1b] border-l-2 border-[#b58a58] space-y-4">
              <p className="font-body-md text-xs sm:text-sm lg:text-base text-[#d3c4b6] italic leading-relaxed">
                "We do not build our sanctuary to entertain. We build it to endure. Every barbell knurling, rubber platform, and recovery protocol is calibrated to remove friction between human will and structural hypertrophy."
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-[#2a2a2a] gap-2">
                <div>
                  <p className="font-headline-sm text-sm sm:text-base uppercase text-[#e5e2e1] tracking-wider font-semibold">
                    MARCUS V. ROTH
                  </p>
                  <p className="font-label-sm text-[10px] sm:text-[11px] uppercase tracking-widest text-[#eebe87]">
                    Head Director of Athletic Performance // CSCS*D
                  </p>
                </div>
                <span className="font-headline-md text-xs sm:text-sm tracking-widest text-[#4f453a] font-mono">
                  01 // PROTOCOL
                </span>
              </div>
            </div>

            {/* Grid of Three Pillar Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-2 sm:pt-4">
              <div className="space-y-1.5 sm:space-y-2 border-t border-[#2a2a2a] pt-3 sm:pt-4">
                <span className="font-headline-sm text-base sm:text-lg text-[#eebe87] uppercase font-bold tracking-wider block">
                  01. GRAVITY
                </span>
                <p className="font-body-sm text-xs text-[#d3c4b6] leading-relaxed">
                  The iron never lies. Unbroken feedback loops calibrate posture and power output.
                </p>
              </div>

              <div className="space-y-1.5 sm:space-y-2 border-t border-[#2a2a2a] pt-3 sm:pt-4">
                <span className="font-headline-sm text-base sm:text-lg text-[#eebe87] uppercase font-bold tracking-wider block">
                  02. METRIC
                </span>
                <p className="font-body-sm text-xs text-[#d3c4b6] leading-relaxed">
                  Every load recorded. Velocity transducers track barbell speed down to millimeters per second.
                </p>
              </div>

              <div className="space-y-1.5 sm:space-y-2 border-t border-[#2a2a2a] pt-3 sm:pt-4">
                <span className="font-headline-sm text-base sm:text-lg text-[#eebe87] uppercase font-bold tracking-wider block">
                  03. LONGEVITY
                </span>
                <p className="font-body-sm text-xs text-[#d3c4b6] leading-relaxed">
                  Structural durability over fleeting exhaustion. Tendon health prioritised alongside peak force.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
