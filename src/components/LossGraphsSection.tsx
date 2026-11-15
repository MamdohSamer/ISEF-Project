import { useState } from 'react';
import {
  GRAPH_1_OVERUSE,
  GRAPH_2_UNDERUSE_FINANCIAL,
  GRAPH_2_UNDERUSE_YIELD_PCT,
  GRAPH_3_WRONG_LIQUID,
  GRAPH_3_WRONG_TOTAL,
  REGIONAL_QUALITY_CASES,
  LossMetric
} from '../data/pmcisData';

interface BarChartCardProps {
  indexLabel: string;
  title: string;
  subtitle: string;
  items: LossMetric[];
  maxScale: number;
  scaleUnit: string;
  headerControls?: React.ReactNode;
  footerNote: string;
}

function BarChartCard({
  indexLabel,
  title,
  subtitle,
  items,
  maxScale,
  scaleUnit,
  headerControls,
  footerNote
}: BarChartCardProps) {
  const [selectedId, setSelectedId] = useState<string>(items[0]?.id ?? '');
  const activeItem = items.find((i) => i.id === selectedId) ?? items[0];

  const chartHeight = 236;
  const chartWidth = 560;
  const padLeft = 52;
  const padRight = 24;
  const padTop = 26;
  const padBottom = 46;
  const plotW = chartWidth - padLeft - padRight;
  const plotH = chartHeight - padTop - padBottom;
  const slotW = plotW / Math.max(items.length, 1);
  const barW = Math.min(68, slotW * 0.56);

  const yTicks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <article className="green-effect-frame rounded-lg p-6 md:p-7 flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/20 pb-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
              {indexLabel}
            </div>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-white headline-balance">
              {title}
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {subtitle}
            </p>
          </div>
          {headerControls && <div className="shrink-0">{headerControls}</div>}
        </div>

        {/* Interactive SVG Chart */}
        <div className="rounded-md bg-black border border-white/40 p-3 md:p-4">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-auto overflow-visible"
            role="img"
            aria-label={title}
          >
            <defs>
              <linearGradient id={`greenGrad-${indexLabel.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#15803d" stopOpacity="0.45" />
              </linearGradient>
              <filter id={`greenGlow-${indexLabel.replace(/\s+/g, '')}`} x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#22c55e" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* Horizontal grid lines */}
            {yTicks.map((t) => {
              const y = padTop + plotH * (1 - t);
              const val = maxScale * t;
              const label =
                maxScale < 10
                  ? `${val.toFixed(1)}${scaleUnit}`
                  : `${Math.round(val)}${scaleUnit}`;
              return (
                <g key={t}>
                  <line
                    x1={padLeft}
                    y1={y}
                    x2={chartWidth - padRight}
                    y2={y}
                    stroke={t === 0 ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.14)'}
                    strokeWidth={t === 0 ? 1.2 : 1}
                    strokeDasharray={t === 0 ? undefined : '3 4'}
                  />
                  <text
                    x={padLeft - 8}
                    y={y + 4}
                    textAnchor="end"
                    className="fill-zinc-400 font-mono text-[10px]"
                  >
                    {label}
                  </text>
                </g>
              );
            })}

            {/* Bars */}
            {items.map((item, idx) => {
              const ratio = Math.min(1, Math.max(0.03, item.numericValue / maxScale));
              const h = plotH * ratio;
              const x = padLeft + idx * slotW + (slotW - barW) / 2;
              const y = padTop + plotH - h;
              const isSelected = activeItem?.id === item.id;
              const gradId = `greenGrad-${indexLabel.replace(/\s+/g, '')}`;
              const glowId = `greenGlow-${indexLabel.replace(/\s+/g, '')}`;

              return (
                <g
                  key={item.id}
                  className="cursor-pointer transition-opacity duration-150"
                  onClick={() => setSelectedId(item.id)}
                  onMouseEnter={() => setSelectedId(item.id)}
                >
                  <rect
                    x={x}
                    y={y}
                    width={barW}
                    height={h}
                    rx={3}
                    fill={`url(#${gradId})`}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 2 : 1}
                    filter={isSelected ? `url(#${glowId})` : undefined}
                    opacity={isSelected ? 1 : 0.72}
                  />
                  <text
                    x={x + barW / 2}
                    y={y - 8}
                    textAnchor="middle"
                    className="fill-white font-mono text-[11px] font-semibold"
                  >
                    {item.valueDisplay}
                  </text>
                  <text
                    x={x + barW / 2}
                    y={padTop + plotH + 18}
                    textAnchor="middle"
                    className={`font-sans text-[10.5px] ${
                      isSelected ? 'fill-emerald-300 font-semibold' : 'fill-zinc-300'
                    }`}
                  >
                    {item.shortLabel}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Active Bar Detail Panel */}
        {activeItem && (
          <div className="green-effect-subtle rounded-md p-4 border border-white/50 space-y-2">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-semibold text-white text-sm md:text-base">
                {activeItem.label}
              </span>
              <span className="font-mono tabular-nums text-emerald-400 font-semibold text-sm">
                {activeItem.valueDisplay}
              </span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {activeItem.detail}
            </p>
            <div className="text-xs font-mono text-zinc-400">
              Source: {activeItem.agency}
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-zinc-400 border-t border-white/15 pt-3 leading-relaxed">
        {footerNote}
      </div>
    </article>
  );
}

export default function LossGraphsSection() {
  const [graph2Mode, setGraph2Mode] = useState<'yield' | 'financial'>('yield');
  const [graph3Scale, setGraph3Scale] = useState<'liquid' | 'total'>('liquid');

  return (
    <section id="problem-graphs" className="py-16 md:py-20 border-t border-white/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Global Quantitative Problem Analysis
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white headline-balance green-glow-text">
            Three Global Failure Modes of Fertilizer Mismanagement
          </h2>
          <p className="text-zinc-300 text-base leading-relaxed">
            Global agricultural data reveals massive economic and ecological losses across three distinct error pathways: nutrient over-application, under-application (soil mining), and wrong, spoiled, or adulterated formulations. Click or hover any bar to inspect the verified reporting agency and agronomic impact.
          </p>
        </div>

        {/* Graph 1 + Graph 2 side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <BarChartCard
            indexLabel="Graph 01 · Overuse Losses"
            title="Losses from Too Much Fertilizer Usage"
            subtitle="Crops absorb only 50%–65% of applied nitrogen; excess nutrients leach into waterways, trigger algal dead zones, and pollute the air."
            items={GRAPH_1_OVERUSE}
            maxScale={360}
            scaleUnit="B"
            footerNote="Note: UNEP estimates total long-term nitrogen pollution burden between $340B (shown) and $3.4T annually. Global reporting combines liquid & solid nutrients as both deliver N-P-K."
          />

          <BarChartCard
            indexLabel="Graph 02 · Underuse Losses"
            title="Losses from Lack of Fertilizer Usage"
            subtitle="Insufficient application causes soil mining, starving drip-irrigated and stressed crops of rapid nutrient boosts."
            items={graph2Mode === 'yield' ? GRAPH_2_UNDERUSE_YIELD_PCT : GRAPH_2_UNDERUSE_FINANCIAL}
            maxScale={graph2Mode === 'yield' ? 14 : 220}
            scaleUnit={graph2Mode === 'yield' ? '%' : 'B'}
            headerControls={
              <div className="inline-flex rounded-md border border-white/60 bg-black p-1">
                <button
                  type="button"
                  onClick={() => setGraph2Mode('yield')}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    graph2Mode === 'yield'
                      ? 'bg-emerald-500/25 text-white border border-white/80'
                      : 'text-zinc-400 hover:text-white border border-transparent'
                  }`}
                >
                  Yield Drop (%)
                </button>
                <button
                  type="button"
                  onClick={() => setGraph2Mode('financial')}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    graph2Mode === 'financial'
                      ? 'bg-emerald-500/25 text-white border border-white/80'
                      : 'text-zinc-400 hover:text-white border border-transparent'
                  }`}
                >
                  Financial ($B)
                </button>
              </div>
            }
            footerNote="Switch between percentage yield reductions (UC Davis, FAO, CFR) and annual economic yield gaps (Nature $196B in Sub-Saharan Africa/MENA; $4B Africa soil degradation)."
          />
        </div>

        {/* Graph 3: Full-width focal breakdown for Wrong, Spoiled, Expired, or Counterfeit Fertilizers */}
        <div className="space-y-6">
          <BarChartCard
            indexLabel="Graph 03 · Quality & Formulation Failures (Target PMCIS Problem)"
            title="Losses from Wrong, Spoiled, Expired, or Counterfeit Fertilizers"
            subtitle="Calculated globally by combining 2026 Mordor Intelligence market baselines ($10.22B liquid market; $229.60B total market) with peer-reviewed laboratory failure surveillance (17.35% adulteration; 4.3% below-spec micronutrients)."
            items={graph3Scale === 'liquid' ? GRAPH_3_WRONG_LIQUID : GRAPH_3_WRONG_TOTAL}
            maxScale={graph3Scale === 'liquid' ? 2.5 : 55}
            scaleUnit="B"
            headerControls={
              <div className="inline-flex rounded-md border border-white/60 bg-black p-1">
                <button
                  type="button"
                  onClick={() => setGraph3Scale('liquid')}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    graph3Scale === 'liquid'
                      ? 'bg-emerald-500/25 text-white border border-white/80'
                      : 'text-zinc-400 hover:text-white border border-transparent'
                  }`}
                >
                  Liquid Segment ($10.22B)
                </button>
                <button
                  type="button"
                  onClick={() => setGraph3Scale('total')}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    graph3Scale === 'total'
                      ? 'bg-emerald-500/25 text-white border border-white/80'
                      : 'text-zinc-400 hover:text-white border border-transparent'
                  }`}
                >
                  Total Market ($229.60B)
                </button>
              </div>
            }
            footerNote="Broader context: OECD & EUIPO report $467B in total global counterfeit goods trade annually, while FAO (2023) estimates total agrifood environmental and nutrient mismanagement hidden costs reach $2.9 trillion globally."
          />

          {/* 4-column regional & laboratory evidence strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REGIONAL_QUALITY_CASES.map((item) => (
              <div
                key={item.region}
                className="green-effect-panel rounded-lg p-5 flex flex-col justify-between gap-3"
              >
                <div className="space-y-1.5">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {item.region}
                  </div>
                  <div className="font-mono tabular-nums text-2xl font-bold text-emerald-400">
                    {item.metric}
                  </div>
                  <p className="text-sm text-zinc-200 leading-snug">
                    {item.label}
                  </p>
                </div>
                <div className="text-xs font-mono text-zinc-400 border-t border-white/15 pt-2.5">
                  {item.source}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
