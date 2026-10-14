import { useState } from 'react';
import { Lightbulb, Zap, AlertTriangle, CheckCircle2, ShieldCheck, Share2 } from 'lucide-react';

export const StartupIdeaValidator = () => {
  const [ideaName, setIdeaName] = useState<string>('Autonomous Agent Dispatcher');
  const [urgency, setUrgency] = useState<number>(8);
  const [marketWillingness, setMarketWillingness] = useState<number>(9);
  const [unfairAdvantage, setUnfairAdvantage] = useState<number>(7);
  const [distributionFeasibility, setDistributionFeasibility] = useState<number>(8);
  const [moatDefensibility, setMoatDefensibility] = useState<number>(6);

  // Overall score out of 100
  const totalScore = Math.round(
    ((urgency + marketWillingness + unfairAdvantage + distributionFeasibility + moatDefensibility) / 50) * 100
  );

  let statusLabel = 'Tier 1 • High Potential';
  let statusColor = 'text-[#166534] bg-[#f0fdf4] border-[#dcfce7]';
  let recommendation = 'Exceptional venture metrics. Rapidly build a functional MVP, validate with 5 design partners, and launch in public.';

  if (totalScore < 50) {
    statusLabel = 'High Friction • Needs Refinement';
    statusColor = 'text-rose-800 bg-[#fdf2f2] border-rose-300';
    recommendation = 'The current value proposition lacks either urgency or clear distribution channels. Conduct 10 problem interviews before writing code.';
  } else if (totalScore < 75) {
    statusLabel = 'Promising • Requires Moat';
    statusColor = 'text-[#c2410c] bg-[#fff7ed] border-[#ffedd5]';
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
    <div className="flex flex-col relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e7e5e4]">
        <div>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif text-lg font-bold text-[#1c1917]">Startup Idea Viability Matrix</h3>
          </div>
          <p className="text-xs text-[#57534e] mt-1 font-normal">
            Quantify founder intuition across five core dimensional vectors.
          </p>
        </div>

        <button
          onClick={copyBrief}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg btn-editorial-outline self-start sm:self-auto transition-colors shadow-2xs"
        >
          <Share2 className="w-3.5 h-3.5" /> Copy Brief
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* Sliders Input Column */}
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label className="text-xs font-medium text-[#1c1917] block mb-1.5">Venture / Product Hypothesis</label>
            <input
              type="text"
              value={ideaName}
              onChange={(e) => setIdeaName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#e7e5e4] rounded-xl text-sm text-[#1c1917] focus:outline-none focus:border-[#1c1917] shadow-2xs"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#1c1917] font-medium">1. Hair-on-Fire Problem Urgency</span>
              <span className="font-mono text-[#2b5346] font-bold">{urgency}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={urgency}
              onChange={(e) => setUrgency(Number(e.target.value))}
              className="w-full accent-[#1c1917] cursor-pointer"
            />
            <p className="text-[11px] text-[#78716c] mt-0.5">Is the pain acute right now, or is it a "nice to have vitamin"?</p>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#1c1917] font-medium">2. Willingness to Pay &amp; Economics</span>
              <span className="font-mono text-[#2b5346] font-bold">{marketWillingness}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={marketWillingness}
              onChange={(e) => setMarketWillingness(Number(e.target.value))}
              className="w-full accent-[#1c1917] cursor-pointer"
            />
            <p className="text-[11px] text-[#78716c] mt-0.5">Do buyers have existing budgets, or is monetization hypothetical?</p>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#1c1917] font-medium">3. Founder Unfair Advantage</span>
              <span className="font-mono text-[#2b5346] font-bold">{unfairAdvantage}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={unfairAdvantage}
              onChange={(e) => setUnfairAdvantage(Number(e.target.value))}
              className="w-full accent-[#1c1917] cursor-pointer"
            />
            <p className="text-[11px] text-[#78716c] mt-0.5">Do you possess proprietary insight, distribution, or unique domain depth?</p>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#1c1917] font-medium">4. Distribution &amp; Acquisition Velocity</span>
              <span className="font-mono text-[#2b5346] font-bold">{distributionFeasibility}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={distributionFeasibility}
              onChange={(e) => setDistributionFeasibility(Number(e.target.value))}
              className="w-full accent-[#1c1917] cursor-pointer"
            />
            <p className="text-[11px] text-[#78716c] mt-0.5">Can you acquire the first 100 users without burning paid advertising budgets?</p>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#1c1917] font-medium">5. Defensibility &amp; Switching Costs</span>
              <span className="font-mono text-[#2b5346] font-bold">{moatDefensibility}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={moatDefensibility}
              onChange={(e) => setMoatDefensibility(Number(e.target.value))}
              className="w-full accent-[#1c1917] cursor-pointer"
            />
            <p className="text-[11px] text-[#78716c] mt-0.5">How difficult is it for an incumbent or competitor to clone in 48 hours?</p>
          </div>
        </div>

        {/* Score & Evaluation Card */}
        <div className="bg-[#f5f2eb] border border-[#e7e5e4] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#78716c]">Viability Score</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-5xl font-mono font-bold text-[#1c1917]">{totalScore}</span>
              <span className="text-[#78716c] font-mono text-lg">/100</span>
            </div>

            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mt-3 ${statusColor}`}>
              {statusLabel}
            </div>

            <div className="mt-6 pt-5 border-t border-[#e7e5e4] space-y-3">
              <div className="flex items-start gap-2 text-xs text-[#1c1917]">
                <CheckCircle2 className="w-4 h-4 text-[#2b5346] shrink-0 mt-0.5" />
                <span>Highest Signal: {urgency >= marketWillingness ? 'Acute Pain Point' : 'Strong Monetization'}</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-[#1c1917]">
                {moatDefensibility < 6 ? (
                  <AlertTriangle className="w-4 h-4 text-[#c2410c] shrink-0 mt-0.5" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-[#2b5346] shrink-0 mt-0.5" />
                )}
                <span>Defensibility: {moatDefensibility < 6 ? 'Vulnerable to Clones' : 'Durable Moat'}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-white border border-[#e7e5e4] text-xs text-[#57534e] leading-relaxed shadow-2xs">
            <span className="font-semibold text-[#1c1917] block mb-1 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-600" /> Strategic Action:
            </span>
            {recommendation}
          </div>
        </div>
      </div>
    </div>
  );
};
