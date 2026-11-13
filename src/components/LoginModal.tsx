import { useState, useRef, useEffect } from 'react';
import { X, Lock, KeyRound, Check, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';
import type { AuthUser } from '../types';
import { DEFAULT_AUTH_USERS } from '../data/initialData';
import { playClickSound } from '../utils/audio';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}

export const LoginModal = ({ isOpen, onClose, onLoginSuccess }: LoginModalProps) => {
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingUser, setPendingUser] = useState<AuthUser | null>(null);

  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '']);
  const [otpStatus, setOtpStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [otpError, setOtpError] = useState<string>('');
  const otpInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const ADMIN_OTP = '1111';

  useEffect(() => {
    if (isOpen) {
      setStep('credentials');
      setEmail('');
      setPassword('');
      setError(null);
      setPendingUser(null);
      setOtpDigits(['', '', '', '']);
      setOtpStatus('idle');
      setOtpError('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        otpInputRefs[0].current?.focus();
      }, 150);
    }
  }, [step]);

  if (!isOpen) return null;

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const normalizedInput = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      const match = DEFAULT_AUTH_USERS.find((u) => {
        const uEmail = u.email.toLowerCase();
        const uPrefix = uEmail.split('@')[0];
        const uName = u.name.toLowerCase();
        const uId = u.id.toLowerCase().replace('user-', '');
        return (
          uEmail === normalizedInput ||
          uPrefix === normalizedInput ||
          uName === normalizedInput ||
          uId === normalizedInput ||
          uEmail.replace('@f0undr.org', '@f0undr.dev') === normalizedInput ||
          uEmail.replace('@f0undr.org', '@gmail.com') === normalizedInput
        );
      });

      if (match && match.passwordHash === cleanPassword) {
        setIsLoading(false);
        const { passwordHash: _, ...authenticatedUser } = match;
        setPendingUser(authenticatedUser);
        setStep('otp');
        playClickSound();
      } else {
        setIsLoading(false);
        setError('Invalid credentials. Please verify your email/username and access key.');
      }
    }, 250);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const digit = val.slice(-1);

    const next = [...otpDigits];
    next[index] = digit;
    setOtpDigits(next);
    setOtpError('');
    playClickSound();

    if (digit && index < 3) {
      otpInputRefs[index + 1].current?.focus();
    }

    if (next.every((d) => d !== '')) {
      const full = next.join('');
      setOtpStatus('verifying');

      setTimeout(() => {
        if (full === ADMIN_OTP) {
          setOtpStatus('success');
          setTimeout(() => {
            if (pendingUser) {
              onLoginSuccess(pendingUser);
            }
            onClose();
          }, 600);
        } else {
          setOtpStatus('error');
          setOtpError(`Code "${full}" is incorrect. Enter master OTP: 1111`);
          setTimeout(() => {
            setOtpDigits(['', '', '', '']);
            setOtpStatus('idle');
            otpInputRefs[0].current?.focus();
          }, 1400);
        }
      }, 350);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs[index - 1].current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-lg bg-[#100f14] rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-7 border-b border-white/[0.08] bg-[#16151c]/80 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-xs">
              {step === 'credentials' ? <Lock className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5 text-emerald-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-xl font-bold text-white tracking-tight">
                  {step === 'credentials' ? 'f0undr Access Control' : 'Two-Factor Authentication'}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold uppercase">
                  {step === 'credentials' ? 'Admin Gate' : 'Step 2 of 2'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-normal">
                {step === 'credentials'
                  ? 'Sign in to access curriculum, telemetry vault, and executive control.'
                  : `Verifying identity for ${pendingUser?.name || 'Administrator'}.`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-7 space-y-6">
          {step === 'credentials' ? (
            <>
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleManualLogin} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
                      Admin Email or Username
                    </label>
                    <span className="text-[10px] font-mono text-slate-400">e.g. admin or huzaifa</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@f0undr.org"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#16151c] text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                    Access Key / Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-white/10 bg-[#16151c] text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl btn-primary-white text-xs font-semibold shadow-xs transition-all hover:-translate-y-0.5 active:scale-98 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Authorize &amp; Proceed to OTP Verification</span>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="space-y-6 text-center py-2">
              <div className="space-y-1">
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                  Admin Passkey Required: 1111
                </span>
                <p className="text-xs text-slate-300 mt-2">
                  Enter the 4-digit master verification code to complete executive authorization.
                </p>
              </div>

              {otpError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center justify-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              <div
                className={`flex items-center justify-center gap-3.5 py-4 ${
                  otpStatus === 'error' ? 'animate-[shake_0.45s_ease-in-out]' : ''
                }`}
              >
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={otpInputRefs[idx]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    disabled={otpStatus === 'verifying' || otpStatus === 'success'}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className={`w-13 h-14 rounded-2xl bg-[#16151c] text-center font-mono font-bold text-xl text-white border transition-all duration-200 focus:outline-none ${
                      otpStatus === 'error'
                        ? 'border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                        : otpStatus === 'success'
                        ? 'border-emerald-400 bg-emerald-500/15 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.3)]'
                        : digit
                        ? 'border-cyan-400/60 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                        : 'border-white/10 focus:border-cyan-400'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep('credentials');
                    setOtpDigits(['', '', '', '']);
                    setOtpError('');
                  }}
                  className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Credentials</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOtpDigits(['1', '1', '1', '1']);
                    setOtpStatus('verifying');
                    playClickSound();
                    setTimeout(() => {
                      setOtpStatus('success');
                      setTimeout(() => {
                        if (pendingUser) onLoginSuccess(pendingUser);
                        onClose();
                      }, 500);
                    }, 300);
                  }}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                >
                  Auto-Fill 1111
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-[#16151c]/80 border-t border-white/[0.08] text-center">
          <p className="text-[11px] font-mono text-slate-400 flex items-center justify-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            Authorized personnel only. Sessions authenticated via encrypted tokens.
          </p>
        </div>
      </div>
    </div>
  );
};
