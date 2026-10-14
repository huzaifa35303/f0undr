import { useState, useEffect } from 'react';
import { Search, BookOpen, Users, Wrench, Package, ArrowUpRight, Compass, Shield, Lock, GraduationCap } from 'lucide-react';
import type { AuthUser } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  currentUser: AuthUser | null;
  onOpenLogin: () => void;
  onOpenAdmin: () => void;
  counts: {
    books: number;
    tools: number;
    team: number;
    things: number;
  };
}

export const Navbar = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  currentUser,
  onOpenLogin,
  onOpenAdmin,
  counts,
}: NavbarProps) => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'curriculum', label: 'f0undr Book', icon: GraduationCap },
    { id: 'books', label: `Bookshelf (${counts.books})`, icon: BookOpen },
    { id: 'team', label: `Team (${counts.team})`, icon: Users },
    { id: 'tools', label: `Tools (${counts.tools})`, icon: Wrench },
    { id: 'things', label: `Artifacts (${counts.things})`, icon: Package },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e7e5e4] shadow-xs py-3.5'
          : 'bg-[#faf8f5] border-b border-[#e7e5e4]/80 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Edition Tag */}
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1c1917] flex items-center justify-center text-[#faf8f5] font-serif font-bold text-base shadow-xs group-hover:bg-[#292524] transition-colors">
              f0
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-xl sm:text-2xl text-[#1c1917] tracking-tight">
                  f0undr<span className="text-[#c2410c]">.</span>
                </span>
                <span className="editorial-stamp hidden sm:inline-block">
                  Magazine &amp; Studio
                </span>
              </div>
              <p className="text-[10px] font-mono text-[#78716c] hidden md:block tracking-wide">
                Computing · Literature · Headquarters
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[#f5f2eb] p-1 rounded-xl border border-[#e7e5e4]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1c1917] text-[#faf8f5] shadow-xs font-semibold'
                      : 'text-[#57534e] hover:text-[#1c1917] hover:bg-[#faf8f5]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions: Search, Direct Book Link, Add Item, Login / Admin */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-[#f5f2eb] text-[#78716c] hover:text-[#1c1917] border border-[#e7e5e4] text-xs transition-colors shadow-2xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-[#f5f2eb] border border-[#e7e5e4] rounded text-[#78716c]">
                ⌘K
              </kbd>
            </button>

            {/* Direct f0undr Book Link */}
            <a
              href="/book/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#fff7ed] hover:bg-[#ffedd5] text-[#c2410c] border border-[#ffedd5] text-xs font-semibold transition-all hover:-translate-y-0.5 shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#c2410c]" />
              <span>f0undr Book</span>
              <ArrowUpRight className="w-3 h-3 text-[#c2410c]" />
            </a>

            {/* Auth / Admin Control */}
            {currentUser ? (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#1c1917] hover:bg-[#292524] text-[#faf8f5] text-xs font-semibold transition-all shadow-xs hover:-translate-y-0.5 group"
                title="Launch Admin Studio Cockpit"
              >
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-4 h-4 rounded-full object-cover border border-[#c2410c]"
                />
                <span className="font-mono text-xs">{currentUser.name}</span>
                <Shield className="w-3.5 h-3.5 text-[#c2410c] group-hover:rotate-12 transition-transform" />
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl btn-editorial-primary text-xs font-semibold shadow-xs transition-all hover:-translate-y-0.5"
              >
                <Lock className="w-3.5 h-3.5 text-[#c2410c]" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-between gap-1 overflow-x-auto py-2.5 mt-2 border-t border-[#e7e5e4] scrollbar-none text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg shrink-0 transition-colors ${
                  isActive
                    ? 'bg-[#1c1917] text-white font-medium'
                    : 'text-[#57534e] hover:text-[#1c1917]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
