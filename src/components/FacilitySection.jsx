import React, { useState } from 'react';

const ZONES = [
  {
    id: 'zone-01',
    zone: 'ZONE 01 // MAIN PLATFORM',
    title: 'ELEIKO CALIBRATED COMPETITION SUITE',
    desc: 'Swedish competition-grade steel plates calibrated to +/- 10g tolerance, pair with Eleiko IPF powerlifting bars and custom 7-gauge steel rigs.',
    image: '/facility-racks.jpg',
    colSpan: 'md:col-span-8',
    minHeight: 'min-h-[460px]',
  },
  {
    id: 'zone-02',
    zone: 'ZONE 02 // THERMAL RECOVERY',
    title: 'NORDIC PLUNGE & INFRARED SAUNA',
    desc: 'Dual contrast hydrotherapy featuring automated ozone sanitization and custom cedar wood architecture.',
    telemetry: 'SAUNA: 85°C // PLUNGE: 4°C',
    image: '/facility-sauna.jpg',
    colSpan: 'md:col-span-4',
    minHeight: 'min-h-[460px]',
  },
  {
    id: 'zone-03',
    zone: 'ZONE 03 // OLYMPIC ENCLAVE',
    title: 'OAK DROP PLATFORMS & CHALK STATIONS',
    desc: 'Multi-layer shock absorbing rubber subfloors designed for zero ricochet vibration and pristine foot grip.',
    image: '/facility-platform.jpg',
    colSpan: 'md:col-span-5',
    minHeight: 'min-h-[380px]',
  },
  {
    id: 'zone-04',
    zone: 'ZONE 04 // BIOMETRIC LAB',
    title: 'FORCE PLATE DIAGNOSTICS & DEXA ANALYSIS',
    desc: 'Dual-plate isometric mid-thigh pull sensors, 3D laser joint tracking, and quarterly DEXA scans providing unvarnished physiological accountability.',
    image: '/facility-biometrics.jpg',
    colSpan: 'md:col-span-7',
    minHeight: 'min-h-[380px]',
  }
];

export default function FacilitySection() {
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <section id="facility" className="w-full bg-[#0e0e0e] py-24 lg:py-32 border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="font-label-md text-xs uppercase tracking-[0.25em] text-[#eebe87] block mb-3 font-semibold">
              [ 03 / SANCTUARY ] // ARCHITECTURAL CAPACITY
            </span>
            <h2 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl uppercase text-[#e5e2e1] tracking-tight font-bold">
              BUILT WITHOUT COMPROMISE
            </h2>
          </div>
          <div className="font-label-sm text-xs uppercase tracking-widest text-[#9c8e82]">
            ST. ANN'S INDUSTRIAL QUARTER // BUILDING 04
          </div>
        </div>

        {/* Asymmetrical Editorial Gallery Mosaic */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {ZONES.map((zone) => (
            <div
              key={zone.id}
              onClick={() => setActivePhoto(zone)}
              className={`${zone.colSpan} ${zone.minHeight} group relative bg-[#1c1b1b] border border-[#2a2a2a] hover:border-[#b58a58] overflow-hidden flex flex-col justify-end p-8 cursor-pointer transition-all duration-300`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${zone.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/90 via-[#0e0e0e]/20 to-transparent" />
              
              <div className="relative z-10 space-y-2 max-w-lg">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#eebe87] font-semibold">
                    {zone.zone}
                  </span>
                  <span className="material-symbols-outlined text-[#eebe87] opacity-0 group-hover:opacity-100 transition-opacity text-[18px]">
                    zoom_in
                  </span>
                </div>
                
                <h3 className="font-headline-lg text-xl sm:text-2xl uppercase text-[#e5e2e1] font-semibold">
                  {zone.title}
                </h3>
                
                <p className="font-body-sm text-xs sm:text-sm text-[#d3c4b6] font-light leading-relaxed">
                  {zone.desc}
                </p>

                {zone.telemetry && (
                  <div className="flex items-center gap-4 pt-2 font-label-sm text-xs uppercase tracking-wider text-[#d3c4b6] font-mono">
                    <span>{zone.telemetry.split(' // ')[0]}</span>
                    <span>//</span>
                    <span className="text-[#eebe87] font-semibold">{zone.telemetry.split(' // ')[1]}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Enlargement */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-[#131313] border border-[#b58a58] p-4 sm:p-6 space-y-4 cursor-default"
          >
            <div className="flex items-center justify-between border-b border-[#2a2a2a] pb-3">
              <div>
                <span className="font-label-sm text-xs uppercase tracking-widest text-[#eebe87]">
                  {activePhoto.zone}
                </span>
                <h4 className="font-headline-sm text-lg sm:text-xl uppercase text-[#e5e2e1]">
                  {activePhoto.title}
                </h4>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="text-[#9c8e82] hover:text-[#eebe87] transition-colors"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>
            <div className="h-[50vh] sm:h-[60vh] overflow-hidden bg-black">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-body-sm text-xs sm:text-sm text-[#d3c4b6]">
              {activePhoto.desc}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
