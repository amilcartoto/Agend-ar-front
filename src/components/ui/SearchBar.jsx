import React, { useState, useEffect } from 'react';

export default function SearchBar({ provinces = [], onChange }) {
  const [text, setText] = useState('');
  const [province, setProvince] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  useEffect(() => {
    const t = setTimeout(() => {
      onChange && onChange({ text: text.trim(), province, startDate, endDate });
    }, 300);
    return () => clearTimeout(t);
  }, [text, province, startDate, endDate]);

  return (
      <div className="w-full max-w-5xl mx-auto mt-6">
      <div className="bg-[#0f172a] p-6 rounded-3xl border border-gray-700 shadow-2xl relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          
          {/* BUSCADOR DE TEXTO */}
          <div className="md:col-span-5 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
              ¿Qué buscas?
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500 group-focus-within:text-[#2dd4bf] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ej: Recital, Jazz, Teatro..."
                className="block w-full pl-10 pr-3 py-3 rounded-xl bg-[#1e293b] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] focus:border-transparent transition-all shadow-inner"
              />
            </div>
          </div>

          {/* SELECTOR DE PROVINCIA */}
          <div className="md:col-span-3 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
              Provincia
            </label>
            <div className="relative">
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="block w-full pl-3 pr-10 py-3 rounded-xl bg-[#1e293b] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] appearance-none cursor-pointer transition-all shadow-inner"
              >
                <option value="" className="bg-[#1e293b]">Todas</option>
                {provinces.map(p => (
                  <option key={p.slug} value={p.slug} className="bg-[#1e293b]">{p.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* FECHAS */}
          <div className="md:col-span-4 grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
                Desde
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="block w-full px-3 py-3 rounded-xl bg-[#1e293b] border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] transition-all shadow-inner"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
                Hasta
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="block w-full px-3 py-3 rounded-xl bg-[#1e293b] border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] transition-all shadow-inner"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
