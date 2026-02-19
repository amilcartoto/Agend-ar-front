import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple password for demo
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1e293b]">
        <form onSubmit={handleLogin} className="bg-[#0f172a] p-8 rounded-xl shadow-2xl border border-gray-700">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Acceso Admin</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña del equipo"
            className="w-full p-3 rounded bg-[#1e293b] text-white border border-gray-600 focus:border-[#2dd4bf] outline-none mb-4"
          />
          <button type="submit" className="w-full bg-[#2dd4bf] text-[#0f172a] font-bold py-3 rounded hover:bg-[#14b8a6] transition-colors">
            Ingresar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e293b] text-white p-8 pt-32">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-[#2dd4bf]">Panel de Administración</h1>
          <Link href="/" className="text-gray-400 hover:text-white">
            ← Volver al sitio
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: Nueva Provincia */}
          <Link href="/admin/create-province" className="group">
            <div className="bg-[#0f172a] p-8 rounded-2xl border border-gray-700 hover:border-[#2dd4bf] transition-all cursor-pointer h-full">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform w-fit">📍</div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-[#2dd4bf] transition-colors">Nueva Provincia</h2>
              <p className="text-gray-400">Agrega un nuevo destino (Córdoba, Mendoza, etc.) con su foto de portada y descripción.</p>
            </div>
          </Link>

          {/* Card: Nuevo Evento */}
          <Link href="/admin/create-event" className="group">
            <div className="bg-[#0f172a] p-8 rounded-2xl border border-gray-700 hover:border-[#2dd4bf] transition-all cursor-pointer h-full">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform w-fit">🎟️</div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-[#2dd4bf] transition-colors">Nuevo Evento</h2>
              <p className="text-gray-400">Carga un recital, obra de teatro o festival asignándolo a una provincia existente.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
