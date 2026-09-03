import React, { useState } from 'react';
import { PROFILE_INFO } from '../data/profileData';
import {
  GraduationCap,
  FileText,
  Github,
  Mail,
  Menu,
  X,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onOpenCvModal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCvModal, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Research Vision', href: '#research-vision' },
    { label: 'Publications', href: '#publications', badge: 'Q1 IF 9.4' },
    { label: 'Industry Impact', href: '#industry-deployments' },
    { label: 'Trajectory & TA', href: '#trajectory' },
    { label: 'Lab Life', href: '#community' },
    { label: 'References', href: '#references' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-neutral-800 transition-all">
      {/* Top PhD Status Announcement Ribbon */}
      <div className="bg-neutral-900/90 border-b border-neutral-800 px-4 py-1.5 text-center text-[11px] text-neutral-300 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-medium text-white tracking-wide">PhD Applicant for Fall 2026/2027</span>
        <span className="hidden sm:inline text-neutral-600">•</span>
        <span className="hidden sm:inline text-neutral-400">Generative Temporal AI &bull; Robust Deep Learning &bull; Electrical Systems</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Name */}
          <a href="#about" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-indigo-400 font-bold text-sm tracking-tight group-hover:border-indigo-500/50 transition-all">
              AJ
            </div>
            <div>
              <div className="font-light tracking-tight text-white text-base leading-none">
                ALIREZA <span className="font-semibold text-indigo-400">JAHANI</span>
              </div>
              <div className="text-[11px] text-neutral-400 tracking-wider uppercase mt-1 font-mono">
                ARAS AI Lab &bull; Electrical Engineering M.Sc.
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1 text-xs font-medium uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeSection === link.href.substring(1)
                    ? 'text-white bg-neutral-900 border border-neutral-800 font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenCvModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 shadow-sm transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>Curriculum Vitae</span>
            </button>

            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm shadow-indigo-600/20 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenCvModal}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-200 bg-neutral-900 border border-neutral-800"
            >
              CV
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0a] border-b border-neutral-800 px-4 pt-2 pb-4 space-y-2 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 font-medium"
            >
              <div className="flex items-center justify-between">
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">
                    {link.badge}
                  </span>
                )}
              </div>
            </a>
          ))}
          <div className="pt-2 border-t border-neutral-800 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCvModal();
              }}
              className="flex-1 py-2 rounded-lg text-xs font-semibold bg-neutral-900 text-center text-white border border-neutral-800"
            >
              View Full CV
            </button>
            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="flex-1 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-center text-white"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
