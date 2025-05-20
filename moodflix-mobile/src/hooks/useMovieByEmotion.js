import { useEffect, useState } from "react";
import { useMoodflix } from "../../../shared/hooks/useMoodflix";

const API_URL = "http://<TU_BACKEND_URL>/api/movies/emotion"; // Cambia esto según tu ruta real

export const useMoviesByEmotion = (emotion) => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getOneMovieByEmotion } = useMoodflix();

  useEffect(() => {
    const fetchMovieByEmotion = async () => {
      if (!emotion) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await getOneMovieByEmotion(emotion);
        setMovie(response);
      } catch (err) {
        console.log("Error al obtener película por emoción:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieByEmotion();
  }, [emotion]);

  return { movie, isLoading, error };
};
