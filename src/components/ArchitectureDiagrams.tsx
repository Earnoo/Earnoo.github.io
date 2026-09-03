import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Eye, CheckCircle2, ArrowRight, Layers, Sparkles, Sliders } from 'lucide-react';

interface DiagramProps {
  paperId: string;
}

export const ArchitectureDiagram: React.FC<DiagramProps> = ({ paperId }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  if (paperId === 'fts-gan-2026') {
    const steps = [
      { id: 0, title: '1. Raw Corrupted Data Filtering', desc: 'Raw time series window W_m evaluated against threshold n. Windows with >40 NaNs removed to guarantee integrity.' },
      { id: 1, title: '2. Self-Updating Fuzzy Clustering', desc: 'Points normalized to [0,1]. Pairwise distances d_ij and balance factors α_ij iteratively converge to prototype clusters F = φ(T).' },
      { id: 2, title: '3. Dual-Threshold Split (S_train vs S_impute)', desc: 'Windows with ≤k (k=10) missing values form training set S_train; heavily degraded windows go to imputation pool.' },
      { id: 3, title: '4. Discriminator Receives Fuzzified Inputs', desc: 'Discriminator D receives smooth fuzzified real windows F_m, preventing raw noise and outliers from distorting adversarial gradients.' },
      { id: 4, title: '5. Generator Imputation', desc: 'Generator produces crisp synthetic series from latent prior z. Missing NaNs in corrupted windows are accurately reconstructed.' },
    ];

    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-neutral-100 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-800">
          <div>
            <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Technical Architecture
            </div>
            <h4 className="text-lg font-medium text-white">FTS-GAN Pipeline & Discriminator Injection Flow</h4>
          </div>
          <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs">
            {steps.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveStep(idx)}
                className={`px-3 py-1.5 rounded font-medium transition-colors ${
                  activeStep === idx
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                Step {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Diagram Canvas */}
        <div className="relative w-full overflow-x-auto bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 mb-5">
          <svg viewBox="0 0 920 320" className="w-full min-w-[700px] h-auto font-mono text-xs">
            <defs>
              <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background grid */}
            <g stroke="#262626" strokeWidth="0.5" opacity="0.6">
              {[50, 100, 150, 200, 250, 300].map((y) => (
                <line key={`y-${y}`} x1="20" y1={y} x2="900" y2={y} />
              ))}
              {[150, 300, 450, 600, 750].map((x) => (
                <line key={`x-${x}`} x1={x} y1="20" x2={x} y2="300" />
              ))}
            </g>

            {/* Block 1: Raw Time Series */}
            <g
              onClick={() => setActiveStep(0)}
              className="cursor-pointer transition-opacity"
              opacity={activeStep === 0 ? 1 : 0.65}
            >
              <rect x="30" y="70" width="130" height="90" rx="8" fill="#171717" stroke={activeStep === 0 ? '#6366f1' : '#262626'} strokeWidth={activeStep === 0 ? 2 : 1} />
              <text x="95" y="105" textAnchor="middle" fill="#f5f5f5" fontWeight="bold" fontSize="13">Raw Series T</text>
              <text x="95" y="125" textAnchor="middle" fill="#a3a3a3" fontSize="10">Missing, noisy, sparse</text>
              <path d="M 45 140 Q 60 120 75 145 T 105 130 T 135 140" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
            </g>

            {/* Arrow 1 -> 2 */}
            <path d="M 160 115 L 200 115" stroke="#737373" strokeWidth="2" />

            {/* Block 2: Self-Updating Fuzzy Clustering */}
            <g
              onClick={() => setActiveStep(1)}
              className="cursor-pointer transition-opacity"
              opacity={activeStep === 1 ? 1 : 0.65}
            >
              <rect x="200" y="55" width="160" height="120" rx="8" fill="#171717" stroke={activeStep === 1 ? '#818cf8' : '#262626'} strokeWidth={activeStep === 1 ? 2 : 1} />
              <text x="280" y="85" textAnchor="middle" fill="#818cf8" fontWeight="bold" fontSize="12">FTS Preprocessing</text>
              <text x="280" y="105" textAnchor="middle" fill="#d4d4d4" fontSize="10">d_ij = ||z_i - z_j||</text>
              <text x="280" y="125" textAnchor="middle" fill="#a3a3a3" fontSize="10">Adaptive α_ij weights</text>
              <text x="280" y="145" textAnchor="middle" fill="#34d399" fontSize="10">Smooth F = φ(T)</text>
              <path d="M 220 160 Q 250 145 280 158 T 340 150" fill="none" stroke="#818cf8" strokeWidth="2" />
            </g>

            {/* Split Paths */}
            {/* Upper Path -> S_train */}
            <path d="M 360 95 L 430 95" stroke="#818cf8" strokeWidth="2" />
            <text x="395" y="85" textAnchor="middle" fill="#818cf8" fontSize="9">Missing ≤ k</text>

            {/* Lower Path -> S_impute */}
            <path d="M 360 135 L 400 135 L 400 245 L 720 245" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
            <text x="490" y="240" fill="#f59e0b" fontSize="10">Severely Corrupted S_impute (k &lt; NaNs ≤ n)</text>

            {/* Block 3: S_train */}
            <g
              onClick={() => setActiveStep(2)}
              className="cursor-pointer transition-opacity"
              opacity={activeStep === 2 ? 1 : 0.65}
            >
              <rect x="430" y="65" width="120" height="65" rx="8" fill="#171717" stroke={activeStep === 2 ? '#34d399' : '#262626'} strokeWidth={activeStep === 2 ? 2 : 1} />
              <text x="490" y="95" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="11">S_train (F_m)</text>
              <text x="490" y="113" textAnchor="middle" fill="#a3a3a3" fontSize="9.5">Representative FTS</text>
            </g>

            {/* Arrow S_train to Discriminator */}
            <path d="M 550 95 L 610 95" stroke="#34d399" strokeWidth="2" />
            <text x="580" y="88" textAnchor="middle" fill="#34d399" fontSize="9">Fuzzified Real</text>

            {/* Latent Prior z -> Generator */}
            <g>
              <circle cx="430" cy="185" r="22" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
              <text x="430" y="189" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">z ~ p_z</text>
            </g>
            <path d="M 452 185 L 490 185" stroke="#818cf8" strokeWidth="2" />

            {/* Generator Block */}
            <g
              onClick={() => setActiveStep(4)}
              className="cursor-pointer transition-opacity"
              opacity={activeStep === 4 ? 1 : 0.65}
            >
              <rect x="490" y="155" width="130" height="60" rx="8" fill="url(#purpleGrad)" stroke="#a78bfa" strokeWidth={activeStep === 4 ? 2 : 1} />
              <text x="555" y="182" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">Generator G(z)</text>
              <text x="555" y="200" textAnchor="middle" fill="#e0e7ff" fontSize="9.5">MLP [128, 256, L]</text>
            </g>

            {/* Arrow Generator to Discriminator */}
            <path d="M 620 185 L 670 185 L 670 145" stroke="#818cf8" strokeWidth="2" />
            <text x="650" y="200" textAnchor="middle" fill="#818cf8" fontSize="9">Synthetic G(z)</text>

            {/* Discriminator Block */}
            <g
              onClick={() => setActiveStep(3)}
              className="cursor-pointer transition-opacity"
              opacity={activeStep === 3 ? 1 : 0.65}
            >
              <rect x="610" y="65" width="140" height="80" rx="8" fill="url(#cyanGrad)" stroke="#818cf8" strokeWidth={activeStep === 3 ? 2 : 1} filter="url(#glow)" />
              <text x="680" y="95" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">Discriminator D</text>
              <text x="680" y="112" textAnchor="middle" fill="#f5f5f5" fontSize="10">Inputs: Fuzzified F</text>
              <text x="680" y="128" textAnchor="middle" fill="#e0e7ff" fontWeight="bold" fontSize="9">vs Crisp G(z)</text>
            </g>

            {/* Minimax Adversarial Feedback loop */}
            <path d="M 680 65 L 680 35 L 555 35 L 555 155" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="615" y="28" textAnchor="middle" fill="#818cf8" fontSize="9">Adversarial Gradients ∇_G / ∇_D</text>

            {/* Imputation Box */}
            <g
              onClick={() => setActiveStep(4)}
              className="cursor-pointer"
            >
              <rect x="730" y="195" width="160" height="80" rx="8" fill="#171717" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="810" y="225" textAnchor="middle" fill="#fde68a" fontWeight="bold" fontSize="11">Final Imputed Series</text>
              <text x="810" y="245" textAnchor="middle" fill="#a3a3a3" fontSize="9.5">W_hat_m Reconstructed</text>
              <text x="810" y="262" textAnchor="middle" fill="#34d399" fontSize="9 font-bold">RMSE down by up to 36%</text>
            </g>

            <path d="M 620 200 L 730 200" stroke="#f59e0b" strokeWidth="2" />
          </svg>
        </div>

        {/* Dynamic Step Explanation Box */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 flex items-start gap-3 text-sm">
          <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-medium text-white">{steps[activeStep].title}: </span>
            <span className="text-neutral-400">{steps[activeStep].desc}</span>
          </div>
        </div>
      </div>
    );
  }

  if (paperId === 'ep-rnn-2026') {
    const epGates = [
      { name: 'Forget Gate (f_t)', formula: 'f_t = σ(x_t W_x^{(f)} + h_{t-1} W_h^{(f)} + e_t W_e^{(f)} + b^{(f)})', role: 'Modulates memory retention in response to input-state discrepancy.' },
      { name: 'Input Gate (i_t)', formula: 'i_t = σ(x_t W_x^{(i)} + h_{t-1} W_h^{(i)} + e_t W_e^{(i)} + b^{(i)})', role: 'Highest innovation ratio (0.611). Decides what new data to admit.' },
      { name: 'Candidate (g~_t)', formula: 'g~_t = tanh(x_t W_x^{(g)} + h_{t-1} W_h^{(g)} + e_t W_e^{(g)} + b^{(g)})', role: 'Constructs candidate content shaped directly by the error vector.' },
      { name: 'Output Gate (o_t)', formula: 'o_t = σ(x_t W_x^{(o)} + h_{t-1} W_h^{(o)} + e_t W_e^{(o)} + b^{(o)})', role: 'Controls exposure of updated cell state (0.575 gate ratio).' },
    ];

    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-neutral-100 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-800">
          <div>
            <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Core Gate Architecture
            </div>
            <h4 className="text-lg font-medium text-white">EP-LSTM: Decoupled Hidden-Space Innovation Mechanism</h4>
          </div>
          <div className="text-xs text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800 font-mono">
            e_t = x_t W - h_{'{t-1}'} ∈ ℝ^H
          </div>
        </div>

        {/* SVG Diagram Canvas */}
        <div className="relative w-full overflow-x-auto bg-neutral-950/70 border border-neutral-800 rounded-xl p-4 mb-5">
          <svg viewBox="0 0 880 340" className="w-full min-w-[700px] h-auto font-mono text-xs">
            <defs>
              <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>

            {/* Input and State Nodes */}
            <rect x="40" y="270" width="100" height="45" rx="8" fill="#171717" stroke="#6366f1" strokeWidth="1.5" />
            <text x="90" y="297" textAnchor="middle" fill="#818cf8" fontWeight="bold" fontSize="13">Input x_t</text>

            <rect x="40" y="40" width="100" height="45" rx="8" fill="#171717" stroke="#525252" strokeWidth="1.5" />
            <text x="90" y="67" textAnchor="middle" fill="#d4d4d4" fontWeight="bold" fontSize="12">Cell c_{'{t-1}'}</text>

            <rect x="40" y="140" width="100" height="45" rx="8" fill="#171717" stroke="#525252" strokeWidth="1.5" />
            <text x="90" y="167" textAnchor="middle" fill="#d4d4d4" fontWeight="bold" fontSize="12">Hidden h_{'{t-1}'}</text>

            {/* Error Projection Subsystem */}
            <g>
              <rect x="190" y="185" width="220" height="75" rx="8" fill="#171717" stroke="#10b981" strokeWidth="2" strokeDasharray="5 3" />
              <text x="300" y="210" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="12">Hidden-Space Innovation</text>
              <rect x="210" y="222" width="80" height="28" rx="6" fill="#047857" />
              <text x="250" y="240" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">x_t · W</text>
              <text x="300" y="240" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">-</text>
              <rect x="310" y="222" width="85" height="28" rx="6" fill="#262626" stroke="#525252" />
              <text x="352" y="240" textAnchor="middle" fill="#d4d4d4" fontSize="10">h_{'{t-1}'}</text>
            </g>

            {/* Connecting lines into Innovation box */}
            <path d="M 140 292 L 250 292 L 250 250" stroke="#6366f1" strokeWidth="2" />
            <path d="M 140 162 L 352 162 L 352 222" stroke="#737373" strokeWidth="2" />

            {/* Output of Innovation: e_t */}
            <path d="M 410 222 L 460 222" stroke="#10b981" strokeWidth="2" />
            <text x="435" y="212" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="11">e_t ∈ ℝ^H</text>

            {/* The 4 Gates: Forget, Input, Candidate, Output */}
            {[
              { label: 'W_e^(f) → Forget f_t', y: 70, color: '#f59e0b' },
              { label: 'W_e^(i) → Input i_t', y: 130, color: '#10b981' },
              { label: 'W_e^(g) → Cand g~_t', y: 190, color: '#06b6d4' },
              { label: 'W_e^(o) → Output o_t', y: 250, color: '#8b5cf6' },
            ].map((g, idx) => (
              <g key={idx}>
                {/* Fork line from e_t */}
                <path d={`M 460 222 L 480 222 L 480 ${g.y + 15} L 510 ${g.y + 15}`} stroke="#10b981" strokeWidth="1.5" />
                <rect x="510" y={g.y} width="160" height="32" rx="6" fill="#171717" stroke={g.color} strokeWidth="1.5" />
                <text x="590" y={g.y + 20} textAnchor="middle" fill="#f5f5f5" fontSize="10.5" fontWeight="bold">{g.label}</text>
              </g>
            ))}

            {/* Next Cell and Hidden States */}
            <path d="M 140 62 L 720 62" stroke="#737373" strokeWidth="2" />
            <circle cx="720" cy="62" r="12" fill="#047857" />
            <text x="720" y="66" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">+</text>

            <rect x="760" y="40" width="100" height="45" rx="8" fill="#171717" stroke="#10b981" strokeWidth="1.5" />
            <text x="810" y="67" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="12">Cell c_t</text>

            <rect x="760" y="140" width="100" height="45" rx="8" fill="url(#emeraldGrad)" stroke="#34d399" strokeWidth="1.5" />
            <text x="810" y="167" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">Hidden h_t</text>

            <rect x="760" y="240" width="100" height="45" rx="8" fill="url(#blueGrad)" stroke="#818cf8" strokeWidth="1.5" />
            <text x="810" y="267" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">Readout y^_t</text>
            <path d="M 810 185 L 810 240" stroke="#818cf8" strokeWidth="2" />
          </svg>
        </div>

        {/* Gate Formulation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {epGates.map((gate, i) => (
            <div key={i} className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs">
              <div className="font-medium text-indigo-400 mb-1">{gate.name}</div>
              <code className="block bg-neutral-900 px-2 py-1.5 rounded text-[11px] text-neutral-200 mb-1.5 font-mono overflow-x-auto border border-neutral-800">
                {gate.formula}
              </code>
              <p className="text-neutral-400">{gate.role}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (paperId === 'facts-clustering-2025') {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-neutral-100 shadow-xl">
        <div className="mb-4 pb-4 border-b border-neutral-800">
          <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" /> 3-Stage Feedback Pipeline
          </div>
          <h4 className="text-lg font-medium text-white">FACTS: Feedback-Adaptive Learning Architecture</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4">
            <div className="w-7 h-7 rounded bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 font-bold flex items-center justify-center mb-3 text-xs">1</div>
            <h5 className="font-medium text-white mb-2 text-sm">Global Model & Feedback Extraction</h5>
            <p className="text-xs text-neutral-400 mb-3 leading-relaxed">
              Trains a unified global LightGBM on all 860,119 time series. Simulates past forecasts to compute historical residual error vectors:
            </p>
            <code className="block bg-neutral-900 p-2 rounded text-[11px] text-indigo-300 font-mono border border-neutral-800">
              e_i = E(w^_&#123;T-i&#125;, w_&#123;T-i&#125;)
            </code>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4">
            <div className="w-7 h-7 rounded bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 font-bold flex items-center justify-center mb-3 text-xs">2</div>
            <h5 className="font-medium text-white mb-2 text-sm">Feedback-Enriched Vector Space</h5>
            <p className="text-xs text-neutral-400 mb-3 leading-relaxed">
              Concatenates intrinsic features f_i with model error feedback e_i. Clusters series using normalized Davies-Bouldin optimization:
            </p>
            <code className="block bg-neutral-900 p-2 rounded text-[11px] text-indigo-300 font-mono border border-neutral-800">
              x_i = [f_i, e_i],  K = 10
            </code>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4">
            <div className="w-7 h-7 rounded bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center mb-3 text-xs">3</div>
            <h5 className="font-medium text-white mb-2 text-sm">Cluster-Specialized Adaptive Models</h5>
            <p className="text-xs text-neutral-400 mb-3 leading-relaxed">
              Trains dedicated model M_k on each cluster. Tailors predictive capacity to shared behavior archetypes, reducing MAPE by up to 9.3%:
            </p>
            <code className="block bg-neutral-900 p-2 rounded text-[11px] text-emerald-400 font-mono border border-neutral-800">
              w^_&#123;T+h&#125; = M_k(w_&#123;1:T&#125;), ∀ w ∈ C_k
            </code>
          </div>
        </div>
      </div>
    );
  }

  // Fallback / default
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-neutral-100 shadow-xl">
      <h4 className="text-lg font-medium text-white mb-2">Methodological Architecture</h4>
      <p className="text-sm text-neutral-400 leading-relaxed">
        Hybrid integration of fuzzy time series clustering preprocessing with multivariate gradient boosted trees and Tweedie compound Poisson distributions.
      </p>
    </div>
  );
};
