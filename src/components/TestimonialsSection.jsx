import React from 'react';

const TESTIMONIALS = [
  {
    quote: 'IRON completely redefined my approach to athletic longevity. In 18 months of structured velocity tracking, my compound total increased by 35% with zero chronic joint fatigue. The precision here is unmatched.',
    author: 'M. VANCE',
    role: 'Competitive Powerlifter // Member 3 Yrs'
  },
  {
    quote: 'A sanctuary of uncompromised focus. No commercial playlists, no members occupying benches on their phones, no vanity. The coaching caliber and facility architectural finish are the finest in the city.',
    author: 'D. STERLING',
    role: 'Endurance Athlete & Executive // Member 2 Yrs'
  },
  {
    quote: 'No mirrors to distract, zero gimmicks. Just world-class programming, pristine Eleiko calibrated iron, and relentless accountability from coaches who have actually stood on podiums.',
    author: 'S. THORNE',
    role: 'Hybrid Athlete // Member 1.5 Yrs'
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full bg-[#1c1b1b] py-24 lg:py-32 border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="font-label-md text-xs uppercase tracking-[0.25em] text-[#eebe87] block mb-3 font-semibold">
              [ 06 / DISPATCHES ] // ATHLETE RECORDS
            </span>
            <h2 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl uppercase text-[#e5e2e1] tracking-tight font-bold">
              VERIFIED EXPERIENCES
            </h2>
          </div>
          <p className="font-body-sm text-xs text-[#9c8e82] uppercase tracking-widest">
            DOCUMENTED TRANSFORMATIONS &amp; LONGEVITY PROFILES
          </p>
        </div>

        {/* Testimonial Cards 3 Column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-[#0e0e0e] border border-[#2a2a2a] hover:border-[#b58a58] flex flex-col justify-between space-y-6 transition-all duration-300 group"
            >
              <div className="space-y-6">
                <span className="font-headline-md text-4xl text-[#eebe87] font-mono leading-none block">
                  “
                </span>
                <p className="font-body-md text-sm sm:text-base text-[#e5e2e1] font-light leading-relaxed">
                  {item.quote}
                </p>
              </div>
              <div className="pt-6 border-t border-[#2a2a2a]">
                <p className="font-headline-sm text-base uppercase text-[#e5e2e1] tracking-wider font-semibold">
                  {item.author}
                </p>
                <p className="font-label-sm text-[11px] uppercase tracking-widest text-[#eebe87] mt-1 font-medium">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
