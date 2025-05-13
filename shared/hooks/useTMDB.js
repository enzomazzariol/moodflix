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

  const getUpcomingMovies = async (
    language = "ES-es",
    page = 1,
    region = "ES"
  ) => {
    const data = await sendRequest({
      url: "/movie/upcoming",
      method: "GET",
      params: {
        language,
        page,
        region,
      },
    });

    return data;
  };

  const getNowPlayingMovies = async (
    language = "ES-es",
    page = 1,
    region = "ES"
  ) => {
    const data = await sendRequest({
      url: "/movie/now_playing",
      method: "GET",
      params: {
        language,
        page,
        region,
      },
    });

    return data;
  };

  const getTopRatedMovies = async (
    language = "ES-es",
    page = 1,
    region = "ES"
  ) => {
    const data = await sendRequest({
      url: "/movie/top_rated",
      params: {
        language,
        page,
        region,
      },
    });
    return data;
  };

  return {
    getPopularMovies,
    getUpcomingMovies,
    getNowPlayingMovies,
    getTopRatedMovies,
    isLoading,
    data,
    error,
  };
}
