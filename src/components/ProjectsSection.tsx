import { useState, useMemo } from 'react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types';
import { Search, ShieldCheck, Bot, FileText, Smartphone, Calculator, BookOpen, Brain, Boxes, Layers, ArrowUpRight, Monitor, Film } from 'lucide-react';
import { playClickSound, playHoverSound, playModalOpenSound } from '../utils/audio';

const GithubIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const YoutubeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection = ({ onSelectProject }: ProjectsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Systems' },
    { id: 'mobile', label: 'Native Android' },
    { id: 'systems', label: 'Desktop & OS' },
    { id: 'ai', label: 'Autonomous AI' },
    { id: 'tools', label: 'Sovereign Tools' },
    { id: 'education', label: 'Books & Curricula' },
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        activeCategory === 'all' || project.category === activeCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.techStack.some((ts) => ts.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const getProjectIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-cyan-300" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-emerald-300" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-purple-300" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-sky-300" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-amber-300" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-teal-300" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-rose-300" />;
      case 'Monitor':
        return <Monitor className="w-5 h-5 text-indigo-300" />;
      case 'Film':
        return <Film className="w-5 h-5 text-amber-300" />;
      case 'Youtube':
        return <YoutubeIcon className="w-5 h-5 text-red-400" />;
      default:
        return <Boxes className="w-5 h-5 text-slate-200" />;
    }
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                SOVEREIGN SOFTWARE ECOSYSTEM
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              Systems &amp; <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Digital Inventions</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl font-light leading-relaxed">
              Native Android apps, desktop utilities, sovereign encrypted vaults, autonomous AI agents, and interactive curricula engineered by the Founder Team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search systems, APKs, stacks..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={playHoverSound}
                className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-md shadow-white/10'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={playHoverSound}
              className="pro-card rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(400px circle at 50% 0%, ${project.accentColor}15, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {getProjectIcon(project.iconName)}
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-slate-300">
                      {project.status}
                    </span>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">
                      {project.metrics}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-heading font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5 flex items-center gap-1.5">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-300 font-medium mb-3 line-clamp-1">
                  {project.tagline}
                </p>

                <p className="text-xs text-slate-400 leading-relaxed font-light mb-5 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.04] text-[10px] font-mono text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-600">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2 relative z-10">
                <button
                  onClick={() => {
                    playModalOpenSound();
                    onSelectProject(project);
                  }}
                  onMouseEnter={playHoverSound}
                  className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Blueprint</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={playHoverSound}
                      onClick={playClickSound}
                      className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                      title="View Source on GitHub"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={playHoverSound}
                      onClick={playClickSound}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/12 border border-white/10 text-white text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <span>Launch</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
