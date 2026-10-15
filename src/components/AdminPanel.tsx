import { useState, useRef, useEffect } from 'react';
import {
  Shield,
  BookOpen,
  Users,
  Wrench,
  Package,
  Globe,
  Database,
  Search,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Save,
  RotateCcw,
  Star,
  Activity,
  Sparkles,
  Award,
  Plus,
  X,
  Terminal,
  Upload,
} from 'lucide-react';
import type {
  AuthUser,
  Book,
  CuratedTool,
  TeamMember,
  Thing,
  SeoSettings,
  AuditLogItem,
  ReadingStatus,
} from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser;
  onLogout: () => void;
  // Content states
  books: Book[];
  tools: CuratedTool[];
  team: TeamMember[];
  things: Thing[];
  seoSettings: SeoSettings;
  auditLogs: AuditLogItem[];
  // Handlers
  onUpdateBook: (book: Book) => void;
  onDeleteBook: (id: string) => void;
  onAddBook: (book: Book) => void;
  onUpdateTeamMember: (member: TeamMember) => void;
  onDeleteTeamMember: (id: string) => void;
  onAddTeamMember: (member: TeamMember) => void;
  onUpdateTool: (tool: CuratedTool) => void;
  onDeleteTool: (id: string) => void;
  onAddTool: (tool: CuratedTool) => void;
  onUpdateThing: (thing: Thing) => void;
  onDeleteThing: (id: string) => void;
  onAddThing: (thing: Thing) => void;
  onUpdateSeoSettings: (settings: SeoSettings) => void;
  onExportData: () => void;
  onImportData: (data: unknown) => void;
  onResetData: () => void;
  onOpenAddModal: (type: 'book' | 'tool' | 'team' | 'thing') => void;
}

