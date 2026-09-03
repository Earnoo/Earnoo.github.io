import React from 'react';
import { X, Award, FileText, CheckCircle2, Download, ExternalLink, Building, Calendar, UserCheck } from 'lucide-react';

export interface DocumentItem {
  id: string;
  type: 'certificate' | 'rec_letter';
  title: string;
  subtitle: string;
  issuer: string;
  recipient: string;
  date: string;
  verificationBadge: string;
  fullContent: {
    header: string;
    organization: string;
    body: string[];
    signatory: {
      name: string;
      title: string;
      affiliation: string;
      contact?: string;
    };
    metadata?: { [key: string]: string };
  };
}

export const VERIFIED_DOCUMENTS: DocumentItem[] = [
  {
    id: 'iccia-2025-cert',
    type: 'certificate',
    title: 'Certificate of Paper Presentation — FACTS (ICCIA 2025)',
    subtitle: '11th International Conference on Control, Instrumentation, and Automation',
    issuer: 'ICCIA 2025 Organizing Committee & IEEE Iran Section',
    recipient: 'Mr. Alireza Jahani',
    date: 'November 11–13, 2025',
    verificationBadge: 'Verified Oral Presentation',
    fullContent: {
      header: 'CERTIFICATE OF PAPER PRESENTATION',
      organization: '11th International Conference on Control, Instrumentation, and Automation (ICCIA 2025)',
      body: [
        'This is to certify that the paper entitled:',
        '"FACTS: Feedback-Adaptive Learning for Cluster-Based Time Series Forecasting"',
        'Authored by: Alireza Jahani, Ali Mehrabi, S. Ahmad Khalilpour, Hamed Seyedi, Hamid D. Taghirad',
        'Was presented by Mr. Alireza Jahani as an Oral Presentation at the 11th International Conference on Control, Instrumentation, and Automation (ICCIA 2025), held on November 11 to 13, 2025.'
      ],
      signatory: {
        name: 'Prof. Mohammad Bagher Menhaj',
        title: 'Conference General Chair',
        affiliation: 'ICCIA 2025 Organizing Committee',
      },
      metadata: {
        'Paper ID': 'ICCIA-2025-11285964',
        'Presentation Format': 'Oral Session (Time Series & AI)',
        'Conference Dates': 'Nov 11–13, 2025',
        'Index': 'IEEE Xplore Digital Library',
      }
    }
  },
  {
    id: 'icrom-2024-cert',
    type: 'certificate',
    title: 'Certificate of Presentation — Self-Updating LightGBM (ICRoM 2024)',
    subtitle: '12th RSI International Conference on Robotics and Mechatronics',
    issuer: 'Robotics Society of Iran (RSI) & IEEE Iran Section',
    recipient: 'Alireza Jahani',
    date: 'December 17–19, 2024',
    verificationBadge: 'Verified Oral Presentation',
    fullContent: {
      header: 'CERTIFICATE OF PRESENTATION',
      organization: '12th RSI International Conference on Robotics and Mechatronics (ICRoM 2024)',
      body: [
        'This is to certify that the paper entitled:',
        '"Self-Updating LightGBM Clustering: A Hybrid Approach for Managing Data Intermittency, Noise, and Missing Values"',
        'Authored by: Alireza Jahani, Alireza Rezaei, Ali Mehrabi, Danial A. Nejad, S. Ahmad Khalilpour, Hamed Kh. Seyedi and Hamid D. Taghirad',
        'Was presented in Oral format at the 12th RSI International Conference on Robotics and Mechatronics (ICRoM 2024), held on December 17–19, 2024.'
      ],
      signatory: {
        name: 'Conference Chair & Scientific Committee',
        title: 'Executive Committee',
        affiliation: 'Robotics Society of Iran (RSI)',
      },
      metadata: {
        'Paper Number': 'ICRoM-2024-10903571',
        'Presentation Format': 'Oral Technical Session',
        'Conference Dates': 'Dec 17–19, 2024',
        'Index': 'IEEE Xplore Digital Library',
      }
    }
  },
  {
    id: 'fontys-rec-letter',
    type: 'rec_letter',
    title: 'Letter of Recommendation — Dr. Esmaeil Najafi',
    subtitle: 'Fontys University of Applied Sciences, Eindhoven, The Netherlands',
    issuer: 'Fontys University of Applied Sciences & Mechatronics and Precision Engineering Group',
    recipient: 'Alireza Jahani',
    date: 'Academic Year 2025/2026',
    verificationBadge: 'Official Academic Reference',
    fullContent: {
      header: 'LETTER OF RECOMMENDATION FOR GRADUATE ADMISSION',
      organization: 'Fontys University of Applied Sciences — Eindhoven, The Netherlands',
      body: [
        'To: Graduate Admissions Committee',
        'It is my distinct pleasure to write this letter of recommendation for Mr. Alireza Jahani in support of his application for the Ph.D. program in Machine Learning, Deep Learning, and Artificial Intelligence.',
        'I have known Alireza for several years in my capacity as an Associate Professor and Research Leader of the Mechatronics and Precision Engineering group at Fontys University of Applied Sciences, and as his B.Sc. thesis supervisor and ongoing research collaborator. During this period, we collaborated closely on advanced predictive modeling, sequential deep learning, and robust neural architectures, culminating in co-authored peer-reviewed research including our 2026 Q1 journal paper "EP-RNN: Error-Projected Recurrent Neural Network for Time Series Forecasting" published in Results in Engineering (Impact Factor: 9.4).',
        'Throughout his research projects, Alireza has consistently impressed me with his mathematical maturity, deep intellectual curiosity, and remarkable ability to formulate original neural network mechanisms. He does not simply apply existing machine learning tools; he investigates the mathematical core of why models fail under noise, outliers, and sparsity, and devises novel architectural solutions.',
        'Beyond his theoretical acumen, Alireza is a dedicated researcher who combines rigorous experimental design with exceptional software engineering skills. He has demonstrated high productivity, self-motivation, and scientific integrity, maintaining a top rank (1st out of 30) in his M.Sc. program.',
        'I am fully confident that Alireza has the intellectual capability, research drive, and resilience to excel in a top-tier doctoral program. He has my highest and most enthusiastic recommendation without reservation.'
      ],
      signatory: {
        name: 'Dr. Esmaeil Najafi, Ph.D.',
        title: 'Associate Professor & Research Leader of "Mechatronics and Precision Engineering"',
        affiliation: 'Fontys University of Applied Sciences, Eindhoven, The Netherlands',
        contact: 'Email: e.najafi@fontys.nl | Tel: +31-642985979',
      },
      metadata: {
        'Referee Relation': 'B.Sc. Supervisor & Research Advisor (Co-Author on EP-RNN)',
        'Institution': 'Fontys University of Applied Sciences, Netherlands',
        'Academic Ranking': 'Top Tier Recommendation',
      }
    }
  }
];

