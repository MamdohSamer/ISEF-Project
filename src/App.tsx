import { useState } from 'react';
import { ABSTRACT_TEXT } from './data/pmcisData';
import LossGraphsSection from './components/LossGraphsSection';
import MultimodalSimulator from './components/MultimodalSimulator';
import ProceduresSection from './components/ProceduresSection';
import CitationsSection from './components/CitationsSection';
import { ArrowDownRight } from 'lucide-react';

export default function App() {
  const [abstractLang, setAbstractLang] = useState<'en' | 'ar'>('en');

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col">
      {/* Top Bar: Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-sm border-b border-white/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            PMCIS
          </a>

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
            <a
              href="#abstract"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              Problem Abstract
            </a>
            <a
              href="#problem-graphs"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              Loss Graphs
            </a>
            <a
              href="#sensor-workbench"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              7D Sensor Lab
            </a>
            <a
              href="#procedures"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              Procedures
            </a>
            <a
              href="#citations"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              APA Citations
            </a>
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="shrink-0">
            <a
              href="#sensor-workbench"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold text-white bg-emerald-600/30 border border-white hover:bg-emerald-500/40 transition-colors whitespace-nowrap shrink-0 shadow-[0_0_18px_-4px_rgba(34,197,94,0.5)]"
            >
              <span>Explore 7D Lab</span>
              <ArrowDownRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero Split Section */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Hero Narrative */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-8">
                <div className="space-y-5">
                  <div className="text-xs font-mono text-emerald-400 tracking-wide">
                    Systems Software & Embedded Systems · Chemical Sensing & Analytical Systems
                  </div>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-white leading-[1.12] headline-balance green-glow-text">
                    Portable Multimodal Chemical Identification System
                  </h1>
                  <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl">
                    Solving global liquid fertilizer misidentification, salt adulteration, and single-sensor conductivity overlap. PMCIS fuses electrochemical, thermal, and optical sensing on an ESP32 platform to verify formulations and flag degraded batches in real time.
                  </p>
                </div>

                {/* Core Problem & Solution Contrast Box */}
                <div className="green-effect-panel rounded-lg p-5 md:p-6 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                    The Core Analytical Bottleneck
                  </div>
                  <p className="text-sm md:text-base text-zinc-200 leading-relaxed">
                    Benchtop HPLC, Mass Spectrometry, and spectrophotometers are non-portable and too costly for daily farm screening. Meanwhile, ordinary handheld EC/TDS pens measure only total ionic conductivity—failing to tell real NPK nutrients apart from cheap salt adulterants or thermally drifted dilutions.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href="#problem-graphs"
                      className="inline-flex items-center px-4 py-2 rounded-md text-xs font-semibold text-white bg-emerald-500/25 border border-white hover:bg-emerald-500/35 transition-colors whitespace-nowrap shrink-0"
                    >
                      View Global Loss Graphs
                    </a>
                    <a
                      href="#procedures"
                      className="inline-flex items-center px-4 py-2 rounded-md text-xs font-semibold text-zinc-200 bg-black border border-white/55 hover:border-white hover:text-white transition-colors whitespace-nowrap shrink-0"
                    >
                      Read 5-Step Procedure
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Hero Technical Architecture Schematic */}
              <div className="lg:col-span-5 green-effect-frame rounded-lg p-6 flex flex-col justify-between gap-5">
                <div className="flex items-center justify-between border-b border-white/20 pb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                    Multimodal Architecture
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    7-Dimensional Vector
                  </span>
                </div>

                {/* Crisp Black / Green-Glow / White-Border Hardware Flow SVG */}
                <svg
                  viewBox="0 0 420 310"
                  className="w-full h-auto"
                  role="img"
                  aria-label="PMCIS ESP32 four-modality sensor fusion diagram"
                >
                  <defs>
                    <filter id="nodeGlow" x="-25%" y="-25%" width="150%" height="150%">
                      <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#22c55e" floodOpacity="0.55" />
                    </filter>
                  </defs>

                  {/* Connecting signal traces */}
                  <path d="M 155 42 L 245 128" stroke="#4ade80" strokeWidth="1.5" fill="none" />
                  <path d="M 155 114 L 245 144" stroke="#4ade80" strokeWidth="1.5" fill="none" />
                  <path d="M 155 186 L 245 162" stroke="#4ade80" strokeWidth="1.5" fill="none" />
                  <path d="M 155 258 L 245 178" stroke="#4ade80" strokeWidth="1.5" fill="none" />

                  {/* Sensor Input Nodes */}
                  <g>
                    <rect x="10" y="18" width="150" height="48" rx="5" fill="#040805" stroke="#ffffff" strokeWidth="1.2" />
                    <text x="20" y="38" className="fill-emerald-400 font-mono text-[10px] font-semibold">GPIO 34 · ADC1</text>
                    <text x="20" y="54" className="fill-white font-sans text-[11px] font-medium">Gravity TDS (EC_T)</text>
                  </g>

                  <g>
                    <rect x="10" y="90" width="150" height="48" rx="5" fill="#040805" stroke="#ffffff" strokeWidth="1.2" />
                    <text x="20" y="110" className="fill-emerald-400 font-mono text-[10px] font-semibold">GPIO 4 · 4.7kΩ</text>
                    <text x="20" y="126" className="fill-white font-sans text-[11px] font-medium">DS18B20 Temp (T)</text>
                  </g>

                  <g>
                    <rect x="10" y="162" width="150" height="48" rx="5" fill="#040805" stroke="#ffffff" strokeWidth="1.2" />
                    <text x="20" y="182" className="fill-emerald-400 font-mono text-[10px] font-semibold">GPIO 21/22 · I2C</text>
                    <text x="20" y="198" className="fill-white font-sans text-[11px] font-medium">TCS34725 (RGB + C)</text>
                  </g>

                  <g>
                    <rect x="10" y="234" width="150" height="48" rx="5" fill="#040805" stroke="#ffffff" strokeWidth="1.2" />
                    <text x="20" y="254" className="fill-emerald-400 font-mono text-[10px] font-semibold">GPIO 35 · ADC1</text>
                    <text x="20" y="270" className="fill-white font-sans text-[11px] font-medium">660nm + BPW34 (A)</text>
                  </g>

                  {/* ESP32 Central Fusion Hub */}
                  <rect
                    x="245"
                    y="98"
                    width="162"
                    height="112"
                    rx="6"
                    fill="#07160c"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                    filter="url(#nodeGlow)"
                  />
                  <text x="326" y="124" textAnchor="middle" className="fill-emerald-400 font-mono text-[10px] font-semibold">
                    ESP32 DEVKIT V1
                  </text>
                  <text x="326" y="144" textAnchor="middle" className="fill-white font-display text-[13px] font-bold">
                    7D Vector Fusion
                  </text>
                  <text x="326" y="164" textAnchor="middle" className="fill-zinc-300 font-mono text-[9.5px]">
                    EC₂₅ + Beer-Lambert
                  </text>
                  <text x="326" y="182" textAnchor="middle" className="fill-zinc-300 font-mono text-[9.5px]">
                    Euclidean Distance Match
                  </text>
                  <text x="326" y="198" textAnchor="middle" className="fill-emerald-300 font-mono text-[9.5px]">
                    [EC₂₅, T, R, G, B, C, A₆₆₀]ᵀ
                  </text>
                </svg>

                <div className="text-xs text-zinc-300 border-t border-white/20 pt-3 leading-relaxed">
                  Powered by 2S 18650 Li-ion cells (7.4V) + 2S BMS + regulated 5V Buck Converter for remote field deployment.
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Quantitative KPI Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="green-effect-panel rounded-lg p-5 space-y-1.5">
                <div className="text-xs font-mono uppercase text-zinc-400">
                  Overuse Nitrogen Waste
                </div>
                <div className="font-mono tabular-nums text-2xl md:text-3xl font-bold text-emerald-400">
                  $200B / yr
                </div>
                <p className="text-xs text-zinc-300">
                  Lost to air & water runoff; plus $152B in aquatic ecosystem damage (UNECE, 2021).
                </p>
              </div>

              <div className="green-effect-panel rounded-lg p-5 space-y-1.5">
                <div className="text-xs font-mono uppercase text-zinc-400">
                  Underuse Yield Loss
                </div>
                <div className="font-mono tabular-nums text-2xl md:text-3xl font-bold text-emerald-400">
                  $196B / yr
                </div>
                <p className="text-xs text-zinc-300">
                  Lost annual crop output in under-fertilized regions; 10% yield drop across 1.7B people (FAO, 2023).
                </p>
              </div>

              <div className="green-effect-panel rounded-lg p-5 space-y-1.5">
                <div className="text-xs font-mono uppercase text-zinc-400">
                  Liquid Adulteration Rate
                </div>
                <div className="font-mono tabular-nums text-2xl md:text-3xl font-bold text-emerald-400">
                  17.35%
                </div>
                <p className="text-xs text-zinc-300">
                  Lab-tested macro/micro-nutrients adulterated; $2.21B liquid & $49.71B total market waste (Siddique et al., 2023).
                </p>
              </div>

              <div className="green-effect-panel rounded-lg p-5 space-y-1.5">
                <div className="text-xs font-mono uppercase text-zinc-400">
                  PMCIS Thermal Error Drop
                </div>
                <div className="font-mono tabular-nums text-2xl md:text-3xl font-bold text-emerald-400">
                  18.4% → &lt;1.2%
                </div>
                <p className="text-xs text-zinc-300">
                  Real-time 25°C compensation across 15°C–35°C ambient range for varying salt solubility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bilingual Research Abstract (English & Arabic from Project Dossier) */}
        <section id="abstract" className="py-12 md:py-16 border-t border-white/25">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="green-effect-frame rounded-lg p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                    Project Abstract · Problem & Sensor Solution
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                    {abstractLang === 'en'
                      ? 'Why Liquid Fertilizer Verification Matters'
                      : 'المستخلص البحثي — مشكلة التحقق من الأسمدة السائلة وحل نظام PMCIS'}
                  </h2>
                </div>

                <div className="inline-flex rounded-md border border-white/70 bg-black p-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setAbstractLang('en')}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      abstractLang === 'en'
                        ? 'bg-emerald-500/25 text-white border border-white/80'
                        : 'text-zinc-400 hover:text-white border border-transparent'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setAbstractLang('ar')}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      abstractLang === 'ar'
                        ? 'bg-emerald-500/25 text-white border border-white/80'
                        : 'text-zinc-400 hover:text-white border border-transparent'
                    }`}
                  >
                    العربية
                  </button>
                </div>
              </div>

              <p
                dir={abstractLang === 'ar' ? 'rtl' : 'ltr'}
                className={`text-sm md:text-base text-zinc-200 leading-[1.85] ${
                  abstractLang === 'ar' ? 'text-right' : 'text-left'
                }`}
              >
                {ABSTRACT_TEXT[abstractLang]}
              </p>
            </div>
          </div>
        </section>

        {/* Three Global Loss Graphs */}
        <LossGraphsSection />

        {/* Interactive 7D Multimodal Lab */}
        <MultimodalSimulator />

        {/* 5-Step Experimental Procedures & Pinout Matrix */}
        <ProceduresSection />

        {/* APA 7th Edition Citations & Sites */}
        <CitationsSection />
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-white/25 bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="space-y-1">
            <div className="font-display font-semibold text-white">
              Portable Multimodal Chemical Identification System (PMCIS)
            </div>
            <div>
              Integrated Electrochemical, Thermal, and Optical Sensing Platform · ESP32 DevKit V1
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#problem-graphs" className="hover:text-emerald-400 transition-colors">
              Loss Graphs
            </a>
            <a href="#sensor-workbench" className="hover:text-emerald-400 transition-colors">
              7D Sensor Lab
            </a>
            <a href="#procedures" className="hover:text-emerald-400 transition-colors">
              Procedures
            </a>
            <a href="#citations" className="hover:text-emerald-400 transition-colors">
              APA 7 Citations
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
