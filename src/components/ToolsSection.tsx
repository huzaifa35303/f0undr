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
    <section id="tools" className="py-24 relative overflow-hidden bg-[#0a0a0b] text-[#f4f1ea]">
      <div className="absolute top-1/2 right-10 w-[600px] h-[300px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(244,241,234,0.14)] bg-[#111114] text-xs font-mono text-cyan-400">
                <Wrench className="w-3.5 h-3.5" />
                UTILITY ENGINES &bull; INTERACTIVE SOFTWARE ARSENAL
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#f4f1ea] tracking-[-0.04em]">
              f0undr <span className="text-cyan-300">Arsenal &amp; Tools</span>
            </h2>
            <p className="text-[#8d8b86] text-sm sm:text-base mt-3 max-w-2xl leading-relaxed font-light">
              Real-time in-browser productivity engines, financial modeling tools, and curated software leverage for venture builders.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-full border border-[rgba(244,241,234,0.12)] bg-[#111114] w-fit mb-10">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveMode('interactive');
            }}
            onMouseEnter={playHoverSound}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeMode === 'interactive'
                ? 'bg-[#f4f1ea] text-[#0a0a0b] shadow-md'
                : 'text-[#8d8b86] hover:text-[#f4f1ea]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span>Interactive Engines</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveMode('directory');
            }}
            onMouseEnter={playHoverSound}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeMode === 'directory'
                ? 'bg-[#f4f1ea] text-[#0a0a0b] shadow-md'
                : 'text-[#8d8b86] hover:text-[#f4f1ea]'
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
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveUtility('pomodoro');
                }}
                onMouseEnter={playHoverSound}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeUtility === 'pomodoro'
                    ? 'bg-[#f4f1ea] text-[#0a0a0b] shadow-md'
                    : 'border border-[rgba(244,241,234,0.12)] bg-[#111114] text-[#8d8b86] hover:text-[#f4f1ea]'
                }`}
              >
                <Timer className="w-3.5 h-3.5 text-cyan-400" />
                <span>Deep Work Focus Timer</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveUtility('scratchpad');
                }}
                onMouseEnter={playHoverSound}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeUtility === 'scratchpad'
                    ? 'bg-[#f4f1ea] text-[#0a0a0b] shadow-md'
                    : 'border border-[rgba(244,241,234,0.12)] bg-[#111114] text-[#8d8b86] hover:text-[#f4f1ea]'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                <span>f0undr Markdown Scratchpad</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveUtility('validator');
                }}
                onMouseEnter={playHoverSound}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeUtility === 'validator'
                    ? 'bg-[#f4f1ea] text-[#0a0a0b] shadow-md'
                    : 'border border-[rgba(244,241,234,0.12)] bg-[#111114] text-[#8d8b86] hover:text-[#f4f1ea]'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Venture Viability Matrix</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveUtility('economics');
                }}
                onMouseEnter={playHoverSound}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeUtility === 'economics'
                    ? 'bg-[#f4f1ea] text-[#0a0a0b] shadow-md'
                    : 'border border-[rgba(244,241,234,0.12)] bg-[#111114] text-[#8d8b86] hover:text-[#f4f1ea]'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                <span>SaaS &amp; Unit Economics Forecaster</span>
              </button>
            </div>

            <div className="rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden bg-[#111114] border border-[rgba(244,241,234,0.12)]">
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
                <Search className="w-4 h-4 text-[#8d8b86] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools, AI frameworks, or stacks..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#111114] border border-[rgba(244,241,234,0.12)] text-xs sm:text-sm text-[#f4f1ea] placeholder-[#8d8b86] focus:outline-none focus:border-cyan-400/50 font-mono"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar text-xs">
                {CATEGORIES.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => {
                      playClickSound();
                      setSelectedCategory(cat);
                    }}
                    className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all font-mono text-[11px] cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#f4f1ea] text-[#0a0a0b] font-bold shadow-sm'
                        : 'border border-[rgba(244,241,234,0.12)] bg-[#111114] text-[#8d8b86] hover:text-[#f4f1ea]'
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
                  className="rounded-3xl p-6 relative flex flex-col justify-between group bg-[#111114] border border-[rgba(244,241,234,0.12)] hover:border-cyan-400/50 hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.22)] hover:-translate-y-2 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-[#0a0a0b] text-[#8d8b86] border border-[rgba(244,241,234,0.08)]">
                        {tool.category}
                      </span>
                      {tool.pricing && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                          {tool.pricing}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xl font-normal text-[#f4f1ea] group-hover:text-cyan-300 transition-colors mb-1 tracking-[-0.02em]">
                      {tool.name}
                    </h4>
                    <p className="text-xs font-mono text-cyan-400 mb-3">
                      {tool.tagline}
                    </p>
                    <p className="text-xs text-[#8d8b86] leading-relaxed mb-6 font-light">
                      {tool.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#0a0a0b] text-[#8d8b86] border border-[rgba(244,241,234,0.06)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[rgba(244,241,234,0.08)] flex items-center justify-between">
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
