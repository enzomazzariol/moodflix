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
        // Fase 1: Obtener (o insertar si no existe) la película en tu backend
        const movieData = await getMovie(movieId);
        setMovie(movieData);

        // Fase 2: Obtener el resto de datos
        const [
          creditsData,
          movieDetailsData,
          similarMoviesData,
          movieRatingData,
        ] = await Promise.all([
          getCredits(movieId),
          getMovieDetails(movieId),
          getSimilarMovies(movieId),
          getMovieRating(movieId),
        ]);

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
