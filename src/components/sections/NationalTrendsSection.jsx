import Carousel from '@/components/carousel/Carousel';

export default function NationalTrendsSection({ events, onBooking }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-[#1e293b]">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Tendencias <span className="text-[#2dd4bf]">Nacionales</span> 🔥
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Los eventos más esperados en todo el país. ¡No te quedes afuera!
        </p>
      </div>

      <div className="relative">
        <Carousel events={events} onBooking={onBooking} />
      </div>
    </section>
  );
}
