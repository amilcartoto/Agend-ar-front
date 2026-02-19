import Carousel from '@/components/carousel/Carousel';

export default function FeaturedEventsSection({ events, onBooking }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-2 relative animate-fade-in-up">

      {/* Fondo degradado superior eliminado */}
      
      <div className="relative mb-12 text-center py-10">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[#2dd4bf]/50 to-transparent"></div>
        <h2 className="relative inline-block px-4 bg-[#1e293b] text-4xl font-bold text-white z-10">
          Eventos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2dd4bf] to-[#14b8a6]">Destacados</span> 🌟
        </h2>
      </div>

      {events.length > 0 ? (
        <Carousel events={events} onBooking={onBooking} />
      ) : (
        <div className="text-gray-400">
          No se encontraron eventos con esos filtros.
        </div>
      )}
    </section>
  );
}
