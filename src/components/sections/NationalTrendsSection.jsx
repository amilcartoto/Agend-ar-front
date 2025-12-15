import EventCard from '@/components/cards/EventCard';

export default function NationalTrendsSection({ events, onBooking }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          Tendencias <span className="text-[#2dd4bf]">Nacionales</span> 🔥
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {events.map((evento, index) => (
          <EventCard
            key={index}
            {...evento}
            onBooking={() => onBooking(evento)}
          />
        ))}
      </div>
    </section>
  );
}
