import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EthosSection from './components/EthosSection';
import DisciplinesSection from './components/DisciplinesSection';
import FacilitySection from './components/FacilitySection';
import WhyIronSection from './components/WhyIronSection';
import MembershipSection from './components/MembershipSection';
import MaximBanner from './components/MaximBanner';
import TestimonialsSection from './components/TestimonialsSection';
import IntakeSection from './components/IntakeSection';
import Footer from './components/Footer';
import IntakeModal from './components/IntakeModal';
import PortalModal from './components/PortalModal';

export default function App() {
  const [intakeModalOpen, setIntakeModalOpen] = useState(false);
  const [portalModalOpen, setPortalModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('Performance');
  const [intakeMode, setIntakeMode] = useState('membership');

  // Global scroll reveal observer for rich animations across the site
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleOpenIntake = (mode = 'membership', tierName = 'Performance') => {
    setTierAndOpen(tierName, mode);
  };

  const setTierAndOpen = (tierName, mode = 'membership') => {
    setSelectedTier(tierName);
    setIntakeMode(mode);
    setIntakeModalOpen(true);
  };

  const handleSelectDiscipline = (disciplineTitle) => {
    setSelectedTier('Performance');
    setIntakeMode('discipline');
    setIntakeModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#e5e2e1] font-sans antialiased selection:bg-[#eebe87] selection:text-[#472a01]">
      {/* Navigation Header */}
      <Header
        onOpenIntake={() => handleOpenIntake('membership')}
        onOpenPortal={() => setPortalModalOpen(true)}
      />

      <main className="w-full pt-0">
        {/* Fullscreen Scroll-Driven Video Playback & Docking Hero */}
        <Hero onOpenIntake={handleOpenIntake} />

        {/* Section 01: Ethos & Manifesto */}
        <div className="reveal">
          <EthosSection />
        </div>

        {/* Section 02: Core Disciplines */}
        <div className="reveal">
          <DisciplinesSection onSelectDiscipline={handleSelectDiscipline} />
        </div>

        {/* Section 03: Architectural Facility */}
        <div className="reveal">
          <FacilitySection />
        </div>

        {/* Section 04: Standards & Code (Why Iron) */}
        <div className="reveal">
          <WhyIronSection />
        </div>

        {/* Section 05: Membership Tiers */}
        <div className="reveal">
          <MembershipSection onSelectTier={(tier) => setTierAndOpen(tier, 'membership')} />
        </div>

        {/* Section 06: Maxim Callout Banner */}
        <div className="reveal">
          <MaximBanner onOpenIntake={() => handleOpenIntake('evaluation')} />
        </div>

        {/* Section 07: Restrained Testimonials */}
        <div className="reveal">
          <TestimonialsSection />
        </div>

        {/* Section 08: Direct Intake Application */}
        <div className="reveal">
          <IntakeSection onOpenIntake={handleOpenIntake} />
        </div>
      </main>

      {/* Full Architectural Footer */}
      <Footer />

      {/* Modals */}
      <IntakeModal
        isOpen={intakeModalOpen}
        onClose={() => setIntakeModalOpen(false)}
        initialTier={selectedTier}
        initialMode={intakeMode}
      />

      <PortalModal
        isOpen={portalModalOpen}
        onClose={() => setPortalModalOpen(false)}
      />
    </div>
  );
}
