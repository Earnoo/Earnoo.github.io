import React, { useState } from 'react';
import { PRODUCTION_PROJECTS } from '../data/profileData';
import { PAPERS } from '../data/papersData';
import {
  Building2,
  CheckCircle2,
  Cpu,
  Boxes,
  Truck,
  TrendingUp,
  Activity,
  Layers,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const IndustryDeployments: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  // Collect all unique industry application highlights across papers
  const allIndustryApps = PAPERS.flatMap((p) =>
    p.industryApplications.map((app) => ({
      ...app,
      paperTitle: p.shortTitle,
      paperSlug: p.slug,
      paperVenue: p.venue,
    }))
  );

  const domains = ['all', 'Retail & E-Commerce', 'Intelligent Transportation', 'Quantitative Finance', 'Environmental & IoT', 'Industrial Robotics & Mechatronics'];

  const filteredApps = selectedDomain === 'all'
    ? allIndustryApps
    : allIndustryApps.filter((app) => app.domain === selectedDomain);

  return (
    <section id="industry-deployments" className="py-16 sm:py-20 border-b border-neutral-800 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5" /> Real-World Deployments &bull; Practical Value
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white">
            From Fundamental Machine Learning to Production Scale
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 leading-relaxed">
            Theoretical contributions proven in live commercial environments, automating supply chain replenishments, managing intermittent inventories, and safeguarding autonomous hardware.
          </p>
        </div>

        {/* Live Commercial Production Deployments (Cluna, Burgerland, Hyperme, ARAS-Fanoos) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Enterprise Deployments & Systems
            </h3>
            <span className="text-xs font-mono text-neutral-500">
              1,000,000+ series in production
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTION_PROJECTS.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                className="group bg-neutral-900 border border-neutral-800 hover:border-indigo-500/50 rounded-xl p-6 flex flex-col justify-between shadow-lg transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {proj.badge}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">{proj.period}</span>
                  </div>

                  <h4 className="text-base font-medium text-white mb-1 leading-snug group-hover:text-indigo-400 transition-colors">
                    {proj.name}
                  </h4>
                  <div className="text-xs text-neutral-400 font-medium mb-3">
                    {proj.subtitle} &bull; {proj.organization}
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                    {proj.description}
                  </p>

                  <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800/80 mb-4">
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-0.5">Production Metric:</div>
                    <div className="text-xs font-mono text-emerald-400 font-medium">{proj.metrics}</div>
                  </div>

                  <ul className="space-y-1.5 mb-4">
                    {proj.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex flex-wrap gap-1.5">
                  {proj.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-neutral-800 text-[10px] text-neutral-400 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Domain Applications Catalog across Papers with Images */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-medium text-white">
                Cross-Domain Impact Catalog
              </h3>
              <p className="text-xs text-neutral-400">
                Visualizing how FTS-GAN, EP-RNN, and FACTS directly transform critical industries
              </p>
            </div>

            {/* Domain filter tags */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {domains.map((dom) => (
                <button
                  key={dom}
                  onClick={() => setSelectedDomain(dom)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    selectedDomain === dom
                      ? 'bg-neutral-800 text-white font-medium border border-neutral-700'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {dom === 'all' ? 'All Domains' : dom}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app, idx) => (
              <div
                key={`${app.id}-${idx}`}
                className="group bg-neutral-900 border border-neutral-800 hover:border-indigo-500/50 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-neutral-950">
                    <img
                      src={app.imageUrl}
                      alt={app.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-neutral-950/90 backdrop-blur-md text-[10px] font-mono text-indigo-400 border border-neutral-800">
                      {app.domain}
                    </span>

                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-neutral-900/90 text-[10px] font-mono text-neutral-400">
                      via {app.paperTitle}
                    </span>
                  </div>

                  <div className="p-5">
                    <h4 className="text-sm sm:text-base font-medium text-white mb-2 group-hover:text-indigo-400 transition-colors">
                      {app.title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                      {app.summary}
                    </p>

                    <div className="p-3 bg-neutral-950/80 rounded-lg border border-neutral-800/80 mb-3">
                      <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-0.5">
                        Performance Gain:
                      </div>
                      <div className="text-xs text-emerald-400 font-medium">
                        {app.impactHighlight}
                      </div>
                    </div>

                    <div className="text-[11px] text-neutral-400 space-y-1">
                      <div>
                        <strong className="text-neutral-300">Dataset:</strong> {app.datasetUsed}
                      </div>
                      <div>
                        <strong className="text-neutral-300">Value:</strong> {app.practicalValue}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <a
                    href={`#paper/${app.paperSlug}`}
                    className="inline-flex items-center gap-1 font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>View Research Paper</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-neutral-500 font-mono text-[11px]">{app.paperVenue.split(' ')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
