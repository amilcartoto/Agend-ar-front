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
    <div className="w-full max-w-4xl mx-auto p-3 md:p-4 bg-white/5 backdrop-blur-sm rounded-3xl border border-[#2dd4bf]/20">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <input
          aria-label="Buscar"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Buscar por título, lugar o categoría..."
          className="flex-1 bg-transparent border border-gray-600 px-4 py-3 rounded-lg text-white placeholder-gray-300 outline-none"
        />

        <select
          aria-label="Provincia"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="w-full md:w-auto bg-transparent border border-gray-600 px-3 py-3 rounded-lg text-white outline-none"
        >
          <option value="">Todas las provincias</option>
          {provinces.map(p => (
            <option key={p.slug} value={p.slug}>{p.nombre}</option>
          ))}
        </select>

        <div className="flex gap-2 w-full md:w-auto">
          <div className="flex flex-col">
            <label htmlFor="start-date" className="text-xs text-gray-300 mb-1">Fecha inicio</label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent border border-gray-600 px-3 py-3 rounded-lg text-white outline-none"
              aria-label="Fecha inicio"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="end-date" className="text-xs text-gray-300 mb-1">Fecha fin</label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent border border-gray-600 px-3 py-3 rounded-lg text-white outline-none"
              aria-label="Fecha fin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
