import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { provincesData } from '@/data/provinces';
import { tryParseToISO, isISOInRange } from '@/lib/dateUtils';
import EventCalendar from '@/components/calendar/EventCalendar';
import EventCard from '@/components/cards/EventCard';
import TicketModal from '@/components/modals/TicketModal';
import ProvinceDropdown from '@/components/ui/ProvinceDropdown';
import SearchBar from '@/components/ui/SearchBar';

export default function ProvincePage() {
  const router = useRouter();
  const { slug } = router.query; 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const provinceData = slug ? provincesData[String(slug).toLowerCase()] || null : null;

  const [filters, setFilters] = useState({ text: '', province: '', startDate: '', endDate: '' });

  const provinceEvents = useMemo(() => {
    if (!provinceData) return [];
    const list = [];
    (provinceData.eventos || []).forEach((ev, idx) => {
      list.push({
        id: `evt-${idx}`,
        titulo: ev.titulo || ev.title || '',
        fecha: ev.fecha || ev.date || ev.start || '',
        lugar: ev.lugar || ev.location || '',
        precio: ev.precio != null ? ev.precio : ev.price || 0,
        categoria: ev.categoria || ev.category || '',
        imagen: ev.imagen || ev.image || '',
        raw: ev,
      });
    });
    (provinceData.calendario || []).forEach((ev, idx) => {
      list.push({
        id: `cal-${idx}`,
        titulo: ev.title || ev.titulo || '',
        fecha: ev.start || ev.fecha || '',
        lugar: ev.location || ev.lugar || '',
        precio: ev.precio != null ? ev.precio : 0,
        categoria: ev.category || ev.category || '',
        imagen: ev.imagen || '',
        raw: ev,
      });
    });
    return list;
  }, [provinceData]);

  const filteredEvents = useMemo(() => {
    const t = (filters.text || '').toLowerCase();
    const prov = filters.province || '';
    const start = filters.startDate || '';
    const end = filters.endDate || '';

    return provinceEvents.filter(ev => {
      if (prov && prov !== '' && prov !== String(slug)) return false;
      if (start || end) {
        const iso = tryParseToISO(ev.fecha);
        if (!iso) return false;
        if (!isISOInRange(iso, start || null, end || null)) return false;
      }
      if (!t) return true;
      return (
        (ev.titulo && ev.titulo.toLowerCase().includes(t)) ||
        (ev.lugar && ev.lugar.toLowerCase().includes(t)) ||
        (ev.categoria && ev.categoria.toLowerCase().includes(t))
      );
    });
  }, [provinceEvents, filters, slug]);

  const handleOpenModal = (evento) => { setSelectedEvent(evento); setIsModalOpen(true); };
  const handleAddToCart = (compra) => { alert(`✅ Agregado: ${compra.titulo}`); setIsModalOpen(false); };

  const categorias = [
    { nombre: 'Cine', id: 'cine', icon: '🎬' },
    { nombre: 'Deportes', id: 'deportes', icon: '⚽' },
    { nombre: 'Gastronomía', id: 'gastronomia', icon: '🍷' },
    { nombre: 'Música', id: 'musica', icon: '🎵' },
    { nombre: 'Teatro', id: 'teatro', icon: '🎭' },
  ];

  if (!slug) return <div className="p-10 text-center bg-[#1e293b] text-white">Cargando...</div>;
  if (!provinceData) return <div className="min-h-screen bg-[#1e293b] flex flex-col items-center justify-center text-white"><h1 className="text-4xl font-bold mb-4">No encontrado</h1><Link href="/" className="bg-[#2dd4bf] text-black px-6 py-3 rounded-lg font-bold">Volver</Link></div>;

  return (
    <div className="min-h-screen bg-[#1e293b] text-gray-200 scroll-smooth font-sans">
      <Head><title>Agenda {provinceData.nombre}</title></Head>

      <div className="fixed bottom-4 right-4 z-[999] bg-white p-2 rounded-lg shadow-xl"><button onClick={() => setIsLoggedIn(!isLoggedIn)} className="px-3 py-1 rounded text-xs font-bold bg-green-100 text-green-700">{isLoggedIn ? '🟢 LOGUEADO' : '🔴 INVITADO'}</button></div>
      <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} event={selectedEvent} isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} onAddToCart={handleAddToCart} />

      <nav className="absolute top-0 left-0 w-full z-30 p-4 md:p-6 flex justify-between items-center bg-gradient-to-b from-[#1e293b]/90 to-transparent">
    {/* LOGO - clickeable */}
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="bg-transparent p-0">
        <Image 
          src="/Logo-agendar.png"
          alt="Agend-ar" 
          width={100} 
          height={100} 
          className="object-contain"
        />
        </div>
      </Link>
       <div>
        <ProvinceDropdown />
      </div>

