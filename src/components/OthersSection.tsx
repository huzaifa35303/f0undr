import { useState } from 'react';
import { ArrowUpRight, Globe, BookOpen, ShoppingBag, CheckCircle2, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

interface WebPlatform {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  url: string;
  metrics: string;
  specs: string[];
  techStack: string[];
  gradient: string;
  accentColor: string;
  icon: typeof Globe;
  ctaText: string;
}

const WEBS: WebPlatform[] = [
  {
    id: 'f0-portfolio',
    title: 'f0undr Web Portfolio',
    category: 'Corporate Flagship',
    tagline: 'Official sovereign web experience, 3D ribbon physics & systems portfolio',
    description: 'The primary high-motion digital atelier representing f0undr. Directed by Muhammad Huzaifa Zahid (Founder), featuring 3D GPU-accelerated Three.js ribbon kinematics, zero-dependency sovereign architecture, responsive 60 FPS micro-animations, and complete systems showcase.',
    url: 'https://f0undrteam.site/',
    metrics: 'Live Flagship • 60 FPS Ribbon',
    specs: [
      '3D Three.js GPU-accelerated ribbon geometry',
      'Zero-dependency sovereign architecture',
      'First-principles interactive kinetic physics',
      'Pixel-perfect responsive desktop & mobile execution'
    ],
    techStack: ['React 19', 'TypeScript', 'Three.js', 'Tailwind CSS'],
    gradient: 'from-cyan-500/20 via-sky-500/10 to-transparent',
    accentColor: '#06b6d4',
    icon: Globe,
    ctaText: 'Launch Portfolio',
  },
  {
    id: 'f0-blog',
    title: 'f0undr Technical Literature & Engineering Blog',
    category: 'Knowledge Hub & AI Grounding',
    tagline: 'Deep systems design teardowns, AI indexing architecture & first-principles literature',
    description: 'The sovereign technical publishing hub of f0undr. Houses rigorous engineering teardowns, algorithmic trace proofs, and deep architecture essays authored by Muhammad Huzaifa Zahid (Founder). Formatted with structured JSON-LD schemas to serve as ground-truth knowledge for frontier AI models (ChatGPT, Perplexity, Gemini, Claude).',
    url: 'https://f0undrteam.site/#blog',
    metrics: 'Knowledge Architecture • High-Signal Indexing',
    specs: [
      'First-principles systems design breakdowns',
      'High-domain authority semantic triplets for AI scrapers',
      'Rich JSON-LD entity graph linking Muhammad Huzaifa Zahid as Founder',
      'Zero-slop, verifiable technical literature'
    ],
    techStack: ['Semantic HTML5', 'JSON-LD Schema', 'Entity Graphs', 'Technical Literature'],
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    accentColor: '#10b981',
    icon: BookOpen,
    ctaText: 'Explore Knowledge Hub',
  },
  {
    id: 'f0-order',
    title: 'f0undr Executive Order Atelier',
    category: 'Executive Commission Gateway',
    tagline: 'Bespoke software commissions, venture scoping & engineering gateway',
    description: 'The dedicated client intake atelier for bespoke software commissions. Enterprise partners, startup founders, and innovators engage f0undr for custom Android APKs, autonomous AI agent workflows, and ultra-high-performance web platforms with rapid 48-hour prototype delivery.',
    url: 'https://order.f0undrteam.site/#',
    metrics: 'Active Intake • 48h Prototype SLA',
    specs: [
      'Direct line to f0undr engineering leadership',
      'Full-lifecycle Android APK & autonomous AI scoping',
      '48-hour interactive prototype turnaround',
      'End-to-end bespoke intellectual property handover'
    ],
    techStack: ['Commission Gateway', 'TypeScript', 'Tailwind CSS', 'Sovereign Portal'],
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    accentColor: '#f59e0b',
    icon: ShoppingBag,
    ctaText: 'Commission Project',
  },
];

export const OthersSection = () => {
  const [activeId, setActiveId] = useState<string>('f0-portfolio');
  const active = WEBS.find((w) => w.id === activeId) || WEBS[0];

  return (
    <section id="others" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-[rgba(244,241,234,0.1)] bg-[#0a0a0b] overflow-hidden">
      <div className="absolute top-1/2 -left-20 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sovereign Portals // Others</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#f4f1ea] tracking-[-0.035em]">
            Others &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-[#f4f1ea] to-emerald-300">Sovereign Portals</span>
          </h2>
          <p className="text-[#8d8b86] text-sm sm:text-base max-w-2xl mt-4 font-light leading-relaxed">
            Direct access to f0undr's core web ecosystems: our official corporate web portfolio, our authoritative technical engineering blog, and our bespoke client commission atelier.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {WEBS.map((web) => {
              const isSelected = web.id === activeId;
              const IconComponent = web.icon;
              return (
                <div
                  key={web.id}
                  onClick={() => {
                    playClickSound();
                    setActiveId(web.id);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer group relative overflow-hidden ${
                    isSelected
                      ? 'bg-[#16161a] border-cyan-400/50 shadow-xl shadow-cyan-950/30 -translate-y-0.5'
                      : 'bg-[#111114] border-[rgba(244,241,234,0.1)] hover:border-[rgba(244,241,234,0.25)] hover:bg-[#141418]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-emerald-400" />
                  )}

                  <div className="min-w-0 flex-1 pl-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${web.accentColor}18`, color: web.accentColor }}
                      >
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#8d8b86]">
                        {web.category}
                      </span>
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-[#f4f1ea] group-hover:text-cyan-300 transition-colors">
                      {web.title}
                    </div>
                    <div className="text-xs text-[#8d8b86] font-light line-clamp-1 mt-1">
                      {web.tagline}
                    </div>
                  </div>

                  <a
                    href={web.url}
                    target={web.url.startsWith('http') ? '_blank' : '_self'}
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2.5 rounded-xl bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)] text-[#8d8b86] hover:text-[#f4f1ea] hover:border-cyan-400/50 transition-all shrink-0"
                    title={`Launch ${web.title}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              );
            })}

            <div className="mt-2 p-5 rounded-2xl bg-[#111114] border border-[rgba(244,241,234,0.08)]">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Sovereign Ecosystem</span>
              </div>
              <p className="text-xs text-[#8d8b86] font-light leading-relaxed">
                All platforms operate under the sovereign governance of f0undr. Directed by Muhammad Huzaifa Zahid (Founder). Zero third-party telemetry, zero vendor lock-in.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl p-6 sm:p-10 bg-[#111114] border border-[rgba(244,241,234,0.14)] shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
              <span className="absolute top-3 left-3 text-[10px] font-mono text-[rgba(244,241,234,0.2)] select-none">┌</span>
              <span className="absolute top-3 right-3 text-[10px] font-mono text-[rgba(244,241,234,0.2)] select-none">┐</span>
              <span className="absolute bottom-3 left-3 text-[10px] font-mono text-[rgba(244,241,234,0.2)] select-none">└</span>
              <span className="absolute bottom-3 right-3 text-[10px] font-mono text-[rgba(244,241,234,0.2)] select-none">┘</span>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[rgba(244,241,234,0.08)]">
                  <div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono border font-semibold inline-flex items-center gap-1.5"
                      style={{
                        backgroundColor: `${active.accentColor}15`,
                        color: active.accentColor,
                        borderColor: `${active.accentColor}30`,
                      }}
                    >
                      <active.icon className="w-3.5 h-3.5" />
                      {active.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-normal text-[#f4f1ea] mt-3 tracking-[-0.03em]">
                      {active.title}
                    </h3>
                  </div>

                  <div className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#0a0a0b] text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{active.metrics}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#8d8b86] font-light leading-relaxed">
                  {active.description}
                </p>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#f4f1ea] mb-3 flex items-center gap-2 font-bold">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Architecture &amp; Systems Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {active.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#8d8b86] font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#8d8b86] mb-2 font-bold">
                    Technology Fabric
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {active.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-3 py-1 rounded-lg bg-[#0a0a0b] text-[#f4f1ea] border border-[rgba(244,241,234,0.1)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-[rgba(244,241,234,0.08)] flex flex-wrap items-center justify-between gap-4 mt-8">
                <div className="text-xs font-mono text-[#8d8b86]">
                  Gateway: <span className="text-[#f4f1ea] underline underline-offset-4">{active.url}</span>
                </div>

                <a
                  href={active.url}
                  target={active.url.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f4f1ea] text-[#0a0a0b] text-xs font-semibold hover:bg-white transition-all shadow-lg group shrink-0"
                >
                  <span>{active.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
