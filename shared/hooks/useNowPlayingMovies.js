import { useEffect, useState } from "react";
import { useTMDB } from "./useTMDB";

// Custom hook para obtener las peliculas populares de TMDB
export function useNowPlayingMovies() {
  const { getNowPlayingMovies, isLoading, error } = useTMDB();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNowPlayingMovies();
      if (data?.results) setMovies(data.results);
    };
    fetchData();
  }, []);

  return { movies, isLoading, error };
}
