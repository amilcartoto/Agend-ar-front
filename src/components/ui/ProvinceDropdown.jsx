// src/components/ui/ProvinceDropdown.jsx
import { useRouter } from 'next/router';

export default function ProvinceDropdown() {
  const router = useRouter();
  const { slug } = router.query; // Para saber cuál está seleccionada actualmente

  // Lista de provincias disponibles (debe coincidir con tus datos)
  const provincias = [
    { name: 'Buenos Aires', slug: 'buenos-aires' },
    { name: 'Córdoba', slug: 'cordoba' },
    { name: 'Jujuy', slug: 'jujuy' },
    { name: 'Santa Fe', slug: 'santa-fe' },
    { name: 'Formosa', slug: 'formosa' },
  ];

  const handleChange = (e) => {
    const nuevaProvincia = e.target.value;
    if (nuevaProvincia) {
      // Redirigir a la nueva página
      router.push(`/provinces/${nuevaProvincia}`);
    }
  };

  return (
    <div className="relative group">
      {/* Icono de ubicación decorativo */}
      {/* Icono de ubicación decorativo */}
      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#2dd4bf] z-10 text-sm">
        📍
      </div>
      
      <select
        value={slug || ''}
        onChange={handleChange}
        className="appearance-none cursor-pointer bg-[#0f172a] text-white text-sm font-medium pl-8 pr-8 py-2 rounded-full border border-gray-600 shadow-sm hover:border-[#2dd4bf] hover:shadow-[0_0_10px_rgba(45,212,191,0.2)] focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] transition-all duration-200 w-full md:w-56"
      >
        <option value="" disabled>Cambiar Provincia...</option>
        {provincias.map((prov) => (
          <option key={prov.slug} value={prov.slug}>
            {prov.name}
          </option>
        ))}
      </select>
      
      {/* Flechita customizada (porque ocultamos la default) */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
        ▼
      </div>
    </div>
  );
}