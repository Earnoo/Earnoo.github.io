import React, { useState, useEffect, lazy, Suspense } from 'react';
import { PAPERS } from './data/papersData';
import { Paper } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResearchVision } from './components/ResearchVision';
import { PublicationsList } from './components/PublicationsList';
import { IndustryDeployments } from './components/IndustryDeployments';
import { AcademicTrajectory } from './components/AcademicTrajectory';
import { ArasCommunitySection } from './components/ArasCommunitySection';
import { ReferencesSection } from './components/ReferencesSection';
import { Footer } from './components/Footer';

// Code-split heavy modals and standalone views for ultra-fast initial page load
const PaperDedicatedSite = lazy(() =>
  import('./components/PaperDedicatedSite').then((m) => ({ default: m.PaperDedicatedSite }))
);
const CvModal = lazy(() =>
  import('./components/CvModal').then((m) => ({ default: m.CvModal }))
);
const DocumentViewerModal = lazy(() =>
  import('./components/DocumentViewerModal').then((m) => ({ default: m.DocumentViewerModal }))
);

export default function App() {
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [cvModalOpen, setCvModalOpen] = useState<boolean>(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('about');

  // Safe scroll helper to prevent errors across different browser engines / iframes
  const safeScrollTo = (top: number, behavior: ScrollBehavior = 'smooth') => {
    try {
      if (typeof window !== 'undefined' && window.scrollTo) {
        window.scrollTo({ top, behavior });
      }
    } catch {
      try {
        window.scrollTo(0, top);
      } catch {
        // Ignore scroll errors in restricted iframes
      }
    }
  };

  // Handle URL hash changes for deep linking (e.g. #paper/fts-gan or #paper/ep-rnn)
  useEffect(() => {
    const handleHashChange = () => {
      try {
        const hash = typeof window !== 'undefined' ? window.location.hash : '';
        if (hash.startsWith('#paper/')) {
          const slug = hash.replace('#paper/', '').trim();
          const found = PAPERS.find((p) => p.slug === slug || p.id === slug);
          if (found) {
            setSelectedPaper(found);
            safeScrollTo(0, 'auto');
            return;
          }
        } else if (!hash.startsWith('#paper')) {
          setSelectedPaper(null);
        }
      } catch (err) {
        console.error('Error handling hashchange:', err);
      }
    };

    // Initial check on load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectPaper = (paper: Paper) => {
    try {
      setSelectedPaper(paper);
      if (typeof window !== 'undefined') {
        window.location.hash = `paper/${paper.slug}`;
      }
      safeScrollTo(0, 'smooth');
    } catch (err) {
      console.error('Error selecting paper:', err);
    }
  };

  const handleBackToPortfolio = () => {
    try {
      setSelectedPaper(null);
      if (typeof window !== 'undefined') {
        window.location.hash = 'publications';
      }
      safeScrollTo(0, 'smooth');
    } catch (err) {
      console.error('Error navigating back:', err);
    }
  };

  const scrollToPublications = () => {
    try {
      const element = document.getElementById('publications');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } catch {
      safeScrollTo(600, 'smooth');
    }
  };

  // If a paper is selected (via direct URL or modal click), render its dedicated full-window website!
  if (selectedPaper) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-neutral-100">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-neutral-400">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-mono">Loading Research Paper...</span>
              </div>
            </div>
          }
        >
          <PaperDedicatedSite
            paper={selectedPaper}
            onBack={handleBackToPortfolio}
            isStandaloneWindow={false}
          />
        </Suspense>

        <Suspense fallback={null}>
          {cvModalOpen && (
            <CvModal
              isOpen={cvModalOpen}
              onClose={() => setCvModalOpen(false)}
              onOpenDocument={(docId) => setSelectedDocumentId(docId)}
            />
          )}
          {selectedDocumentId && (
            <DocumentViewerModal
              documentId={selectedDocumentId}
              onClose={() => setSelectedDocumentId(null)}
            />
          )}
        </Suspense>
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

        <PublicationsList
          onSelectPaper={handleSelectPaper}
          onOpenDocument={(docId) => setSelectedDocumentId(docId)}
        />

        <IndustryDeployments />

        <AcademicTrajectory
          onOpenDocument={(docId) => setSelectedDocumentId(docId)}
        />

        <ArasCommunitySection />

        <ReferencesSection
          onOpenDocument={(docId) => setSelectedDocumentId(docId)}
        />
      </main>

      <Footer />

      <Suspense fallback={null}>
        {cvModalOpen && (
          <CvModal
            isOpen={cvModalOpen}
            onClose={() => setCvModalOpen(false)}
            onOpenDocument={(docId) => setSelectedDocumentId(docId)}
          />
        )}

        {selectedDocumentId && (
          <DocumentViewerModal
            documentId={selectedDocumentId}
            onClose={() => setSelectedDocumentId(null)}
          />
        )}
      </Suspense>
    </div>
  );
}
