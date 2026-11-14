import { useState } from 'react';
import { Lightbulb, Zap, AlertTriangle, CheckCircle2, ShieldCheck, Share2 } from 'lucide-react';

export const StartupIdeaValidator = () => {
  const [ideaName, setIdeaName] = useState<string>('Autonomous Agent Dispatcher');
  const [urgency, setUrgency] = useState<number>(8);
  const [marketWillingness, setMarketWillingness] = useState<number>(9);
  const [unfairAdvantage, setUnfairAdvantage] = useState<number>(7);
  const [distributionFeasibility, setDistributionFeasibility] = useState<number>(8);
  const [moatDefensibility, setMoatDefensibility] = useState<number>(6);

  const totalScore = Math.round(
    ((urgency + marketWillingness + unfairAdvantage + distributionFeasibility + moatDefensibility) / 50) * 100
  );

  let statusLabel = 'Tier 1 • High Potential';
  let statusColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  let recommendation = 'Exceptional venture metrics. Rapidly build a functional MVP, validate with 5 design partners, and launch in public.';

  if (totalScore < 50) {
    statusLabel = 'High Friction • Needs Refinement';
    statusColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    recommendation = 'The current value proposition lacks either urgency or clear distribution channels. Conduct 10 problem interviews before writing code.';
  } else if (totalScore < 75) {
    statusLabel = 'Promising • Requires Moat';
    statusColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    recommendation = 'Solid opportunity, but watch out for commoditization. Identify your unfair technical distribution lever or proprietary data loop.';
  }

  const copyBrief = () => {
    const brief = `f0undr Idea Viability Assessment
Venture: ${ideaName}
Overall Viability Score: ${totalScore}/100 (${statusLabel})
- Problem Urgency: ${urgency}/10
- Willingness to Pay: ${marketWillingness}/10
- Unfair Advantage: ${unfairAdvantage}/10
- Distribution Flywheel: ${distributionFeasibility}/10
- Defensibility Moat: ${moatDefensibility}/10
Strategic Recommendation: ${recommendation}
Generated via f0undr Studio`;
    navigator.clipboard.writeText(brief);
    alert('Idea Brief copied to clipboard!');
  };

  return (
    <div className="flex flex-col relative text-[#f4f1ea]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(244,241,234,0.08)]">
        <div>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-normal text-[#f4f1ea] tracking-[-0.02em]">Startup Idea Viability Matrix</h3>
          </div>
          <p className="text-xs text-[#8d8b86] mt-1 font-light">
            Quantify venture viability across five core dimensional vectors.
          </p>
        </div>

        <button
          onClick={copyBrief}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)] text-[#f4f1ea] hover:border-cyan-400/50 transition-all cursor-pointer shadow-md self-start sm:self-auto"
        >
          <Share2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Copy Brief</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-[#8d8b86] block mb-2 font-semibold">
              Venture / Product Hypothesis
            </label>
            <input
              type="text"
              value={ideaName}
              onChange={(e) => setIdeaName(e.target.value)}
              className="w-full px-4 py-3 bg-[#0a0a0b] border border-[rgba(244,241,234,0.14)] rounded-2xl text-xs sm:text-sm text-[#f4f1ea] placeholder-[#8d8b86] focus:outline-none focus:border-cyan-400 transition-colors shadow-inner font-mono"
            />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-[#f4f1ea]">Problem Urgency (Hair-on-Fire Need)</span>
                <span className="text-cyan-400 font-bold">{urgency} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={urgency}
                onChange={(e) => setUrgency(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-[#f4f1ea]">Willingness to Pay (Commercial Intent)</span>
                <span className="text-cyan-400 font-bold">{marketWillingness} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={marketWillingness}
                onChange={(e) => setMarketWillingness(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-[#f4f1ea]">Unfair Advantage (Proprietary Tech / Speed)</span>
                <span className="text-cyan-400 font-bold">{unfairAdvantage} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={unfairAdvantage}
                onChange={(e) => setUnfairAdvantage(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-[#f4f1ea]">Distribution Flywheel (Low CAC Scaling)</span>
                <span className="text-cyan-400 font-bold">{distributionFeasibility} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={distributionFeasibility}
                onChange={(e) => setDistributionFeasibility(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-[#f4f1ea]">Moat &amp; Defensibility (Network Effects / Code IP)</span>
                <span className="text-cyan-400 font-bold">{moatDefensibility} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={moatDefensibility}
                onChange={(e) => setMoatDefensibility(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl p-6 bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)] flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase text-[#8d8b86]">Viability Score</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border font-semibold ${statusColor}`}>
                {statusLabel}
              </span>
            </div>

            <div className="text-5xl font-mono font-bold text-[#f4f1ea] mb-2 tracking-tight">
              {totalScore}
              <span className="text-lg text-[#8d8b86] font-normal"> / 100</span>
            </div>

            <div className="w-full h-2 rounded-full bg-[#16161a] overflow-hidden mb-6 border border-[rgba(244,241,234,0.06)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-700"
                style={{ width: `${totalScore}%` }}
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#111114] border border-[rgba(244,241,234,0.08)] mb-4">
              <div className="text-xs font-mono text-cyan-300 font-semibold mb-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Strategic Guidance</span>
              </div>
              <p className="text-xs text-[#8d8b86] leading-relaxed font-light">
                {recommendation}
              </p>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#8d8b86] pt-4 border-t border-[rgba(244,241,234,0.06)] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Validated by f0undr Venture Engineering</span>
          </div>
        </div>
      </div>
    </div>
  );
};
