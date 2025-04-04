import axios from "axios";

const API_KEY = process.env.EXPO_TMDB_API_KEY ?? "";
const BASE_URL = "https://api.themoviedb.org/3";

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
    config.params = config.params || {};
    config.params["api_key"] = API_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Manejo de errores globales para las respuestas de la API (opcional)
tmdbClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Puedes manejar el error globalmente aquí
    console.error("Error en TMDb API: ", error.response || error.message);
    return Promise.reject(error);
  }
);

export default TMDB_API_CLIENT;
