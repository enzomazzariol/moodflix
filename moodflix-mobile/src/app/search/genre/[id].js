import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Title } from "../../../components/commoms/Title";
import SearchScreen from "../../../components/screens/SearchScreen";

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
    </SearchScreen>
  );
}
