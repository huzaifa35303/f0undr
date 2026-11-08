import { BookOpen, Users, ArrowUpRight, Compass, Layers, Wrench } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  stats: {
    booksCount: number;
    toolsCount: number;
    teamCount: number;
    venturesCount: number;
  };
}

export const HeroSection = ({ onNavigate, stats }: HeroSectionProps) => {
  return (
    <div className="relative pt-24 sm:pt-36 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-35 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)] pointer-events-none" />

      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-tr from-[#c2410c]/15 to-[#d97706]/10 rounded-full blur-3xl pointer-events-none animate-aurora-1" />
      <div className="absolute top-1/4 -right-24 w-[28rem] h-[28rem] bg-gradient-to-bl from-[#2b5346]/12 to-[#059669]/8 rounded-full blur-3xl pointer-events-none animate-aurora-2" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-gradient-to-t from-[#c2410c]/8 to-transparent rounded-full blur-2xl pointer-events-none animate-pulse-glow" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-6 animate-slide-down">
          <span className="editorial-stamp inline-flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c2410c] animate-ping" />
            Issue 01 · f0undr Editorial Magazine &amp; Atelier
          </span>
          <span className="text-xs font-mono text-[#78716c] hidden sm:inline px-2 py-0.5 rounded bg-[#f5f2eb] border border-[#e7e5e4]">
            Digital Edition 2026
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#1c1917] mb-6 leading-[1.12] animate-slide-up">
          The Architecture of Systems &amp; The Literature of{' '}
          <em className="text-[#c2410c] font-serif italic font-normal inline-block hover:scale-105 transition-transform duration-300">Creation.</em>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-[#57534e] max-w-3xl mx-auto mb-10 leading-relaxed font-normal animate-slide-up [animation-delay:120ms]">
          An independent intellectual atelier and operational headquarters for relentless founders.
          Led by <strong className="text-[#1c1917] font-semibold">Muhammad Huzaifa Zahid (f0undr)</strong>,{' '}
          <strong className="text-[#1c1917] font-semibold">Rai Abdul Rehman Khizar</strong>,{' '}
          <strong className="text-[#1c1917] font-semibold">Rana Ayyan Saleem</strong>, and{' '}
          <strong className="text-[#1c1917] font-semibold">Rao Muhammad Ammar Asim</strong>. Explore our flagship computing curriculum,
          curated library digests, battle-tested utilities, and collective ventures.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16 animate-slide-up [animation-delay:200ms]">
          <a
            href="/book/"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 px-6 py-3.5 rounded-xl btn-editorial-accent text-sm font-semibold shadow-xs transition-all hover:-translate-y-0.5"
          >
            <BookOpen className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>f0undr Book: Units 1–6</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            onClick={() => onNavigate('books')}
            className="group flex items-center gap-2 px-6 py-3.5 rounded-xl btn-editorial-primary text-sm font-semibold shadow-xs transition-all hover:-translate-y-0.5"
          >
            <Layers className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Explore Bookshelf</span>
          </button>

          <button
            onClick={() => onNavigate('team')}
            className="group flex items-center gap-2 px-6 py-3.5 rounded-xl btn-editorial-outline text-sm font-semibold transition-all hover:-translate-y-0.5"
          >
            <Users className="w-4 h-4 text-[#78716c] transition-transform group-hover:scale-110" />
            <span>Meet The Team ({stats.teamCount})</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-slide-up [animation-delay:300ms]">
          <div
            onClick={() => onNavigate('books')}
            className="editorial-card editorial-card-hover card-shine rounded-2xl p-5 text-center cursor-pointer group"
          >
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917] group-hover:text-[#c2410c] transition-colors">
              {stats.booksCount}+
            </div>
            <div className="text-xs font-semibold text-[#1c1917] mt-1.5 flex items-center justify-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#c2410c] transition-transform group-hover:scale-125 group-hover:rotate-6" />
              <span>Books &amp; Units</span>
            </div>
            <div className="text-[11px] text-[#78716c] mt-0.5 font-mono">Computing &amp; Strategy</div>
          </div>

          <div
            onClick={() => onNavigate('team')}
            className="editorial-card editorial-card-hover card-shine rounded-2xl p-5 text-center cursor-pointer group"
          >
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917] group-hover:text-[#2b5346] transition-colors">
              {stats.teamCount}
            </div>
            <div className="text-xs font-semibold text-[#1c1917] mt-1.5 flex items-center justify-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#2b5346] transition-transform group-hover:scale-125 group-hover:-rotate-6" />
              <span>Core Collective</span>
            </div>
            <div className="text-[11px] text-[#78716c] mt-0.5 font-mono">Founders &amp; Specialists</div>
          </div>

          <div
            onClick={() => onNavigate('tools')}
            className="editorial-card editorial-card-hover card-shine rounded-2xl p-5 text-center cursor-pointer group"
          >
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917] group-hover:text-[#c2410c] transition-colors">
              {stats.toolsCount}+
            </div>
            <div className="text-xs font-semibold text-[#1c1917] mt-1.5 flex items-center justify-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-[#c2410c] transition-transform group-hover:scale-125 group-hover:rotate-12" />
              <span>Creator Tools</span>
            </div>
            <div className="text-[11px] text-[#78716c] mt-0.5 font-mono">Productivity &amp; AI</div>
          </div>

          <div
            onClick={() => onNavigate('overview')}
            className="editorial-card editorial-card-hover card-shine rounded-2xl p-5 text-center cursor-pointer group"
          >
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917] group-hover:text-[#2b5346] transition-colors">
              {stats.venturesCount}
            </div>
            <div className="text-xs font-semibold text-[#1c1917] mt-1.5 flex items-center justify-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#2b5346] transition-transform group-hover:scale-125 group-hover:rotate-45 duration-300" />
              <span>Active Ventures</span>
            </div>
            <div className="text-[11px] text-[#78716c] mt-0.5 font-mono">Published Systems</div>
          </div>
        </div>
      </div>
    </div>
  );
};
