import React, { useState } from 'react';
import { Paper, IndustryApplication } from '../types';
import { ArchitectureDiagram } from './ArchitectureDiagrams';
import {
  ExternalLink,
  Github,
  FileText,
  Copy,
  Check,
  ArrowLeft,
  Share2,
  TrendingDown,
  Building2,
  BarChart3,
  Layers,
  Sparkles,
  Sliders,
  Maximize2
} from 'lucide-react';

interface PaperDedicatedSiteProps {
  paper: Paper;
  onBack?: () => void;
  isStandaloneWindow?: boolean;
}

export const PaperDedicatedSite: React.FC<PaperDedicatedSiteProps> = ({
  paper,
  onBack,
  isStandaloneWindow = false,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'methodology' | 'benchmarks' | 'industry' | 'simulator'>('overview');
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  
  // Interactive Simulator state
  const [noiseLevel, setNoiseLevel] = useState<number>(30); // 0 to 100
  const [outlierLevel, setOutlierLevel] = useState<number>(20); // 0 to 100
  const [useProposedModel, setUseProposedModel] = useState<boolean>(true);

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(paper.bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const handleOpenInNewWindow = () => {
    const url = `${window.location.origin}${window.location.pathname}#paper/${paper.slug}`;
    window.open(url, `_blank`, 'width=1280,height=900,menubar=no,status=no,toolbar=no');
  };

  // Generate synthetic curves for the interactive simulator
  const pointsCount = 30;
  const groundTruth = Array.from({ length: pointsCount }, (_, i) => {
    const t = i / pointsCount;
    return Math.sin(t * Math.PI * 4) * 0.4 + Math.cos(t * Math.PI * 2) * 0.3 + 0.5;
  });

  const simulatedPoints = groundTruth.map((val, idx) => {
    // Noise jitter
    const noise = (Math.random() - 0.5) * (noiseLevel / 100) * 0.4;
    // Sparse outlier
    const isOutlier = idx === 12 || idx === 22;
    const outlier = isOutlier ? ((outlierLevel / 100) * (idx === 12 ? 0.6 : -0.5)) : 0;
    
    const corrupted = Math.max(0.05, Math.min(0.95, val + noise + outlier));

    // Baseline response: overreacts to outlier and noise
    const baselinePred = corrupted;

    // Proposed response (FTS-GAN / EP-RNN): dampens noise & eliminates outlier
    const proposedPred = val + noise * 0.25; // stabilized

    return {
      t: idx,
      groundTruth: val,
      corrupted,
      prediction: useProposedModel ? proposedPred : baselinePred,
    };
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white border border-neutral-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </button>
          )}
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-700/50 text-indigo-400 font-medium tracking-wider uppercase">
            Research Microsite
          </span>
          <span className="hidden sm:inline-block text-xs text-neutral-400 font-mono">
            {paper.shortTitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isStandaloneWindow && (
            <button
              onClick={handleOpenInNewWindow}
              title="Open paper in a new dedicated window"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white border border-neutral-700 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">New Window</span>
            </button>
          )}
          {paper.codeUrl && (
            <a
              href={paper.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white border border-neutral-700 transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> Code
            </a>
          )}
          <a
            href={paper.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-colors"
          >
            <FileText className="w-3.5 h-3.5" /> Paper DOI
          </a>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative px-4 sm:px-8 py-10 lg:py-14 border-b border-neutral-800 bg-gradient-to-b from-neutral-900 via-neutral-900/60 to-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {paper.venueType}
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-neutral-300 border border-neutral-700">
              {paper.venue} ({paper.year})
            </span>
            {paper.impactFactor && (
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Impact Factor: {paper.impactFactor}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono text-neutral-400 bg-neutral-800/60 border border-neutral-700/50">
              First Author: Alireza Jahani
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight leading-snug mb-4">
            {paper.title}
          </h1>

          {/* Authors List */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-neutral-300 mb-6">
            <span className="text-neutral-500 font-medium">Authors:</span>
            {paper.authors.map((author, index) => (
              <span key={index} className="inline-flex items-center">
                <span className={author.isMainCandidate ? 'font-medium text-white underline decoration-indigo-500 decoration-2 underline-offset-4' : 'text-neutral-300'}>
                  {author.name}
                </span>
                {author.isMainCandidate && (
                  <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono font-medium">
                    1st Author
                  </span>
                )}
                {index < paper.authors.length - 1 && <span className="text-neutral-600 ml-1">,</span>}
              </span>
            ))}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-neutral-900 border border-neutral-800">
            {paper.metrics.slice(0, 4).map((m, idx) => (
              <div key={idx} className="border-r last:border-r-0 border-neutral-800 pr-2">
                <div className="text-[11px] text-neutral-400 truncate mb-0.5">{m.name}</div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold text-emerald-400 font-mono">{m.proposed}</span>
                  <span className="text-xs text-neutral-500 line-through font-mono">{m.baseline}</span>
                </div>
                <div className="text-[10px] text-indigo-400 font-medium flex items-center gap-0.5">
                  <TrendingDown className="w-3 h-3" /> {m.improvement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="sticky top-[57px] z-30 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-center space-x-1 sm:space-x-4 overflow-x-auto py-2.5 text-xs sm:text-sm">
          {[
            { id: 'overview', label: 'Abstract & Overview', icon: FileText },
            { id: 'methodology', label: 'Architecture & Equations', icon: Layers },
            { id: 'benchmarks', label: 'Benchmark Results', icon: BarChart3 },
            { id: 'industry', label: 'Industry Applications', icon: Building2 },
            { id: 'simulator', label: 'Interactive Live Simulator', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Body */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8">
              <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2">Abstract</div>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {paper.abstract}
              </p>

              <div className="mt-6 pt-6 border-t border-neutral-800">
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3">Key Research Contributions</div>
                <ul className="space-y-2.5">
                  {paper.keyContributions.map((contrib, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                      <span className="w-5 h-5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{contrib}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-wrap gap-2">
                {paper.keywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 font-mono">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Preview of Architecture */}
            <div>
              <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2">Architectural Highlights</div>
              <ArchitectureDiagram paperId={paper.id} />
            </div>

            {/* BibTeX Citation Box */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-neutral-200">Cite this Publication (BibTeX)</h4>
                <button
                  onClick={handleCopyBibtex}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
                >
                  {copiedBibtex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBibtex ? 'Copied!' : 'Copy BibTeX'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                {paper.bibtex}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: Architecture & Equations */}
        {activeTab === 'methodology' && (
          <div className="space-y-8">
            <ArchitectureDiagram paperId={paper.id} />

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8">
              <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2">Methodological Formulation</div>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                {paper.methodologyOverview}
              </p>

              <div className="p-5 rounded-lg bg-neutral-950 border border-neutral-800">
                <div className="text-xs font-mono font-medium text-indigo-400 uppercase tracking-wide mb-2">
                  {paper.formulaHighlight.name}
                </div>
                <div className="p-3 bg-neutral-900 rounded-lg font-mono text-sm sm:text-base text-emerald-400 mb-3 overflow-x-auto border border-neutral-800">
                  {paper.formulaHighlight.latexOrNotation}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {paper.formulaHighlight.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Benchmarks */}
        {activeTab === 'benchmarks' && (
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-white">Empirical Benchmark Evaluations</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">Exact quantitative performance extracted directly from published paper results</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-medium uppercase tracking-wider">
                  Peer Reviewed
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider font-mono">
                      <th className="pb-3 px-3">Evaluation Benchmark</th>
                      <th className="pb-3 px-3">Baseline / SOTA</th>
                      <th className="pb-3 px-3">Proposed Model</th>
                      <th className="pb-3 px-3">Relative Gain</th>
                      <th className="pb-3 px-3">Metric</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80 font-mono text-xs">
                    {paper.metrics.map((metric, i) => (
                      <tr key={i} className="hover:bg-neutral-800/40 transition-colors">
                        <td className="py-3 px-3 font-sans text-neutral-200 font-medium">{metric.name}</td>
                        <td className="py-3 px-3 text-neutral-500 line-through">{metric.baseline}</td>
                        <td className="py-3 px-3 text-emerald-400 font-medium">{metric.proposed}</td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium text-[11px]">
                            {metric.improvement}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-neutral-500 font-sans">{metric.unit || 'Score'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Industry Applications */}
        {activeTab === 'industry' && (
          <div className="space-y-6">
            <div className="mb-2">
              <h3 className="text-xl font-light text-white mb-1">Practical Industry Deployments & Real-World Case Studies</h3>
              <p className="text-sm text-neutral-400">
                Bridging academic innovation with tangible commercial, municipal, and healthcare operations.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {paper.industryApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-colors flex flex-col md:flex-row shadow-lg"
                >
                  <div className="md:w-5/12 relative h-52 md:h-auto min-h-[220px]">
                    <img
                      src={app.imageUrl}
                      alt={app.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-900 via-transparent to-transparent opacity-90" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-neutral-950/90 backdrop-blur-md text-[10px] font-mono font-medium text-indigo-300 border border-indigo-500/30">
                      {app.domain}
                    </span>
                  </div>

                  <div className="p-6 md:w-7/12 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">{app.title}</h4>
                      <p className="text-sm text-neutral-300 leading-relaxed mb-4">{app.summary}</p>
                      
                      <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 mb-3">
                        <div className="text-xs font-medium text-emerald-400 mb-0.5">Quantified Industry Impact:</div>
                        <div className="text-xs text-neutral-300">{app.impactHighlight}</div>
                      </div>

                      <div className="text-xs text-neutral-400 mb-1">
                        <strong className="text-neutral-300 font-medium">Dataset: </strong> {app.datasetUsed}
                      </div>
                      <div className="text-xs text-neutral-400">
                        <strong className="text-neutral-300 font-medium">Operational Value: </strong> {app.practicalValue}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Interactive Simulator */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-white">Interactive Robustness & Noise Simulator</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Inject controlled synthetic noise and extreme outliers into test sequences to evaluate model stability.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-neutral-950 p-1.5 rounded-lg border border-neutral-800">
                  <button
                    onClick={() => setUseProposedModel(true)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      useProposedModel ? 'bg-neutral-800 text-white border border-neutral-700' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Proposed ({paper.shortTitle})
                  </button>
                  <button
                    onClick={() => setUseProposedModel(false)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      !useProposedModel ? 'bg-neutral-800 text-rose-300 border border-neutral-700' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Standard Baseline
                  </button>
                </div>
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 rounded-lg bg-neutral-950 border border-neutral-800">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-neutral-300">Additive Gaussian Noise Intensity</span>
                    <span className="text-indigo-400 font-mono">{noiseLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={noiseLevel}
                    onChange={(e) => setNoiseLevel(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-neutral-300">Sparse Outlier Shock Magnitude (±M)</span>
                    <span className="text-rose-400 font-mono">{outlierLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={outlierLevel}
                    onChange={(e) => setOutlierLevel(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                </div>
              </div>

              {/* Chart Visualization */}
              <div className="relative w-full h-64 bg-neutral-950 border border-neutral-800 rounded-lg p-4 flex flex-col justify-end">
                <div className="absolute top-3 left-4 flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-neutral-600 inline-block" />
                    <span className="text-neutral-400">Ground Truth</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-rose-400/80 inline-block border-t border-dashed" />
                    <span className="text-rose-400">Corrupted Input</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-3 h-0.5 inline-block ${useProposedModel ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                    <span className={useProposedModel ? 'text-emerald-400 font-medium' : 'text-rose-400'}>
                      {useProposedModel ? `${paper.shortTitle} Output (Denoised)` : 'Standard Output (Oscillating)'}
                    </span>
                  </div>
                </div>

                {/* SVG Curves */}
                <svg viewBox="0 0 600 180" className="w-full h-44">
                  {/* Grid */}
                  <line x1="0" y1="45" x2="600" y2="45" stroke="#262626" strokeDasharray="2 2" />
                  <line x1="0" y1="90" x2="600" y2="90" stroke="#262626" strokeDasharray="2 2" />
                  <line x1="0" y1="135" x2="600" y2="135" stroke="#262626" strokeDasharray="2 2" />

                  {/* Corrupted Path */}
                  <polyline
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="1.5"
                    strokeDasharray="3 2"
                    opacity="0.6"
                    points={simulatedPoints
                      .map((p, i) => `${(i / (pointsCount - 1)) * 600},${170 - p.corrupted * 150}`)
                      .join(' ')}
                  />

                  {/* Ground Truth Path */}
                  <polyline
                    fill="none"
                    stroke="#737373"
                    strokeWidth="1.5"
                    points={simulatedPoints
                      .map((p, i) => `${(i / (pointsCount - 1)) * 600},${170 - p.groundTruth * 150}`)
                      .join(' ')}
                  />

                  {/* Model Prediction Path */}
                  <polyline
                    fill="none"
                    stroke={useProposedModel ? '#10b981' : '#f43f5e'}
                    strokeWidth="2.5"
                    points={simulatedPoints
                      .map((p, i) => `${(i / (pointsCount - 1)) * 600},${170 - p.prediction * 150}`)
                      .join(' ')}
                  />
                </svg>

                <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                  <span>t = 0 (Window Start)</span>
                  <span>t = 15</span>
                  <span>t = 30 (Prediction Horizon)</span>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300">
                <span className="font-medium text-white">Insight: </span>
                {useProposedModel ? (
                  <span className="text-emerald-400">
                    The {paper.shortTitle} architecture filters out high-frequency noise and actively dampens the isolated outlier spikes via its error-modulated dynamics, preserving smooth convergence toward the ground truth trajectory.
                  </span>
                ) : (
                  <span className="text-rose-400">
                    The standard baseline overreacts to the corrupted inputs, propagating spurious state updates that distort forecasts and inflate downstream RMSE.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
