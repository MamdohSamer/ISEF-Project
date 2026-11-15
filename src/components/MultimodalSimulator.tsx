import { useMemo, useState } from 'react';
import { SAMPLE_PROFILES, SampleProfile } from '../data/pmcisData';
import { AlertTriangle, CheckCircle2, Sliders } from 'lucide-react';

const ALPHA = 0.0191;

function normalizeVector(sample: SampleProfile, tempC: number): number[] {
  // Normalized 0..1 across 7 dimensions for radar visualization & distance calculation
  return [
    Math.min(1, sample.ec25 / 6000),
    Math.min(1, Math.max(0, (tempC - 10) / 30)),
    sample.rgb[0] / 255,
    sample.rgb[1] / 255,
    sample.rgb[2] / 255,
    Math.min(1, sample.clear / 1000),
    Math.min(1, sample.absorbance660 / 1.0)
  ];
}

function euclideanDistance7D(a: SampleProfile, b: SampleProfile): number {
  const va = [
    a.ec25 / 6000,
    a.rgb[0] / 255,
    a.rgb[1] / 255,
    a.rgb[2] / 255,
    a.clear / 1000,
    a.absorbance660 / 1.0
  ];
  const vb = [
    b.ec25 / 6000,
    b.rgb[0] / 255,
    b.rgb[1] / 255,
    b.rgb[2] / 255,
    b.clear / 1000,
    b.absorbance660 / 1.0
  ];
  const sumSq = va.reduce((acc, val, idx) => acc + Math.pow(val - vb[idx], 2), 0);
  return Math.sqrt(sumSq);
}

