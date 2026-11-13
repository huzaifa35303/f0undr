import { ArrowUp, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';
import type { AuthUser } from '../types';

interface FooterProps {
  currentUser?: AuthUser | null;
  onOpenLogin?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer = ({ currentUser, onOpenLogin, onOpenAdmin }: FooterProps = {}) => {
  const ORDER_URL = 'https://order.f0undrteam.site/#';

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 bg-[#02050b] border-t border-white/[0.08] relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-400/30 flex items-center justify-center font-mono font-bold text-white text-xs">
                f0
              </div>
              <div>
                <div className="font-heading font-extrabold text-white text-base tracking-tight">
                  Technology Corporation
                </div>
                <div className="text-[10px] font-mono text-cyan-400">
                  Founder &bull; Muhammad Huzaifa Zahid
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-light max-w-sm">
              Autonomous AI systems, native Android APK architectures, sovereign encrypted cloud vaults,
              modular template starter kits, and living computational literature.
            </p>

            <div>
              <a
                href={ORDER_URL}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl glass-pill text-white text-xs font-semibold hover:border-cyan-400/40 transition-colors"
              >
                <span>Commission Studio (order.f0undrteam.site)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-slate-400 font-light">
              <li>
                <a href="#hero" className="hover:text-cyan-300 transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-300 transition-colors">
                  Work &amp; Systems
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-cyan-300 transition-colors">
                  Founder Team
                </a>
              </li>
              <li>
                <a href="#templates" className="hover:text-cyan-300 transition-colors">
                  Templates &amp; Starters
                </a>
              </li>
              <li>
                <a href="#curriculum" className="hover:text-cyan-300 transition-colors">
                  Curricula &amp; Books
                </a>
              </li>
              <li>
                <a href="#tools" className="hover:text-cyan-300 transition-colors">
                  Founder Tools
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
            <div className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">
              Production Gateways
            </div>
            <ul className="space-y-2 text-xs text-slate-400 font-light">
              <li>
                <a
                  href={ORDER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center justify-between"
                >
                  <span className="text-white font-medium">f0undr Order Studio</span>
                  <span className="text-[10px] font-mono text-cyan-400">Live</span>
                </a>
              </li>
              <li>
                <a
                  href="https://f-e-book.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center justify-between"
                >
                  <span>f0undr Book: Units 1–6</span>
                  <span className="text-[10px] font-mono text-slate-400">Vercel</span>
                </a>
              </li>
              <li>
                <a
                  href="https://f0-share.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center justify-between"
                >
                  <span>f0-Share Vault</span>
                  <span className="text-[10px] font-mono text-slate-400">Vercel</span>
                </a>
              </li>
              <li>
                <a
                  href="https://calculator-f0.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center justify-between"
                >
                  <span>f0-Calculator (8-Units)</span>
                  <span className="text-[10px] font-mono text-slate-400">Vercel</span>
                </a>
              </li>
              <li>
                <a
                  href="https://f0undr-ai.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center justify-between"
                >
                  <span>f0undr Ai (genni 1)</span>
                  <span className="text-[10px] font-mono text-slate-400">Vercel</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2 flex-wrap">
            <span>© 2026 Technology Corporation.</span>
            <span>•</span>
            <span className="text-white">Muhammad Huzaifa Zahid &amp; Founder Team</span>
            <span>•</span>
            <button
              onClick={() => {
                playClickSound();
                if (currentUser) {
                  onOpenAdmin?.();
                } else {
                  onOpenLogin?.();
                }
              }}
              onMouseEnter={playHoverSound}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentUser ? 'Admin Console' : 'Portal Login'}</span>
            </button>
          </div>

          <div>
            <button
              onClick={scrollToTop}
              onMouseEnter={playHoverSound}
              className="p-2 rounded-xl glass-card text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
