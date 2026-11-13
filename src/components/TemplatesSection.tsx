import { useState, useMemo } from 'react';
import { Smartphone, ShieldCheck, Layers, Bot, FileText, Monitor, ArrowUpRight, Download, Search, Check, Copy } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

interface TemplateItem {
  id: string;
  title: string;
  tagline: string;
  category: 'boilerplates' | 'ui' | 'mobile' | 'ai' | 'desktop';
  badge: string;
  techStack: string[];
  features: string[];
  icon: typeof Smartphone;
  orderUrl?: string;
  demoUrl?: string;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: 'tmpl-android',
    title: 'Native Android APK Architecture (SDK 35)',
    tagline: 'Production-grade clean architecture starter with custom theme engine',
    category: 'mobile',
    badge: 'SDK 35 • Android 15',
    techStack: ['Kotlin', 'Jetpack Compose', 'Coroutines', 'Gradle 8.5'],
    features: ['Dynamic Material You theme engine', 'Offline SQLite caching', 'Background service workers', 'ProGuard optimized APK build'],
    icon: Smartphone,
    orderUrl: 'https://f0undr-order.vercel.app/',
  },
  {
    id: 'tmpl-vault',
    title: 'Sovereign Encrypted Cloud Vault Starter',
    tagline: 'Zero-knowledge client-side AES-256 encrypted storage engine',
    category: 'boilerplates',
    badge: 'AES-256 • Cryptography',
    techStack: ['TypeScript', 'WebCrypto API', 'Vercel Edge', 'Tailwind v4'],
    features: ['Client-side key derivation (PBKDF2)', 'Chunked file encryption streams', 'Expiring shareable access links', 'Zero plaintext transmission'],
    icon: ShieldCheck,
    orderUrl: 'https://f0undr-order.vercel.app/',
  },
  {
    id: 'tmpl-portfolio',
    title: 'Mage UI Obsidian Portfolio System',
    tagline: 'Ultra-modern glassmorphic developer portfolio with continuous marquees',
    category: 'ui',
    badge: 'Mage UI • Yash Style',
    techStack: ['React 19', 'Tailwind CSS v4', 'Vite 8', 'Lucide React'],
    features: ['Frosted glassmorphism panels', 'Dual kinetic continuous marquees', 'Interactive sound telemetry HUD', 'Zero AI-slop layout rules'],
    icon: Layers,
    orderUrl: 'https://f0undr-order.vercel.app/',
  },
  {
    id: 'tmpl-agent',
    title: 'Autonomous Multi-Tool Agent Scaffold',
    tagline: 'Reactive multi-tool autonomous agent loop with memory persistence',
    category: 'ai',
    badge: 'Agentic AI • GenAI',
    techStack: ['Node.js', 'TypeScript', 'Gemini API', 'Vector Embeddings'],
    features: ['Automated tool dispatch engine', 'Session memory serialization', 'Error auto-correction pipeline', 'Multi-platform webhook bridge'],
    icon: Bot,
    orderUrl: 'https://f0undr-order.vercel.app/',
  },
  {
    id: 'tmpl-forms',
    title: 'f Forms Precision Builder Suite',
    tagline: 'Precision Google Forms clone with instant analytics and dynamic logic',
    category: 'boilerplates',
    badge: 'Form Engine • Cloud',
    techStack: ['React', 'TypeScript', 'Tailwind', 'REST APIs'],
    features: ['Drag-and-drop question builder', 'Live respondent validation', 'Export to CSV / Excel', 'Conditional branching logic'],
    icon: FileText,
    orderUrl: 'https://f0undr-order.vercel.app/',
  },
  {
    id: 'tmpl-desktop',
    title: 'Aetheris 3D Desktop & Audio Engine',
    tagline: 'Cross-platform Electron framework with low-latency audio synthesis',
    category: 'desktop',
    badge: 'Electron • Audio FFI',
    techStack: ['Electron', 'Web Audio API', 'Node.js', 'C++ Addon'],
    features: ['Hardware-accelerated 3D renderer', 'Spatial sound synthesizer', 'Background multi-threading', 'Native system tray control'],
    icon: Monitor,
    orderUrl: 'https://f0undr-order.vercel.app/',
  },
];

export const TemplatesSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'mobile', label: 'Android & Mobile' },
    { id: 'boilerplates', label: 'Architecture Boilerplates' },
    { id: 'ui', label: 'UI Kits & Design' },
    { id: 'ai', label: 'Autonomous AI' },
    { id: 'desktop', label: 'Desktop & OS' },
  ];

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((tmpl) => {
      const matchesCategory = activeCategory === 'all' || tmpl.category === activeCategory;
      const matchesSearch =
        tmpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tmpl.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tmpl.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCopySpec = (tmpl: TemplateItem) => {
    playClickSound();
    const spec = 'f0undr Template Spec: ' + tmpl.title + '\nCategory: ' + tmpl.badge + '\nTech: ' + tmpl.techStack.join(', ') + '\nFeatures: ' + tmpl.features.join(' | ') + '\nOrder at: https://f0undr-order.vercel.app/';
    navigator.clipboard.writeText(spec);
    setCopiedId(tmpl.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="templates" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[300px] bg-gradient-to-l from-indigo-600/10 via-cyan-600/10 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-mono text-cyan-400">
                <Download className="w-3.5 h-3.5" />
                MODULAR TEMPLATE STORE &bull; DIGITAL ASSETS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
              Pre-Built <span className="text-gradient-cyan">Templates &amp; Starters</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl font-light leading-relaxed">
              Industrial-grade starter code, mobile APK scaffolds, encrypted storage engines, and glassmorphic UI systems ready for instant deployment or custom client commission.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search templates, frameworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-card text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 transition-all font-mono"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={playHoverSound}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-white border border-cyan-400/40 shadow-[0_0_20px_-4px_rgba(56,189,248,0.3)]'
                    : 'glass-pill text-slate-300 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((tmpl) => {
            const IconComp = tmpl.icon;
            const isCopied = copiedId === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onMouseEnter={playHoverSound}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-cyan-400/40 transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10 transition-all">
                      <IconComp className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
                      {tmpl.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {tmpl.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4">
                    {tmpl.tagline}
                  </p>

                  <div className="space-y-1.5 mb-5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    {tmpl.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {tmpl.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/05"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopySpec(tmpl)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-pill text-xs font-mono text-slate-300 hover:text-white cursor-pointer transition-all"
                    title="Copy full architecture specification"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                    <span>{isCopied ? 'Spec Copied' : 'Copy Spec'}</span>
                  </button>

                  <a
                    href={tmpl.orderUrl || 'https://f0undr-order.vercel.app/'}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClickSound}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl btn-primary-white text-xs font-semibold tracking-tight cursor-pointer group"
                  >
                    <span>Commission Code</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
