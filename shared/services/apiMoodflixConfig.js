import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const router = useRouter();

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
  async (error) => {
    const originalRequest = error.config;

    // Si recibimos 401, intentamos refrescar el token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry // evitar bucles infinitos
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token found");

        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        await AsyncStorage.setItem("authToken", newAccessToken);
        await AsyncStorage.setItem("refreshToken", newRefreshToken);

        // Actualizar headers para futuras peticiones
        MOODFLIX_API_CONFIG.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return MOODFLIX_API_CONFIG(originalRequest); // Repetir la petición original
      } catch (refreshError) {
        console.log("Error al refrescar el token:", refreshError);
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("refreshToken");
        // Aquí puedes redirigir al login si quieres
        router.replace("/(auth)/login");
        return Promise.reject(refreshError);
      }
    }

    // Otros errores (incluye tu lógica de logging)
    if (error.response) {
      const data = error.response.data;
      const statusCode = error.response.status;
      let errorMessage = "Error del servidor";

      if (Array.isArray(data.errors)) {
        errorMessage = data.errors.map((e) => e.message).join("\n");
      } else {
        errorMessage = data?.message || "Error del servidor";
      }

      const customError = {
        message: errorMessage,
        statusCode,
        raw: error,
      };

      console.log("API Error in useApiRequest:", customError);
    } else if (error.request) {
      console.log("Network Error: ", error.request);
    } else {
      console.log("Error: ", error.message);
    }

    return Promise.reject(error);
  }
);

export default MOODFLIX_API_CONFIG;
