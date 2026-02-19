import React from 'react';

export default function EventCard({ 
  title, date, location, price, imageUrl, category, // English keys (API standard)
  titulo, fecha, lugar, precio, imagen, categoria: catLegacy, // Spanish keys (Legacy/Fallback)
  onBooking 
}) {
  
  // Normalize props
  const displayTitle = title || titulo;
  const displayDate = date || fecha;
  const displayLocation = location || lugar;
  const displayPrice = price !== undefined ? price : precio;
  const displayImage = imageUrl || imagen;
  const displayCategory = category || catLegacy;

  // Función para formatear la fecha
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Fecha a confirmar';
    
    // Si es ISO (2024-02-10...)
    const dateObj = new Date(dateStr);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: '2-digit' });
    }
    
    // Si es texto plano (legacy)
    return dateStr;
  };

  return (
    <div className="group bg-[#0f172a] rounded-xl shadow-lg border border-gray-700/50 overflow-hidden hover:shadow-[#2dd4bf]/20 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      
      <div className="relative h-48 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url('${displayImage}')` }}
        />
        {/* Etiqueta Menta */}
        <div className="absolute top-3 left-3 bg-[#2dd4bf] text-[#0f172a] text-xs font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wide">
          {displayCategory}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 relative">
        <div className="flex flex-col items-start gap-1 mb-3 text-sm">
          <span className="text-[#2dd4bf] font-semibold bg-[#2dd4bf]/10 px-2 py-1 rounded border border-[#2dd4bf]/20 capitalize">
            📅 {formatDate(displayDate)}
          </span>

          <span className="text-white font-bold text-lg mt-1">
            {(displayPrice || 0) === 0 ? 'Gratis' : `$${(displayPrice || 0).toLocaleString('es-AR')}`}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-[#2dd4bf] transition-colors line-clamp-2 min-h-[3.5rem]">
          {displayTitle}
        </h3>

        <p className="text-gray-400 text-sm mb-4 flex items-center gap-1 line-clamp-1 border-t border-gray-700/50 pt-3 mt-auto">
          📍 {displayLocation}
        </p>

        <div className="mt-4">
          <button 
            onClick={onBooking}
            className="block w-full text-center bg-[#2dd4bf] text-[#0f172a] font-bold py-3 rounded-lg hover:bg-[#14b8a6] transition-all hover:shadow-[0_0_15px_rgba(45,212,191,0.4)] cursor-pointer"
          >
            {displayPrice === 0 ? 'Reservar Lugar' : 'Comprar Entradas'}
          </button>
        </div>
      </div>
    </div>
  );
}