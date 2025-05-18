import { useEffect, useState } from "react";
import { EventBus } from "../../moodflix-mobile/src/services/eventBus.js";
import { useMoodflix } from "./useMoodflix";

export function useMovieStatus(userId, movieId) {
  const { updateMovieStatus, getMovieStatus } = useMoodflix();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isViewed, setIsViewed] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Obtener estado inicial desde el backend
  useEffect(() => {
    const fetchStatus = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieStatus(userId, movieId);
        if (data) {
          setIsFavorite(data.isFavorite);
          setIsViewed(data.isViewed);
          setIsInWatchlist(data.isInWatchlist);
        }
      } catch (err) {
        console.log("Error al obtener estado de película:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId && movieId) {
      fetchStatus();
    }
  }, [userId, movieId]);

  const toggleFavorite = async (userId, movieId) => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    await updateMovieStatus(userId, movieId, newState, null, null);
    EventBus.emit("userMoviesUpdated");
  };

  const toggleViewed = async (userId, movieId) => {
    const newState = !isViewed;
    setIsViewed(newState);
    await updateMovieStatus(userId, movieId, null, newState, null);
    EventBus.emit("userMoviesUpdated");
  };

  const toggleWatchlist = async (userId, movieId) => {
    const newState = !isInWatchlist;
    setIsInWatchlist(newState);
    await updateMovieStatus(userId, movieId, null, null, newState);
    EventBus.emit("userMoviesUpdated");
  };

  return {
    isFavorite,
    isViewed,
    isInWatchlist,
    toggleFavorite,
    toggleViewed,
    toggleWatchlist,
    isLoading,
  };
}
