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
    <div className="bg-[#0f172a] p-6 rounded-2xl shadow-xl border border-gray-700/50 select-none h-full flex flex-col text-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg capitalize text-[#2dd4bf]">{MONTHS[month]} {year}</h3>
        <div className="flex gap-2">
            <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full text-gray-300 transition-colors">&lt;</button>
            <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full text-gray-300 transition-colors">&gt;</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {DAYS.map(d => <div key={d} className="text-xs font-bold text-gray-500 uppercase">{d}</div>)}
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
                        aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all relative cursor-pointer border border-transparent
                        ${isToday ? 'bg-[#2dd4bf] text-[#0f172a] font-bold shadow-[0_0_10px_rgba(45,212,191,0.5)]' : 'hover:bg-white/10 text-gray-300'}
                        ${hasEvents && !isToday ? 'bg-[#2dd4bf]/10 text-[#2dd4bf] font-bold border-[#2dd4bf]/20' : ''}
                    `}
                >
                    {day}
                    {hasEvents && (
                        <div className="flex gap-0.5 mt-1">
                            {/* Puntitos indicando eventos */}
                            {eventsOfDay.slice(0, 3).map((_, idx) => (
                                <div key={idx} className={`h-1.5 w-1.5 rounded-full ${isToday ? 'bg-[#0f172a]' : 'bg-[#2dd4bf]'}`}></div>
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
            <div className="bg-[#1e293b] rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-700" onClick={e => e.stopPropagation()}>
                <div className="bg-[#2dd4bf] p-4 text-[#0f172a] flex justify-between items-center">
                    <h3 className="font-bold text-lg">Eventos: {selectedDay}</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-[#0f172a] font-bold text-xl hover:opacity-70">&times;</button>
                </div>
                <div className="p-4 max-h-80 overflow-y-auto space-y-3 custom-scrollbar">
                    {modalEvents.map((evt, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-[#0f172a]/50 border border-gray-700 hover:border-[#2dd4bf]/50 transition-colors">
                            <span className="text-xs font-bold text-[#2dd4bf] uppercase tracking-wider block mb-1">{evt.category || 'Evento'}</span>
                            <h4 className="font-bold text-white mb-1">{evt.title}</h4>
                            <p className="text-sm text-gray-400">{evt.location}</p>
                            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">🕒 {evt.time || 'Horario a confirmar'}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
}