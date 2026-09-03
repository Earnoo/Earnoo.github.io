import React from 'react';
import { EDUCATION_DATA, TEACHING_EXPERIENCES } from '../data/profileData';
import {
  GraduationCap,
  Award,
  BookOpen,
  Mic,
  Code2,
  Users,
  CheckCircle,
  Calendar,
  UserCheck
} from 'lucide-react';

export const AcademicTrajectory: React.FC = () => {
  const honors = [
    {
      title: 'Exceptionally Talented Student (M.Sc. Program)',
      date: 'Jan 2026',
      desc: 'Ranked 1st out of 30 students based on cumulative GPA (4.0 / 4.0, 18.6 / 20.0).',
    },
    {
      title: 'Exceptionally Talented Student (B.Sc. Program)',
      date: 'Jan 2023',
      desc: 'Ranked 12th out of 118 students based on cumulative GPA in Mechanical Engineering.',
    },
    {
      title: 'National University Entrance Exam (Konkur)',
      date: 'Jul 2019',
      desc: 'Ranked among top 1% nationwide out of 164,000 competing participants.',
    },
  ];

  const oralTalks = [
    {
      title: 'FACTS: Feedback-Adaptive Learning for Cluster-Based Time Series Forecasting',
      conference: '2025 11th IEEE International Conference on Control, Instrumentation and Automation (ICCIA)',
      type: 'Peer-Reviewed Oral Presentation',
      year: '2025',
    },
    {
      title: 'Self-updating LightGBM Clustering: A Hybrid Approach for Managing Data Intermittency, Noise, and Missing Values',
      conference: '2024 12th IEEE International Conference on Robotics and Mechatronics (ICRoM)',
      type: 'Peer-Reviewed Oral Presentation',
      year: '2024',
    },
  ];

  const skills = {
    'Languages & Core': ['Python', 'R', 'MATLAB', 'SQL', 'C++'],
    'Deep Learning & ML': ['PyTorch', 'TensorFlow', 'Scikit-learn', 'LightGBM', 'XGBoost', 'Hugging Face'],
    'Data & High-Perf': ['Pandas', 'NumPy', 'RAPIDS cuDF', 'MongoDB', 'PostgreSQL'],
    'Tools & Engineering': ['Git', 'LaTeX', 'Docker', 'Power BI', 'FastAPI', 'Linux'],
  };

  return (
    <section id="trajectory" className="py-16 sm:py-20 border-b border-neutral-800 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5" /> Academic Background
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white">
            Academic Trajectory, Honors & Teaching
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 leading-relaxed">
            A continuous record of top-tier academic performance, conference dissemination, and university-level instruction.
          </p>
        </div>

        {/* 2-Column Grid: Education & Honors */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Education Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              <span>Higher Education</span>
            </h3>

            <div className="space-y-4">
              {EDUCATION_DATA.map((edu, idx) => (
                <div
                  key={idx}
                  className="group bg-neutral-900 border border-neutral-800 hover:border-indigo-500/50 rounded-xl p-6 shadow-md transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {edu.degree}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      {edu.period}
                    </span>
                  </div>

                  <h4 className="text-base font-medium text-white mb-1 group-hover:text-indigo-400 transition-colors">
                    {edu.field}
                  </h4>
                  <div className="text-xs text-neutral-400 mb-3">
                    {edu.institution}
                  </div>

                  <div className="p-3 bg-neutral-950/80 rounded-lg border border-neutral-800/80 mb-3 text-xs space-y-1">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-neutral-400">Grade Point Average:</span>
                      <span className="text-emerald-400 font-bold">{edu.gpa}</span>
                    </div>
                    {edu.rank && (
                      <div className="flex items-center justify-between font-mono">
                        <span className="text-neutral-400">Class Standing:</span>
                        <span className="text-indigo-400 font-semibold">{edu.rank}</span>
                      </div>
                    )}
                  </div>

                  {edu.thesis && (
                    <div className="text-xs text-neutral-300">
                      <strong className="text-neutral-200 font-medium">M.Sc. Thesis: </strong>
                      <span className="text-neutral-400 italic">{edu.thesis}</span>
                    </div>
                  )}

                  {edu.supervisor && (
                    <div className="text-xs text-neutral-400 mt-1">
                      <strong className="text-neutral-300 font-medium">Supervisor: </strong>
                      <span className="text-neutral-300">{edu.supervisor}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Awards */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Honors & Distinctions</span>
            </h3>

            <div className="space-y-4">
              {honors.map((h, i) => (
                <div
                  key={i}
                  className="bg-neutral-900 border border-neutral-800 hover:border-indigo-500/50 rounded-xl p-5 shadow-sm transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-sm font-medium text-white">{h.title}</h4>
                    <span className="text-[10px] font-mono text-amber-400 font-medium px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      {h.date}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>

            {/* Conference Talks */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-indigo-400" />
                <span>Invited Academic Oral Talks</span>
              </h4>
              <div className="space-y-2.5">
                {oralTalks.map((talk, tIdx) => (
                  <div key={tIdx} className="p-3 rounded-lg bg-neutral-950/70 border border-neutral-800 text-xs">
                    <div className="font-medium text-indigo-300 mb-0.5">"{talk.title}"</div>
                    <div className="text-neutral-400">{talk.conference} &bull; <span className="text-emerald-400 font-medium">{talk.type}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Teaching Experience & Technical Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Teaching Roles */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              <span>Teaching & Mentorship</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {TEACHING_EXPERIENCES.map((t, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-indigo-500/50 text-xs flex flex-col justify-between transition-colors">
                  <div>
                    <div className="font-medium text-white text-sm mb-1">{t.course}</div>
                    <div className="text-indigo-400 font-medium mb-2">{t.role}</div>
                    <div className="text-neutral-400">Instructor: {t.instructor}</div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-500">
                    {t.term}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Bento */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-400" />
              <span>Technical Tooling & Stack</span>
            </h3>

            <div className="space-y-3">
              {Object.entries(skills).map(([category, items], cIdx) => (
                <div key={cIdx} className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div className="text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">
                    {category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
