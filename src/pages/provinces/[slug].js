import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getProvinces, getEvents } from '@/services/api'; // API Imports
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
  
  // State for dynamic data
  const [provinceData, setProvinceData] = useState(null);
  const [allProvinces, setAllProvinces] = useState([]);
  const [provinceEvents, setProvinceEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({ text: '', province: '', startDate: '', endDate: '' });

  // Fetch Data
  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
        setLoading(true);
        try {
            // 1. Fetch all provinces to find current one and for dropdown/search
            const provs = await getProvinces();
            setAllProvinces(provs);
            
            const currentProv = provs.find(p => p.slug === slug);
            setProvinceData(currentProv);

            if (currentProv) {
                // 2. Fetch events for this province
                // Note: The API might expect 'province' parameter to be the name or slug.
                // Our seeded data uses Name (e.g. "Córdoba"). Our slug is "cordoba".
                // Let's try fetching with the province NAME if possible, or filter client side.
                // Given `getEvents` usually returns everything or filters by query, 
                // let's fetch all and filter client side for safety, OR use the param if backend supports it.
                // Start with fetching all to be safe and filtering by province name match.
                
                const allEvents = await getEvents();
                const filtered = allEvents.filter(e => {
                    // Normalize for comparison
                    const pName = currentProv.name.toLowerCase();
                    const eProv = (e.province || '').toLowerCase();
                    // Simple check
                    return eProv.includes(pName) || eProv === slug;
                });
                
                // Map backend event fields to what UI expects (now Standardized to English)
                const mappedEvents = filtered.map(ev => ({
                    id: ev._id,
                    title: ev.title,
                    date: ev.date, // ISO string
                    location: ev.location,
                    price: ev.price,
                    category: ev.category,
                    imageUrl: ev.imageUrl,
                    raw: ev
                }));
                setProvinceEvents(mappedEvents);
            }

        } catch (error) {
            console.error("Error fetching province data:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();

  }, [slug]);


  const filteredEvents = useMemo(() => {
    const t = (filters.text || '').toLowerCase();
    const start = filters.startDate || '';
    const end = filters.endDate || '';

    return provinceEvents.filter(ev => {
      // Date filter
      if (start || end) {
        const iso = tryParseToISO(ev.fecha); // ev.fecha is ISO from backend (Date or string)
        if (!iso) return false;
        if (!isISOInRange(iso, start || null, end || null)) return false;
      }
      
      // Text filter
      if (!t) return true;
      return (
        (ev.titulo && ev.titulo.toLowerCase().includes(t)) ||
        (ev.lugar && ev.lugar.toLowerCase().includes(t)) ||
        (ev.categoria && ev.categoria.toLowerCase().includes(t))
      );
    });
  }, [provinceEvents, filters]);

  const { eventsByCategory, activeCategories } = useMemo(() => {
    const groups = filteredEvents.reduce((acc, ev) => {
      let cat = ev.category || 'Varios';
      // Normalize categories
      if (['Arte', 'Cultura', 'Cultural'].includes(cat)) cat = 'Arte y Cultura';
      if (cat === 'Gastronomia') cat = 'Gastronomía';
      if (cat === 'Musica' || cat === 'Rock' || cat === 'Música y Baile') cat = 'Música';
      if (cat === 'Carnaval') cat = 'Festival';
      
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(ev);
      return acc;
    }, {});

    const fixed = ['Arte y Cultura', 'Deportes', 'Festival', 'Gastronomía', 'Teatro'];
    const dynamic = Object.keys(groups);
    const combined = Array.from(new Set([...fixed, ...dynamic]));
    
    return { eventsByCategory: groups, activeCategories: combined };
  }, [filteredEvents]);

  const handleOpenModal = (evento) => { setSelectedEvent(evento); setIsModalOpen(true); };
  const handleAddToCart = (compra) => { alert(`✅ Agregado: ${compra.title}`); setIsModalOpen(false); };

  const categorias = [
    { nombre: 'Cine', id: 'cine', icon: '🎬' },
    { nombre: 'Deportes', id: 'deportes', icon: '⚽' },
    { nombre: 'Gastronomía', id: 'gastronomia', icon: '🍷' },
    { nombre: 'Música', id: 'musica', icon: '🎵' },
    { nombre: 'Teatro', id: 'teatro', icon: '🎭' },
    { nombre: 'Arte y Cultura', id: 'arte-y-cultura', icon: '🎨' },
    { nombre: 'Festival', id: 'festival', icon: '🎉' },
    { nombre: 'Naturaleza', id: 'naturaleza', icon: '🌿' },
    { nombre: 'Aventura', id: 'aventura', icon: '🧗' },
  ];

  if (!slug || loading) return <div className="p-10 text-center bg-[#1e293b] text-white">Cargando...</div>;
  if (!provinceData) return <div className="min-h-screen bg-[#1e293b] flex flex-col items-center justify-center text-white"><h1 className="text-4xl font-bold mb-4">No encontrado</h1><Link href="/" className="bg-[#2dd4bf] text-black px-6 py-3 rounded-lg font-bold">Volver</Link></div>;

  // Use the mapped event structure for visuals
  const heroEvent = provinceEvents.length > 0 ? provinceEvents[0] : null;

  return (
    <div className="min-h-screen bg-[#1e293b] text-gray-200 scroll-smooth font-sans">
      <Head><title>Agenda {provinceData.name}</title></Head> {/* name from API */}

      <div className="fixed bottom-4 right-4 z-[999] bg-white p-2 rounded-lg shadow-xl"><button onClick={() => setIsLoggedIn(!isLoggedIn)} className="px-3 py-1 rounded text-xs font-bold bg-green-100 text-green-700">{isLoggedIn ? '🟢 LOGUEADO' : '🔴 INVITADO'}</button></div>
        <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} event={selectedEvent} isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} onAddToCart={handleAddToCart} />

        <nav className="absolute top-0 left-0 w-full z-30 p-2.5 md:p-4 flex justify-between items-center bg-gradient-to-b from-[#1e293b]/40 to-transparent backdrop-blur-md">
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
            {/* Pass all provinces to dropdown */}
            <ProvinceDropdown provinces={allProvinces} />
           </div>
        </nav>

        <div className="relative h-[50vh] md:h-[75vh] w-full bg-[#1e293b] overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-cover bg-center opacity-50 transition-all duration-1000" style={{ backgroundImage: `url('${provinceData.heroImage}')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-transparent to-black/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 animate-in zoom-in duration-500 translate-y-12">
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight drop-shadow-xl mb-3 uppercase">{provinceData.name}</h1>
          <p className="text-lg md:text-2xl font-light text-white/90 max-w-2xl drop-shadow-md border-t border-[#2dd4bf]/50 pt-4 mt-2">{provinceData.description}</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-stretch">
             {/* Note: EventCalendar expects 'eventos' array. We pass provinceEvents */}
            <div className="h-full shadow-xl rounded-2xl overflow-hidden bg-white"><EventCalendar eventos={provinceEvents} /></div>
            <div className="lg:col-span-2 relative group overflow-hidden rounded-2xl shadow-xl cursor-pointer min-h-[350px] h-full">
                 {heroEvent ? (
                    <>
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${heroEvent.imageUrl || heroEvent.imagen}')` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                            <span className="bg-[#2dd4bf] text-[#0f172a] text-xs font-bold px-3 py-1 rounded uppercase mb-3 inline-block shadow-lg">Destacado</span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-3">{heroEvent.titulo}</h2>
                            <button onClick={() => handleOpenModal(heroEvent)} className="bg-[#2dd4bf] text-[#0f172a] px-8 py-3 rounded-xl font-bold hover:bg-[#14b8a6] transition-colors shadow-lg">Ver Entradas</button>
                        </div>
                    </>
                 ) : <div className="flex items-center justify-center h-full bg-gray-200 text-gray-800">Próximamente</div>}
            </div>
        </div>

        {/* Categories Navigation */}
        <div className="sticky top-0 z-40 bg-[#1e293b]/50 backdrop-blur-lg py-2.5 mb-2 border-b border-gray-700/30 shadow-sm rounded-b-2xl transition-all">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-2">
                {activeCategories.map(catName => {
                   const catInfo = categorias.find(c => c.nombre.toLowerCase() === catName.toLowerCase()) || { 
                     nombre: catName, 
                     id: catName.toLowerCase().replace(/\s+/g, '-'), 
                     icon: '📅' 
                   };
                   return (
                     <Link key={catName} href={`#${catInfo.id}`} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-[#2dd4bf] border border-white/10 rounded-full shadow-sm text-gray-200 font-medium hover:text-[#1e293b] hover:border-[#2dd4bf] transition-all text-sm group">
                         <span className="group-hover:scale-110 transition-transform">{catInfo.icon}</span> {catInfo.nombre}
                     </Link>
                   );
                })}
            </div>
        </div>

        {/* Search Bar */}
        <div className="space-y-6 mb-12">
            <SearchBar
              provinces={allProvinces}
              onChange={(f) => setFilters(f)}
            />
        </div>

        <div className="space-y-16 pb-20 relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-4 md:left-4 top-4 bottom-0 w-0.5 bg-gradient-to-b from-[#2dd4bf] via-[#2dd4bf]/20 to-transparent hidden md:block"></div>

            {/* Sections by Category */}
            {activeCategories.map((catName, index) => {
                const catInfo = categorias.find(c => c.nombre.toLowerCase() === catName.toLowerCase()) || { 
                  nombre: catName, 
                  id: catName.toLowerCase().replace(/\s+/g, '-'), 
                  icon: '📅' 
                };
                
                const events = eventsByCategory[catName] || [];

                return (
                  <section 
                    key={catName} 
                    id={catInfo.id} 
                    className="scroll-mt-32 relative pl-0 md:pl-12 opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                  >
                      {/* Timeline Dot */}
                      <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full bg-[#2dd4bf] ring-4 ring-[#1e293b] hidden md:block transform -translate-x-1/2"></div>
                      
                      <div className="flex items-center gap-3 mb-8">
                        <div className="h-8 w-2 bg-[#2dd4bf] rounded-full md:hidden"></div> {/* Mobile indicator */}
                        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                          <span className="text-2xl">{catInfo.icon}</span> {catName}
                        </h2>
                      </div>
                      
                      {events.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {events.map((evento) => (
                              <EventCard key={evento.id} {...evento} onBooking={() => handleOpenModal(evento)} />
                            ))}
                        </div>
                      ) : (
                        <div className="w-full bg-white/5 border border-dashed border-gray-600 rounded-xl p-8 text-center">
                            <p className="text-gray-400 text-lg">Próximamente eventos de {catName} en esta provincia.</p>
                        </div>
                      )}
                  </section>
                );
            })}
        </div>
      </main>
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}