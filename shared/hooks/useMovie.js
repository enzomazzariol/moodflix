import { useEffect, useState } from "react";
import { useMoodflix } from "./useMoodflix";

export function useMovie(movieId) {
  const { getMovie } = useMoodflix();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getMovie(movieId);
        setMovie(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  return { movie, isLoading, error };
}
