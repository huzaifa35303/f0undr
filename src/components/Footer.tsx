import { ArrowUp, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';
import type { AuthUser } from '../types';

interface FooterProps {
  currentUser?: AuthUser | null;
  onOpenLogin?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer = ({ currentUser, onOpenLogin, onOpenAdmin }: FooterProps = {}) => {
  const ORDER_URL = 'https://f0undr-order.vercel.app/';

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
              <div className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/15 flex items-center justify-center font-mono font-bold text-white text-xs">
                f0
              </div>
              <div>
                <div className="font-heading font-bold text-white text-base tracking-tight">
                  f0undr &amp; f0undr Team
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  Founded by Muhammad Huzaifa Zahid
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm">
              Autonomous AI systems, native Android architectures, sovereign cryptographic vaults,
              and living computational literature.
            </p>

            <div>
              <a
                href={ORDER_URL}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 border border-white/10 text-white text-xs font-medium transition-colors"
              >
                <span>f0undr-order.vercel.app</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Architecture
            </div>
            <ul className="space-y-2 text-xs text-slate-400 font-light">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#founder" className="hover:text-white transition-colors">
                  Muhammad Huzaifa Zahid (f0undr)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Systems &amp; Ecosystem
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">
                  Executive Leadership
                </a>
              </li>
              <li>
                <a href="#curriculum" className="hover:text-white transition-colors">
                  Curricula &amp; E-Books
                </a>
              </li>
              <li>
                <a href="#order" className="hover:text-white transition-colors">
                  Commission Studio
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Live Platforms
            </div>
            <ul className="space-y-2 text-xs text-slate-400 font-light">
              <li>
                <a
                  href={ORDER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span className="text-white font-medium">f0undr Order Studio</span>
                  <span className="text-[10px] font-mono text-slate-400">Official</span>
                </a>
              </li>
              <li>
                <a
                  href="https://f-e-book.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between"
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
                  className="hover:text-white transition-colors flex items-center justify-between"
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
                  className="hover:text-white transition-colors flex items-center justify-between"
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
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>f0undr Ai (genni 1)</span>
                  <span className="text-[10px] font-mono text-slate-400">Vercel</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2 flex-wrap">
            <span>© 2026 f0undr. All rights reserved.</span>
            <span>•</span>
            <span className="text-slate-400">Muhammad Huzaifa Zahid &amp; f0undr Team</span>
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
              className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{currentUser ? 'Admin Console' : 'Portal Login'}</span>
            </button>
          </div>

          <div>
            <button
              onClick={scrollToTop}
              onMouseEnter={playHoverSound}
              className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
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
