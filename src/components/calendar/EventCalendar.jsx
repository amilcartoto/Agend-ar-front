import React, { useState } from 'react';

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export default function EventCalendar({ eventos = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalEvents, setModalEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const getEventsForDay = (dayNumber) => {
    const currentMonthStr = String(month + 1).padStart(2, '0');
    const currentDayStr = String(dayNumber).padStart(2, '0');
    const dateToCheck = `${year}-${currentMonthStr}-${currentDayStr}`;

    return eventos.filter(evento => {
      if (evento.fecha === dateToCheck) return true;
      if (evento.start && evento.end) {
        return dateToCheck >= evento.start && dateToCheck <= evento.end;
      }
      return false;
    });
  };

  const handleDayClick = (day, eventsOfDay) => {
    if (eventsOfDay.length > 0) {
        setSelectedDay(`${day} de ${MONTHS[month]}`);
        setModalEvents(eventsOfDay);
        setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-700/10 select-none h-full flex flex-col text-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg capitalize">{MONTHS[month]} {year}</h3>
        <div className="flex gap-2">
            <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full text-gray-600">&lt;</button>
            <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full text-gray-600">&gt;</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {DAYS.map(d => <div key={d} className="text-xs font-bold text-gray-400 uppercase">{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1 flex-1 content-start">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const eventsOfDay = getEventsForDay(day);
            const hasEvents = eventsOfDay.length > 0;
            const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;

            return (
                <div 
                    key={day} 
                    onClick={() => handleDayClick(day, eventsOfDay)}
                    className={`
                        aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all relative cursor-pointer
                        ${isToday ? 'bg-[#2dd4bf] text-black font-bold shadow-md' : 'hover:bg-gray-100 text-gray-700'}
                        ${hasEvents && !isToday ? 'font-bold bg-teal-50 text-teal-900' : ''}
                    `}
                >
                    {day}
                    {hasEvents && (
                        <div className="flex gap-0.5 mt-1">
                            {/* Puntitos Negros o Blancos según el fondo */}
                            {eventsOfDay.slice(0, 3).map((_, idx) => (
                                <div key={idx} className={`h-1.5 w-1.5 rounded-full ${isToday ? 'bg-black' : 'bg-[#2dd4bf]'}`}></div>
                            ))}
                        </div>
                    )}
                </div>
            );
        })}
      </div>

      {/* Modal Interno del Calendario */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="bg-[#2dd4bf] p-4 text-black flex justify-between items-center">
                    <h3 className="font-bold text-lg">Eventos: {selectedDay}</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-black font-bold text-xl hover:opacity-70">&times;</button>
                </div>
                <div className="p-4 max-h-80 overflow-y-auto space-y-3">
                    {modalEvents.map((evt, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">{evt.category}</span>
                            <h4 className="font-bold text-gray-900">{evt.title}</h4>
                            <p className="text-sm text-gray-500">{evt.location}</p>
                            <p className="text-xs text-gray-400 mt-1">🕒 {evt.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
}