interface DocumentViewerModalProps {
  documentId: string | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({ documentId, onClose }) => {
  const [currentId, setCurrentId] = React.useState<string | null>(documentId);

  React.useEffect(() => {
    setCurrentId(documentId);
  }, [documentId]);

  if (!documentId) return null;

  const doc = VERIFIED_DOCUMENTS.find((d) => d.id === currentId) || VERIFIED_DOCUMENTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden text-neutral-100 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/80">
          <div className="flex items-center gap-2.5">
            {doc.type === 'certificate' ? (
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Award className="w-4 h-4" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <FileText className="w-4 h-4" />
              </div>
            )}
            <div>
              <div className="font-medium text-white text-sm">{doc.title}</div>
              <div className="text-[11px] text-neutral-400">{doc.subtitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" />
              <span>{doc.verificationBadge}</span>
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate / Letter Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6 bg-[#0a0a0a]">
          
          {/* Certificate Style Frame */}
          <div className="border border-neutral-800 rounded-xl p-6 sm:p-8 bg-neutral-900/60 relative overflow-hidden">
            {/* Top decorative badge */}
            <div className="text-center pb-6 border-b border-neutral-800/80">
              <div className="text-[11px] font-mono tracking-widest text-indigo-400 uppercase font-semibold mb-1">
                {doc.fullContent.organization}
              </div>
              <h2 className="text-xl sm:text-2xl font-light text-white tracking-wide">
                {doc.fullContent.header}
              </h2>
              <div className="text-xs text-neutral-400 mt-1">{doc.date}</div>
            </div>

            {/* Content text */}
            <div className="py-6 space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {doc.fullContent.body.map((paragraph, pIdx) => (
                <p
                  key={pIdx}
                  className={
                    paragraph.startsWith('"')
                      ? 'font-serif text-sm sm:text-base italic text-indigo-300 pl-4 border-l-2 border-indigo-500 py-1 my-3'
                      : paragraph.startsWith('Authored by') || paragraph.startsWith('This is to certify')
                      ? 'text-neutral-200'
                      : ''
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Signatory Box */}
            <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Authorized Signatory / Reference:</div>
                <div className="font-semibold text-white text-sm">{doc.fullContent.signatory.name}</div>
                <div className="text-xs text-neutral-300">{doc.fullContent.signatory.title}</div>
                <div className="text-xs text-neutral-400">{doc.fullContent.signatory.affiliation}</div>
                {doc.fullContent.signatory.contact && (
                  <div className="text-[11px] font-mono text-indigo-400 mt-1">{doc.fullContent.signatory.contact}</div>
                )}
              </div>

              {doc.fullContent.metadata && (
                <div className="p-3 bg-neutral-950/80 rounded-lg border border-neutral-800 text-[11px] font-mono space-y-1 sm:text-right">
                  {Object.entries(doc.fullContent.metadata).map(([key, val]) => (
                    <div key={key}>
                      <span className="text-neutral-500">{key}: </span>
                      <span className="text-neutral-300">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Switcher */}
          <div className="pt-2">
            <div className="text-xs text-neutral-500 mb-2 font-mono uppercase tracking-wider">Other Academic Documents:</div>
            <div className="flex flex-wrap gap-2">
              {VERIFIED_DOCUMENTS.map((other) => (
                <button
                  key={other.id}
                  onClick={() => setCurrentId(other.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    other.id === doc.id
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {other.title.split('—')[0]}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
