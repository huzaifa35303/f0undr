import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, Send, MessageSquare, Clock, Zap, Cpu, Code2 } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export const OrderSection = () => {
  const ORDER_URL = 'https://order.f0undrteam.site/#';
  const WHATSAPP_URL = 'https://wa.me/923446789261';

  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('Web Architecture');
  const [clientName, setClientName] = useState<string>('');
  const [clientContact, setClientContact] = useState<string>('');
  const [projectBrief, setProjectBrief] = useState<string>('');
  const [isTransmitted, setIsTransmitted] = useState<boolean>(false);

  const disciplines = [
    { id: 'web', label: 'Web Architecture', icon: Code2 },
    { id: 'android', label: 'Native Android APK', icon: Cpu },
    { id: 'ai', label: 'Autonomous AI Swarm', icon: Sparkles },
    { id: 'custom', label: 'Custom System / Tool', icon: Zap },
  ];

  const guarantees = [
    {
      title: '48-Hour Prototype SLA',
      desc: 'Interactive, production-ready code prototype delivered within 48 hours of brief validation.',
      metric: '48h SLA',
    },
    {
      title: 'Founder-Direct Direction',
      desc: 'Engineered and audited directly under Muhammad Huzaifa Zahid (Founder) & f0undr Team.',
      metric: 'Direct Access',
    },
    {
      title: '99+ Lighthouse Guarantee',
      desc: 'Sovereign GPU-accelerated motion, 60 FPS animations, sub-100ms interaction latency.',
      metric: '60 FPS Clean',
    },
    {
      title: '100% Sovereign IP Handover',
      desc: 'Complete source repository, clean build manifests, zero vendor lock-in or telemetry.',
      metric: 'Full Ownership',
    },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    playClickSound();
    setIsTransmitted(true);
    const targetUrl = `${ORDER_URL}?discipline=${encodeURIComponent(selectedDiscipline)}&name=${encodeURIComponent(clientName)}&contact=${encodeURIComponent(clientContact)}&brief=${encodeURIComponent(projectBrief)}`;
    setTimeout(() => {
      window.open(targetUrl, '_blank');
    }, 600);
  };

  return (
    <section id="order" className="py-28 relative overflow-hidden bg-[#0a0a0b] text-[#f4f1ea] border-t border-[rgba(244,241,234,0.1)]">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-cyan-600/15 via-emerald-600/10 to-indigo-600/15 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-[#111114] text-xs font-mono mb-5 text-cyan-300 shadow-lg shadow-cyan-950/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wider uppercase">Say Hello 👋 &bull; Commission Atelier</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#f4f1ea] tracking-[-0.04em] mb-5">
            Commission a Project with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-[#f4f1ea] to-emerald-300">f0undr Leadership</span>
          </h2>

          <p className="text-[#8d8b86] text-sm sm:text-base leading-relaxed font-light max-w-2xl mx-auto">
            Direct executive engagement with Founder Muhammad Huzaifa Zahid and the f0undr engineering team. 
            No junior liaisons, no agency fluff, and zero bureaucratic latency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-10 bg-[#111114] border border-[rgba(244,241,234,0.14)] shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[rgba(244,241,234,0.08)] mb-6">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-1">
                    Direct Inquiry Console
                  </div>
                  <h3 className="text-xl sm:text-2xl font-normal text-[#f4f1ea] tracking-[-0.03em]">
                    Submit Project Scope
                  </h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)] text-[11px] font-mono text-[#8d8b86]">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Avg Response: &lt; 2 hrs</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono text-[#8d8b86] uppercase tracking-wider mb-2">
                    Select Discipline // Project Architecture
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {disciplines.map((d) => {
                      const IconComp = d.icon;
                      const isSelected = selectedDiscipline === d.label;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => {
                            playClickSound();
                            setSelectedDiscipline(d.label);
                          }}
                          onMouseEnter={playHoverSound}
                          className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-20 ${
                            isSelected
                              ? 'bg-cyan-500/15 border-cyan-400 text-[#f4f1ea] shadow-md shadow-cyan-950/40'
                              : 'bg-[#0a0a0b] border-[rgba(244,241,234,0.1)] text-[#8d8b86] hover:text-[#f4f1ea] hover:border-[rgba(244,241,234,0.2)]'
                          }`}
                        >
                          <IconComp className={`w-4 h-4 ${isSelected ? 'text-cyan-300' : 'text-[#8d8b86]'}`} />
                          <span className="text-xs font-semibold leading-tight">{d.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#8d8b86] uppercase tracking-wider mb-2">
                      Your Name / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Alex Vance, Apex Labs"
                      className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)] text-xs sm:text-sm text-[#f4f1ea] placeholder-[#8d8b86]/50 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8d8b86] uppercase tracking-wider mb-2">
                      Email or WhatsApp *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientContact}
                      onChange={(e) => setClientContact(e.target.value)}
                      placeholder="name@domain.com or +1..."
                      className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)] text-xs sm:text-sm text-[#f4f1ea] placeholder-[#8d8b86]/50 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8d8b86] uppercase tracking-wider mb-2">
                    Project Vision &amp; Deliverables *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    placeholder="Describe your architecture requirements, target deadline, key features, and performance targets..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)] text-xs sm:text-sm text-[#f4f1ea] placeholder-[#8d8b86]/50 focus:outline-none focus:border-cyan-400 transition-colors resize-none font-sans"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    onMouseEnter={playHoverSound}
                    className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#f4f1ea] text-[#0a0a0b] text-xs sm:text-sm font-semibold tracking-tight hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all cursor-pointer group"
                  >
                    <span>Transmit Project Brief</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 text-xs font-semibold transition-all text-center"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Instant WhatsApp Line</span>
                  </a>
                </div>

                {isTransmitted && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Brief queued. Redirecting to official order studio gateway...</span>
                  </div>
                )}
              </form>
            </div>

            <div className="mt-6 pt-6 border-t border-[rgba(244,241,234,0.08)] flex items-center justify-between text-[11px] font-mono text-[#8d8b86]">
              <span>Official Gateway: order.f0undrteam.site</span>
              <span className="text-cyan-400">SSL Encrypted &bull; 256-Bit</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#111114] border border-[rgba(244,241,234,0.14)] relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>EXECUTIVE SERVICE LEVEL AGREEMENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-normal text-[#f4f1ea] tracking-[-0.03em] mb-4">
                Engineered for High-Velocity Innovators
              </h3>
              <p className="text-xs text-[#8d8b86] font-light leading-relaxed mb-6">
                All software commissions are executed directly by f0undr. Directed by Muhammad Huzaifa Zahid (Founder), delivering sovereign software with zero third-party telemetry.
              </p>

              <div className="space-y-4">
                {guarantees.map((g, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#0a0a0b] border border-[rgba(244,241,234,0.08)] hover:border-cyan-400/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#f4f1ea]">{g.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {g.metric}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8d8b86] font-light leading-relaxed">
                      {g.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/30 to-[#111114] border border-cyan-500/30 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  Sovereign Studio Gateway
                </div>
                <div className="text-sm font-semibold text-[#f4f1ea] mt-0.5">
                  Launch Official Order Studio
                </div>
                <div className="text-xs text-[#8d8b86] font-light">
                  Direct web application with custom pricing models
                </div>
              </div>

              <a
                href={ORDER_URL}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="p-3.5 rounded-2xl bg-[#f4f1ea] text-[#0a0a0b] hover:bg-white transition-all shadow-lg shrink-0 group"
                title="Launch Order Studio"
              >
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
