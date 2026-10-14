import React, { useState } from 'react';
import type { Book, CuratedTool, TeamMember, Thing, BookCategory, ReadingStatus, ToolCategory, ThingCategory } from '../types';
import { BookOpen, Wrench, Users, Package, X } from 'lucide-react';

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

  // Book Form State
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookYear, setBookYear] = useState('');
  const [bookCategory, setBookCategory] = useState<BookCategory>('Startups & Business');
  const [bookStatus, setBookStatus] = useState<ReadingStatus>('reading');
  const [bookRating, setBookRating] = useState(5);
  const [bookTakeaways, setBookTakeaways] = useState('');
  const [bookNotes, setBookNotes] = useState('');
  const [bookQuote, setBookQuote] = useState('');

  // Tool Form State
  const [toolName, setToolName] = useState('');
  const [toolTagline, setToolTagline] = useState('');
  const [toolDescription, setToolDescription] = useState('');
  const [toolCategory, setToolCategory] = useState<ToolCategory>('Development');
  const [toolUrl, setToolUrl] = useState('');
  const [toolPricing, setToolPricing] = useState<'Free' | 'Freemium' | 'Paid' | 'Open Source'>('Freemium');
  const [toolTags, setToolTags] = useState('');

  // Team Form State
  const [teamName, setTeamName] = useState('');
  const [teamRole, setTeamRole] = useState('');
  const [teamHandle, setTeamHandle] = useState('');
  const [teamBio, setTeamBio] = useState('');
  const [teamStatus, setTeamStatus] = useState<TeamMember['status']>('Building');
  const [teamSkills, setTeamSkills] = useState('');
  const [teamTwitter, setTeamTwitter] = useState('');
  const [teamGithub, setTeamGithub] = useState('');
  const [teamEmail, setTeamEmail] = useState('');

  // Thing Form State
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
      tagline: toolTagline.trim() || 'High-leverage software tool',
      description: toolDescription.trim() || 'Essential component of the modern builder stack.',
      category: toolCategory,
      url: toolUrl.trim() || 'https://github.com',
      pricing: toolPricing,
      tags: toolTags ? toolTags.split(',').map((t) => t.trim()) : ['Tooling', 'Productivity'],
    };

    onAddTool(newTool);
    onClose();
  };

  const handleTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      name: teamName.trim(),
      role: teamRole.trim() || 'Core Researcher & Fellow',
      handle: teamHandle.trim().startsWith('@') ? teamHandle.trim() : `@${teamHandle.trim() || 'fellow'}`,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        teamName
      )}&background=1c1917&color=faf8f5&bold=true`,
      bio: teamBio.trim() || 'Builder driving high-leverage systems at f0undr.',
      status: teamStatus,
      skills: teamSkills ? teamSkills.split(',').map((s) => s.trim()) : ['Product', 'Engineering'],
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
      specs: thingSpecs.trim() || undefined,
      whyWeLoveIt: thingWhy.trim() || 'Curated artifact in the f0undr arsenal.',
      url: thingUrl.trim() || undefined,
      iconName: 'Package',
    };

    onAddThing(newThing);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="editorial-card w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 border border-[#d6d3d1] shadow-2xl relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#78716c] hover:text-[#1c1917] hover:bg-[#f5f2eb] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-serif text-2xl font-bold text-[#1c1917] mb-1">Add to f0undr Vault</h3>
        <p className="text-xs text-[#57534e] mb-6">
          Contribute a new book, tool, team fellow, or hardware artifact.
        </p>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-[#f5f2eb] border border-[#e7e5e4] rounded-xl mb-6">
          <button
            onClick={() => setActiveTab('book')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'book'
                ? 'btn-editorial-primary shadow-xs'
                : 'text-[#57534e] hover:text-[#1c1917]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Book
          </button>
          <button
            onClick={() => setActiveTab('tool')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'tool'
                ? 'btn-editorial-primary shadow-xs'
                : 'text-[#57534e] hover:text-[#1c1917]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" /> Tool
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'team'
                ? 'btn-editorial-primary shadow-xs'
                : 'text-[#57534e] hover:text-[#1c1917]'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Fellow
          </button>
          <button
            onClick={() => setActiveTab('thing')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'thing'
                ? 'btn-editorial-primary shadow-xs'
                : 'text-[#57534e] hover:text-[#1c1917]'
            }`}
          >
            <Package className="w-3.5 h-3.5" /> Artifact
          </button>
        </div>

        {/* BOOK FORM */}
        {activeTab === 'book' && (
          <form onSubmit={handleBookSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Book Title *</label>
              <input
                type="text"
                required
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="Designing Data-Intensive Applications"
                className="w-full px-3.5 py-2.5 bg-white border border-[#e7e5e4] rounded-xl text-sm text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Author</label>
                <input
                  type="text"
                  value={bookAuthor}
                  onChange={(e) => setBookAuthor(e.target.value)}
                  placeholder="Martin Kleppmann"
                  className="w-full px-3.5 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Year</label>
                <input
                  type="text"
                  value={bookYear}
                  onChange={(e) => setBookYear(e.target.value)}
                  placeholder="2017"
                  className="w-full px-3.5 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Category</label>
                <select
                  value={bookCategory}
                  onChange={(e) => setBookCategory(e.target.value as BookCategory)}
                  className="w-full px-3 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                >
                  <option value="Startups & Business">Startups &amp; Business</option>
                  <option value="AI & Technology">AI &amp; Technology</option>
                  <option value="Philosophy & Mindset">Philosophy &amp; Mindset</option>
                  <option value="Design & UX">Design &amp; UX</option>
                  <option value="Biographies">Biographies</option>
                  <option value="Productivity & Systems">Productivity &amp; Systems</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Status</label>
                <select
                  value={bookStatus}
                  onChange={(e) => setBookStatus(e.target.value as ReadingStatus)}
                  className="w-full px-3 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                >
                  <option value="reading">Reading Now</option>
                  <option value="completed">Completed</option>
                  <option value="wishlist">In Queue</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={bookRating}
                  onChange={(e) => setBookRating(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Key Principles (one per line)</label>
              <textarea
                rows={2}
                value={bookTakeaways}
                onChange={(e) => setBookTakeaways(e.target.value)}
                placeholder="High-throughput stream processing&#10;Data immutability is an operational superpower"
                className="w-full px-3.5 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Favorite Quote</label>
              <input
                type="text"
                value={bookQuote}
                onChange={(e) => setBookQuote(e.target.value)}
                placeholder="Simplicity is prerequisite for reliability."
                className="w-full px-3.5 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Distilled Notes &amp; Synthesis</label>
              <textarea
                rows={2}
                value={bookNotes}
                onChange={(e) => setBookNotes(e.target.value)}
                placeholder="High-signal architectural insights, mental models, and takeaways..."
                className="w-full px-3.5 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl btn-editorial-primary text-xs font-semibold shadow-xs transition-all hover:-translate-y-0.5 mt-4"
            >
              Add Volume to Library
            </button>
          </form>
        )}

        {/* TOOL FORM */}
        {activeTab === 'tool' && (
          <form onSubmit={handleToolSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Tool Name *</label>
              <input
                type="text"
                required
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                placeholder="Raycast / Linear / Cursor"
                className="w-full px-3.5 py-2.5 bg-white border border-[#e7e5e4] rounded-xl text-sm text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Tagline</label>
              <input
                type="text"
                value={toolTagline}
                onChange={(e) => setToolTagline(e.target.value)}
                placeholder="Supercharged developer command palette"
                className="w-full px-3.5 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Description</label>
              <textarea
                rows={2}
                value={toolDescription}
                onChange={(e) => setToolDescription(e.target.value)}
                placeholder="What leverage does this software deliver?..."
                className="w-full px-3.5 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Category</label>
                <select
                  value={toolCategory}
                  onChange={(e) => setToolCategory(e.target.value as ToolCategory)}
                  className="w-full px-3.5 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                >
                  <option value="AI & LLMs">AI &amp; LLMs</option>
                  <option value="Development">Development</option>
                  <option value="Design & UI">Design &amp; UI</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Analytics & Growth">Analytics &amp; Growth</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Pricing</label>
                <select
                  value={toolPricing}
                  onChange={(e) => setToolPricing(e.target.value as 'Free' | 'Freemium' | 'Paid' | 'Open Source')}
                  className="w-full px-3.5 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                >
                  <option value="Freemium">Freemium</option>
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                  <option value="Open Source">Open Source</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">URL</label>
                <input
                  type="url"
                  value={toolUrl}
                  onChange={(e) => setToolUrl(e.target.value)}
                  placeholder="https://tool.example.com"
                  className="w-full px-3.5 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={toolTags}
                  onChange={(e) => setToolTags(e.target.value)}
                  placeholder="Productivity, Fast, AI"
                  className="w-full px-3.5 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl btn-editorial-primary text-xs font-semibold shadow-xs transition-all hover:-translate-y-0.5 mt-4"
            >
              Add Tool to Arsenal
            </button>
          </form>
        )}

        {/* TEAM MEMBER FORM */}
        {activeTab === 'team' && (
          <form onSubmit={handleTeamSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Sara Noor"
                className="w-full px-3.5 py-2.5 bg-white border border-[#e7e5e4] rounded-xl text-sm text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Role</label>
                <input
                  type="text"
                  value={teamRole}
                  onChange={(e) => setTeamRole(e.target.value)}
                  placeholder="Principal Systems"
                  className="w-full px-3 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Handle</label>
                <input
                  type="text"
                  value={teamHandle}
                  onChange={(e) => setTeamHandle(e.target.value)}
                  placeholder="@sara_arch"
                  className="w-full px-3 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Status</label>
                <select
                  value={teamStatus}
                  onChange={(e) => setTeamStatus(e.target.value as TeamMember['status'])}
                  className="w-full px-3 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                >
                  <option value="Building">Building</option>
                  <option value="Deep Work">Deep Work</option>
                  <option value="Available">Available</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Bio</label>
              <textarea
                rows={2}
                value={teamBio}
                onChange={(e) => setTeamBio(e.target.value)}
                placeholder="High-throughput systems researcher and builder..."
                className="w-full px-3.5 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Skills (comma-separated)</label>
              <input
                type="text"
                value={teamSkills}
                onChange={(e) => setTeamSkills(e.target.value)}
                placeholder="Rust, Go, Distributed Protocols, GPU Quantization"
                className="w-full px-3.5 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Twitter / X</label>
                <input
                  type="text"
                  value={teamTwitter}
                  onChange={(e) => setTeamTwitter(e.target.value)}
                  placeholder="https://x.com/handle"
                  className="w-full px-3 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">GitHub</label>
                <input
                  type="text"
                  value={teamGithub}
                  onChange={(e) => setTeamGithub(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Email</label>
                <input
                  type="email"
                  value={teamEmail}
                  onChange={(e) => setTeamEmail(e.target.value)}
                  placeholder="fellow@f0undr.dev"
                  className="w-full px-3 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl btn-editorial-primary text-xs font-semibold shadow-xs transition-all hover:-translate-y-0.5 mt-4"
            >
              Add Fellow to Collective
            </button>
          </form>
        )}

        {/* THING FORM */}
        {activeTab === 'thing' && (
          <form onSubmit={handleThingSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Artifact / Hardware Title *</label>
              <input
                type="text"
                required
                value={thingTitle}
                onChange={(e) => setThingTitle(e.target.value)}
                placeholder="Custom Split Mechanical Keyboard"
                className="w-full px-3.5 py-2.5 bg-white border border-[#e7e5e4] rounded-xl text-sm text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Category</label>
                <select
                  value={thingCategory}
                  onChange={(e) => setThingCategory(e.target.value as ThingCategory)}
                  className="w-full px-3.5 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                >
                  <option value="Hardware & Desk">Hardware &amp; Desk</option>
                  <option value="Workspace & Audio">Workspace &amp; Audio</option>
                  <option value="Everyday Carry">Everyday Carry</option>
                  <option value="Software Stack">Software Stack</option>
                  <option value="Mindset & Artifact">Mindset &amp; Artifact</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Specs / Dimensions</label>
                <input
                  type="text"
                  value={thingSpecs}
                  onChange={(e) => setThingSpecs(e.target.value)}
                  placeholder="60% Ortholinear, Lubed Linear Switches"
                  className="w-full px-3.5 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Why We Love It</label>
              <textarea
                rows={2}
                value={thingWhy}
                onChange={(e) => setThingWhy(e.target.value)}
                placeholder="Eliminates ergonomic strain and elevates typing speed during deep code sprints..."
                className="w-full px-3.5 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#78716c] uppercase block mb-1">Product / Specs URL</label>
              <input
                type="url"
                value={thingUrl}
                onChange={(e) => setThingUrl(e.target.value)}
                placeholder="https://example.com/gear"
                className="w-full px-3.5 py-2 bg-white border border-[#e7e5e4] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl btn-editorial-primary text-xs font-semibold shadow-xs transition-all hover:-translate-y-0.5 mt-4"
            >
              Add Artifact to Setup
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
