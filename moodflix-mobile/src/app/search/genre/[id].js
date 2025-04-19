import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import ListOfMovies from "../../../components/commoms/ListOfMovies";
import { Title } from "../../../components/commoms/Title";
import SearchScreen from "../../../components/screens/SearchScreen";
import MockMovies from "../../../lib/mocks/muchasMovies.json";

export default function GenreMovies() {
  const { id, name } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <SearchScreen>
      <Title>
        Genre page - ID: {name} y {id}
      </Title>
      <ListOfMovies movies={MockMovies} />
    </SearchScreen>
  );
}
