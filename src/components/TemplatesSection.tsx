import { useState } from 'react';
import { KeyRound, ArrowUpRight, Download, Check, Copy, Sparkles, ShieldCheck, AtSign, Radio, Layers, Sun, Eye } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';
import { OtpVerificationLive } from './OtpVerificationLive';
import {
  BlackSocialHandlePreview,
  WhiteSocialHandlePreview,
  ProfileLivePreview,
  ProfileStoryRingPreview,
  MorphIconPreview,
  MorphWeatherPreview,
  TemplateId,
} from './AnimatedIconShowcase';

interface TemplateItem {
  id: TemplateId;
  title: string;
  tagline: string;
  badge: string;
  techStack: string[];
  features: string[];
  icon: typeof KeyRound | typeof AtSign | typeof Radio | typeof Layers | typeof Sun | typeof Eye | typeof Sparkles;
  orderUrl?: string;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: 'tmpl-otp',
    title: 'Tactile 4-Digit OTP Verification Suite',
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
    orderUrl: 'https://f0undr-order.vercel.app/',
  },
  {
    id: 'tmpl-black-handle',
    title: 'f0undr Black Social Handle Lower-Third',
    tagline: 'Dark-themed lower-third badge adapted from Jitter for displaying the @f0undr social handle with smooth spring-physics entrance and collapse.',
    badge: 'Jitter Rebuild • Social Media',
    techStack: ['CSS Transitions', 'Tailwind v4', 'SVG Vector', 'TypeScript'],
    features: [
      'Instagram gradient badge with dynamic handle expansion',
      'Pulsing status beacon for verified authenticity',
      'Spring cubic-bezier transitions for organic movement',
      'Optimized for broadcast video overlays and web hero headers',
    ],
    icon: AtSign,
    orderUrl: 'https://f0undr-order.vercel.app/',
  },
  {
    id: 'tmpl-white-handle',
    title: 'f0undr White Social Handle Pill',
    tagline: 'High-contrast monochrome lower-third pill engineered for dark video footage, featuring the f0undr monogram with crisp typography.',
    badge: 'Jitter Rebuild • Light Edition',
    techStack: ['Pure CSS', 'SVG Icons', 'Tailwind v4', 'React 19'],
    features: [
      'Pure white surface with high-contrast obsidian typography',
      'Instant toggle reveal and conceal choreography',
      'Subtle drop-shadow glow tuned for dark mode UI',
      'Fully customizable handle and brand typography',
    ],
    icon: Eye,
    orderUrl: 'https://f0undr-order.vercel.app/',
  },
  {
    id: 'tmpl-profile-live',
    title: 'f0undr Profile: Live Pulse Stream',
    tagline: 'Broadcast-ready animated avatar with expanding live ripple rings, glowing crimson status beacon, and real-time telemetry badge.',
    badge: 'Jitter Rebuild • Live Broadcast',
    techStack: ['CSS Keyframes', 'SVG Filters', 'React 19', 'Tailwind v4'],
    features: [
      'Concentric pulsing radar wave animations',
      'Vibrant LIVE indicator pill with synchronized blinker',
      'Simulated viewer audience telemetry stream',
      'Pixel-perfect avatar squircle container with drop-shadow',
    ],
    icon: Radio,
    orderUrl: 'https://f0undr-order.vercel.app/',
  },
  {
    id: 'tmpl-profile-story',
    title: 'f0undr Profile: Kinetic Story Ring',
    tagline: 'Social-grade animated gradient ring that draws and orbits the f0undr monogram with interactive unread/viewed state switching.',
    badge: 'Jitter Rebuild • Story System',
    techStack: ['SVG Stroke Animation', 'Gradient Conics', 'React 19', 'Tailwind'],
    features: [
      'Continuous kinetic gradient rotation around avatar boundary',
      'Interactive click-to-view toggle clearing story ring state',
      'Multicolor sunset gradient stop array (Amber, Rose, Violet)',
      'Touch-friendly micro-interaction for mobile & desktop apps',
    ],
    icon: Sparkles,
    orderUrl: 'https://f0undr-order.vercel.app/',
  },
  {
    id: 'tmpl-morph-icon',
    title: 'f0undr Morph: Animated Vector Icon',
    tagline: 'Fluid vector geometry interpolation cycling between Quantum Core, Diamond Node, Sovereign Squircle, and Prism Hexagon.',
    badge: 'Jitter Rebuild • Fluid Morph',
    techStack: ['CSS Morphing', 'SVG Math', 'React 19', 'Tailwind v4'],
    features: [
      'Continuous 4-phase geometric shape morphing',
      'Synchronized gradient rotation and border-radius blending',
      'Dynamic state counter and phase announcement HUD',
      'Ultra-lightweight vector rendering without external dependencies',
    ],
    icon: Layers,
    orderUrl: 'https://f0undr-order.vercel.app/',
  },
  {
    id: 'tmpl-morph-weather',
    title: 'f0undr Morph: Weather Sensor Icons',
    tagline: 'State-morphing meteorological icon engine transitioning smoothly between Sunny Day, Thunderstorm, and Rain Shower with telemetry.',
    badge: 'Jitter Rebuild • State Engine',
    techStack: ['React 19', 'Vector Icons', 'Tailwind v4', 'TypeScript'],
    features: [
      'Seamless multi-state icon switching with bounce easing',
      'Dynamic thermal temperature readout and atmospheric sensors',
      'Curated atmospheric color gradients matching condition states',
      'Designed for dashboard widgets and ambient smartwatch faces',
    ],
    icon: Sun,
    orderUrl: 'https://f0undr-order.vercel.app/',
  },
];

