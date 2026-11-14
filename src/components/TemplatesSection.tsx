import { useState } from 'react';
import { KeyRound, ArrowUpRight, Download, Check, Copy, Sparkles, Radio, AtSign } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';
import { OtpVerificationLive } from './OtpVerificationLive';
import { BlackSocialHandlePreview, WhiteSocialHandlePreview, ProfileLivePreview } from './AnimatedIconShowcase';

interface TemplateItem {
  id: string;
  title: string;
  shortLabel: string;
  tagline: string;
  badge: string;
  techStack: string[];
  features: string[];
  icon: typeof KeyRound;
  orderUrl: string;
}

const ORDER_URL = 'https://order.f0undrteam.site/#';

const TEMPLATES: TemplateItem[] = [
  {
    id: 'tmpl-otp',
    title: 'Tactile 4-Digit OTP Verification Suite',
    shortLabel: 'OTP Verification',
    tagline: 'High-precision micro-interaction component with auto-focus, wrong-code shake, 2x2 morphing sequence, WebAudio frequencies, and celebratory confetti engine.',
    badge: 'Security • Micro-Interaction',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Web Audio API', 'HTML5 Canvas'],
    features: [
      'Auto-focus input jumping with seamless backspace handling',
      'Realistic error shake with crimson border halo on wrong OTP',
      '2x2 morphing box collapse into green success checkmark',
      'Built-in WebAudio synthesizer ticks, error buzzers, and chimes',
      'Physics-based canvas confetti particle explosion',
    ],
    icon: KeyRound,
    orderUrl: ORDER_URL,
  },
  {
    id: 'tmpl-black-handle',
    title: 'f0undr Black Social Handle Lower-Third',
    shortLabel: 'Black Handle',
    tagline: 'Sleek obsidian lower-third social badge engineered for video overlays, stream branding, and interactive follow conversion with cubic-bezier easing.',
    badge: 'Branding • Lower-Third',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'CSS Transforms', 'Web Audio API'],
    features: [
      'Cubic-bezier entry animation with authentic 60fps motion curve',
      'Interactive follow state toggle with animated verification check',
      'Expansion and contraction views for minimal vs detailed layouts',
      'Instant copy handle functionality with haptic audio feedback',
      'High-contrast obsidian glass with cyan luminescence on hover',
    ],
    icon: AtSign,
    orderUrl: ORDER_URL,
  },
  {
    id: 'tmpl-white-handle',
    title: 'f0undr White Social Handle Pill',
    shortLabel: 'White Handle',
    tagline: 'Crisp light-mode lower-third pill engineered with 60fps hardware acceleration, subtle elevation, verified badge, and tactile interaction.',
    badge: 'Motion UI • Pill Badge',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Motion Physics'],
    features: [
      'Ultra-clean light aesthetic with high-contrast typography',
      'Interactive connection bookmarking and state preservation',
      'Replayable keyframe entry sequence with smooth scaling',
      'One-click handle copy to clipboard with status indicator',
      'Cross-browser SVG iconography with pixel-perfect alignment',
    ],
    icon: Sparkles,
    orderUrl: ORDER_URL,
  },
  {
    id: 'tmpl-profile-live',
    title: 'f0undr Profile: Live Pulse Stream',
    shortLabel: 'Profile Live',
    tagline: 'Interactive avatar showcase with live radar wave emissions, fluctuating viewer counter, and animated reaction feedback for founder streams.',
    badge: 'Broadcast • Live Stream',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Pulse Engine'],
    features: [
      'Multi-layer radar pulse waves with concentric ping animations',
      'Dynamic simulated viewer counter with natural periodic fluctuation',
      'Interactive heartbeat reaction engine with counter tracking',
      'Toggleable live vs offline stream simulation states',
      'Official founder verification badge for Muhammad Huzaifa Zahid',
    ],
    icon: Radio,
    orderUrl: ORDER_URL,
  },
];

export const TemplatesSection = () => {
  const [selectedId, setSelectedId] = useState<string>('tmpl-otp');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentTemplate = TEMPLATES.find((t) => t.id === selectedId) || TEMPLATES[0];
  const IconComp = currentTemplate.icon;
  const isCopied = copiedId === currentTemplate.id;

  const handleCopySpec = (tmpl: TemplateItem) => {
    playClickSound();
    const spec = `f0undr Architecture Spec — ${tmpl.title}
Category: ${tmpl.badge}
Stack: ${tmpl.techStack.join(', ')}
Core Features:
${tmpl.features.map((f) => `- ${f}`).join('\n')}
Commission link: ${ORDER_URL}`;

    navigator.clipboard.writeText(spec);
    setCopiedId(tmpl.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="templates" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill mb-3">
              <span className="text-[11px] font-mono tracking-widest text-cyan-300 uppercase flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                4 PRODUCTION TEMPLATES &bull; LIVE INTERACTIVE PREVIEW
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
              Interactive <span className="text-gradient-cyan">Template Suite</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl font-light leading-relaxed">
              Precision micro-interactions and motion components engineered for authentication gates, brand lower-thirds, and live streaming systems. Test every template live below.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl glass-pill flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>4 Interactive Templates Active</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#121118] border border-white/10 rounded-2xl">
          {TEMPLATES.map((tmpl) => {
            const TabIcon = tmpl.icon;
            const isSelected = tmpl.id === currentTemplate.id;
            return (
              <button
                key={tmpl.id}
                onClick={() => {
                  playClickSound();
                  setSelectedId(tmpl.id);
                }}
                onMouseEnter={playHoverSound}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <TabIcon className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">{tmpl.shortLabel}</span>
              </button>
            );
          })}
        </div>

        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
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
              <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                {currentTemplate.tagline}
              </p>

              <div className="space-y-2.5 mb-6">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Engineered Capabilities
                </div>
                {currentTemplate.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2.5">
                  Architecture Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentTemplate.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 border-t border-white/[0.08]">
              <a
                href={ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="flex-1 btn-primary-white py-3 px-5 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Commission Custom Build</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => handleCopySpec(currentTemplate)}
                className="py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Spec Copied' : 'Copy Spec'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-between px-3 py-2 mb-2 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Live Interactive Sandbox
              </span>
              <span>Hardware Accelerated</span>
            </div>

            <div className="w-full flex items-center justify-center min-h-[460px] sm:min-h-[500px]">
              {currentTemplate.id === 'tmpl-otp' && <OtpVerificationLive />}
              {currentTemplate.id === 'tmpl-black-handle' && <BlackSocialHandlePreview />}
              {currentTemplate.id === 'tmpl-white-handle' && <WhiteSocialHandlePreview />}
              {currentTemplate.id === 'tmpl-profile-live' && <ProfileLivePreview />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
