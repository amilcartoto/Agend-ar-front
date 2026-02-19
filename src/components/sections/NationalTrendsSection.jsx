import Carousel from '@/components/carousel/Carousel';

export default function NationalTrendsSection({ events, onBooking }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-[#1e293b] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      <div className="relative mb-2 text-center pt-10 pb-4">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[#2dd4bf]/50 to-transparent"></div>
        <h2 className="relative inline-block px-4 bg-[#1e293b] text-4xl md:text-5xl font-extrabold text-white z-10">
          Tendencias <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2dd4bf] to-[#14b8a6]">Nacionales</span> 🔥
        </h2>
      </div>

      <div className="text-center mb-12">
        <p className="text-gray-400 max-w-2xl mx-auto inline-block px-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Los eventos más esperados en todo el país. ¡No te quedes afuera!
        </p>
      </div>

      <div className="relative">
        <Carousel events={events} onBooking={onBooking} />
      </div>
    </section>
  );
}