export default function MultimodalSimulator() {
  const [selectedId, setSelectedId] = useState<string>('salt-adulterated');
  const [tempC, setTempC] = useState<number>(32);
  const [sensorMode, setSensorMode] = useState<'pmcis' | 'legacy1d'>('pmcis');

  const activeSample = useMemo(
    () => SAMPLE_PROFILES.find((s) => s.id === selectedId) ?? SAMPLE_PROFILES[0],
    [selectedId]
  );

  // Compute raw uncompensated EC_T at chosen temperature T
  const rawEcAtT = Math.round(activeSample.ec25 * (1 + ALPHA * (tempC - 25)));
  const tempDriftPct = ((rawEcAtT - activeSample.ec25) / activeSample.ec25) * 100;
  // PMCIS compensated EC_25
  const compensatedEc25 = Math.round(rawEcAtT / (1 + ALPHA * (tempC - 25)));

  // Legacy 1D collision check (matches any profile within +/- 180 uS/cm)
  const legacyMatches = useMemo(() => {
    return SAMPLE_PROFILES.filter(
      (p) => Math.abs(p.ec25 - rawEcAtT) <= 350 || Math.abs(p.ec25 - activeSample.ec25) <= 180
    );
  }, [activeSample, rawEcAtT]);

  // 7D Euclidean distance vs authentic standards
  const rankedDistances = useMemo(() => {
    const cleanStandards = SAMPLE_PROFILES.filter((p) => p.category !== 'Fault / Adulterated');
    return cleanStandards
      .map((ref) => ({
        ref,
        distance: euclideanDistance7D(activeSample, ref)
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [activeSample]);

  const closestStandard = rankedDistances[0];
  const isAnomaly = activeSample.category === 'Fault / Adulterated' || (closestStandard && closestStandard.distance > 0.18);

  // Radar Chart geometry
  const cx = 175;
  const cy = 165;
  const radius = 112;
  const axes = [
    { label: 'EC₂₅', val: activeSample.ec25 / 6000 },
    { label: 'TEMP', val: (tempC - 10) / 30 },
    { label: 'RED', val: activeSample.rgb[0] / 255 },
    { label: 'GREEN', val: activeSample.rgb[1] / 255 },
    { label: 'BLUE', val: activeSample.rgb[2] / 255 },
    { label: 'CLEAR', val: activeSample.clear / 1000 },
    { label: 'A₆₆₀', val: activeSample.absorbance660 / 1.0 }
  ];

  const getPoint = (idx: number, ratio: number) => {
    const angle = (Math.PI * 2 * idx) / axes.length - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * radius * ratio,
      y: cy + Math.sin(angle) * radius * ratio
    };
  };

  const activePolygonPoints = axes
    .map((ax, i) => {
      const pt = getPoint(i, Math.max(0.06, Math.min(1, ax.val)));
      return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
    })
    .join(' ');

  // Comparison reference overlay (NPK 10-10-10 when viewing adulterated, or KCl when viewing NaCl)
  const compareProfile = useMemo(() => {
    if (activeSample.id === 'nacl-50') return SAMPLE_PROFILES.find((p) => p.id === 'kcl-50');
    if (activeSample.id === 'kcl-50') return SAMPLE_PROFILES.find((p) => p.id === 'nacl-50');
    if (activeSample.id === 'salt-adulterated') return SAMPLE_PROFILES.find((p) => p.id === 'npk-balanced');
    return undefined;
  }, [activeSample]);

  const comparePolygonPoints = compareProfile
    ? normalizeVector(compareProfile, tempC)
        .map((v, i) => {
          const pt = getPoint(i, Math.max(0.06, Math.min(1, v)));
          return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
        })
        .join(' ')
    : null;

  return (
    <section id="sensor-workbench" className="py-16 md:py-20 border-t border-white/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              Interactive Analytical Ambiguity Lab
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white headline-balance green-glow-text">
              Why Single-Sensor Meters Fail — And How PMCIS 7D Fusion Solves It
            </h2>
            <p className="text-zinc-300 text-base leading-relaxed">
              Conventional handheld TDS/EC pens only measure total ionic conductivity. Distinct chemicals like <span className="text-white font-medium">NaCl vs. KCl</span> or <span className="text-white font-medium">Salt-Adulterated NPK vs. Authentic NPK</span> share overlapping conductivity profiles and drift wildly as solution temperature alters salt solubility. Select a sample and vary temperature below to compare 1D sensing against PMCIS.
            </p>
          </div>

          <div className="inline-flex rounded-md border border-white/70 bg-black p-1 shrink-0 self-start">
            <button
              type="button"
              onClick={() => setSensorMode('legacy1d')}
              className={`px-4 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                sensorMode === 'legacy1d'
                  ? 'bg-emerald-500/25 text-white border border-white'
                  : 'text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              1D TDS / EC Meter
            </button>
            <button
              type="button"
              onClick={() => setSensorMode('pmcis')}
              className={`px-4 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                sensorMode === 'pmcis'
                  ? 'bg-emerald-500/25 text-white border border-white'
                  : 'text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              PMCIS 7D Fusion
            </button>
          </div>
        </div>

        {/* Asymmetric Split Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Parameter Control Column */}
          <div className="lg:col-span-5 green-effect-panel rounded-lg p-6 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                    01. Select Test Solution
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    N = 5 Calibrated Profiles
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {SAMPLE_PROFILES.map((sample) => {
                    const isSelected = sample.id === selectedId;
                    const isFault = sample.category === 'Fault / Adulterated';
                    return (
                      <button
                        key={sample.id}
                        type="button"
                        onClick={() => setSelectedId(sample.id)}
                        className={`w-full text-left px-4 py-3 rounded-md transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'green-effect-active text-white'
                            : 'bg-black/80 border border-white/30 text-zinc-300 hover:border-white/70 hover:text-white'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="font-medium text-sm truncate">
                            {sample.name}
                          </div>
                          <div className="text-xs text-zinc-400 font-mono">
                            {sample.category} · EC₂₅ {sample.ec25} µS/cm
                          </div>
                        </div>
                        <span
                          className={`text-[11px] font-mono px-2 py-0.5 rounded border shrink-0 ${
                            isFault
                              ? 'border-amber-400/70 text-amber-300 bg-amber-500/10'
                              : 'border-emerald-400/60 text-emerald-300 bg-emerald-500/10'
                          }`}
                        >
                          {isFault ? 'FAULT' : 'REF'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Temperature Scrubber */}
              <div className="space-y-3 border-t border-white/20 pt-5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="temp-slider"
                    className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-2"
                  >
                    <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>02. Solution Temperature (DS18B20)</span>
                  </label>
                  <span className="font-mono tabular-nums text-lg font-bold text-white">
                    {tempC.toFixed(1)} °C
                  </span>
                </div>
                <input
                  id="temp-slider"
                  type="range"
                  min={15}
                  max={35}
                  step={0.5}
                  value={tempC}
                  onChange={(e) => setTempC(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                  <span>15.0°C (Cold Field)</span>
                  <span>25.0°C (Ref)</span>
                  <span>35.0°C (Hot Greenhouse)</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Salt solubility and ionic mobility shift by ~1.91% per °C. Without DS18B20 compensation, raw EC drifts{' '}
                  <span className="font-mono text-white font-semibold">
                    {tempDriftPct >= 0 ? `+${tempDriftPct.toFixed(1)}%` : `${tempDriftPct.toFixed(1)}%`}
                  </span>{' '}
                  at {tempC.toFixed(1)}°C.
                </p>
              </div>
            </div>

            {/* Sample Agronomic Consequence */}
            <div className="green-effect-subtle rounded-md p-4 border border-white/40 space-y-1.5">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Agronomic Field Impact
              </div>
              <p className="text-sm text-zinc-200 leading-relaxed">
                {activeSample.agronomicEffect}
              </p>
            </div>
          </div>

          {/* Right Viewport Stage */}
          <div className="lg:col-span-7 green-effect-frame rounded-lg p-6 flex flex-col justify-between gap-6">
            {/* Top Telemetry Readout Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-black border border-white/45 rounded-md p-3.5">
                <div className="text-[11px] font-mono uppercase text-zinc-400">
                  Raw EC_T ({tempC}°C)
                </div>
                <div className="font-mono tabular-nums text-xl font-bold text-white mt-1">
                  {rawEcAtT} <span className="text-xs font-normal text-zinc-400">µS/cm</span>
                </div>
              </div>

              <div className="bg-black border border-white/75 rounded-md p-3.5 shadow-[0_0_16px_-6px_rgba(34,197,94,0.45)]">
                <div className="text-[11px] font-mono uppercase text-emerald-400">
                  Compensated EC₂₅
                </div>
                <div className="font-mono tabular-nums text-xl font-bold text-emerald-300 mt-1">
                  {sensorMode === 'pmcis' ? compensatedEc25 : 'UNAVAILABLE'}
                  {sensorMode === 'pmcis' && (
                    <span className="text-xs font-normal text-zinc-400 ml-1">µS/cm</span>
                  )}
                </div>
              </div>

              <div className="bg-black border border-white/45 rounded-md p-3.5">
                <div className="text-[11px] font-mono uppercase text-zinc-400">
                  Absorbance A₆₆₀
                </div>
                <div className="font-mono tabular-nums text-xl font-bold text-white mt-1">
                  {sensorMode === 'pmcis' ? activeSample.absorbance660.toFixed(3) : 'BLIND'}
                  {sensorMode === 'pmcis' && (
                    <span className="text-xs font-normal text-zinc-400 ml-1">AU</span>
                  )}
                </div>
              </div>

              <div className="bg-black border border-white/45 rounded-md p-3.5">
                <div className="text-[11px] font-mono uppercase text-zinc-400">
                  TCS34725 Swatch
                </div>
                <div className="flex items-center gap-2.5 mt-1.5">
                  <span
                    className="w-5 h-5 rounded border border-white shrink-0"
                    style={{
                      backgroundColor:
                        sensorMode === 'pmcis'
                          ? `rgb(${activeSample.rgb[0]}, ${activeSample.rgb[1]}, ${activeSample.rgb[2]})`
                          : '#18181b'
                    }}
                  />
                  <span className="font-mono tabular-nums text-xs text-zinc-200 truncate">
                    {sensorMode === 'pmcis'
                      ? `${activeSample.rgb[0]},${activeSample.rgb[1]},${activeSample.rgb[2]}`
                      : 'No Optical'}
                  </span>
                </div>
              </div>
            </div>

            {/* Center Comparison: 1D Overlap vs 7D Radar */}
            {sensorMode === 'legacy1d' ? (
              <div className="bg-black border border-white/65 rounded-md p-6 space-y-5 flex-1 flex flex-col justify-center">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-1">
                    <h3 className="font-display text-xl font-semibold text-white">
                      Single-Sensor Analytical Overlap Detected
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      A conventional 1D EC/TDS meter only sees <span className="font-mono text-white font-semibold">{rawEcAtT} µS/cm</span> at {tempC.toFixed(1)}°C. Because it lacks thermal normalization, RGB colorimetry, and 660 nm optical absorbance, it cannot distinguish between overlapping chemical profiles:
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {legacyMatches.map((m) => (
                    <div
                      key={m.id}
                      className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 rounded border border-white/35 bg-zinc-950"
                    >
                      <span className="text-sm font-medium text-white">{m.name}</span>
                      <span className="font-mono tabular-nums text-xs text-amber-300">
                        EC₂₅ {m.ec25} µS/cm · Ambiguous Overlap
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-zinc-400 border-t border-white/15 pt-3">
                  Result: Growers cannot verify whether a solution is authentic NPK, cheap NaCl salt adulteration, or thermally drifted concentration. Switch to <button type="button" onClick={() => setSensorMode('pmcis')} className="text-emerald-400 underline hover:text-emerald-300 cursor-pointer">PMCIS 7D Fusion</button> to resolve the overlap.
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center flex-1">
                {/* 7-Axis Radar SVG */}
                <div className="md:col-span-6 bg-black border border-white/50 rounded-md p-3 flex flex-col items-center">
                  <svg viewBox="0 0 350 330" className="w-full max-w-[330px] h-auto" role="img" aria-label="7-Dimensional Multimodal Feature Vector Radar">
                    {/* Concentric grid heptagons */}
                    {[0.25, 0.5, 0.75, 1].map((ring) => {
                      const pts = axes
                        .map((_, i) => {
                          const p = getPoint(i, ring);
                          return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
                        })
                        .join(' ');
                      return (
                        <polygon
                          key={ring}
                          points={pts}
                          fill="none"
                          stroke={ring === 1 ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.16)'}
                          strokeWidth={1}
                        />
                      );
                    })}

                    {/* Radial spokes + labels */}
                    {axes.map((ax, i) => {
                      const outer = getPoint(i, 1);
                      const labelPt = getPoint(i, 1.18);
                      return (
                        <g key={ax.label}>
                          <line
                            x1={cx}
                            y1={cy}
                            x2={outer.x}
                            y2={outer.y}
                            stroke="rgba(255,255,255,0.22)"
                            strokeWidth={1}
                          />
                          <text
                            x={labelPt.x}
                            y={labelPt.y + 4}
                            textAnchor="middle"
                            className="fill-white font-mono text-[10.5px] font-semibold"
                          >
                            {ax.label}
                          </text>
                        </g>
                      );
                    })}

                    {/* Optional dashed comparison overlay */}
                    {comparePolygonPoints && (
                      <polygon
                        points={comparePolygonPoints}
                        fill="none"
                        stroke="rgba(255,255,255,0.65)"
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                      />
                    )}

                    {/* Active PMCIS 7D Green Glow Polygon */}
                    <polygon
                      points={activePolygonPoints}
                      fill="rgba(34, 197, 94, 0.28)"
                      stroke="#4ade80"
                      strokeWidth={2.2}
                    />

                    {/* Vertex nodes with white borders */}
                    {axes.map((ax, i) => {
                      const pt = getPoint(i, Math.max(0.06, Math.min(1, ax.val)));
                      return (
                        <circle
                          key={ax.label}
                          cx={pt.x}
                          cy={pt.y}
                          r={4}
                          fill="#22c55e"
                          stroke="#ffffff"
                          strokeWidth={1.5}
                        />
                      );
                    })}
                  </svg>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-zinc-300 mt-1">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm bg-emerald-500/50 border border-white inline-block" />
                      <span>Active 7D Vector</span>
                    </span>
                    {compareProfile && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-4 border-t-2 border-dashed border-white inline-block" />
                        <span>Overlapping EC Ref ({compareProfile.name.split('(')[0].trim()})</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Classification & Euclidean Distance Readout */}
                <div className="md:col-span-6 space-y-4">
                  <div
                    className={`rounded-md p-4 border ${
                      isAnomaly
                        ? 'bg-amber-950/20 border-white/80'
                        : 'bg-emerald-950/25 border-white/80'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
                      {isAnomaly ? (
                        <AlertTriangle className="w-4 h-4 text-amber-400" aria-hidden="true" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                      )}
                      <span className={isAnomaly ? 'text-amber-300' : 'text-emerald-300'}>
                        {activeSample.statusLabel}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-200 mt-2 leading-relaxed">
                      {activeSample.notes}
                    </p>
                  </div>

                  {/* 7D Feature Vector String */}
                  <div className="bg-black border border-white/40 rounded-md p-3.5 space-y-1.5">
                    <div className="text-[11px] font-mono uppercase text-zinc-400">
                      Unified 7-Dimensional Feature Vector xᵀ
                    </div>
                    <div className="font-mono tabular-nums text-xs text-emerald-300 break-all leading-relaxed">
                      [{compensatedEc25}, {tempC.toFixed(1)}, {activeSample.rgb[0]}, {activeSample.rgb[1]}, {activeSample.rgb[2]}, {activeSample.clear}, {activeSample.absorbance660.toFixed(3)}]
                    </div>
                  </div>

                  {/* Euclidean Distance Table */}
                  <div className="bg-black border border-white/40 rounded-md overflow-hidden">
                    <div className="px-3.5 py-2 border-b border-white/20 text-[11px] font-mono uppercase text-zinc-400 flex justify-between">
                      <span>Reference Profile Match</span>
                      <span>Euclidean d(x, r)</span>
                    </div>
                    <div className="divide-y divide-white/10">
                      {rankedDistances.map(({ ref, distance }) => (
                        <div
                          key={ref.id}
                          className="px-3.5 py-2 flex items-center justify-between gap-2 text-xs"
                        >
                          <span className="text-zinc-200 truncate">{ref.name}</span>
                          <span
                            className={`font-mono tabular-nums font-semibold ${
                              distance < 0.05
                                ? 'text-emerald-400'
                                : distance < 0.25
                                ? 'text-zinc-300'
                                : 'text-amber-300'
                            }`}
                          >
                            {distance.toFixed(4)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
