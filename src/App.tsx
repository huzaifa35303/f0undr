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
import { ArrowUpRight, Award } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [addModalDefaultTab, setAddModalDefaultTab] = useState<'book' | 'tool' | 'team' | 'thing'>('book');

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
      const saved = localStorage.getItem('f0undr_seo_settings');
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

  // Persistent Content States
  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem('f0undr_books_editorial_v1');
      return saved ? JSON.parse(saved) : INITIAL_BOOKS;
    } catch {
      return INITIAL_BOOKS;
    }
  });

  const [tools, setTools] = useState<CuratedTool[]>(() => {
    try {
      const saved = localStorage.getItem('f0undr_tools_editorial_v1');
      return saved ? JSON.parse(saved) : INITIAL_CURATED_TOOLS;
    } catch {
      return INITIAL_CURATED_TOOLS;
    }
  });

  const [team, setTeam] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem('f0undr_team_editorial_v1');
      return saved ? JSON.parse(saved) : INITIAL_TEAM;
    } catch {
      return INITIAL_TEAM;
    }
  });

  const [things, setThings] = useState<Thing[]>(() => {
    try {
      const saved = localStorage.getItem('f0undr_things_editorial_v1');
      return saved ? JSON.parse(saved) : INITIAL_THINGS;
    } catch {
      return INITIAL_THINGS;
    }
  });

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('f0undr_books_editorial_v1', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('f0undr_tools_editorial_v1', JSON.stringify(tools));
  }, [tools]);

  useEffect(() => {
    localStorage.setItem('f0undr_team_editorial_v1', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('f0undr_things_editorial_v1', JSON.stringify(things));
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
      localStorage.removeItem('f0undr_books_editorial_v1');
      localStorage.removeItem('f0undr_tools_editorial_v1');
      localStorage.removeItem('f0undr_team_editorial_v1');
      localStorage.removeItem('f0undr_things_editorial_v1');
      localStorage.removeItem('f0undr_seo_settings');
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

            {/* FLAGSHIP HERO BANNER FOR f0undr Book */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
              <div className="editorial-card rounded-2xl p-6 sm:p-10 relative overflow-hidden group">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-3.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="editorial-stamp editorial-stamp-terracotta inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#c2410c] animate-pulse" />
                        FLAGSHIP PRODUCT · LIVE ON VERCEL
                      </span>
                      <span className="text-xs font-mono text-[#78716c] bg-[#f5f2eb] px-2.5 py-1 rounded-md border border-[#e7e5e4]">
                        Units 1 to 6 Active
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight">
                      f0undr Book: Computing &amp; Technology Curriculum
                    </h3>
                    <p className="text-xs text-[#c2410c] font-mono font-medium">
                      Lead Authors: <strong className="text-[#1c1917]">f0undr</strong> &amp; <strong className="text-[#1c1917]">Abdull Rehman Khizar</strong>
                    </p>
                    <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed font-normal">
                      A complete modern interactive computer science textbook covering hardware foundations, digital skills, algorithmic thinking, Scratch programming, cybersecurity, and digital entrepreneurship.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                    <a
                      href="https://f-e-book.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl btn-editorial-accent text-xs sm:text-sm font-semibold shadow-xs transition-all hover:-translate-y-0.5 active:scale-98"
                    >
                      <span>Open Live Curriculum ↗</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => {
                        setActiveTab('books');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2.5 rounded-xl btn-editorial-outline text-xs font-medium transition-colors"
                    >
                      View in Bookshelf Vault →
                    </button>
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
                        Features our flagship computing curriculum along with classics like Zero to One, High Output Management, and Designing Data-Intensive Applications.
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

      {/* Add Item Modal (Only accessible by Authenticated Admins from Cockpit) */}
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

      {/* Clean Public Colophon Footer */}
      <Footer
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
