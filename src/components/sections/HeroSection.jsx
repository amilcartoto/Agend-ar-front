import Link from 'next/link';
import Image from 'next/image';
import ProvinceDropdown from '@/components/ui/ProvinceDropdown';
import SearchBar from '@/components/ui/SearchBar';

export default function HeroSection({ provinces, onFiltersChange }) {
  return (
    <header className="relative h-[500px] flex items-center justify-center overflow-hidden bg-[#1e293b]">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-transparent to-black/60" />
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/Logo-agendar.png"
            alt="Logo"
            width={120}
            height={120}
            className="object-contain w-20 h-20 drop-shadow-lg"
          />
        </Link>
      </div>

      <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto mt-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
          VIVÍ <span className="text-[#2dd4bf]">ARGENTINA.</span>
        </h1>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">
          Descubrí recitales, obras de teatro, deportes y festivales.
        </p>

        <div className="space-y-4">
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-[#2dd4bf]/30 inline-flex flex-col md:flex-row items-center gap-4 shadow-2xl">
            <span className="text-white font-medium uppercase tracking-wide text-sm">
              Elige tu destino:
            </span>
            <div className="scale-110">
              <ProvinceDropdown />
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
