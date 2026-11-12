import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Cpu, Terminal, Brain, BookOpen, Sparkles } from 'lucide-react';
import { playHoverSound } from '../utils/audio';

export const SkillsSection = () => {
  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'Brain':
        return <Brain className="w-5 h-5 text-slate-200" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-slate-200" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-slate-200" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-slate-200" />;
      default:
        return <Sparkles className="w-5 h-5 text-slate-200" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-slate-400" />
                TECHNICAL ARCHITECTURE &amp; MASTERY
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              Engineering <span className="text-white">Pillars</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl font-light leading-relaxed">
              Battle-tested proficiencies across native Android architectures (f0undr Themes APK), autonomous agent pipelines,
              cryptographic primitives, and sub-millisecond client-side applications.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, cIdx) => (
            <div
              key={cIdx}
              onMouseEnter={playHoverSound}
              className="pro-card rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                  {getCategoryIcon(cat.icon)}
                </div>
                <div>
                  <h3 className="text-base font-heading font-bold text-white">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 mt-6">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-200 font-medium">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.2 rounded bg-white/[0.04] text-[10px] text-slate-300 border border-white/[0.06]">
                          {skill.tag}
                        </span>
                        <span className="text-slate-400 text-[11px]">{skill.level}%</span>
                      </div>
                    </div>
                    <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-white transition-all duration-700"
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

      <div className="hairline-divider mt-24" />
    </section>
  );
};
