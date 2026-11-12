import { FOUNDER_INFO } from '../data/portfolioData';
import { CheckCircle2, ArrowUpRight, Award, ShieldCheck } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export const FounderSection = () => {
  const ORDER_URL = 'https://f0undr-order.vercel.app/';

  return (
    <section id="founder" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
                <Award className="w-3.5 h-3.5 text-slate-400" />
                FOUNDER &amp; PRINCIPAL ARCHITECT
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              Muhammad Huzaifa Zahid <span className="text-slate-400 font-mono text-2xl sm:text-3xl font-normal">(f0undr)</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl font-light leading-relaxed">
              Sole Founder &amp; Chief Systems Architect of the <strong className="text-white font-medium">f0undr</strong> ecosystem and the{' '}
              <strong className="text-white font-medium">f0undr Team</strong> (nickname: <strong className="text-white font-mono">f0undr</strong>). Directing autonomous AI systems,
              f0undr Themes APK native architectures, and building sovereign, high-leverage tools.
            </p>
          </div>

          <div>
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary-white text-xs tracking-tight transition-all cursor-pointer shadow-md"
            >
              <span>Commission with Muhammad Huzaifa Zahid</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 pro-panel rounded-3xl p-8 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-white/[0.08] border border-white/20 p-1 flex items-center justify-center font-mono font-black text-2xl text-white shadow-md">
                  f0
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0b0f19] flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0b0f19]" />
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono mb-1">
                  ● ACTIVE BUILDING
                </span>
                <div className="text-[10px] text-slate-500 font-mono">
                  SOLE FOUNDER
                </div>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="text-xl font-heading font-bold text-white mb-1">
                {FOUNDER_INFO.name}
              </h3>
              <div className="text-xs font-mono text-slate-400 mb-2">
                {FOUNDER_INFO.role}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {FOUNDER_INFO.bio}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] mb-6">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">
                FOUNDER MAXIM
              </div>
              <p className="text-xs text-slate-200 italic font-serif leading-relaxed">
                "{FOUNDER_INFO.quotes[0]}"
              </p>
            </div>

            <div className="space-y-2 mb-6">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Technical Domains of Command
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Autonomous AI Orchestration',
                  'genni 1 Engine Architecture',
                  'f0undr Themes APK & Mobile Architecture',
                  'Sovereign Cryptographic Vaults',
                  'First-Principles Systems Design',
                  'Computing Curricula Units 1–6',
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
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl btn-primary-white text-xs tracking-tight transition-all"
            >
              <span>Submit Project via f0undr-order.vercel.app</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="mb-2">
              <h3 className="text-lg font-heading font-bold text-white mb-1">
                The Founder Operating Principles
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Rules governing every software system, educational curriculum, and venture engineered at f0undr.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FOUNDER_INFO.principles.map((p, pIdx) => (
                <div
                  key={pIdx}
                  onMouseEnter={playHoverSound}
                  className="pro-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-slate-200">
                      0{pIdx + 1}
                    </div>
                    <h4 className="text-sm font-heading font-bold text-white">
                      {p.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pro-panel rounded-2xl p-6 border border-white/[0.08] mt-6">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>EXECUTIVE PHILOSOPHY</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                "We don't wait for permission to create tools, literature, and systems that satisfy our deepest intellectual curiosities. Small, highly leveraged teams armed with first-principles reasoning and unyielding judgment build the future."
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hairline-divider mt-24" />
    </section>
  );
};
