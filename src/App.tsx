import { useState, useEffect } from 'react';
import type {
  Project,
  AuthUser,
  Book,
  CuratedTool,
  TeamMember,
  Thing,
  SeoSettings,
  AuditLogItem,
} from './types';
import {
  INITIAL_BOOKS,
  INITIAL_CURATED_TOOLS,
  INITIAL_TEAM,
  INITIAL_THINGS,
  DEFAULT_SEO_SETTINGS,
  INITIAL_AUDIT_LOGS,
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FounderSection } from './components/FounderSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TeamSection } from './components/TeamSection';
import { TemplatesSection } from './components/TemplatesSection';
import { CurriculumSection } from './components/CurriculumSection';
import { ToolsSection } from './components/ToolsSection';
import { SkillsSection } from './components/SkillsSection';
import { OrderSection } from './components/OrderSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { LoginModal } from './components/LoginModal';
import { AdminPanel } from './components/AdminPanel';
import { AddModal } from './components/AddModal';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [addModalDefaultTab, setAddModalDefaultTab] = useState<'book' | 'tool' | 'team' | 'thing'>('book');

  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('f0undr_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem('f0undr_books_editorial_v3');
      return saved ? JSON.parse(saved) : INITIAL_BOOKS;
    } catch {
      return INITIAL_BOOKS;
    }
  });

  const [tools, setTools] = useState<CuratedTool[]>(() => {
    try {
      const saved = localStorage.getItem('f0undr_tools_editorial_v5');
      return saved ? JSON.parse(saved) : INITIAL_CURATED_TOOLS;
    } catch {
      return INITIAL_CURATED_TOOLS;
    }
  });

  const [team, setTeam] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem('f0undr_team_editorial_v6');
      return saved ? JSON.parse(saved) : INITIAL_TEAM;
    } catch {
      return INITIAL_TEAM;
    }
  });

  const [things, setThings] = useState<Thing[]>(() => {
    try {
      const saved = localStorage.getItem('f0undr_things_editorial_v3');
      return saved ? JSON.parse(saved) : INITIAL_THINGS;
    } catch {
      return INITIAL_THINGS;
    }
  });

  const [seoSettings, setSeoSettings] = useState<SeoSettings>(() => {
    try {
      const saved = localStorage.getItem('f0undr_seo_settings_v3');
      return saved ? JSON.parse(saved) : DEFAULT_SEO_SETTINGS;
    } catch {
      return DEFAULT_SEO_SETTINGS;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    try {
      const saved = localStorage.getItem('f0undr_audit_logs');
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setIsLoginOpen(false);
        setIsAdminOpen(false);
        setIsAddOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'founder', 'projects', 'team', 'templates', 'curriculum', 'tools', 'skills', 'order'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const titles: Record<string, string> = {
      hero: 'f0undr — Autonomous AI & Native Systems | Technology Corporation',
      founder: 'Muhammad Huzaifa Zahid (Founder) — Leadership Dossier | f0undr',
      projects: 'Sovereign Software & Systems Architecture | f0undr',
      team: 'Executive Leadership Collective — The f0undr Team',
      templates: 'Interactive OTP & Micro-Interaction Templates | f0undr',
      curriculum: 'Systems Architecture & Digital Publications | f0undr',
      tools: 'Utility Engines & Interactive Software Arsenal | f0undr',
      skills: 'Autonomous AI & Native Engineering Capabilities | f0undr',
      order: 'Direct Executive Commission Atelier | f0undr',
    };

    const newTitle = titles[activeSection] || titles.hero;
    document.title = newTitle;

    const canonicalEl = document.querySelector("link[rel='canonical']");
    if (canonicalEl) {
      canonicalEl.setAttribute('href', activeSection === 'hero' ? 'https://f0undrteam.site/' : `https://f0undrteam.site/#${activeSection}`);
    }
  }, [activeSection]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    localStorage.setItem('f0undr_auth_user', JSON.stringify(user));
    setIsLoginOpen(false);
    setIsAdminOpen(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('f0undr_auth_user');
    setIsAdminOpen(false);
  };

  const handleUpdateBook = (updated: Book) => {
    const next = books.map((b) => (b.id === updated.id ? updated : b));
    setBooks(next);
    localStorage.setItem('f0undr_books_editorial_v3', JSON.stringify(next));
  };

  const handleDeleteBook = (id: string) => {
    const next = books.filter((b) => b.id !== id);
    setBooks(next);
    localStorage.setItem('f0undr_books_editorial_v3', JSON.stringify(next));
  };

  const handleAddBook = (book: Book) => {
    const next = [book, ...books];
    setBooks(next);
    localStorage.setItem('f0undr_books_editorial_v3', JSON.stringify(next));
  };

  const handleUpdateTeamMember = (updated: TeamMember) => {
    const next = team.map((m) => (m.id === updated.id ? updated : m));
    setTeam(next);
    localStorage.setItem('f0undr_team_editorial_v6', JSON.stringify(next));
  };

  const handleDeleteTeamMember = (id: string) => {
    const next = team.filter((m) => m.id !== id);
    setTeam(next);
    localStorage.setItem('f0undr_team_editorial_v6', JSON.stringify(next));
  };

  const handleAddTeamMember = (member: TeamMember) => {
    const next = [...team, member];
    setTeam(next);
    localStorage.setItem('f0undr_team_editorial_v6', JSON.stringify(next));
  };

  const handleUpdateTool = (updated: CuratedTool) => {
    const next = tools.map((t) => (t.id === updated.id ? updated : t));
    setTools(next);
    localStorage.setItem('f0undr_tools_editorial_v5', JSON.stringify(next));
  };

  const handleDeleteTool = (id: string) => {
    const next = tools.filter((t) => t.id !== id);
    setTools(next);
    localStorage.setItem('f0undr_tools_editorial_v5', JSON.stringify(next));
  };

  const handleAddTool = (tool: CuratedTool) => {
    const next = [tool, ...tools];
    setTools(next);
    localStorage.setItem('f0undr_tools_editorial_v5', JSON.stringify(next));
  };

  const handleUpdateThing = (updated: Thing) => {
    const next = things.map((t) => (t.id === updated.id ? updated : t));
    setThings(next);
    localStorage.setItem('f0undr_things_editorial_v3', JSON.stringify(next));
  };

  const handleDeleteThing = (id: string) => {
    const next = things.filter((t) => t.id !== id);
    setThings(next);
    localStorage.setItem('f0undr_things_editorial_v3', JSON.stringify(next));
  };

  const handleAddThing = (thing: Thing) => {
    const next = [thing, ...things];
    setThings(next);
    localStorage.setItem('f0undr_things_editorial_v3', JSON.stringify(next));
  };

  const handleUpdateSeoSettings = (newSettings: SeoSettings) => {
    setSeoSettings(newSettings);
    localStorage.setItem('f0undr_seo_settings_v3', JSON.stringify(newSettings));
  };

  const handleExportData = () => {
    const data = {
      books,
      tools,
      team,
      things,
      seoSettings,
      auditLogs,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `f0undr-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (imported: any) => {
    if (imported.books) setBooks(imported.books);
    if (imported.tools) setTools(imported.tools);
    if (imported.team) setTeam(imported.team);
    if (imported.things) setThings(imported.things);
    if (imported.seoSettings) setSeoSettings(imported.seoSettings);
  };

  const handleResetData = () => {
    setBooks(INITIAL_BOOKS);
    setTools(INITIAL_CURATED_TOOLS);
    setTeam(INITIAL_TEAM);
    setThings(INITIAL_THINGS);
    setSeoSettings(DEFAULT_SEO_SETTINGS);
    localStorage.clear();
  };

  const openAddFor = (tab: 'book' | 'tool' | 'team' | 'thing') => {
    setAddModalDefaultTab(tab);
    setIsAddOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--fg)] selection:bg-[var(--hl)] selection:text-[var(--on-hl)] w-full max-w-full">
      <div className="flowing-bg-track" aria-hidden="true">
        <div className="flow-stream flow-stream-left">
          <span>f0undr &bull; f0undr team &bull; technology corporation &bull; autonomous systems &bull; f0undr &bull; f0undr team &bull; technology corporation &bull; autonomous systems &bull;&nbsp;</span>
          <span>f0undr &bull; f0undr team &bull; technology corporation &bull; autonomous systems &bull; f0undr &bull; f0undr team &bull; technology corporation &bull; autonomous systems &bull;&nbsp;</span>
        </div>
        <div className="flow-stream flow-stream-right">
          <span>sovereign software &bull; f0undr team &bull; founder &bull; native android apk &bull; sovereign software &bull; f0undr team &bull; founder &bull; native android apk &bull;&nbsp;</span>
          <span>sovereign software &bull; f0undr team &bull; founder &bull; native android apk &bull; sovereign software &bull; f0undr team &bull; founder &bull; native android apk &bull;&nbsp;</span>
        </div>
        <div className="flow-stream flow-stream-left">
          <span>autonomous systems &bull; f0undr &bull; f0undr team &bull; executive collective &bull; sovereign technology &bull; f0undr &bull; f0undr team &bull; executive collective &bull;&nbsp;</span>
          <span>autonomous systems &bull; f0undr &bull; f0undr team &bull; executive collective &bull; sovereign technology &bull; f0undr &bull; f0undr team &bull; executive collective &bull;&nbsp;</span>
        </div>
      </div>
      
      <Navbar
        activeSection={activeSection}
        currentUser={currentUser}
        onOpenLogin={() => {
          if (currentUser) {
            setIsAdminOpen(true);
          } else {
            setIsLoginOpen(true);
          }
        }}
      />

      <main className="relative z-10 w-full max-w-full">
        <HeroSection
          onExploreProjects={() => scrollTo('projects')}
          onMeetTeam={() => scrollTo('team')}
        />
        <FounderSection />
        <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />
        <TeamSection />
        <TemplatesSection />
        <CurriculumSection />
        <ToolsSection tools={tools} />
        <SkillsSection />
        <OrderSection />
      </main>

      <Footer
        currentUser={currentUser}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

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
    </div>
  );
}

export default App;
