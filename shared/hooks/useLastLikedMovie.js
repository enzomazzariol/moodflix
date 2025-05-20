import { useEffect, useState } from "react";
import { useMoodflix } from "./useMoodflix";
import { useTMDB } from "./useTMDB";

export function useRecommendedMoviesFromLastLike(userId) {
  const { getUserLikedMovies } = useMoodflix();
  const { getMovieRecommendations } = useTMDB();

  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [basedOnTitle, setBasedOnTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!userId) return;

      try {
        setIsLoading(true);
        const liked = await getUserLikedMovies(userId);
        const movieId = liked?.movieId;
        const title = liked?.title;

        if (movieId) {
          const recommendations = await getMovieRecommendations(movieId);
          setRecommendedMovies(recommendations?.results || []);
          setBasedOnTitle(title);
        } else {
          setRecommendedMovies([]);
          setBasedOnTitle(null);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return {
    recommendedMovies,
    basedOnTitle,
    isLoading,
    error,
  };
}
