import { useMemo } from 'react';
import { tryParseToISO, isISOInRange } from '@/lib/dateUtils';

export function useEvents(provincesData, filters) {
  const allEvents = useMemo(() => {
    const list = [];

    Object.entries(provincesData).forEach(([slug, pdata]) => {
      const provinceName = pdata.nombre;

      (pdata.eventos || []).forEach((ev, idx) => {
        list.push({
          id: `evt-${slug}-e-${idx}`,
          titulo: ev.titulo || ev.title || '',
          fecha: ev.fecha || ev.date || ev.start || '',
          lugar: ev.lugar || ev.location || '',
          precio: ev.precio != null ? ev.precio : ev.price || 0,
          categoria: ev.categoria || ev.category || '',
          imagen: ev.imagen || ev.image || '',
          provinceSlug: slug,
          provinceName,
        });
      });

      (pdata.calendario || []).forEach((ev, idx) => {
        list.push({
          id: `cal-${slug}-c-${idx}`,
          titulo: ev.title || ev.titulo || '',
          fecha: ev.start || ev.fecha || '',
          lugar: ev.location || '',
          precio: ev.precio != null ? ev.precio : 0,
          categoria: ev.category || '',
          imagen: ev.imagen || '',
          provinceSlug: slug,
          provinceName,
        });
      });
    });

    return list;
  }, [provincesData]);

  const filteredEvents = useMemo(() => {
    const t = (filters.text || '').toLowerCase();
    const prov = filters.province || '';
    const start = filters.startDate || '';
    const end = filters.endDate || '';

    return allEvents.filter(ev => {
      if (prov && ev.provinceSlug !== prov) return false;

      if (start || end) {
        const iso = tryParseToISO(ev.fecha);
        if (!iso) return false;
        if (!isISOInRange(iso, start || null, end || null)) return false;
      }

      if (!t) return true;

      return (
        ev.titulo?.toLowerCase().includes(t) ||
        ev.lugar?.toLowerCase().includes(t) ||
        ev.categoria?.toLowerCase().includes(t) ||
        ev.provinceName?.toLowerCase().includes(t)
      );
    });
  }, [allEvents, filters]);

  return { filteredEvents };
}
