import { useState } from 'react';
import { PROCEDURE_STEPS } from '../data/pmcisData';
import { CheckSquare } from 'lucide-react';

export default function ProceduresSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const currentStep = PROCEDURE_STEPS[activeIndex] ?? PROCEDURE_STEPS[0];

  return (
    <section id="procedures" className="py-16 md:py-20 border-t border-white/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Experimental Methodology & Hardware Execution
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white headline-balance green-glow-text">
            Five-Step PMCIS Construction, Calibration & Fusion Procedure
          </h2>
          <p className="text-zinc-300 text-base leading-relaxed">
            Structured execution protocol covering 2S Li-ion power distribution, ESP32 GPIO pin mapping, 1413 µS/cm and distilled-water baseline calibration, N = 5 repeatability testing, thermodynamic normalization, and Euclidean vector classification.
          </p>
        </div>

        {/* Interactive 5-Step Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PROCEDURE_STEPS.map((step, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={step.stepNumber}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`text-left p-4 rounded-lg transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isActive
                    ? 'green-effect-active text-white'
                    : 'bg-black border border-white/35 text-zinc-300 hover:border-white/75 hover:text-white'
                }`}
              >
                <div className="text-xs font-mono text-emerald-400">
                  Step {step.stepNumber}
                </div>
                <div className="font-display font-semibold text-sm leading-snug">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Frame */}
        <div className="green-effect-frame rounded-lg p-6 md:p-8 space-y-6">
          <div className="border-b border-white/20 pb-5 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
              Procedure Step {currentStep.stepNumber}
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white headline-balance">
              {currentStep.title}
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed max-w-4xl">
              {currentStep.summary}
            </p>
          </div>

          <ul className="space-y-3.5">
            {currentStep.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-sm md:text-base text-zinc-200 leading-relaxed">
                <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-1" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {currentStep.equation && (
            <div className="green-effect-subtle rounded-md p-5 border border-white/60 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                {currentStep.equation.label}
              </div>
              <div className="font-mono text-sm md:text-base text-white font-semibold overflow-x-auto py-1">
                {currentStep.equation.formula}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {currentStep.equation.variables}
              </p>
            </div>
          )}

          {currentStep.pinout && (
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Materials, Subsystems & ESP32 Pinout Matrix
              </div>
              <div className="overflow-x-auto rounded-md border border-white/55 bg-black">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/30 text-xs font-mono uppercase text-zinc-400">
                      <th className="py-3 px-4">Subsystem</th>
                      <th className="py-3 px-4">Component</th>
                      <th className="py-3 px-4">ESP32 Pin / Rail</th>
                      <th className="py-3 px-4">Specification</th>
                      <th className="py-3 px-4">Functional Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/15">
                    {currentStep.pinout.map((row) => (
                      <tr key={row.subsystem} className="hover:bg-emerald-500/5 transition-colors">
                        <td className="py-3 px-4 font-medium text-white whitespace-nowrap">{row.subsystem}</td>
                        <td className="py-3 px-4 text-emerald-300 font-mono text-xs whitespace-nowrap">{row.component}</td>
                        <td className="py-3 px-4 font-mono text-xs text-white whitespace-nowrap">{row.gpioOrRail}</td>
                        <td className="py-3 px-4 text-zinc-300 text-xs">{row.spec}</td>
                        <td className="py-3 px-4 text-zinc-300 text-xs">{row.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
