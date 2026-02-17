import Carousel from '@/components/Carousel/Carousel';

export default function FeaturedEventsSection({ events, onBooking }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8 relative">
      {/* Fondo degradado superior */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#2dd4bf]/10 to-transparent -z-10 pointer-events-none rounded-3xl" />
      
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-white mb-4">
          Eventos <span className="text-[#2dd4bf]">Destacados</span> 🌟
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
