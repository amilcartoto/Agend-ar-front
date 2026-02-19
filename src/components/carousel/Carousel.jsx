import { useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';

import 'swiper/css/pagination';

import EventCard from '@/components/cards/EventCard';
const Carousel = ({ onBooking, events }) => {
  // ------------------ DATA ------------------
  // Prioridad: eventos pasados por props
  const carouselEvents = events || [];

  // ------------------ SWIPER ------------------
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <div className="w-full mx-auto max-w-7xl relative px-16 md:px-20 lg:px-32">
      <Swiper
        onSwiper={setSwiperInstance}
        modules={[Pagination]}
        spaceBetween={24}
        pagination={{ 
          clickable: true,
          el: '.swiper-custom-pagination',
        }}
        className="w-full"
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {carouselEvents.map((item, index) => (
          <SwiperSlide key={`${item.titulo}-${index}`} className="!h-auto">
            <EventCard {...item} onBooking={() => onBooking(item)} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* CUSTOM PAGINATION CONTAINER (Outside Swiper) */}
      <div className="swiper-custom-pagination flex justify-center gap-2 mt-8 pb-4 relative z-10"></div>

      {/* PREV BUTTON */}
      <button
        onClick={() => swiperInstance?.slidePrev()}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 
                   w-12 h-12 flex items-center justify-center rounded-full
                   bg-white/10 border border-white/20 backdrop-blur-md text-white
                   shadow-lg transition-all duration-300
                   hover:bg-[#2dd4bf] hover:border-[#2dd4bf] hover:scale-110 hover:shadow-[#2dd4bf]/50
                   group"
        aria-label="Anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:text-white transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* NEXT BUTTON */}
      <button
        onClick={() => swiperInstance?.slideNext()}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 
                   w-12 h-12 flex items-center justify-center rounded-full
                   bg-white/10 border border-white/20 backdrop-blur-md text-white
                   shadow-lg transition-all duration-300
                   hover:bg-[#2dd4bf] hover:border-[#2dd4bf] hover:scale-110 hover:shadow-[#2dd4bf]/50
                   group"
        aria-label="Siguiente"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:text-white transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;

