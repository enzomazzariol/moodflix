import { useEffect, useState } from "react";
import { useTMDB } from "./useTMDB";

// Custom hook para obtener las peliculas que se van a estrenar de TMDB
export function useUpcomingMovies() {
  const { getUpcomingMovies, isLoading, error } = useTMDB();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUpcomingMovies();
      if (data?.results) setMovies(data.results);
    };
    fetchData();
  }, []);

  return { movies, isLoading, error };
}
