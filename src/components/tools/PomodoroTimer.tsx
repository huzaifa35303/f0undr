import { useState, useEffect, useRef } from 'react';
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

  // Web Audio Synth Chime
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch {
      // AudioContext fallback
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsRunning(false);
            playChime();

            if (mode === 'work') {
              const updated = completedSessions + 1;
              setCompletedSessions(updated);
              localStorage.setItem('f0undr_pomo_sessions', updated.toString());
              confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 },
              });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, completedSessions, soundEnabled]);

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
    <div className="flex flex-col items-center relative overflow-hidden">
      {/* Mode Selector Tabs */}
      <div className="flex items-center gap-1.5 bg-[#f5f2eb] p-1.5 rounded-xl border border-[#e7e5e4] mb-8 z-10">
        <button
          onClick={() => switchMode('work')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            mode === 'work'
              ? 'btn-editorial-primary shadow-xs'
              : 'text-[#57534e] hover:text-[#1c1917]'
          }`}
        >
          Deep Focus (25m)
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            mode === 'shortBreak'
              ? 'btn-editorial-accent shadow-xs'
              : 'text-[#57534e] hover:text-[#1c1917]'
          }`}
        >
          Short Break (5m)
        </button>
        <button
          onClick={() => switchMode('longBreak')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            mode === 'longBreak'
              ? 'bg-[#2b5346] text-white shadow-xs'
              : 'text-[#57534e] hover:text-[#1c1917]'
          }`}
        >
          Long Break (15m)
        </button>
      </div>

      {/* Task in focus input */}
      <div className="w-full max-w-sm mb-6 z-10">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="What are you currently focusing on? (e.g. System Architecture)..."
          className="w-full px-4 py-2.5 bg-[#fcfbf9] border border-[#e7e5e4] rounded-xl text-xs sm:text-sm text-center text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#1c1917] transition-colors shadow-2xs"
        />
      </div>

      {/* Main Timer Display */}
      <div className="relative flex flex-col items-center justify-center my-6 z-10">
        <div className="text-6xl sm:text-8xl font-serif font-bold tracking-tight text-[#1c1917] mb-3 tabular-nums">
          {formattedTime}
        </div>
        <div className="w-64 sm:w-80 h-2 bg-[#f5f2eb] rounded-full overflow-hidden border border-[#e7e5e4]">
          <div
            className={`h-full transition-all duration-1000 ${
              mode === 'work' ? 'bg-[#1c1917]' : mode === 'shortBreak' ? 'bg-[#c2410c]' : 'bg-[#2b5346]'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-4 mt-8 z-10">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-xs transition-all hover:-translate-y-0.5 active:scale-98 ${
            isRunning
              ? 'btn-editorial-accent'
              : 'btn-editorial-primary'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" /> Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" /> Start Focus
            </>
          )}
        </button>

        <button
          onClick={resetTimer}
          title="Reset Timer"
          className="p-3.5 btn-editorial-outline rounded-xl text-[#1c1917] transition-all shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? 'Mute Chime' : 'Enable Chime'}
          className={`p-3.5 rounded-xl border transition-all shadow-xs ${
            soundEnabled
              ? 'bg-[#f0fdf4] text-[#166534] border-[#dcfce7]'
              : 'bg-white text-[#a8a29e] border-[#e7e5e4]'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      {/* Bottom Session Stats */}
      <div className="flex items-center gap-6 mt-10 pt-6 border-t border-[#e7e5e4] text-xs text-[#57534e] z-10">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#2b5346]" />
          <span>
            Sessions Logged: <strong className="text-[#1c1917] font-mono">{completedSessions}</strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#c2410c]" />
          <span>
            Focus Hours: <strong className="text-[#1c1917] font-mono">{((completedSessions * 25) / 60).toFixed(1)}h</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
