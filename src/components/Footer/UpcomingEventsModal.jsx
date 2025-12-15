"use client";

import { useEffect, useState } from "react";
import { provincesData } from "../../data/provinces"; // Ajusta la ruta según tu proyecto

export default function UpcomingEventsModal({ open, onClose }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para calcular el rango de la semana actual
  const getCurrentWeekRange = () => {
    const today = new Date();
    const day = today.getDay();
    const diffToMonday = today.getDate() - day + (day === 0 ? -6 : 1);

    const monday = new Date(today.setDate(diffToMonday));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return {
      from: monday,
      to: sunday,
    };
  };

  // Función para obtener todos los eventos próximos de todas las provincias
  const getAllUpcomingEvents = () => {
    const { from, to } = getCurrentWeekRange();

    const allEvents = Object.values(provincesData)
      .flatMap((prov) => prov.eventos) // Todos los eventos
      .map((e) => {
        // Convertimos fechas del formato "24 Nov" a Date
        const parts = e.fecha.split(" "); // ["24", "Nov"]
        const day = parseInt(parts[0]);
        const monthStr = parts[1].toLowerCase();
        const monthMap = {
          ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5,
          jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11,
        };
        const month = monthMap[monthStr.slice(0,3)] ?? 0;
        const dateObj = new Date();
        dateObj.setFullYear(from.getFullYear());
        dateObj.setMonth(month);
        dateObj.setDate(day);
        return { ...e, _dateObj: dateObj };
      })
      .filter((e) => e._dateObj >= from && e._dateObj <= to)
      .sort((a,b) => a._dateObj - b._dateObj); // Ordenamos por fecha

    return allEvents;
  };

  // Cargar los eventos cada vez que se abra el modal
  useEffect(() => {
    if (open) {
      const fetchUpcomingEvents = async () => {
        setLoading(true);
        try {
          const events = getAllUpcomingEvents();
          setEvents(events);
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
                  src={event.imagen}
                  alt={event.titulo}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{event.titulo}</h3>
                  <p className="text-sm text-gray-500">{event.fecha} - {event.lugar}</p>
                  <p className="text-sm text-gray-500">{event.categoria} - ${event.precio}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
