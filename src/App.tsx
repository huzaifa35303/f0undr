import { useState, useEffect } from 'react';
import type { Book, CuratedTool, TeamMember, Thing, AuthUser, SeoSettings, AuditLogItem } from './types';
import {
  INITIAL_BOOKS,
  INITIAL_CURATED_TOOLS,
  INITIAL_TEAM,
  INITIAL_THINGS,
  INITIAL_VENTURES,
  DEFAULT_SEO_SETTINGS,
  INITIAL_AUDIT_LOGS,
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PortfolioStorySection } from './components/PortfolioStorySection';
import { TeamSection } from './components/TeamSection';
import { BooksSection } from './components/BooksSection';
import { ThingsSection } from './components/ThingsSection';
import { ToolsSection } from './components/ToolsSection';
import { SearchModal } from './components/SearchModal';
import { AddModal } from './components/AddModal';
import { LoginModal } from './components/LoginModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { ArrowUpRight, Award, BookOpen, GraduationCap, Maximize2, Brain, ExternalLink } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [addModalDefaultTab, setAddModalDefaultTab] = useState<'book' | 'tool' | 'team' | 'thing'>('book');
  const [selectedCurriculum, setSelectedCurriculum] = useState<'computer' | 'urdu' | 'mind'>('computer');

  // Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('f0undr_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // SEO Settings State
  const [seoSettings, setSeoSettings] = useState<SeoSettings>(() => {
    try {
      const saved = localStorage.getItem('f0undr_seo_settings_v2');
      if (saved) return JSON.parse(saved);
      const currentOrigin =
        typeof window !== 'undefined' && window.location.origin.includes('vercel.app')
          ? window.location.origin
          : DEFAULT_SEO_SETTINGS.canonicalUrl;
      return { ...DEFAULT_SEO_SETTINGS, canonicalUrl: currentOrigin };
    } catch {
      return DEFAULT_SEO_SETTINGS;
    }
  });

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    try {
      const saved = localStorage.getItem('f0undr_audit_logs');
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  // Persistent Content States (v3 cache bust ensures fresh updates)
  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem('f0undr_books_editorial_v3');
      if (saved) {
        const parsed: Book[] = JSON.parse(saved);
        const missing = INITIAL_BOOKS.filter((ib) => !parsed.some((b) => b.id === ib.id));
        if (missing.length > 0) {
          return [...INITIAL_BOOKS.filter((ib) => ib.featured), ...parsed.filter((b) => !b.featured)];
        }
        return parsed;
      }
      return INITIAL_BOOKS;
    } catch {
      return INITIAL_BOOKS;
    }
  });

  const [tools, setTools] = useState<CuratedTool[]>(() => {
    try {
      const saved = localStorage.getItem('f0undr_tools_editorial_v3');
      if (saved) {
        const parsed: CuratedTool[] = JSON.parse(saved);
        const missing = INITIAL_CURATED_TOOLS.filter((it) => !parsed.some((t) => t.id === it.id));
        if (missing.length > 0) {
          return [...INITIAL_CURATED_TOOLS.filter((it) => it.featured), ...parsed.filter((t) => !t.featured)];
        }
        return parsed;
      }
      return INITIAL_CURATED_TOOLS;
    } catch {
      return INITIAL_CURATED_TOOLS;
    }
  });

  const [team, setTeam] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem('f0undr_team_editorial_v2');
      return saved ? JSON.parse(saved) : INITIAL_TEAM;
    } catch {
      return INITIAL_TEAM;
    }
  });

  const [things, setThings] = useState<Thing[]>(() => {
    try {
      const saved = localStorage.getItem('f0undr_things_editorial_v2');
      return saved ? JSON.parse(saved) : INITIAL_THINGS;
    } catch {
      return INITIAL_THINGS;
    }
  });

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('f0undr_books_editorial_v3', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('f0undr_tools_editorial_v3', JSON.stringify(tools));
  }, [tools]);

  useEffect(() => {
    localStorage.setItem('f0undr_team_editorial_v2', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('f0undr_things_editorial_v2', JSON.stringify(things));
  }, [things]);

  useEffect(() => {
    localStorage.setItem('f0undr_seo_settings', JSON.stringify(seoSettings));
    // Dynamically apply to active document head
    document.title = seoSettings.siteTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', seoSettings.siteDescription);
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.setAttribute('content', seoSettings.primaryKeywords);
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.setAttribute('href', seoSettings.canonicalUrl);
  }, [seoSettings]);

  useEffect(() => {
    localStorage.setItem('f0undr_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('f0undr_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('f0undr_auth_user');
    }
  }, [currentUser]);

  // Global keyboard shortcut for search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Guard access to Admin: support /admin, #admin, and #login
  useEffect(() => {
    const handleRoute = () => {
      const isPathAdmin = window.location.pathname === '/admin' || window.location.pathname === '/admin/';
      const isHashAdmin = window.location.hash === '#admin' || window.location.hash === '#login';
      if (isPathAdmin || isHashAdmin) {
        if (currentUser) {
          setIsAdminOpen(true);
        } else {
          setIsLoginOpen(true);
        }
      }
    };
    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, [currentUser]);

  // Audit Logger
  const addAuditLog = (action: string, target: string) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      action,
      target,
      performedBy: currentUser ? currentUser.name : 'System Admin',
      role: currentUser ? currentUser.role : 'founder',
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 30)]);
  };

  // Auth Handlers
  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    addAuditLog('Authorized Access Granted', `Session established for ${user.name}`);
    setIsAdminOpen(true);
  };

  const handleLogout = () => {
    if (currentUser) {
      addAuditLog('User Signed Out', `Session ended for ${currentUser.name}`);
    }
    setCurrentUser(null);
    setIsAdminOpen(false);
  };

  // Handlers for Books
  const handleAddBook = (book: Book) => {
    setBooks([book, ...books]);
    addAuditLog('Book Created', book.title);
  };

  const handleUpdateBook = (updated: Book) => {
    setBooks(books.map((b) => (b.id === updated.id ? updated : b)));
    addAuditLog('Book Updated', updated.title);
  };

  const handleDeleteBook = (id: string) => {
    const target = books.find((b) => b.id === id);
    setBooks(books.filter((b) => b.id !== id));
    if (target) addAuditLog('Book Removed', target.title);
  };

  // Handlers for Tools
  const handleAddTool = (tool: CuratedTool) => {
    setTools([tool, ...tools]);
    addAuditLog('Tool Created', tool.name);
  };

  const handleUpdateTool = (updated: CuratedTool) => {
    setTools(tools.map((t) => (t.id === updated.id ? updated : t)));
    addAuditLog('Tool Updated', updated.name);
  };

  const handleDeleteTool = (id: string) => {
    const target = tools.find((t) => t.id === id);
    setTools(tools.filter((t) => t.id !== id));
    if (target) addAuditLog('Tool Removed', target.name);
  };

  // Handlers for Team
  const handleAddTeamMember = (member: TeamMember) => {
    setTeam([...team, member]);
    addAuditLog('Fellow Enrolled', member.name);
  };

  const handleUpdateTeamMember = (updated: TeamMember) => {
    setTeam(team.map((m) => (m.id === updated.id ? updated : m)));
    addAuditLog('Fellow Profile Updated', updated.name);
  };

  const handleDeleteTeamMember = (id: string) => {
    const target = team.find((m) => m.id === id);
    setTeam(team.filter((m) => m.id !== id));
    if (target) addAuditLog('Fellow Removed', target.name);
  };

  // Handlers for Things
  const handleAddThing = (thing: Thing) => {
    setThings([thing, ...things]);
    addAuditLog('Artifact Added', thing.title);
  };

  const handleUpdateThing = (updated: Thing) => {
    setThings(things.map((t) => (t.id === updated.id ? updated : t)));
    addAuditLog('Artifact Updated', updated.title);
  };

  const handleDeleteThing = (id: string) => {
    const target = things.find((t) => t.id === id);
    setThings(things.filter((t) => t.id !== id));
    if (target) addAuditLog('Artifact Removed', target.title);
  };

  // SEO Update Handler
  const handleUpdateSeoSettings = (newSettings: SeoSettings) => {
    setSeoSettings(newSettings);
    addAuditLog('SEO Meta Updated', 'Google Rank #1 Parameters Recalibrated');
  };

  // Export / Backup JSON
  const handleExportData = () => {
    const vault = {
      edition: 'f0undr Warm Editorial Magazine 2026',
      exportDate: new Date().toISOString(),
      seoSettings,
      books,
      tools,
      team,
      things,
      auditLogs,
    };
    const blob = new Blob([JSON.stringify(vault, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `f0undr-editorial-vault-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addAuditLog('Database Exported', 'Full JSON Vault Backup Created');
  };

  // Import / Restore JSON
  const handleImportData = (data: unknown) => {
    const typed = data as {
      books?: Book[];
      tools?: CuratedTool[];
      team?: TeamMember[];
      things?: Thing[];
      seoSettings?: SeoSettings;
    };
    if (typed.books && Array.isArray(typed.books)) setBooks(typed.books);
    if (typed.tools && Array.isArray(typed.tools)) setTools(typed.tools);
    if (typed.team && Array.isArray(typed.team)) setTeam(typed.team);
    if (typed.things && Array.isArray(typed.things)) setThings(typed.things);
    if (typed.seoSettings) setSeoSettings(typed.seoSettings);
    addAuditLog('Database Restored', 'Imported external JSON backup');
    alert('f0undr Vault successfully restored!');
  };

  // Reset to Defaults
  const handleResetData = () => {
    if (window.confirm('Reset all vault data back to initial defaults?')) {
      setBooks(INITIAL_BOOKS);
      setTools(INITIAL_CURATED_TOOLS);
      setTeam(INITIAL_TEAM);
      setThings(INITIAL_THINGS);
      setSeoSettings(DEFAULT_SEO_SETTINGS);
      localStorage.removeItem('f0undr_books_editorial_v3');
      localStorage.removeItem('f0undr_tools_editorial_v3');
      localStorage.removeItem('f0undr_team_editorial_v2');
      localStorage.removeItem('f0undr_things_editorial_v2');
      localStorage.removeItem('f0undr_seo_settings');
      localStorage.removeItem('f0undr_seo_settings_v2');
      localStorage.removeItem('f0undr_audit_logs');
      addAuditLog('System Factory Reset', 'All records returned to default seed values');
      alert('Vault reset to defaults.');
    }
  };

  const openAddFor = (tab: 'book' | 'tool' | 'team' | 'thing') => {
    setAddModalDefaultTab(tab);
    setIsAddOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] flex flex-col selection:bg-[#c2410c]/15 selection:text-[#9a3412]">
      {/* Top Fixed Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        counts={{
          books: books.length,
          tools: tools.length,
          team: team.length,
          things: things.length,
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* OVERVIEW / PORTFOLIO & STORY */}
        {activeTab === 'overview' && (
          <div>
            <HeroSection
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              stats={{
                booksCount: books.length,
                toolsCount: tools.length,
                teamCount: team.length,
                venturesCount: INITIAL_VENTURES.length,
              }}
            />

            {/* TRIPLE FLAGSHIP CURRICULUM SPOTLIGHT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Flagship 1: Computer Science */}
                <div className="editorial-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group flex flex-col justify-between">
                  <div className="space-y-3.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="editorial-stamp editorial-stamp-terracotta inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#c2410c] animate-pulse" />
                        FLAGSHIP PRODUCT · LIVE
                      </span>
                      <span className="text-xs font-mono text-[#78716c] bg-[#f5f2eb] px-2.5 py-0.5 rounded-md border border-[#e7e5e4]">
                        Units 1 to 6
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#1c1917] tracking-tight">
                      f0undr Book: Computing &amp; Technology
                    </h3>
                    <p className="text-xs text-[#c2410c] font-mono font-medium">
                      Authors: <strong className="text-[#1c1917]">f0undr</strong> &amp; <strong className="text-[#1c1917]">Abdull Rehman Khizar</strong> (with <strong className="text-[#1c1917]">M.Huzaifa</strong>)
                    </p>
                    <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                      Complete modern computing textbook covering hardware IPO cycle, digital productivity, algorithmic thinking, Scratch visual coding, cybersecurity, and entrepreneurship.
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['Unit 1: Hardware', 'Unit 2: Digital Skills', 'Unit 3: Algorithms', 'Unit 4: Scratch', 'Unit 5: Cyber', 'Unit 6: Startup'].map((u, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f5f2eb] text-[#57534e] border border-[#e7e5e4]">
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-[#e7e5e4]">
                    <button
                      onClick={() => {
                        setSelectedCurriculum('computer');
                        setActiveTab('curriculum');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl btn-editorial-accent text-xs font-semibold shadow-xs"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Online (Units 1–6)</span>
                    </button>
                    <a
                      href="/book/"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2.5 rounded-xl btn-editorial-outline text-xs font-medium flex items-center gap-1"
                    >
                      <span>New Tab</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Flagship 2: Urdu Literature */}
                <div className="editorial-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group flex flex-col justify-between">
                  <div className="space-y-3.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="editorial-stamp editorial-stamp-terracotta inline-flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-[#c2410c]" />
                        وفاقی تعلیمی بورڈ (FBISE) · 20 ابواب
                      </span>
                      <span className="text-xs font-mono text-[#78716c] bg-[#f5f2eb] px-2.5 py-0.5 rounded-md border border-[#e7e5e4]">
                        جماعت ہفتم · مکمل نصاب
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#1c1917] tracking-tight">
                      صحیفۂ اردو: نصاب و ادب (جماعتِ ہفتم)
                    </h3>
                    <p className="text-xs text-[#c2410c] font-mono font-medium">
                      مرتبین: <strong className="text-[#1c1917]">Huzaifa</strong> اور <strong className="text-[#1c1917]">f0undr Team</strong>
                    </p>
                    <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                      وفاقی بورڈ کے نصاب پر مبنی مستند ادبی شاہکار، کلامِ اقبال، فصیح تشریحات، فرہنگ و لغت، اور امتحانی معروضی مشقیں۔ 20 مکمل ابواب بمع مصور خاکے اور اصل درسی کتاب (PDF)۔
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['حمد باری تعالیٰ', 'نعت رسول ﷺ', 'طبِ نبوی', 'بابائے اردو', 'کلام اقبال', 'قواعد و انشا'].map((u, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f5f2eb] text-[#57534e] border border-[#e7e5e4]">
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-[#e7e5e4]">
                    <button
                      onClick={() => {
                        setSelectedCurriculum('urdu');
                        setActiveTab('curriculum');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl btn-editorial-accent text-xs font-semibold shadow-xs"
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>مطالعہ کریں (20 ابواب)</span>
                    </button>
                    <a
                      href="/urdu-book/"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2.5 rounded-xl btn-editorial-outline text-xs font-medium flex items-center gap-1"
                    >
                      <span>New Tab</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Flagship 3: Mental Mastery */}
                <div className="editorial-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group flex flex-col justify-between">
                  <div className="space-y-3.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="editorial-stamp editorial-stamp-terracotta inline-flex items-center gap-1.5">
                        <Brain className="w-3.5 h-3.5 text-[#c2410c]" />
                        ACCELERATED LEARNING · LIVE
                      </span>
                      <span className="text-xs font-mono text-[#78716c] bg-[#f5f2eb] px-2.5 py-0.5 rounded-md border border-[#e7e5e4]">
                        Units 1 to 6 · Cognitive
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#1c1917] tracking-tight">
                      The Art of Mental Mastery
                    </h3>
                    <p className="text-xs text-[#c2410c] font-mono font-medium">
                      Author: <strong className="text-[#1c1917]">f0undr</strong>
                    </p>
                    <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                      Masterclass on accelerated learning, neuroplasticity, memory palaces (Method of Loci), limbic body language, behavioral deception detection, and mental models.
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['Unit 1: Fast Learn', 'Unit 2: Memory', 'Unit 3: Body Lang', 'Unit 4: Deception', 'Unit 5: Persuasion', 'Unit 6: Mental Models'].map((u, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f5f2eb] text-[#57534e] border border-[#e7e5e4]">
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-6 mt-6 border-t border-[#e7e5e4]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedCurriculum('mind');
                          setActiveTab('curriculum');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl btn-editorial-accent text-xs font-semibold shadow-xs"
                      >
                        <Brain className="w-3.5 h-3.5" />
                        <span>Read Online</span>
                      </button>
                      <a
                        href="/mind-mastery/"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl btn-editorial-outline text-xs font-medium flex items-center justify-center"
                        title="Open Reader in New Tab"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <a
                      href="https://fmm-e-book.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono text-[#c2410c] hover:bg-[#ffedd5] border border-[#fed7aa] transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>fmm-e-book.vercel.app</span>
                      <ArrowUpRight className="w-3 h-3 opacity-70" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <PortfolioStorySection
              ventures={INITIAL_VENTURES}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Quick Teaser: f0undr Team Preview */}
            <div className="border-t border-[#e7e5e4] bg-[#f5f2eb]/40 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <span className="text-xs font-mono text-[#c2410c] uppercase tracking-wider block mb-1 font-semibold">
                      Core Collective · 08 Active Fellows
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">The f0undr Team</h3>
                    <p className="text-xs sm:text-sm text-[#57534e] mt-1 font-normal">
                      Led by <strong className="text-[#1c1917]">Abdull Rehman Khizar</strong>, <strong className="text-[#1c1917]">f0undr</strong>, <strong className="text-[#1c1917]">M.Huzaifa</strong>, and our principal research leads.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('team');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-[#c2410c] hover:text-[#9a3412] flex items-center gap-1 shrink-0 font-mono"
                  >
                    View All {team.length} Members →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {team.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => {
                        setActiveTab('team');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`editorial-card editorial-card-hover rounded-xl p-4 cursor-pointer flex items-center gap-3.5 ${
                        member.verifiedFounder
                          ? 'border-[#c2410c]/30 ring-1 ring-[#c2410c]/10'
                          : 'border-[#e7e5e4]'
                      }`}
                    >
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className={`w-12 h-12 rounded-xl object-cover shrink-0 border ${
                          member.verifiedFounder ? 'border-[#c2410c]' : 'border-[#e7e5e4]'
                        }`}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            member.name
                          )}&background=1c1917&color=faf8f5`;
                        }}
                      />
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-serif font-bold text-[#1c1917] truncate">{member.name}</h4>
                          {member.verifiedFounder && (
                            <Award className="w-3.5 h-3.5 text-[#c2410c] shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-[#57534e] truncate">{member.role}</p>
                        <span className="text-[10px] font-mono text-[#2b5346] flex items-center gap-1 mt-0.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2b5346]" />
                          {member.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Teaser: Featured Books & Tools Banner */}
            <div className="border-t border-[#e7e5e4] py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Bookshelf Teaser Card */}
                  <div
                    onClick={() => {
                      setActiveTab('books');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="editorial-card editorial-card-hover rounded-2xl p-8 cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-xs font-mono text-[#c2410c] uppercase tracking-wider block mb-2 font-semibold">
                        Knowledge Architecture · Vault Library
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[#1c1917] mb-2 group-hover:text-[#c2410c] transition-colors">
                        Explore {books.length} Books &amp; Interactive Curriculum
                      </h3>
                      <p className="text-xs text-[#57534e] leading-relaxed">
                        Features our flagship Computing &amp; Technology curriculum and صحیفۂ اردو alongside seminal masterworks on systems, strategy, and engineering.
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[#c2410c] mt-6 flex items-center gap-1 group-hover:translate-x-1 transition-transform font-mono">
                      Open Bookshelf →
                    </span>
                  </div>

                  {/* Tools Teaser Card */}
                  <div
                    onClick={() => {
                      setActiveTab('tools');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="editorial-card editorial-card-hover rounded-2xl p-8 cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-xs font-mono text-[#2b5346] uppercase tracking-wider block mb-2 font-semibold">
                        Founder Arsenal · Productivity Engines
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[#1c1917] mb-2 group-hover:text-[#2b5346] transition-colors">
                        Launch Live Founder Utilities &amp; Arsenal
                      </h3>
                      <p className="text-xs text-[#57534e] leading-relaxed">
                        Includes Deep-Work Focus Timer, Markdown Scratchpad, Startup Idea Viability Matrix, and SaaS Economics Forecaster.
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[#2b5346] mt-6 flex items-center gap-1 group-hover:translate-x-1 transition-transform font-mono">
                      Open Founder Arsenal →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CURRICULUM TAB */}
        {activeTab === 'curriculum' && (
          <div className="pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Dual Curriculum Switcher */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#f5f2eb] rounded-xl border border-[#e7e5e4] w-fit mb-6">
                <button
                  onClick={() => setSelectedCurriculum('computer')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    selectedCurriculum === 'computer'
                      ? 'bg-[#1c1917] text-[#faf8f5] shadow-xs'
                      : 'text-[#57534e] hover:text-[#1c1917]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Computer Science (Units 1–6)</span>
                </button>

                <button
                  onClick={() => setSelectedCurriculum('urdu')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    selectedCurriculum === 'urdu'
                      ? 'bg-[#1c1917] text-[#faf8f5] shadow-xs'
                      : 'text-[#57534e] hover:text-[#1c1917]'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>صحیفۂ اردو (FBISE Grade 7)</span>
                </button>

                <button
                  onClick={() => setSelectedCurriculum('mind')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    selectedCurriculum === 'mind'
                      ? 'bg-[#1c1917] text-[#faf8f5] shadow-xs'
                      : 'text-[#57534e] hover:text-[#1c1917]'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>The Art of Mental Mastery</span>
                </button>
              </div>

              {selectedCurriculum === 'computer' && (
                <>
                  {/* Header Bar */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="editorial-stamp editorial-stamp-terracotta inline-flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-[#c2410c]" />
                          FLAGSHIP CURRICULUM · UNITS 1 TO 6
                        </span>
                        <span className="text-xs font-mono text-[#78716c] bg-[#f5f2eb] px-2.5 py-0.5 rounded-md border border-[#e7e5e4]">
                          Complete Interactive Edition
                        </span>
                      </div>
                      <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1c1917] tracking-tight">
                        f0undr Book: <em className="italic text-[#c2410c] font-normal">Computing &amp; Technology</em>
                      </h2>
                      <p className="text-[#57534e] text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
                        Authored by <strong className="text-[#1c1917]">Huzaifa</strong> &amp; the <strong className="text-[#1c1917]">f0undr Team</strong> (with <strong className="text-[#1c1917]">f0undr</strong> &amp; <strong className="text-[#1c1917]">Abdull Rehman Khizar</strong>). Complete computing curriculum with interactive diagrams, quizzes, flashcards, and student lab workbooks.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <a
                        href="/book/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-editorial-accent text-xs font-semibold shadow-xs transition-all hover:-translate-y-0.5"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Open Full Screen in New Tab</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Quick Jump Unit Strip */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none text-xs font-mono">
                    {[
                      { label: 'Unit 1: Hardware', hash: 'unit-one' },
                      { label: 'Unit 2: Digital Skills', hash: 'unit-two' },
                      { label: 'Unit 3: Algorithms', hash: 'unit-three' },
                      { label: 'Unit 4: Scratch Coding', hash: 'unit-four' },
                      { label: 'Unit 5: Cybersecurity', hash: 'unit-five' },
                      { label: 'Unit 6: Entrepreneurship', hash: 'unit-six' },
                      { label: 'Flashcards', hash: 'flashcards' },
                      { label: 'Glossary', hash: 'glossary' },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          const iframe = document.getElementById('curriculum-frame') as HTMLIFrameElement;
                          if (iframe && iframe.contentWindow) {
                            iframe.contentWindow.location.hash = item.hash;
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#f5f2eb] hover:bg-[#ffedd5] text-[#57534e] hover:text-[#c2410c] border border-[#e7e5e4] shrink-0 transition-colors cursor-pointer font-medium"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Embedded Interactive Reader */}
                  <div className="editorial-card rounded-2xl overflow-hidden border border-[#e7e5e4] shadow-md bg-white">
                    <iframe
                      id="curriculum-frame"
                      src="/book/index.html"
                      title="f0undr Book: Computing & Technology Curriculum"
                      className="w-full h-[85vh] border-0"
                    />
                  </div>
                </>
              )}

              {selectedCurriculum === 'urdu' && (
                <>
                  {/* Urdu Header Bar */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="editorial-stamp editorial-stamp-terracotta inline-flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-[#c2410c]" />
                          وفاقی تعلیمی بورڈ نصاب (FBISE)
                        </span>
                        <span className="text-xs font-mono text-[#78716c] bg-[#f5f2eb] px-2.5 py-0.5 rounded-md border border-[#e7e5e4]">
                          جماعتِ ہفتم · مکمل ڈیجیٹل ایڈیشن
                        </span>
                      </div>
                      <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1c1917] tracking-tight">
                        صحیفۂ اردو: <em className="italic text-[#c2410c] font-normal">نصاب و ادب</em>
                      </h2>
                      <p className="text-[#57534e] text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
                        وفاقی بورڈ کے نصاب پر مبنی منتخب ادبی شاہکار، کلامِ اقبال، فصیح تشریحات، فرہنگ و لغت، اور معروضی امتحانی مشقیں۔ ترتیب و پیشکش: <strong className="text-[#1c1917]">Huzaifa</strong> اور <strong className="text-[#1c1917]">f0undr Team</strong>۔
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <a
                        href="/urdu-book/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-editorial-accent text-xs font-semibold shadow-xs transition-all hover:-translate-y-0.5"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>مکمل اسکرین پر مطالعہ کریں (New Tab)</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Embedded Urdu Interactive Reader */}
                  <div className="editorial-card rounded-2xl overflow-hidden border border-[#e7e5e4] shadow-md bg-white">
                    <iframe
                      id="urdu-curriculum-frame"
                      src="/urdu-book/index.html"
                      title="صحیفۂ اردو: نصاب و ادب (جماعت ہفتم)"
                      className="w-full h-[85vh] border-0"
                    />
                  </div>
                </>
              )}

              {selectedCurriculum === 'mind' && (
                <>
                  {/* Mental Mastery Header Bar */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="editorial-stamp editorial-stamp-terracotta inline-flex items-center gap-1.5">
                          <Brain className="w-3.5 h-3.5 text-[#c2410c]" />
                          f0undr Book Series · Special Edition
                        </span>
                        <span className="text-xs font-mono text-[#78716c] bg-[#f5f2eb] px-2.5 py-0.5 rounded-md border border-[#e7e5e4]">
                          Units 1 to 6 Complete · Interactive Edition
                        </span>
                      </div>
                      <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1c1917] tracking-tight">
                        The Art of Mental Mastery: <em className="italic text-[#c2410c] font-normal">Learn Fast &amp; Mind Reading</em>
                      </h2>
                      <p className="text-[#57534e] text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
                        Authored by <strong className="text-[#1c1917]">f0undr</strong>. A comprehensive masterclass on accelerated learning, neuroplasticity, memory palaces (Method of Loci), decoding limbic body language, behavioral deception detection, persuasion vectors, and rapid mental models.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <a
                        href="https://fmm-e-book.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl btn-editorial-outline text-xs font-semibold text-[#c2410c] transition-all hover:-translate-y-0.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Standalone (fmm-e-book.vercel.app)</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="/mind-mastery/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-editorial-accent text-xs font-semibold shadow-xs transition-all hover:-translate-y-0.5"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Open Full Screen in New Tab</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Quick Jump Unit Strip */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none text-xs font-mono">
                    {[
                      { label: 'Unit 1: Fast Learning', hash: 'unit-one' },
                      { label: 'Unit 2: Memory Palace', hash: 'unit-two' },
                      { label: 'Unit 3: Body Language', hash: 'unit-three' },
                      { label: 'Unit 4: Deception', hash: 'unit-four' },
                      { label: 'Unit 5: Persuasion', hash: 'unit-five' },
                      { label: 'Unit 6: Mental Models', hash: 'unit-six' },
                      { label: 'Flashcards', hash: 'flashcards' },
                      { label: 'Glossary', hash: 'glossary' },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          const iframe = document.getElementById('mind-curriculum-frame') as HTMLIFrameElement;
                          if (iframe && iframe.contentWindow) {
                            iframe.contentWindow.location.hash = item.hash;
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#f5f2eb] hover:bg-[#ffedd5] text-[#57534e] hover:text-[#c2410c] border border-[#e7e5e4] shrink-0 transition-colors cursor-pointer font-medium"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Embedded Interactive Reader */}
                  <div className="editorial-card rounded-2xl overflow-hidden border border-[#e7e5e4] shadow-md bg-white">
                    <iframe
                      id="mind-curriculum-frame"
                      src="/mind-mastery/index.html"
                      title="The Art of Mental Mastery: Learn Fast & Mind Reading"
                      className="w-full h-[85vh] border-0"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* TEAM TAB */}
        {activeTab === 'team' && (
          <div className="pt-20">
            <TeamSection team={team} />
          </div>
        )}

        {/* BOOKS TAB */}
        {activeTab === 'books' && (
          <div className="pt-20">
            <BooksSection books={books} />
          </div>
        )}

        {/* TOOLS TAB */}
        {activeTab === 'tools' && (
          <div className="pt-20">
            <ToolsSection tools={tools} />
          </div>
        )}

        {/* THINGS TAB */}
        {activeTab === 'things' && (
          <div className="pt-20">
            <ThingsSection things={things} />
          </div>
        )}
      </main>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        books={books}
        tools={tools}
        team={team}
        things={things}
        onSelectResult={(_type, tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Founder / Admin Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Comprehensive Admin Panel & SEO Engine */}
      {currentUser && (
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          currentUser={currentUser}
          onLogout={handleLogout}
          books={books}
          tools={tools}
          team={team}
          things={things}
          seoSettings={seoSettings}
          auditLogs={auditLogs}
          onUpdateBook={handleUpdateBook}
          onDeleteBook={handleDeleteBook}
          onAddBook={handleAddBook}
          onUpdateTeamMember={handleUpdateTeamMember}
          onDeleteTeamMember={handleDeleteTeamMember}
          onAddTeamMember={handleAddTeamMember}
          onUpdateTool={handleUpdateTool}
          onDeleteTool={handleDeleteTool}
          onAddTool={handleAddTool}
          onUpdateThing={handleUpdateThing}
          onDeleteThing={handleDeleteThing}
          onAddThing={handleAddThing}
          onUpdateSeoSettings={handleUpdateSeoSettings}
          onExportData={handleExportData}
          onImportData={handleImportData}
          onResetData={handleResetData}
          onOpenAddModal={openAddFor}
        />
      )}

      {/* Add Item Modal (Rendered on top of Cockpit with z-[100]) */}
      {currentUser && (
        <AddModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          defaultTab={addModalDefaultTab}
          onAddBook={handleAddBook}
          onAddTool={handleAddTool}
          onAddTeamMember={handleAddTeamMember}
          onAddThing={handleAddThing}
        />
      )}

      {/* Clean Public Colophon Footer */}
      <Footer
        currentUser={currentUser}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onExportData={handleExportData}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default App;
