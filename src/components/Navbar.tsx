import { useState, useEffect } from 'react';
import { ArrowUpRight, ShieldCheck, Menu, X } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

interface NavbarProps {
  activeSection: string;
  onOpenLogin?: () => void;
  currentUser?: { name: string; role: string } | null;
}

export const Navbar = ({ activeSection, onOpenLogin, currentUser }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Overview' },
    { id: 'projects', label: 'Work' },
    { id: 'team', label: 'Team' },
    { id: 'templates', label: 'Templates' },
    { id: 'curriculum', label: 'Publications' },
    { id: 'tools', label: 'Tools' },
  ];

  const scrollTo = (id: string) => {
    playClickSound();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center py-3.5 px-4 pointer-events-none transition-all duration-300 ${
        scrolled
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className="w-full max-w-4xl flex items-center justify-between pointer-events-auto">
        <div className="w-full flex items-center justify-between px-3.5 sm:px-4 py-2 rounded-full bg-[#0a0a0b]/85 backdrop-blur-2xl border border-[rgba(244,241,234,0.14)] shadow-2xl">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2 group cursor-pointer pl-1"
          >
            <div className="w-7 h-7 rounded-full bg-[#16161a] border border-[rgba(244,241,234,0.2)] flex items-center justify-center font-mono font-bold text-[#f4f1ea] text-xs group-hover:scale-105 transition-transform">
              f0
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm tracking-tight text-[#f4f1ea]">
                f0undr
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse hidden sm:inline-block" />
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id || (link.id === 'hero' && activeSection === 'overview');
              return (
                <button
                  type="button"
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  onMouseEnter={playHoverSound}
                  className={`px-3 py-1 rounded-full text-xs font-medium tracking-tight transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#f4f1ea] text-[#0a0a0b] font-semibold'
                      : 'text-[#8d8b86] hover:text-[#f4f1ea] hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {onOpenLogin && (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onOpenLogin();
                }}
                onMouseEnter={playHoverSound}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16161a] hover:bg-white/10 border border-[rgba(244,241,234,0.14)] text-xs text-[#8d8b86] hover:text-[#f4f1ea] transition-all cursor-pointer"
                title={currentUser ? `Logged in as ${currentUser.name}` : 'Open Admin Portal'}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-mono">{currentUser ? 'Admin' : 'Gate'}</span>
              </button>
            )}

            <a
              href="https://order.f0undrteam.site/#"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f4f1ea] text-[#0a0a0b] font-semibold text-xs tracking-tight shadow-md hover:bg-white hover:scale-[1.02] transition-all cursor-pointer group"
            >
              <span>Order</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-1.5 rounded-full bg-[#16161a] border border-[rgba(244,241,234,0.14)] text-[#8d8b86] hover:text-[#f4f1ea]"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-4 right-4 p-4 rounded-3xl bg-[#0a0a0b]/95 backdrop-blur-2xl border border-[rgba(244,241,234,0.18)] shadow-2xl flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left px-4 py-2 rounded-xl text-sm font-medium text-[#8d8b86] hover:text-[#f4f1ea] hover:bg-white/[0.06] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[rgba(244,241,234,0.1)] flex items-center justify-between">
              {onOpenLogin && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="text-xs font-mono text-emerald-400 py-1"
                >
                  {currentUser ? 'Admin Panel' : 'Access Gate'}
                </button>
              )}
              <a
                href="https://order.f0undrteam.site/#"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-[#0a0a0b] px-4 py-1.5 rounded-full bg-[#f4f1ea] hover:bg-white"
              >
                Commission Order ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
