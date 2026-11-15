import { useState } from 'react';
import { APA_REFERENCES, ApaReference } from '../data/pmcisData';
import { Check, Copy, ExternalLink } from 'lucide-react';

export default function CitationsSection() {
  const [filterGroup, setFilterGroup] = useState<'All' | ApaReference['group']>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const filteredRefs =
    filterGroup === 'All'
      ? APA_REFERENCES
      : APA_REFERENCES.filter((r) => r.group === filterGroup);

  const copyText = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  const copyAllRefs = async () => {
    const fullBlock = filteredRefs
      .map((r) => `${r.apaText}${r.url ? ` ${r.url}` : ''}`)
      .join('\n\n');
    try {
      await navigator.clipboard.writeText(fullBlock);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1800);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <section id="citations" className="py-16 md:py-20 border-t border-white/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              Verified Sources & Academic Bibliography
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white headline-balance green-glow-text">
              References (APA 7th Edition) & Cited Sites
            </h2>
            <p className="text-zinc-300 text-base leading-relaxed">
              Every economic loss figure, adulteration surveillance rate, and multimodal sensing equation presented in this dossier is backed by peer-reviewed literature and international agricultural reports formatted in APA 7th Edition.
            </p>
          </div>

          <button
            type="button"
            onClick={copyAllRefs}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-white bg-emerald-500/20 hover:bg-emerald-500/30 text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0 self-start cursor-pointer"
          >
            {copiedAll ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Copied APA 7 List</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Copy All APA 7 Citations</span>
              </>
            )}
          </button>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              'All',
              'Core Project & Global Fertilizer Data',
              'Multimodal Sensing & Hardware Literature',
              'Supporting Global Reports'
            ] as const
          ).map((group) => {
            const active = filterGroup === group;
            return (
              <button
                key={group}
                type="button"
                onClick={() => setFilterGroup(group)}
                className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'green-effect-active text-white'
                    : 'bg-black border border-white/30 text-zinc-300 hover:border-white/70 hover:text-white'
                }`}
              >
                {group}
              </button>
            );
          })}
        </div>

        {/* APA 7 Reference List */}
        <div className="green-effect-frame rounded-lg divide-y divide-white/20">
          {filteredRefs.map((ref, idx) => {
            const fullCitation = `${ref.apaText}${ref.url ? ` ${ref.url}` : ''}`;
            const isCopied = copiedId === ref.id;
            return (
              <div
                key={ref.id}
                className="p-5 md:p-6 flex flex-col md:flex-row md:items-start justify-between gap-4 hover:bg-emerald-500/5 transition-colors"
              >
                <div className="space-y-2 max-w-4xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
                    <span className="text-emerald-400 font-semibold">
                      [{String(idx + 1).padStart(2, '0')}]
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{ref.group}</span>
                  </div>
                  <p className="text-sm md:text-base text-zinc-100 leading-relaxed pl-6 -indent-6">
                    {ref.apaText}{' '}
                    {ref.url && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 underline break-all"
                      >
                        <span>{ref.url}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0 inline" aria-hidden="true" />
                      </a>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start">
                  <button
                    type="button"
                    onClick={() => copyText(fullCitation, ref.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/50 bg-black hover:border-white text-xs font-mono text-zinc-200 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    aria-label={`Copy APA 7 citation for ${ref.authorsYear}`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        <span>Copy APA</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
