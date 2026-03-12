'use client';

interface TableProps {
  data: any[];
}

export default function ForecastTable({ data }: TableProps) {
  const summaryIndices = [0, 9, 19, 29];

  return (
    <div className="bg-[#141414] p-6 rounded-2xl border border-gray-800 h-full flex flex-col">
      <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Projected Monthly Cost</h3>
      
      <div className="space-y-6 flex-grow">
        {summaryIndices.map((idx) => {
          const d = data[idx];
          if (!d) return null;

          // --- CALCULATE THE BURDEN ---
          const insuranceRatio = d.monthlyInsurance / d.totalMonthly;
          
          // Determine the color class based on the ratio
          let statusColor = "text-gray-500"; // Default
          if (insuranceRatio > 0.25) {
            statusColor = "text-red-500 font-bold"; // Danger
          } else if (insuranceRatio > 0.15) {
            statusColor = "text-yellow-500 font-bold"; // Warning
          } else {
            statusColor = "text-green-500 font-bold"; // Healthy
          }

          return (
            <div key={idx} className="border-b border-gray-800 pb-4 last:border-0">
              <div className="flex justify-between items-end mb-2">
                <span className="text-orange-500 font-bold text-lg">Year {d.year}</span>
                <span className="text-2xl font-black">${d.totalMonthly.toLocaleString()}</span>
              </div>
              
              <div className="grid grid-cols-3 text-[10px] uppercase gap-2">
                <div className="text-gray-500 font-semibold">P&I: ${d.monthlyMortgage}</div>
                <div className="text-gray-500 font-semibold">Tax: ${d.monthlyTax}</div>
                
                {/* --- CONDITIONAL STYLING --- */}
                <div className={`${statusColor}`}>
                  Ins: ${d.monthlyInsurance}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-[10px] text-gray-400 uppercase font-bold">Risk Indicator</span>
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          Insurance labels in <span className="text-green-500">green</span> means your insurance cost is a normal level below 15% of costs, while <span className="text-yellow-500">Yellow</span> insurance cost means its costing 15-24% of monthly cost and the insurnace cost turn <span className="text-red-500">Red</span> when they exceed 25% of your total monthly carrying cost.
        </p>
      </div>
    </div>
  );
}

