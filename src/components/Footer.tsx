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
    <footer className="py-16 bg-[#0a0a0b] text-[#f4f1ea] border-t border-[rgba(244,241,234,0.12)] relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#111114] border border-[rgba(244,241,234,0.2)] flex items-center justify-center font-mono font-bold text-[#f4f1ea] text-xs">
                f0
              </div>
              <div>
                <div className="font-semibold text-[#f4f1ea] text-base tracking-tight">
                  Technology Corporation
                </div>
                <div className="text-[10px] font-mono text-cyan-400">
                  Founder &bull; Muhammad Huzaifa Zahid
                </div>
              </div>
            </div>

            <p className="text-xs text-[#8d8b86] leading-relaxed font-light max-w-sm">
              Autonomous AI systems, native Android APK architectures, sovereign encrypted cloud vaults,
              modular template starter kits, and independent study lab interfaces.
            </p>

            <div>
              <a
                href={ORDER_URL}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[rgba(244,241,234,0.2)] bg-[#111114] text-[#f4f1ea] text-xs font-semibold hover:border-cyan-400/40 transition-colors"
              >
                <span>Commission Studio (order.f0undrteam.site)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#f4f1ea] font-bold">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-[#8d8b86] font-light">
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
                <a href="#others" className="hover:text-cyan-300 transition-colors">
                  Others &amp; Webs
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-cyan-300 transition-colors">
                  f0undr Team
                </a>
              </li>
              <li>
                <a href="#templates" className="hover:text-cyan-300 transition-colors">
                  Templates &amp; Starters
                </a>
              </li>
              <li>
                <a href="#curriculum" className="hover:text-cyan-300 transition-colors">
                  Study Labs (NBF Ref)
                </a>
              </li>
              <li>
                <a href="#tools" className="hover:text-cyan-300 transition-colors">
                  f0undr Tools
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
              Production Gateways
            </div>
            <ul className="space-y-2 text-xs text-[#8d8b86] font-light">
              <li>
                <a
                  href={ORDER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center justify-between"
                >
                  <span className="text-[#f4f1ea] font-medium">f0undr Order Studio</span>
                  <span className="text-[10px] font-mono text-cyan-400">Live</span>
                </a>
              </li>
              <li>
                <a
                  href="https://f0undr.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center justify-between"
                >
                  <span>f Forms Platform</span>
                  <span className="text-[10px] font-mono text-[#8d8b86]">Vercel</span>
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
                  <span className="text-[10px] font-mono text-[#8d8b86]">Vercel</span>
                </a>
              </li>
              <li>
                <a
                  href="https://calculator-f0.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center justify-between"
                >
                  <span>f0-Calculator Suite</span>
                  <span className="text-[10px] font-mono text-[#8d8b86]">Vercel</span>
                </a>
              </li>
              <li>
                <a
                  href="https://f0undr-ai.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center justify-between"
                >
                  <span>f0undr AI (genni 1)</span>
                  <span className="text-[10px] font-mono text-[#8d8b86]">Vercel</span>
                </a>
              </li>
              <li>
                <a
                  href="https://f-e-book.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center justify-between"
                >
                  <span>Computing Lab (NBF Ref)</span>
                  <span className="text-[10px] font-mono text-[#8d8b86]">Vercel</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-8 p-5 rounded-3xl bg-[#111114] border border-[rgba(244,241,234,0.12)] text-xs text-[#8d8b86] font-mono leading-relaxed">
          <div className="flex items-center gap-2 text-cyan-300 font-semibold mb-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Sovereign Identity &amp; Intellectual Property Notice</span>
          </div>
          <p>
            f0undr and f0undr Team is an independent autonomous technology corporation and software engineering studio directed by Founder Muhammad Huzaifa Zahid. f0undr and the f0undr Team is not computing tech, not a school curriculum publisher, and is not affiliated with the National Book Foundation (NBF). All computing curriculum and textbook rights are strictly reserved to National Book Foundation (NBF). All proprietary systems, tactile templates, Android architectures, and digital assets are the exclusive intellectual property of f0undr. All rights reserved.
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
              className="p-2 rounded-xl bg-[#111114] border border-[rgba(244,241,234,0.12)] text-[#8d8b86] hover:text-[#f4f1ea] transition-colors cursor-pointer"
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
