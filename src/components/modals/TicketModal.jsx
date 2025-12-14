import React, { useState, useEffect } from 'react';

export default function TicketModal({ isOpen, onClose, event, isLoggedIn, onLogin, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  
  // SOLUCIÓN AL ERROR:
  // Usamos un pequeño setTimeout para sacar la actualización del ciclo principal de renderizado.
  // Esto elimina el error de "cascading renders".
  useEffect(() => {
    if (isOpen) {
        const timer = setTimeout(() => setQuantity(1), 0);
        return () => clearTimeout(timer); // Limpieza de memoria
    }
  }, [isOpen, event]);

  if (!isOpen || !event) return null;

  const total = event.precio * quantity;

  // Funciones del contador
  const increment = (e) => {
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const decrement = (e) => {
    e.stopPropagation();
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
        
        {/* Header Modal */}
        <div className="relative h-32 bg-gray-900">
            {event.imagen && (
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: `url('${event.imagen}')` }}
                />
            )}
            <button 
                onClick={onClose}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors z-10"
            >
                ✕
            </button>
            <div className="absolute bottom-3 left-4 text-white z-10">
                <p className="text-xs font-bold uppercase tracking-wider bg-[#2dd4bf] text-[#1e293b] px-2 py-0.5 rounded-md inline-block mb-1">{event.categoria}</p>
                <h3 className="text-xl font-bold leading-tight drop-shadow-md">{event.titulo}</h3>
            </div>
        </div>

        <div className="p-6 text-gray-900">
            {!isLoggedIn ? (
                <div className="text-center py-4">
                    <div className="bg-teal-50 text-teal-900 p-4 rounded-xl mb-6 border border-teal-100">
                        🔒 <strong>Inicia sesión para continuar</strong>
                        <p className="text-sm mt-1">Necesitas una cuenta para reservar.</p>
                    </div>
                    <button onClick={onLogin} className="w-full bg-[#2dd4bf] hover:bg-[#14b8a6] text-[#0f172a] font-bold py-3 rounded-xl transition-all shadow-lg">
                        Ingresar o Registrarse
                    </button>
                    <button onClick={onClose} className="mt-4 text-gray-500 text-sm hover:underline">Cancelar</button>
                </div>
            ) : (
                <div>
                    <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-1">Fecha y Lugar</p>
                        <p className="font-medium">{event.fecha} • {event.lugar}</p>
                    </div>
                    
                    {/* Controles cantidad */}
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
                        <span className="font-semibold text-gray-700">Cantidad</span>
                        <div className="flex items-center gap-4 bg-white rounded-lg border border-gray-300 p-1 shadow-sm">
                            <button type="button" onClick={decrement} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-md font-bold text-lg">-</button>
                            <span className="w-6 text-center font-bold text-xl">{quantity}</span>
                            <button type="button" onClick={increment} className="w-8 h-8 flex items-center justify-center text-[#14b8a6] hover:bg-teal-50 rounded-md font-bold text-lg">+</button>
                        </div>
                    </div>

                    <div className="flex justify-between items-end mb-8 pt-4 border-t border-gray-100">
                        <div><p className="text-sm text-gray-500">Precio Unitario</p><p className="font-medium">${event.precio.toLocaleString()}</p></div>
                        <div className="text-right"><p className="text-sm text-gray-500">Total</p><p className="text-2xl font-bold text-[#1e293b]">${total.toLocaleString()}</p></div>
                    </div>
                    
                    <button onClick={() => onAddToCart({ ...event, cantidad: quantity, total })} className="w-full bg-[#2dd4bf] hover:bg-[#14b8a6] text-[#0f172a] font-bold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                        <span>🛒</span> Confirmar Reserva
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}