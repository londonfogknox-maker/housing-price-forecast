'use client';
import { useState } from 'react';
import { calculateFloridaForecast } from '@/lib/forecast';
import ForecastChart from '@/components/forecastCharts';
import ForecastTable from '@/components/forecastTables';

export default function Home() {
  const [price, setPrice] = useState(450000);
  const [interest, setInterest] = useState(6.5);
  const [tax, setTax] = useState(5400);
  const [insurance, setInsurance] = useState(4200);
  const [growth, setGrowth] = useState(7); // Your "What-If" Aggression Rate
  const [downPayment] = useState(90000);

  const forecastData = calculateFloridaForecast(price, downPayment, interest, tax, insurance, growth);

  const prices = [150000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000];
  const rates = [3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0];
  const growthRates = [3, 5, 7, 10, 12, 15];

  return (
    <main className="p-8 max-w-6xl mx-auto space-y-8 bg-[#0a0a0a] min-h-screen text-white">
      <header>
        <h1 className="text-4xl font-extrabold text-orange-600 tracking-tight">Florida Homeowner's 30-Year Pricing Forecast</h1>
        <p className="text-gray-500 mt-2">See how much you will actually pay every month over the next 30 years as insurance increases.</p>
      </header>

      {/* User Input Section */}
      <section className="bg-[#141414] p-8 rounded-2xl border border-gray-800 shadow-2xl text-white">
        <h2 className="text-xl font-bold mb-6 border-b border-gray-800 pb-2">Home Property Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Property Value */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-gray-400">Market Price</label>
            <select 
              value={price} onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
            >
              {prices.map(p => <option key={p} value={p}>${p.toLocaleString()}</option>)}
            </select>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-gray-400">Interest Rate</label>
            <select 
              value={interest} onChange={(e) => setInterest(Number(e.target.value))}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
            >
              {rates.map(r => <option key={r} value={r}>{r}%</option>)}
            </select>
          </div>

          {/* Property Tax */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-gray-500">Annual Tax ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input 
                type="number" value={tax} onChange={(e) => setTax(Number(e.target.value))}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 pl-7 text-white focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          {/* Home Insurance */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-gray-500">Annual Insurance ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input 
                type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 pl-7 text-white focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          {/* Aggression Rate (What-If) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-gray-400">Insurance Growth</label>
            <select 
              value={growth} onChange={(e) => setGrowth(Number(e.target.value))}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
            >
              {growthRates.map(g => <option key={g} value={g}>{g}% / year</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* --- FORECAST CHART & TABLE --- */}
        <div className="lg:col-span-7">
          <ForecastChart data={forecastData} />
        </div>
        <div className="lg:col-span-3">
          <ForecastTable data={forecastData} />
        </div>
        </section>
    </main>
  );
}
