const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/events";

export const getEvents = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.province) params.append("province", filters.province);
    if (filters.category) params.append("category", filters.category);
    
    // Si hay texto de búsqueda, podríamos enviarlo al backend si este lo soportara,
    // por ahora el filtrado de texto complejo se hace en el cliente o se mejora el backend.
    
    console.log("Fetching events with params:", params.toString()); // DEBUG

    const res = await fetch(`${API_URL}?${params.toString()}`);
    if (!res.ok) throw new Error("Error fetching events");
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

// Assuming 'api' is an axios instance or similar, it needs to be defined or imported.
// For the purpose of this edit, I'll assume it's available or will be added.
// If not, these functions would need to use `fetch` directly.
// For example, if `api` is not defined, you might need:
// const api = {
//   post: (url, data, config) => fetch(`${API_BASE_URL}${url}`, { method: 'POST', headers: config?.headers || { 'Content-Type': 'application/json' }, body: data instanceof FormData ? data : JSON.stringify(data) }).then(res => { if (!res.ok) throw new Error(res.statusText); return res.json(); }),
//   get: (url) => fetch(`${API_BASE_URL}${url}`).then(res => { if (!res.ok) throw new Error(res.statusText); return res.json(); }),
// };
// And API_BASE_URL would be something like process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api"

export const createEvent = async (eventData) => {
    try {
        // eventData can be FormData (for images) or JSON
        const headers = eventData instanceof FormData ? {} : { 'Content-Type': 'application/json' }; // FormData sets its own Content-Type
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: headers,
            body: eventData instanceof FormData ? eventData : JSON.stringify(eventData),
        });
        if (!response.ok) throw new Error("Error creating event");
        return await response.json();
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    }
};

export const createProvince = async (provinceData) => {
    try {
        const response = await fetch(`${API_URL.replace('/events', '/provinces')}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(provinceData),
        });
        if (!response.ok) throw new Error("Error creating province");
        return await response.json();
    } catch (error) {
        console.error("Error creating province:", error);
        throw error;
    }
};

export const getProvinces = async () => {
    try {
        const response = await fetch(`${API_URL.replace('/events', '/provinces')}`);
        if (!response.ok) throw new Error("Error fetching provinces");
        return await response.json();
    } catch (error) {
        console.error("Error fetching provinces:", error);
        return [];
    }
};

export const getNationalTrends = async () => {
    // Asumimos que "Nacional" es una "provincia" especial o categoría en nuestra DB seed
    return await getEvents({ province: "Nacional" });
};

export const getFeaturedEvents = async () => {
    // Por ahora traemos todos y cortamos en el cliente, o pedimos al backend limit
    const all = await getEvents();
    return all.slice(0, 6); // Top 6
};
