import { useEffect, useState } from "react";
import { useMoodflix } from "./useMoodflix";

export function useMoviesByEmotion(emotion) {
  const { getMoviesByEmotion, isLoading, data, error } = useMoodflix();
  const [moviesByEmotion, setMoviesByEmotion] = useState(null);

  useEffect(() => {
    const fetchMoviesByEmotion = async () => {
      try {
        const data = await getMoviesByEmotion(emotion);
        setMoviesByEmotion(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesByEmotion();
  }, [emotion]);

  return {
    moviesByEmotion,
    isLoading,
    error,
  };
}
