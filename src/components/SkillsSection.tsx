import { useState } from 'react';
import { Cpu, Terminal, Brain, Shield, Sparkles, Activity, Layers, Zap, CheckCircle2 } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/audio';

interface CapabilityPillar {
  id: string;
  category: string;
  title: string;
  tagline: string;
  specs: { label: string; metric: string; tag: string }[];
  highlight: string;
  tech: string[];
  accentColor: string;
  icon: typeof Cpu;
}

const PILLARS: CapabilityPillar[] = [
  {
    id: 'ai-neural',
    category: 'Autonomous Intelligence',
    title: 'Autonomous AI & Neural Inference',
    tagline: 'Zero-API-key conversational engines, quantized LLMs, and multi-agent state machines',
    specs: [
      { label: 'Neural Quantization', metric: 'GGUF / Int4 / FP16', tag: 'Core Engine' },
      { label: 'LLM Orchestration', metric: 'Multi-Agent Swarms', tag: 'Autonomous' },
      { label: 'Semantic Indexing', metric: 'Vector Similarity HNSW', tag: 'Memory' },
      { label: 'Multilingual NLP (genni 1)', metric: 'Urdu / Hindi / Roman', tag: 'Proprietary' },
    ],
    highlight: 'Engineered genni 1 zero-external-key local inference engine with associative persistent vector memory.',
    tech: ['genni 1 Core', 'Web Agents', 'Vector Graphs', 'NLP Parsers'],
    accentColor: '#06b6d4',
    icon: Brain,
  },
  {
    id: 'native-android',
    category: 'Native Systems',
    title: 'Native Android Architecture',
    tagline: 'High-performance Android 15 systems programming, AGP 8.7.2, and custom engines',
    specs: [
      { label: 'Platform SDK Target', metric: 'Android SDK 35 (Vanilla)', tag: 'Native' },
      { label: 'System Integration', metric: 'WallpaperManager Interop', tag: 'OS Level' },
      { label: 'Custom Apply Engine', metric: 'ThemeApplyEngine', tag: 'Proprietary' },
      { label: 'Build Footprint', metric: '6.5 MB Clean Debug APK', tag: 'Optimized' },
    ],
    highlight: 'Shipped f0undr Themes APK with dynamic theme compile pipelines and live Android WallpaperManager integration.',
    tech: ['Kotlin', 'Java', 'Android SDK 35', 'Gradle 8.14', 'AndroidX'],
    accentColor: '#38bdf8',
    icon: Terminal,
  },
  {
    id: 'sovereign-web',
    category: 'Sovereign Web',
    title: 'Ultra-High-Velocity Web Platforms',
    tagline: '60 FPS WebGL canvas ribbons, sub-millisecond client state, and responsive glassmorphism',
    specs: [
      { label: 'Rendering Pipeline', metric: 'Three.js GPU Ribbon Shader', tag: '60 FPS' },
      { label: 'Client Framework', metric: 'React 19 & TypeScript', tag: 'Zero-Slop' },
      { label: 'Client Persistence', metric: 'Offline-First Sync Engine', tag: 'Zero Latency' },
      { label: 'Performance Score', metric: '99+ Lighthouse Verified', tag: 'Top Tier' },
    ],
    highlight: 'Architect of sovereign corporate portfolios, 1:1 pixel-perfect Google Forms clones, and zero-dependency cloud vaults.',
    tech: ['React 19', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Vite'],
    accentColor: '#10b981',
    icon: Cpu,
  },
  {
    id: 'security-cloud',
    category: 'Cryptographic Integrity',
    title: 'Encrypted Vaults & Protocols',
    tagline: 'Client-side SHA-256 passkey encryption, recursive directory trees, and zero-knowledge persistence',
    specs: [
      { label: 'Client Cryptography', metric: 'SHA-256 / WebCrypto API', tag: 'Client-Side' },
      { label: 'Cloud Persistence', metric: 'Supabase S3 Compatible', tag: 'Distributed' },
      { label: 'QR Mobile Handoff', metric: 'Dynamic Real-time Sync', tag: 'Instant' },
      { label: 'Access Control', metric: 'Zero-Knowledge Passkeys', tag: 'Verified' },
    ],
    highlight: 'Built f0-Share sovereign vault featuring drag-and-drop recursive file sharing with auto-expiring links.',
    tech: ['WebCrypto API', 'SHA-256', 'Supabase S3', 'Distributed Storage'],
    accentColor: '#a855f7',
    icon: Shield,
  },
];

export const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState<string>('ai-neural');
  const activePillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];

  return (
    <section id="skills" className="py-28 relative bg-[#0a0a0b] text-[#f4f1ea] border-t border-[rgba(244,241,234,0.08)] overflow-hidden">
      <div className="absolute top-1/2 left-1/3 w-[700px] h-[350px] bg-cyan-600/06 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono text-cyan-300 mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>SYSTEMS ARCHITECTURE &bull; ENGINEERING MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#f4f1ea] tracking-[-0.035em]">
              Engineering <span className="text-cyan-400 font-semibold">Capabilities</span>
            </h2>
            <p className="text-[#8d8b86] text-sm sm:text-base mt-3 max-w-2xl font-light leading-relaxed">
              Battle-tested architectural disciplines across native Android systems (SDK 35), autonomous neural agents, cryptographic vaults, and 60 FPS GPU web experiences.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111114] border border-[rgba(244,241,234,0.12)] text-xs font-mono text-[#8d8b86]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Telemetry: <strong className="text-[#f4f1ea]">04 Pillars Active</strong></span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col gap-3">
            {PILLARS.map((pillar) => {
              const isSelected = pillar.id === activeTab;
              const IconComp = pillar.icon;

              return (
                <div
                  key={pillar.id}
                  onClick={() => {
                    playClickSound();
                    setActiveTab(pillar.id);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer group ${
                    isSelected
                      ? 'bg-[#16161a] border-cyan-400/50 shadow-lg shadow-cyan-950/30 -translate-y-0.5'
                      : 'bg-[#111114] border-[rgba(244,241,234,0.1)] hover:border-[rgba(244,241,234,0.25)] hover:bg-[#141418]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${pillar.accentColor}18`,
                        color: pillar.accentColor,
                        border: `1px solid ${pillar.accentColor}35`,
                      }}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#8d8b86] block">
                        {pillar.category}
                      </span>
                      <h4 className="text-sm sm:text-base font-semibold text-[#f4f1ea] group-hover:text-cyan-300 transition-colors truncate">
                        {pillar.title}
                      </h4>
                    </div>
                  </div>

                  <span
                    className="w-2 h-2 rounded-full shrink-0 transition-all"
                    style={{
                      backgroundColor: isSelected ? pillar.accentColor : 'rgba(244,241,234,0.2)',
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl p-6 sm:p-9 bg-[#111114] border border-[rgba(244,241,234,0.14)] shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/05 blur-3xl pointer-events-none" />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[rgba(244,241,234,0.08)]">
                  <div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono border font-semibold inline-flex items-center gap-1.5"
                      style={{
                        backgroundColor: `${activePillar.accentColor}15`,
                        color: activePillar.accentColor,
                        borderColor: `${activePillar.accentColor}30`,
                      }}
                    >
                      <activePillar.icon className="w-3.5 h-3.5" />
                      {activePillar.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-normal text-[#f4f1ea] mt-3 tracking-[-0.03em]">
                      {activePillar.title}
                    </h3>
                  </div>

                  <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#0a0a0b] text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Verified Production Spec</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#8d8b86] font-light leading-relaxed my-6">
                  {activePillar.tagline}
                </p>

                <div className="space-y-3 mb-6">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-[#f4f1ea] font-bold flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    System Specifications &amp; Benchmarks
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activePillar.specs.map((spec, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-[#0a0a0b] border border-[rgba(244,241,234,0.08)] flex items-center justify-between gap-2"
                      >
                        <div>
                          <span className="text-[10px] font-mono uppercase text-[#8d8b86] block">
                            {spec.label}
                          </span>
                          <span className="text-xs font-mono font-semibold text-[#f4f1ea]">
                            {spec.metric}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-[#16161a] text-cyan-300 border border-cyan-500/20">
                          {spec.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0a0a0b] border border-[rgba(244,241,234,0.08)] mb-6">
                  <div className="text-xs font-mono text-cyan-300 font-semibold mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Production Achievement</span>
                  </div>
                  <p className="text-xs text-[#8d8b86] font-light leading-relaxed">
                    {activePillar.highlight}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-mono uppercase tracking-wider text-[#8d8b86] mb-2 font-bold">
                    Technology Fabric
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {activePillar.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-3 py-1 rounded-lg bg-[#0a0a0b] text-[#f4f1ea] border border-[rgba(244,241,234,0.1)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
