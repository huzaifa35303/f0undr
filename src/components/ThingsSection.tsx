import { useState } from 'react';
import type { Thing, ThingCategory } from '../types';
import { Package, Search, ExternalLink, Laptop, Keyboard, Headphones, Monitor, BookOpen, Armchair, PenTool, ShieldAlert } from 'lucide-react';

interface ThingsSectionProps {
  things: Thing[];
}

const CATEGORIES: ('All' | ThingCategory)[] = [
  'All',
  'Hardware & Desk',
  'Workspace & Audio',
  'Everyday Carry',
  'Software Stack',
  'Mindset & Artifact',
];

export const ThingsSection: React.FC<ThingsSectionProps> = ({
  things,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ThingCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredThings = things.filter((thing) => {
    const matchesCategory = selectedCategory === 'All' || thing.category === selectedCategory;
    const matchesSearch =
      thing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thing.whyWeLoveIt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (thing.specs && thing.specs.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getIcon = (name?: string) => {
    switch (name) {
      case 'Laptop':
        return Laptop;
      case 'Keyboard':
        return Keyboard;
      case 'Headphones':
        return Headphones;
      case 'Monitor':
        return Monitor;
      case 'BookOpen':
        return BookOpen;
      case 'Armchair':
        return Armchair;
      case 'PenTool':
        return PenTool;
      case 'ShieldAlert':
        return ShieldAlert;
      default:
        return Package;
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
                Physical Instruments &amp; Lab Artifacts
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#1c1917]">
              Things, Setup <em className="italic text-[#c2410c] font-normal">&amp; Artifacts</em>
            </h2>
            <p className="text-[#57534e] text-sm sm:text-base mt-3 max-w-2xl leading-relaxed font-normal">
              Tactile hardware, productivity setups, and physical instruments that eliminate cognitive friction and maximize focus.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#78716c] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gear, hardware, or workspace essentials..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e7e5e4] rounded-xl text-xs sm:text-sm text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#1c1917] shadow-2xs transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-mono text-[11px] ${
                  selectedCategory === cat
                    ? 'bg-[#1c1917] text-[#faf8f5] font-medium shadow-xs'
                    : 'bg-white hover:bg-[#f5f2eb] text-[#57534e] hover:text-[#1c1917] border border-[#e7e5e4]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Things */}
        {filteredThings.length === 0 ? (
          <div className="editorial-card rounded-2xl p-12 text-center">
            <Package className="w-10 h-10 text-[#a8a29e] mx-auto mb-3" />
            <h4 className="font-serif text-lg font-bold text-[#1c1917]">No items found</h4>
            <p className="text-xs text-[#78716c] mt-1 max-w-sm mx-auto">
              Try searching with different terms or selecting another category filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredThings.map((thing) => {
              const Icon = getIcon(thing.iconName);
              return (
                <div
                  key={thing.id}
                  className="editorial-card editorial-card-hover rounded-2xl p-6 flex flex-col justify-between group relative"
                >
                  <div>
                    {/* Top Icon & Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#f5f2eb] border border-[#e7e5e4] flex items-center justify-center text-[#2b5346] group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#f5f2eb] text-[#78716c] border border-[#e7e5e4]">
                        {thing.category}
                      </span>
                    </div>

                    <h4 className="text-lg font-serif font-bold text-[#1c1917] group-hover:text-[#c2410c] transition-colors mb-1.5">
                      {thing.title}
                    </h4>

                    {thing.specs && (
                      <div className="text-[11px] font-mono text-[#c2410c] mb-3 bg-[#fff7ed] px-2.5 py-1 rounded-md border border-[#ffedd5] line-clamp-1">
                        {thing.specs}
                      </div>
                    )}

                    <p className="text-xs text-[#57534e] leading-relaxed mb-6 font-normal">
                      {thing.whyWeLoveIt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#e7e5e4] flex items-center justify-between">
                    {thing.url ? (
                      <a
                        href={thing.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1c1917] hover:text-[#c2410c] hover:underline"
                      >
                        <span>Specifications</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-[11px] font-mono text-[#78716c]">Verified Studio Gear</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
