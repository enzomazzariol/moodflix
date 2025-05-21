import { useCallback, useEffect, useState } from "react";
import { useMoodflix } from "./useMoodflix";
import { useTMDB } from "./useTMDB";

export function useMovie(movieId) {
  const { getMovie, getMovieRating } = useMoodflix();
  const {
    getCredits,
    getMovieDetails,
    getSimilarMovies,
    getMovieRecommendations,
  } = useTMDB();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [recommenmedMovies, setRecommendedMovies] = useState(null);
  const [movieRating, setMovieRating] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieAndCredits = useCallback(async () => {
    if (!movieId) return;

    setIsLoading(true);
    setError(null);

    try {
      const movieData = await getMovie(movieId);
      setMovie(movieData);

      const [
        creditsData,
        movieDetailsData,
        recommenmedMoviesData,
        movieRatingData,
      ] = await Promise.all([
        getCredits(movieId),
        getMovieDetails(movieId),
        getMovieRecommendations(movieId),
        getMovieRating(movieId),
      ]);

      setCredits(creditsData);
      setMovieDetails(movieDetailsData);
      setRecommendedMovies(recommenmedMoviesData);
      setMovieRating(movieRatingData);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovieAndCredits();
  }, [fetchMovieAndCredits]);

  return {
    movie,
    isLoading,
    error,
    credits,
    movieDetails,
    recommenmedMovies,
    movieRating,
    refetchMovie: fetchMovieAndCredits,
  };
}
