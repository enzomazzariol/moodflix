import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { useTMDB } from "./useTMDB";

export function useRandomizer() {
  const [randomizerData, setRandomizerData] = useState({
    genre: null,
    decade: null,
    streaming: null,
    rating: 1,
    duration: 240,
  });
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { getRandomMovieBaseOn, isLoading, error } = useTMDB();

  const handleSubmit = async () => {
    const movie = await getRandomMovieBaseOn({ ...randomizerData, index });

    if (movie) {
      goToRandomMovie(movie, index);
      setIndex((prev) => prev + 1);
    } else {
      Alert.alert(
        "Sin resultados",
        "No se encontró ninguna película que coincida con tus filtros. Intenta cambiar los parámetros."
      );
    }
  };

  const goToRandomMovie = (movie, currentIndex) => {
    router.push({
      pathname: `/randomizerMovie`,
      params: {
        movie: JSON.stringify(movie),
        randomizerData: JSON.stringify(randomizerData),
        index: currentIndex.toString(),
      },
    });
  };

  return {
    randomizerData,
    setRandomizerData,
    handleSubmit,
    isLoading,
    error,
  };
}
