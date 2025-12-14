"use client";
import { useState } from "react";
import Link from "next/link"; // Usamos Link para navegación rápida

export default function UbicacionesDropdown() {
  const [open, setOpen] = useState(false);

  // Ahora apuntan a tus páginas reales
  const ubicaciones = [
    { id: 1, nombre: "Córdoba", url: "/provinces/cordoba" },
    { id: 2, nombre: "Buenos Aires", url: "/provinces/buenos-aires" },
    { id: 3, nombre: "Santa Fe", url: "/provinces/santa-fe" },
    { id: 4, nombre: "Jujuy", url: "/provinces/jujuy" },
    { id: 5, nombre: "Formosa", url: "/provinces/formosa" },
  ];

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="cursor-pointer hover:text-blue-400 transition-colors flex items-center gap-2">
        📍 Ubicaciones <span className="text-[10px]">▼</span>
      </span>

      {/* Menú Desplegable con estilos */}
      {open && (
        <div className="absolute left-0 top-full mt-1 w-48 bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden z-50">
          <ul className="py-1">
            {ubicaciones.map((u) => (
              <li key={u.id}>
                <Link
                  href={u.url}
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm"
                >
                  {u.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}