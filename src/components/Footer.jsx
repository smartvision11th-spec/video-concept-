import React, { useState } from 'react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="w-full bg-[#0e0e0e] border-t border-[#2a2a2a] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 lg:gap-x-12 pb-16 border-b border-[#2a2a2a]">
          
          {/* Brand & Headquarters Info */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-[#eebe87] flex items-center justify-center font-display-xl font-bold text-[#472a01] text-lg">
                  IF
                </div>
                <span className="font-headline-sm text-lg uppercase tracking-widest text-[#e5e2e1] font-semibold">
                  IRON FITNESS
                </span>
              </div>
              <p className="font-body-sm text-xs sm:text-sm text-[#d3c4b6] max-w-sm font-light leading-relaxed">
                Architectural strength culture designed for elite performance. Precision engineering, disciplined programming, and austere athletic luxury.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-label-sm text-[10px] uppercase tracking-widest text-[#9c8e82]">
                HEADQUARTERS
              </p>
              <p className="font-body-sm text-xs text-[#e5e2e1]">
                740 St. Ann's Avenue, Industrial Quarter, Suite 04
              </p>
              <p className="font-body-sm text-xs text-[#d3c4b6]">
                contact@irongym.com // +1 (555) 740-4766
              </p>
              <p className="font-label-sm text-[10px] tracking-widest text-[#9c8e82] pt-1 font-mono">
                MON-FRI: 05:00 - 23:00 | SAT-SUN: 07:00 - 21:00
              </p>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-headline-sm text-sm uppercase text-[#e5e2e1] font-semibold tracking-wider">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 font-label-md text-xs uppercase tracking-wider text-[#d3c4b6]">
              <li><a className="hover:text-[#eebe87] transition-colors" href="#philosophy">Philosophy</a></li>
              <li><a className="hover:text-[#eebe87] transition-colors" href="#disciplines">Disciplines</a></li>
              <li><a className="hover:text-[#eebe87] transition-colors" href="#facility">Facility</a></li>
              <li><a className="hover:text-[#eebe87] transition-colors" href="#membership">Membership</a></li>
              <li><a className="hover:text-[#eebe87] transition-colors" href="#testimonials">Testimonials</a></li>
            </ul>
          </div>

          {/* Programs Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-headline-sm text-sm uppercase text-[#e5e2e1] font-semibold tracking-wider">
              PROGRAMS
            </h4>
            <ul className="space-y-2.5 font-label-md text-xs uppercase tracking-wider text-[#d3c4b6]">
              <li><a className="hover:text-[#eebe87] transition-colors" href="#disciplines">Olympic Lifting</a></li>
              <li><a className="hover:text-[#eebe87] transition-colors" href="#disciplines">Hypertrophy Block</a></li>
              <li><a className="hover:text-[#eebe87] transition-colors" href="#disciplines">Kinetic Conditioning</a></li>
              <li><a className="hover:text-[#eebe87] transition-colors" href="#facility">Thermoregulation</a></li>
              <li><a className="hover:text-[#eebe87] transition-colors" href="#disciplines">Private Coaching</a></li>
            </ul>
          </div>

          {/* Dispatch / Newsletter Subscription */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="font-headline-sm text-sm uppercase text-[#e5e2e1] font-semibold tracking-wider">
              DISPATCH // NEWSLETTER
            </h4>
            <p className="font-body-sm text-xs text-[#d3c4b6] leading-relaxed">
              Receive seasonal program releases, technical monographs, and private enclave symposium invitations.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#1c1b1b] border border-[#eebe87] text-[#eebe87] text-xs font-label-sm uppercase tracking-wider">
                ✓ EMAIL ARCHIVED TO PRIVATE DISPATCH
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-stretch border border-[#2a2a2a] focus-within:border-[#b58a58] transition-colors">
                <input
                  required
                  type="email"
                  placeholder="ENTER EMAIL ARCHIVE"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#201f1f] px-4 py-3 font-label-md text-xs text-[#e5e2e1] placeholder:text-[#4f453a] focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to dispatch"
                  className="bg-[#b58a58] hover:bg-[#eebe87] text-[#402500] px-5 font-label-md text-xs uppercase tracking-widest transition-colors flex items-center justify-center font-bold"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </form>
            )}

            <div className="flex items-center gap-6 pt-2">
              <a href="#" className="font-label-sm text-[11px] uppercase tracking-widest text-[#d3c4b6] hover:text-[#eebe87] transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">tag</span>
                INSTAGRAM
              </a>
              <a href="#" className="font-label-sm text-[11px] uppercase tracking-widest text-[#d3c4b6] hover:text-[#eebe87] transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">play_circle</span>
                YOUTUBE
              </a>
              <a href="#" className="font-label-sm text-[11px] uppercase tracking-widest text-[#d3c4b6] hover:text-[#eebe87] transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">directions_run</span>
                STRAVA
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-label-sm text-[10px] uppercase tracking-widest text-[#9c8e82]">
          <p>© {new Date().getFullYear()} IRON FITNESS GYM. ARCHITECTURAL PERFORMANCE SYSTEMS. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#e5e2e1] transition-colors">TERMS // GOVERNANCE</a>
            <a href="#" className="hover:text-[#e5e2e1] transition-colors">PRIVACY PROTOCOL</a>
            <a href="#" className="hover:text-[#e5e2e1] transition-colors">SAFETY DIRECTIVE</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
