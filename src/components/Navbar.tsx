import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
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
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Overview' },
    { id: 'founder', label: 'Founder' },
    { id: 'projects', label: 'Systems' },
    { id: 'team', label: 'Leadership' },
    { id: 'curriculum', label: 'Curricula' },
    { id: 'skills', label: 'Architecture' },
    { id: 'order', label: 'Commission' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#030712]/80 backdrop-blur-2xl border-b border-white/[0.08]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/15 flex items-center justify-center font-mono font-bold text-white text-xs group-hover:bg-white group-hover:text-black transition-all shadow-sm">
              f0
            </div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm tracking-tight text-white group-hover:text-slate-200 transition-colors">
                f0undr
              </span>
              <span className="text-[10px] font-mono text-slate-400 border-l border-white/10 pl-2">
                Team
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.08] backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  onMouseEnter={playHoverSound}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-normal transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            {onOpenLogin && (
              <button
                onClick={() => {
                  playClickSound();
                  onOpenLogin();
                }}
                onMouseEnter={playHoverSound}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
                title={currentUser ? `Logged in as ${currentUser.name}` : 'Open Admin Portal'}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">{currentUser ? 'Admin Panel' : 'Portal'}</span>
              </button>
            )}

            <a
              href="https://f0undr-order.vercel.app/"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl btn-primary-white text-xs tracking-tight transition-all cursor-pointer group"
            >
              <span>Commission Order</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 bg-[#030712]/95 border-b border-white/[0.08] backdrop-blur-2xl">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 mt-1 border-t border-white/[0.08] flex flex-col gap-2">
              {onOpenLogin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-xs font-mono text-cyan-300"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{currentUser ? 'Open Admin Control' : 'Founder Login Portal'}</span>
                </button>
              )}
              <a
                href="https://f0undr-order.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl btn-primary-white text-xs"
              >
                <span>Launch f0undr-order.vercel.app</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
