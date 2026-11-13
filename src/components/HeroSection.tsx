import { useState } from 'react';
import { ArrowUpRight, ArrowDown, Users, Layers, ShieldCheck, Sparkles, Smartphone, Globe, BookOpen, Lock, Terminal, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { STATS } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/audio';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onMeetTeam: () => void;
}

interface ShowcaseTab {
  id: string;
  label: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  specs: string[];
  url: string;
}

const SHOWCASE_TABS: ShowcaseTab[] = [
  {
    id: 'vault',
    label: 'f0-Share Vault',
    tag: 'AES-256 Sovereign Vault',
    tagColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    title: 'Zero-Knowledge Encrypted Cloud Storage',
    description: 'High-speed client-side encryption matrix where files are chunked, salted with PBKDF2, and encrypted before leaving the browser. Plaintext never touches servers.',
    stat: '256-Bit',
    statLabel: 'AES-GCM WebCrypto',
    specs: ['Zero plaintext logs', 'Chunked streaming uploads', 'Auto-expiring share links', 'Vercel Blob infrastructure'],
    url: 'https://f0-share.vercel.app/',
  },
  {
    id: 'android',
    label: 'f0undr Themes APK',
    tag: 'Native Android SDK 35',
    tagColor: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    title: 'Native Android System Engine',
    description: 'Bespoke mobile architecture engineered for Android 15 with dynamic Material You accent synthesis, offline SQLite caching, and zero-latency UI rendering.',
    stat: 'SDK 35',
    statLabel: 'Target Android 15',
    specs: ['Jetpack Compose UI', 'Dynamic wallpaper theme engine', 'Background worker daemon', 'ProGuard byte-level hardening'],
    url: 'https://f0undr-order.vercel.app/',
  },
  {
    id: 'ai',
    label: 'f0undr AI (genni 1)',
    tag: 'Autonomous AI Agent',
    tagColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    title: 'Autonomous Multi-Tool Agent Pipeline',
    description: 'Autonomous reasoning engine powered by genni 1. Integrates vector session memory, real-time web retrieval, and error self-correction loops.',
    stat: '14ms',
    statLabel: 'Pipeline Response Time',
    specs: ['Reactive tool calling', 'Multi-modal processing', 'Memory serialization', 'Private encrypted context'],
    url: 'https://f0undr-ai.vercel.app/',
  },
  {
    id: 'curriculum',
    label: 'Computing Curriculum',
    tag: 'Units 1–6 Living Textbook',
    tagColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    title: 'Foundational Computing Series',
    description: 'Authored by f0undr & Rai Abdur Rehman. A complete modern computer science e-book with interactive trace tables, algorithmic flowcharts, and autosaving student labs.',
    stat: 'Units 1–6',
    statLabel: 'Full Curriculum Scope',
    specs: ['Hardware IPO cycle analysis', 'Algorithmic logic & Scratch', 'PECA cyber legislation', 'Instant auto-grading quizzes'],
    url: 'https://f-e-book.vercel.app/',
  },
];