</nav>

      <div className="relative h-64 md:h-96 w-full bg-[#1e293b] overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-cover bg-center opacity-50 transition-all duration-1000" style={{ backgroundImage: `url('${provinceData.heroImage}')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-transparent to-black/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 animate-in zoom-in duration-500">
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight drop-shadow-xl mb-3 uppercase">{provinceData.nombre}</h1>
          <p className="text-lg md:text-2xl font-light text-white/90 max-w-2xl drop-shadow-md border-t border-[#2dd4bf]/50 pt-4 mt-2">{provinceData.descripcion}</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="h-full shadow-xl rounded-2xl overflow-hidden bg-white"><EventCalendar eventos={provinceData.calendario || []} /></div>
            <div className="lg:col-span-2 relative group overflow-hidden rounded-2xl shadow-xl cursor-pointer min-h-[350px]">
                 {provinceData.eventos && provinceData.eventos[0] ? (
                    <>
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${provinceData.eventos[0].imagen}')` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                            <span className="bg-[#2dd4bf] text-[#0f172a] text-xs font-bold px-3 py-1 rounded uppercase mb-3 inline-block shadow-lg">Destacado</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-3">{provinceData.eventos[0].titulo}</h2>
                            <button onClick={() => handleOpenModal(provinceData.eventos[0])} className="bg-[#2dd4bf] text-[#0f172a] px-8 py-3 rounded-xl font-bold hover:bg-[#14b8a6] transition-colors shadow-lg">Ver Entradas</button>
                        </div>
                    </>
                 ) : <div className="flex items-center justify-center h-full bg-gray-200 text-gray-800">Próximamente</div>}
            </div>
        </div>

        <div className="sticky top-0 z-40 bg-[#1e293b]/95 backdrop-blur-sm py-4 mb-12 border-b border-gray-700/50 shadow-sm rounded-b-2xl">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-2">
                {categorias.map((cat) => (
                    <Link key={cat.id} href={`#${cat.id}`} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm text-gray-700 font-medium hover:text-[#2dd4bf] hover:border-[#2dd4bf] hover:shadow-md transition-all text-sm group">
                        <span className="group-hover:scale-110 transition-transform">{cat.icon}</span> {cat.nombre}
                    </Link>
                ))}
            </div>
        </div>

        <div className="space-y-6">
            <SearchBar
              provinces={Object.entries(provincesData).map(([s, p]) => ({ slug: s, nombre: p.nombre }))}
              onChange={(f) => setFilters(f)}
            />

        </div>

        <div className="space-y-16 pb-20">
            <section>
                <div className="flex items-center gap-3 mb-8"><div className="h-8 w-2 bg-[#2dd4bf] rounded-full"></div><h2 className="text-3xl font-bold text-white">Próximos Eventos</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredEvents && filteredEvents.length > 0 ? (
                      filteredEvents.map((evento) => <EventCard key={evento.id} {...evento} onBooking={() => handleOpenModal(evento)} />)
                    ) : (
                      <p className="text-gray-400">Sin eventos con esos filtros.</p>
                    )}
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}