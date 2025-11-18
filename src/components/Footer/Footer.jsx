"use client";

import style from './Footer.module.css';
import Image from "next/image";
import { useState } from "react";
import UpcomingEventsModal from "./UpcomingEventsModal";
import UbicacionesDropdown from "./UbicacionesDropdown";

export default function Footer() {
 const [modalOpen, setModalOpen] = useState(false);
  return (
    <footer>
      <div>
        <div>
          <div>
           <Image 
            src="/Logo_agendar.png" alt="Logo de Agend-ar"
            width={120} 
            height={80} 
            />
          </div>
        <p>Tu agenda de eventos nacional.</p>
        </div>

        <div>
          <h3>Descubrir</h3>
          <ul>
            <li style={{ cursor: "pointer" }} onClick={() => setModalOpen(true)}>
              Próximos Eventos
            </li>
            <li>
             <UbicacionesDropdown />
            </li>
            <li>Promociones</li>
          </ul>
        </div>
        
        <UpcomingEventsModal 
        open={modalOpen}
        onClose={() => setModalOpen(false)} />
        
        <div>
          <h3>Ayuda</h3>
          <ul>
            <li>Contacto</li>
            <li>Términos y Condiciones</li>
            <li>Política de Privacidad</li>
            <li>Preguntas Frecuentes (FAQ)</li>
          </ul>
        </div>

        <div>
          <h3>Síguenos</h3>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
            >
              <path d="M9 8H6v4h3v12h5V12h3.6l.4-4h-4V6c0-.9.2-1.3 1.1-1.3H19V0h-3.8C11.6 0 10 1.6 10 4.6V8z" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c3.2 0 3.6 0 4.9.1 3.2.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.9s0 3.6-.1 4.9c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.2-.1-4.8-1.7-4.9-4.9C2 15.6 2 15.3 2 12s0-3.6.1-4.9c.1-3.2 1.7-4.8 4.9-4.9C8.4 2 8.8 2 12 2zm0 3.5A6.5 6.5 0 1 0 18.5 12 6.5 6.5 0 0 0 12 5.5zm0 10.5a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.6-11.8a1.4 1.4 0 1 1-1.4 1.4 1.4 1.4 0 0 1 1.4-1.4z" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.6c-.9.4-1.9.7-2.9.8A4.6 4.6 0 0 0 24 3a9.9 9.9 0 0 1-3.2 1.3 4.6 4.6 0 0 0-7.9 4.2C8 8.3 4.2 6.3 1.7 3.2c-.5.9-.7 2-.7 3.1 0 2 1 3.7 2.5 4.7-.8 0-1.7-.3-2.4-.7v.1c0 2.8 2 5.2 4.7 5.7-.5.1-.9.2-1.5.2-.4 0-.7 0-1-.1.7 2.3 2.9 4 5.4 4.1A9.3 9.3 0 0 1 0 20c3 2 6.6 2.6 10.2 2.6C21 22.6 24 13.9 24 7.2v-.6A8.4 8.4 0 0 0 24 4.6z" />
            </svg>
          </div>
        </div>

      </div>

      <div>
        © 2024 Agend-ar. Todos los derechos reservados.
      </div>
   </footer>
  );
}