export const HeroSection = ({
  onExploreProjects,
  onMeetTeam,
}: HeroSectionProps) => {
  const ORDER_URL = 'https://f0undr-order.vercel.app/';
  const [activeTabId, setActiveTabId] = useState<string>('vault');

  const activeTab = SHOWCASE_TABS.find((t) => t.id === activeTabId) || SHOWCASE_TABS[0];

  const TICKER_ITEMS = [
    'Native Android APK (SDK 35)',
    'Technology Corporation Infrastructure',
    'Client-Side AES-256 Vaults',
    'Autonomous AI Pipelines',
    'Living Computing Curricula (Units 1–6)',
    'Commercial Motion & 4K Creative Ads',
    'Google OAuth 2.0 & Identity Gateways',
    'Cross-Platform Desktop Engines',
  ];

  return (
    <section id="hero" className="relative pt-44 pb-28 flex flex-col justify-center text-center overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/12 via-indigo-600/10 to-purple-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill text-xs font-mono mb-12 hover:border-cyan-400/40 transition-all cursor-default">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-white font-semibold tracking-wide">FOUNDER &amp; FOUNDER TEAM</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-400 font-medium">TECHNOLOGY CORPORATION</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-black text-white tracking-tight leading-[1.08] mb-8 max-w-6xl mx-auto flex flex-col gap-2">
          <span>Building the next generation of</span>
          <span className="text-gradient-cyan">
            Autonomous AI &amp; Native Systems.
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-xl font-light mb-10 max-w-3xl mx-auto leading-relaxed">
          Directed by{' '}
          <strong className="text-white font-medium font-mono px-2 py-0.5 rounded-lg bg-white/[0.08] border border-white/10">
            Muhammad Huzaifa Zahid (Founder)
          </strong>{' '}
          and the{' '}
          <strong className="text-white font-medium font-mono px-2 py-0.5 rounded-lg bg-white/[0.08] border border-white/10">
            Founder Team
          </strong>
          . We architect high-speed encrypted file vaults, native Android mobile software (SDK 35), AI agents, computing literature, and corporate digital goods.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl btn-primary-white text-xs sm:text-sm font-bold tracking-tight cursor-pointer group shadow-xl"
          >
            <span>Commission Order (f0undr-order)</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <button
            onClick={() => {
              playClickSound();
              onExploreProjects();
            }}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl glass-card text-xs sm:text-sm font-semibold text-white tracking-normal cursor-pointer hover:border-cyan-400/50"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Explore Work</span>
            <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => {
              playClickSound();
              onMeetTeam();
            }}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl glass-card text-xs sm:text-sm font-semibold text-white tracking-normal cursor-pointer hover:border-indigo-400/50"
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Meet Team</span>
          </button>
        </div>

        <div className="max-w-5xl mx-auto mb-16 text-left rounded-3xl glass-card-interactive p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-white/12">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                Interactive Flagship Showcase
              </span>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-2xl glass-card overflow-x-auto no-scrollbar">
              {SHOWCASE_TABS.map((tab) => {
                const isActive = activeTabId === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      playClickSound();
                      setActiveTabId(tab.id);
                    }}
                    onMouseEnter={playHoverSound}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-white border border-cyan-400/40 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono border font-semibold">
                <span className={`px-2.5 py-0.5 rounded-full ${activeTab.tagColor} border`}>
                  {activeTab.tag}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white leading-tight">
                {activeTab.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {activeTab.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {activeTab.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <a
                  href={activeTab.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary-white text-xs font-bold transition-all shadow-md group cursor-pointer"
                >
                  <span>Launch Live Platform</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl glass-card p-6 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400 tracking-widest mb-1">
                  Architecture Metric
                </div>
                <div className="text-4xl sm:text-5xl font-heading font-black text-white tracking-tight text-gradient-cyan mb-1">
                  {activeTab.stat}
                </div>
                <div className="text-xs font-mono text-cyan-400 mb-6 font-semibold">
                  {activeTab.statLabel}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/06 text-xs text-slate-300 leading-relaxed font-light">
                <span className="font-semibold text-white">Direct Production Status:</span> Verified active on Vercel Edge with zero security vulnerabilities and continuous delivery pipelines.
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full overflow-hidden py-3 mb-16 border-y border-white/[0.08] bg-slate-950/40 backdrop-blur-md">
          <div className="flex w-max gap-8 animate-marquee">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs font-mono text-slate-300 whitespace-nowrap">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span className="tracking-wide text-slate-200 font-medium">{item}</span>
                <span className="text-slate-600 ml-4">•</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto text-left">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              onMouseEnter={playHoverSound}
              className="glass-card rounded-3xl p-6 group hover:border-cyan-400/40 relative overflow-hidden transition-all duration-300 shadow-lg"
            >
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                <span>{stat.change}</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400/80 group-hover:scale-125 transition-transform"></span>
              </div>
              <div className="text-3xl sm:text-4xl font-heading font-black text-white mb-2 tracking-tight group-hover:text-cyan-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-200 mb-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 font-light leading-relaxed line-clamp-2">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
