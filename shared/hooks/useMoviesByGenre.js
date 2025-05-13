import { useEffect, useState } from "react";
import { useTMDB } from "./useTMDB";

// Hooks para obtener las películas de un género
export function useMoviesByGenre({
  genreId,
  language = "es-ES",
  region = "ES",
}) {
  const { getMoviesByGenre } = useTMDB();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);

  // Resetear los datos cuando cambia el género
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasInitiallyLoaded(false);
  }, [genreId]);

  useEffect(() => {
    if (!genreId) return;

    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const data = await getMoviesByGenre(genreId, page, language, region);
        setMovies((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
        setTotalPages(data.total_pages || 1);
        if (!hasInitiallyLoaded) {
          setHasInitiallyLoaded(true);
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [genreId, language, region, page, hasInitiallyLoaded]);

  const fetchMore = () => {
    if (!isLoading && page < totalPages) {
      setPage((p) => p + 1);
    }
  };

  return {
    movies,
    isLoading,
    error,
    fetchMore,
    hasMore: page < totalPages,
    hasInitiallyLoaded,
  };
}
