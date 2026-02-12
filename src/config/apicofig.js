const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  HEADERS: {
    "Content-Type": "application/json",
  },
  UPLOADS_URL: process.env.NEXT_PUBLIC_UPLOADS_URL || "http://localhost:5000/uploads",
  FILE_HEADERS: {}, // Para multipart/form-data (dejar que el navegador maneje el boundary)
};

export default API_CONFIG;
