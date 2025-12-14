"use client";
import { useEffect, useState } from "react";


//Abre y cierra el modal 
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
      from: monday.toISOString().split("T")[0],
      to: sunday.toISOString().split("T")[0],
    };
  };
  // Función para obtener eventos desde la pag de Amilcar
  const fetchUpcomingEvents = async () => {
    setLoading(true);

    const { from, to } = getCurrentWeekRange();

    try {
      // Simulación temporal:
      const data = [
        { id: 1, title: "Recital en Palermo", date: "2025-11-18" },
        { id: 2, title: "Teatro en Córdoba", date: "2025-11-20" },
      ];

      const filtered = data.filter(
        (e) => e.date >= from && e.date <= to
      );

      setEvents(filtered);
    } catch (err) {
      console.error("Error cargando eventos:", err);
      setEvents([]);
    }

    setLoading(false);
  };
  // Cada vez que se abre el modal → carga datos
  useEffect(() => {
    if (open) {
      const fetchUpcomingEvents = async () => {
        setLoading(true);

        const { from, to } = getCurrentWeekRange();

        try {
          // Simulación temporal:
          const data = [
            { id: 1, title: "Recital en Palermo", date: "2025-11-18" },
            { id: 2, title: "Teatro en Córdoba", date: "2025-11-20" },
          ];

          const filtered = data.filter(
            (e) => e.date >= from && e.date <= to
          );

          setEvents(filtered);
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
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.close} onClick={onClose}>✕</button>

        <h2>Próximos Eventos</h2>

        {loading ? (
          <p>Cargando...</p>
        ) : events.length === 0 ? (
          <p>No hay próximos eventos</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <strong>{event.title}</strong>
                <br />
                <span>{event.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
