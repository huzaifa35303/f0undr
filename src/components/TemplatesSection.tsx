import { useState } from 'react';
import { KeyRound, ArrowUpRight, Download, Check, Copy, Sparkles, ShieldCheck } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';
import { OtpVerificationLive } from './OtpVerificationLive';

interface TemplateItem {
  id: string;
  title: string;
  tagline: string;
  category: 'ui' | 'security';
  badge: string;
  techStack: string[];
  features: string[];
  icon: typeof KeyRound;
  orderUrl?: string;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: 'tmpl-otp',
    title: 'Tactile 4-Digit OTP Verification Suite',
    tagline: 'High-precision micro-interaction component with auto-focus, wrong-code shake, 2x2 morphing sequence, WebAudio frequencies, and celebratory confetti engine.',
    category: 'ui',
    badge: 'Micro-Interaction • Security Engine',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Web Audio API', 'HTML5 Canvas'],
    features: [
      'Auto-focus input jumping with seamless backspace handling',
      'Realistic error shake with crimson border halo on wrong OTP',
      '2x2 morphing box collapse into green success checkmark',
      'Built-in WebAudio synthesizer ticks, error buzzers, and chimes',
      'Physics-based canvas confetti particle explosion',
    ],
    icon: KeyRound,
    orderUrl: 'https://f0undr-order.vercel.app/',
  },
];

export const TemplatesSection = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopySpec = (tmpl: TemplateItem) => {
    playClickSound();
    const spec = `f0undr Architecture Spec — ${tmpl.title}
Category: ${tmpl.badge}
Stack: ${tmpl.techStack.join(', ')}
Core Features:
${tmpl.features.map((f) => `- ${f}`).join('\n')}
Commission link: https://f0undr-order.vercel.app/`;

    navigator.clipboard.writeText(spec);
    setCopiedId(tmpl.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentTemplate = TEMPLATES[0];
  const IconComp = currentTemplate.icon;
  const isCopied = copiedId === currentTemplate.id;

  return (
    <section id="templates" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill mb-3">
              <span className="text-[11px] font-mono tracking-widest text-cyan-300 uppercase flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                STANDALONE TEMPLATE &bull; LIVE INTERACTIVE PREVIEW
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
              Production <span className="text-gradient-cyan">Template Suite</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl font-light leading-relaxed">
              Industrial-grade micro-interaction starter built for instant integration into enterprise authentication flows, banking portals, and autonomous systems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl glass-pill flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>1 Live Template Active</span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <IconComp className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold uppercase tracking-wider">
                  {currentTemplate.badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">
                {currentTemplate.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6">
                {currentTemplate.tagline}
              </p>

              <div className="space-y-2.5 mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Engine Capabilities
                </div>
                {currentTemplate.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {currentTemplate.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-300 border border-white/05"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => handleCopySpec(currentTemplate)}
                onMouseEnter={playHoverSound}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-pill text-xs font-mono text-slate-300 hover:text-white cursor-pointer transition-all"
                title="Copy full architecture specification"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                <span>{isCopied ? 'Spec Copied to Clipboard' : 'Copy Architecture Spec'}</span>
              </button>

              <a
                href={currentTemplate.orderUrl || 'https://f0undr-order.vercel.app/'}
                target="_blank"
                rel="noreferrer"
                onClick={playClickSound}
                onMouseEnter={playHoverSound}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary-white text-xs font-semibold tracking-tight cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Commission Custom Variant</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-black/40 border border-white/[0.08] backdrop-blur-sm">
            <OtpVerificationLive />
          </div>
        </div>
      </div>
    </section>
  );
};
