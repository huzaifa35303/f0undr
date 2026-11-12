import { ArrowUpRight, CheckCircle2, ShieldCheck, Smartphone, Globe, Bot, Cpu } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export const OrderSection = () => {
  const ORDER_URL = 'https://f0undr-order.vercel.app/';
  const WHATSAPP_URL = 'https://wa.me/923446789261';

  const disciplines = [
    {
      title: 'Websites & Web Platforms',
      desc: 'High-converting SaaS MVPs, editorial portfolios, and web platforms built with React 19, Next.js, and Supabase.',
      icon: Globe,
    },
    {
      title: 'Autonomous AI & Neural Systems',
      desc: 'Private RAG pipelines, multi-agent swarms with tool execution, local LLMs, and conversational AI engines.',
      icon: Bot,
    },
    {
      title: 'Mobile & Native Applications',
      desc: 'Native iOS & Android architectures, offline-first SQLite synchronization, and high-performance apps.',
      icon: Smartphone,
    },
    {
      title: 'Native Android & Custom Tools',
      desc: 'Native Android applications, bespoke automation bots, sovereign utilities, and high-speed data tools.',
      icon: Cpu,
    },
  ];

  return (
    <section id="order" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono mb-4 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>OFFICIAL COMMISSION ATELIER</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Commission a Project with <span className="text-white">f0undr</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
            We operate with zero bureaucratic latency. All client projects, engineering commissions,
            and software production orders are processed exclusively through our official portal at{' '}
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noreferrer"
              className="text-white underline underline-offset-4 hover:text-slate-200 transition-colors font-medium"
            >
              f0undr-order.vercel.app
            </a>.
          </p>
        </div>

        <div className="pro-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>DIRECT LEADERSHIP BY MUHAMMAD HUIZAIFA ZAHID &amp; f0undr TEAM</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white leading-snug">
                Bespoke Engineering &amp; Autonomous Software Studio
              </h3>

              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Whether you need a full-scale web platform, native mobile app, custom AI agent system,
                or bespoke native software suite, submit your brief directly via our ordering studio.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
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
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl btn-primary-white text-xs sm:text-sm tracking-tight cursor-pointer text-center group"
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
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl btn-secondary-dark text-xs font-medium text-center cursor-pointer"
              >
                <span>Direct WhatsApp Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {disciplines.map((d, idx) => {
            const Icon = d.icon;
            return (
              <div
                key={idx}
                onMouseEnter={playHoverSound}
                className="pro-card rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-4 text-white">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-heading font-bold text-white mb-2">
                    {d.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {d.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06]">
                  <a
                    href={ORDER_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-300 hover:text-white transition-colors"
                  >
                    <span>Order Discipline</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
