import { useState } from 'react';
import type { CuratedTool, ToolCategory } from '../types';
import { Wrench, Search, Sparkles, Timer, Edit3, Lightbulb, DollarSign, ArrowUpRight } from 'lucide-react';

import { PomodoroTimer } from './tools/PomodoroTimer';
import { MarkdownScratchpad } from './tools/MarkdownScratchpad';
import { StartupIdeaValidator } from './tools/StartupIdeaValidator';
import { SaaSEconomicsCalculator } from './tools/SaaSEconomicsCalculator';
import { playClickSound, playHoverSound } from '../utils/audio';

interface ToolsSectionProps {
  tools: CuratedTool[];
}

const CATEGORIES: ('All' | ToolCategory)[] = [
  'All',
  'AI & LLMs',
  'Development',
  'Design & UI',
  'Productivity',
  'Analytics & Growth',
];

type UtilityTab = 'pomodoro' | 'scratchpad' | 'validator' | 'economics';

export const ToolsSection: React.FC<ToolsSectionProps> = ({
  tools,
}) => {
  const [activeMode, setActiveMode] = useState<'interactive' | 'directory'>('interactive');
  const [activeUtility, setActiveUtility] = useState<UtilityTab>('pomodoro');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ToolCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTools = tools.filter((tool) => {
    const matchesCat = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section id="tools" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-10 w-[600px] h-[300px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-mono text-cyan-400">
                <Wrench className="w-3.5 h-3.5" />
                UTILITY ENGINES &bull; INTERACTIVE SOFTWARE ARSENAL
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
              Founder <span className="text-gradient-cyan">Arsenal &amp; Tools</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed font-light">
              Real-time in-browser productivity engines, financial modeling tools, and curated software leverage for venture builders.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 glass-card rounded-2xl w-fit mb-10">
          <button
            onClick={() => {
              playClickSound();
              setActiveMode('interactive');
            }}
            onMouseEnter={playHoverSound}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeMode === 'interactive'
                ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-white border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Interactive Engines</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveMode('directory');
            }}
            onMouseEnter={playHoverSound}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeMode === 'directory'
                ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-white border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Curated Directory ({tools.length})</span>
          </button>
        </div>

        {activeMode === 'interactive' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              <button
                onClick={() => {
                  playClickSound();
                  setActiveUtility('pomodoro');
                }}
                onMouseEnter={playHoverSound}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeUtility === 'pomodoro'
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'glass-pill text-slate-300 hover:text-white'
                }`}
              >
                <Timer className="w-3.5 h-3.5 text-cyan-400" />
                <span>Deep Work Focus Timer</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setActiveUtility('scratchpad');
                }}
                onMouseEnter={playHoverSound}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeUtility === 'scratchpad'
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'glass-pill text-slate-300 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Founder Markdown Scratchpad</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setActiveUtility('validator');
                }}
                onMouseEnter={playHoverSound}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeUtility === 'validator'
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'glass-pill text-slate-300 hover:text-white'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Venture Viability Matrix</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setActiveUtility('economics');
                }}
                onMouseEnter={playHoverSound}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeUtility === 'economics'
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'glass-pill text-slate-300 hover:text-white'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                <span>SaaS &amp; Unit Economics Forecaster</span>
              </button>
            </div>

            <div className="glass-card-interactive rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              {activeUtility === 'pomodoro' && <PomodoroTimer />}
              {activeUtility === 'scratchpad' && <MarkdownScratchpad />}
              {activeUtility === 'validator' && <StartupIdeaValidator />}
              {activeUtility === 'economics' && <SaaSEconomicsCalculator />}
            </div>
          </div>
        )}

        {activeMode === 'directory' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools, AI frameworks, or stacks..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-card text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 font-mono"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar text-xs">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      playClickSound();
                      setSelectedCategory(cat);
                    }}
                    className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all font-mono text-[11px] cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold'
                        : 'glass-pill text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  className="glass-card rounded-2xl p-6 relative flex flex-col justify-between group hover:border-cyan-400/40 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                        {tool.category}
                      </span>
                      {tool.pricing && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                          {tool.pricing}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xl font-heading font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                      {tool.name}
                    </h4>
                    <p className="text-xs font-mono text-cyan-400 mb-3">
                      {tool.tagline}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6 font-light">
                      {tool.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={playClickSound}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                    >
                      <span>Launch Tool</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
