import React, { useState } from 'react';

export default function Header({ onOpenIntake, onOpenPortal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'PHILOSOPHY', href: '#philosophy' },
    { name: 'DISCIPLINES', href: '#disciplines' },
    { name: 'FACILITY', href: '#facility' },
    { name: 'MEMBERSHIP', href: '#membership' },
    { name: 'TESTIMONIALS', href: '#testimonials' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0e0e0e]/90 backdrop-blur-md border-b border-[#2a2a2a] transition-all duration-200">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-4 flex-shrink-0 group">
          <div className="w-9 h-9 rounded-sm bg-[#eebe87] flex items-center justify-center font-display-xl font-bold text-[#472a01] tracking-tighter text-xl">
            IF
          </div>
          <span className="font-headline-sm text-lg sm:text-xl uppercase tracking-widest text-[#e5e2e1] border-l border-[#4f453a] pl-4 font-semibold group-hover:text-[#eebe87] transition-colors">
            IRON FITNESS
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-8 h-full">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-label-lg text-xs uppercase tracking-widest text-[#d3c4b6] hover:text-[#eebe87] hover:border-b-2 hover:border-[#eebe87] transition-all py-2 font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-5 flex-shrink-0">
          <button
            onClick={onOpenPortal}
            className="hidden md:inline-block font-label-lg text-xs uppercase tracking-widest text-[#d3c4b6] hover:text-[#eebe87] transition-colors font-semibold"
          >
            MEMBER PORTAL
          </button>
          
          <button
            onClick={() => onOpenIntake('general')}
            className="hidden sm:inline-flex items-center justify-center bg-[#b58a58] hover:bg-[#eebe87] text-[#402500] font-label-lg text-xs uppercase tracking-wider px-5 py-2.5 transition-all font-bold border border-[#b58a58] hover:border-[#eebe87] shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined mr-2 text-[16px]">north_east</span>
            START YOUR JOURNEY
          </button>

          {/* User Icon / Portal Quick Trigger */}
          <button
            onClick={onOpenPortal}
            aria-label="Member Profile"
            className="w-9 h-9 rounded-full bg-[#eebe87] hover:bg-[#ffddb9] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            title="Biometric Access / Portal"
          >
            <span className="material-symbols-outlined text-[#472a01] text-[18px]">person</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#d3c4b6] hover:text-[#eebe87] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#131313] border-b border-[#2a2a2a] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-label-lg text-sm uppercase tracking-widest text-[#d3c4b6] hover:text-[#eebe87] py-2 border-b border-[#2a2a2a]/60"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full text-center py-3 border border-[#4f453a] text-[#d3c4b6] hover:text-[#eebe87] font-label-lg text-xs uppercase tracking-widest"
            >
              MEMBER PORTAL LOGIN
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenIntake('general');
              }}
              className="w-full text-center py-3 bg-[#b58a58] hover:bg-[#eebe87] text-[#402500] font-label-lg text-xs uppercase tracking-widest font-bold"
            >
              START YOUR JOURNEY
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
