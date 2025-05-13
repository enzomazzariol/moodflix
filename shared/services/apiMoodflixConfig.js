import axios from "axios";

// Crear una variable de entorno para la API Key
const API_KEY = process.env.MOODFLIX_API_CONFIG ?? "";
const BASE_URL = "http://192.168.0.19:8080/moodflix";

const MOODFLIX_API_CONFIG = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Manejo de errores globales (opcional)
MOODFLIX_API_CONFIG.interceptors.response.use(
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

export default MOODFLIX_API_CONFIG;
