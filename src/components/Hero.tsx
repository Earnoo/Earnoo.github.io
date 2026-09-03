import React from 'react';
import { PROFILE_INFO } from '../data/profileData';
import {
  GraduationCap,
  Award,
  BookOpen,
  Layers,
  Sparkles,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  FileText,
  Phone,
  CheckCircle,
  Building,
  ArrowDown
} from 'lucide-react';

interface HeroProps {
  onOpenCvModal: () => void;
  onExplorePapers: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCvModal, onExplorePapers }) => {
  return (
    <section id="about" className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-neutral-800 bg-[#0a0a0a]">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Bio and Research Narrative */}
          <div className="lg:col-span-8 space-y-6">
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>PhD Applicant for Fall 2026/2027</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-medium">
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                <span>Ranked 1st / 30 &bull; GPA 4.0 / 4.0</span>
              </span>
            </div>

            {/* Main Header */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
                ALIREZA <span className="font-semibold text-indigo-400">JAHANI</span>
              </h1>
              <p className="text-neutral-400 text-xs sm:text-sm tracking-widest uppercase mt-2 font-medium">
                Applied Scientist &bull; Machine Learning &bull; Temporal AI &bull; Robotics
              </p>
              <div className="text-xs text-neutral-400 flex flex-wrap items-center gap-2 mt-2">
                <span>Supervised by <strong className="text-neutral-200">Prof. Hamid D. Taghirad</strong></span>
                <span className="text-neutral-600">&bull;</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  K. N. Toosi University of Technology, ARAS AI Lab
                </span>
              </div>
            </div>

            {/* Concise Bio */}
            <p className="text-neutral-300 leading-relaxed text-sm sm:text-base max-w-3xl">
              {PROFILE_INFO.shortBio}
            </p>

            {/* Quick Contact & Profiles Ribbon */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
              <a
                href={`mailto:${PROFILE_INFO.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-indigo-500/50 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>{PROFILE_INFO.email}</span>
              </a>

              <a
                href={PROFILE_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-indigo-500/50 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-indigo-400" />
                <span>github.com/Earnoo</span>
              </a>

              <a
                href={PROFILE_INFO.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-indigo-500/50 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Google Scholar</span>
              </a>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/60 border border-neutral-800 text-neutral-400 font-mono">
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                <span>+98-933-637-7508</span>
              </span>
            </div>

            {/* Main Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExplorePapers}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm shadow-indigo-600/20 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>Explore Research & Publications</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-xs sm:text-sm text-neutral-200 bg-neutral-900 hover:bg-neutral-800 hover:text-white border border-neutral-800 shadow-sm transition-colors"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>View Full Curriculum Vitae</span>
              </button>
            </div>
          </div>

          {/* Right Column: Key Stats & Credentials Card */}
          <div className="lg:col-span-4">
            <div className="bg-neutral-900 border border-neutral-800 hover:border-indigo-500/50 rounded-xl p-6 transition-colors shadow-xl relative overflow-hidden">
              {/* Subtle top badge */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">
                  Academic Credentials
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-mono border border-indigo-500/20">
                  ARAS AI Lab
                </span>
              </div>

              {/* Profile Card Summary */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white font-medium text-xl tracking-tight shrink-0">
                  AJ
                </div>
                <div>
                  <h3 className="font-medium text-white text-base">Alireza Jahani</h3>
                  <p className="text-xs text-neutral-400">K. N. Toosi Univ. of Technology</p>
                  <div className="inline-flex items-center gap-1 text-[11px] text-neutral-300 font-medium mt-0.5">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span>Thesis: Retail TS with ML</span>
                  </div>
                </div>
              </div>

              {/* 4 Quantified Statistics */}
              <div className="space-y-3">
                {PROFILE_INFO.coreStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-neutral-950/80 border border-neutral-800/80 rounded-lg hover:border-neutral-700 transition-colors"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-neutral-400 font-medium">{stat.label}</span>
                      <span className="text-base font-medium text-white font-mono">{stat.value}</span>
                    </div>
                    <div className="text-[11px] text-indigo-400 font-medium mt-0.5">
                      {stat.sublabel}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span className="text-neutral-500 italic">Languages:</span>
                <span className="text-neutral-300 font-medium">English (C1), Persian (Native)</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
