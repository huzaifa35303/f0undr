import { TEAM_MEMBERS } from '../data/portfolioData';
import { ExternalLink, Award, Users, Shield, Cpu, Terminal, ArrowUpRight } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/audio';

export const TeamSection = () => {
  return (
    <section id="team" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-600/10 via-indigo-600/10 to-purple-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-mono text-cyan-400">
                <Users className="w-3.5 h-3.5" />
                EXECUTIVE COLLECTIVE &bull; LEADERSHIP ROSTER
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
              The <span className="text-gradient-cyan">f0undr Team</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl font-light leading-relaxed">
              Founded and directed by <strong className="text-white font-medium">Muhammad Huzaifa Zahid (Founder)</strong>.
              Unified executive leadership across autonomous software systems, operations, system architecture, and strategic scale.
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Roster: <strong className="text-white">04 Leadership Pillars</strong></span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              onMouseEnter={playHoverSound}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-cyan-400/40 relative overflow-hidden transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/02 border border-white/15 flex items-center justify-center font-mono font-black text-lg text-white shadow-md group-hover:scale-105 group-hover:border-cyan-400/50 transition-all">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    {member.isFounder && (
                      <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-cyan-400 text-slate-950 shadow-md" title="Founder & Principal">
                        <Award className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-emerald-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {member.status}
                    </span>
                    <div className="text-[11px] font-mono text-slate-400 mt-1.5 font-medium">
                      {member.handle}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-heading font-extrabold text-white leading-snug group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs text-cyan-400 font-mono font-medium mt-1">
                    {member.role}
                  </div>
                  {member.isFounder && (
                    <span className="inline-block px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/20 mt-2">
                      SOLE FOUNDER
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-[13px] text-slate-300 font-light leading-relaxed mb-4">
                  {member.bio}
                </p>

                {member.quote && (
                  <blockquote className="p-3 rounded-xl bg-white/[0.03] border-l-2 border-cyan-400 text-[11px] text-slate-300 italic mb-4">
                    "{member.quote}"
                  </blockquote>
                )}

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {member.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/05"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 line-clamp-1 flex-1 pr-2">
                  {member.highlightProject}
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  {member.social.website && (
                    <a
                      href={member.social.website}
                      target="_blank"
                      rel="noreferrer"
                      onClick={playClickSound}
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/10"
                      title="Curriculum & Works"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={playClickSound}
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/10"
                      title="GitHub Profile"
                    >
                      <Terminal className="w-3.5 h-3.5" />
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
