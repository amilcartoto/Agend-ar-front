import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import ProvinceDropdown from '@/components/ui/ProvinceDropdown';
import EventCard from '@/components/cards/EventCard';
import TicketModal from '@/components/modals/TicketModal';
import Footer from '@/components/Footer/Footer';
import SearchBar from '@/components/ui/SearchBar';
import { provincesData } from '@/data/provinces';
import { tryParseToISO, isISOInRange } from '@/lib/dateUtils';
import Carousel from '@/components/carousel/Carousel';


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filters, setFilters] = useState({ text: '', province: '', startDate: '', endDate: '' });

  const handleOpenModal = (evento) => { setSelectedEvent(evento); setIsModalOpen(true); };
  const handleAddToCart = (compra) => { alert(`✅ Agregado: ${compra.titulo}`); setIsModalOpen(false); };

  const destacadosNacionales = [
    { titulo: "Lollapalooza Argentina", fecha: "20 Nov", lugar: "Hipódromo SI", precio: 120000, categoria: "Festival", imagen: "https://images.unsplash.com/photo-1459749411177-0473ef7161a8?auto=format&fit=crop&q=80&w=600" },
    { titulo: "Cosquín Rock 2025", fecha: "10 Feb", lugar: "Punilla, Cba", precio: 85000, categoria: "Rock", imagen: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600" },
    { titulo: "Carnaval Gualeguaychú", fecha: "Ene 2025", lugar: "Entre Ríos", precio: 15000, categoria: "Carnaval", imagen: "https://images.unsplash.com/photo-1565593845686-350742f9e422?auto=format&fit=crop&q=80&w=600" },
    { titulo: "Fiesta Vendimia", fecha: "Mar 2025", lugar: "Mendoza", precio: 25000, categoria: "Cultura", imagen: "https://images.unsplash.com/photo-1599077638157-c57c74318624?auto=format&fit=crop&q=80&w=600" }
  ];

  // Construir lista plana de eventos a partir de provincesData
  const allEvents = useMemo(() => {
    const list = [];
    Object.entries(provincesData).forEach(([slug, pdata]) => {
      const provinceName = pdata.nombre;
      // eventos (estructura usada por EventCard)
      (pdata.eventos || []).forEach((ev, idx) => {
        list.push({
          id: `evt-${slug}-e-${idx}`,
          titulo: ev.titulo || ev.title || '',
          fecha: ev.fecha || ev.date || ev.start || '',
          lugar: ev.lugar || ev.location || ev.lugar || '',
          precio: ev.precio != null ? ev.precio : ev.price || 0,
          categoria: ev.categoria || ev.category || '',
          imagen: ev.imagen || ev.image || '',
          provinceSlug: slug,
          provinceName,
        });
      });

      // calendario (estructura diferente)
      (pdata.calendario || []).forEach((ev, idx) => {
        list.push({
          id: `cal-${slug}-c-${idx}`,
          titulo: ev.title || ev.titulo || '',
          fecha: ev.start || ev.fecha || '',
          lugar: ev.location || ev.location || '',
          precio: ev.precio != null ? ev.precio : 0,
          categoria: ev.category || ev.category || '',
          imagen: ev.imagen || '',
          provinceSlug: slug,
          provinceName,
        });
      });
    });
    return list;
  }, []);

  // Filtrado según los filtros del buscador
  const filteredEvents = useMemo(() => {
    const t = (filters.text || '').toLowerCase();
    const prov = filters.province || '';
    const start = filters.startDate || '';
    const end = filters.endDate || '';

    return allEvents.filter(ev => {
      if (prov && ev.provinceSlug !== prov) return false;
      if (start || end) {
        // try to normalize event date to ISO
        const iso = tryParseToISO(ev.fecha);
        if (!iso) return false;
        if (!isISOInRange(iso, start || null, end || null)) return false;
      }
      if (!t) return true;
      return (
        (ev.titulo && ev.titulo.toLowerCase().includes(t)) ||
        (ev.lugar && ev.lugar.toLowerCase().includes(t)) ||
        (ev.categoria && ev.categoria.toLowerCase().includes(t)) ||
        (ev.provinceName && ev.provinceName.toLowerCase().includes(t))
      );
    });
  }, [allEvents, filters]);

  return (
    <div className="min-h-screen bg-[#1e293b] text-gray-200 font-sans flex flex-col">
      <Head><title>Agend-ar | Eventos</title></Head>

      <div className="fixed bottom-4 right-4 z-[999] bg-white p-2 rounded-lg shadow-xl"><button onClick={() => setIsLoggedIn(!isLoggedIn)} className="px-3 py-1 rounded text-xs font-bold bg-green-100 text-green-700">{isLoggedIn ? '🟢 USUARIO' : '🔴 INVITADO'}</button></div>
      <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} event={selectedEvent} isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} onAddToCart={handleAddToCart} />

      <header className="relative h-[500px] flex items-center justify-center overflow-hidden bg-[#1e293b]">
        <div className="absolute inset-0">
           <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600')" }} />
           <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-transparent to-black/60"></div>
        </div>

        {/* LOGO SOLO - Tamaño Razonable (64px) */}
        <div className="absolute top-6 left-6 z-20">
            <Link href="/" className="hover:opacity-80 transition-opacity">
                <Image src="/Logo_agendar.png" alt="Logo" width={64} height={64} className="object-contain w-16 h-16 drop-shadow-lg" />
            </Link>
        </div>

        <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto mt-10">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">VIVÍ <span className="text-[#2dd4bf]">ARGENTINA.</span></h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">Descubrí recitales, obras de teatro, deportes y festivales.</p>
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-[#2dd4bf]/30 inline-flex flex-col md:flex-row items-center gap-4 shadow-2xl">
                <span className="text-white font-medium uppercase tracking-wide text-sm">Elige tu destino:</span>
                <div className="scale-110"><ProvinceDropdown /></div>
              </div>

              <SearchBar
                provinces={Object.entries(provincesData).map(([slug, p]) => ({ slug, nombre: p.nombre }))}
                onChange={(f) => setFilters(f)}
              />
            </div>
        </div>
      </header>

      <main className="flex-grow bg-[#1e293b]">
        {/* Resultados de búsqueda */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-white mb-4">Eventos <span className="text-[#2dd4bf]">Destacados</span>🌟</h2>
            </div>

          {filteredEvents.length > 0 ? (
            <Carousel events={filteredEvents} onBooking={handleOpenModal} />
          ) : (
            <div className="text-gray-400">No se encontraron eventos con esos filtros.</div>
          )}
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">Tendencias <span className="text-[#2dd4bf]">Nacionales</span> 🔥</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {destacadosNacionales.map((evento, index) => <EventCard key={index} {...evento} onBooking={() => handleOpenModal(evento)} />)}
            </div>
        </section>

        

        <section className="bg-[#0f172a] text-white py-20 relative overflow-hidden border-t border-gray-800">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#2dd4bf] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                    <h2 className="text-3xl font-bold mb-6">¿Organizás eventos?</h2>
                    <p className="text-gray-400 mb-8">Sumá tu teatro, club o centro cultural a Agend-ar.</p>
                    <button className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-[#0f172a] px-8 py-3 rounded-xl font-bold transition-all shadow-lg">Publicar mi evento</button>
                </div>
            </div>
        </section>
        
      </main>

      <Footer />
    </div>
  );
}
