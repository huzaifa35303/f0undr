import React, { useState } from 'react';
import type { Book, CuratedTool, TeamMember, Thing, BookCategory, ReadingStatus, ToolCategory, ThingCategory } from '../types';
import { BookOpen, Wrench, Users, Package, X, Plus } from 'lucide-react';
import { PRESET_RANKS } from '../utils/ranks';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBook: (book: Book) => void;
  onAddTool: (tool: CuratedTool) => void;
  onAddTeamMember: (member: TeamMember) => void;
  onAddThing: (thing: Thing) => void;
  defaultTab?: 'book' | 'tool' | 'team' | 'thing';
}

export const AddModal: React.FC<AddModalProps> = ({
  isOpen,
  onClose,
  onAddBook,
  onAddTool,
  onAddTeamMember,
  onAddThing,
  defaultTab = 'book',
}) => {
  const [activeTab, setActiveTab] = useState<'book' | 'tool' | 'team' | 'thing'>(defaultTab);

  const [prevDefaultTab, setPrevDefaultTab] = useState(defaultTab);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen || defaultTab !== prevDefaultTab) {
    setPrevIsOpen(isOpen);
    setPrevDefaultTab(defaultTab);
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }

  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookYear, setBookYear] = useState('');
  const [bookCategory, setBookCategory] = useState<BookCategory>('Startups & Business');
  const [bookStatus, setBookStatus] = useState<ReadingStatus>('reading');
  const [bookRating, setBookRating] = useState(5);
  const [bookTakeaways, setBookTakeaways] = useState('');
  const [bookNotes, setBookNotes] = useState('');
  const [bookQuote, setBookQuote] = useState('');

  const [toolName, setToolName] = useState('');
  const [toolTagline, setToolTagline] = useState('');
  const [toolDescription, setToolDescription] = useState('');
  const [toolCategory, setToolCategory] = useState<ToolCategory>('Development');
  const [toolUrl, setToolUrl] = useState('');
  const [toolPricing, setToolPricing] = useState<'Free' | 'Freemium' | 'Paid' | 'Open Source'>('Freemium');
  const [toolTags, setToolTags] = useState('');

  const [teamName, setTeamName] = useState('');
  const [teamRole, setTeamRole] = useState('');
  const [teamRank, setTeamRank] = useState('Core Fellow');
  const [teamHandle, setTeamHandle] = useState('');
  const [teamBio, setTeamBio] = useState('');
  const [teamStatus, setTeamStatus] = useState<TeamMember['status']>('Building');
  const [teamSkills, setTeamSkills] = useState('');
  const [teamTwitter, setTeamTwitter] = useState('');
  const [teamGithub, setTeamGithub] = useState('');
  const [teamEmail, setTeamEmail] = useState('');

  const [thingTitle, setThingTitle] = useState('');
  const [thingCategory, setThingCategory] = useState<ThingCategory>('Hardware & Desk');
  const [thingSpecs, setThingSpecs] = useState('');
  const [thingWhy, setThingWhy] = useState('');
  const [thingUrl, setThingUrl] = useState('');

  if (!isOpen) return null;

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim()) return;

    const newBook: Book = {
      id: `book-${Date.now()}`,
      title: bookTitle.trim(),
      author: bookAuthor.trim() || 'Unknown Author',
      year: bookYear.trim() || '2026',
      category: bookCategory,
      status: bookStatus,
      rating: bookRating,
      keyTakeaways: bookTakeaways
        ? bookTakeaways.split('\n').filter((t) => t.trim().length > 0)
        : ['Consistent compounding yields exceptional asymmetric results.'],
      notes: bookNotes.trim() || 'High-signal reading added to the f0undr vault.',
      favoriteQuote: bookQuote.trim() || undefined,
      dateAdded: new Date().toISOString().slice(0, 10),
    };

    onAddBook(newBook);
    onClose();
  };

  const handleToolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolName.trim()) return;

    const newTool: CuratedTool = {
      id: `tool-${Date.now()}`,
      name: toolName.trim(),
      tagline: toolTagline.trim() || 'Precision software leverage',
      description: toolDescription.trim() || 'Curated high-signal tool in the f0undr arsenal.',
      category: toolCategory,
      url: toolUrl.trim() || 'https://f0undrteam.site',
      pricing: toolPricing,
      tags: toolTags
        ? toolTags.split(',').map((t) => t.trim()).filter((t) => t.length > 0)
        : ['Utility', 'System'],
    };

    onAddTool(newTool);
    onClose();
  };

  const handleTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    const isFounder = teamRank.toLowerCase().includes('founder');

    const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      name: teamName.trim(),
      role: teamRole.trim() || 'Systems Fellow',
      rank: teamRank,
      verifiedFounder: isFounder,
      department: isFounder ? 'Core Leadership' : 'Fellowship Core',
      handle: teamHandle.trim() ? (teamHandle.startsWith('@') ? teamHandle : `@${teamHandle}`) : `@${teamName.toLowerCase().replace(/\s+/g, '')}`,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      bio: teamBio.trim() || 'Fellow at f0undr Technology Corporation.',
      status: teamStatus,
      skills: teamSkills
        ? teamSkills.split(',').map((s) => s.trim()).filter((s) => s.length > 0)
        : ['Systems', 'AI'],
      quote: 'Work with long-term people on long-term games.',
      social: {
        twitter: teamTwitter.trim() || undefined,
        github: teamGithub.trim() || undefined,
        email: teamEmail.trim() || undefined,
      },
    };

    onAddTeamMember(newMember);
    onClose();
  };

  const handleThingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!thingTitle.trim()) return;

    const newThing: Thing = {
      id: `thing-${Date.now()}`,
      title: thingTitle.trim(),
      category: thingCategory,
      specs: thingSpecs.trim() || 'Precision Hardware Specification',
      whyWeLoveIt: thingWhy.trim() || 'High-durability hardware utility for production environments.',
      url: thingUrl.trim() || undefined,
      iconName: 'Package',
    };

    onAddThing(newThing);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-[#100f14] border border-white/10 shadow-2xl relative animate-scale-up text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-heading text-2xl font-bold text-white mb-1">Add to f0undr Vault</h3>
        <p className="text-xs text-slate-400 mb-6 font-light">
          Contribute a new book, tool, team fellow, or hardware artifact.
        </p>

        <div className="flex items-center gap-1.5 p-1 bg-[#16151c] border border-white/10 rounded-xl mb-6">
          <button
            onClick={() => setActiveTab('book')}
            className={`flex-1 py-2 text-xs font-mono font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'book'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Book
          </button>
          <button
            onClick={() => setActiveTab('tool')}
            className={`flex-1 py-2 text-xs font-mono font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'tool'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" /> Tool
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`flex-1 py-2 text-xs font-mono font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'team'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Fellow
          </button>
          <button
            onClick={() => setActiveTab('thing')}
            className={`flex-1 py-2 text-xs font-mono font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'thing'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" /> Artifact
          </button>
        </div>

        {activeTab === 'book' && (
          <form onSubmit={handleBookSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                Book Title *
              </label>
              <input
                type="text"
                required
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="Designing Data-Intensive Applications"
                className="w-full px-3.5 py-2.5 bg-[#16151c] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Author
                </label>
                <input
                  type="text"
                  value={bookAuthor}
                  onChange={(e) => setBookAuthor(e.target.value)}
                  placeholder="Martin Kleppmann"
                  className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={bookYear}
                  onChange={(e) => setBookYear(e.target.value)}
                  placeholder="2017"
                  className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={bookCategory}
                  onChange={(e) => setBookCategory(e.target.value as BookCategory)}
                  className="w-full px-3 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                >
                  <option value="Startups & Business">Startups & Business</option>
                  <option value="Engineering & Architecture">Engineering & Architecture</option>
                  <option value="AI & Intelligence">AI & Intelligence</option>
                  <option value="Biographies & History">Biographies & History</option>
                  <option value="Philosophy & Mind">Philosophy & Mind</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Status
                </label>
                <select
                  value={bookStatus}
                  onChange={(e) => setBookStatus(e.target.value as ReadingStatus)}
                  className="w-full px-3 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                >
                  <option value="reading">Reading Now</option>
                  <option value="completed">Completed</option>
                  <option value="recommended">Master Pick</option>
                  <option value="to-read">Queued</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={bookRating}
                  onChange={(e) => setBookRating(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                Key Takeaways (one per line)
              </label>
              <textarea
                rows={3}
                value={bookTakeaways}
                onChange={(e) => setBookTakeaways(e.target.value)}
                placeholder="High-throughput stream processing&#10;Data immutability is an operational superpower"
                className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                Favorite Quote
              </label>
              <input
                type="text"
                value={bookQuote}
                onChange={(e) => setBookQuote(e.target.value)}
                placeholder="Simplicity is prerequisite for reliability."
                className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                Executive Notes
              </label>
              <textarea
                rows={2}
                value={bookNotes}
                onChange={(e) => setBookNotes(e.target.value)}
                placeholder="High-signal architectural insights, mental models, and takeaways..."
                className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl btn-primary-white text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Volume to Library
            </button>
          </form>
        )}

        {activeTab === 'tool' && (
          <form onSubmit={handleToolSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                Tool Name *
              </label>
              <input
                type="text"
                required
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                placeholder="Raycast / v0 / Cursor"
                className="w-full px-3.5 py-2.5 bg-[#16151c] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={toolTagline}
                  onChange={(e) => setToolTagline(e.target.value)}
                  placeholder="Extendable desktop launcher"
                  className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={toolCategory}
                  onChange={(e) => setToolCategory(e.target.value as ToolCategory)}
                  className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                >
                  <option value="Development">Development</option>
                  <option value="AI & Intelligence">AI & Intelligence</option>
                  <option value="Design & 3D">Design & 3D</option>
                  <option value="Productivity & OS">Productivity & OS</option>
                  <option value="Infrastructure">Infrastructure</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  value={toolUrl}
                  onChange={(e) => setToolUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Pricing Model
                </label>
                <select
                  value={toolPricing}
                  onChange={(e) => setToolPricing(e.target.value as 'Free' | 'Freemium' | 'Paid' | 'Open Source')}
                  className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                >
                  <option value="Freemium">Freemium</option>
                  <option value="Free">Free</option>
                  <option value="Open Source">Open Source</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={toolDescription}
                onChange={(e) => setToolDescription(e.target.value)}
                placeholder="Describe how this tool provides operational leverage..."
                className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={toolTags}
                onChange={(e) => setToolTags(e.target.value)}
                placeholder="Productivity, MacOS, AI, Launcher"
                className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl btn-primary-white text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Tool to Arsenal
            </button>
          </form>
        )}

        {activeTab === 'team' && (
          <form onSubmit={handleTeamSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Rai Abdur Rehman"
                  className="w-full px-3.5 py-2.5 bg-[#16151c] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Handle
                </label>
                <input
                  type="text"
                  value={teamHandle}
                  onChange={(e) => setTeamHandle(e.target.value)}
                  placeholder="@abdur"
                  className="w-full px-3.5 py-2.5 bg-[#16151c] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Role Title *
                </label>
                <input
                  type="text"
                  required
                  value={teamRole}
                  onChange={(e) => setTeamRole(e.target.value)}
                  placeholder="Head of Founder Team & Operations"
                  className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Hierarchy Rank
                </label>
                <select
                  value={teamRank}
                  onChange={(e) => setTeamRank(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                >
                  {PRESET_RANKS.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.icon} {r.label}
                    </option>
                  ))}
                  <option value="Lead Fellow">⚡ Lead Fellow</option>
                  <option value="Staff Systems Architect">👑 Staff Systems Architect</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Activity Status
                </label>
                <select
                  value={teamStatus}
                  onChange={(e) => setTeamStatus(e.target.value as TeamMember['status'])}
                  className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                >
                  <option value="Building">Building</option>
                  <option value="Deep Work">Deep Work</option>
                  <option value="Available">Available</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Primary Skills
                </label>
                <input
                  type="text"
                  value={teamSkills}
                  onChange={(e) => setTeamSkills(e.target.value)}
                  placeholder="AI, Next.js, Architecture"
                  className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                Executive Dossier / Bio
              </label>
              <textarea
                rows={2}
                value={teamBio}
                onChange={(e) => setTeamBio(e.target.value)}
                placeholder="Background, core contributions, strategic domain..."
                className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Twitter / X</label>
                <input
                  type="text"
                  value={teamTwitter}
                  onChange={(e) => setTeamTwitter(e.target.value)}
                  placeholder="@handle"
                  className="w-full px-2.5 py-1.5 bg-[#16151c] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">GitHub</label>
                <input
                  type="text"
                  value={teamGithub}
                  onChange={(e) => setTeamGithub(e.target.value)}
                  placeholder="username"
                  className="w-full px-2.5 py-1.5 bg-[#16151c] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Email</label>
                <input
                  type="email"
                  value={teamEmail}
                  onChange={(e) => setTeamEmail(e.target.value)}
                  placeholder="fellow@f0undr.org"
                  className="w-full px-2.5 py-1.5 bg-[#16151c] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl btn-primary-white text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Induct Fellow into f0undr Team
            </button>
          </form>
        )}

        {activeTab === 'thing' && (
          <form onSubmit={handleThingSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                Artifact Name *
              </label>
              <input
                type="text"
                required
                value={thingTitle}
                onChange={(e) => setThingTitle(e.target.value)}
                placeholder="Keychron Q1 Pro / Studio Display"
                className="w-full px-3.5 py-2.5 bg-[#16151c] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={thingCategory}
                  onChange={(e) => setThingCategory(e.target.value as ThingCategory)}
                  className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                >
                  <option value="Hardware & Desk">Hardware & Desk</option>
                  <option value="Audio & Sensors">Audio & Sensors</option>
                  <option value="Displays & Ergonomics">Displays & Ergonomics</option>
                  <option value="Mobile & Compute">Mobile & Compute</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                  Hardware Specs
                </label>
                <input
                  type="text"
                  value={thingSpecs}
                  onChange={(e) => setThingSpecs(e.target.value)}
                  placeholder="Custom switches, QMK/VIA"
                  className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                Why We Use It
              </label>
              <textarea
                rows={2}
                value={thingWhy}
                onChange={(e) => setThingWhy(e.target.value)}
                placeholder="Tactile feedback and ergonomics required for prolonged coding sprints..."
                className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                Reference / Purchase URL
              </label>
              <input
                type="url"
                value={thingUrl}
                onChange={(e) => setThingUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2 bg-[#16151c] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl btn-primary-white text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Register Hardware Artifact
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
