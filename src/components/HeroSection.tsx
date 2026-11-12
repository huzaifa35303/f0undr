import { ArrowUpRight, ArrowDown, Users, Layers, ShieldCheck, Sparkles, Cpu, Smartphone, Monitor, Globe, BookOpen, Film } from 'lucide-react';
import { STATS } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/audio';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onMeetTeam: () => void;
}

export const HeroSection = ({
  onExploreProjects,
  onMeetTeam,
}: HeroSectionProps) => {
  const ORDER_URL = 'https://f0undr-order.vercel.app/';

  const TICKER_ITEMS = [
    { label: 'Native Android APK (SDK 35)', icon: Smartphone },
    { label: 'Technology Corporation Infrastructure', icon: Cpu },
    { label: 'Google OAuth 2.0 & Identity Protocols', icon: ShieldCheck },
    { label: 'Cross-Platform Windows & Mac Engines', icon: Monitor },
    { label: 'Autonomous AI Orchestration (genni 1)', icon: Sparkles },
    { label: 'Sovereign Encrypted Cloud Vaults', icon: Globe },
    { label: 'Living Computational Curricula (Units 1–6)', icon: BookOpen },
    { label: 'Commercial Posters & Cinematic Video Ads', icon: Film },
  ];

  return (
    <section id="hero" className="relative pt-36 pb-20 flex flex-col justify-center text-center overflow-hidden">
      {/* Dynamic Radial Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/05 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Technology Corporation Sovereign Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono mb-8 backdrop-blur-md hover:border-cyan-500/30 transition-all cursor-default">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-200 font-semibold tracking-wide">FOUNDER &amp; FOUNDER TEAM</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-300 font-medium">TECHNOLOGY CORPORATION</span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">f0undr Core OS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white tracking-tight leading-[1.05] mb-6 max-w-5xl mx-auto">
          Autonomous Intelligence. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-white via-slate-300 to-slate-400 bg-clip-text text-transparent">
            Sovereign Software.
          </span>
        </h1>

        <div className="text-slate-400 text-base sm:text-lg font-light mb-10 max-w-3xl mx-auto leading-relaxed">
          The engineering portfolio of{' '}
          <strong className="text-white font-semibold font-mono px-2 py-0.5 rounded bg-white/[0.06] border border-white/10">
            Muhammad Huzaifa Zahid (Founder)
          </strong>{' '}
          and the{' '}
          <strong className="text-white font-semibold font-mono px-2 py-0.5 rounded bg-white/[0.06] border border-white/10">
            Founder Team
          </strong>
          . Building high-throughput systems, native Android architectures (f0undr Themes APK), desktop &amp; Mac tools, small books, and corporate technology infrastructure.
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl btn-primary-white text-xs sm:text-sm tracking-tight cursor-pointer group shadow-lg shadow-white/5"
          >
            <span>Commission a Project (f0undr-order)</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <button
            onClick={() => {
              playClickSound();
              onExploreProjects();
            }}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl btn-secondary-dark font-medium text-xs sm:text-sm tracking-normal cursor-pointer hover:border-cyan-500/30"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Explore Systems</span>
            <ArrowDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          <button
            onClick={() => {
              playClickSound();
              onMeetTeam();
            }}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl btn-secondary-dark font-medium text-xs sm:text-sm tracking-normal cursor-pointer hover:border-indigo-500/30"
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Executive Leadership</span>
          </button>
        </div>

        {/* Mage UI Marquee Ticker */}
        <div className="relative w-full overflow-hidden py-3 mb-16 border-y border-white/[0.06] bg-white/[0.01] backdrop-blur-xs">
          <div className="flex w-max gap-8 animate-marquee">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-400 whitespace-nowrap">
                  <IconComp className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="tracking-wide text-slate-300 font-medium">{item.label}</span>
                  <span className="text-slate-600 ml-4">•</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Bento */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              onMouseEnter={playHoverSound}
              className="pro-card rounded-2xl p-6 group hover:border-white/20 transition-all"
            >
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                <span>{stat.change}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 group-hover:bg-cyan-300 transition-colors"></span>
              </div>
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-200 mb-1">
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
