"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Carrito from "./carrito/Carrito";
import UbicacionesDropdown from "../Footer/UbicacionesDropdown";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  // Logo: scroll si estoy en home / redirige si no
  const handleLogoClick = () => {
    if (router.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="bg-[#1e293b] shadow-lg fixed top-0 left-0 w-full z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">

          {/* HAMBURGUESA (SIEMPRE VISIBLE) */}
          <button
            className="text-gray-300 text-2xl hover:text-white transition"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            ☰
          </button>

          {/* LOGO CENTRADO */}
          <button
            onClick={handleLogoClick}
            className="absolute left-1/2 -translate-x-1/2 hover:opacity-80 transition"
          >
            <Image
              src="/Logo-agendar.png"
              alt="Agend-ar"
              width={90}
              height={90}
              className="object-contain"
            />
          </button>

          {/* CARRITO + LOGIN */}
          <div className="flex items-center gap-4">
            <Carrito />

            {!isLoggedIn ? (
              <button
                onClick={() => setIsLoggedIn(true)}
                className="bg-[#2dd4bf] text-black font-semibold px-4 py-2 rounded-full hover:opacity-90 transition"
              >
                Login
              </button>
              ) : (
              <span className="text-sm text-gray-300">👤 Usuario</span>
            )}
          </div>
        </nav>
      </header>

      {/* MODAL HAMBURGUESA */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-[#1e293b] w-11/12 max-w-sm rounded-xl p-6 relative">

            {/* CERRAR */}
            <button
              className="absolute top-3 right-4 text-xl text-gray-300 hover:text-white"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              ✕
            </button>

            {/* TITULO */}
            <h2 className="text-xl text-white font-bold mb-6 border-b border-[#2dd4bf] pb-2">
              Eventos
            </h2>

            {/* UBICACIONES */}
            <UbicacionesDropdown />
          </div>
        </div>
      )}
    </>
  );
}
