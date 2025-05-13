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
