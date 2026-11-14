import { useState } from 'react';
import { ArrowUpRight, Globe, ShoppingBag, CheckCircle2, Sparkles, ExternalLink, ShieldCheck, Smartphone, Brain, Bot, BookOpen, FileText, Download } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

interface WebPlatform {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  url: string;
  metrics: string;
  specs: string[];
  techStack: string[];
  gradient: string;
  accentColor: string;
  icon: typeof Globe;
  ctaText: string;
}

const WEBS: WebPlatform[] = [
  {
    id: 'ffs-portal',
    title: 'Fauji Foundation School Institutional Portal',
    category: 'Institutional Flagship',
    tagline: 'Official institutional portal of FFS Renala Khurd • Character building, STEM & Admissions',
    description: 'High-performance institutional web portal architected, engineered, and branded by f0undr. Features BISE Sahiwal matriculation board distinctions, STEM laboratory showcases, admission portals for Session 2026-2027, and character-building academic architectures under Fauji Foundation Pakistan.',
    url: 'https://ffs.f0undrteam.site/',
    metrics: 'Live Production • Branding by f0undr',
    specs: [
      'Official institutional portal for Fauji Foundation School',
      'Branding, visual identity & sovereign web architecture by f0undr',
      'Admissions portal, STEM laboratories & distinctions showcase',
      '100% responsive, high-speed edge delivery with sub-100ms latency'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Cloudflare Edge', 'Branding by f0undr'],
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    accentColor: '#10b981',
    icon: Globe,
    ctaText: 'Launch FFS Portal',
  },
  {
    id: 'f0-ai',
    title: 'f0undr AI // Autonomous Intelligence Engine',
    category: 'Autonomous AI Platform',
    tagline: 'Official autonomous AI search engine, neural intelligence & multi-script NLP',
    description: 'Proprietary autonomous conversational AI assistant and search engine engineered by f0undr. Delivers real-time web intelligence, multi-script understanding, neural document parsing, and compounding taught memory.',
    url: 'https://ai.f0undrteam.site/',
    metrics: 'Live • Sovereign AI Engine',
    specs: [
      'Official proprietary AI intelligence platform of f0undr',
      'Autonomous live web fact extraction and compounding memory brain',
      'Multi-script NLP support across English, Urdu, and regional languages',
      'High-throughput real-time streaming inference architecture'
    ],
    techStack: ['Autonomous AI', 'TypeScript', 'Vector Retrieval', 'Multi-Script NLP', 'Cloudflare Edge'],
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    accentColor: '#06b6d4',
    icon: Bot,
    ctaText: 'Launch f0undr AI',
  },
  {
    id: 'online-quran',
    title: 'Online Quran Learning Platform',
    category: 'Sovereign EdTech Portal',
    tagline: 'Global digital Quranic education, Tajweed mastery & interactive recitation portal',
    description: 'Global digital Quran academy and educational web portal architected and engineered by f0undr. Features interactive Tajweed curricula, certified tutors, one-on-one virtual classrooms, and flexible global learning schedules.',
    url: 'https://online-quran-learning.f0undrteam.site/',
    metrics: 'Live • Global Academic Portal',
    specs: [
      'Global digital Quran academy portal engineered by f0undr',
      'One-on-one virtual classroom scheduling across international time zones',
      'Interactive Tajweed pronunciation and recitation curriculum guides',
      '100% responsive, high-speed low-latency educational interface'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Interactive Recitation', 'Cloudflare Edge'],
    gradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
    accentColor: '#14b8a6',
    icon: BookOpen,
    ctaText: 'Launch Quran Academy',
  },
  {
    id: 'f-forms',
    title: 'f-Forms Platform // Precision Form Builder',
    category: 'Dynamic Document Architecture',
    tagline: '1:1 precision dynamic form engine, sovereign data capture & schema validation',
    description: 'High-precision form and document architecture platform built by f0undr. Delivers zero-latency client-side validation, drag-and-drop schema generation, encrypted data capture, and instant webhook integrations.',
    url: 'https://f-forms.f0undrteam.site/',
    metrics: 'Live • Precision Form Engine',
    specs: [
      'Sovereign interactive dynamic form builder and document capture engine',
      'Drag-and-drop schema creation with instantaneous client-side validation',
      'Zero third-party tracking, end-to-end encrypted submission payloads',
      'Direct webhook integrations and automated export workflows'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Dynamic Schemas', 'Webhook API'],
    gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    accentColor: '#6366f1',
    icon: FileText,
    ctaText: 'Launch f-Forms Studio',
  },
  {
    id: 'f0-order',
    title: 'f0undr Executive Order Atelier',
    category: 'Executive Commission Gateway',
    tagline: 'Bespoke software commissions, venture scoping & engineering gateway',
    description: 'The dedicated client intake atelier for bespoke software commissions. Enterprise partners, startup founders, and innovators engage f0undr for custom Android APKs, autonomous AI agent workflows, and ultra-high-performance web platforms with rapid 48-hour prototype delivery.',
    url: 'https://order.f0undrteam.site/#',
    metrics: 'Active Intake • 48h Prototype SLA',
    specs: [
      'Direct line to f0undr engineering leadership',
      'Full-lifecycle Android APK & autonomous AI scoping',
      '48-hour interactive prototype turnaround',
      'End-to-end bespoke intellectual property handover'
    ],
    techStack: ['Commission Gateway', 'TypeScript', 'Tailwind CSS', 'Sovereign Portal'],
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    accentColor: '#f59e0b',
    icon: ShoppingBag,
    ctaText: 'Commission Project',
  },
  {
    id: 'f0-themes',
    title: 'f0undr Themes APK // Native Android App',
    category: 'Native Mobile Engineering',
    tagline: 'Complete native Android application built with AGP 8.7.2 & SDK 35',
    description: 'Native Android application featuring custom ThemeApplyEngine, WallpaperManager system integration, curated dark obsidian theme catalogs, and zero-telemetry sovereign performance.',
    url: 'https://f0undrteam.site/#projects',
    metrics: 'SDK 35 • Clean Debug APK',
    specs: [
      'Compiled with Android Gradle Plugin 8.7.2 and SDK 35',
      'ThemeApplyEngine with WallpaperManager service hooks',
      'Lightweight 6.5 MB clean footprint with zero tracking',
      'Offline SQLite caching and Material 3 design'
    ],
    techStack: ['Android SDK 35', 'Java', 'Kotlin', 'Gradle 8.14'],
    gradient: 'from-sky-500/20 via-blue-500/10 to-transparent',
    accentColor: '#0284c7',
    icon: Smartphone,
    ctaText: 'Inspect APK Architecture',
  },
  {
    id: 'f0-brain-test',
    title: 'f0undr Game: 1st — Brain Test',
    category: 'Cognitive Game Suite',
    tagline: 'First-principles interactive cognitive intelligence & logic game',
    description: 'The flagship cognitive testing and logic architecture game designed by f0undr. Features multi-stage logical deduction puzzles, algorithmic spatial tests, speed-of-thought metrics, and interactive neural reasoning challenges.',
    url: 'https://f0undrteam.site/mind-mastery/',
    metrics: '1st Edition • Full Cognitive Suite',
    specs: [
      'Multi-stage logical reasoning and algorithmic puzzle engines',
      'Real-time response time and deduction accuracy scoring',
      'Interactive Canvas micro-interactions and Web Audio feedback',
      'Offline-first progressive architecture with zero tracking'
    ],
    techStack: ['TypeScript', 'Canvas Physics', 'Web Audio API', 'React 19'],
    gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
    accentColor: '#a855f7',
    icon: Brain,
    ctaText: 'Launch Brain Test Game',
  },
  {
    id: 'dany-downloader',
    title: 'DANY // Universal Video & Media Downloader',
    category: 'Universal Media Extraction',
    tagline: 'Download Anything • Universal Video, Media, APK, EXE & Sticker Downloader',
    description: 'High-velocity sovereign media extraction platform engineered by f0undr. Paste any link to extract and download high-resolution videos without watermarks (TikTok, Instagram Reels, YouTube MP4/MP3), webpage image bundles, GIFs, Telegram stickers, Discord emojis, Android APKs, and Windows EXEs. Fast, free, and unrestricted.',
    url: 'https://dany.f0undrteam.site/',
    metrics: 'Live Production • Unrestricted',
    specs: [
      'Universal link extraction across video, social reels, audio, APKs, and EXEs',
      'Watermark-free high-definition video processing for TikTok, Reels, and YouTube',
      'Instant batch extraction for webpage graphics, GIFs, Telegram stickers, and emojis',
      '100% unrestricted sovereign delivery with zero telemetry or data retention'
    ],
    techStack: ['Media Extraction', 'TypeScript', 'Node Stream Pipes', 'Tailwind CSS', 'Cloudflare Edge'],
    gradient: 'from-fuchsia-500/20 via-pink-500/10 to-transparent',
    accentColor: '#d946ef',
    icon: Download,
    ctaText: 'Launch DANY Downloader',
  },
];

export const OthersSection = () => {
  const [activeId, setActiveId] = useState<string>('ffs-portal');
  const active = WEBS.find((w) => w.id === activeId) || WEBS[0];

  return (
    <section id="others" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-[rgba(244,241,234,0.1)] bg-[#0a0a0b] overflow-hidden">
      <div className="absolute top-1/2 -left-20 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sovereign Portals // Production Platforms</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#f4f1ea] tracking-[-0.035em]">
            Official Platforms &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-[#f4f1ea] to-emerald-300">Production Webs</span>
          </h2>
          <p className="text-[#8d8b86] text-sm sm:text-base max-w-2xl mt-4 font-light leading-relaxed">
            Direct access to f0undr's verified digital platforms: our autonomous AI engine, the official Fauji Foundation School institutional portal, online Quran learning academy, precision f-Forms builder, bespoke executive order studio, native Android APKs, and cognitive logic games.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {WEBS.map((web) => {
              const isSelected = web.id === activeId;
              const IconComponent = web.icon;
              return (
                <div
                  key={web.id}
                  onClick={() => {
                    playClickSound();
                    setActiveId(web.id);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer group relative overflow-hidden ${
                    isSelected
                      ? 'bg-[#16161a] border-cyan-400/50 shadow-xl shadow-cyan-950/30 -translate-y-0.5'
                      : 'bg-[#111114] border-[rgba(244,241,234,0.1)] hover:border-[rgba(244,241,234,0.25)] hover:bg-[#141418]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-emerald-400" />
                  )}

                  <div className="min-w-0 flex-1 pl-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${web.accentColor}18`, color: web.accentColor }}
                      >
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#8d8b86]">
                        {web.category}
                      </span>
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-[#f4f1ea] group-hover:text-cyan-300 transition-colors">
                      {web.title}
                    </div>
                    <div className="text-xs text-[#8d8b86] font-light line-clamp-1 mt-1">
                      {web.tagline}
                    </div>
                  </div>

                  <a
                    href={web.url}
                    target={web.url.startsWith('http') ? '_blank' : '_self'}
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2.5 rounded-xl bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)] text-[#8d8b86] hover:text-[#f4f1ea] hover:border-cyan-400/50 transition-all shrink-0"
                    title={`Launch ${web.title}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              );
            })}

            <div className="mt-2 p-5 rounded-2xl bg-[#111114] border border-[rgba(244,241,234,0.08)]">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Sovereign Ecosystem</span>
              </div>
              <p className="text-xs text-[#8d8b86] font-light leading-relaxed">
                All platforms operate under the sovereign governance of f0undr. Directed by Muhammad Huzaifa Zahid (Founder). Zero third-party telemetry, zero vendor lock-in.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl p-6 sm:p-10 bg-[#111114] border border-[rgba(244,241,234,0.14)] shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
              <span className="absolute top-3 left-3 text-[10px] font-mono text-[rgba(244,241,234,0.2)] select-none">&#9484;</span>
              <span className="absolute top-3 right-3 text-[10px] font-mono text-[rgba(244,241,234,0.2)] select-none">&#9488;</span>
              <span className="absolute bottom-3 left-3 text-[10px] font-mono text-[rgba(244,241,234,0.2)] select-none">&#9492;</span>
              <span className="absolute bottom-3 right-3 text-[10px] font-mono text-[rgba(244,241,234,0.2)] select-none">&#9494;</span>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[rgba(244,241,234,0.08)]">
                  <div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono border font-semibold inline-flex items-center gap-1.5"
                      style={{
                        backgroundColor: `${active.accentColor}15`,
                        color: active.accentColor,
                        borderColor: `${active.accentColor}30`,
                      }}
                    >
                      <active.icon className="w-3.5 h-3.5" />
                      {active.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-normal text-[#f4f1ea] mt-3 tracking-[-0.03em]">
                      {active.title}
                    </h3>
                  </div>

                  <div className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#0a0a0b] text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{active.metrics}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#8d8b86] font-light leading-relaxed">
                  {active.description}
                </p>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#f4f1ea] mb-3 flex items-center gap-2 font-bold">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Architecture &amp; Systems Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {active.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#8d8b86] font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#8d8b86] mb-2 font-bold">
                    Technology Fabric
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {active.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-3 py-1 rounded-lg bg-[#0a0a0b] text-[#f4f1ea] border border-[rgba(244,241,234,0.1)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-[rgba(244,241,234,0.08)] flex flex-wrap items-center justify-between gap-4 mt-8">
                <div className="text-xs font-mono text-[#8d8b86]">
                  Gateway: <span className="text-[#f4f1ea] underline underline-offset-4">{active.url}</span>
                </div>

                <a
                  href={active.url}
                  target={active.url.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f4f1ea] text-[#0a0a0b] text-xs font-semibold hover:bg-white transition-all shadow-lg group shrink-0"
                >
                  <span>{active.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
