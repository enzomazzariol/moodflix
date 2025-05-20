import { useEffect, useState } from "react";
import { useTMDB } from "./useTMDB";

// Custom hook reutilizable para obtener películas según categoría
export function useMoviesByCategory({
  category = "popular", // popular | upcoming | now_playing
  language = "ES-es",
  pages = [1],
  region = "ES",
}) {
  const {
    getPopularMovies,
    getUpcomingMovies,
    getNowPlayingMovies,
    getTopRatedMovies,
    getClassicMovies,
    getIndieMovies,
    isLoading,
    error,
  } = useTMDB();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allMovies = [];

      for (const page of pages) {
        let data;
        switch (category) {
          case "popular":
            data = await getPopularMovies(language, page);
            break;
          case "upcoming":
            data = await getUpcomingMovies(language, page, region);
            break;
          case "now_playing":
            data = await getNowPlayingMovies(language, page, region);
            break;
          case "top_rated":
            data = await getTopRatedMovies(language, page);
            break;
          case "classic":
            data = await getClassicMovies(language, page);
            break;
          case "indie":
            data = await getIndieMovies(language, page);
            break;
          default:
            console.warn("Categoría no reconocida:", category);
            return;
        }

        if (data?.results) {
          allMovies.push(...data.results);
        }
      }
      setMovies(allMovies);
    };

    fetchData();
  }, [category, language, pages.join(","), region]);

  return { movies, isLoading, error };
}
