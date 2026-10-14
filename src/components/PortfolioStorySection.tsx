import type { Venture } from '../types';
import { Compass, ArrowUpRight, Cpu, Zap, Layers, CheckCircle, BookOpen } from 'lucide-react';

interface PortfolioStorySectionProps {
  ventures: Venture[];
  onNavigateTab: (tab: string) => void;
}

export const PortfolioStorySection = ({
  ventures,
  onNavigateTab,
}: PortfolioStorySectionProps) => {
  const pillars = [
    {
      roman: 'I',
      title: 'Autonomous Leverage',
      desc: 'We prioritize architectures where software, pedagogical systems, and intelligent models compound without requiring proportional human labor.',
      icon: Cpu,
    },
    {
      roman: 'II',
      title: 'Obsessive Craft & Speed',
      desc: 'Speed is our proxy for care. We eliminate bureaucratic latency, ship functional working prototypes within 48 hours, and refine with editorial precision.',
      icon: Zap,
    },
    {
      roman: 'III',
      title: 'Open Knowledge Vaults',
      desc: 'Everything we learn across computing literature, systems architecture, and mistakes is systematically cataloged and shared openly for all builders.',
      icon: Layers,
    },
    {
      roman: 'IV',
      title: 'Long-Term Infinite Games',
      desc: 'We build with founders and collaborators who operate on decade horizons. Uninterrupted compounding creates enduring, category-defining institutions.',
      icon: Compass,
    },
  ];

  return (
    <section className="py-20 border-t border-[#e7e5e4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="editorial-stamp">
                Manifesto &amp; Philosophy
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#1c1917]">
              The Story of <em className="italic text-[#c2410c] font-normal">f0undr</em>
            </h2>
            <p className="text-[#57534e] text-sm sm:text-base mt-3 max-w-2xl leading-relaxed font-normal">
              We are an interdisciplinary collective founded by <strong className="text-[#1c1917]">Abdull Rehman Khizar</strong>, <strong className="text-[#1c1917]">f0undr</strong>, and <strong className="text-[#1c1917]">M.Huzaifa</strong>.
              We believe that small, highly leveraged teams armed with first-principles reasoning and clear judgment build the future.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab('team')}
              className="px-5 py-2.5 rounded-xl btn-editorial-outline text-xs font-semibold transition-all hover:-translate-y-0.5"
            >
              Meet The Collective →
            </button>
          </div>
        </div>

        {/* Narrative / About Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7 editorial-card rounded-2xl p-8 sm:p-10 relative">
            <span className="editorial-stamp mb-4 inline-block">
              Foundational Purpose
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c1917] mb-6 leading-snug">
              "We don’t wait for permission to create tools, literature, and systems that satisfy our deepest intellectual curiosities."
            </h3>

            <div className="space-y-4 text-sm text-[#57534e] leading-relaxed">
              <p>
                f0undr originated as a private collective of builders who were dissatisfied with fragmented tools, shallow tutorials, and disjointed reading lists. We required a single, unified headquarters where foundational computing curricula, real-world founder notes, and active software ventures live together in harmony.
              </p>
              <p>
                Today, f0undr operates as both our public atelier and our operational workbench. From our flagship comprehensive <strong>Computing &amp; Technology Curriculum (Units 1 to 6)</strong> to autonomous multi-agent systems and unit economics modeling, we build in the open and empower founders to operate with extreme leverage.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#e7e5e4] flex flex-wrap items-center gap-6 text-xs text-[#1c1917] font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#2b5346]" />
                <span>Zero Bureaucracy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#c2410c]" />
                <span>Autonomous Leverage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#2b5346]" />
                <span>Continuous Open Publishing</span>
              </div>
            </div>
          </div>

          {/* Curriculum Spotlight Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="editorial-card rounded-2xl p-8 flex-1 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <span className="editorial-stamp editorial-stamp-terracotta">
                  Flagship Curriculum
                </span>
              </div>
              <h4 className="text-xl font-serif font-bold text-[#1c1917] mb-2">
                f0undr Book: Computing &amp; Technology
              </h4>
              <p className="text-xs text-[#57534e] leading-relaxed mb-6 font-normal">
                Written by <strong className="text-[#1c1917]">f0undr</strong> &amp; <strong className="text-[#1c1917]">Abdull Rehman Khizar</strong>. Complete curriculum covering hardware architectures, algorithmic logic, Scratch programming, cybersecurity, and digital venture creation.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#e7e5e4]">
                  <span className="text-[#78716c]">Curriculum Map</span>
                  <span className="text-[#1c1917] font-semibold">6 Units Complete</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#e7e5e4]">
                  <span className="text-[#78716c]">Real-World Case Studies</span>
                  <span className="text-[#1c1917] font-semibold">Barcode IPO, Logic Circuits</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#78716c]">Student Workbooks</span>
                  <span className="text-[#2b5346] font-semibold">Browser Autosave</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e7e5e4]">
                <a
                  href="/book/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl btn-editorial-accent text-xs font-semibold transition-all hover:-translate-y-0.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read f0undr Book Online</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.roman}
                className="editorial-card editorial-card-hover rounded-2xl p-6 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-serif font-bold text-[#c2410c]">
                      § {pillar.roman}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#f5f2eb] border border-[#e7e5e4] flex items-center justify-center text-[#2b5346]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-[#1c1917] mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#57534e] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Ventures & Systems */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="editorial-stamp mb-2 inline-block">Portfolio &amp; Shipped Code</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c1917]">
                Published Systems &amp; Experiments
              </h3>
            </div>
            <span className="text-xs font-mono text-[#78716c] hidden sm:block">
              {ventures.length} Active Deployments
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ventures.map((venture) => (
              <div
                key={venture.id}
                className="editorial-card editorial-card-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#f0fdf4] text-[#166534] border border-[#dcfce7] font-medium">
                      ● {venture.stage}
                    </span>
                    {venture.metrics && (
                      <span className="text-xs font-mono text-[#78716c]">
                        {venture.metrics}
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-serif font-bold text-[#1c1917] group-hover:text-[#c2410c] transition-colors mb-2">
                    {venture.title}
                  </h4>
                  <p className="text-xs font-mono text-[#c2410c] mb-3">
                    {venture.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed mb-6">
                    {venture.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {venture.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#f5f2eb] text-[#57534e] border border-[#e7e5e4]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {venture.link && (
                  <div className="pt-4 border-t border-[#e7e5e4]">
                    <a
                      href={venture.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1c1917] hover:text-[#c2410c] transition-colors"
                    >
                      <span>Inspect Live Deployment</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
