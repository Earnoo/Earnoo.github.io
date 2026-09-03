import React from 'react';
import { REFERENCES_DATA } from '../data/profileData';
import {
  UserCheck,
  Building,
  Globe,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

interface ReferencesSectionProps {
  onOpenDocument?: (docId: string) => void;
}

export const ReferencesSection: React.FC<ReferencesSectionProps> = () => {
  return (
    <section id="references" className="py-16 sm:py-20 border-b border-neutral-800 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <UserCheck className="w-3.5 h-3.5" /> Academic Referees
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white">
            Academic Advisors & Referees
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 leading-relaxed">
            Distinguished faculty members and international co-authors available for confidential references upon graduate application portal request.
          </p>
        </div>

        {/* 3 Reference Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REFERENCES_DATA.map((ref, idx) => (
            <div
              key={idx}
              className="group bg-neutral-900 border border-neutral-800 hover:border-indigo-500/50 rounded-xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden transition-colors"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-full pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono mb-4">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Recommendation Available via Portal</span>
                </div>

                <h3 className="text-lg font-medium text-white mb-1">
                  {ref.profileUrl ? (
                    <a
                      href={ref.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-400 hover:underline inline-flex items-center gap-1.5 group-hover:text-indigo-400 transition-colors"
                    >
                      <span>{ref.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                    </a>
                  ) : (
                    ref.name
                  )}
                </h3>
                <div className="text-xs font-medium text-indigo-400 mb-2">{ref.title}</div>
                
                <div className="text-xs text-neutral-400 mb-4 leading-relaxed">
                  <div>{ref.department}</div>
                  <div className="font-medium text-neutral-300">
                    {ref.institutionUrl ? (
                      <a
                        href={ref.institutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-indigo-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>{ref.institution}</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                      </a>
                    ) : (
                      ref.institution
                    )}
                  </div>
                  <div className="text-neutral-500">{ref.country}</div>
                </div>

                <div className="p-3 bg-neutral-950/80 rounded-lg border border-neutral-800/80 mb-4">
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-0.5">Academic Relation:</div>
                  <div className="text-xs font-medium text-white">{ref.relation}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                {ref.profileUrl ? (
                  <a
                    href={ref.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Academic Website</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                ) : (
                  <span className="text-xs text-neutral-500 font-mono">Reference upon request</span>
                )}
                <span className="text-[10px] text-neutral-500 font-mono">Portal Reference</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
