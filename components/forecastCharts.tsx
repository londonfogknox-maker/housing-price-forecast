'use client';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface ChartProps {
  data: any[]; // We'll pass our forecastData here
}

export default function ForecastChart({ data }: ChartProps) {
  const chartData = data.map(d => ({
    name: `Yr ${d.year}`,
    Mortgage: d.monthlyMortgage,
    Tax: d.monthlyTax,
    Insurance: d.monthlyInsurance,
  }));

  return (
    <div className="w-full h-[450px] bg-[#141414] p-6 rounded-2xl border border-gray-800">
      <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">30-Year Monthly Cost Growth</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis dataKey="name" stroke="#666" fontSize={10} tickMargin={10} />
          <YAxis stroke="#666" fontSize={12} tickFormatter={(value) => `$${value}`} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
            itemStyle={{ fontSize: '12px' }}
          />
          <Legend verticalAlign="top" height={36}/>
          <Bar dataKey="Mortgage" stackId="a" fill="#f97316" />
          <Bar dataKey="Tax" stackId="a" fill="#4b5563" />
          <Bar dataKey="Insurance" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
