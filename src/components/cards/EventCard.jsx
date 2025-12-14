import React from 'react';

export default function EventCard({ titulo, fecha, lugar, precio, imagen, categoria, onBooking }) {
  return (
    <div className="group bg-white rounded-xl shadow-lg border border-gray-700/10 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-80">
      
      <div className="relative h-48 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url('${imagen}')` }}
        />
        {/* Etiqueta Menta */}
        <div className="absolute top-3 left-3 bg-[#2dd4bf] text-[#0f172a] text-xs font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wide">
          {categoria}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 bg-white">
        <div className="flex justify-between items-center mb-3 text-sm">
          <span className="text-teal-700 font-semibold bg-teal-50 px-2 py-1 rounded">
            📅 {fecha}
          </span>
          <span className="text-gray-900 font-bold">
            {precio === 0 ? 'Gratis' : `$${precio.toLocaleString()}`}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-[#14b8a6] transition-colors">
          {titulo}
        </h3>

        <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
          📍 {lugar}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <button 
            onClick={onBooking}
            className="block w-full text-center bg-[#1e293b] text-white font-medium py-2.5 rounded-lg hover:bg-[#2dd4bf] hover:text-[#0f172a] transition-colors cursor-pointer shadow-md"
          >
            {precio === 0 ? 'Reservar Lugar' : 'Comprar Entradas'}
          </button>
        </div>
      </div>
    </div>
  );
}