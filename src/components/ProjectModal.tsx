import { X, CheckCircle2, ArrowUpRight } from 'lucide-react';
import type { Project } from '../types';
import { playClickSound, playHoverSound } from '../utils/audio';

const GithubIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div
        className="fixed inset-0 bg-[#08090d]/85 backdrop-blur-md transition-opacity"
        onClick={() => {
          playClickSound();
          onClose();
        }}
      />

      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#0d1017] border border-white/15 rounded-3xl shadow-2xl z-10 text-left">
        <div className="p-6 sm:p-8 border-b border-white/10 relative">
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            onMouseEnter={playHoverSound}
            className="absolute top-6 right-6 p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono text-[10px] uppercase">
              {project.status}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 font-mono text-[10px]">
              {project.metrics}
            </span>
          </div>

          <h3 className="text-2xl font-heading font-bold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
            {project.tagline}
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Architectural Overview
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              {project.fullOverview || project.description}
            </p>
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Key Engineered Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-slate-500">•</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Production Tech Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-black font-semibold text-xs transition-all shadow-sm"
                >
                  <span>Launch Live Deployment</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium hover:bg-white/10 transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Inspect Source</span>
                </a>
              )}
            </div>

            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="text-xs text-slate-400 hover:text-white px-3 py-1.5 transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
