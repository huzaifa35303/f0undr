import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDown, Users, Layers, ShieldCheck, Sparkles, Cpu, Smartphone, Monitor, Globe, BookOpen, Film, Terminal, Play, CheckCircle2, Lock } from 'lucide-react';
import { STATS } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/audio';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onMeetTeam: () => void;
}

const TERMINAL_LOGS = [
  { time: '01:14:02', msg: 'CORE RUNTIME: Sovereign engine v4.2 synchronized', status: 'ok' },
  { time: '01:14:03', msg: 'ANDROID SDK 35: Native dex optimizations applied (f0undr Themes APK)', status: 'ok' },
  { time: '01:14:04', msg: 'SOVEREIGN VAULT: AES-256 client encryption matrix active (f0-Share)', status: 'ok' },
  { time: '01:14:05', msg: 'AI AGENTS: Autonomous search & memory pipeline online (Latency: 14ms)', status: 'ok' },
  { time: '01:14:06', msg: 'AUTH GATEWAY: Google OAuth 2.0 & passkey telemetry verified', status: 'ok' },
  { time: '01:14:07', msg: 'CURRICULUM: Computing textbook Units 1–6 index updated on Vercel Edge', status: 'ok' },
  { time: '01:14:08', msg: 'SYSTEM INTEGRITY: 100% autonomous consensus achieved', status: 'ok' },
];

const ROTATING_TITLES = [
  'Autonomous Intelligence.',
  'Sovereign Architecture.',
  'Native Android Systems.',
  'Executive Technology.',
];

