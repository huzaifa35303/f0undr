import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

const MODE_DURATIONS: Record<TimerMode, number> = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export const PomodoroTimer = () => {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState<number>(MODE_DURATIONS.work);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(() => {
    return parseInt(localStorage.getItem('f0undr_pomo_sessions') || '0', 10);
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [taskName, setTaskName] = useState<string>('');

  const timerRef = useRef<number | null>(null);

  const playChime = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch {
    }
  }, [soundEnabled]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            playChime();
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.8 },
            });
            if (mode === 'work') {
              const next = completedSessions + 1;
              setCompletedSessions(next);
              localStorage.setItem('f0undr_pomo_sessions', next.toString());
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, completedSessions, playChime]);

  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(MODE_DURATIONS[newMode]);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(MODE_DURATIONS[mode]);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalDuration = MODE_DURATIONS[mode];
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <div className="flex flex-col items-center relative overflow-hidden py-4 text-[#f4f1ea]">
      <div className="flex items-center gap-1.5 bg-[#0a0a0b] p-1.5 rounded-full border border-[rgba(244,241,234,0.12)] mb-8 z-10 shadow-lg">
        <button
          onClick={() => switchMode('work')}
          className={`px-4 py-1.5 text-xs font-mono font-semibold rounded-full transition-all cursor-pointer ${
            mode === 'work'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-md'
              : 'text-[#8d8b86] hover:text-[#f4f1ea]'
          }`}
        >
          Deep Focus (25m)
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={`px-4 py-1.5 text-xs font-mono font-semibold rounded-full transition-all cursor-pointer ${
            mode === 'shortBreak'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-md'
              : 'text-[#8d8b86] hover:text-[#f4f1ea]'
          }`}
        >
          Short Break (5m)
        </button>
        <button
          onClick={() => switchMode('longBreak')}
          className={`px-4 py-1.5 text-xs font-mono font-semibold rounded-full transition-all cursor-pointer ${
            mode === 'longBreak'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-md'
              : 'text-[#8d8b86] hover:text-[#f4f1ea]'
          }`}
        >
          Long Break (15m)
        </button>
      </div>

      <div className="w-full max-w-sm mb-6 z-10">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Active focus target: (e.g. Systems Architecture)..."
          className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[rgba(244,241,234,0.14)] rounded-2xl text-xs sm:text-sm text-center text-[#f4f1ea] placeholder-[#8d8b86] focus:outline-none focus:border-cyan-400 transition-colors shadow-inner font-mono"
        />
      </div>

      <div className="relative flex flex-col items-center justify-center my-6 z-10">
        <div className="text-7xl sm:text-9xl font-mono font-black tracking-tight text-[#f4f1ea] mb-4 tabular-nums drop-shadow-[0_0_25px_rgba(6,182,212,0.35)]">
          {formattedTime}
        </div>
        <div className="w-64 sm:w-80 h-2 bg-[#0a0a0b] rounded-full overflow-hidden border border-[rgba(244,241,234,0.1)] shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8 z-10">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-8 py-3.5 rounded-full font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer ${
            isRunning
              ? 'bg-amber-400 text-[#0a0a0b] hover:bg-amber-300'
              : 'bg-[#f4f1ea] text-[#0a0a0b] hover:bg-white'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 fill-current" /> Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" /> Start Focus
            </>
          )}
        </button>

        <button
          onClick={resetTimer}
          className="p-3.5 rounded-full bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)] text-[#8d8b86] hover:text-[#f4f1ea] hover:border-cyan-400/50 transition-all cursor-pointer shadow-md"
          title="Reset Timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-3.5 rounded-full border transition-all cursor-pointer shadow-md ${
            soundEnabled
              ? 'bg-[#0a0a0b] border-cyan-400/40 text-cyan-400'
              : 'bg-[#0a0a0b] border-[rgba(244,241,234,0.1)] text-[#8d8b86]'
          }`}
          title={soundEnabled ? 'Chime Enabled' : 'Chime Muted'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex items-center gap-6 mt-8 pt-6 border-t border-[rgba(244,241,234,0.08)] z-10 text-xs font-mono text-[#8d8b86]">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Sessions Logged: <strong className="text-[#f4f1ea]">{completedSessions}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Focus Hours: <strong className="text-[#f4f1ea]">{(completedSessions * 0.42).toFixed(1)}h</strong></span>
        </div>
      </div>
    </div>
  );
};
