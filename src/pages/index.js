// Next
import Head from "next/head";

// React
import { useState } from "react";

// Layout & UI
import FloatingUserStatus from "@/components/ui/FloatingUserStatus";
import TicketModal from "@/components/modals/TicketModal";

// Sections
import HeroSection from "@/components/sections/HeroSection";
import FeaturedEventsSection from "@/components/sections/FeaturedEventsSection";
import NationalTrendsSection from "@/components/sections/NationalTrendsSection";
import OrganizerCTASection from "@/components/sections/OrganizerCTASection";

// Data & hooks
import { provincesData } from "@/data/provinces";
import { useEvents } from "@/hooks/useEvents";
import { nationalTrends } from "@/data/nationalTrends";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filters, setFilters] = useState({
    text: "",
    province: "",
    startDate: "",
    endDate: "",
  });

  const handleOpenModal = (evento) => {
    setSelectedEvent(evento);
    setIsModalOpen(true);
  };

  const handleAddToCart = (compra) => {
    alert(`✅ Agregado: ${compra.titulo}`);
    setIsModalOpen(false);
  };

  const { filteredEvents } = useEvents(provincesData, filters);

  return (
    <div className="min-h-screen bg-[#1e293b] text-gray-200 font-sans flex flex-col">
      <Head>
        <title>Agend-ar | Eventos</title>
      </Head>

      <FloatingUserStatus
        isLoggedIn={isLoggedIn}
        onToggle={() => setIsLoggedIn(!isLoggedIn)}
      />

      <TicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        isLoggedIn={isLoggedIn}
        onLogin={() => setIsLoggedIn(true)}
        onAddToCart={handleAddToCart}
      />

      {/* CONTENIDO */}
      <main className="flex-grow bg-[#1e293b]">
        {/* HERO — SIN PADDING */}
        <HeroSection
          provinces={Object.entries(provincesData).map(([slug, p]) => ({
            slug,
            nombre: p.nombre,
          }))}
          onFiltersChange={setFilters}
        />

        {/* RESTO DEL CONTENIDO — CON ESPACIO POR NAVBAR */}
        <div className="pt-28">
          <FeaturedEventsSection
            events={filteredEvents}
            onBooking={handleOpenModal}
          />

          <NationalTrendsSection
            events={nationalTrends}
            onBooking={handleOpenModal}
          />

          <OrganizerCTASection />
        </div>
      </main>
    </div>
  );
}
