import { useState, useEffect } from 'react';
import { Play, RotateCcw, Radio, Sun, CloudRain, Zap, Layers } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export type TemplateId =
  | 'tmpl-otp'
  | 'tmpl-black-handle'
  | 'tmpl-white-handle'
  | 'tmpl-morph-icon'
  | 'tmpl-profile-live'
  | 'tmpl-profile-story'
  | 'tmpl-morph-weather';

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const BlackSocialHandlePreview = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    playClickSound();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full h-[280px] rounded-2xl bg-[#0a0a0d] border border-white/10 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-3 left-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">
        Jitter Rebuild &bull; 4s Loop
      </div>

      <div className="relative flex items-center justify-center h-24">
        <div
          className={`flex items-center gap-3 bg-[#131217] border border-white/15 px-4 py-2.5 rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.8)] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isOpen
              ? 'scale-100 opacity-100 translate-y-0 w-auto'
              : 'scale-75 opacity-20 translate-y-4'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md">
            <InstagramIcon className="w-4 h-4" />
          </div>

          <div className="flex flex-col pr-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
              f0undr official
            </span>
            <span className="text-sm font-bold text-white tracking-tight">
              @f0undr
            </span>
          </div>

          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1"></span>
        </div>
      </div>

      <div className="absolute bottom-4 flex items-center gap-2">
        <button
          onClick={toggle}
          onMouseEnter={playHoverSound}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono transition-all cursor-pointer"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>{isOpen ? 'Trigger Exit' : 'Trigger Reveal'}</span>
        </button>
      </div>
    </div>
  );
};

export const WhiteSocialHandlePreview = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    playClickSound();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full h-[280px] rounded-2xl bg-[#090b10] border border-white/10 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-3 left-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">
        Jitter Light Edition &bull; High Contrast
      </div>

      <div className="relative flex items-center justify-center h-24">
        <div
          className={`flex items-center gap-3 bg-white text-black px-4 py-2.5 rounded-full shadow-[0_16px_40px_rgba(255,255,255,0.15)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen
              ? 'scale-100 opacity-100 translate-y-0'
              : 'scale-90 opacity-0 -translate-y-4'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-mono font-black text-xs">
            f0
          </div>

          <div className="flex flex-col pr-2">
            <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
              Follow f0undr
            </span>
            <span className="text-sm font-black text-neutral-900 tracking-tight font-display">
              @f0undr
            </span>
          </div>

          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping ml-1"></span>
        </div>
      </div>

      <div className="absolute bottom-4 flex items-center gap-2">
        <button
          onClick={toggle}
          onMouseEnter={playHoverSound}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono transition-all cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Toggle Transition</span>
        </button>
      </div>
    </div>
  );
};

export const ProfileLivePreview = () => {
  const [viewers, setViewers] = useState(1420);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[280px] rounded-2xl bg-[#0b0c10] border border-white/10 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-3 left-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">
        Jitter Profile &bull; Pulsing Live Ripple
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full bg-rose-500/20 animate-ping"></div>
          <div className="absolute w-20 h-20 rounded-full border-2 border-rose-500/40 animate-pulse"></div>

          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#131217] to-[#1f1e26] border-2 border-rose-500 flex items-center justify-center text-white font-mono font-black text-lg shadow-[0_0_25px_rgba(244,63,94,0.4)] relative z-10">
            f0
          </div>

          <div className="absolute -bottom-2.5 z-20 flex items-center gap-1 bg-gradient-to-r from-rose-500 to-red-600 px-2 py-0.5 rounded-full text-[9px] font-black font-mono text-white tracking-widest shadow-lg">
            <Radio className="w-2.5 h-2.5 animate-pulse" />
            LIVE
          </div>
        </div>

        <div className="mt-5 text-center">
          <h5 className="text-white text-sm font-bold tracking-tight">f0undr Corporation</h5>
          <p className="text-[11px] font-mono text-rose-400 mt-0.5">
            {viewers.toLocaleString()} watching now
          </p>
        </div>
      </div>
    </div>
  );
};

export const ProfileStoryRingPreview = () => {
  const [viewed, setViewed] = useState(false);

  const toggle = () => {
    playClickSound();
    setViewed((prev) => !prev);
  };

  return (
    <div className="w-full h-[280px] rounded-2xl bg-[#0d0e12] border border-white/10 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-3 left-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">
        Jitter Profile &bull; Kinetic Story Ring
      </div>

      <div
        onClick={toggle}
        onMouseEnter={playHoverSound}
        className="cursor-pointer group flex flex-col items-center"
      >
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg className={`absolute inset-0 w-full h-full ${!viewed ? 'animate-[spin_6s_linear_infinite]' : ''}`} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke={viewed ? '#3f3f46' : 'url(#storyGradient)'}
              strokeWidth="4"
              strokeDasharray={viewed ? 'none' : '260 20'}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="storyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="45%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          <div className="w-16 h-16 rounded-full bg-[#18181b] border-2 border-black flex items-center justify-center text-white font-mono font-bold text-base group-hover:scale-105 transition-transform">
            f0
          </div>
        </div>

        <div className="mt-4 text-center">
          <span className="text-white text-sm font-bold block">f0undr</span>
          <span className="text-[10px] font-mono text-slate-400">
            {viewed ? 'Stories Seen' : 'Tap to View New Story'}
          </span>
        </div>
      </div>
    </div>
  );
};

export const MorphIconPreview = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const shapes = [
    { name: 'Quantum Core', radius: 'rounded-full', rotate: 'rotate-0', color: 'from-cyan-400 to-blue-600' },
    { name: 'Diamond Node', radius: 'rounded-2xl', rotate: 'rotate-45', color: 'from-amber-400 to-rose-500' },
    { name: 'Sovereign Squircle', radius: 'rounded-[28px]', rotate: 'rotate-90', color: 'from-emerald-400 to-teal-600' },
    { name: 'Prism Hexagon', radius: 'rounded-xl', rotate: 'rotate-180', color: 'from-purple-500 to-indigo-600' },
  ];

  const current = shapes[step];

  return (
    <div className="w-full h-[280px] rounded-2xl bg-[#090a0f] border border-white/10 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-3 left-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">
        Jitter Morph &bull; Continuous Interpolation
      </div>

      <div className="relative w-24 h-24 flex items-center justify-center">
        <div
          className={`w-20 h-20 bg-gradient-to-tr ${current.color} ${current.radius} ${current.rotate} transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_10px_35px_rgba(56,189,248,0.35)] flex items-center justify-center`}
        >
          <Layers className="w-8 h-8 text-white stroke-[2.2] -rotate-45" />
        </div>
      </div>

      <div className="mt-5 text-center">
        <span className="text-white text-sm font-bold block">{current.name}</span>
        <span className="text-[10px] font-mono text-cyan-400 tracking-wider">
          f0undr Vector Morph System &bull; Phase {step + 1}/4
        </span>
      </div>
    </div>
  );
};