export const HeroSection = ({
  onExploreProjects,
  onMeetTeam,
}: HeroSectionProps) => {
  const ORDER_URL = 'https://f0undr-order.vercel.app/';
  const [titleIndex, setTitleIndex] = useState<number>(0);
  const [currentLogs, setCurrentLogs] = useState<typeof TERMINAL_LOGS>(TERMINAL_LOGS.slice(0, 4));
  const [activeLogIndex, setActiveLogIndex] = useState<number>(4);

  useEffect(() => {
    const titleInterval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % ROTATING_TITLES.length);
    }, 3800);
    return () => clearInterval(titleInterval);
  }, []);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setActiveLogIndex((prevIdx) => {
        const next = (prevIdx + 1) % TERMINAL_LOGS.length;
        setCurrentLogs((prev) => {
          const updated = [...prev, TERMINAL_LOGS[next]];
          return updated.slice(-4);
        });
        return next;
      });
    }, 2400);
    return () => clearInterval(logInterval);
  }, []);

  const TICKER_TOP = [
    { label: 'Native Android APK (SDK 35)', icon: Smartphone },
    { label: 'Technology Corporation Infrastructure', icon: Cpu },
    { label: 'Google OAuth 2.0 & Identity Gateways', icon: ShieldCheck },
    { label: 'Cross-Platform Windows & Mac Engines', icon: Monitor },
    { label: 'Autonomous AI Orchestration (genni 1)', icon: Sparkles },
    { label: 'Sovereign Encrypted Cloud Vaults', icon: Globe },
    { label: 'Living Computational Curricula (Units 1–6)', icon: BookOpen },
    { label: 'Commercial Creative & 4K Motion Ads', icon: Film },
  ];

  const TICKER_BOTTOM = [
    { label: 'Client-Side AES-256 Vaults', icon: Lock },
    { label: 'High-Throughput Reactive APIs', icon: Terminal },
    { label: 'Zero-Bug Production Audit Protocols', icon: CheckCircle2 },
    { label: 'Mage UI & Yash Chauhan Aesthetics', icon: Sparkles },
    { label: 'Dynamic XML Sitemaps & Search Console', icon: Globe },
    { label: 'Biometric Passkey Authentication', icon: ShieldCheck },
    { label: 'Modular Boilerplate Market Store', icon: Cpu },
    { label: 'Executive Atelier Commission Studio', icon: Users },
  ];

  return (
    <section id="hero" className="relative pt-36 pb-24 flex flex-col justify-center text-center overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-cyan-500/15 via-indigo-600/10 to-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-cyan-600/10 blur-[90px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card text-xs font-mono mb-8 hover:border-cyan-400/40 transition-all cursor-default shadow-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
          <span className="text-white font-semibold tracking-wide">FOUNDER &amp; FOUNDER TEAM</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-400 font-semibold">TECHNOLOGY CORPORATION</span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-emerald-400 hidden sm:inline font-bold">ALL SYSTEMS LIVE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-white tracking-tight leading-[1.05] mb-6 max-w-5xl mx-auto min-h-[1.1em] transition-all">
          <span className="block text-white">
            {ROTATING_TITLES[titleIndex]}
          </span>
          <span className="text-gradient-cyan block mt-1">
            Engineered at Scale.
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-xl font-light mb-10 max-w-3xl mx-auto leading-relaxed">
          The autonomous engineering studio of{' '}
          <strong className="text-white font-semibold font-mono px-2 py-0.5 rounded-lg bg-white/[0.08] border border-white/15">
            Muhammad Huzaifa Zahid (Founder)
          </strong>{' '}
          and the{' '}
          <strong className="text-white font-semibold font-mono px-2 py-0.5 rounded-lg bg-white/[0.08] border border-white/15">
            Founder Team
          </strong>
          . Designing high-speed sovereign cloud vaults, native Android architectures (SDK 35), AI pipelines, computing textbooks, and modular digital boilerplates.
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

        <div className="max-w-4xl mx-auto mb-16 text-left rounded-2xl glass-card-interactive p-4 sm:p-5 border border-white/15 shadow-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
              <span className="ml-2 text-slate-400 flex items-center gap-1.5 font-bold">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                autonomous-telemetry.f0undr.sh
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 flex items-center gap-1">
                <Play className="w-2.5 h-2.5 fill-emerald-400" /> STREAMING
              </span>
              <span className="text-slate-500 text-[11px] hidden sm:inline">SHA-256: 9XlkMsY</span>
            </div>
          </div>

          <div className="space-y-2 font-mono text-xs sm:text-[13px] leading-relaxed">
            {currentLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-slate-300 animate-in fade-in duration-300">
                <span className="text-cyan-400 font-semibold select-none">[{log.time}]</span>
                <span className="text-slate-400 select-none">&gt;</span>
                <span className="flex-1 font-medium">{log.msg}</span>
                <span className="text-emerald-400 font-bold text-[11px] px-1.5 py-0.2 rounded bg-emerald-400/10 border border-emerald-400/20 select-none">
                  OK
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-white/05 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                Host: Vercel Edge Serverless
              </span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="hidden sm:inline text-emerald-400">SSL 256-Bit</span>
            </div>
            <div className="text-slate-500">
              Auto-cycling telemetry telemetry feeds
            </div>
          </div>
        </div>

        <div className="relative w-full overflow-hidden py-3 mb-3 border-y border-white/[0.08] bg-slate-950/30 backdrop-blur-md">
          <div className="flex w-max gap-8 animate-marquee">
            {[...TICKER_TOP, ...TICKER_TOP].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-mono text-slate-300 whitespace-nowrap">
                  <IconComp className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="tracking-wide text-slate-200 font-medium">{item.label}</span>
                  <span className="text-slate-600 ml-4">•</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative w-full overflow-hidden py-2.5 mb-16 border-b border-white/[0.08] bg-slate-950/20 backdrop-blur-md">
          <div className="flex w-max gap-8 animate-marquee-reverse">
            {[...TICKER_BOTTOM, ...TICKER_BOTTOM].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-mono text-slate-400 whitespace-nowrap">
                  <IconComp className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="tracking-wide text-slate-300 font-medium">{item.label}</span>
                  <span className="text-slate-700 ml-4">•</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto text-left">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              onMouseEnter={playHoverSound}
              className="glass-card rounded-2xl p-6 group hover:border-cyan-400/40 relative overflow-hidden"
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
