import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createProvince } from '../../services/api';

export default function CreateProvince() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    heroImage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from name if slug is empty or user is typing name
      slug: name === 'name' && !prev.slugModified ? value.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "") : (name === 'slug' ? value : prev.slug)
    }));
  };

  const handleSlugChange = (e) => {
      setFormData(prev => ({ ...prev, slug: e.target.value, slugModified: true }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProvince(formData);
      alert('✅ Provincia creada con éxito');
      router.push('/admin');
    } catch (error) {
      alert('❌ Error al crear provincia');
    }
  };

  return (
    <div className="min-h-screen bg-[#1e293b] text-white p-8 pt-32">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin" className="text-gray-400 hover:text-white mb-6 inline-block">← Volver al Panel</Link>
        
        <h1 className="text-3xl font-bold text-[#2dd4bf] mb-8">Nueva Provincia</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-[#0f172a] p-8 rounded-xl border border-gray-700">
          
          <div>
            <label className="block text-sm font-bold mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Mendoza"
              className="w-full p-3 rounded bg-[#1e293b] border border-gray-600 focus:border-[#2dd4bf] outline-none text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Slug (URL)</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleSlugChange}
              placeholder="Ej: mendoza"
              className="w-full p-3 rounded bg-[#1e293b] border border-gray-600 focus:border-[#2dd4bf] outline-none text-gray-400"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Identificador único para la URL (sin espacios ni tildes).</p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Ej: Tierra del sol y del buen vino..."
              className="w-full p-3 rounded bg-[#1e293b] border border-gray-600 focus:border-[#2dd4bf] outline-none text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">URL de Imagen (Hero)</label>
            <input
              type="url"
              name="heroImage"
              value={formData.heroImage}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full p-3 rounded bg-[#1e293b] border border-gray-600 focus:border-[#2dd4bf] outline-none text-white"
              required
            />
          </div>

          {/* Preview */}
          {formData.heroImage && (
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Vista Previa:</p>
              <img src={formData.heroImage} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-gray-600" />
            </div>
          )}

          <button type="submit" className="w-full bg-[#2dd4bf] text-[#0f172a] font-bold py-4 rounded-lg hover:bg-[#14b8a6] transition-colors mt-6">
            Crear Provincia
          </button>

        </form>
      </div>
    </div>
  );
}
