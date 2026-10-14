import { useState } from 'react';
import { X, Lock, KeyRound, Check, Shield, UserCheck, Eye, EyeOff, Sparkles } from 'lucide-react';
import type { AuthUser } from '../types';
import { DEFAULT_AUTH_USERS } from '../data/initialData';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}

export const LoginModal = ({ isOpen, onClose, onLoginSuccess }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const match = DEFAULT_AUTH_USERS.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (match && match.passwordHash === password) {
        setIsLoading(false);
        const { passwordHash: _, ...authenticatedUser } = match;
        onLoginSuccess(authenticatedUser);
        onClose();
      } else {
        setIsLoading(false);
        setError('Invalid credentials. Check email and password or use the 1-click demo logins below.');
      }
    }, 350);
  };

  const handleQuickLogin = (userId: string) => {
    const match = DEFAULT_AUTH_USERS.find((u) => u.id === userId);
    if (match) {
      const { passwordHash: _, ...authenticatedUser } = match;
      onLoginSuccess(authenticatedUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1917]/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-lg bg-[#ffffff] rounded-2xl border border-[#e7e5e4] shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-[#e7e5e4] bg-[#faf8f5]/80 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1c1917] flex items-center justify-center text-[#faf8f5] shadow-xs">
              <Lock className="w-5 h-5 text-[#c2410c]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917]">
                  f0undr Access Control
                </h3>
                <span className="editorial-stamp editorial-stamp-terracotta">
                  Founder &amp; Admin
                </span>
              </div>
              <p className="text-xs text-[#57534e] mt-0.5 font-normal">
                Sign in to manage curriculum, editorial vault, fellows, and SEO rank telemetry.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#78716c] hover:text-[#1c1917] hover:bg-[#e7e5e4]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-red-600 mt-1 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium text-[#57534e] mb-1.5 uppercase tracking-wider">
                Founder / Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="founder@f0undr.org"
                className="w-full px-4 py-2.5 rounded-xl border border-[#d6d3d1] bg-white text-xs text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20 focus:border-[#c2410c] transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono font-medium text-[#57534e] uppercase tracking-wider">
                  Access Key / Password
                </label>
                <span className="text-[10px] font-mono text-[#78716c]">
                  Default demo: <code className="bg-[#f5f2eb] px-1 py-0.5 rounded text-[#1c1917]">f0undr2026</code>
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-[#d6d3d1] bg-white text-xs text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20 focus:border-[#c2410c] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716c] hover:text-[#1c1917]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl btn-editorial-primary text-xs font-semibold shadow-xs transition-all hover:-translate-y-0.5 active:scale-98 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Authorize &amp; Launch Admin Cockpit</span>
                </>
              )}
            </button>
          </form>

          {/* 1-Click Quick Demo Sign-Ins */}
          <div className="pt-5 border-t border-[#e7e5e4]">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#c2410c]" />
              <span className="text-xs font-mono font-semibold text-[#1c1917] uppercase tracking-wider">
                1-Click Instant Founder Access
              </span>
            </div>
            <p className="text-xs text-[#78716c] mb-3 leading-relaxed">
              Select any of the core founders to test full administrator privileges instantly:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('user-f0undr')}
                className="flex items-center gap-3 p-2.5 rounded-xl border border-[#e7e5e4] hover:border-[#c2410c] bg-[#faf8f5] hover:bg-white text-left transition-all group shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="f0undr"
                  className="w-8 h-8 rounded-lg object-cover border border-[#c2410c]"
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-serif font-bold text-[#1c1917] truncate">f0undr</span>
                    <Shield className="w-3 h-3 text-[#c2410c]" />
                  </div>
                  <span className="text-[10px] font-mono text-[#57534e] block truncate">Founder &amp; Superadmin</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('user-khizar')}
                className="flex items-center gap-3 p-2.5 rounded-xl border border-[#e7e5e4] hover:border-[#c2410c] bg-[#faf8f5] hover:bg-white text-left transition-all group shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Khizar"
                  className="w-8 h-8 rounded-lg object-cover border border-[#c2410c]"
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-serif font-bold text-[#1c1917] truncate">Abdull Rehman Khizar</span>
                    <UserCheck className="w-3 h-3 text-[#c2410c]" />
                  </div>
                  <span className="text-[10px] font-mono text-[#57534e] block truncate">Co-Founder &amp; Curriculum</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('user-huzaifa')}
                className="flex items-center gap-3 p-2.5 rounded-xl border border-[#e7e5e4] hover:border-[#c2410c] bg-[#faf8f5] hover:bg-white text-left transition-all group shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                  alt="Huzaifa"
                  className="w-8 h-8 rounded-lg object-cover border border-[#c2410c]"
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-serif font-bold text-[#1c1917] truncate">M.Huzaifa</span>
                    <UserCheck className="w-3 h-3 text-[#c2410c]" />
                  </div>
                  <span className="text-[10px] font-mono text-[#57534e] block truncate">Co-Founder &amp; AI Systems</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('user-admin')}
                className="flex items-center gap-3 p-2.5 rounded-xl border border-[#e7e5e4] hover:border-[#1c1917] bg-[#faf8f5] hover:bg-white text-left transition-all group shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80"
                  alt="Admin"
                  className="w-8 h-8 rounded-lg object-cover border border-[#78716c]"
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-serif font-bold text-[#1c1917] truncate">Operations Admin</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#57534e] block truncate">Executive Ops</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#faf8f5] border-t border-[#e7e5e4] text-center">
          <p className="text-[11px] font-mono text-[#78716c] flex items-center justify-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#2b5346]" />
            Local session secured with encrypted browser cache.
          </p>
        </div>
      </div>
    </div>
  );
};
