import Link from 'next/link';

export default function OrganizerCTASection() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-r from-[#1e293b] via-[#115e59] to-[#2dd4bf] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          ¿Sos organizador de eventos?
        </h2>
        <p className="text-xl text-white/90 mb-10">
          Publicá tus eventos en Agend-ar y llegá a miles de personas.
        </p>

        <Link
          href="/organizar"
          className="inline-block bg-white text-[#0f766e] font-semibold px-10 py-4 rounded-full hover:bg-gray-100 transition"
        >
          Publicar evento
        </Link>
      </div>
    </section>
  );
}
