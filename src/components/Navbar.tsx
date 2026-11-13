import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck, Activity } from 'lucide-react';
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
    { id: 'projects', label: 'Work' },
    { id: 'team', label: 'Team' },
    { id: 'templates', label: 'Templates' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'tools', label: 'Tools' },
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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className={`flex items-center justify-between px-3 sm:px-5 py-2.5 rounded-2xl transition-all duration-300 ${
          scrolled ? 'glass-dock' : 'bg-slate-950/40 backdrop-blur-xl border border-white/[0.07] shadow-lg'
        }`}>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-800 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center font-mono font-black text-white text-xs group-hover:border-cyan-400 group-hover:scale-105 transition-all shadow-xs">
                f0
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse"></span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-sm tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  f0undr
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.06] text-slate-300 border border-white/10">
                  CORP
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 hidden sm:inline leading-none mt-0.5">
                Technology Corporation
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.08] backdrop-blur-md shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id || (link.id === 'hero' && activeSection === 'overview');
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  onMouseEnter={playHoverSound}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-white border border-cyan-500/30 shadow-[0_0_15px_-3px_rgba(56,189,248,0.3)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-slate-400">
              <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold">99.99%</span>
              <span className="text-slate-600">•</span>
              <span>AUTONOMOUS</span>
            </div>

            {onOpenLogin && (
              <button
                onClick={() => {
                  playClickSound();
                  onOpenLogin();
                }}
                onMouseEnter={playHoverSound}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer hover:border-cyan-500/30"
                title={currentUser ? `Logged in as ${currentUser.name}` : 'Open Admin Access Portal'}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">{currentUser ? 'Admin Cockpit' : 'Portal'}</span>
              </button>
            )}

            <a
              href="https://f0undr-order.vercel.app/"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl btn-primary-white text-xs font-semibold tracking-tight transition-all cursor-pointer group"
            >
              <span>Order</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-2xl glass-dock border border-white/15 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                {onOpenLogin && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLogin();
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] text-xs font-mono text-cyan-300 border border-white/10"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{currentUser ? 'Admin Panel' : 'Access Gate'}</span>
                  </button>
                )}
                <a
                  href="https://f0undr-order.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl btn-primary-white text-xs font-bold text-center"
                >
                  <span>Commission Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
