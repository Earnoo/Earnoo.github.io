import React, { useState } from 'react';
import { PROFILE_INFO, EDUCATION_DATA, REFERENCES_DATA, TEACHING_EXPERIENCES } from '../data/profileData';
import { PAPERS } from '../data/papersData';
import {
  X,
  Printer,
  Copy,
  Check,
  Download,
  ExternalLink,
  GraduationCap,
  Award,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Github
} from 'lucide-react';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
ALIREZA JAHANI
Applied Scientist, ARAS AI Lab
Phone: +98-933-637-7508 | Email: alirezajahani.earno@gmail.com / a.jahani@email.kntu.ac.ir
GitHub: github.com/Earnoo | Google Scholar: Alireza Jahani

RESEARCH INTERESTS:
Generative models, Time series forecasting, Predictive Maintenance, Robust learning, Anomaly Detection, Explainable AI (XAI)

EDUCATION:
- M.Sc. in Mechatronics Engineering, K. N. Toosi University of Technology (Sep 2023 – Sep 2026)
  GPA: 4.0/4.0 (18.6/20), Ranked 1st out of 30. Supervisor: Prof. Hamid D. Taghirad
- B.Sc. in Mechanical Engineering, K. N. Toosi University of Technology (Sep 2019 – Jul 2023)
  GPA: 3.38/4.0 (16.59/20), Ranked 12th out of 118.

