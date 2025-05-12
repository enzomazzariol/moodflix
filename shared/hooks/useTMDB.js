import TMDB_API_CLIENT from "../services/tmdbApiConfig";
import { useApiRequest } from "./useApiRequest";

// Hook para realizar peticiones a la API TMDB (crear funciones para cada endpoint)
export function useTMDB() {
  const { sendRequest, isLoading, data, error } =
    useApiRequest(TMDB_API_CLIENT);

  const getPopularMovies = async (language = "ES-es", page = 1) => {
    const data = await sendRequest({
      url: "/movie/popular",
      method: "GET",
      params: {
        language,
        page,
      },
    });

    return data;
  };

  return { getPopularMovies, isLoading, data, error };
}
