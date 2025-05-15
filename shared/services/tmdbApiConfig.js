import axios from "axios";

// Crear una variable de entorno para la API Key
const API_KEY =
  process.env.EXPO_TMDB_API_KEY ?? "a611b32cd1c6f2f99992b6aa4cf54f34"; // añadir api harcodeada sino funciona el .env (solo para desarrollo)
const BASE_URL = "https://api.themoviedb.org/3";

// Crear una instancia de axios con la configuración de la API
const TMDB_API_CLIENT = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Añadir la API Key como parámetro global para todas las solicitudes
TMDB_API_CLIENT.interceptors.request.use(
  (config) => {
    if (API_KEY) {
      config.params = config.params || {};
      config.params["api_key"] = API_KEY;
    } else {
      console.error("API Key no está configurada correctamente.");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Manejo de errores globales para las respuestas de la API (opcional)
TMDB_API_CLIENT.interceptors.response.use(
  (response) => response,
  (error) => {
    // Puedes manejar el error globalmente aquí
    console.error("Error en TMDb API: ", error.response || error.message);
    return Promise.reject(error);
  }
);

export default TMDB_API_CLIENT;
