import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect } from "react";
import ListOfMovies from "../../../components/commoms/ListOfMovies";
import { Title } from "../../../components/commoms/Title";
import MovieScreen from "../../../components/screens/MovieScreen";
import MockMovies from "../../../lib/mocks/muchasMovies.json";

// componente que muestra la pagina de busqueda de emociones, recibe como parametro el nombre de la emocion que se quiere buscar
export default function SearchEmotion() {
  const navigation = useNavigation();
  const { name } = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({
      title: `${name}`,
    });
  }, []);

  return (
    <MovieScreen className="flex-1 items-center justify-center">
      <Title>Emotion search page: {name}</Title>
      <ListOfMovies movies={MockMovies} />
    </MovieScreen>
  );
}
