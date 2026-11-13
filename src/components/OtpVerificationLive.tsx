import { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCcw, Check, AlertCircle, Play, Sparkles } from 'lucide-react';

export const OtpVerificationLive = () => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [status, setStatus] = useState<'idle' | 'typing' | 'pattern' | 'collapse' | 'success' | 'error'>('idle');
  const [caretIndex, setCaretIndex] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [segmentsOn, setSegmentsOn] = useState<boolean>(false);
  const [boxStyles, setBoxStyles] = useState<{
    t0?: string;
    t1?: string;
    t2?: string;
    t3?: string;
    op1?: string;
    op2?: string;
    op3?: string;
    bg0?: string;
  }>({});

  const kbdRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timersRef = useRef<number[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    w: number;
    h: number;
    color: string;
    rot: number;
    rv: number;
    life: number;
    g: number;
    burst: boolean;
  }>>([]);

  const CORRECT_CODE = '5683';

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      try {
        const AudioCtor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtor();
      } catch {
        return null;
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current && audioCtxRef.current.state === 'running' ? audioCtxRef.current : null;
  }, []);

  const playBeep = useCallback((freq: number, dur: number, vol: number, type: OscillatorType = 'sine') => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    } catch {
      return;
    }
  }, [getAudioContext]);

  const playErrorBuzz = useCallback(() => {
    playBeep(220, 0.12, 0.08, 'sawtooth');
    setTimeout(() => playBeep(180, 0.16, 0.09, 'sawtooth'), 110);
  }, [playBeep]);

  const playChime = useCallback(() => {
    playBeep(1046.5, 0.55, 0.05, 'sine');
    setTimeout(() => playBeep(1318.5, 0.55, 0.045, 'sine'), 80);
    setTimeout(() => playBeep(1567.98, 0.65, 0.04, 'sine'), 160);
  }, [playBeep]);

  const spawnConfetti = useCallback(() => {
    const colors = ['#38bdf8', '#34d399', '#f59e0b', '#ec4899', '#a855f7', '#ffffff', '#22d3ee'];
    const p: typeof particlesRef.current = [];
    for (let i = 0; i < 35; i++) {
      const angle = (Math.random() * 2.4 - 1.85) * Math.PI;
      const radius = 20 + Math.random() * 25;
      const speed = 250 + Math.random() * 420;
      p.push({
        x: 210 + Math.cos(Math.PI - angle) * radius,
        y: 220 + Math.sin(Math.PI - angle) * radius,
        vx: Math.cos(Math.PI - angle) * speed,
        vy: Math.sin(Math.PI - angle) * speed,
        w: 6 + Math.random() * 5,
        h: 2.5 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: (Math.random() - 0.5) * 12,
        rv: (Math.random() - 0.5) * 12,
        life: 1.5 + Math.random() * 0.9,
        g: 230,
        burst: true,
      });
    }
    for (let i = 0; i < 45; i++) {
      p.push({
        x: 10 + Math.random() * 400,
        y: -20 - Math.random() * 30,
        vx: (Math.random() - 0.5) * 70,
        vy: 90 + Math.random() * 170,
        w: 6 + Math.random() * 5,
        h: 2.5 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: (Math.random() - 0.5) * 12,
        rv: (Math.random() - 0.5) * 20,
        life: 2.4 + Math.random() * 1.5,
        g: 70 + Math.random() * 60,
        burst: false,
      });
    }
    particlesRef.current = p;

    let lastTime: number | null = null;
    const renderLoop = (time: number) => {
      if (lastTime === null) lastTime = time;
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      const cvs = canvasRef.current;
      if (!cvs) return;
      const ctx = cvs.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, cvs.width, cvs.height);

      particlesRef.current = particlesRef.current.filter((pt) => {
        pt.life -= dt;
        if (pt.life <= 0) return false;
        pt.vy = pt.burst && pt.vy < 0 ? pt.vy + pt.g * dt * 1.5 : pt.vy + pt.g * dt;
        if (pt.burst) pt.vx *= 1 - 1.3 * dt;
        pt.x += pt.vx * dt;
        pt.y += pt.vy * dt;
        pt.rot += pt.rv * dt;
        if (pt.y > 350) {
          pt.y = 350;
          pt.vy = 0;
          pt.vx *= 0.7;
          pt.rv *= 0.5;
        }
        const alpha = Math.min(1, pt.life / 0.35);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(pt.x, pt.y);
        ctx.rotate(pt.rot);
        ctx.fillStyle = pt.color;
        ctx.fillRect(-pt.w / 2, -pt.h / 2, pt.w, pt.h);
        ctx.restore();
        return true;
      });

      if (particlesRef.current.length > 0) {
        animFrameRef.current = requestAnimationFrame(renderLoop);
      } else {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        animFrameRef.current = null;
      }
    };

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(renderLoop);
  }, []);

  const handleReset = useCallback(() => {
    clearAllTimers();
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    const cvs = canvasRef.current;
    if (cvs) {
      const ctx = cvs.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, cvs.width, cvs.height);
    }
    setDigits(['', '', '', '']);
    setStatus('idle');
    setCaretIndex(0);
    setErrorMessage('');
    setSegmentsOn(false);
    setBoxStyles({});
    if (kbdRef.current) {
      kbdRef.current.value = '';
      kbdRef.current.focus();
    }
  }, [clearAllTimers]);

  const triggerSuccessSequence = useCallback(() => {
    setStatus('pattern');
    setBoxStyles({
      t0: 'translate(51px, -40px)',
      t1: 'translate(51px, -40px)',
      t2: 'translate(-57px, 14px)',
      t3: 'translate(-57px, 14px)',
    });

    addTimer(() => {
      playBeep(440, 0.08, 0.03, 'triangle');
      setSegmentsOn(true);
    }, 380);

    addTimer(() => {
      setStatus('collapse');
      setSegmentsOn(false);
      setBoxStyles({
        t0: 'translate(78px, -5px)',
        t1: 'translate(26px, -5px)',
        t2: 'translate(-28px, -5px)',
        t3: 'translate(-80px, -5px)',
        op1: '0',
        op2: '0',
        op3: '0',
      });
    }, 1300);

    addTimer(() => {
      setBoxStyles((prev) => ({ ...prev, bg0: '#22d262' }));
      playBeep(660, 0.08, 0.06, 'sine');
    }, 1620);

    addTimer(() => {
      setStatus('success');
      playChime();
      spawnConfetti();
    }, 1750);
  }, [addTimer, playBeep, playChime, spawnConfetti]);

  const triggerErrorSequence = useCallback((entered: string) => {
    setStatus('error');
    playErrorBuzz();
    setErrorMessage(`"${entered}" is incorrect. Try demo code 5683`);

    addTimer(() => {
      setDigits(['', '', '', '']);
      setCaretIndex(0);
      setStatus('idle');
      if (kbdRef.current) {
        kbdRef.current.value = '';
        kbdRef.current.focus();
      }
    }, 1900);
  }, [addTimer, playErrorBuzz]);

  const verifyEnteredDigits = useCallback((nextDigits: string[]) => {
    const fullCode = nextDigits.join('');
    if (fullCode.length !== 4) return;

    if (fullCode === CORRECT_CODE) {
      triggerSuccessSequence();
    } else {
      triggerErrorSequence(fullCode);
    }
  }, [triggerSuccessSequence, triggerErrorSequence]);

  const handleInputDigit = useCallback((val: string) => {
    if (status === 'pattern' || status === 'collapse' || status === 'success') return;
    const clean = val.replace(/\D/g, '').slice(0, 4);
    if (!clean) {
      setDigits(['', '', '', '']);
      setCaretIndex(0);
      setStatus('idle');
      return;
    }

    const next = ['', '', '', ''];
    for (let i = 0; i < clean.length; i++) {
      next[i] = clean[i];
    }
    setDigits(next);
    setCaretIndex(Math.min(3, clean.length));
    setStatus('typing');
    playBeep(1800, 0.025, 0.045, 'sine');

    if (clean.length === 4) {
      addTimer(() => verifyEnteredDigits(next), 120);
    }
  }, [status, playBeep, addTimer, verifyEnteredDigits]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && status !== 'pattern' && status !== 'collapse' && status !== 'success') {
      const idx = digits.reduce((last, d, i) => (d ? i : last), -1);
      if (idx >= 0) {
        const next = [...digits];
        next[idx] = '';
        setDigits(next);
        setCaretIndex(idx);
        if (next.every((d) => !d)) {
          setStatus('idle');
          setErrorMessage('');
        }
      }
    }
  };

  const playDemoSuccess = () => {
    handleReset();
    const demo = ['5', '6', '8', '3'];
    demo.forEach((char, idx) => {
      addTimer(() => {
        setDigits((prev) => {
          const upd = [...prev];
          upd[idx] = char;
          if (idx === 3) {
            addTimer(() => triggerSuccessSequence(), 140);
          }
          return upd;
        });
        setCaretIndex(Math.min(3, idx + 1));
        setStatus('typing');
        playBeep(1900, 0.03, 0.05, 'sine');
      }, (idx + 1) * 340);
    });
  };

  const playDemoWrong = () => {
    handleReset();
    const wrong = ['7', '2', '4', '9'];
    wrong.forEach((char, idx) => {
      addTimer(() => {
        setDigits((prev) => {
          const upd = [...prev];
          upd[idx] = char;
          if (idx === 3) {
            addTimer(() => triggerErrorSequence('7249'), 140);
          }
          return upd;
        });
        setCaretIndex(Math.min(3, idx + 1));
        setStatus('typing');
        playBeep(1900, 0.03, 0.05, 'sine');
      }, (idx + 1) * 260);
    });
  };

  useEffect(() => {
    return () => {
      clearAllTimers();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [clearAllTimers]);

  return (
    <div className="w-full flex flex-col items-center select-none py-1 sm:py-2">
      <div className="w-full max-w-[420px] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-[11px] sm:text-xs font-mono font-bold text-white tracking-wider uppercase">Live Interactive Test</span>
          <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-200">
            Demo Code: <span className="text-emerald-400 font-bold">5683</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={playDemoSuccess}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-[10px] sm:text-xs font-mono transition-all cursor-pointer font-medium"
            title="Auto-play correct OTP (5683)"
          >
            <Play className="w-2.5 h-2.5 fill-current" />
            <span>Test 5683</span>
          </button>

          <button
            onClick={playDemoWrong}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-[10px] sm:text-xs font-mono transition-all cursor-pointer font-medium"
            title="Test wrong code shake & error state"
          >
            <AlertCircle className="w-2.5 h-2.5" />
            <span>Test Wrong</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-[10px] sm:text-xs font-mono transition-all cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div
        onClick={() => kbdRef.current?.focus()}
        className="relative w-full max-w-[420px] h-[360px] rounded-3xl bg-[#100f14] border border-white/15 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col items-center justify-start pt-7 cursor-text transition-all duration-300 hover:border-cyan-400/50"
      >
        <div className="w-10 h-1.5 rounded-full bg-[#4a494e] mb-6"></div>

        <div className="text-center px-6 mb-4">
          <h4 className="text-white text-lg font-bold tracking-tight">
            {status === 'success' ? (
              <span className="text-emerald-400 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" /> Phone Verified!
              </span>
            ) : status === 'error' ? (
              <span className="text-rose-400">Verification Failed</span>
            ) : (
              "Let's verify your number"
            )}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed mt-1.5 max-w-xs">
            {status === 'success'
              ? 'Access token granted. Ready for production deployment.'
              : status === 'error'
              ? errorMessage
              : 'Enter the 4-digit code sent to your phone. It auto-verifies once entered.'}
          </p>
        </div>

        <div
          className={`relative w-[208px] h-[44px] mt-8 ${
            status === 'error' ? 'animate-[shake_0.45s_ease-in-out]' : ''
          }`}
        >
          <div
            className={`absolute top-0 left-0 w-[44px] h-[44px] rounded-xl bg-[#131217] border flex items-center justify-center font-bold text-base text-white transition-all duration-300 ${
              status === 'error'
                ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.45)]'
                : 'border-[#2b2a30]'
            }`}
            style={{
              transform: boxStyles.t0 || 'none',
              backgroundColor: boxStyles.bg0 || undefined,
              borderColor: boxStyles.bg0 || undefined,
            }}
          >
            {digits[0]}
            {status !== 'success' && status !== 'collapse' && caretIndex === 0 && (
              <div className="absolute left-[20px] top-[8px] w-[2.5px] h-[26px] rounded-full bg-gradient-to-b from-teal-400 to-rose-500 animate-pulse"></div>
            )}
          </div>

          <div
            className={`absolute top-0 left-[55px] w-[44px] h-[44px] rounded-xl bg-[#131217] border flex items-center justify-center font-bold text-base text-white transition-all duration-300 ${
              status === 'error'
                ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.45)]'
                : 'border-[#2b2a30]'
            }`}
            style={{
              transform: boxStyles.t1 || 'none',
              opacity: boxStyles.op1 !== undefined ? boxStyles.op1 : '1',
            }}
          >
            {digits[1]}
            {status !== 'success' && status !== 'collapse' && caretIndex === 1 && (
              <div className="absolute left-[20px] top-[8px] w-[2.5px] h-[26px] rounded-full bg-gradient-to-b from-teal-400 to-rose-500 animate-pulse"></div>
            )}
          </div>

          <div
            className={`absolute top-0 left-[110px] w-[44px] h-[44px] rounded-xl bg-[#131217] border flex items-center justify-center font-bold text-base text-white transition-all duration-300 ${
              status === 'error'
                ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.45)]'
                : 'border-[#2b2a30]'
            }`}
            style={{
              transform: boxStyles.t2 || 'none',
              opacity: boxStyles.op2 !== undefined ? boxStyles.op2 : '1',
            }}
          >
            {digits[2]}
            {status !== 'success' && status !== 'collapse' && caretIndex === 2 && (
              <div className="absolute left-[20px] top-[8px] w-[2.5px] h-[26px] rounded-full bg-gradient-to-b from-teal-400 to-rose-500 animate-pulse"></div>
            )}
          </div>

          <div
            className={`absolute top-0 left-[164px] w-[44px] h-[44px] rounded-xl bg-[#131217] border flex items-center justify-center font-bold text-base text-white transition-all duration-300 ${
              status === 'error'
                ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.45)]'
                : 'border-[#2b2a30]'
            }`}
            style={{
              transform: boxStyles.t3 || 'none',
              opacity: boxStyles.op3 !== undefined ? boxStyles.op3 : '1',
            }}
          >
            {digits[3]}
            {status !== 'success' && status !== 'collapse' && caretIndex === 3 && (
              <div className="absolute left-[20px] top-[8px] w-[2.5px] h-[26px] rounded-full bg-gradient-to-b from-teal-400 to-rose-500 animate-pulse"></div>
            )}
          </div>

          <div
            className={`absolute left-[94px] -top-[20px] w-[20px] h-[2.5px] bg-white/90 rounded-full transition-transform duration-150 origin-left ${
              segmentsOn ? 'scale-x-100' : 'scale-x-0'
            }`}
          ></div>
          <div
            className={`absolute left-[126px] top-[3px] w-[2.5px] h-[20px] bg-white/90 rounded-full transition-transform duration-150 origin-top ${
              segmentsOn ? 'scale-y-100' : 'scale-y-0'
            }`}
          ></div>
          <div
            className={`absolute left-[94px] top-[35px] w-[20px] h-[2.5px] bg-white/90 rounded-full transition-transform duration-150 origin-right ${
              segmentsOn ? 'scale-x-100' : 'scale-x-0'
            }`}
          ></div>
          <div
            className={`absolute left-[70px] top-[3px] w-[2.5px] h-[20px] bg-white/90 rounded-full transition-transform duration-150 origin-bottom ${
              segmentsOn ? 'scale-y-100' : 'scale-y-0'
            }`}
          ></div>
        </div>

        {status === 'success' && (
          <div className="absolute top-[162px] left-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_10px_25px_rgba(34,197,94,0.5)] flex items-center justify-center animate-[gainPulse_0.6s_ease-out_2]">
            <Check className="w-8 h-8 text-white stroke-[3.5]" />
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={420}
          height={360}
          className="absolute inset-0 pointer-events-none"
        ></canvas>

        <div className="absolute bottom-6 text-center">
          <p
            onClick={handleReset}
            className="text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Didn&apos;t receive the code? <span className="text-white font-bold underline">Resend</span>
          </p>
          <div className="text-[8.5px] font-mono tracking-[0.25em] text-white/30 mt-1.5 uppercase font-semibold">
            OTP VERIFICATION &bull; F0UNDR LABS
          </div>
        </div>

        <input
          ref={kbdRef}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={4}
          value={digits.join('')}
          onChange={(e) => handleInputDigit(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute left-0 top-0 w-px h-px opacity-0 pointer-events-none"
          aria-label="4-digit OTP verification input"
        />
      </div>
    </div>
  );
};
