import React from 'react';
import { PROFILE_INFO } from '../data/profileData';
import {
  Sparkles,
  Activity,
  GitFork,
  Cpu,
  ShieldCheck,
  Binary,
  ArrowRight,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface ResearchVisionProps {
  onSelectTopic?: (topic: string) => void;
}

const ICONS_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-indigo-400" />,
  Activity: <Activity className="w-5 h-5 text-emerald-400" />,
  GitFork: <GitFork className="w-5 h-5 text-teal-400" />,
  Cpu: <Cpu className="w-5 h-5 text-blue-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-amber-400" />,
  Binary: <Binary className="w-5 h-5 text-purple-400" />,
};

export const ResearchVision: React.FC<ResearchVisionProps> = () => {
  return (
    <section id="research-vision" className="py-16 sm:py-20 border-b border-neutral-800 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-indigo-400" /> Research Statement &bull; PhD Vision
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white">
            Architecting Robust Intelligence for Volatile Temporal Realities
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
            {PROFILE_INFO.researchStatement}
          </p>
        </div>

        {/* 6 Research Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROFILE_INFO.researchInterests.map((interest, idx) => (
            <div
              key={idx}
              className="group bg-neutral-900 border border-neutral-800 hover:border-indigo-500/50 rounded-xl p-6 transition-colors shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-4 text-indigo-400">
                  {ICONS_MAP[interest.icon] || <Sparkles className="w-5 h-5 text-indigo-400" />}
                </div>

                <h3 className="text-base sm:text-lg font-medium text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {interest.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                  {interest.description}
                </p>
              </div>

              {/* Publication / System anchor points */}
              <div className="pt-4 border-t border-neutral-800/80 space-y-1.5">
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  Associated Works:
                </div>
                {interest.highlights.map((hl, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* PhD Aspirations Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-indigo-500/50 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="text-base sm:text-lg font-medium text-white mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Prepared for Rigorous Doctoral Research
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Equipped with first-author Q1 publications, mathematical rigor in both mechanical control and modern machine learning, and hands-on experience deploying models at scale (860k+ series). Currently preparing GRE/TOEFL and seeking faculty advisors in North America and Europe.
            </p>
          </div>

          <a
            href={`mailto:${PROFILE_INFO.email}?subject=PhD%20Opportunity%20-%20Alireza%20Jahani`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm shadow-indigo-600/20 transition-colors whitespace-nowrap"
          >
            <span>Discuss Research Potential</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
