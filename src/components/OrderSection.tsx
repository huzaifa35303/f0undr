import { ArrowUpRight, CheckCircle2, ShieldCheck, Smartphone, Globe, Bot, Cpu } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export const OrderSection = () => {
  const ORDER_URL = 'https://order.f0undrteam.site/#';
  const WHATSAPP_URL = 'https://wa.me/923446789261';

  const disciplines = [
    {
      title: 'Web Platforms & Architectures',
      desc: 'High-converting SaaS MVPs, glassmorphic portfolios, and web platforms built with React 19, Next.js, and serverless edge databases.',
      icon: Globe,
    },
    {
      title: 'Autonomous AI & Neural Systems',
      desc: 'Private RAG pipelines, multi-agent swarms with tool execution, local LLMs, and conversational AI automation engines.',
      icon: Bot,
    },
    {
      title: 'Native Android & Mobile Apps',
      desc: 'Native Android architectures (SDK 35), offline-first SQLite synchronization, and high-performance cross-platform mobile apps.',
      icon: Smartphone,
    },
    {
      title: 'Desktop Systems & Custom Tools',
      desc: 'Native desktop applications, bespoke automation bots, sovereign cloud utilities, and high-speed data tools.',
      icon: Cpu,
    },
  ];

  return (
    <section id="order" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-600/10 via-indigo-600/10 to-emerald-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono mb-4 text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>OFFICIAL COMMISSION ATELIER &bull; TECHNOLOGY CORPORATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight mb-4">
            Commission a Project with <span className="text-gradient-cyan">f0undr Leadership</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            We operate with zero bureaucratic latency. All client projects, engineering commissions,
            and software production orders are processed through our official portal at{' '}
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noreferrer"
              className="text-white underline underline-offset-4 hover:text-cyan-300 transition-colors font-medium font-mono"
            >
              order.f0undrteam.site
            </a>.
          </p>
        </div>

        <div className="glass-card-interactive rounded-3xl p-8 sm:p-12 relative overflow-hidden mb-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>DIRECT EXECUTIVE DIRECTION &bull; MUHAMMAD HUZAIFA ZAHID (FOUNDER) &amp; f0undr TEAM</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white leading-snug">
                Bespoke Engineering &amp; Autonomous Software Studio
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Whether you need a full-scale web platform, native mobile app, custom AI agent system,
                or bespoke native software suite, submit your brief directly via our ordering studio.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>48-Hour Prototyping</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>99+ Lighthouse Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero Bureaucracy</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[260px]">
              <a
                href={ORDER_URL}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl btn-primary-white text-xs sm:text-sm font-bold tracking-tight cursor-pointer text-center group shadow-xl"
              >
                <span>Launch f0undr Order Studio</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl glass-pill text-xs font-semibold text-slate-300 hover:text-white transition-all text-center"
              >
                <span>Direct WhatsApp Inquiries</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {disciplines.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                onMouseEnter={playHoverSound}
                className="glass-card rounded-2xl p-6 hover:border-cyan-400/40"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-4 text-cyan-400">
                  <IconComp className="w-6 h-6" />
                </div>
                <h4 className="text-base font-heading font-bold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
