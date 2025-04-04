import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "";
const API_URL = `${BASE_URL}/moodflix`;

const API_CLIENT_CONFIG = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
  },
});

// Manejo de errores globales (opcional)
API_CLIENT_CONFIG.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo de errores de la respuesta
    if (error.response) {
      // Si la API responde con error
      console.error("API Error: ", error.response);
    } else if (error.request) {
      // Si no hay respuesta (por ejemplo, problema de red)
      console.error("Network Error: ", error.request);
    } else {
      // Otro tipo de error
      console.error("Error: ", error.message);
    }
    return Promise.reject(error);
  }
);

export default API_CLIENT_CONFIG;
