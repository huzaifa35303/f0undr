import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Cpu, Terminal, Brain, BookOpen, Sparkles } from 'lucide-react';
import { playHoverSound } from '../utils/audio';

export const SkillsSection = () => {
  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'Brain':
        return <Brain className="w-5 h-5 text-cyan-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-indigo-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-mono text-cyan-400">
                <Cpu className="w-3.5 h-3.5" />
                TECHNICAL ARCHITECTURE &bull; FULL-STACK MASTERY
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
              Engineering <span className="text-gradient-cyan">Pillars</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl font-light leading-relaxed">
              Battle-tested proficiencies across native Android architectures (SDK 35), autonomous agent pipelines,
              cryptographic primitives, and sub-millisecond client-side applications.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, cIdx) => (
            <div
              key={cIdx}
              onMouseEnter={playHoverSound}
              className="glass-card rounded-2xl p-6 sm:p-8 hover:border-cyan-400/40 shadow-xl"
            >
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                  {getCategoryIcon(cat.icon)}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-white">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-light">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-200 font-medium">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-slate-300 border border-white/[0.06]">
                          {skill.tag}
                        </span>
                        <span className="text-cyan-400 font-bold text-[11px]">{skill.level}%</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-900 border border-white/[0.05] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
