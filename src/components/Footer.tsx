import { Download, Sparkles, BookOpen } from 'lucide-react';

interface FooterProps {
  onExportData: () => void;
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onExportData,
  onNavigateTab,
}) => {
  return (
    <footer className="border-t border-[#e7e5e4] bg-[#faf8f5] text-[#1c1917] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1c1917] flex items-center justify-center text-[#faf8f5] font-serif font-bold text-base shadow-xs">
                f0
              </div>
              <span className="font-serif font-bold text-2xl text-[#1c1917] tracking-tight">
                f0undr<span className="text-[#c2410c]">.</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed max-w-sm font-normal">
              An independent intellectual publishing house and systems engineering atelier. Creators of the <em>f0undr Book: Computing &amp; Technology Curriculum</em>, curated master bookshelf, and real-time founder workbench.
            </p>

            <div className="pt-2">
              <span className="editorial-stamp editorial-stamp-terracotta">
                Autonomous Systems · High-Leverage Software
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-mono uppercase text-[#1c1917] font-semibold tracking-wider">
              Folios &amp; Navigation
            </h5>
            <ul className="space-y-2 text-xs text-[#57534e]">
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('overview');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1c1917] transition-colors"
                >
                  Overview &amp; Manifesto
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('team');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1c1917] transition-colors"
                >
                  The f0undr Team (8 Fellows)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('books');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1c1917] transition-colors"
                >
                  Bookshelf &amp; Curriculum Vault
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('tools');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1c1917] transition-colors"
                >
                  Founder Tools &amp; Arsenal
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('things');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1c1917] transition-colors"
                >
                  Hardware &amp; Artifacts
                </button>
              </li>
            </ul>
          </div>

          {/* Colophon & Curriculum Showcase */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-mono uppercase text-[#1c1917] font-semibold tracking-wider">
              Curriculum &amp; Archive
            </h5>
            <p className="text-xs text-[#57534e] leading-relaxed font-normal">
              Official headquarters for the 6-unit computing textbook authored by f0undr &amp; Abdull Rehman Khizar. You can download a complete JSON archive of all curated publications and tools below.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href="/book/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#fff7ed] text-[#c2410c] border border-[#ffedd5] hover:bg-[#ffedd5] transition-colors shadow-2xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>f0undr Book (Units 1–6)</span>
              </a>

              <button
                onClick={onExportData}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium btn-editorial-outline text-[#1c1917] transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Archive JSON</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 mt-12 border-t border-[#e7e5e4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#78716c]">
          <p>© {new Date().getFullYear()} f0undr. Crafted with editorial rigor for founders and engineers.</p>
          <div className="flex items-center gap-4">
            <a
              href="/book/"
              target="_blank"
              rel="noreferrer"
              className="text-[#c2410c] hover:underline flex items-center gap-1 font-semibold"
            >
              <Sparkles className="w-3 h-3" />
              <span>f0undr Book: Computing Curriculum</span>
            </a>
            <span>•</span>
            <span>Khizar · f0undr · Huzaifa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
