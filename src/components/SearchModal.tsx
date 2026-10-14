import { useState, useEffect } from 'react';
import type { Book, CuratedTool, TeamMember, Thing } from '../types';
import { Search, BookOpen, Wrench, Users, Package, CornerDownLeft } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
  tools: CuratedTool[];
  team: TeamMember[];
  things: Thing[];
  onSelectResult: (type: 'book' | 'tool' | 'team' | 'thing', tab: string, id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  books,
  tools,
  team,
  things,
  onSelectResult,
}) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Matched results
  const matchedBooks = q
    ? books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.notes.toLowerCase().includes(q)
      )
    : books.slice(0, 3);

  const matchedTools = q
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    : tools.slice(0, 3);

  const matchedTeam = q
    ? team.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.role.toLowerCase().includes(q) ||
          m.skills.some((s) => s.toLowerCase().includes(q))
      )
    : team.slice(0, 2);

  const matchedThings = q
    ? things.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.whyWeLoveIt.toLowerCase().includes(q)
      )
    : things.slice(0, 2);

  const hasResults =
    matchedBooks.length > 0 ||
    matchedTools.length > 0 ||
    matchedTeam.length > 0 ||
    matchedThings.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4 bg-stone-900/50 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="editorial-card w-full max-w-2xl max-h-[80vh] flex flex-col rounded-2xl border border-[#d6d3d1] shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#e7e5e4] bg-[#f5f2eb]">
          <Search className="w-5 h-5 text-[#c2410c] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across books, tools, team fellows, and hardware..."
            className="w-full bg-transparent text-sm sm:text-base text-[#1c1917] placeholder-[#a8a29e] focus:outline-none font-medium"
          />
          <kbd
            onClick={onClose}
            className="px-2 py-1 text-[10px] font-mono bg-white border border-[#e7e5e4] rounded text-[#78716c] cursor-pointer hover:text-[#1c1917]"
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-6">
          {!hasResults ? (
            <div className="text-center py-12 text-[#a8a29e] text-xs font-mono">
              No results found for "{query}". Try another search keyword.
            </div>
          ) : (
            <>
              {/* Books */}
              {matchedBooks.length > 0 && (
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#c2410c] font-semibold px-2 mb-2 block flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Books ({matchedBooks.length})
                  </span>
                  <div className="space-y-1">
                    {matchedBooks.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => {
                          onSelectResult('book', 'books', b.id);
                          onClose();
                        }}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f5f2eb] text-xs text-[#57534e] hover:text-[#1c1917] cursor-pointer transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-[#1c1917]">{b.title}</div>
                          <div className="text-[11px] font-mono text-[#78716c]">{b.author}</div>
                        </div>
                        <CornerDownLeft className="w-3.5 h-3.5 opacity-60" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Team */}
              {matchedTeam.length > 0 && (
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#2b5346] font-semibold px-2 mb-2 block flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Core Team ({matchedTeam.length})
                  </span>
                  <div className="space-y-1">
                    {matchedTeam.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          onSelectResult('team', 'team', m.id);
                          onClose();
                        }}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f5f2eb] text-xs text-[#57534e] hover:text-[#1c1917] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={m.avatarUrl}
                            alt={m.name}
                            className="w-7 h-7 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-semibold text-[#1c1917]">{m.name}</div>
                            <div className="text-[11px] font-mono text-[#78716c]">{m.role}</div>
                          </div>
                        </div>
                        <CornerDownLeft className="w-3.5 h-3.5 opacity-60" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools */}
              {matchedTools.length > 0 && (
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#c2410c] font-semibold px-2 mb-2 block flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5" /> Tools ({matchedTools.length})
                  </span>
                  <div className="space-y-1">
                    {matchedTools.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          onSelectResult('tool', 'tools', t.id);
                          onClose();
                        }}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f5f2eb] text-xs text-[#57534e] hover:text-[#1c1917] cursor-pointer transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-[#1c1917]">{t.name}</div>
                          <div className="text-[11px] font-mono text-[#78716c]">{t.tagline}</div>
                        </div>
                        <CornerDownLeft className="w-3.5 h-3.5 opacity-60" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Things */}
              {matchedThings.length > 0 && (
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#78716c] font-semibold px-2 mb-2 block flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5" /> Artifacts ({matchedThings.length})
                  </span>
                  <div className="space-y-1">
                    {matchedThings.map((th) => (
                      <div
                        key={th.id}
                        onClick={() => {
                          onSelectResult('thing', 'things', th.id);
                          onClose();
                        }}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f5f2eb] text-xs text-[#57534e] hover:text-[#1c1917] cursor-pointer transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-[#1c1917]">{th.title}</div>
                          <div className="text-[11px] font-mono text-[#78716c]">{th.category}</div>
                        </div>
                        <CornerDownLeft className="w-3.5 h-3.5 opacity-60" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
