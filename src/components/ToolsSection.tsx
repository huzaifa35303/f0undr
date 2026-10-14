import { useState } from 'react';
import type { CuratedTool, ToolCategory } from '../types';
import { Wrench, Search, Sparkles, Timer, Edit3, Lightbulb, DollarSign, ArrowUpRight } from 'lucide-react';

import { PomodoroTimer } from './tools/PomodoroTimer';
import { MarkdownScratchpad } from './tools/MarkdownScratchpad';
import { StartupIdeaValidator } from './tools/StartupIdeaValidator';
import { SaaSEconomicsCalculator } from './tools/SaaSEconomicsCalculator';

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
    <section className="py-20 border-t border-[#e7e5e4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="editorial-stamp">
                Utility Engines &amp; Software Arsenal
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#1c1917]">
              The Founder <em className="italic text-[#c2410c] font-normal">Arsenal &amp; Tools</em>
            </h2>
            <p className="text-[#57534e] text-sm sm:text-base mt-3 max-w-2xl leading-relaxed font-normal">
              Real-time productivity engines and curated software leverage for high-velocity venture builders and engineers.
            </p>
          </div>
        </div>

        {/* Master Subtabs Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-[#f5f2eb] border border-[#e7e5e4] rounded-xl w-fit mb-10">
          <button
            onClick={() => setActiveMode('interactive')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeMode === 'interactive'
                ? 'bg-[#1c1917] text-[#faf8f5] shadow-xs'
                : 'text-[#57534e] hover:text-[#1c1917]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#c2410c]" />
            <span>Interactive Engines (Built-in)</span>
          </button>

          <button
            onClick={() => setActiveMode('directory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeMode === 'directory'
                ? 'bg-[#1c1917] text-[#faf8f5] shadow-xs'
                : 'text-[#57534e] hover:text-[#1c1917]'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Curated Directory ({tools.length})</span>
          </button>
        </div>

        {/* MODE 1: Interactive Utilities */}
        {activeMode === 'interactive' && (
          <div className="space-y-8 animate-fade-in">
            {/* Utility Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setActiveUtility('pomodoro')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeUtility === 'pomodoro'
                    ? 'bg-[#1c1917] text-[#faf8f5] shadow-xs'
                    : 'bg-white text-[#57534e] hover:text-[#1c1917] border border-[#e7e5e4]'
                }`}
              >
                <Timer className="w-3.5 h-3.5 text-[#c2410c]" />
                <span>Deep Work Focus Timer</span>
              </button>

              <button
                onClick={() => setActiveUtility('scratchpad')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeUtility === 'scratchpad'
                    ? 'bg-[#1c1917] text-[#faf8f5] shadow-xs'
                    : 'bg-white text-[#57534e] hover:text-[#1c1917] border border-[#e7e5e4]'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 text-[#2b5346]" />
                <span>Founder Markdown Scratchpad</span>
              </button>

              <button
                onClick={() => setActiveUtility('validator')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeUtility === 'validator'
                    ? 'bg-[#1c1917] text-[#faf8f5] shadow-xs'
                    : 'bg-white text-[#57534e] hover:text-[#1c1917] border border-[#e7e5e4]'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>Venture Viability Matrix</span>
              </button>

              <button
                onClick={() => setActiveUtility('economics')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeUtility === 'economics'
                    ? 'bg-[#1c1917] text-[#faf8f5] shadow-xs'
                    : 'bg-white text-[#57534e] hover:text-[#1c1917] border border-[#e7e5e4]'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-[#2b5346]" />
                <span>SaaS &amp; Unit Economics Forecaster</span>
              </button>
            </div>

            {/* Active Utility Card Body */}
            <div className="editorial-card rounded-2xl p-6 sm:p-10 border border-[#e7e5e4] relative">
              {activeUtility === 'pomodoro' && <PomodoroTimer />}
              {activeUtility === 'scratchpad' && <MarkdownScratchpad />}
              {activeUtility === 'validator' && <StartupIdeaValidator />}
              {activeUtility === 'economics' && <SaaSEconomicsCalculator />}
            </div>
          </div>
        )}

        {/* MODE 2: Curated Tools Directory */}
        {activeMode === 'directory' && (
          <div className="space-y-8 animate-fade-in">
            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#78716c] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools, AI frameworks, or stacks..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e7e5e4] rounded-xl text-xs sm:text-sm text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#1c1917] shadow-2xs transition-colors"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-mono text-[11px] ${
                      selectedCategory === cat
                        ? 'bg-[#1c1917] text-[#faf8f5] font-medium shadow-xs'
                        : 'bg-white hover:bg-[#f5f2eb] text-[#57534e] hover:text-[#1c1917] border border-[#e7e5e4]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  className="editorial-card editorial-card-hover rounded-2xl p-6 relative flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-[#f5f2eb] text-[#78716c] border border-[#e7e5e4]">
                        {tool.category}
                      </span>
                      {tool.pricing && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#fff7ed] text-[#c2410c] border border-[#ffedd5]">
                          {tool.pricing}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xl font-serif font-bold text-[#1c1917] group-hover:text-[#c2410c] transition-colors mb-1">
                      {tool.name}
                    </h4>
                    <p className="text-xs font-mono text-[#c2410c] mb-3">
                      {tool.tagline}
                    </p>
                    <p className="text-xs text-[#57534e] leading-relaxed mb-6">
                      {tool.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#f5f2eb] text-[#57534e] border border-[#e7e5e4]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#e7e5e4] flex items-center justify-between">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1c1917] hover:text-[#c2410c] hover:underline"
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
