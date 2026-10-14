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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Eyebrow Stamp */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="editorial-stamp">
            Issue 01 · f0undr Editorial Magazine &amp; Atelier
          </span>
          <span className="text-xs font-mono text-[#78716c] hidden sm:inline">
            // Digital Edition 2026
          </span>
        </div>

        {/* Editorial Literary Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#1c1917] mb-6 leading-[1.12]">
          The Architecture of Systems &amp; The Literature of{' '}
          <em className="text-[#c2410c] font-serif italic font-normal">Creation.</em>
        </h1>

        {/* Editorial Deck / Narrative */}
        <p className="text-base sm:text-lg lg:text-xl text-[#57534e] max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          An independent intellectual atelier and operational headquarters for relentless founders.
          Co-founded by <strong className="text-[#1c1917] font-semibold">Abdull Rehman Khizar</strong>,{' '}
          <strong className="text-[#1c1917] font-semibold">f0undr</strong>, and{' '}
          <strong className="text-[#1c1917] font-semibold">M.Huzaifa</strong>. Explore our flagship computing curriculum,
          curated library digests, battle-tested utilities, and collective ventures.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
          <a
            href="https://f-e-book.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl btn-editorial-accent text-sm font-semibold shadow-xs transition-all hover:-translate-y-0.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>f0undr Book: Units 1–6</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <button
            onClick={() => onNavigate('books')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl btn-editorial-primary text-sm font-semibold shadow-xs transition-all hover:-translate-y-0.5"
          >
            <Layers className="w-4 h-4" />
            <span>Explore Bookshelf</span>
          </button>

          <button
            onClick={() => onNavigate('team')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl btn-editorial-outline text-sm font-semibold transition-all hover:-translate-y-0.5"
          >
            <Users className="w-4 h-4 text-[#78716c]" />
            <span>Meet The Team ({stats.teamCount})</span>
          </button>
        </div>

        {/* Editorial Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div
            onClick={() => onNavigate('books')}
            className="editorial-card editorial-card-hover rounded-2xl p-5 text-center cursor-pointer group"
          >
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917] group-hover:text-[#c2410c] transition-colors">
              {stats.booksCount}+
            </div>
            <div className="text-xs font-semibold text-[#1c1917] mt-1.5 flex items-center justify-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#c2410c]" />
              <span>Books &amp; Units</span>
            </div>
            <div className="text-[11px] text-[#78716c] mt-0.5 font-mono">Computing &amp; Strategy</div>
          </div>

          <div
            onClick={() => onNavigate('team')}
            className="editorial-card editorial-card-hover rounded-2xl p-5 text-center cursor-pointer group"
          >
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917] group-hover:text-[#2b5346] transition-colors">
              {stats.teamCount}
            </div>
            <div className="text-xs font-semibold text-[#1c1917] mt-1.5 flex items-center justify-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#2b5346]" />
              <span>Core Collective</span>
            </div>
            <div className="text-[11px] text-[#78716c] mt-0.5 font-mono">Founders &amp; Specialists</div>
          </div>

          <div
            onClick={() => onNavigate('tools')}
            className="editorial-card editorial-card-hover rounded-2xl p-5 text-center cursor-pointer group"
          >
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917] group-hover:text-[#c2410c] transition-colors">
              {stats.toolsCount}+
            </div>
            <div className="text-xs font-semibold text-[#1c1917] mt-1.5 flex items-center justify-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-[#c2410c]" />
              <span>Creator Tools</span>
            </div>
            <div className="text-[11px] text-[#78716c] mt-0.5 font-mono">Productivity &amp; AI</div>
          </div>

          <div
            onClick={() => onNavigate('overview')}
            className="editorial-card editorial-card-hover rounded-2xl p-5 text-center cursor-pointer group"
          >
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917] group-hover:text-[#2b5346] transition-colors">
              {stats.venturesCount}
            </div>
            <div className="text-xs font-semibold text-[#1c1917] mt-1.5 flex items-center justify-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#2b5346]" />
              <span>Active Ventures</span>
            </div>
            <div className="text-[11px] text-[#78716c] mt-0.5 font-mono">Published Systems</div>
          </div>
        </div>
      </div>
    </div>
  );
};
