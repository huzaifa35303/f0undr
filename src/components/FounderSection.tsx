import { FOUNDER_INFO } from '../data/portfolioData';
import { CheckCircle2, ArrowUpRight, Award, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export const FounderSection = () => {
  const ORDER_URL = 'https://order.f0undrteam.site/#';

  return (
    <section id="founder" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-mono text-cyan-400">
                <Award className="w-3.5 h-3.5" />
                FOUNDER &bull; PRINCIPAL ARCHITECT
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
              Muhammad Huzaifa Zahid <span className="text-slate-400 font-mono text-2xl sm:text-3xl font-normal">(Founder)</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl font-light leading-relaxed">
              Founder &amp; Chief Systems Architect of the <strong className="text-white font-medium">f0undr</strong> ecosystem and the{' '}
              <strong className="text-white font-medium">f0undr Team</strong>. Directing autonomous AI orchestration,
              f0undr Themes APK native architectures, sovereign encrypted cloud storage, and computational literature.
            </p>
          </div>

          <div>
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl btn-primary-white text-xs font-bold tracking-tight transition-all cursor-pointer shadow-lg"
            >
              <span>Direct Commission</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 glass-card-interactive rounded-3xl p-8 relative overflow-hidden shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-slate-800 to-indigo-500/20 border border-cyan-400/40 p-1 flex items-center justify-center font-mono font-black text-2xl text-white shadow-lg">
                  f0
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  ACTIVE BUILDING
                </span>
                <div className="text-[10px] text-slate-400 font-mono">
                  LVL-5 SOVEREIGN
                </div>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="text-xl font-heading font-extrabold text-white mb-1">
                {FOUNDER_INFO.name}
              </h3>
              <div className="text-xs font-mono text-cyan-400 font-medium mb-2">
                {FOUNDER_INFO.role}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {FOUNDER_INFO.bio}
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-card mb-6 border-l-2 border-cyan-400">
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1 font-bold">
                FOUNDER MAXIM
              </div>
              <p className="text-xs text-slate-200 italic leading-relaxed">
                "{FOUNDER_INFO.quotes[0]}"
              </p>
            </div>

            <div className="space-y-2 mb-6">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                Technical Domains of Command
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Autonomous AI Orchestration',
                  'genni 1 Engine Architecture',
                  'f0undr Themes APK (SDK 35)',
                  'Sovereign Cryptographic Vaults',
                  'First-Principles Systems Design',
                  'Systems Literature & Research',
                ].map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={ORDER_URL}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl btn-primary-white text-xs font-bold tracking-tight transition-all"
            >
              <span>Submit Project via order.f0undrteam.site</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="mb-2">
              <h3 className="text-lg font-heading font-extrabold text-white mb-1">
                The Founder Operating Principles
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Rules governing every software system, interactive template, and venture engineered at f0undr.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FOUNDER_INFO.principles.map((p, pIdx) => (
                <div
                  key={pIdx}
                  onMouseEnter={playHoverSound}
                  className="glass-card rounded-2xl p-6 hover:border-cyan-400/30"
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-cyan-400">
                      0{pIdx + 1}
                    </div>
                    <h4 className="text-sm font-heading font-bold text-white">
                      {p.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/10 mt-6 relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-bold">EXECUTIVE PHILOSOPHY</span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-300 font-light leading-relaxed">
                "We don't wait for permission to create tools, literature, and systems that satisfy our deepest intellectual curiosities. Small, highly leveraged teams armed with first-principles reasoning and unyielding judgment build the future."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
