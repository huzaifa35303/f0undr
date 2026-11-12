import { ArrowUpRight, ArrowDown, Users, Layers, ShieldCheck, Sparkles } from 'lucide-react';
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

  return (
    <section id="hero" className="relative pt-36 pb-24 flex flex-col justify-center text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-white/[0.06] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono mb-8 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="text-slate-300 font-medium">SOVEREIGN AI &amp; SYSTEMS ATELIER</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">f0undr Core</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white tracking-tight leading-[1.05] mb-6 max-w-5xl mx-auto">
          Autonomous Intelligence. <br className="hidden sm:inline" />
          <span className="text-slate-400">Sovereign Software.</span>
        </h1>

        <div className="text-slate-400 text-base sm:text-lg font-light mb-10 max-w-3xl mx-auto leading-relaxed">
          The engineering portfolio of{' '}
          <strong className="text-white font-semibold font-mono px-2 py-0.5 rounded bg-white/[0.06] border border-white/10">
            Muhammad Huzaifa Zahid (f0undr)
          </strong>{' '}
          and the{' '}
          <strong className="text-white font-semibold font-mono px-2 py-0.5 rounded bg-white/[0.06] border border-white/10">
            f0undr Team
          </strong>
          . Architecting high-throughput neural pipelines, f0undr Themes APK native architectures, and living computational literature.
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-20">
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl btn-primary-white text-xs sm:text-sm tracking-tight cursor-pointer group"
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
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl btn-secondary-dark font-medium text-xs sm:text-sm tracking-normal cursor-pointer"
          >
            <Layers className="w-4 h-4 text-slate-400" />
            <span>Explore Systems</span>
            <ArrowDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          <button
            onClick={() => {
              playClickSound();
              onMeetTeam();
            }}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl btn-secondary-dark font-medium text-xs sm:text-sm tracking-normal cursor-pointer"
          >
            <Users className="w-4 h-4 text-slate-400" />
            <span>Executive Leadership</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              onMouseEnter={playHoverSound}
              className="pro-card rounded-2xl p-6"
            >
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                <span>{stat.change}</span>
                <span className="w-1 h-1 rounded-full bg-slate-500"></span>
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

      <div className="hairline-divider mt-24" />
    </section>
  );
};
