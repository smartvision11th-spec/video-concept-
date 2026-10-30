import React, { useState } from 'react';

const TIERS = [
  {
    id: 'essential',
    badge: 'TIER 01',
    cadence: 'MONTHLY',
    name: 'ESSENTIAL',
    desc: 'Self-directed access for disciplined lifters seeking our calibrated hardware and quiet environment.',
    priceMonthly: 195,
    features: [
      'Open facility access during operational hours',
      'Full access to competition barbells & platforms',
      'Biometric locker & recovery lounge',
      'Quarterly movement screen & mobility audit',
    ],
    featured: false,
    cta: 'APPLY FOR ESSENTIAL',
  },
  {
    id: 'performance',
    badge: 'TIER 02',
    cadence: 'FULL PROGRAM',
    name: 'PERFORMANCE',
    featuredBadge: 'MOST SELECTED // CORE ATHLETE',
    desc: 'Complete integration of coaching, recovery protocols, and full unrestricted facility access.',
    priceMonthly: 320,
    features: [
      '24/7 Unlimited biometric facility access',
      '4 monthly private coaching & technique sessions',
      'Full access to cold plunge & infrared saunas',
      'Quarterly DEXA body composition & force plate metrics',
      'Custom velocity-based progressive periodization plan',
    ],
    featured: true,
    cta: 'SELECT PERFORMANCE TIER',
  },
  {
    id: 'elite',
    badge: 'TIER 03',
    cadence: 'BESPOKE',
    name: 'ELITE',
    desc: 'High-touch, fully managed athletic mentorship for competitive athletes and executives.',
    priceMonthly: 550,
    features: [
      'Dedicated Master Coach with 24/7 direct communication',
      'Unlimited 1-on-1 private lifting & recovery blocks',
      'Complete nutritional biochemistry & meal programming',
      'Private assigned permanent locker & apparel laundry',
    ],
    featured: false,
    cta: 'APPLY FOR ELITE',
  }
];

export default function MembershipSection({ onSelectTier }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  return (
    <section id="membership" className="w-full bg-[#0e0e0e] py-16 sm:py-24 lg:py-32 border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Heading & Billing Switch */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-5 sm:gap-6">
          <div>
            <span className="font-label-md text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#eebe87] block mb-2 sm:mb-3 font-semibold">
              [ 04 / ADMISSION ] // SELECT YOUR TIER
            </span>
            <h2 className="font-display-lg text-2xl sm:text-4xl lg:text-5xl uppercase text-[#e5e2e1] tracking-tight font-bold">
              DISCIPLINED TIERS
            </h2>
            <p className="font-body-sm text-xs text-[#9c8e82] uppercase tracking-widest mt-1.5 sm:mt-2">
              Capped at 250 active memberships // Vetted admissions only
            </p>
          </div>

          {/* Monthly / Annual Billing Toggle - Adaptive on mobile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 bg-[#1c1b1b] p-1.5 border border-[#2a2a2a] w-full sm:w-auto">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 font-label-sm text-xs tracking-wider uppercase transition-colors text-center ${
                billingCycle === 'monthly'
                  ? 'bg-[#b58a58] text-[#402500] font-bold'
                  : 'text-[#d3c4b6] hover:text-[#eebe87]'
              }`}
            >
              MONTHLY CADENCE
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 font-label-sm text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-[#b58a58] text-[#402500] font-bold'
                  : 'text-[#d3c4b6] hover:text-[#eebe87]'
              }`}
            >
              <span>ANNUAL COMMITMENT</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-[#472a01] text-[#eebe87] font-mono">SAVE 15%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards 3 Column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {TIERS.map((tier) => {
            const calculatedPrice = billingCycle === 'annual' 
              ? Math.round(tier.priceMonthly * 0.85)
              : tier.priceMonthly;

            return (
              <div
                key={tier.id}
                className={`luxury-card relative flex flex-col justify-between space-y-6 sm:space-y-8 p-6 sm:p-8 lg:p-10 transition-all duration-300 ${
                  tier.featured
                    ? 'bg-[#201f1f] border-2 border-[#b58a58] shadow-2xl lg:-translate-y-2'
                    : 'bg-[#1c1b1b] border border-[#2a2a2a] hover:border-[#4f453a]'
                }`}
              >
                {/* Featured Top Ribbon */}
                {tier.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#b58a58] text-[#402500] px-3.5 sm:px-4 py-1 font-label-sm text-[9px] sm:text-[10px] uppercase tracking-widest font-bold whitespace-nowrap shadow-md">
                    {tier.featuredBadge}
                  </div>
                )}

                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-center justify-between pt-1">
                    <span className={`font-label-sm text-[11px] sm:text-xs uppercase tracking-widest font-bold ${tier.featured ? 'text-[#eebe87]' : 'text-[#9c8e82]'}`}>
                      {tier.badge}
                    </span>
                    <span className={`font-label-sm text-[11px] sm:text-xs uppercase tracking-widest ${tier.featured ? 'text-[#eebe87]' : 'text-[#d3c4b6]'}`}>
                      {billingCycle === 'annual' ? 'ANNUAL RATE' : tier.cadence}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-headline-lg text-xl sm:text-2xl uppercase text-[#e5e2e1] tracking-wider font-semibold">
                      {tier.name}
                    </h3>
                    <p className="font-body-sm text-xs sm:text-sm text-[#d3c4b6] font-light leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>

                  <div className="pt-2 sm:pt-4 flex items-baseline gap-2">
                    <span className={`font-display-lg text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${tier.featured ? 'text-[#eebe87]' : 'text-[#e5e2e1]'}`}>
                      ${calculatedPrice}
                    </span>
                    <span className="font-label-md text-[11px] sm:text-xs uppercase text-[#9c8e82] tracking-widest">
                      / MONTH {billingCycle === 'annual' ? '(BILLED ANNUALLY)' : ''}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 sm:space-y-4 pt-5 sm:pt-6 border-t border-[#2a2a2a]">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 sm:gap-3 font-body-sm text-xs sm:text-sm text-[#d3c4b6]">
                        <span className="material-symbols-outlined text-[#eebe87] text-[18px] flex-shrink-0 mt-0.5">
                          check
                        </span>
                        <span className={tier.featured && idx === 0 ? 'font-medium text-[#e5e2e1]' : ''}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectTier(tier.name, calculatedPrice)}
                  className={`w-full inline-flex items-center justify-center font-label-lg text-xs tracking-widest uppercase py-3.5 sm:py-4 transition-all duration-200 font-bold ${
                    tier.featured
                      ? 'bg-[#b58a58] hover:bg-[#eebe87] text-[#402500] shadow-md hover:shadow-[#eebe87]/20 active:scale-95'
                      : 'bg-transparent hover:bg-[#2a2a2a] text-[#e5e2e1] hover:text-[#eebe87] border border-[#2a2a2a] hover:border-[#b58a58] active:scale-95'
                  }`}
                >
                  {tier.cta}
                  <span className="material-symbols-outlined ml-2 text-[16px]">north_east</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
