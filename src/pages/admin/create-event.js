import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createEvent, getProvinces } from '../../services/api';

export default function CreateEvent() {
  const router = useRouter();
  const [provinces, setProvinces] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    price: '',
    category: '',
    province: '', // This will store the province NAME to match backend schema? Or Slug? Backend schema uses 'province' string.
    // The current Event model stores "province" as a string (name).
    // But `ProvinceDropdown` uses slug.
    // Let's store the NAME in the event for now to match `seed.ts` behavior.
    imageUrl: ''
  });

  useEffect(() => {
    getProvinces().then(setProvinces);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Prepare data. Convert date string to ISO if needed, or backend handles it?
        // Backend `Event` model expects `date: Date`. Mongoose casts strings.
        // We ensure it's a valid date string.
      await createEvent(formData);
      alert('✅ Evento creado con éxito');
      router.push('/admin');
    } catch (error) {
      alert('❌ Error al crear evento');
    }
  };

  return (
    <div className="min-h-screen bg-[#1e293b] text-white p-8 pt-32">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin" className="text-gray-400 hover:text-white mb-6 inline-block">← Volver al Panel</Link>
        
        <h1 className="text-3xl font-bold text-[#2dd4bf] mb-8">Nuevo Evento</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-[#0f172a] p-8 rounded-xl border border-gray-700">
          
          <div>
            <label className="block text-sm font-bold mb-2">Título</label>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Ej: Recital de Rock" className="w-full p-3 rounded bg-[#1e293b] border border-gray-600 focus:border-[#2dd4bf] outline-none" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Fecha</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-3 rounded bg-[#1e293b] border border-gray-600 focus:border-[#2dd4bf] outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Hora</label>
              <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full p-3 rounded bg-[#1e293b] border border-gray-600 focus:border-[#2dd4bf] outline-none" />
            </div>
          </div>

          <div>
             <label className="block text-sm font-bold mb-2">Provincia</label>
             <select name="province" value={formData.province} onChange={handleChange} className="w-full p-3 rounded bg-[#1e293b] border border-gray-600 focus:border-[#2dd4bf] outline-none" required>
               <option value="">Selecciona una provincia...</option>
               {provinces.map(p => (
                 <option key={p._id} value={p.name}>{p.name}</option> // Storing Name as per current schema
               ))}
             </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Ubicación (Lugar)</label>
            <input name="location" value={formData.location} onChange={handleChange} placeholder="Ej: Estadio Kempes" className="w-full p-3 rounded bg-[#1e293b] border border-gray-600 focus:border-[#2dd4bf] outline-none" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-sm font-bold mb-2">Precio ($)</label>
               <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0" className="w-full p-3 rounded bg-[#1e293b] border border-gray-600 focus:border-[#2dd4bf] outline-none" />
            </div>
            <div>
               <label className="block text-sm font-bold mb-2">Categoría</label>
               <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 rounded bg-[#1e293b] border border-gray-600 focus:border-[#2dd4bf] outline-none" required>
                 <option value="">Selecciona...</option>
                 <option value="Música">Música</option>
                 <option value="Teatro">Teatro</option>
                 <option value="Deportes">Deportes</option>
                 <option value="Festival">Festival</option>
                 <option value="Gastronomía">Gastronomía</option>
                 <option value="Arte">Arte</option>
                 <option value="Cultura">Cultura</option>
                 <option value="Naturaleza">Naturaleza</option>
               </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">URL de Imagen</label>
            <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." className="w-full p-3 rounded bg-[#1e293b] border border-gray-600 focus:border-[#2dd4bf] outline-none" required />
          </div>

          <button type="submit" className="w-full bg-[#2dd4bf] text-[#0f172a] font-bold py-4 rounded-lg hover:bg-[#14b8a6] transition-colors mt-6">
            Crear Evento
          </button>

        </form>
      </div>
    </div>
  );
}
