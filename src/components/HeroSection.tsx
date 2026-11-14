import { useState } from 'react';
import { ArrowUpRight, ArrowDown, Users, Layers, CheckCircle2, Zap } from 'lucide-react';
import { STATS } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/audio';
import { VanteRibbonHero } from './VanteRibbonHero';

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
    url: 'https://order.f0undrteam.site/#',
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
    label: 'Systems Publications',
    tag: 'Units 1–6 Independent Series',
    tagColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    title: 'f0undr Systems Literature',
    description: 'Authored by f0undr & Rai Abdur Rehman. A complete modern computer science literature with interactive trace tables, algorithmic flowcharts, and autosaving student labs.',
    stat: 'Units 1–6',
    statLabel: 'Volume Scope',
    specs: ['Hardware IPO cycle analysis', 'Algorithmic logic & Scratch', 'PECA cyber legislation', 'Instant auto-grading quizzes'],
    url: 'https://f-e-book.vercel.app/',
  },
];

export const HeroSection = ({
  onExploreProjects,
  onMeetTeam,
}: HeroSectionProps) => {
  const ORDER_URL = 'https://order.f0undrteam.site/#';
  const [activeTabId, setActiveTabId] = useState<string>('vault');

  const activeTab = SHOWCASE_TABS.find((t) => t.id === activeTabId) || SHOWCASE_TABS[0];

  const TICKER_ITEMS = [
    'Native Android APK (SDK 35)',
    'Technology Corporation Infrastructure',
    'Client-Side AES-256 Vaults',
    'Autonomous AI Pipelines',
    'f0undr Systems & Tech Publications',
    'Commercial Motion & 4K Creative Ads',
    'Google OAuth 2.0 & Identity Gateways',
    'Cross-Platform Desktop Engines',
  ];

  return (
    <div id="hero" className="w-full max-w-full bg-[#0a0a0b] text-[#f4f1ea]">
      <VanteRibbonHero
        onExploreProjects={onExploreProjects}
        onMeetTeam={onMeetTeam}
      />

      <section id="showcase" className="relative pt-24 sm:pt-32 pb-24 sm:pb-32 flex flex-col justify-center text-center overflow-hidden w-full max-w-full border-t border-[rgba(244,241,234,0.12)] bg-[#0a0a0b]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] lg:w-[700px] h-[350px] bg-gradient-to-r from-emerald-500/8 via-cyan-500/8 to-indigo-500/8 blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="w-full max-w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[rgba(244,241,234,0.14)] bg-[#111114] text-[10px] sm:text-xs font-mono mb-6 sm:mb-10 text-[#8d8b86] max-w-full overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-[#f4f1ea] font-semibold tracking-wide truncate">f0undr &bull; f0undr TEAM</span>
            <span className="text-[rgba(244,241,234,0.2)] shrink-0">•</span>
            <span className="text-[#f4f1ea] font-medium shrink-0">TECHNOLOGY CORPORATION</span>
          </div>

          <h2 className="w-full text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#f4f1ea] tracking-[-0.04em] leading-[1.12] mb-6 sm:mb-8 mx-auto break-words">
            <span>Sovereign Architecture &bull; </span>
            <span className="text-[#8d8b86] block sm:inline">
              Built for High-Signal Scale.
            </span>
          </h2>

          <p className="w-full text-[#8d8b86] text-xs sm:text-base md:text-lg font-light mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed break-words">
            Directed by{' '}
            <strong className="text-[#f4f1ea] font-medium font-mono px-2 py-0.5 rounded-lg bg-[rgba(244,241,234,0.06)] border border-[rgba(244,241,234,0.12)] whitespace-nowrap">
              Muhammad Huzaifa Zahid (Founder)
            </strong>{' '}
            and the{' '}
            <strong className="text-[#f4f1ea] font-medium font-mono px-2 py-0.5 rounded-lg bg-[rgba(244,241,234,0.06)] border border-[rgba(244,241,234,0.12)] whitespace-nowrap">
              f0undr Team
            </strong>
            . We engineer zero-knowledge client vaults, native Android systems (SDK 35), autonomous AI agents, and tactile micro-interaction engines.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-14 max-w-md sm:max-w-lg mx-auto w-full">
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#f4f1ea] text-[#0a0a0b] text-xs sm:text-sm font-semibold tracking-tight hover:bg-white transition-all shadow-xl w-full sm:w-auto"
            >
              <span>Commission Atelier (order.f0undrteam.site)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onExploreProjects();
                }}
                onMouseEnter={playHoverSound}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 rounded-full border border-[rgba(244,241,234,0.18)] bg-[#111114] text-xs sm:text-sm font-medium text-[#f4f1ea] hover:border-[rgba(244,241,234,0.45)] transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Explore Work</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8d8b86]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onMeetTeam();
                }}
                onMouseEnter={playHoverSound}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 rounded-full border border-[rgba(244,241,234,0.18)] bg-[#111114] text-xs sm:text-sm font-medium text-[#f4f1ea] hover:border-[rgba(244,241,234,0.45)] transition-all cursor-pointer"
              >
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Meet Team</span>
              </button>
            </div>
          </div>

          <div className="w-full max-w-full sm:max-w-5xl mx-auto mb-16 text-left rounded-3xl bg-[#111114] p-4 sm:p-8 shadow-2xl relative overflow-hidden border border-[rgba(244,241,234,0.12)]">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[rgba(244,241,234,0.1)]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#f4f1ea]">
                  Interactive Architecture Matrix
                </span>
              </div>

              <div className="w-full sm:w-auto flex items-center gap-1.5 p-1 rounded-full border border-[rgba(244,241,234,0.12)] bg-[#0a0a0b] overflow-x-auto no-scrollbar scrollbar-none">
                {SHOWCASE_TABS.map((tab) => {
                  const isActive = activeTabId === tab.id;
                  return (
                    <button
                      type="button"
                      key={tab.id}
                      onClick={() => {
                        playClickSound();
                        setActiveTabId(tab.id);
                      }}
                      onMouseEnter={playHoverSound}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#f4f1ea] text-[#0a0a0b] shadow-sm font-semibold'
                          : 'text-[#8d8b86] hover:text-[#f4f1ea]'
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono border border-[rgba(244,241,234,0.12)] font-semibold">
                  <span className={`px-2.5 py-0.5 rounded-full ${activeTab.tagColor} border`}>
                    {activeTab.tag}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-normal text-[#f4f1ea] leading-tight tracking-[-0.03em]">
                  {activeTab.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#8d8b86] font-light leading-relaxed">
                  {activeTab.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {activeTab.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#8d8b86] font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f4f1ea] text-[#0a0a0b] text-xs font-semibold hover:bg-white transition-all shadow-md group cursor-pointer"
                  >
                    <span>Launch Live Platform</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl bg-[#0a0a0b] p-6 border border-[rgba(244,241,234,0.12)] flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#8d8b86] tracking-widest mb-1">
                    Architecture Metric
                  </div>
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-[#f4f1ea] tracking-tight mb-1">
                    {activeTab.stat}
                  </div>
                  <div className="text-xs font-mono text-emerald-400 mb-6 font-semibold">
                    {activeTab.statLabel}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[rgba(244,241,234,0.04)] border border-[rgba(244,241,234,0.08)] text-xs text-[#8d8b86] leading-relaxed font-light">
                  <span className="font-semibold text-[#f4f1ea]">Direct Production Status:</span> Verified active on Vercel Edge with zero security vulnerabilities and continuous delivery pipelines.
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-full overflow-hidden py-3 mb-16 border-y border-[rgba(244,241,234,0.1)] bg-[#0a0a0b]">
            <div className="flex w-max gap-8 animate-marquee">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-mono text-[#8d8b86] whitespace-nowrap">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="tracking-wide text-[#f4f1ea] font-medium">{item}</span>
                  <span className="text-[#8d8b86]/30 ml-4">•</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto text-left">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                onMouseEnter={playHoverSound}
                className="rounded-3xl p-6 bg-[#111114] border border-[rgba(244,241,234,0.12)] hover:border-[rgba(244,241,234,0.35)] relative overflow-hidden transition-all duration-300 shadow-lg group"
              >
                <div className="text-[10px] font-mono text-[#8d8b86] uppercase tracking-widest mb-2 flex items-center justify-between">
                  <span>{stat.change}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400/80 group-hover:scale-125 transition-transform" />
                </div>
                <div className="text-3xl sm:text-4xl font-mono font-bold text-[#f4f1ea] mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-[#f4f1ea] mb-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[#8d8b86] font-light leading-relaxed line-clamp-2">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
