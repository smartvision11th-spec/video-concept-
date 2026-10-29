import React, { useState } from 'react';

const DISCIPLINES = [
  {
    id: '01',
    title: 'STRENGTH & CONDITIONING',
    subtitle: 'PILLAR 01',
    image: '/discipline-strength.jpg',
    desc: 'Olympic lifting, heavy barbell periodization, and calibrated velocity-based training protocols engineered for max power generation.',
    spec: '3x Weekly Heavy Blocks // Custom Barbell Platforms',
    equipment: ['Eleiko IPF Power Bars', 'Solid Oak Drop Platforms', 'GymAware Velocity Units'],
    targetAudience: 'Lifters, Powerlifters, Field Athletes seeking maximal rate of force development.'
  },
  {
    id: '02',
    title: 'PERSONAL TRAINING',
    subtitle: 'PILLAR 02',
    image: '/discipline-coaching.jpg',
    desc: '1-on-1 biomechanical diagnostics, personalized force-curve programming, and clinical-grade nutritional biochemistry oversight.',
    spec: 'Dedicated Master Coach // Bi-weekly DEXA Diagnostics',
    equipment: ['Force Decks Dual Plates', '3D Kinematic Tracking', 'DEXA Body Composition'],
    targetAudience: 'High-performing executives and athletes requiring bespoke biomechanical guidance.'
  },
  {
    id: '03',
    title: 'FUNCTIONAL FITNESS',
    subtitle: 'PILLAR 03',
    image: '/discipline-functional.jpg',
    desc: 'Metabolic conditioning, elite Hyrox simulation, structural balance work, and lactate threshold capacity protocols.',
    spec: 'Turf Tracks // Concept2 Ergometers // Heavy Sled Work',
    equipment: ['40m High-Traction Turf', 'Concept2 SkiErg & RowErg', 'Custom Machined Dog Sleds'],
    targetAudience: 'Hybrid racers, stamina athletes, and endurance power specialists.'
  }
];

export default function DisciplinesSection({ onSelectDiscipline }) {
  const [activeModalDiscipline, setActiveModalDiscipline] = useState(null);

  return (
    <section id="disciplines" className="w-full bg-[#1c1b1b] py-24 lg:py-32 border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-label-md text-xs uppercase tracking-[0.25em] text-[#eebe87] block mb-3 font-semibold">
              [ 02 / METHODOLOGY ] // CORE DISCIPLINES
            </span>
            <h2 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl uppercase text-[#e5e2e1] tracking-tight font-bold">
              CALIBRATED TRAINING VECTORS
            </h2>
          </div>
          <p className="font-body-md text-sm sm:text-base text-[#d3c4b6] max-w-md font-light">
            Three scientifically sequenced pathways programmed for absolute force development, neurological adaptation, and metabolic conditioning.
          </p>
        </div>

        {/* Three Architectural Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DISCIPLINES.map((discipline) => (
            <div
              key={discipline.id}
              className="luxury-card group relative flex flex-col bg-[#0e0e0e] border border-[#2a2a2a] hover:border-[#b58a58] transition-all duration-300"
            >
              <div className="relative h-72 sm:h-80 overflow-hidden bg-[#201f1f]">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${discipline.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/30 to-transparent" />
                <span className="absolute top-4 left-4 bg-[#0e0e0e]/90 px-3 py-1 font-label-sm text-[11px] tracking-widest text-[#eebe87] border border-[#2a2a2a] uppercase font-semibold">
                  {discipline.subtitle}
                </span>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="font-headline-lg text-xl sm:text-2xl uppercase text-[#e5e2e1] tracking-wider group-hover:text-[#eebe87] transition-colors font-semibold">
                    {discipline.title}
                  </h3>
                  <p className="font-body-md text-sm text-[#d3c4b6] font-light leading-relaxed">
                    {discipline.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#2a2a2a] space-y-4">
                  <div>
                    <span className="font-label-sm text-[10px] uppercase tracking-widest text-[#9c8e82] block">
                      SPECIFICATION
                    </span>
                    <p className="font-body-sm text-xs sm:text-sm text-[#eebe87] font-medium tracking-wide mt-1">
                      {discipline.spec}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveModalDiscipline(discipline)}
                    className="w-full inline-flex items-center justify-between text-xs uppercase tracking-widest text-[#d3c4b6] hover:text-[#eebe87] pt-2 border-t border-[#2a2a2a]/60 group-hover:border-[#b58a58]/40 transition-colors font-semibold"
                  >
                    <span>EXPLORE PROTOCOL</span>
                    <span className="material-symbols-outlined text-[16px] transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Discipline Detail Lightbox Modal */}
      {activeModalDiscipline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#131313] border border-[#b58a58] max-w-xl w-full p-6 sm:p-8 relative space-y-6 shadow-2xl">
            <button
              onClick={() => setActiveModalDiscipline(null)}
              className="absolute top-4 right-4 text-[#9c8e82] hover:text-[#eebe87] transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div>
              <span className="font-label-sm text-xs uppercase tracking-widest text-[#eebe87]">
                {activeModalDiscipline.subtitle} // PROTOCOL BRIEF
              </span>
              <h3 className="font-headline-lg text-2xl sm:text-3xl uppercase text-[#e5e2e1] tracking-wider mt-1 font-bold">
                {activeModalDiscipline.title}
              </h3>
            </div>

            <p className="font-body-md text-sm text-[#d3c4b6] leading-relaxed">
              {activeModalDiscipline.desc}
            </p>

            <div className="p-4 bg-[#0e0e0e] border border-[#2a2a2a] space-y-2">
              <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#eebe87] block">
                INTEGRATED HARDWARE & DIAGNOSTICS:
              </span>
              <ul className="space-y-1.5 text-xs text-[#d3c4b6]">
                {activeModalDiscipline.equipment.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#eebe87]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1">
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-[#9c8e82]">
                RECOMMENDED ATHLETE PROFILE:
              </span>
              <p className="text-xs text-[#e5e2e1] font-mono">
                {activeModalDiscipline.targetAudience}
              </p>
            </div>

            <button
              onClick={() => {
                const disc = activeModalDiscipline;
                setActiveModalDiscipline(null);
                onSelectDiscipline(disc.title);
              }}
              className="w-full py-3.5 bg-[#b58a58] hover:bg-[#eebe87] text-[#402500] uppercase font-label-lg text-xs tracking-widest font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>APPLY FOR THIS DISCIPLINE</span>
              <span className="material-symbols-outlined text-[16px]">north_east</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
