import React, { useState, useEffect } from 'react';
import { PAPERS } from './data/papersData';
import { Paper } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResearchVision } from './components/ResearchVision';
import { PublicationsList } from './components/PublicationsList';
import { IndustryDeployments } from './components/IndustryDeployments';
import { AcademicTrajectory } from './components/AcademicTrajectory';
import { ReferencesSection } from './components/ReferencesSection';
import { PaperDedicatedSite } from './components/PaperDedicatedSite';
import { CvModal } from './components/CvModal';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [cvModalOpen, setCvModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  // Handle URL hash changes for deep linking (e.g. #paper/fts-gan or #paper/ep-rnn)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#paper/')) {
        const slug = hash.replace('#paper/', '').trim();
        const found = PAPERS.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setSelectedPaper(found);
          window.scrollTo({ top: 0, behavior: 'instant' });
          return;
        }
      } else if (!hash.startsWith('#paper')) {
        setSelectedPaper(null);
      }
    };

    // Initial check on load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectPaper = (paper: Paper) => {
    setSelectedPaper(paper);
    window.location.hash = `paper/${paper.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPortfolio = () => {
    setSelectedPaper(null);
    window.location.hash = 'publications';
  };

  const scrollToPublications = () => {
    const element = document.getElementById('publications');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If a paper is selected (via direct URL or modal click), render its dedicated full-window website!
  if (selectedPaper) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-neutral-100">
        <PaperDedicatedSite
          paper={selectedPaper}
          onBack={handleBackToPortfolio}
          isStandaloneWindow={false}
        />
        <CvModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
        <Footer />
      </div>
    );
  }

  // Otherwise render the full academic portfolio website
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col font-sans">
      <Navbar
        onOpenCvModal={() => setCvModalOpen(true)}
        activeSection={activeSection}
      />

      <main className="flex-1">
        <Hero
          onOpenCvModal={() => setCvModalOpen(true)}
          onExplorePapers={scrollToPublications}
        />

        <ResearchVision />

        <PublicationsList onSelectPaper={handleSelectPaper} />

        <IndustryDeployments />

        <AcademicTrajectory />

        <ReferencesSection />
      </main>

      <Footer />

      <CvModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />
    </div>
  );
}
