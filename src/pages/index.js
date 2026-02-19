// Next
import Head from "next/head";

// React
import { useState, useEffect } from "react";

// Layout & UI
import FloatingUserStatus from "@/components/ui/FloatingUserStatus";
import TicketModal from "@/components/modals/TicketModal";

// Sections
import HeroSection from "@/components/sections/HeroSection";
import FeaturedEventsSection from "@/components/sections/FeaturedEventsSection";
import NationalTrendsSection from "@/components/sections/NationalTrendsSection";
import OrganizerCTASection from "@/components/sections/OrganizerCTASection";

// Data & hooks
import { useEvents } from "@/hooks/useEvents"; 
import { getNationalTrends, getProvinces } from "@/services/api";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nationalTrends, setNationalTrends] = useState([]);
  const [provinces, setProvinces] = useState([]);
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
    alert(`✅ Agregado: ${compra.title}`); // Ajustado a 'title' del backend
    setIsModalOpen(false);
  };

  // Hook que trae eventos filtrados (para FeaturedEvents)
  const { filteredEvents, loading } = useEvents(filters);

  // Traer Tendencias y Provincias al montar
  useEffect(() => {
    const fetchData = async () => {
        const trends = await getNationalTrends();
        setNationalTrends(trends);

        const provs = await getProvinces();
        setProvinces(provs);
    };
    fetchData();
  }, []);

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
          provinces={provinces}
          onFiltersChange={setFilters}
        />

        {/* RESTO DEL CONTENIDO — CON ESPACIO POR NAVBAR */}
        <div className="pt-24">
          <FeaturedEventsSection
            events={filteredEvents}
            loading={loading}
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
