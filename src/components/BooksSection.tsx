import { useState } from 'react';
import type { Book, BookCategory, ReadingStatus } from '../types';
import { BookOpen, Star, Search, Bookmark, ChevronRight, CheckCircle2, Clock, ArrowUpRight, X } from 'lucide-react';

interface BooksSectionProps {
  books: Book[];
}

const CATEGORIES: ('All' | BookCategory)[] = [
  'All',
  'Startups & Business',
  'AI & Technology',
  'Philosophy & Mindset',
  'Design & UX',
  'Biographies',
  'Productivity & Systems',
];

const STATUS_FILTERS: { id: 'all' | ReadingStatus; label: string }[] = [
  { id: 'all', label: 'All Volumes' },
  { id: 'reading', label: 'Currently Reading' },
  { id: 'completed', label: 'Completed' },
  { id: 'wishlist', label: 'In Queue' },
];

export const BooksSection: React.FC<BooksSectionProps> = ({
  books,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | BookCategory>('All');
  const [selectedStatus, setSelectedStatus] = useState<'all' | ReadingStatus>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeBook, setActiveBook] = useState<Book | null>(null);

  // Filtered books
  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || book.status === selectedStatus;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: ReadingStatus) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Completed',
          bg: 'bg-[#f0fdf4] text-[#166534] border-[#dcfce7]',
          icon: CheckCircle2,
        };
      case 'reading':
        return {
          label: 'Reading Now',
          bg: 'bg-[#fff7ed] text-[#c2410c] border-[#ffedd5]',
          icon: Clock,
        };
      case 'wishlist':
        return {
          label: 'In Queue',
          bg: 'bg-[#fefce8] text-[#854d0e] border-[#fef08a]',
          icon: Bookmark,
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
                Knowledge Architecture · Master Library
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#1c1917]">
              The Bookshelf &amp; <em className="italic text-[#c2410c] font-normal">Vault</em>
            </h2>
            <p className="text-[#57534e] text-sm sm:text-base mt-3 max-w-2xl leading-relaxed font-normal">
              Curated master library and original curriculum series for founders, systems thinkers, and engineers. Every entry includes distilled takeaways and operational insights.
            </p>
          </div>
        </div>

        {/* FLAGSHIP SPOTLIGHT: f0undr Book Curriculum Banner */}
        <div className="mb-14 editorial-card rounded-2xl p-6 sm:p-10 relative overflow-hidden group">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="editorial-stamp editorial-stamp-terracotta inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#c2410c] animate-pulse" />
                  FLAGSHIP CURRICULUM · LIVE ON VERCEL
                </span>
                <span className="text-xs font-mono text-[#78716c] bg-[#f5f2eb] px-2.5 py-1 rounded-md border border-[#e7e5e4]">
                  Units 1 to 6 Complete
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c1917] tracking-tight">
                f0undr Book: Computing &amp; Technology Curriculum
              </h3>
              <p className="text-xs text-[#c2410c] font-mono font-medium">
                Authored by <strong className="text-[#1c1917]">f0undr</strong> &amp; <strong className="text-[#1c1917]">Abdull Rehman Khizar</strong>
              </p>
              <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed font-normal">
                A complete modern computer science textbook covering hardware foundations, digital productivity, algorithmic thinking, Scratch programming, cybersecurity, and digital entrepreneurship. Featuring real-world case studies, IPO cycle architectures, and autosaving student lab workbooks.
              </p>

              {/* 6 Unit Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  'Unit 1: ICT & Hardware',
                  'Unit 2: Digital Skills',
                  'Unit 3: Algorithmic Thinking',
                  'Unit 4: Programming (Scratch)',
                  'Unit 5: Digital Citizenship',
                  'Unit 6: Entrepreneurship',
                ].map((unit, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#f5f2eb] text-[#57534e] border border-[#e7e5e4]"
                  >
                    {unit}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <a
                href="/book/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl btn-editorial-accent text-xs font-semibold shadow-xs transition-all hover:-translate-y-0.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read f0undr Book (Units 1–6)</span>
                <ArrowUpRight className="w-4 h-4 opacity-80" />
              </a>

              <button
                onClick={() => {
                  const flagship = books.find((b) => b.id === 'book-foundr-ebook' || b.id === 'f0undr-book-flagship');
                  if (flagship) setActiveBook(flagship);
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-editorial-outline text-xs font-semibold transition-all hover:-translate-y-0.5"
              >
                <span>Inspect Syllabus Outline</span>
                <ChevronRight className="w-4 h-4 text-[#78716c]" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#78716c] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search volumes, authors, or key insights..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e7e5e4] rounded-xl text-xs sm:text-sm text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#1c1917] shadow-2xs transition-colors"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {STATUS_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedStatus(filter.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all font-mono text-[11px] ${
                    selectedStatus === filter.id
                      ? 'bg-[#1c1917] text-[#faf8f5] font-medium shadow-xs'
                      : 'bg-white hover:bg-[#f5f2eb] text-[#57534e] hover:text-[#1c1917] border border-[#e7e5e4]'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg whitespace-nowrap transition-all text-xs ${
                  selectedCategory === cat
                    ? 'bg-[#1c1917] text-[#faf8f5] font-semibold'
                    : 'bg-[#f5f2eb] hover:bg-[#e7e5e4] text-[#57534e] hover:text-[#1c1917] border border-[#e7e5e4]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => {
            const badge = getStatusBadge(book.status);
            const StatusIcon = badge.icon;
            return (
              <div
                key={book.id}
                onClick={() => setActiveBook(book)}
                className="editorial-card editorial-card-hover rounded-2xl p-6 relative flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Top Bar: Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-[#f5f2eb] text-[#78716c] border border-[#e7e5e4]">
                      {book.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-mono border ${badge.bg}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {badge.label}
                    </span>
                  </div>

                  {/* Title & Author */}
                  <h3 className="text-xl font-serif font-bold text-[#1c1917] group-hover:text-[#c2410c] transition-colors mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs font-mono text-[#78716c] mb-3">
                    {book.author} {book.year ? `(${book.year})` : ''}
                  </p>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= book.rating
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-[#d6d3d1]'
                        }`}
                      />
                    ))}
                    <span className="text-[11px] font-mono text-[#78716c] ml-1">
                      {book.rating}.0
                    </span>
                  </div>

                  {/* Notes / Preview */}
                  <p className="text-xs text-[#57534e] leading-relaxed line-clamp-3 mb-5">
                    {book.notes}
                  </p>

                  {/* Key Takeaways Chips */}
                  {book.keyTakeaways && book.keyTakeaways.length > 0 && (
                    <div className="space-y-1.5 mb-4">
                      {book.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-1.5 text-[11px] text-[#57534e]"
                        >
                          <span className="text-[#c2410c] mt-0.5">›</span>
                          <span className="line-clamp-1">{takeaway}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Drawer Action */}
                <div
                  className="pt-4 border-t border-[#e7e5e4] flex items-center justify-between"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-[11px] font-mono text-[#78716c]">
                    Added {book.dateAdded}
                  </span>

                  <button
                    onClick={() => setActiveBook(book)}
                    className="text-xs font-mono text-[#c2410c] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Read Digest</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Book Detailed Reader Modal */}
      {activeBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div
            className="editorial-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveBook(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#78716c] hover:text-[#1c1917] hover:bg-[#f5f2eb] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#f5f2eb] text-[#c2410c] border border-[#e7e5e4] mb-3 inline-block">
                {activeBook.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c1917] mb-1">
                {activeBook.title}
              </h3>
              <p className="text-sm font-mono text-[#78716c]">
                Author: {activeBook.author} {activeBook.year ? `· Published ${activeBook.year}` : ''}
              </p>
            </div>

            {/* Favorite Quote */}
            {activeBook.favoriteQuote && (
              <div className="p-4 rounded-xl bg-[#f5f2eb] border border-[#e7e5e4] text-xs italic text-[#57534e] mb-6">
                "{activeBook.favoriteQuote}"
              </div>
            )}

            {/* Comprehensive Notes */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-mono uppercase text-[#1c1917] font-bold tracking-wider">
                Distilled Field Notes &amp; Synthesis
              </h4>
              <p className="text-sm text-[#57534e] leading-relaxed whitespace-pre-line">
                {activeBook.notes}
              </p>
            </div>

            {/* Key Takeaways */}
            {activeBook.keyTakeaways && activeBook.keyTakeaways.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase text-[#1c1917] font-bold tracking-wider mb-3">
                  Core Architectural Principles
                </h4>
                <div className="space-y-2">
                  {activeBook.keyTakeaways.map((takeaway, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f5f2eb] border border-[#e7e5e4] text-xs text-[#1c1917]"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#ffedd5] text-[#c2410c] flex items-center justify-center font-mono text-[10px] shrink-0 font-bold">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Units if curriculum */}
            {activeBook.units && activeBook.units.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase text-[#1c1917] font-bold tracking-wider mb-3">
                  Curriculum Units Syllabus
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeBook.units.map((unit, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#f5f2eb] border border-[#e7e5e4] text-xs font-mono text-[#57534e] flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#c2410c]" />
                      <span>{unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-6 border-t border-[#e7e5e4] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {activeBook.externalUrl && (
                  <a
                    href={activeBook.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl btn-editorial-accent text-xs font-semibold"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Launch Live Edition</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>

              <button
                onClick={() => setActiveBook(null)}
                className="px-4 py-2 rounded-xl btn-editorial-outline text-xs font-medium"
              >
                Close Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
