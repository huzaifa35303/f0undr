import { useState } from 'react';
import type { TeamMember } from '../types';
import { Mail, CheckCircle2, Search, Award, ArrowUpRight, X } from 'lucide-react';

interface TeamSectionProps {
  team: TeamMember[];
}

const TwitterIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const GithubIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedinIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.91 0-1.64.73-1.64 1.64s.73 1.64 1.64 1.64 1.64-.73 1.64-1.64-.73-1.64-1.64-1.64z"/>
  </svg>
);

export const TeamSection = ({ team }: TeamSectionProps) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const departments = ['All', 'Core Leadership', 'Product & Pedagogy', 'Artificial Intelligence', 'Cloud Infrastructure', 'Product Design', 'Security & Privacy', 'Growth & Ventures'];

  const filteredTeam = team.filter((member) => {
    const matchesDept = selectedDepartment === 'All' || member.department === selectedDepartment;
    const matchesQuery =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesQuery;
  });

  const getStatusBadge = (status: TeamMember['status']) => {
    switch (status) {
      case 'Building':
        return {
          bg: 'bg-[#f0fdf4] text-[#166534] border-[#dcfce7]',
          dot: 'bg-[#166534]',
        };
      case 'Deep Work':
        return {
          bg: 'bg-[#fff7ed] text-[#c2410c] border-[#ffedd5]',
          dot: 'bg-[#c2410c]',
        };
      case 'Available':
        return {
          bg: 'bg-[#f5f2eb] text-[#44403c] border-[#e7e5e4]',
          dot: 'bg-[#44403c]',
        };
      default:
        return {
          bg: 'bg-[#f5f2eb] text-[#78716c] border-[#e7e5e4]',
          dot: 'bg-[#78716c]',
        };
    }
  };

  return (
    <section className="py-20 border-t border-[#e7e5e4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="editorial-stamp">
                Core Collective · 08 Members
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#1c1917]">
              The <em className="italic text-[#c2410c] font-normal">f0undr</em> Team
            </h2>
            <p className="text-[#57534e] text-sm sm:text-base mt-3 max-w-2xl leading-relaxed font-normal">
              Pioneering curriculum architectures, neural frameworks, and distributed software systems.
              Led by <strong className="text-[#1c1917]">Abdull Rehman Khizar</strong>, <strong className="text-[#1c1917]">f0undr</strong>, and <strong className="text-[#1c1917]">M.Huzaifa</strong>.
            </p>
          </div>
        </div>

        {/* Filter & Department Tabs Row */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#78716c] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fellows by name, role, or technical expertise..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e7e5e4] rounded-xl text-xs sm:text-sm text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#1c1917] shadow-2xs transition-colors"
              />
            </div>

            <div className="text-xs font-mono text-[#78716c]">
              Showing <span className="text-[#1c1917] font-semibold">{filteredTeam.length}</span> of {team.length} fellows
            </div>
          </div>

          {/* Department Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-mono text-[11px] ${
                  selectedDepartment === dept
                    ? 'bg-[#1c1917] text-[#faf8f5] font-medium shadow-xs'
                    : 'bg-white hover:bg-[#f5f2eb] text-[#57534e] hover:text-[#1c1917] border border-[#e7e5e4]'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTeam.map((member) => {
            const badge = getStatusBadge(member.status);
            return (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="editorial-card editorial-card-hover rounded-2xl p-6 relative flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Top Avatar & Status */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="relative">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className={`w-16 h-16 rounded-2xl object-cover border-2 shadow-xs transition-transform group-hover:scale-102 ${
                          member.verifiedFounder
                            ? 'border-[#c2410c]'
                            : 'border-[#e7e5e4]'
                        }`}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            member.name
                          )}&background=1c1917&color=faf8f5&bold=true`;
                        }}
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white border border-[#e7e5e4] flex items-center justify-center">
                        <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-medium border ${badge.bg}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        {member.status}
                      </span>

                      {member.verifiedFounder && (
                        <span className="editorial-stamp editorial-stamp-terracotta text-[10px]">
                          Co-Founder
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="text-lg font-serif font-bold text-[#1c1917] group-hover:text-[#c2410c] transition-colors">
                      {member.name}
                    </h3>
                    {member.verifiedFounder && (
                      <CheckCircle2 className="w-4 h-4 text-[#c2410c] shrink-0" />
                    )}
                  </div>

                  <div className="text-xs font-mono text-[#78716c] mb-1">{member.handle}</div>
                  <div className="text-xs font-medium text-[#1c1917] mb-3">{member.role}</div>

                  {/* Department pill */}
                  {member.department && (
                    <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#f5f2eb] text-[#57534e] border border-[#e7e5e4] mb-3">
                      {member.department}
                    </span>
                  )}

                  {/* Bio */}
                  <p className="text-xs text-[#57534e] leading-relaxed line-clamp-3 mb-4">
                    {member.bio}
                  </p>

                  {/* Highlight Project */}
                  {member.highlightProject && (
                    <div className="mb-4 p-2.5 rounded-xl bg-[#f5f2eb] border border-[#e7e5e4] text-[11px]">
                      <span className="text-[#78716c] text-[10px] uppercase font-mono block">Signature Project</span>
                      <span className="font-semibold text-[#1c1917] flex items-center gap-1.5 mt-0.5 truncate">
                        <Award className="w-3.5 h-3.5 text-[#c2410c] shrink-0" />
                        {member.highlightProject}
                      </span>
                    </div>
                  )}

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {member.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#f5f2eb] text-[#57534e] border border-[#e7e5e4]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Social Icons & Dossier Trigger */}
                <div
                  className="pt-4 border-t border-[#e7e5e4] flex items-center justify-between"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1.5">
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-[#78716c] hover:text-[#1c1917] hover:bg-[#f5f2eb] rounded-lg transition-colors"
                      >
                        <TwitterIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-[#78716c] hover:text-[#1c1917] hover:bg-[#f5f2eb] rounded-lg transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-[#78716c] hover:text-[#1c1917] hover:bg-[#f5f2eb] rounded-lg transition-colors"
                      >
                        <LinkedinIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="p-1.5 text-[#78716c] hover:text-[#1c1917] hover:bg-[#f5f2eb] rounded-lg transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedMember(member)}
                    className="text-[11px] font-mono text-[#c2410c] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Dossier</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Member Full Dossier Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div
            className="editorial-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#78716c] hover:text-[#1c1917] hover:bg-[#f5f2eb] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
              <img
                src={selectedMember.avatarUrl}
                alt={selectedMember.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#e7e5e4] shadow-xs"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-2xl font-serif font-bold text-[#1c1917]">
                    {selectedMember.name}
                  </h3>
                  {selectedMember.verifiedFounder && (
                    <span className="editorial-stamp editorial-stamp-terracotta text-xs">
                      Co-Founder
                    </span>
                  )}
                </div>
                <div className="text-xs font-mono text-[#c2410c] mb-1">
                  {selectedMember.handle} · {selectedMember.role}
                </div>
                <div className="text-xs font-mono text-[#78716c]">
                  Department: {selectedMember.department || 'Core Collective'}
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="p-4 rounded-xl bg-[#f5f2eb] border border-[#e7e5e4] text-xs italic text-[#57534e] mb-6">
              "{selectedMember.quote}"
            </div>

            {/* Bio */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-mono uppercase text-[#1c1917] font-bold tracking-wider">
                Biography &amp; Architecture Focus
              </h4>
              <p className="text-sm text-[#57534e] leading-relaxed">
                {selectedMember.bio}
              </p>
            </div>

            {/* Highlight */}
            {selectedMember.highlightProject && (
              <div className="mb-6 p-4 rounded-xl bg-[#f5f2eb] border border-[#e7e5e4]">
                <span className="text-xs font-mono text-[#78716c] uppercase block mb-1">Signature Project</span>
                <span className="text-sm font-semibold text-[#1c1917] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#c2410c]" />
                  {selectedMember.highlightProject}
                </span>
              </div>
            )}

            {/* Skills */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase text-[#1c1917] font-bold tracking-wider mb-2.5">
                Technical Mastery &amp; Systems Competencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedMember.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-[#f5f2eb] text-[#57534e] border border-[#e7e5e4]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action / Contact */}
            <div className="pt-6 border-t border-[#e7e5e4] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {selectedMember.social.website && (
                  <a
                    href={selectedMember.social.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-[#c2410c] hover:underline flex items-center gap-1"
                  >
                    <span>Curriculum Work</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
                {selectedMember.social.github && (
                  <a
                    href={selectedMember.social.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-[#78716c] hover:text-[#1c1917]"
                  >
                    GitHub
                  </a>
                )}
              </div>

              {selectedMember.social.email && (
                <a
                  href={`mailto:${selectedMember.social.email}`}
                  className="px-4 py-2 rounded-xl btn-editorial-primary text-xs font-semibold shadow-xs flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Direct Dispatch</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