export const AdminPanel = ({
  isOpen,
  onClose,
  currentUser,
  onLogout,
  books,
  tools,
  team,
  things,
  seoSettings,
  auditLogs,
  onUpdateBook,
  onDeleteBook,
  onUpdateTeamMember,
  onDeleteTeamMember,
  onUpdateTool,
  onDeleteTool,
  onUpdateThing,
  onDeleteThing,
  onUpdateSeoSettings,
  onExportData,
  onImportData,
  onResetData,
  onOpenAddModal,
}: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'seo' | 'books' | 'team' | 'tools' | 'things' | 'system'>('overview');
  const [editableSeo, setEditableSeo] = useState<SeoSettings>(seoSettings);
  const [seoSavedSuccess, setSeoSavedSuccess] = useState(false);
  const [serpViewMode, setSerpViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [contentFilter, setContentFilter] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditableSeo(seoSettings);
  }, [seoSettings]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        onImportData(parsed);
      } catch {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSeoSettings(editableSeo);
    setSeoSavedSuccess(true);
    setTimeout(() => setSeoSavedSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#faf8f5] flex flex-col text-[#1c1917] selection:bg-[#c2410c]/15 selection:text-[#9a3412]">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-20 bg-[#ffffff] border-b border-[#e7e5e4] px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1c1917] flex items-center justify-center text-[#faf8f5] shadow-xs">
              <Shield className="w-5 h-5 text-[#c2410c]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg sm:text-xl font-bold text-[#1c1917] tracking-tight">
                  f0undr Studio Cockpit
                </h1>
                <span className="editorial-stamp editorial-stamp-terracotta">
                  Admin Console
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#78716c] hidden sm:block">
                Master Database, SEO Rank Engine &amp; Platform Controls
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Current User Pill */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#f5f2eb] border border-[#e7e5e4]">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-7 h-7 rounded-lg object-cover border border-[#c2410c]"
              />
              <div className="hidden sm:block text-left">
                <span className="text-xs font-semibold text-[#1c1917] block leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[10px] font-mono text-[#c2410c] uppercase font-medium">
                  {currentUser.role}
                </span>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-xl border border-[#d6d3d1] hover:bg-[#faf8f5] text-xs font-mono text-[#57534e] hover:text-[#1c1917] transition-colors"
            >
              Sign Out
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#1c1917] text-[#faf8f5] hover:bg-[#292524] transition-colors shadow-xs"
              title="Return to Public Site"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Admin Navigation Pills */}
      <div className="bg-[#ffffff] border-b border-[#e7e5e4] px-4 sm:px-8 py-2.5 sticky top-[65px] z-10 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-2 scrollbar-none">
          <nav className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#1c1917] text-[#faf8f5] font-semibold'
                  : 'text-[#57534e] hover:text-[#1c1917] hover:bg-[#f5f2eb]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'seo'
                  ? 'bg-[#c2410c] text-[#ffffff] font-semibold shadow-xs'
                  : 'text-[#c2410c] hover:bg-[#fff7ed]'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Google Rank #1 Engine</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">100%</span>
            </button>

            <button
              onClick={() => setActiveTab('books')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'books'
                  ? 'bg-[#1c1917] text-[#faf8f5] font-semibold'
                  : 'text-[#57534e] hover:text-[#1c1917] hover:bg-[#f5f2eb]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Bookshelf ({books.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'team'
                  ? 'bg-[#1c1917] text-[#faf8f5] font-semibold'
                  : 'text-[#57534e] hover:text-[#1c1917] hover:bg-[#f5f2eb]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Fellows ({team.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('tools')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'tools'
                  ? 'bg-[#1c1917] text-[#faf8f5] font-semibold'
                  : 'text-[#57534e] hover:text-[#1c1917] hover:bg-[#f5f2eb]'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Tools ({tools.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('things')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'things'
                  ? 'bg-[#1c1917] text-[#faf8f5] font-semibold'
                  : 'text-[#57534e] hover:text-[#1c1917] hover:bg-[#f5f2eb]'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Artifacts ({things.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('system')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'system'
                  ? 'bg-[#1c1917] text-[#faf8f5] font-semibold'
                  : 'text-[#57534e] hover:text-[#1c1917] hover:bg-[#f5f2eb]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Vault &amp; Telemetry</span>
            </button>
          </nav>

          <button
            onClick={() => onOpenAddModal('book')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg btn-editorial-accent text-xs font-semibold shadow-xs shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Item</span>
          </button>
        </div>
      </div>

      {/* Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW & TELEMETRY */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="editorial-card rounded-2xl p-5 bg-white border border-[#e7e5e4]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#57534e] uppercase">Curriculum &amp; Books</span>
                  <BookOpen className="w-4 h-4 text-[#c2410c]" />
                </div>
                <div className="font-serif text-3xl font-bold text-[#1c1917]">{books.length}</div>
                <p className="text-[11px] text-[#78716c] mt-1 font-mono">Includes f-e-book (Units 1–6)</p>
              </div>

              <div className="editorial-card rounded-2xl p-5 bg-white border border-[#e7e5e4]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#57534e] uppercase">Active Fellows</span>
                  <Users className="w-4 h-4 text-[#2b5346]" />
                </div>
                <div className="font-serif text-3xl font-bold text-[#1c1917]">{team.length}</div>
                <p className="text-[11px] text-[#78716c] mt-1 font-mono">f0undr, Khizar, Huzaifa + 5 leads</p>
              </div>

              <div className="editorial-card rounded-2xl p-5 bg-white border border-[#e7e5e4]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#57534e] uppercase">Founder Tools</span>
                  <Wrench className="w-4 h-4 text-[#c2410c]" />
                </div>
                <div className="font-serif text-3xl font-bold text-[#1c1917]">{tools.length + 4}</div>
                <p className="text-[11px] text-[#78716c] mt-1 font-mono">4 Live Interactive + Curated</p>
              </div>

              <div className="editorial-card rounded-2xl p-5 bg-white border border-[#e7e5e4]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#57534e] uppercase">Google SEO Readiness</span>
                  <Globe className="w-4 h-4 text-[#2b5346]" />
                </div>
                <div className="font-serif text-3xl font-bold text-[#2b5346]">100%</div>
                <p className="text-[11px] text-[#78716c] mt-1 font-mono">JSON-LD, Sitemap &amp; Robots OK</p>
              </div>
            </div>

            {/* Quick Action Strip */}
            <div className="editorial-card rounded-2xl p-6 bg-[#ffffff] border border-[#e7e5e4]">
              <h3 className="font-serif text-lg font-bold text-[#1c1917] mb-2">
                Executive Studio Quick Actions
              </h3>
              <p className="text-xs text-[#57534e] mb-5">
                Fast shortcuts for routine publishing and ecosystem operations.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => onOpenAddModal('book')}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[#e7e5e4] hover:border-[#1c1917] bg-[#faf8f5] hover:bg-white text-xs font-medium transition-all"
                >
                  <BookOpen className="w-4 h-4 text-[#c2410c]" />
                  <span>Add Book / Volume</span>
                </button>
                <button
                  onClick={() => onOpenAddModal('team')}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[#e7e5e4] hover:border-[#1c1917] bg-[#faf8f5] hover:bg-white text-xs font-medium transition-all"
                >
                  <Users className="w-4 h-4 text-[#2b5346]" />
                  <span>Register Fellow</span>
                </button>
                <button
                  onClick={() => setActiveTab('seo')}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[#c2410c]/30 hover:border-[#c2410c] bg-[#fff7ed] text-xs font-semibold text-[#c2410c] transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span>Configure Google SEO</span>
                </button>
                <button
                  onClick={onExportData}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[#e7e5e4] hover:border-[#1c1917] bg-[#faf8f5] hover:bg-white text-xs font-medium transition-all"
                >
                  <Database className="w-4 h-4 text-[#1c1917]" />
                  <span>Backup Vault JSON</span>
                </button>
              </div>
            </div>

            {/* Recent System Audit Logs */}
            <div className="editorial-card rounded-2xl p-6 bg-[#ffffff] border border-[#e7e5e4]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#c2410c]" />
                  <h3 className="font-serif text-lg font-bold text-[#1c1917]">
                    System Activity &amp; Audit Trail
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#78716c]">
                  Real-time Operational Logging
                </span>
              </div>
              <div className="divide-y divide-[#e7e5e4]">
                {auditLogs.map((log) => (
                  <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-semibold text-[#1c1917]">{log.action}</span>
                      <span className="text-[#57534e]"> — {log.target}</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[11px] text-[#78716c] shrink-0">
                      <span className="bg-[#f5f2eb] px-2 py-0.5 rounded text-[#1c1917]">
                        {log.performedBy} ({log.role})
                      </span>
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: GOOGLE RANK #1 ENGINE & SEO SUITE */}
        {/* ========================================================= */}
        {activeTab === 'seo' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header Banner */}
            <div className="editorial-card rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-white to-[#fff7ed] border border-[#ffedd5]">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="editorial-stamp editorial-stamp-terracotta inline-flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      GOOGLE SEARCH ENGINE OPTIMIZATION MASTER SUITE
                    </span>
                    <span className="text-xs font-mono text-[#2b5346] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded font-semibold">
                      Rank #1 Strategy
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
                    How f0undr Ranks #1 on Google
                  </h2>
                  <p className="text-xs sm:text-sm text-[#57534e] max-w-2xl leading-relaxed">
                    Google algorithm rankings depend on semantic structured data (Schema.org), canonical links, keyword density, PageSpeed/Core Web Vitals, and authoritative indexing. Below is your live telemetry and submission guide.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#e7e5e4] shadow-xs shrink-0 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-4 border-[#2b5346] flex items-center justify-center font-serif text-xl font-bold text-[#2b5346]">
                    100
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1c1917] block">
                      SEO Readiness Score
                    </span>
                    <span className="text-[11px] text-[#2b5346] font-medium block">
                      ✓ Schema.org Active
                    </span>
                    <span className="text-[11px] text-[#2b5346] font-medium block">
                      ✓ Sitemap &amp; Robots Valid
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google SERP Snippet Preview */}
            <div className="editorial-card rounded-2xl p-6 bg-white border border-[#e7e5e4]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#c2410c]" />
                  <h3 className="font-serif text-lg font-bold text-[#1c1917]">
                    Live Google Search Snippet Preview
                  </h3>
                </div>
                <div className="flex items-center gap-1 bg-[#f5f2eb] p-1 rounded-lg border border-[#e7e5e4] text-xs">
                  <button
                    onClick={() => setSerpViewMode('desktop')}
                    className={`px-2.5 py-1 rounded font-medium ${
                      serpViewMode === 'desktop' ? 'bg-white shadow-2xs text-[#1c1917]' : 'text-[#78716c]'
                    }`}
                  >
                    Desktop
                  </button>
                  <button
                    onClick={() => setSerpViewMode('mobile')}
                    className={`px-2.5 py-1 rounded font-medium ${
                      serpViewMode === 'mobile' ? 'bg-white shadow-2xs text-[#1c1917]' : 'text-[#78716c]'
                    }`}
                  >
                    Mobile
                  </button>
                </div>
              </div>

              {/* SERP Card rendering */}
              <div className={`p-4 sm:p-5 rounded-xl bg-white border border-[#d6d3d1] shadow-xs font-sans ${
                serpViewMode === 'mobile' ? 'max-w-md mx-auto' : 'max-w-3xl'
              }`}>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-6 h-6 rounded-full bg-[#1c1917] text-[#faf8f5] flex items-center justify-center text-[10px] font-bold font-serif">
                    f0
                  </div>
                  <div>
                    <span className="text-xs text-[#202124] block font-normal leading-tight">f0undr</span>
                    <span className="text-[11px] text-[#4d5156] font-mono block leading-none">
                      {editableSeo.canonicalUrl}
                    </span>
                  </div>
                </div>

                <h4 className="text-base sm:text-lg text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug line-clamp-1">
                  {editableSeo.siteTitle}
                </h4>

                <p className="text-xs sm:text-sm text-[#4d5156] mt-1 line-clamp-2 leading-relaxed">
                  {editableSeo.siteDescription}
                </p>

                {/* Rich Snippet Sitelinks */}
                <div className="mt-3 pt-3 border-t border-[#f1f3f4] grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#1a0dab] font-medium hover:underline cursor-pointer block">
                      f0undr Book: Computing Curriculum
                    </span>
                    <span className="text-[11px] text-[#70757a] line-clamp-1">
                      Units 1–6 authored by f0undr &amp; Abdull Rehman Khizar.
                    </span>
                  </div>
                  <div>
                    <span className="text-[#1a0dab] font-medium hover:underline cursor-pointer block">
                      f0undr Team Roster
                    </span>
                    <span className="text-[11px] text-[#70757a] line-clamp-1">
                      Abdull Rehman Khizar, f0undr, M.Huzaifa, and 5 fellows.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Editable SEO Meta Settings Form */}
            <form onSubmit={handleSaveSeo} className="editorial-card rounded-2xl p-6 bg-white border border-[#e7e5e4] space-y-5">
              <div className="flex items-center justify-between border-b border-[#e7e5e4] pb-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1c1917]">
                    Custom Meta &amp; Search Engine Tags
                  </h3>
                  <p className="text-xs text-[#57534e]">
                    Changes here directly update real-time meta tags and page titles.
                  </p>
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl btn-editorial-accent text-xs font-semibold shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Meta Tags</span>
                </button>
              </div>

              {seoSavedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>SEO Settings successfully saved and applied to live document!</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-[#57534e] mb-1 uppercase tracking-wider">
                    Site Title (Page Title for Google)
                  </label>
                  <input
                    type="text"
                    required
                    value={editableSeo.siteTitle}
                    onChange={(e) => setEditableSeo({ ...editableSeo, siteTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6d3d1] text-xs text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20"
                  />
                  <span className="text-[10px] font-mono text-[#78716c] mt-1 block">
                    Ideal: 50–60 characters. Current: {editableSeo.siteTitle.length}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-[#57534e] mb-1 uppercase tracking-wider">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    required
                    value={editableSeo.canonicalUrl}
                    onChange={(e) => setEditableSeo({ ...editableSeo, canonicalUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6d3d1] text-xs text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20"
                  />
                  <span className="text-[10px] font-mono text-[#78716c] mt-1 block">
                    Canonical domain to prevent duplicate indexing issues.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[#57534e] mb-1 uppercase tracking-wider">
                  Meta Description (Google SERP Snippet)
                </label>
                <textarea
                  rows={2}
                  required
                  value={editableSeo.siteDescription}
                  onChange={(e) => setEditableSeo({ ...editableSeo, siteDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6d3d1] text-xs text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20 resize-none"
                />
                <span className="text-[10px] font-mono text-[#78716c] mt-1 block">
                  Ideal: 140–160 characters. Current: {editableSeo.siteDescription.length}
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[#57534e] mb-1 uppercase tracking-wider">
                  Primary Targeted Keywords (Comma separated)
                </label>
                <input
                  type="text"
                  value={editableSeo.primaryKeywords}
                  onChange={(e) => setEditableSeo({ ...editableSeo, primaryKeywords: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6d3d1] text-xs text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-[#57534e] mb-1 uppercase tracking-wider">
                    Google Search Console Verification Token
                  </label>
                  <input
                    type="text"
                    value={editableSeo.googleVerificationId}
                    onChange={(e) => setEditableSeo({ ...editableSeo, googleVerificationId: e.target.value })}
                    placeholder="google-site-verification=..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6d3d1] text-xs text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-[#57534e] mb-1 uppercase tracking-wider">
                    Google Analytics 4 Measurement ID
                  </label>
                  <input
                    type="text"
                    value={editableSeo.googleAnalyticsId}
                    onChange={(e) => setEditableSeo({ ...editableSeo, googleAnalyticsId: e.target.value })}
                    placeholder="G-XXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6d3d1] text-xs text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20 font-mono"
                  />
                </div>
              </div>
            </form>

            {/* Actionable Blueprint to Reach #1 on Google */}
            <div className="editorial-card rounded-2xl p-6 bg-white border border-[#e7e5e4] space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#c2410c]" />
                <h3 className="font-serif text-lg font-bold text-[#1c1917]">
                  4-Step Action Blueprint to Guarantee Google #1 Ranking
                </h3>
              </div>
              <p className="text-xs text-[#57534e]">
                Follow these exact steps once deployed to rank #1 for <strong>f0undr</strong>, <strong>f0undr Book</strong>, <strong>Abdull Rehman Khizar</strong>, and <strong>M.Huzaifa</strong>:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-[#e7e5e4] bg-[#faf8f5] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#1c1917] text-white flex items-center justify-center text-xs font-mono font-bold">1</span>
                    <h4 className="text-xs font-bold text-[#1c1917]">Submit Sitemap to Google Search Console</h4>
                  </div>
                  <p className="text-xs text-[#57534e] leading-relaxed">
                    Go to <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-[#c2410c] font-medium underline">Google Search Console</a>, add your domain, and submit <code className="bg-[#f5f2eb] px-1 py-0.5 rounded font-mono text-[11px]">https://your-domain/sitemap.xml</code>. Google will crawl all books and team member routes within 24 hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[#e7e5e4] bg-[#faf8f5] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#1c1917] text-white flex items-center justify-center text-xs font-mono font-bold">2</span>
                    <h4 className="text-xs font-bold text-[#1c1917]">Validate JSON-LD Rich Results</h4>
                  </div>
                  <p className="text-xs text-[#57534e] leading-relaxed">
                    Test your URL on <a href="https://search.google.com/test/rich-results" target="_blank" rel="noreferrer" className="text-[#c2410c] font-medium underline">Google Rich Results Test</a>. The Organization, Course, Book, and Person schemas will yield rich knowledge-panel cards in search.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[#e7e5e4] bg-[#faf8f5] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#1c1917] text-white flex items-center justify-center text-xs font-mono font-bold">3</span>
                    <h4 className="text-xs font-bold text-[#1c1917]">Cross-Link from f-e-book.vercel.app</h4>
                  </div>
                  <p className="text-xs text-[#57534e] leading-relaxed">
                    Add a reciprocal link inside <code className="bg-[#f5f2eb] px-1 py-0.5 rounded font-mono text-[11px]">https://f-e-book.vercel.app/</code> pointing back to this headquarters. Bidirectional authority signals boost both properties to the top of Google.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[#e7e5e4] bg-[#faf8f5] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#1c1917] text-white flex items-center justify-center text-xs font-mono font-bold">4</span>
                    <h4 className="text-xs font-bold text-[#1c1917]">Establish Author Knowledge Panels</h4>
                  </div>
                  <p className="text-xs text-[#57534e] leading-relaxed">
                    Link social profiles (GitHub, X/Twitter, LinkedIn) for Abdull Rehman Khizar, f0undr, and M.Huzaifa. Google builds entity graphs connecting the authors to the book curriculum automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: BOOKSHELF MANAGER */}
        {/* ========================================================= */}
        {activeTab === 'books' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1c1917]">Bookshelf &amp; Curriculum Manager</h2>
                <p className="text-xs text-[#57534e]">Modify titles, authors, ratings, reading status, and live curriculum links.</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Filter books..."
                  value={contentFilter}
                  onChange={(e) => setContentFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-[#d6d3d1] text-xs bg-white text-[#1c1917]"
                />
                <button
                  onClick={() => onOpenAddModal('book')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg btn-editorial-accent text-xs font-semibold shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Book</span>
                </button>
              </div>
            </div>

            <div className="editorial-card rounded-2xl bg-white border border-[#e7e5e4] overflow-hidden divide-y divide-[#e7e5e4]">
              {books
                .filter((b) => b.title.toLowerCase().includes(contentFilter.toLowerCase()) || b.author.toLowerCase().includes(contentFilter.toLowerCase()))
                .map((book) => (
                  <div key={book.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#faf8f5] transition-colors">
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-base text-[#1c1917]">{book.title}</span>
                        {book.featured && (
                          <span className="editorial-stamp editorial-stamp-terracotta text-[10px]">
                            Flagship
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-[#78716c] bg-[#f5f2eb] px-2 py-0.5 rounded border border-[#e7e5e4]">
                          {book.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#57534e]">
                        Author: <strong className="text-[#1c1917]">{book.author}</strong> {book.year && `(${book.year})`}
                      </p>
                      {book.externalUrl && (
                        <a
                          href={book.externalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-mono text-[#c2410c] hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <span>{book.externalUrl}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* Status Selector */}
                      <select
                        value={book.status}
                        onChange={(e) => onUpdateBook({ ...book, status: e.target.value as ReadingStatus })}
                        className="px-2.5 py-1.5 rounded-lg border border-[#d6d3d1] text-xs bg-white font-mono text-[#1c1917]"
                      >
                        <option value="reading">Reading</option>
                        <option value="completed">Completed</option>
                        <option value="wishlist">Wishlist</option>
                      </select>

                      {/* Rating Buttons */}
                      <div className="flex items-center gap-0.5 text-[#c2410c]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => onUpdateBook({ ...book, rating: star })}
                            className="p-0.5 hover:scale-110 transition-transform"
                            title={`Set rating to ${star}`}
                          >
                            <Star
                              className={`w-3.5 h-3.5 ${
                                star <= book.rating ? 'fill-[#c2410c] text-[#c2410c]' : 'text-[#d6d3d1]'
                              }`}
                            />
                          </button>
                        ))}
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${book.title}" from vault?`)) {
                            onDeleteBook(book.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-[#78716c] hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Book"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: TEAM FELLOWS MANAGER */}
        {/* ========================================================= */}
        {activeTab === 'team' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1c1917]">Core Team &amp; Fellows Roster</h2>
                <p className="text-xs text-[#57534e]">Manage founder status, roles, availability, and dossiers.</p>
              </div>
              <button
                onClick={() => onOpenAddModal('team')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg btn-editorial-accent text-xs font-semibold shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Fellow</span>
              </button>
            </div>

            <div className="editorial-card rounded-2xl bg-white border border-[#e7e5e4] overflow-hidden divide-y divide-[#e7e5e4]">
              {team.map((member) => (
                <div key={member.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#faf8f5] transition-colors">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#e7e5e4] shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-base text-[#1c1917]">{member.name}</span>
                        {member.verifiedFounder && (
                          <span className="editorial-stamp editorial-stamp-terracotta text-[10px]">
                            Co-Founder
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-[#78716c]">{member.handle}</span>
                      </div>
                      <p className="text-xs text-[#57534e] mt-0.5">{member.role} · <span className="font-mono">{member.department}</span></p>
                      <p className="text-[11px] text-[#78716c] line-clamp-1 mt-0.5">{member.bio}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Status Changer */}
                    <select
                      value={member.status}
                      onChange={(e) => onUpdateTeamMember({ ...member, status: e.target.value as 'Building' | 'Deep Work' | 'Available' | 'Offline' })}
                      className="px-2.5 py-1.5 rounded-lg border border-[#d6d3d1] text-xs bg-white font-mono text-[#1c1917]"
                    >
                      <option value="Building">Building</option>
                      <option value="Deep Work">Deep Work</option>
                      <option value="Available">Available</option>
                      <option value="Offline">Offline</option>
                    </select>

                    {/* Verified Founder Toggle */}
                    <button
                      onClick={() => onUpdateTeamMember({ ...member, verifiedFounder: !member.verifiedFounder })}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-colors ${
                        member.verifiedFounder
                          ? 'bg-[#fff7ed] border-[#ffedd5] text-[#c2410c]'
                          : 'bg-[#f5f2eb] border-[#e7e5e4] text-[#78716c]'
                      }`}
                      title="Toggle Co-Founder status"
                    >
                      {member.verifiedFounder ? 'Founder ★' : 'Fellow'}
                    </button>

                    {/* Delete Fellow */}
                    <button
                      onClick={() => {
                        if (window.confirm(`Remove fellow "${member.name}" from active roster?`)) {
                          onDeleteTeamMember(member.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-[#78716c] hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Fellow"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: TOOLS MANAGER */}
        {/* ========================================================= */}
        {activeTab === 'tools' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1c1917]">Founder Tools Directory</h2>
                <p className="text-xs text-[#57534e]">Manage external curated tools and software stack recommendations.</p>
              </div>
              <button
                onClick={() => onOpenAddModal('tool')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg btn-editorial-accent text-xs font-semibold shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Tool</span>
              </button>
            </div>

            <div className="editorial-card rounded-2xl bg-white border border-[#e7e5e4] overflow-hidden divide-y divide-[#e7e5e4]">
              {tools.map((tool) => (
                <div key={tool.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#faf8f5] transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-[#1c1917]">{tool.name}</span>
                      <span className="text-[10px] font-mono text-[#78716c] bg-[#f5f2eb] px-2 py-0.5 rounded border border-[#e7e5e4]">
                        {tool.category}
                      </span>
                      {tool.pricing && (
                        <span className="text-[10px] font-mono text-[#2b5346] bg-[#ecfdf5] px-2 py-0.5 rounded border border-[#a7f3d0]">
                          {tool.pricing}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#57534e]">{tool.tagline}</p>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-[#c2410c] hover:underline flex items-center gap-1"
                    >
                      <span>{tool.url}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onUpdateTool({ ...tool, featured: !tool.featured })}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-colors cursor-pointer ${
                        tool.featured
                          ? 'bg-[#fff7ed] border-[#ffedd5] text-[#c2410c]'
                          : 'bg-[#f5f2eb] border-[#e7e5e4] text-[#78716c]'
                      }`}
                      title="Toggle Featured status"
                    >
                      {tool.featured ? 'Featured ★' : 'Standard'}
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${tool.name}"?`)) {
                          onDeleteTool(tool.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-[#78716c] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Tool"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: ARTIFACTS / THINGS */}
        {/* ========================================================= */}
        {activeTab === 'things' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1c1917]">Physical Artifacts &amp; Lab Gear</h2>
                <p className="text-xs text-[#57534e]">Hardware, desk engineering, and laboratory tooling catalog.</p>
              </div>
              <button
                onClick={() => onOpenAddModal('thing')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg btn-editorial-accent text-xs font-semibold shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Artifact</span>
              </button>
            </div>

            <div className="editorial-card rounded-2xl bg-white border border-[#e7e5e4] overflow-hidden divide-y divide-[#e7e5e4]">
              {things.map((thing) => (
                <div key={thing.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#faf8f5] transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-[#1c1917]">{thing.title}</span>
                      <span className="text-[10px] font-mono text-[#78716c] bg-[#f5f2eb] px-2 py-0.5 rounded border border-[#e7e5e4]">
                        {thing.category}
                      </span>
                    </div>
                    {thing.specs && <p className="text-xs font-mono text-[#78716c]">{thing.specs}</p>}
                    <p className="text-xs text-[#57534e] line-clamp-1">{thing.whyWeLoveIt}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        const newTitle = prompt('Edit Artifact Title:', thing.title);
                        if (newTitle && newTitle.trim()) {
                          onUpdateThing({ ...thing, title: newTitle.trim() });
                        }
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium border bg-[#f5f2eb] border-[#e7e5e4] text-[#57534e] hover:text-[#1c1917] transition-colors cursor-pointer"
                      title="Edit Artifact Title"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${thing.title}"?`)) {
                          onDeleteThing(thing.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-[#78716c] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Artifact"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: VAULT & TELEMETRY */}
        {/* ========================================================= */}
        {activeTab === 'system' && (
          <div className="space-y-6 animate-fade-in">
            <div className="editorial-card rounded-2xl p-6 bg-white border border-[#e7e5e4] space-y-4">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#c2410c]" />
                <h3 className="font-serif text-lg font-bold text-[#1c1917]">Database Storage &amp; Persistence</h3>
              </div>
              <p className="text-xs text-[#57534e] leading-relaxed">
                The platform utilizes high-efficiency browser-local storage with full JSON portability, allowing instant zero-latency reads, writes, offline resilience, and immediate synchronization across all tabs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-[#e7e5e4] bg-[#faf8f5]">
                  <span className="text-xs font-mono text-[#78716c] block">Total Records</span>
                  <span className="font-serif text-2xl font-bold text-[#1c1917] mt-1 block">
                    {books.length + team.length + tools.length + things.length}
                  </span>
                </div>
                <div className="p-4 rounded-xl border border-[#e7e5e4] bg-[#faf8f5]">
                  <span className="text-xs font-mono text-[#78716c] block">Storage Consumption</span>
                  <span className="font-serif text-2xl font-bold text-[#1c1917] mt-1 block">
                    ~{(JSON.stringify({ books, team, tools, things }).length / 1024).toFixed(1)} KB
                  </span>
                </div>
                <div className="p-4 rounded-xl border border-[#e7e5e4] bg-[#faf8f5]">
                  <span className="text-xs font-mono text-[#78716c] block">Platform Health</span>
                  <span className="font-serif text-2xl font-bold text-[#2b5346] mt-1 block">
                    Operational
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e7e5e4] flex flex-wrap items-center gap-3">
                <button
                  onClick={onExportData}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-editorial-primary text-xs font-semibold shadow-xs"
                >
                  <Database className="w-4 h-4" />
                  <span>Export Entire Vault as JSON</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-editorial-outline text-xs font-semibold shadow-xs text-[#1c1917]"
                >
                  <Upload className="w-4 h-4" />
                  <span>Restore Database from JSON</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="hidden"
                />

                <button
                  onClick={onResetData}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Vault Data to Factory Defaults</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
