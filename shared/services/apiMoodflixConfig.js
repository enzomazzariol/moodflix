import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Crear una variable de entorno para la API Key
const BASE_URL = "http://10.4.6.14:8080/moodflix"; // CAMBIAR IP SEGUN WIFI

const MOODFLIX_API_CONFIG = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Añadir la API Key como parámetro global para todas las solicitudes
MOODFLIX_API_CONFIG.interceptors.request.use(async (config) => {
  const noAuthRoutes = ["/auth/login", "/auth/signup"];

  // Si la URL termina en una de las rutas sin auth, no agregar Authorization
  const shouldSkipAuth = noAuthRoutes.some((route) =>
    config.url?.endsWith(route)
  );

  if (!shouldSkipAuth) {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// Manejo de errores globales (opcional)
MOODFLIX_API_CONFIG.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log(
        "API Error: ",
        "Data:" + JSON.stringify(error.response.data),
        "Status:" + JSON.stringify(error.response.status),
        "Headers:" + JSON.stringify(error.response.headers),
        "Config:" + JSON.stringify(error.config)
      );
    } else if (error.request) {
      console.log("Network Error: ", error.request);
    } else {
      console.log("Error: ", error.message);
    }

    return Promise.reject(error);
  }
);

export default MOODFLIX_API_CONFIG;
