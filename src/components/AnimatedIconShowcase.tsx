import { useState, useEffect } from 'react';
import { Play, RotateCcw, Check, Heart, Eye, Radio, Sparkles, Copy, AtSign } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

const InstagramIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const BlackSocialHandlePreview = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleReplay = () => {
    playClickSound();
    setAnimKey((prev) => prev + 1);
  };

  const handleToggleFollow = () => {
    playClickSound();
    setIsFollowing((prev) => !prev);
  };

  const handleCopy = () => {
    playClickSound();
    navigator.clipboard.writeText('@f0undr');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[380px] p-6 bg-gradient-to-b from-[#0d0d12] to-[#050508] rounded-2xl border border-white/10 relative overflow-hidden select-none">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0%,transparent_70%)]" />

      <div className="w-full flex items-center justify-between z-10">
        <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          Jitter Rebuild &bull; Black Pill
        </span>
        <button
          onClick={handleReplay}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay</span>
        </button>
      </div>

      <div key={animKey} className="my-auto flex flex-col items-center justify-center z-10 w-full py-8">
        <div
          onMouseEnter={playHoverSound}
          className={`group flex items-center gap-3.5 px-5 py-3.5 rounded-full bg-black/90 backdrop-blur-xl border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out hover:border-cyan-400/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.25)] ${
            isExpanded ? 'scale-100 opacity-100 translate-y-0' : 'scale-95'
          }`}
          style={{
            animation: 'f0undrEntry 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[1.5px] shrink-0 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white">
              <InstagramIcon className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold tracking-tight text-white font-sans">f0undr</span>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-cyan-400 text-black text-[9px] font-bold">
                ✓
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">@f0undr</span>
          </div>

          <div className="h-6 w-px bg-white/15 mx-1" />

          <button
            onClick={handleToggleFollow}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium font-sans transition-all cursor-pointer shrink-0 ${
              isFollowing
                ? 'bg-white/10 text-slate-300 border border-white/20'
                : 'bg-white text-black hover:bg-slate-200 shadow-md font-semibold'
            }`}
          >
            {isFollowing ? (
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-400" /> Following
              </span>
            ) : (
              'Follow'
            )}
          </button>
        </div>

        <p className="text-[11px] font-mono text-slate-500 mt-6 tracking-wide">
          Hover to inspect depth • Click Follow to test interaction
        </p>
      </div>

      <div className="w-full flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-slate-400 z-10">
        <button
          onClick={() => {
            playClickSound();
            setIsExpanded((prev) => !prev);
          }}
          className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1"
        >
          <AtSign className="w-3.5 h-3.5" />
          <span>{isExpanded ? 'Contract View' : 'Expand View'}</span>
        </button>
        <button
          onClick={handleCopy}
          className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied @f0undr' : 'Copy Handle'}</span>
        </button>
      </div>
    </div>
  );
};

export const WhiteSocialHandlePreview = () => {
  const [animKey, setAnimKey] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleReplay = () => {
    playClickSound();
    setAnimKey((prev) => prev + 1);
  };

  const handleCopy = () => {
    playClickSound();
    navigator.clipboard.writeText('@f0undr');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[380px] p-6 bg-gradient-to-b from-[#18181f] to-[#0c0c10] rounded-2xl border border-white/10 relative overflow-hidden select-none">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_70%)]" />

      <div className="w-full flex items-center justify-between z-10">
        <span className="text-[10px] font-mono tracking-wider text-slate-300 uppercase bg-white/10 border border-white/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-300" />
          Jitter Rebuild &bull; White Pill
        </span>
        <button
          onClick={handleReplay}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay</span>
        </button>
      </div>

      <div key={animKey} className="my-auto flex flex-col items-center justify-center z-10 w-full py-8">
        <div
          onMouseEnter={playHoverSound}
          className="group flex items-center gap-3.5 px-5 py-3.5 rounded-full bg-white text-black shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-slate-200 transition-all duration-500 ease-out hover:scale-105 hover:shadow-[0_25px_60px_rgba(255,255,255,0.18)]"
          style={{
            animation: 'f0undrEntry 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          <div className="w-10 h-10 rounded-full bg-black p-[2px] shrink-0 flex items-center justify-center shadow-inner">
            <InstagramIcon className="w-5 h-5 text-white" />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-tight text-black font-sans">f0undr</span>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-black text-white text-[8px] font-bold">
                ✓
              </span>
            </div>
            <span className="text-xs font-mono text-slate-600 font-medium">@f0undr</span>
          </div>

          <div className="h-6 w-px bg-slate-300 mx-1" />

          <button
            onClick={() => {
              playClickSound();
              setIsBookmarked((prev) => !prev);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-sans transition-all cursor-pointer shrink-0 ${
              isBookmarked
                ? 'bg-black text-white'
                : 'bg-slate-100 text-black hover:bg-slate-200 border border-slate-300'
            }`}
          >
            {isBookmarked ? 'Connected' : 'Connect'}
          </button>
        </div>

        <p className="text-[11px] font-mono text-slate-500 mt-6 tracking-wide">
          Pure crisp light contrast &bull; 60fps hardware accelerated
        </p>
      </div>

      <div className="w-full flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-slate-400 z-10">
        <span className="text-slate-400 flex items-center gap-1">
          <Play className="w-3.5 h-3.5 text-cyan-400" />
          <span>Active Micro-Interaction</span>
        </span>
        <button
          onClick={handleCopy}
          className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied @f0undr' : 'Copy Handle'}</span>
        </button>
      </div>
    </div>
  );
};

export const ProfileLivePreview = () => {
  const [viewers, setViewers] = useState(1428);
  const [likes, setLikes] = useState(89);
  const [isLive, setIsLive] = useState(true);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (!isLive) return;
    const interval = window.setInterval(() => {
      setViewers((prev) => prev + Math.floor(Math.random() * 7) - 3);
    }, 2800);
    return () => clearInterval(interval);
  }, [isLive]);

  const handleLike = () => {
    playClickSound();
    setLikes((prev) => prev + 1);
  };

  const handleToggleLive = () => {
    playClickSound();
    setIsLive((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[380px] p-6 bg-gradient-to-b from-[#110f17] to-[#08070c] rounded-2xl border border-white/10 relative overflow-hidden select-none">
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.18)_0%,transparent_70%)]" />

      <div className="w-full flex items-center justify-between z-10">
        <span className="text-[10px] font-mono tracking-wider text-rose-400 uppercase bg-rose-950/60 border border-rose-800/40 px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <Radio className="w-3 h-3 text-rose-400" />
          Jitter Rebuild &bull; Live Pulse
        </span>
        <button
          onClick={() => {
            playClickSound();
            setAnimKey((prev) => prev + 1);
          }}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay</span>
        </button>
      </div>

      <div key={animKey} className="my-auto flex flex-col items-center justify-center z-10 w-full py-6">
        <div
          onMouseEnter={playHoverSound}
          className="relative flex flex-col items-center p-6 rounded-3xl bg-black/80 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] w-full max-w-[320px]"
          style={{
            animation: 'f0undrEntry 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          <div className="relative mb-4">
            {isLive && (
              <>
                <span className="absolute -inset-2.5 rounded-full border-2 border-rose-500/40 animate-ping pointer-events-none" />
                <span className="absolute -inset-1 rounded-full border border-rose-500/60 animate-pulse pointer-events-none" />
              </>
            )}

            <div className="w-20 h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-rose-500 via-amber-400 to-cyan-400 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"
                alt="f0undr avatar"
                className="w-full h-full object-cover rounded-full bg-slate-900"
              />
            </div>

            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
              {isLive ? (
                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-red-600 text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono font-medium tracking-wider uppercase border border-white/10">
                  OFFLINE
                </span>
              )}
            </div>
          </div>

          <div className="text-center mt-1">
            <h4 className="text-base font-bold text-white tracking-tight flex items-center justify-center gap-1.5">
              <span>Muhammad Huzaifa Zahid</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                Founder
              </span>
            </h4>
            <p className="text-xs font-mono text-slate-400 mt-0.5">@f0undr</p>
          </div>

          <div className="w-full flex items-center justify-around mt-5 pt-4 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>{viewers.toLocaleString()}</span>
            </div>

            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 text-xs font-mono text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{likes}</span>
            </button>
          </div>
        </div>

        <p className="text-[11px] font-mono text-slate-500 mt-5 tracking-wide">
          Real-time radar emission &bull; Interactive heartbeat reaction
        </p>
      </div>

      <div className="w-full flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-slate-400 z-10">
        <button
          onClick={handleToggleLive}
          className="hover:text-rose-400 transition-colors cursor-pointer flex items-center gap-1"
        >
          <Radio className="w-3.5 h-3.5" />
          <span>{isLive ? 'Simulate Stream End' : 'Simulate Go Live'}</span>
        </button>
        <button
          onClick={handleLike}
          className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
        >
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>Send Reaction</span>
        </button>
      </div>
    </div>
  );
};
