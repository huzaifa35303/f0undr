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
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0a0a0b] text-[#f4f1ea]">
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[300px] bg-cyan-600/8 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(244,241,234,0.14)] bg-[#111114] text-xs font-mono text-cyan-400">
                <Cpu className="w-3.5 h-3.5" />
                TECHNICAL ARCHITECTURE &bull; FULL-STACK MASTERY
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#f4f1ea] tracking-[-0.04em]">
              Engineering <span className="text-cyan-300">Pillars</span>
            </h2>
            <p className="text-[#8d8b86] text-sm sm:text-base mt-3 max-w-2xl font-light leading-relaxed">
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
              className="rounded-3xl p-6 sm:p-8 bg-[#111114] border border-[rgba(244,241,234,0.12)] hover:border-cyan-400/50 hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.22)] hover:-translate-y-2 transition-all duration-300 shadow-xl"
            >
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)] flex items-center justify-center">
                  {getCategoryIcon(cat.icon)}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-normal text-[#f4f1ea] tracking-[-0.02em]">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#8d8b86] font-light">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#f4f1ea] font-medium">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#0a0a0b] text-[10px] text-[#8d8b86] border border-[rgba(244,241,234,0.08)]">
                          {skill.tag}
                        </span>
                        <span className="text-cyan-400 font-bold">{skill.level}%</span>
                      </div>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-[#0a0a0b] border border-[rgba(244,241,234,0.06)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-1000 ease-out"
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
