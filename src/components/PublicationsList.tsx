import React, { useState } from 'react';
import { PAPERS } from '../data/papersData';
import { Paper } from '../types';
import {
  BookOpen,
  FileText,
  ExternalLink,
  Github,
  Copy,
  Check,
  TrendingDown,
  Sparkles,
  Maximize2,
  Layers,
  Building2,
  Tag
} from 'lucide-react';

interface PublicationsListProps {
  onSelectPaper: (paper: Paper) => void;
  onOpenDocument?: (docId: string) => void;
}

export const PublicationsList: React.FC<PublicationsListProps> = ({ onSelectPaper, onOpenDocument }) => {
  const [filter, setFilter] = useState<'all' | 'journal' | 'conference' | 'firstAuthor'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPapers = PAPERS.filter((paper) => {
    if (filter === 'journal') return paper.venueType.includes('Journal');
    if (filter === 'conference') return paper.venueType.includes('Conference');
    if (filter === 'firstAuthor') return paper.authors[0]?.isMainCandidate;
    return true;
  });

  const handleCopyBibtex = (paper: Paper, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(paper.bibtex);
    setCopiedId(paper.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenDirectWindow = (paper: Paper, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#paper/${paper.slug}`;
    window.open(url, '_blank', 'width=1280,height=900,menubar=no,status=no,toolbar=no');
  };

  return (
    <section id="publications" className="py-16 sm:py-20 border-b border-neutral-800 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" /> Peer-Reviewed Research
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white">
              Selected Publications & Preprints
            </h2>
            <p className="mt-2 text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Leading author on breakthrough temporal machine learning architectures published in premier Q1 journals (ESWA, Results in Engineering) and IEEE international conferences.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            {[
              { id: 'all', label: `All Publications (${PAPERS.length})` },
              { id: 'journal', label: `Q1 Journals (2)` },
              { id: 'conference', label: `IEEE Conferences (4)` },
              { id: 'firstAuthor', label: `Lead-Author (4)` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                  filter === tab.id
                    ? 'bg-indigo-600 text-white font-medium shadow-sm shadow-indigo-600/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Papers Grid */}
        <div className="space-y-6">
          {filteredPapers.map((paper) => {
            const isFirstAuthor = paper.authors[0]?.isMainCandidate;

            return (
              <article
                key={paper.id}
                onClick={() => onSelectPaper(paper)}
                className="group relative bg-neutral-900 border border-neutral-800 hover:border-indigo-500/50 rounded-xl p-6 sm:p-7 transition-colors shadow-lg cursor-pointer"
              >
                {/* Top Row: Venue & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {paper.paperNumber && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                        [{paper.paperNumber}]
                      </span>
                    )}

                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                        paper.venueType.includes('Journal')
                          ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                          : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                      }`}
                    >
                      {paper.venueType}
                    </span>

                    <span className="text-xs font-medium text-neutral-300">
                      {paper.venue} ({paper.year})
                    </span>

                    {paper.impactFactor && (
                      <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                        IF: {paper.impactFactor}
                      </span>
                    )}

                    {isFirstAuthor && (
                      <span className="text-[10px] font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        Lead Author
                      </span>
                    )}

                    {paper.hasCertificate && onOpenDocument && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const docId = paper.slug === 'facts' ? 'iccia-2025-cert' : 'icrom-2024-cert';
                          onOpenDocument(docId);
                        }}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 text-[10px] font-mono transition-colors"
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Verified Presentation Certificate</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-neutral-500 font-mono">
                    <span>{paper.year}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-medium text-white group-hover:text-indigo-400 transition-colors leading-snug mb-2">
                  {paper.title}
                </h3>

                {/* Authors */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-neutral-400 mb-4">
                  {paper.authors.map((author, aIdx) => (
                    <span key={aIdx} className="inline-flex items-center">
                      <span
                        className={
                          author.isMainCandidate
                            ? 'font-medium text-white underline decoration-indigo-400 decoration-1 underline-offset-2'
                            : 'text-neutral-400'
                        }
                      >
                        {author.name}
                      </span>
                      {aIdx < paper.authors.length - 1 && <span className="text-neutral-600 mr-1">,</span>}
                    </span>
                  ))}
                </div>

                {/* Abstract Preview */}
                <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                  {paper.abstract}
                </p>

                {/* Highlight Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4 p-3 rounded-lg bg-neutral-950/80 border border-neutral-800/80">
                  {paper.metrics.slice(0, 3).map((m, mIdx) => (
                    <div key={mIdx} className="text-xs">
                      <div className="text-neutral-500 text-[11px] truncate mb-0.5">{m.name}</div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white font-mono">{m.proposed}</span>
                        <span className="text-[11px] text-emerald-400 font-medium flex items-center">
                          <TrendingDown className="w-3 h-3 mr-0.5" />
                          {m.improvement}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Industry Tags Preview */}
                <div className="flex flex-wrap items-center gap-1.5 mb-5">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mr-1 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-neutral-500" /> Domains:
                  </span>
                  {paper.industryApplications.map((app) => (
                    <span
                      key={app.id}
                      className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700/60 text-[10px] text-neutral-300 font-mono"
                    >
                      {app.title.split('&')[0].trim()}
                    </span>
                  ))}
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPaper(paper);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                      <span>Dedicated Paper Website</span>
                    </button>

                    <button
                      onClick={(e) => handleOpenDirectWindow(paper, e)}
                      title="Open dedicated paper website in a new window"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white border border-neutral-700 transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="hidden sm:inline">New Window</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {paper.codeUrl && (
                      <a
                        href={paper.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white border border-neutral-700 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                    )}

                    <a
                      href={paper.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white border border-neutral-700 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-indigo-400" />
                      <span>DOI Link</span>
                      <ExternalLink className="w-3 h-3 text-neutral-500" />
                    </a>

                    <button
                      onClick={(e) => handleCopyBibtex(paper, e)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-white bg-neutral-800/80 hover:bg-neutral-700 border border-neutral-700/60 transition-colors"
                      title="Copy BibTeX Citation"
                    >
                      {copiedId === paper.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span className="hidden sm:inline">BibTeX</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