SELECTED PUBLICATIONS:
[1] A. Jahani et al., "FTS-GAN: A Novel Fuzzy-Driven GAN Model for Sparse Data Handling and Robust Temporal Modeling," Expert Systems with Applications [Q1, IF: 9.4], 132211, 2026.
[2] A. Jahani et al., "EP-RNN: Error-Projected Recurrent Neural Network for Time Series Forecasting," Results in Engineering [Q1, IF: 9.4], 110454, 2026.
[3] A. Jahani et al., "FACTS: Feedback-Adaptive Learning for Cluster-Based Time Series Forecasting," IEEE ICCIA 2025, Oral.
[4] A. Jahani et al., "Self-updating LightGBM Clustering: A Hybrid Approach for Managing Data Intermittency, Noise, and Missing Values," IEEE ICRoM 2024, Oral.
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl flex flex-col overflow-hidden text-neutral-100">
        
        {/* Modal Top Control Bar */}
        <div className="sticky top-0 z-20 bg-neutral-900/95 backdrop-blur-md px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <h3 className="font-medium text-white text-base">Alireza Jahani &mdash; Curriculum Vitae</h3>
            <span className="text-xs text-neutral-500 font-mono hidden sm:inline">(Aug 2026 Edition)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors border border-neutral-700"
              title="Copy formatted text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Document Container */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#0a0a0a] font-sans">
          
          {/* Header */}
          <div className="text-center border-b border-neutral-800 pb-6">
            <h1 className="text-3xl font-light text-white tracking-tight">ALIREZA JAHANI</h1>
            <p className="text-sm font-medium text-indigo-400 mt-1">Applied Scientist, ARAS AI Lab</p>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs text-neutral-400 mt-3 font-mono">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-neutral-500" /> +98-933-637-7508
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-neutral-500" /> alirezajahani.earno@gmail.com
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Github className="w-3 h-3 text-neutral-500" /> github.com/Earnoo
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-neutral-500" /> Google Scholar
              </span>
            </div>
          </div>

          {/* Research Interests */}
          <div>
            <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2 border-b border-neutral-800 pb-1">
              Research Interests
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-neutral-300">
              <div>&bull; Generative models</div>
              <div>&bull; Robust learning</div>
              <div>&bull; Time series forecasting</div>
              <div>&bull; Anomaly Detection</div>
              <div>&bull; Predictive Maintenance</div>
              <div>&bull; Explainable AI (XAI)</div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3 border-b border-neutral-800 pb-1">
              Education
            </h2>
            <div className="space-y-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                <div>
                  <div className="font-medium text-white text-sm">K. N. Toosi University of Technology</div>
                  <div className="text-neutral-300">M.Sc. in Mechatronics Engineering</div>
                  <div className="text-neutral-400 mt-0.5">
                    &bull; Thesis: <em>Design and Development of Sales Forecasting System in the Retail Industry Using Machine Learning Methods</em>
                  </div>
                  <div className="text-neutral-400">&bull; Supervisor: Prof. Hamid D. Taghirad</div>
                </div>
                <div className="sm:text-right font-mono text-neutral-400 shrink-0">
                  <div>Sep 2023 &ndash; Sep 2026</div>
                  <div className="text-emerald-400 font-bold">Total GPA: 4.0/4.0 (18.6/20)</div>
                  <div className="text-indigo-400">Ranked 1st / 30</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 pt-2">
                <div>
                  <div className="font-medium text-white text-sm">K. N. Toosi University of Technology</div>
                  <div className="text-neutral-300">B.Sc. in Mechanical Engineering</div>
                </div>
                <div className="sm:text-right font-mono text-neutral-400 shrink-0">
                  <div>Sep 2019 &ndash; Jul 2023</div>
                  <div className="text-neutral-300">Total GPA: 3.38/4.0 (16.59/20)</div>
                  <div className="text-indigo-400">Ranked 12th / 118</div>
                </div>
              </div>
            </div>
          </div>

          {/* Publications */}
          <div>
            <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3 border-b border-neutral-800 pb-1">
              Selected Publications
            </h2>
            <div className="space-y-3.5 text-xs text-neutral-300">
              <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Journal Papers:</div>
              {PAPERS.filter(p => p.venueType.includes('Journal')).map((p, idx) => (
                <div key={idx} className="pl-3 border-l-2 border-indigo-500">
                  <div className="font-medium text-white">
                    [{idx + 5}] A. Jahani et al., "{p.title}," <span className="font-serif italic text-indigo-400">{p.venue}</span> [{p.venueType}, IF: {p.impactFactor}], 2026.
                  </div>
                  <a href={p.doi} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline text-[11px] font-mono">
                    {p.doi}
                  </a>
                </div>
              ))}

              <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest pt-2">Conference Papers:</div>
              {PAPERS.filter(p => p.venueType.includes('Conference')).map((p, idx) => (
                <div key={idx} className="pl-3 border-l-2 border-neutral-700">
                  <div className="font-normal text-neutral-200">
                    [{4 - idx}] A. Jahani et al., "{p.title}," In <span className="italic text-neutral-400">{p.venue}</span>, {p.year}.
                  </div>
                  <a href={p.doi} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline text-[11px] font-mono">
                    {p.doi}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Research Experience */}
          <div>
            <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3 border-b border-neutral-800 pb-1">
              Research & Industrial Experience
            </h2>
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between items-baseline font-medium text-white">
                  <span>Research Assistant at Applied Robotics and AI Solutions (ARAS)</span>
                  <span className="font-mono text-neutral-500 text-[11px]">Sep 2022 &ndash; Present</span>
                </div>
                <div className="text-indigo-400 font-medium mb-1">ARAS-Fanoos: Time Series Forecasting Foundation Model</div>
                <ul className="space-y-1 text-neutral-400 pl-4 list-disc">
                  <li>Led research & development of ARAS-Fanoos foundation model for noisy, sparse multivariate retail time series.</li>
                  <li>Proposed EP-RNN and FTS-GAN architectures (published in ESWA and Results in Engineering 2026).</li>
                  <li>Formulated feedback-adaptive learning to systematically manage missing values and intermittency (ICCIA 2025).</li>
                  <li>Deployed live forecasting systems into production for major retail and food service chains including <strong>Cluna, Burgerland, and Hyperme</strong>.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Honors & Awards */}
          <div>
            <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3 border-b border-neutral-800 pb-1">
              Honors and Awards
            </h2>
            <div className="space-y-2 text-xs text-neutral-300">
              <div className="flex justify-between">
                <span>&bull; <strong>Exceptionally Talented Student, M.Sc. Program</strong> (Ranked 1st out of 30)</span>
                <span className="font-mono text-neutral-500">Jan 2026</span>
              </div>
              <div className="flex justify-between">
                <span>&bull; <strong>Exceptionally Talented Student, B.Sc. Program</strong> (Ranked 12th out of 118)</span>
                <span className="font-mono text-neutral-500">Jan 2023</span>
              </div>
              <div className="flex justify-between">
                <span>&bull; <strong>National University Entrance Exam</strong> (Ranked top 1% out of 164,000 participants)</span>
                <span className="font-mono text-neutral-500">Jul 2019</span>
              </div>
            </div>
          </div>

          {/* References */}
          <div>
            <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3 border-b border-neutral-800 pb-1">
              Academic References
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {REFERENCES_DATA.map((ref, i) => (
                <div key={i} className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                  <div className="font-medium text-white">{ref.name}</div>
                  <div className="text-indigo-400 text-[11px]">{ref.relation}</div>
                  <div className="text-neutral-400 text-[11px] mt-1">{ref.institution}</div>
                  <div className="text-indigo-400 text-[11px] font-mono mt-1">{ref.email}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
