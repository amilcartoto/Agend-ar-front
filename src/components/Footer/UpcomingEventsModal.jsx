"use client";

import { useEffect, useState } from "react";
import { getEvents } from "../../services/api";

export default function UpcomingEventsModal({ open, onClose }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para calcular el rango de la semana actual
  const getCurrentWeekRange = () => {
    const today = new Date();
    const day = today.getDay(); // 0 (Sun) to 6 (Sat)
    
    // Calculate Monday
    // If today is Sunday (0), we want previous Monday (-6)
    // If today is Monday (1), we want today (0)
    // If today is Tuesday (2), we want yesterday (-1)
    const diffToMonday = day === 0 ? -6 : 1 - day; 
    
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return { from: monday, to: sunday };
  };

  // Cargar los eventos cada vez que se abra el modal
  useEffect(() => {
    if (open) {
      const fetchUpcomingEvents = async () => {
        setLoading(true);
        try {
          const allEvents = await getEvents(); // Fetch all events
          const { from, to } = getCurrentWeekRange();

          const upcoming = allEvents
            .map(e => ({ ...e, _dateObj: new Date(e.date) })) // Backend provides ISO date
            .filter(e => e._dateObj >= from && e._dateObj <= to)
            .sort((a, b) => a._dateObj - b._dateObj);

          setEvents(upcoming);
        } catch (err) {
          console.error("Error cargando eventos:", err);
          setEvents([]);
        }
        setLoading(false);
      };

      fetchUpcomingEvents();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full relative shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Próximos Eventos</h2>

        {loading ? (
          <p>Cargando...</p>
        ) : events.length === 0 ? (
          <p>No hay próximos eventos esta semana</p>
        ) : (
          <ul className="space-y-4 max-h-96 overflow-y-auto">
            {events.map((event, idx) => (
              <li key={idx} className="border p-3 rounded-md hover:shadow-md transition-shadow flex gap-3">
                <img
                  src={event.imageUrl}
                  alt={event.titulo}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()} - {event.location}</p>
                  <p className="text-sm text-gray-500">{event.category} - ${event.price}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
