import React, { useState, useEffect } from 'react';

export default function SearchBar({ provinces = [], onChange }) {
  const [text, setText] = useState('');
  const [province, setProvince] = useState('');
  const [date, setDate] = useState('');

  // Debounce changes to avoid excessive updates
  useEffect(() => {
    const t = setTimeout(() => {
      onChange && onChange({ text: text.trim(), province, date });
    }, 300);
    return () => clearTimeout(t);
  }, [text, province, date]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white/5 backdrop-blur-sm rounded-3xl border border-[#2dd4bf]/20">
      <div className="flex flex-col md:flex-row gap-3 items-center">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Buscar por título, lugar o categoría..."
          className="flex-1 bg-transparent border border-gray-600 px-4 py-3 rounded-lg text-white placeholder-gray-300 outline-none"
        />

        <select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="bg-transparent border border-gray-600 px-3 py-3 rounded-lg text-white outline-none"
        >
          <option value="">Todas las provincias</option>
          {provinces.map(p => (
            <option key={p.slug} value={p.slug}>{p.nombre}</option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-transparent border border-gray-600 px-3 py-3 rounded-lg text-white outline-none"
        />
      </div>
    </div>
  );
}
