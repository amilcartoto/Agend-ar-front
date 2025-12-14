import React, { useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';

// Estilos de Swiper, son cruciales
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import EventCard from '@/components/cards/EventCard';
import { provincesData } from '@/data/provinces';

const Carousel = ({ onBooking, events }) => {
  // Construir lista plana de eventos a partir de provincesData si no se pasan events
  const carouselEvents = useMemo(() => {
    if (events) return events;
    const list = [];
    Object.entries(provincesData).forEach(([slug, pdata]) => {
      // eventos
      (pdata.eventos || []).forEach((ev, idx) => {
        list.push({
          titulo: ev.titulo || '',
          fecha: ev.fecha || '',
          lugar: ev.lugar || '',
          precio: ev.precio != null ? ev.precio : 0,
          categoria: ev.categoria || '',
          imagen: ev.imagen || '',
        });
      });
    });
    return list;
  }, [events]);
  
  const [swiperInstance, setSwiperInstance] = useState(null);
  
  // Estilos de paginación y botones.
  const customStyles = `
    .swiper-pagination-bullet { width: 20px; height: 6px; border-radius: 3px; background: #ccc; opacity: 1; }
    .swiper-pagination-bullet-active { width: 30px; background: orange; }
  `;

  return (
    <div style={{ width: '80%', margin: '0 auto', maxWidth: '1200px', position: 'relative' }}>
      <style>{customStyles}</style>
      
      <Swiper
        onSwiper={setSwiperInstance}
        modules={[Grid, Pagination]}
        spaceBetween={15}
        slidesPerView={4}
        grid={{ rows: 2, fill: "row" }}
        pagination={true}
        style={{ width: '100%', paddingBottom: '40px', '--swiper-grid-row-gap': '15px' }}
      >
        {carouselEvents.map((item, index) => (
          <SwiperSlide key={index}>
            <EventCard {...item} onBooking={() => onBooking(item)} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botones para uso manual */}
      <button 
        onClick={() => swiperInstance?.slidePrev()} 
        style={{ 
          position: 'absolute', 
          left: '-60px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          zIndex: 10, 
          background: 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)', 
          color: 'white', 
          border: 'none', 
          borderRadius: '12px', 
          width: '50px', 
          height: '50px', 
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(45, 212, 191, 0.4)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'translateY(-50%) scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'translateY(-50%) scale(1)'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" style={{width: '24px', height: '24px', verticalAlign: 'middle'}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button 
        onClick={() => swiperInstance?.slideNext()} 
        style={{ 
          position: 'absolute', 
          right: '-60px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          zIndex: 10, 
          background: 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)', 
          color: 'white', 
          border: 'none', 
          borderRadius: '12px', 
          width: '50px', 
          height: '50px', 
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(45, 212, 191, 0.4)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'translateY(-50%) scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'translateY(-50%) scale(1)'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" style={{width: '24px', height: '24px', verticalAlign: 'middle'}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;

