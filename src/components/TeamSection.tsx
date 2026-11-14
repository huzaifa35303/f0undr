import React, { useState } from 'react';
import type { TeamMember } from '../types';
import { TEAM_MEMBERS } from '../data/portfolioData';
import { ArrowUpRight, Award, Users, Shield, Cpu, Terminal, Sparkles, Activity, Layers, Code2 } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/audio';

interface TeamSectionProps {
  team?: TeamMember[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ team = TEAM_MEMBERS }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
    setHoveredCard(id);
  };

  const getMemberConfig = (member: TeamMember, index: number) => {
    const isFounder = member.name.toLowerCase().includes('huzaifa') || member.id === 'founder-huzaifa' || member.id === 'team-huzaifa';
    if (isFounder) {
      return {
        badge: 'SOLE FOUNDER',
        badgeColor: 'from-amber-400/20 via-cyan-400/20 to-indigo-500/20 text-cyan-300 border-cyan-400/40',
        ringGradient: 'from-cyan-400 via-amber-400 to-indigo-500',
        glowColor: 'rgba(6, 182, 212, 0.25)',
        accentColor: '#06b6d4',
        codeBadge: 'F0-ARCH // 00',
        clearance: 'LEVEL 0 // PRINCIPAL FOUNDER',
        icon: Award,
        nodeId: 'NODE // 01',
      };
    }

    if (member.name.toLowerCase().includes('rehman')) {
      return {
        badge: 'HEAD OF SYSTEMS',
        badgeColor: 'from-cyan-500/20 to-blue-600/20 text-cyan-300 border-cyan-500/30',
        ringGradient: 'from-cyan-400 via-sky-500 to-blue-600',
        glowColor: 'rgba(14, 165, 233, 0.2)',
        accentColor: '#38bdf8',
        codeBadge: 'SYS-OPS // 01',
        clearance: 'LEVEL 1 // SYSTEMS LEAD',
        icon: Cpu,
        nodeId: 'NODE // 02',
      };
    }

    if (member.name.toLowerCase().includes('ammar')) {
      return {
        badge: 'CHIEF OF STAFF',
        badgeColor: 'from-emerald-500/20 to-teal-600/20 text-emerald-300 border-emerald-500/30',
        ringGradient: 'from-emerald-400 via-teal-500 to-cyan-500',
        glowColor: 'rgba(16, 185, 129, 0.2)',
        accentColor: '#10b981',
        codeBadge: 'COS-EXEC // 02',
        clearance: 'LEVEL 1 // OPERATIONS GOVERNANCE',
        icon: Shield,
        nodeId: 'NODE // 03',
      };
    }

    if (member.name.toLowerCase().includes('ayan')) {
      return {
        badge: 'DEPUTY HEAD & PLATFORM ARCHITECT',
        badgeColor: 'from-indigo-500/20 to-purple-600/20 text-indigo-300 border-indigo-500/30',
        ringGradient: 'from-indigo-400 via-purple-500 to-pink-500',
        glowColor: 'rgba(99, 102, 241, 0.2)',
        accentColor: '#818cf8',
        codeBadge: 'PLAT-ARC // 03',
        clearance: 'LEVEL 1 // DEPUTY HEAD',
        icon: Layers,
        nodeId: 'NODE // 04',
      };
    }

    if (member.name.toLowerCase().includes('kabir')) {
      return {
        badge: 'MANAGER',
        badgeColor: 'from-amber-500/20 to-orange-600/20 text-amber-300 border-amber-500/30',
        ringGradient: 'from-amber-400 via-orange-500 to-yellow-500',
        glowColor: 'rgba(245, 158, 11, 0.2)',
        accentColor: '#f59e0b',
        codeBadge: 'MGR-OPS // 04',
        clearance: 'LEVEL 1 // MANAGEMENT & OPERATIONS',
        icon: Terminal,
        nodeId: 'NODE // 05',
      };
    }

    return {
      badge: 'CORE FELLOW',
      badgeColor: 'from-slate-500/20 to-zinc-600/20 text-slate-300 border-slate-500/30',
      ringGradient: 'from-slate-400 via-zinc-500 to-neutral-600',
      glowColor: 'rgba(148, 163, 184, 0.2)',
      accentColor: '#94a3b8',
      codeBadge: `FELLOW // 0${index + 1}`,
      clearance: 'LEVEL 2 // FELLOWSHIP',
      icon: Layers,
      nodeId: `NODE // 0${index + 1}`,
    };
  };

  return (
    <section id="team" className="py-28 relative bg-[#0a0a0b] border-t border-[rgba(244,241,234,0.08)] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-cyan-500/05 via-emerald-500/05 to-indigo-500/05 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono text-cyan-300 mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>EXECUTIVE COLLECTIVE &bull; LEADERSHIP ROSTER</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#f4f1ea] tracking-[-0.035em]">
              The <span className="text-cyan-400 font-semibold">f0undr Team</span>
            </h2>
            <p className="text-[#8d8b86] text-sm sm:text-base mt-3 max-w-2xl font-light leading-relaxed">
              Directed by <strong className="text-[#f4f1ea] font-medium">Muhammad Huzaifa Zahid (Founder)</strong>.
              Sovereign engineering leadership spanning autonomous AI systems, native Android architectures, executive operations, and platform governance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111114] border border-[rgba(244,241,234,0.12)] text-xs font-mono text-[#8d8b86]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Status: <strong className="text-[#f4f1ea]">05 Pillars Active</strong></span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {team.slice(0, 5).map((member, index) => {
            const config = getMemberConfig(member, index);
            const isHovered = hoveredCard === member.id;
            const IconComp = config.icon;

            return (
              <div
                key={member.id}
                onMouseEnter={() => {
                  playHoverSound();
                  setHoveredCard(member.id);
                }}
                onMouseLeave={() => setHoveredCard(null)}
                onMouseMove={(e) => handleMouseMove(e, member.id)}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 bg-[#111114] border group cursor-default overflow-hidden ${
                  isHovered
                    ? 'border-cyan-400/50 shadow-2xl shadow-cyan-950/40 -translate-y-1.5'
                    : 'border-[rgba(244,241,234,0.1)] hover:border-[rgba(244,241,234,0.25)]'
                }`}
                style={{
                  background: isHovered
                    ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.05) 0%, #111114 65%)`
                    : '#111114',
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {isHovered && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-laser-scan"
                    style={{ height: '30%' }}
                  />
                )}

                <div className="absolute top-2 left-2 text-[8px] font-mono text-[rgba(244,241,234,0.15)] select-none">
                  &#9484;
                </div>
                <div className="absolute top-2 right-2 text-[8px] font-mono text-[rgba(244,241,234,0.15)] select-none">
                  &#9488;
                </div>
                <div className="absolute bottom-2 left-2 text-[8px] font-mono text-[rgba(244,241,234,0.15)] select-none">
                  &#9492;
                </div>
                <div className="absolute bottom-2 right-2 text-[8px] font-mono text-[rgba(244,241,234,0.15)] select-none">
                  &#9494;
                </div>

                <div>
                  <div className="flex items-center justify-between pb-3 mb-5 border-b border-[rgba(244,241,234,0.06)] text-[10px] font-mono text-[#8d8b86]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-cyan-300 font-semibold">{config.nodeId}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8d8b86]">{config.codeBadge}</span>
                  </div>

                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="relative">
                      <div
                        className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl p-[1.5px] relative group-hover:scale-105 transition-transform duration-300 shadow-xl"
                        style={{
                          background: `linear-gradient(135deg, ${config.accentColor}, #0a0a0b)`,
                        }}
                      >
                        <div className="w-full h-full rounded-[14px] bg-[#16161a] overflow-hidden flex items-center justify-center relative">
                          {member.avatarUrl ? (
                            <img
                              src={member.avatarUrl}
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 relative z-10"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-mono font-bold text-base sm:text-lg text-[#f4f1ea]">
                              {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        className="absolute -bottom-1 -right-1 p-1.5 rounded-full text-[#0a0a0b] shadow-md flex items-center justify-center"
                        style={{ backgroundColor: config.accentColor }}
                        title={config.clearance}
                      >
                        <IconComp className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)] text-[10px] font-mono text-emerald-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{member.status || 'Active'}</span>
                      </span>
                      <span className="text-[11px] font-mono text-[#8d8b86] mt-2 font-medium">
                        {member.handle}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg sm:text-xl font-normal text-[#f4f1ea] leading-tight group-hover:text-cyan-300 transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs text-cyan-400 font-mono font-medium mt-1.5 leading-snug">
                      {member.role}
                    </div>

                    <div className="mt-2.5 flex items-center gap-1.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r text-[9px] font-mono font-bold border tracking-wider uppercase ${config.badgeColor}`}>
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{config.badge}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#8d8b86] font-light leading-relaxed mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                    {member.bio}
                  </p>

                  {member.quote && (
                    <div className="p-3 rounded-2xl bg-[#0a0a0b] border-l-2 border-cyan-400 text-[11px] text-[#f4f1ea]/90 italic mb-5 shadow-inner">
                      "{member.quote}"
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {member.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        onMouseEnter={playHoverSound}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-[#0a0a0b] text-[#8d8b86] hover:text-[#f4f1ea] border border-[rgba(244,241,234,0.08)] hover:border-cyan-400/40 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[rgba(244,241,234,0.08)] flex items-center justify-between gap-3 mt-auto">
                  <div className="text-[11px] font-mono text-[#8d8b86] line-clamp-1 flex-1 pr-1">
                    {member.highlightProject || 'f0undr Core Operations'}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {member.social?.website && (
                      <a
                        href={member.social.website}
                        target="_blank"
                        rel="noreferrer"
                        onClick={playClickSound}
                        onMouseEnter={playHoverSound}
                        className="p-2 rounded-xl bg-[#0a0a0b] hover:bg-[#16161a] text-[#8d8b86] hover:text-[#f4f1ea] border border-[rgba(244,241,234,0.12)] hover:border-cyan-400/50 transition-all"
                        title="Platform Gateway"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.social?.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={playClickSound}
                        onMouseEnter={playHoverSound}
                        className="p-2 rounded-xl bg-[#0a0a0b] hover:bg-[#16161a] text-[#8d8b86] hover:text-[#f4f1ea] border border-[rgba(244,241,234,0.12)] hover:border-cyan-400/50 transition-all"
                        title="GitHub Profile"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
