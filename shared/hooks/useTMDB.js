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

  const getMovieRecommendations = async (movieId, language = "es-ES") => {
    const data = await sendRequest({
      url: `/movie/${movieId}/recommendations`,
      method: "GET",
      params: {
        language,
      },
    });

    return data;
  };

  const getRandomMovieBaseOn = async ({
    genre,
    decade,
    streaming,
    rating,
    duration,
  }) => {
    const startYear = decade ? parseInt(decade) : null;
    const endYear = startYear ? startYear + 9 : null;

    // Primera llamada: solo para obtener total_pages
    const initialResponse = await sendRequest({
      url: "/discover/movie",
      method: "GET",
      params: {
        language: "es-ES",
        sort_by: "popularity.desc",
        vote_average_gte: rating / 10,
        with_runtime_lte: duration,
        watch_region: "ES",
        with_watch_monetization_types: "flatrate,free,ads,rent,buy",
        ...(genre && { with_genres: genre }),
        ...(streaming && { with_watch_providers: streaming }),
        ...(startYear && {
          "release_date.gte": `${startYear}-01-01`,
          "release_date.lte": `${endYear}-12-31`,
        }),
        page: 1,
      },
    });

    const totalPages = Math.min(initialResponse.total_pages || 1, 500); // TMDB limita a 500 páginas

    if (totalPages === 0) return null;

    // Escoge una página aleatoria dentro del rango válido
    const randomPage = Math.floor(Math.random() * totalPages) + 1;

    // Segunda llamada para obtener resultados de la página aleatoria
    const pageResponse = await sendRequest({
      url: "/discover/movie",
      method: "GET",
      params: {
        language: "es-ES",
        sort_by: "popularity.desc",
        vote_average_gte: rating / 10,
        with_runtime_lte: duration,
        watch_region: "ES",
        with_watch_monetization_types: "flatrate,free,ads,rent,buy",
        ...(genre && { with_genres: genre }),
        ...(streaming && { with_watch_providers: streaming }),
        ...(startYear && {
          "release_date.gte": `${startYear}-01-01`,
          "release_date.lte": `${endYear}-12-31`,
        }),
        page: randomPage,
      },
    });

    const movies = pageResponse?.results || [];

    if (!movies.length) return null;

    // Índice aleatorio dentro de los resultados de la página
    const randomIndex = Math.floor(Math.random() * movies.length);

    return movies[randomIndex];
  };

  const searchMovies = async (query) => {
    const data = await sendRequest({
      url: `/search/movie?query=${encodeURIComponent(query)}`,
      method: "GET",
      params: {
        language: "es-ES",
        include_adult: true,
        region: "ES",
        page: 1,
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
    getMovieRecommendations,
    getRandomMovieBaseOn,
    searchMovies,
    isLoading,
    data,
    error,
  };
}
