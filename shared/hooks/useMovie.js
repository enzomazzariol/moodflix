import { useEffect, useState } from "react";
import { useMoodflix } from "./useMoodflix";
import { useTMDB } from "./useTMDB";

export function useMovie(movieId) {
  const { getMovie, getMovieRating } = useMoodflix();
  const { getCredits, getMovieDetails, getSimilarMovies } = useTMDB();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);
  const [movieRating, setMovieRating] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieAndCredits = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [
          movieData,
          creditsData,
          movieDetailsData,
          similarMoviesData,
          movieRatingData,
        ] = await Promise.all([
          getMovie(movieId),
          getCredits(movieId),
          getMovieDetails(movieId),
          getSimilarMovies(movieId),
          getMovieRating(movieId),
        ]);
        setMovie(movieData);
        setCredits(creditsData);
        setMovieDetails(movieDetailsData);
        setSimilarMovies(similarMoviesData);
        setMovieRating(movieRatingData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieAndCredits();
  }, [movieId]);

  return {
    movie,
    isLoading,
    error,
    credits,
    movieDetails,
    similarMovies,
    movieRating,
  };
}
