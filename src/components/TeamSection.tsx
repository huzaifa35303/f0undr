import { TEAM_MEMBERS } from '../data/portfolioData';
import { ExternalLink, Award, Users } from 'lucide-react';
import { playHoverSound } from '../utils/audio';

export const TeamSection = () => {
  return (
    <section id="team" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                EXECUTIVE COLLECTIVE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              The <span className="text-white">f0undr</span> Team
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl font-light leading-relaxed">
              Founded and directed by <strong className="text-white font-medium">Muhammad Huzaifa Zahid (f0undr)</strong>.
              Unified executive leadership across autonomous software systems, operations, and strategic scale.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-slate-400">
              Executive Roster: <strong className="text-white">04 Leadership Pillars</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              onMouseEnter={playHoverSound}
              className="pro-card rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center font-mono font-bold text-base text-white shadow-xs">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    {member.isFounder && (
                      <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white text-black shadow-xs" title="Founder">
                        <Award className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-slate-300">
                      ● {member.status}
                    </span>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">
                      {member.handle}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-heading font-bold text-white leading-snug">
                      {member.name}
                    </h3>
                  </div>
                  <div className="text-xs text-slate-200 font-semibold mt-1">
                    {member.role}
                  </div>
                  {member.isFounder && (
                    <span className="inline-block px-1.5 py-0.2 rounded bg-white/10 text-white text-[9px] font-mono font-semibold border border-white/10 mt-1">
                      SOLE FOUNDER
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-light mb-4 line-clamp-3">
                  {member.bio}
                </p>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-4 text-[11px] text-slate-300 italic font-serif">
                  "{member.quote}"
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {member.skills.slice(0, 3).map((skill, skIdx) => (
                    <span
                      key={skIdx}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.04] text-[10px] font-mono text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-white/[0.04] text-[10px] font-mono text-slate-400">
                      +{member.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <div className="text-[11px] font-mono text-slate-400 truncate max-w-[180px]">
                  <span className="text-slate-600 mr-1">Lead:</span>
                  <span className="text-slate-300">{member.highlightProject}</span>
                </div>

                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hairline-divider mt-24" />
    </section>
  );
};
