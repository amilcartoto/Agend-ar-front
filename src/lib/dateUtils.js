// Utilidades para parsear fechas y comparar rangos
const MONTHS = {
  ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5,
  jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11,
  jan: 0, febr:1, marz:2
};

export function tryParseToISO(dateStr) {
  if (!dateStr) return null;
  // If already ISO-like
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;

  // Try to parse formats like '24 Nov' or '10 Feb 2025' or 'Ene 2025'
  const parts = dateStr.trim().replace(',', '').split(/\s+/);
  const today = new Date();
  let day = null, month = null, year = today.getFullYear();

  if (parts.length === 1) {
    // Could be 'Mar 2025' or 'Ene 2025' or just year
    const p = parts[0].toLowerCase();
    const m = p.slice(0,3);
    if (MONTHS[m] !== undefined) {
      month = MONTHS[m];
      day = 1;
    } else if (/^\d{4}$/.test(p)) {
      year = parseInt(p,10);
      month = 0; day = 1;
    }
  } else if (parts.length === 2) {
    // could be '24 Nov' or 'Ene 2025'
    if (/^\d{1,2}$/.test(parts[0])) {
      day = parseInt(parts[0],10);
      const m = parts[1].toLowerCase().slice(0,3);
      if (MONTHS[m] !== undefined) month = MONTHS[m];
    } else {
      // 'Ene 2025'
      const m = parts[0].toLowerCase().slice(0,3);
      if (MONTHS[m] !== undefined) month = MONTHS[m];
      if (/^\d{4}$/.test(parts[1])) year = parseInt(parts[1],10);
      day = 1;
    }
  } else if (parts.length >=3) {
    // '24 Nov 2025' or '24 Noviembre 2025'
    if (/^\d{1,2}$/.test(parts[0])) day = parseInt(parts[0],10);
    const m = parts[1].toLowerCase().slice(0,3);
    if (MONTHS[m] !== undefined) month = MONTHS[m];
    if (/^\d{4}$/.test(parts[2])) year = parseInt(parts[2],10);
  }

  if (month == null) return null;
  if (day == null) day = 1;

  const d = new Date(year, month, day);
  if (isNaN(d.getTime())) return null;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function isISOInRange(isoDate, startISO, endISO) {
  if (!isoDate) return false;
  const d = new Date(isoDate);
  if (isNaN(d)) return false;
  if (startISO) {
    const s = new Date(startISO);
    if (!isNaN(s) && d < s) return false;
  }
  if (endISO) {
    const e = new Date(endISO);
    if (!isNaN(e) && d > e) return false;
  }
  return true;
}

export default { tryParseToISO, isISOInRange };