export const TemplatesSection = () => {
  const [activeTemplateId, setActiveTemplateId] = useState<TemplateId>('tmpl-otp');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentTemplate = TEMPLATES.find((t) => t.id === activeTemplateId) || TEMPLATES[0];
  const IconComp = currentTemplate.icon;
  const isCopied = copiedId === currentTemplate.id;

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

  const renderActivePreview = () => {
    switch (activeTemplateId) {
      case 'tmpl-otp':
        return <OtpVerificationLive />;
      case 'tmpl-black-handle':
        return <BlackSocialHandlePreview />;
      case 'tmpl-white-handle':
        return <WhiteSocialHandlePreview />;
      case 'tmpl-profile-live':
        return <ProfileLivePreview />;
      case 'tmpl-profile-story':
        return <ProfileStoryRingPreview />;
      case 'tmpl-morph-icon':
        return <MorphIconPreview />;
      case 'tmpl-morph-weather':
        return <MorphWeatherPreview />;
      default:
        return <OtpVerificationLive />;
    }
  };

  return (
    <section id="templates" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill mb-3">
              <span className="text-[11px] font-mono tracking-widest text-cyan-300 uppercase flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                ANIMATED ICON TEMPLATES &bull; JITTER REBUILDS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
              Interactive <span className="text-gradient-cyan">Template Gallery</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl font-light leading-relaxed">
              Industrial micro-interactions, animated social handles, live streaming badges, and fluid vector morphs adapted from Jitter templates, branded for f0undr.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl glass-pill flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{TEMPLATES.length} Live Templates Active</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {TEMPLATES.map((tmpl) => {
            const isActive = activeTemplateId === tmpl.id;
            const TabIcon = tmpl.icon;
            return (
              <button
                key={tmpl.id}
                onClick={() => {
                  playClickSound();
                  setActiveTemplateId(tmpl.id);
                }}
                onMouseEnter={playHoverSound}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-white border border-cyan-400/40 shadow-[0_0_20px_-4px_rgba(56,189,248,0.3)]'
                    : 'glass-pill text-slate-300 hover:text-white'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{tmpl.title.split('—')[0].replace('f0undr ', '')}</span>
              </button>
            );
          })}
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
                  Animation &amp; System Capabilities
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
                <span>{isCopied ? 'Spec Copied' : 'Copy Spec'}</span>
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
                <span>Commission Template</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-black/40 border border-white/[0.08] backdrop-blur-sm min-h-[360px]">
            {renderActivePreview()}
          </div>
        </div>
      </div>
    </section>
  );
};
