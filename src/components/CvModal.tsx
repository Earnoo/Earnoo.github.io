import React, { useState } from 'react';
import { PROFILE_INFO, EDUCATION_DATA, REFERENCES_DATA, TEACHING_EXPERIENCES } from '../data/profileData';
import { PAPERS } from '../data/papersData';
import {
  X,
  Printer,
  Copy,
  Check,
  ExternalLink,
  GraduationCap,
  Award,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Github,
  Building,
  FileCheck,
  BadgeCheck,
  FileText
} from 'lucide-react';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDocument?: (docId: string) => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, onOpenDocument }) => {
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
GitHub: https://github.com/Earnoo | Google Scholar: https://scholar.google.com/citations?hl=en&user=BC6IDi4AAAAJ

RESEARCH INTERESTS:
Generative models, Time series forecasting, Predictive Maintenance, Robust learning, Anomaly Detection, Explainable AI (XAI)

EDUCATION:
- M.Sc. in Mechatronics Engineering, K. N. Toosi University of Technology (Sep 2023 – Sep 2026)
  GPA: 4.0/4.0 (18.6/20), Ranked 1st out of 30. Supervisor: Prof. Hamid D. Taghirad (http://aras.kntu.ac.ir/taghirad/)
- B.Sc. in Mechanical Engineering, K. N. Toosi University of Technology (Sep 2019 – Jul 2023)
  GPA: 3.38/4.0 (16.59/20), Ranked 12th out of 118.

PUBLICATIONS:
[6] A. Jahani et al., "FTS-GAN: A Novel Fuzzy-Driven GAN Model for Sparse Data Handling and Robust Temporal Modeling," Expert Systems with Applications [Q1, IF: 9.4], 132211, 2026. https://doi.org/10.1016/j.eswa.2026.132211
[5] A. Jahani et al., "EP-RNN: Error-Projected Recurrent Neural Network for Time Series Forecasting," Results in Engineering [Q1, IF: 9.4], 110454, 2026. https://doi.org/10.1016/j.rineng.2026.110454
[4] A. Jahani et al., "Self-updating LightGBM Clustering: A Hybrid Approach for Managing Data Intermittency, Noise, and Missing Values," In 2024 12th IEEE International Conference on Robotics and Mechatronics (ICRoM), Oral. https://doi.org/10.1109/ICRoM64545.2024.10903571
[3] A. Jahani et al., "FACTS: Feedback-Adaptive Learning for Cluster-Based Time Series Forecasting," In 2025 11th IEEE International Conference on Control, Instrumentation and Automation (ICCIA), Oral. https://doi.org/10.1109/ICCIA69223.2025.11285964
[2] A. Mehrabi, D. A. Nejad, A. Jahani, A. Rezaei, S. A. Khalilpour, H. K. Seyedi, and H. D. Taghirad, "Variational Autoencoders: Tackling Imbalanced Data through Generative Modeling," In 2024 12th IEEE International Conference on Robotics and Mechatronics (ICRoM), Oral. https://doi.org/10.1109/ICRoM64545.2024.10903609
[1] D. A. Nejad, A. Mehrabi, A. Rezaei, A. Jahani, S. A. Khalilpour, H. K. Seyedi, and H. D. Taghirad, "Bridging Complexity and Interpretability: A Two-Phase Clustering Framework," In 2024 12th IEEE International Conference on Robotics and Mechatronics (ICRoM), Oral. https://doi.org/10.1109/ICRoM64545.2024.10903635

RESEARCH & INDUSTRIAL EXPERIENCE:
Research Assistant at Applied Robotics and AI Solutions (ARAS): https://aras.kntu.ac.ir/
Deployed a live forecasting application (https://pakhsh.fanoos-ai.ir) in production for major retail and food service chains, including Cluna (https://cluna.app/), Burgerland (https://burgerland.ir/), and Hyperme (https://www.hyperme.ir/).

TEACHING & MENTORSHIP:
- Mentor for Undergraduate ML Projects (Fall 2024 – Fall 2025), ARAS Lab
- Robotics and Computer Vision (2026), Instructor: Prof. Hamid D. Taghirad (http://aras.kntu.ac.ir/taghirad/)
- Machine Learning (Fall 2025), Instructor: Dr. Mahdi Aliyari-Shoorehdeli (https://scholar.google.com/citations?hl=en&user=4tTSHmQAAAAJ)
- Neural Network Foundations (Fall 2025), Instructor: Dr. Amirhossein Nikoofard (https://scholar.google.com/citations?hl=en&user=vk4WVkQAAAAJ)

REFERENCES:
- Prof. Hamid D. Taghirad (M.Sc. Supervisor), taghirad@kntu.ac.ir, Tel: +98-21-8888-3001
- Dr. Esmaeil Najafi (B.Sc. Supervisor & Advisor), e.najafi@fontys.nl, Tel: +31-642985979
- Dr. Amirhossein Nikoofard (Research Advisor), a.nikoofard@kntu.ac.ir, Tel: +98-21-8406-2209
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[94vh] bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl flex flex-col overflow-hidden text-neutral-100">
        
        {/* Modal Top Control Bar */}
        <div className="sticky top-0 z-20 bg-neutral-900/95 backdrop-blur-md px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h3 className="font-medium text-white text-base">Alireza Jahani &mdash; Academic Curriculum Vitae</h3>
            <span className="text-xs text-neutral-400 font-mono hidden sm:inline">(LaTeX Aligned)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors border border-neutral-700"
              title="Copy plain-text CV"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              title="Print or export to PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
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
        <div className="overflow-y-auto p-6 sm:p-10 space-y-7 bg-[#0a0a0a] font-sans">
          
          {/* Header */}
          <div className="text-center border-b border-neutral-800 pb-6">
            <h1 className="text-3xl sm:text-4xl font-light text-white tracking-tight">ALIREZA JAHANI</h1>
            <p className="text-sm font-medium text-indigo-400 mt-1">
              Applied Scientist,{' '}
              <a
                href="https://aras.kntu.ac.ir/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-indigo-300"
              >
                ARAS AI Lab
              </a>
              ,{' '}
              <a
                href="https://en.kntu.ac.ir/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-indigo-300"
              >
                K. N. Toosi University of Technology
              </a>
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-xs text-neutral-400 mt-3 font-mono">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-neutral-500" />
                <span>+98-933-637-7508</span>
              </span>
              <span>&bull;</span>
              <a
                href="mailto:alirezajahani.earno@gmail.com"
                className="flex items-center gap-1 text-neutral-300 hover:text-indigo-400 hover:underline"
              >
                <Mail className="w-3 h-3 text-neutral-500" />
                <span>alirezajahani.earno@gmail.com</span>
              </a>
              <span>&bull;</span>
              <a
                href="mailto:a.jahani@email.kntu.ac.ir"
                className="text-neutral-300 hover:text-indigo-400 hover:underline"
              >
                a.jahani@email.kntu.ac.ir
              </a>
              <span>&bull;</span>
              <a
                href="https://github.com/Earnoo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-indigo-400 hover:underline font-semibold"
              >
                <Github className="w-3 h-3 text-indigo-400" />
                <span>github.com/Earnoo</span>
              </a>
              <span>&bull;</span>
              <a
                href="https://scholar.google.com/citations?hl=en&user=BC6IDi4AAAAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-indigo-400 hover:underline font-semibold"
              >
                <BookOpen className="w-3 h-3 text-indigo-400" />
                <span>Google Scholar</span>
              </a>
            </div>
          </div>

          {/* Research Interests */}
          <div>
            <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2 border-b border-neutral-800 pb-1 flex items-center justify-between">
              <span>Research Interests</span>
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
              
              {/* M.Sc. */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 p-3.5 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                <div>
                  <div className="font-medium text-white text-sm flex items-center gap-1.5">
                    <a
                      href="https://en.kntu.ac.ir/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-indigo-400 hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      K. N. Toosi University of Technology
                      <ExternalLink className="w-3 h-3 text-neutral-500" />
                    </a>
                  </div>
                  <div className="text-neutral-200 mt-0.5">
                    <strong>M.Sc. in Mechatronics Engineering</strong> &mdash; Department of Electrical and Computer Engineering
                  </div>
                  <div className="text-neutral-300 mt-1">
                    &bull; <strong>Thesis:</strong> <em>Design and Development of Sales Forecasting System in the Retail Industry Using Machine Learning Methods</em>
                  </div>
                  <div className="text-neutral-300 mt-0.5">
                    &bull; <strong>Supervisor:</strong>{' '}
                    <a
                      href="http://aras.kntu.ac.ir/taghirad/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline font-medium inline-flex items-center gap-0.5"
                    >
                      Prof. Hamid D. Taghirad
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
                <div className="sm:text-right font-mono text-neutral-400 shrink-0 mt-2 sm:mt-0">
                  <div className="text-neutral-300">Sep 2023 &ndash; Sep 2026</div>
                  <div className="text-emerald-400 font-bold">Total GPA: 4.0/4.0 (18.6/20)</div>
                  <div className="text-indigo-400 font-medium">Ranked 1st out of 30 students</div>
                </div>
              </div>

              {/* B.Sc. */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 p-3.5 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                <div>
                  <div className="font-medium text-white text-sm">
                    <a
                      href="https://en.kntu.ac.ir/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-indigo-400 hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      K. N. Toosi University of Technology
                      <ExternalLink className="w-3 h-3 text-neutral-500" />
                    </a>
                  </div>
                  <div className="text-neutral-200 mt-0.5">
                    <strong>B.Sc. in Mechanical Engineering</strong>
                  </div>
                  <div className="text-neutral-300 mt-1">
                    &bull; <strong>Supervisor & Advisor:</strong>{' '}
                    <a
                      href="https://scholar.google.com/citations?user=z14ukLwAAAAJ&hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline font-medium inline-flex items-center gap-0.5"
                    >
                      Dr. Esmaeil Najafi
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>{' '}
                    (Fontys University of Applied Sciences, Netherlands)
                  </div>
                </div>
                <div className="sm:text-right font-mono text-neutral-400 shrink-0 mt-2 sm:mt-0">
                  <div className="text-neutral-300">Sep 2019 &ndash; Jul 2023</div>
                  <div className="text-neutral-200">Total GPA: 3.38/4.0 (16.59/20)</div>
                  <div className="text-indigo-400 font-medium">Ranked 12th out of 118 students</div>
                </div>
              </div>

            </div>
          </div>

          {/* Publications */}
          <div>
            <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3 border-b border-neutral-800 pb-1 flex items-center justify-between">
              <span>Publications</span>
              <span className="text-[10px] font-mono text-neutral-400">All Peer-Reviewed & Verified</span>
            </h2>
            
            <div className="space-y-4 text-xs">
              
              {/* Journal Section */}
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold mb-2">
                  Journal Papers:
                </div>
                
                <div className="space-y-3">
                  {/* [6] FTS-GAN */}
                  <div className="p-3.5 rounded-lg bg-neutral-900/70 border-l-2 border-indigo-500 border-y border-r border-neutral-800">
                    <div className="text-neutral-200 leading-relaxed">
                      <span className="font-bold text-indigo-400">[6]</span> <strong className="text-white">A. Jahani</strong> et al., &ldquo;FTS-GAN: A Novel Fuzzy-Driven GAN Model for Sparse Data Handling and Robust Temporal Modeling,&rdquo; <strong className="text-indigo-300">Expert Systems with Applications [Q1, IF: 9.4]</strong>, 132211, 2026.
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3">
                      <a
                        href="https://doi.org/10.1016/j.eswa.2026.132211"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline font-mono text-[11px] inline-flex items-center gap-1"
                      >
                        <span>https://doi.org/10.1016/j.eswa.2026.132211</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>

                  {/* [5] EP-RNN */}
                  <div className="p-3.5 rounded-lg bg-neutral-900/70 border-l-2 border-indigo-500 border-y border-r border-neutral-800">
                    <div className="text-neutral-200 leading-relaxed">
                      <span className="font-bold text-indigo-400">[5]</span> <strong className="text-white">A. Jahani</strong> et al., &ldquo;EP-RNN: Error-Projected Recurrent Neural Network for Time Series Forecasting,&rdquo; <strong className="text-indigo-300">Results in Engineering [Q1, IF: 9.4]</strong>, 110454, 2026.
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3">
                      <a
                        href="https://doi.org/10.1016/j.rineng.2026.110454"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline font-mono text-[11px] inline-flex items-center gap-1"
                      >
                        <span>https://doi.org/10.1016/j.rineng.2026.110454</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conference Section */}
              <div className="pt-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold mb-2">
                  Conference Papers (Oral Presentations):
                </div>

                <div className="space-y-3">
                  {/* [4] Self-updating LightGBM */}
                  <div className="p-3.5 rounded-lg bg-neutral-900/70 border-l-2 border-neutral-700 border-y border-r border-neutral-800">
                    <div className="text-neutral-300 leading-relaxed">
                      <span className="font-bold text-white">[4]</span> <strong className="text-white">A. Jahani</strong> et al., &ldquo;Self-updating LightGBM Clustering: A Hybrid Approach for Managing Data Intermittency, Noise, and Missing Values,&rdquo; In <strong className="text-neutral-200">2024 12th IEEE International Conference on Robotics and Mechatronics (ICRoM)</strong>, Oral.
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3">
                      <a
                        href="https://doi.org/10.1109/ICRoM64545.2024.10903571"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline font-mono text-[11px] inline-flex items-center gap-1"
                      >
                        <span>https://doi.org/10.1109/ICRoM64545.2024.10903571</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                      {onOpenDocument && (
                        <button
                          onClick={() => onOpenDocument('icrom-2024-cert')}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] font-mono border border-neutral-700 transition-colors"
                        >
                          <Award className="w-3 h-3 text-amber-400" />
                          <span>View Presentation Certificate</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* [3] FACTS */}
                  <div className="p-3.5 rounded-lg bg-neutral-900/70 border-l-2 border-neutral-700 border-y border-r border-neutral-800">
                    <div className="text-neutral-300 leading-relaxed">
                      <span className="font-bold text-white">[3]</span> <strong className="text-white">A. Jahani</strong> et al., &ldquo;FACTS: Feedback-Adaptive Learning for Cluster-Based Time Series Forecasting,&rdquo; In <strong className="text-neutral-200">2025 11th IEEE International Conference on Control, Instrumentation and Automation (ICCIA)</strong>, Oral.
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3">
                      <a
                        href="https://doi.org/10.1109/ICCIA69223.2025.11285964"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline font-mono text-[11px] inline-flex items-center gap-1"
                      >
                        <span>https://doi.org/10.1109/ICCIA69223.2025.11285964</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                      {onOpenDocument && (
                        <button
                          onClick={() => onOpenDocument('iccia-2025-cert')}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] font-mono border border-neutral-700 transition-colors"
                        >
                          <Award className="w-3 h-3 text-amber-400" />
                          <span>View Presentation Certificate</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* [2] VAE */}
                  <div className="p-3.5 rounded-lg bg-neutral-900/70 border-l-2 border-neutral-700 border-y border-r border-neutral-800">
                    <div className="text-neutral-300 leading-relaxed">
                      <span className="font-bold text-white">[2]</span> A. Mehrabi, D. A. Nejad, <strong className="text-white">A. Jahani</strong>, A. Rezaei, S. A. Khalilpour, H. K. Seyedi, and H. D. Taghirad, &ldquo;Variational Autoencoders: Tackling Imbalanced Data through Generative Modeling,&rdquo; In <strong className="text-neutral-200">2024 12th IEEE International Conference on Robotics and Mechatronics (ICRoM)</strong>, Oral.
                    </div>
                    <div className="mt-1.5">
                      <a
                        href="https://doi.org/10.1109/ICRoM64545.2024.10903609"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline font-mono text-[11px] inline-flex items-center gap-1"
                      >
                        <span>https://doi.org/10.1109/ICRoM64545.2024.10903609</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>

                  {/* [1] Two-Phase Clustering */}
                  <div className="p-3.5 rounded-lg bg-neutral-900/70 border-l-2 border-neutral-700 border-y border-r border-neutral-800">
                    <div className="text-neutral-300 leading-relaxed">
                      <span className="font-bold text-white">[1]</span> D. A. Nejad, A. Mehrabi, A. Rezaei, <strong className="text-white">A. Jahani</strong>, S. A. Khalilpour, H. K. Seyedi, and H. D. Taghirad, &ldquo;Bridging Complexity and Interpretability: A Two-Phase Clustering Framework,&rdquo; In <strong className="text-neutral-200">2024 12th IEEE International Conference on Robotics and Mechatronics (ICRoM)</strong>, Oral.
                    </div>
                    <div className="mt-1.5">
                      <a
                        href="https://doi.org/10.1109/ICRoM64545.2024.10903635"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline font-mono text-[11px] inline-flex items-center gap-1"
                      >
                        <span>https://doi.org/10.1109/ICRoM64545.2024.10903635</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Research and Industrial Experience */}
          <div>
            <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3 border-b border-neutral-800 pb-1">
              Research & Industrial Experience
            </h2>
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <div className="font-medium text-white text-sm">
                    <a
                      href="https://aras.kntu.ac.ir/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      Research Assistant at Applied Robotics and AI Solutions (ARAS)
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <span className="font-mono text-neutral-500 text-[11px]">Sep 2022 &ndash; Present</span>
                </div>
                
                <div className="text-neutral-300 font-medium mb-2">
                  ARAS-Fanoos: Foundation Model & Large-Scale Time-Series Forecasting
                </div>

                <ul className="space-y-1.5 text-neutral-300 pl-4 list-disc">
                  <li>
                    Deployed a live{' '}
                    <a
                      href="https://pakhsh.fanoos-ai.ir"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline font-semibold"
                    >
                      forecasting application
                    </a>{' '}
                    in production for major retail and food service chains, including{' '}
                    <a
                      href="https://cluna.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline font-medium"
                    >
                      Cluna
                    </a>
                    ,{' '}
                    <a
                      href="https://burgerland.ir/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline font-medium"
                    >
                      Burgerland
                    </a>
                    , and{' '}
                    <a
                      href="https://www.hyperme.ir/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline font-medium"
                    >
                      Hyperme
                    </a>
                    , driving intelligent sales forecasting and automated smart ordering across high-volume catalogs.
                  </li>
                  <li>
                    Led R&D of the ARAS-Fanoos foundation model for handling sparse, noisy, and intermittent multi-variate retail datasets with over 860,000 time series.
                  </li>
                  <li>
                    Formulated error-projected deep architectures (EP-RNN) and fuzzy generative adversarial models (FTS-GAN) achieving up to 83.3% error reduction over standard baselines.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Teaching & Mentorship */}
          <div>
            <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3 border-b border-neutral-800 pb-1">
              Teaching Experience & Academic Mentorship
            </h2>
            <div className="space-y-3 text-xs">
              
              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                <div>
                  <div className="font-medium text-white">Mentor for Undergraduate Machine Learning Projects</div>
                  <div className="text-neutral-400 text-[11px]">
                    <a
                      href="https://aras.kntu.ac.ir/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline"
                    >
                      Applied Robotics and AI Solutions (ARAS) Lab
                    </a>
                  </div>
                </div>
                <div className="text-neutral-400 font-mono text-[11px]">Fall 2024 &ndash; Fall 2025</div>
              </div>

              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                <div>
                  <div className="font-medium text-white">Robotics and Computer Vision</div>
                  <div className="text-neutral-400 text-[11px]">
                    Instructor:{' '}
                    <a
                      href="http://aras.kntu.ac.ir/taghirad/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline font-medium"
                    >
                      Prof. Hamid D. Taghirad
                    </a>
                  </div>
                </div>
                <div className="text-neutral-400 font-mono text-[11px]">2026</div>
              </div>

              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                <div>
                  <div className="font-medium text-white">Machine Learning</div>
                  <div className="text-neutral-400 text-[11px]">
                    Instructor:{' '}
                    <a
                      href="https://scholar.google.com/citations?hl=en&user=4tTSHmQAAAAJ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline font-medium"
                    >
                      Dr. Mahdi Aliyari-Shoorehdeli
                    </a>
                  </div>
                </div>
                <div className="text-neutral-400 font-mono text-[11px]">Fall 2025</div>
              </div>

              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                <div>
                  <div className="font-medium text-white">Neural Network Foundations</div>
                  <div className="text-neutral-400 text-[11px]">
                    Instructor:{' '}
                    <a
                      href="https://scholar.google.com/citations?hl=en&user=vk4WVkQAAAAJ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline font-medium"
                    >
                      Dr. Amirhossein Nikoofard
                    </a>
                  </div>
                </div>
                <div className="text-neutral-400 font-mono text-[11px]">Fall 2025</div>
              </div>

            </div>
          </div>

          {/* Honors & Awards */}
          <div>
            <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3 border-b border-neutral-800 pb-1">
              Honors and Awards
            </h2>
            <div className="space-y-2 text-xs text-neutral-300">
              <div className="flex justify-between items-center p-2 rounded bg-neutral-900/50">
                <span>&bull; <strong>Exceptionally Talented Student, M.Sc. Program</strong> (Ranked 1st out of 30)</span>
                <span className="font-mono text-neutral-500 text-[11px]">Jan 2026</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-neutral-900/50">
                <span>&bull; <strong>Exceptionally Talented Student, B.Sc. Program</strong> (Ranked 12th out of 118)</span>
                <span className="font-mono text-neutral-500 text-[11px]">Jan 2023</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-neutral-900/50">
                <span>&bull; <strong>National University Entrance Exam</strong> (Ranked top 1% out of 164,000 participants)</span>
                <span className="font-mono text-neutral-500 text-[11px]">Jul 2019</span>
              </div>
            </div>
          </div>

          {/* Academic References */}
          <div>
            <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3 border-b border-neutral-800 pb-1">
              Academic References & Letters of Recommendation
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
              
              {/* Prof Taghirad */}
              <div className="p-3.5 bg-neutral-900/80 border border-neutral-800 rounded-lg flex flex-col justify-between">
                <div>
                  <a
                    href="http://aras.kntu.ac.ir/taghirad/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white hover:text-indigo-400 hover:underline inline-flex items-center gap-1"
                  >
                    Prof. Hamid D. Taghirad
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <div className="text-indigo-400 text-[11px] font-medium mt-0.5">M.Sc. Supervisor</div>
                  <div className="text-neutral-400 text-[11px] mt-1">
                    Professor, Department of Electrical and Computer Engineering, K. N. Toosi University of Technology<br />
                    Director, Applied Robotics and AI Solutions (ARAS)
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-neutral-800 font-mono text-[11px] text-neutral-400 space-y-0.5">
                  <div>Tel: +98-21-8888-3001</div>
                  <div>Email: taghirad@kntu.ac.ir</div>
                </div>
              </div>

              {/* Dr Najafi */}
              <div className="p-3.5 bg-neutral-900/80 border border-neutral-800 rounded-lg flex flex-col justify-between">
                <div>
                  <a
                    href="https://scholar.google.com/citations?user=z14ukLwAAAAJ&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white hover:text-indigo-400 hover:underline inline-flex items-center gap-1"
                  >
                    Dr. Esmaeil Najafi
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <div className="text-indigo-400 text-[11px] font-medium mt-0.5">B.Sc. Supervisor & Advisor</div>
                  <div className="text-neutral-400 text-[11px] mt-1">
                    Associate Professor, Research Leader of "Mechatronics and Precision Engineering", Fontys University of Applied Sciences, The Netherlands
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-neutral-800 font-mono text-[11px] text-neutral-400 space-y-0.5">
                  <div>Tel: +31-642985979</div>
                  <div>Email: e.najafi@fontys.nl</div>
                  {onOpenDocument && (
                    <button
                      onClick={() => onOpenDocument('fontys-rec-letter')}
                      className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-indigo-400 hover:text-indigo-300 hover:underline font-sans"
                    >
                      <FileText className="w-3 h-3" />
                      <span>[View Recommendation Letter PDF]</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Dr Nikoofard */}
              <div className="p-3.5 bg-neutral-900/80 border border-neutral-800 rounded-lg flex flex-col justify-between">
                <div>
                  <a
                    href="https://scholar.google.com/citations?hl=en&user=vk4WVkQAAAAJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white hover:text-indigo-400 hover:underline inline-flex items-center gap-1"
                  >
                    Dr. Amirhossein Nikoofard
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <div className="text-indigo-400 text-[11px] font-medium mt-0.5">Research Advisor & Collaborator</div>
                  <div className="text-neutral-400 text-[11px] mt-1">
                    Associate Professor, Department of Electrical and Computer Engineering, K. N. Toosi University of Technology<br />
                    Head, Process Control Lab (APAC)
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-neutral-800 font-mono text-[11px] text-neutral-400 space-y-0.5">
                  <div>Tel: +98-21-8406-2209</div>
                  <div>Email: a.nikoofard@kntu.ac.ir</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
