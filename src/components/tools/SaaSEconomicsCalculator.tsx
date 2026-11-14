import { useState } from 'react';
import { DollarSign, TrendingUp, Users, RefreshCw, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

export const SaaSEconomicsCalculator = () => {
  const [arpu, setArpu] = useState<number>(49);
  const [cac, setCac] = useState<number>(120);
  const [churnRate, setChurnRate] = useState<number>(3.5);
  const [grossMargin, setGrossMargin] = useState<number>(85);

  const churnFraction = Math.max(0.001, churnRate / 100);
  const lifetimeMonths = Math.round(1 / churnFraction);
  const clv = Math.round((arpu * (grossMargin / 100)) / churnFraction);
  const ltvCacRatio = cac > 0 ? parseFloat((clv / cac).toFixed(2)) : 0;
  const paybackMonths = arpu > 0 && grossMargin > 0 ? parseFloat((cac / (arpu * (grossMargin / 100))).toFixed(1)) : 0;

  let healthLabel = 'Exceptional Unit Economics';
  let healthClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';

  if (ltvCacRatio < 1.5 || paybackMonths > 18) {
    healthLabel = 'Critical Friction • Negative Unit Economics';
    healthClass = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  } else if (ltvCacRatio < 3.0 || paybackMonths > 12) {
    healthLabel = 'Moderate Health • Optimize Payback';
    healthClass = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  }

  return (
    <div className="flex flex-col relative text-[#f4f1ea]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(244,241,234,0.08)]">
        <div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-normal text-[#f4f1ea] tracking-[-0.02em]">SaaS &amp; Venture Economics Forecaster</h3>
          </div>
          <p className="text-xs text-[#8d8b86] mt-1 font-light">
            Real-time LTV/CAC ratio, payback velocity, and customer lifetime value modeler.
          </p>
        </div>

        <div className={`px-3 py-1.5 rounded-full text-xs font-mono border font-semibold flex items-center gap-1.5 ${healthClass}`}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{healthLabel}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-start">
        <div className="lg:col-span-7 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#8d8b86] block mb-2 font-semibold">
                Monthly ARPU ($)
              </label>
              <input
                type="number"
                min="1"
                value={arpu}
                onChange={(e) => setArpu(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[rgba(244,241,234,0.14)] rounded-xl text-xs sm:text-sm text-[#f4f1ea] font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#8d8b86] block mb-2 font-semibold">
                Customer Acquisition Cost ($)
              </label>
              <input
                type="number"
                min="0"
                value={cac}
                onChange={(e) => setCac(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full px-4 py-2.5 bg-[#0a0a0b] border border-[rgba(244,241,234,0.14)] rounded-xl text-xs sm:text-sm text-[#f4f1ea] font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-[#f4f1ea]">Monthly Churn Rate</span>
                <span className="text-cyan-400 font-bold">{churnRate}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="15"
                step="0.5"
                value={churnRate}
                onChange={(e) => setChurnRate(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-[#f4f1ea]">Gross Margin</span>
                <span className="text-emerald-400 font-bold">{grossMargin}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="95"
                step="5"
                value={grossMargin}
                onChange={(e) => setGrossMargin(parseInt(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
          <div className="p-5 rounded-2xl bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)]">
            <span className="text-[11px] font-mono text-[#8d8b86] block mb-1">LTV / CAC Ratio</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-cyan-400">{ltvCacRatio}x</div>
            <span className="text-[10px] text-[#8d8b86] block mt-1">Benchmark: &ge; 3.0x</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)]">
            <span className="text-[11px] font-mono text-[#8d8b86] block mb-1">CAC Payback</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">{paybackMonths} mo</div>
            <span className="text-[10px] text-[#8d8b86] block mt-1">Benchmark: &le; 12 mo</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)]">
            <span className="text-[11px] font-mono text-[#8d8b86] block mb-1">Customer Lifetime</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#f4f1ea]">{lifetimeMonths} mo</div>
            <span className="text-[10px] text-[#8d8b86] block mt-1">Based on {churnRate}% churn</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0a0a0b] border border-[rgba(244,241,234,0.12)]">
            <span className="text-[11px] font-mono text-[#8d8b86] block mb-1">Customer LTV</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-amber-400">${clv}</div>
            <span className="text-[10px] text-[#8d8b86] block mt-1">Gross margin adjusted</span>
          </div>
        </div>
      </div>
    </div>
  );
};