export const MorphWeatherPreview = () => {
  const [weatherIndex, setWeatherIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWeatherIndex((prev) => (prev + 1) % 3);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const weathers = [
    {
      label: 'Sunny Day',
      temp: '28°C',
      icon: Sun,
      color: 'from-amber-400 to-orange-500',
      textColor: 'text-amber-400',
    },
    {
      label: 'Thunderstorm',
      temp: '19°C',
      icon: Zap,
      color: 'from-indigo-500 to-purple-700',
      textColor: 'text-purple-400',
    },
    {
      label: 'Rain Shower',
      temp: '16°C',
      icon: CloudRain,
      color: 'from-cyan-400 to-blue-600',
      textColor: 'text-cyan-400',
    },
  ];

  const current = weathers[weatherIndex];
  const Icon = current.icon;

  return (
    <div className="w-full h-[280px] rounded-2xl bg-[#0a0c12] border border-white/10 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-3 left-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">
        Jitter Weather Morph &bull; State Morphing
      </div>

      <div className="relative flex flex-col items-center">
        <div
          className={`w-18 h-18 rounded-3xl bg-gradient-to-tr ${current.color} flex items-center justify-center text-white shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out`}
        >
          <Icon className="w-9 h-9 stroke-[2.2] animate-bounce" />
        </div>

        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-white text-base font-bold">{current.label}</span>
            <span className={`text-xs font-mono font-bold ${current.textColor}`}>
              {current.temp}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
            f0undr Ambient Sensor Engine
          </span>
        </div>
      </div>
    </div>
  );
};
