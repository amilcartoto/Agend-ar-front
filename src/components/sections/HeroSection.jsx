import Link from 'next/link';
import Image from 'next/image';
import ProvinceDropdown from '@/components/ui/ProvinceDropdown';
import SearchBar from '@/components/ui/SearchBar';

export default function HeroSection({ provinces, onFiltersChange }) {
  return (
    <header className="relative min-h-[70vh] flex items-center justify-center bg-[#1e293b] pt-24 pb-12">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-[#1e293b]/40 to-black/30" />
      </div>

      <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
          VIVÍ <span className="text-[#2dd4bf]">ARGENTINA</span>
        </h1>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">
          Descubrí recitales, obras de teatro, deportes y festivales.
        </p>

        <div className="space-y-4">
          <div className="bg-white/5 backdrop-blur-md px-6 py-4 rounded-full border border-[#2dd4bf]/30 inline-flex flex-col md:flex-row items-center gap-3 shadow-2xl scale-105 hover:scale-110 transition-transform duration-300">
            <span className="text-white font-medium uppercase tracking-wide text-xs">
              Elige tu destino:
            </span>
            <div>
              <ProvinceDropdown provinces={provinces} />
            </div>
          </div>

          <SearchBar
            provinces={provinces}
            onChange={onFiltersChange}
          />
        </div>
      </div>
    </header>
  );
}
