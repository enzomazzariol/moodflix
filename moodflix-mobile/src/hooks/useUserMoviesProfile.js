import { useEffect, useState } from "react";
import { useMoodflix } from "../../../shared/hooks/useMoodflix";

// Puedes pasar el userId como parámetro o usar un hook de auth si lo tienes
export function useUserMoviesProfile(userId) {
  const { getUserFavorites, getUserWatchlist, getUserWatchedMovies } =
    useMoodflix();

  const [userFavorites, setUserFavorites] = useState(null);
  const [userWatchlist, setUserWatchlist] = useState(null);
  const [userWatchedMovies, setUserWatchedMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUserMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [favorites, watchlist, watched] = await Promise.all([
          getUserFavorites(userId),
          getUserWatchlist(userId),
          getUserWatchedMovies(userId),
        ]);
        setUserFavorites(favorites);
        setUserWatchlist(watchlist);
        setUserWatchedMovies(watched);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserMovies();
  }, [userId]);

  return {
    userFavorites,
    userWatchlist,
    userWatchedMovies,
    isLoading,
    error,
  };
}
