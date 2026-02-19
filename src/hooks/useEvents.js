import { useState, useEffect, useMemo } from 'react';
import { getEvents } from '../services/api';
import { tryParseToISO, isISOInRange } from '@/lib/dateUtils';

export function useEvents(filters) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getEvents(); // Trae todo del backend
        setEvents(data);
      } catch (err) {
        console.error("Error loading events:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filtrado en cliente (podría moverse al backend si crece mucho)
  const filteredEvents = useMemo(() => {
    const t = (filters.text || '').toLowerCase();
    const prov = filters.province || ''; // Slug de provincia o nombre
    const start = filters.startDate || '';
    const end = filters.endDate || '';

    return events.filter(ev => {
      // Filtro por Provincia (backend devuelve 'province' como nombre "Córdoba", frontend usa slugs "cordoba")
      // Aquí asumimos que el filtro viene como slug o nombre. 
      // Si `prov` viene del select del Home, es un slug ("cordoba").
      // El backend tiene "Córdoba".
      // Para simplificar, si hay filtro de provincia, comparamos loose o mapeamos.
      
      if (prov) {
         // Intento de match simple: si el nombre de la provincia en DB incluye el slug (muy básico)
         // O mejor: El frontend debería mandar el nombre real, pero el HeroSection manda slugs.
         // Solución rápida: Normalizar ambos.
         const evProvNormalized = ev.province.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
         const filterProvNormalized = prov.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
         
         if (!evProvNormalized.includes(filterProvNormalized)) return false;
      }

      // Filtro de Fechas
      if (start || end) {
        // La fecha viene del backend como ISO string (2026-11-24T00:00:00.000Z)
        // tryParseToISO maneja strings, pero si ya es ISO, mejor.
        const evDate = ev.date; 
        if (!isISOInRange(evDate, start || null, end || null)) return false;
      }

      // Filtro de Texto
      if (!t) return true;

      return (
        ev.title?.toLowerCase().includes(t) ||
        ev.location?.toLowerCase().includes(t) ||
        ev.category?.toLowerCase().includes(t) ||
        ev.province?.toLowerCase().includes(t)
      );
    });
  }, [events, filters]);

  return { events, filteredEvents, loading, error };
}
