import React, { useState } from 'react';
import { PROFILE_INFO } from '../data/profileData';
import {
  Github,
  Mail,
  BookOpen,
  ArrowUp,
  Globe,
  CheckCircle2,
  Code2,
  HelpCircle
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [showDeployGuide, setShowDeployGuide] = useState(false);

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      try {
        window.scrollTo(0, 0);
      } catch {
        // ignore in restricted iframe
      }
    }
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-neutral-800 text-neutral-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 font-medium text-white text-base mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{PROFILE_INFO.name}</span>
              <span className="text-xs font-normal text-neutral-500 font-mono">
                &bull; Academic Portfolio & PhD Applications
              </span>
            </div>
            <p className="text-neutral-400 max-w-md text-xs leading-relaxed">
              Applied Scientist at ARAS AI Lab. Researching robust generative models, error-projected neural gating, and large-scale temporal foundations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDeployGuide(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-xs transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>GitHub Pages Deployment Guide</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} Alireza Jahani &bull; Designed for GitHub Pages (<code className="font-mono text-neutral-400">earnoo.github.io</code>)
          </div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${PROFILE_INFO.email}`} className="hover:text-white transition-colors">
              {PROFILE_INFO.email}
            </a>
            <span>&bull;</span>
            <a href={PROFILE_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <span>&bull;</span>
            <a href={PROFILE_INFO.scholar} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Google Scholar
            </a>
          </div>
        </div>

        {/* GitHub Pages Deployment Modal */}
        {showDeployGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-lg w-full p-6 text-neutral-200 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-400" />
                  GitHub.io (GitHub Pages) 1-Click Hosting Guide
                </h4>
                <button
                  onClick={() => setShowDeployGuide(false)}
                  className="text-neutral-400 hover:text-white text-xs px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors"
                >
                  Close
                </button>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                This academic portfolio is fully client-side static ready. To host it at your personal URL <code className="text-indigo-400 font-mono">https://earnoo.github.io</code>:
              </p>

              <ol className="space-y-2 text-xs text-neutral-300 list-decimal pl-4 mb-4 leading-relaxed">
                <li>
                  Create a new repository named <code className="bg-neutral-950 px-1.5 py-0.5 rounded text-indigo-400 font-mono">earnoo.github.io</code> on GitHub.
                </li>
                <li>
                  Push the project files or run <code className="bg-neutral-950 px-1.5 py-0.5 rounded text-amber-400 font-mono">npm run build</code> and commit the <code className="text-neutral-200 font-mono">dist/</code> directory.
                </li>
                <li>
                  In your repository Settings &gt; <strong>Pages</strong>, set Source to <strong>GitHub Actions</strong> or <strong>Deploy from branch</strong> (gh-pages / root).
                </li>
                <li>
                  Your website will be live globally with instantaneous SSL at <code className="text-indigo-400 font-mono">https://earnoo.github.io</code>!
                </li>
              </ol>

              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400">
                Tip: Each paper has its own permanent hash URL (e.g. <code className="text-indigo-400 font-mono">#paper/fts-gan</code> and <code className="text-indigo-400 font-mono">#paper/ep-rnn</code>) which works seamlessly on GitHub Pages without requiring server-side routing!
              </div>
            </div>
          </div>
        )}

      </div>
    </footer>
  );
};
