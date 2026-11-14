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
    { id: 'all', label: 'All Work' },
    { id: 'others', label: 'Web Portals & Platforms' },
    { id: 'mobile', label: 'Native Android APK' },
    { id: 'systems', label: 'Games & Systems' },
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
        return <Boxes className="w-5 h-5 text-[#f4f1ea]" />;
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-500/8 via-indigo-500/8 to-emerald-500/8 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(244,241,234,0.14)] bg-[#111114] text-xs font-mono text-cyan-400">
                <Layers className="w-3.5 h-3.5" />
                SOVEREIGN SOFTWARE PORTFOLIO
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#f4f1ea] tracking-[-0.04em]">
              Featured <span className="text-cyan-300">Work &amp; Systems</span>
            </h2>
            <p className="text-[#8d8b86] text-sm sm:text-base mt-3 max-w-2xl font-light leading-relaxed">
              Flagship engineering deployments developed across the f0undr Team: native Android architectures, sovereign cryptographic file vaults, autonomous AI engines, web platforms, and independent study labs.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8d8b86] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search work, tech, webs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[rgba(244,241,234,0.14)] bg-[#111114] text-xs sm:text-sm text-[#f4f1ea] placeholder-[#8d8b86] focus:outline-none focus:border-cyan-400/60 transition-all font-mono"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={playHoverSound}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#f4f1ea] text-[#0a0a0b] font-semibold shadow-md'
                    : 'border border-[rgba(244,241,234,0.12)] bg-[#111114] text-[#8d8b86] hover:text-[#f4f1ea] hover:border-[rgba(244,241,234,0.3)]'
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
              className="rounded-3xl p-6 flex flex-col justify-between group bg-[#111114] border border-[rgba(244,241,234,0.12)] hover:border-cyan-400/50 hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.22)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)] flex items-center justify-center group-hover:border-cyan-400/50 group-hover:scale-105 transition-all">
                    {getProjectIcon(project.iconName)}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#0a0a0b] text-[#8d8b86] border border-[rgba(244,241,234,0.12)]">
                    {project.metrics}
                  </span>
                </div>

                <h3 className="text-lg font-normal text-[#f4f1ea] group-hover:text-cyan-300 transition-colors mb-2 tracking-[-0.02em]">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#8d8b86] font-light leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#0a0a0b] text-[#8d8b86] border border-[rgba(244,241,234,0.08)]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#0a0a0b] text-[#8d8b86]/60">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(244,241,234,0.08)] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    playModalOpenSound();
                    onSelectProject(project);
                  }}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Architecture Spec</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-xl bg-[#0a0a0b] hover:bg-white/10 text-[#8d8b86] hover:text-[#f4f1ea] transition-all border border-[rgba(244,241,234,0.12)]"
                      title="Launch Live Application"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-xl bg-[#0a0a0b] hover:bg-white/10 text-[#8d8b86] hover:text-[#f4f1ea] transition-all border border-[rgba(244,241,234,0.12)]"
                      title="GitHub Source"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
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
