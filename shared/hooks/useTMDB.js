import TMDB_API_CLIENT from "../services/tmdbApiConfig";
import { useApiRequest } from "./useApiRequest";

// Hook para realizar peticiones a la API TMDB (crear funciones para cada endpoint)
export function useTMDB() {
  const { sendRequest, isLoading, data, error } =
    useApiRequest(TMDB_API_CLIENT);

  const getPopularMovies = async (language = "es-ES", page = 1) => {
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
    language = "es-ES",
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
    language = "es-ES",
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
    language = "es-ES",
    page = 1,
    region = "ES"
  ) => {
    const data = await sendRequest({
      url: "/movie/top_rated",
      method: "GET",
      params: {
        language,
        page,
        region,
      },
    });
    return data;
  };

  const getMoviesByGenre = async (
    genreId,
    page = 1,
    language = "es-ES",
    region = "ES"
  ) => {
    const data = await sendRequest({
      url: "/discover/movie",
      method: "GET",
      params: {
        with_genres: genreId,
        page,
        language,
        region,
      },
    });
    return data;
  };

  const getCredits = async (movieId) => {
    const data = await sendRequest({
      url: `/movie/${movieId}/credits`,
      method: "GET",
    });

    return data;
  };

  const getMovieDetails = async (movieId, language = "es-ES") => {
    const data = await sendRequest({
      url: `/movie/${movieId}`,
      method: "GET",
      params: {
        language,
      },
    });

    return data;
  };

  const getSimilarMovies = async (movieId, language = "es-ES", page = 1) => {
    const data = await sendRequest({
      url: `/movie/${movieId}/similar`,
      method: "GET",
      params: {
        language,
        page,
      },
    });

    return data;
  };

  return {
    getPopularMovies,
    getUpcomingMovies,
    getNowPlayingMovies,
    getTopRatedMovies,
    getMoviesByGenre,
    getCredits,
    getMovieDetails,
    getSimilarMovies,
    isLoading,
    data,
    error,
  };
}
