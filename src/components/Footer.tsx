import { useState, useEffect } from 'react';
import { ArrowUp, ArrowUpRight, ShieldCheck, Globe, Clock, Sparkles } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';
import type { AuthUser } from '../types';

interface FooterProps {
  currentUser?: AuthUser | null;
  onOpenLogin?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer = ({ currentUser, onOpenLogin, onOpenAdmin }: FooterProps = {}) => {
  const ORDER_URL = 'https://order.f0undrteam.site/#';
  const WHATSAPP_URL = 'https://wa.me/923446789261';

  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tickerItems = [
    'CRAFT IN MOTION',
    'AUTONOMOUS ARCHITECTURE',
    'SOVEREIGN SYSTEMS',
    'MUHAMMAD HUZAIFA ZAHID (FOUNDER)',
    'NATIVE ANDROID APKS',
    'ZERO BUREAUCRACY',
    '48-HOUR PROTOTYPE SLA',
    'EXECUTIVE COMMISSION ATELIER',
  ];

  return (
    <footer className="relative bg-[#0a0a0b] text-[#f4f1ea] border-t border-[rgba(244,241,234,0.12)] overflow-hidden">
      <div className="w-full border-b border-[rgba(244,241,234,0.08)] bg-[#0d0d10] py-3.5 overflow-hidden select-none">
        <div className="flex w-max animate-marquee space-x-8 items-center text-[11px] font-mono tracking-widest text-[#8d8b86] uppercase">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((text, idx) => (
            <div key={idx} className="flex items-center space-x-8 shrink-0">
              <span className="hover:text-cyan-300 transition-colors">{text}</span>
              <span className="text-cyan-400 text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#111114] border border-cyan-400/40 flex items-center justify-center font-mono font-bold text-[#f4f1ea] text-sm shadow-lg shadow-cyan-950/30">
                f0
              </div>
              <div>
                <div className="font-semibold text-[#f4f1ea] text-lg tracking-tight">
                  Technology Corporation
                </div>
                <div className="text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Directed by Muhammad Huzaifa Zahid (Founder)</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#8d8b86] leading-relaxed font-light max-w-sm">
              Autonomous AI systems, native Android APK architectures, sovereign encrypted cloud vaults,
              modular template starter kits, and bespoke engineering commissions.
            </p>

            <div className="p-3.5 rounded-2xl bg-[#111114] border border-[rgba(244,241,234,0.1)] inline-flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-xs font-mono">
                <span className="text-[#8d8b86]">ISLAMABAD (PKT/UTC+5): </span>
                <span className="text-[#f4f1ea] font-semibold">{currentTime || '10:00:00 AM'}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#f4f1ea] font-bold">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-[#8d8b86] font-light">
              <li>
                <a href="#hero" className="hover:text-cyan-300 transition-colors">
                  Overview &bull; Ribbon Kinematics
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-300 transition-colors">
                  Work &bull; Systems Archive
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-cyan-300 transition-colors">
                  f0undr Team &bull; Executive Fellows
                </a>
              </li>
              <li>
                <a href="#templates" className="hover:text-cyan-300 transition-colors">
                  Templates &bull; Tactile Starters
                </a>
              </li>
              <li>
                <a href="#curriculum" className="hover:text-cyan-300 transition-colors">
                  Study Labs &bull; Computing Reference
                </a>
              </li>
              <li>
                <a href="#tools" className="hover:text-cyan-300 transition-colors">
                  f0undr Tools &bull; Utility Engines
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cyan-300 transition-colors">
                  Engineering Capabilities Matrix
                </a>
              </li>
              <li>
                <a href="#others" className="hover:text-cyan-300 transition-colors">
                  Others &bull; Sovereign Portals
                </a>
              </li>
              <li>
                <a href="#order" className="hover:text-cyan-300 transition-colors">
                  Commission Studio
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#f4f1ea] font-bold">
              Sovereign Gateways &bull; Executive Links
            </div>
            <ul className="space-y-2.5 text-xs text-[#8d8b86] font-light">
              <li>
                <a
                  href="https://ffs.f0undrteam.site/"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className="p-2.5 rounded-xl bg-[#111114] border border-[rgba(244,241,234,0.1)] hover:border-emerald-400/40 hover:text-emerald-300 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[#f4f1ea] font-medium">FFS Institutional Portal</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#8d8b86]" />
                </a>
              </li>
              <li>
                <a
                  href={ORDER_URL}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className="p-2.5 rounded-xl bg-[#111114] border border-[rgba(244,241,234,0.1)] hover:border-cyan-400/40 hover:text-cyan-300 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[#f4f1ea] font-medium">f0undr Order Studio</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#8d8b86]" />
                </a>
              </li>
              <li>
                <a
                  href="https://f0undrteam.site/"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className="p-2.5 rounded-xl bg-[#111114] border border-[rgba(244,241,234,0.1)] hover:border-cyan-400/40 hover:text-cyan-300 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[#f4f1ea] font-medium">f0undr Web Portfolio (3D)</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#8d8b86]" />
                </a>
              </li>
              <li>
                <a
                  href="https://f0undrteam.site/#blog"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className="p-2.5 rounded-xl bg-[#111114] border border-[rgba(244,241,234,0.1)] hover:border-cyan-400/40 hover:text-cyan-300 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[#f4f1ea] font-medium">Technical Engineering Blog</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#8d8b86]" />
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className="p-2.5 rounded-xl bg-[#111114] border border-emerald-500/20 hover:border-emerald-400/40 hover:text-emerald-300 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300 font-medium">Direct WhatsApp Line</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-emerald-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-10 p-5 rounded-3xl bg-[#111114] border border-[rgba(244,241,234,0.12)] text-xs text-[#8d8b86] font-mono leading-relaxed relative overflow-hidden">
          <div className="flex items-center gap-2 text-cyan-300 font-semibold mb-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Sovereign Identity &amp; National Book Foundation (NBF) Notice</span>
          </div>
          <p>
            f0undr and f0undr Team is an independent autonomous technology corporation and software engineering studio directed by Founder Muhammad Huzaifa Zahid. f0undr and the f0undr Team is not computing tech, not a school curriculum publisher, and does not author school textbooks. All computing curriculum and textbook intellectual property rights are strictly reserved to the National Book Foundation (NBF). All proprietary systems, tactile templates, Android architectures, and digital assets are the exclusive intellectual property of f0undr. All rights reserved.
          </p>
        </div>

        <div className="pt-8 border-t border-[rgba(244,241,234,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8d8b86] font-mono">
          <div className="flex items-center gap-2 flex-wrap">
            <span>&copy; 2026 Technology Corporation.</span>
            <span>&bull;</span>
            <span className="text-[#f4f1ea]">Muhammad Huzaifa Zahid (Founder) &amp; f0undr Team</span>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                if (currentUser) {
                  onOpenAdmin?.();
                } else {
                  onOpenLogin?.();
                }
              }}
              onMouseEnter={playHoverSound}
              className="inline-flex items-center gap-1 text-[#f4f1ea] hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentUser ? 'Admin Console' : 'Portal Login'}</span>
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={scrollToTop}
              onMouseEnter={playHoverSound}
              className="p-2.5 rounded-xl bg-[#111114] border border-[rgba(244,241,234,0.12)] text-[#8d8b86] hover:text-[#f4f1ea] hover:border-cyan-400/40 transition-colors cursor-pointer flex items-center gap-2"
              title="Scroll to Top"
            >
              <span className="text-[11px] font-mono">Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
