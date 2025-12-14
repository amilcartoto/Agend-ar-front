"use client";

import Image from "next/image";
import { useState } from "react";
import UpcomingEventsModal from "./UpcomingEventsModal";
import UbicacionesDropdown from "./UbicacionesDropdown";

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    // Usamos el color --color-dark (slate-900) que definimos
    <footer className="bg-[#1e293b] text-gray-300 pt-16 pb-8 font-sans border-t border-gray-700 mt-auto">
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* COLUMNA 1: Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               {/* Logo Imagen */}
               <div className="bg-transparent p-0">
                 <Image 
                    src="/Logo_agendar.png" 
                    alt="Agend-ar" 
                    width={50} 
                    height={50} 
                    className="object-contain"
                 />
               </div>
               {/* Texto imitando el Logo: AGEND (Blanco) - AR (Menta) */}
               <span className="text-2xl font-bold text-white tracking-tight">
                 AGEND<span className="text-[#2dd4bf]">-AR</span>
               </span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed mt-2">
                Tu agenda de eventos nacional. Conectamos pasiones en cada rincón del país.
            </p>
          </div>

          {/* COLUMNA 2: Descubrir */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-b border-[#2dd4bf] pb-2 inline-block">Descubrir</h3>
            <ul className="space-y-3 text-sm">
              <li 
                className="hover:text-[#2dd4bf] transition-colors cursor-pointer flex items-center gap-2" 
                onClick={() => setModalOpen(true)}
              >
                📅 Próximos Eventos
              </li>
              <li>
                <UbicacionesDropdown />
              </li>
              <li className="hover:text-[#2dd4bf] transition-colors cursor-pointer">
                🔥 Promociones
              </li>
            </ul>
          </div>
        
          <UpcomingEventsModal open={modalOpen} onClose={() => setModalOpen(false)} />
        
          {/* COLUMNA 3: Ayuda */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-b border-[#2dd4bf] pb-2 inline-block">Ayuda</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Contacto</li>
              <li className="hover:text-white cursor-pointer transition-colors">Términos y Condiciones</li>
              <li className="hover:text-white cursor-pointer transition-colors">Política de Privacidad</li>
              <li className="hover:text-white cursor-pointer transition-colors">Preguntas Frecuentes (FAQ)</li>
            </ul>
          </div>

          {/* COLUMNA 4: Redes */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-b border-[#2dd4bf] pb-2 inline-block">Síguenos</h3>
            <div className="flex gap-4">
               {/* Botones de redes con el color de marca al pasar el mouse */}
               <div className="bg-gray-800 p-2 rounded-full hover:bg-[#2dd4bf] hover:text-black hover:-translate-y-1 transition-all cursor-pointer text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.6l.4-4h-4V6c0-.9.2-1.3 1.1-1.3H19V0h-3.8C11.6 0 10 1.6 10 4.6V8z" /></svg>
               </div>
               <div className="bg-gray-800 p-2 rounded-full hover:bg-[#2dd4bf] hover:text-black hover:-translate-y-1 transition-all cursor-pointer text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.6c-.9.4-1.9.7-2.9.8A4.6 4.6 0 0 0 24 3a9.9 9.9 0 0 1-3.2 1.3 4.6 4.6 0 0 0-7.9 4.2C8 8.3 4.2 6.3 1.7 3.2c-.5.9-.7 2-.7 3.1 0 2 1 3.7 2.5 4.7-.8 0-1.7-.3-2.4-.7v.1c0 2.8 2 5.2 4.7 5.7-.5.1-.9.2-1.5.2-.4 0-.7 0-1-.1.7 2.3 2.9 4 5.4 4.1A9.3 9.3 0 0 1 0 20c3 2 6.6 2.6 10.2 2.6C21 22.6 24 13.9 24 7.2v-.6A8.4 8.4 0 0 0 24 4.6z" /></svg>
               </div>
               <div className="bg-gray-800 p-2 rounded-full hover:bg-[#2dd4bf] hover:text-black hover:-translate-y-1 transition-all cursor-pointer text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c3.2 0 3.6 0 4.9.1 3.2.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.9s0 3.6-.1 4.9c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.2-.1-4.8-1.7-4.9-4.9C2 15.6 2 15.3 2 12s0-3.6.1-4.9c.1-3.2 1.7-4.8 4.9-4.9C8.4 2 8.8 2 12 2zm0 3.5A6.5 6.5 0 1 0 18.5 12 6.5 6.5 0 0 0 12 5.5zm0 10.5a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.6-11.8a1.4 1.4 0 1 1-1.4 1.4 1.4 1.4 0 0 1 1.4-1.4z" /></svg>
               </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-xs text-gray-500">
          © 2025 Agend-ar. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}