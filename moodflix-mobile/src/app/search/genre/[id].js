import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Title } from "../../../components/commoms/Title";
import SearchScreen from "../../../components/screens/SearchScreen";

export default function GenreMovies() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: `Nombre del genero` });
  }, []);

  return (
    <SearchScreen>
      <Title>Genre page - ID: {id}</Title>
    </SearchScreen>
  );
}
