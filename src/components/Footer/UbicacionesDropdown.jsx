"use client";
import { useState } from "react";

export default function UbicacionesDropdown() {
  const [open, setOpen] = useState(false);

  const ubicaciones = [
    { id: 1, nombre: "Córdoba", url: "https://paginaexterna.com/ubicaciones" },
    { id: 2, nombre: "Buenos Aires", url: "https://paginaexterna.com/ubicaciones" },
    { id: 3, nombre: "Santa Fe", url: "https://paginaexterna.com/ubicaciones" },
    { id: 4, nombre: "Jujuy", url: "https://paginaexterna.com/ubicaciones" },
    { id: 5, nombre: "Formosa", url: "https://paginaexterna.com/ubicaciones" },
  ];

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span style={{ cursor: "pointer" }}>Ubicaciones</span>

      {open && (
        <div>
          <ul>
            {ubicaciones.map((u) => (
              <li key={u.id}>
                <a
                  href={u.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {u.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
