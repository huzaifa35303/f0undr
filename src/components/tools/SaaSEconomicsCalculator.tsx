import { useState } from 'react';
import { DollarSign, Users, RefreshCw, TrendingUp } from 'lucide-react';

export const SaaSEconomicsCalculator = () => {
  const [customers, setCustomers] = useState<number>(180);
  const [arpu, setArpu] = useState<number>(79); // Average Revenue Per User ($/mo)
  const [churnRate, setChurnRate] = useState<number>(3.5); // Monthly churn %
  const [cac, setCac] = useState<number>(240); // Customer Acquisition Cost ($)

  // Calculations
  const mrr = customers * arpu;
  const arr = mrr * 12;
  const churnDecimal = Math.max(0.005, churnRate / 100);
  const averageLifetimeMonths = 1 / churnDecimal;
  const ltv = Math.round(arpu * averageLifetimeMonths);
  const ltvToCac = cac > 0 ? (ltv / cac).toFixed(1) : '∞';
  const paybackMonths = arpu > 0 ? (cac / arpu).toFixed(1) : '0';

  const numericLtvToCac = Number(ltvToCac);
  let healthLabel = 'Exceptional Unit Economics';
  let healthClass = 'text-[#166534] bg-[#f0fdf4] border-[#dcfce7]';

  if (numericLtvToCac < 2) {
    healthLabel = 'Burn Warning • High Acquisition Drag';
    healthClass = 'text-rose-800 bg-[#fdf2f2] border-rose-300';
  } else if (numericLtvToCac < 3) {
    healthLabel = 'Acceptable • Needs Retention Boost';
    healthClass = 'text-[#c2410c] bg-[#fff7ed] border-[#ffedd5]';
  }

  return (
    <div className="flex flex-col relative">
      <div className="flex items-center gap-2 pb-6 border-b border-[#e7e5e4]">
        <DollarSign className="w-5 h-5 text-[#2b5346]" />
        <div>
          <h3 className="font-serif text-lg font-bold text-[#1c1917]">SaaS &amp; Venture Economics Forecaster</h3>
          <p className="text-xs text-[#57534e]">
            Simulate recurring revenue, churn half-life, and customer acquisition payback.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* Sliders Input */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#1c1917] font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#2b5346]" /> Active Customers
              </span>
              <span className="font-mono text-[#1c1917] font-bold">{customers.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10"
              max="5000"
              step="10"
              value={customers}
              onChange={(e) => setCustomers(Number(e.target.value))}
              className="w-full accent-[#1c1917] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#1c1917] font-medium flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#2b5346]" /> Average Revenue Per User (ARPU / mo)
              </span>
              <span className="font-mono text-[#1c1917] font-bold">${arpu}</span>
            </div>
            <input
              type="range"
              min="5"
              max="500"
              step="5"
              value={arpu}
              onChange={(e) => setArpu(Number(e.target.value))}
              className="w-full accent-[#1c1917] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#1c1917] font-medium flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-[#c2410c]" /> Monthly Churn Rate (%)
              </span>
              <span className="font-mono text-[#c2410c] font-bold">{churnRate}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="15"
              step="0.5"
              value={churnRate}
              onChange={(e) => setChurnRate(Number(e.target.value))}
              className="w-full accent-[#c2410c] cursor-pointer"
            />
            <p className="text-[11px] text-[#78716c] mt-0.5">
              Average customer lifespan: ~{averageLifetimeMonths.toFixed(1)} months
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#1c1917] font-medium flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#2b5346]" /> Blended CAC (Cost to Acquire)
              </span>
              <span className="font-mono text-[#1c1917] font-bold">${cac}</span>
            </div>
            <input
              type="range"
              min="20"
              max="1000"
              step="20"
              value={cac}
              onChange={(e) => setCac(Number(e.target.value))}
              className="w-full accent-[#1c1917] cursor-pointer"
            />
          </div>
        </div>

        {/* Live Output Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#f5f2eb] border border-[#e7e5e4] rounded-xl p-4 flex flex-col justify-between">
            <span className="text-xs text-[#78716c] font-mono font-medium">Monthly Recurring (MRR)</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#1c1917] mt-2">
              ${mrr.toLocaleString()}
            </div>
            <span className="text-[11px] text-[#78716c] mt-1 font-mono">Cash baseline</span>
          </div>

          <div className="bg-[#f5f2eb] border border-[#e7e5e4] rounded-xl p-4 flex flex-col justify-between">
            <span className="text-xs text-[#78716c] font-mono font-medium">Annual Run-Rate (ARR)</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#2b5346] mt-2">
              ${arr.toLocaleString()}
            </div>
            <span className="text-[11px] text-[#78716c] mt-1 font-mono">Normalized run rate</span>
          </div>

          <div className="bg-[#f5f2eb] border border-[#e7e5e4] rounded-xl p-4 flex flex-col justify-between">
            <span className="text-xs text-[#78716c] font-mono font-medium">Customer Lifetime Value</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#166534] mt-2">
              ${ltv.toLocaleString()}
            </div>
            <span className="text-[11px] text-[#78716c] mt-1 font-mono">Net revenue per logo</span>
          </div>

          <div className="bg-[#f5f2eb] border border-[#e7e5e4] rounded-xl p-4 flex flex-col justify-between">
            <span className="text-xs text-[#78716c] font-mono font-medium">LTV / CAC Ratio</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#c2410c] mt-2">
              {ltvToCac}x
            </div>
            <span className="text-[11px] text-[#78716c] mt-1 font-mono">Target &gt; 3.0x</span>
          </div>

          <div className="col-span-2 bg-white border border-[#e7e5e4] rounded-xl p-4 flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-xs text-[#78716c] font-mono block">CAC Payback Speed</span>
              <span className="text-base font-mono font-bold text-[#1c1917]">
                {paybackMonths} Months
              </span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${healthClass}`}>
              {healthLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
