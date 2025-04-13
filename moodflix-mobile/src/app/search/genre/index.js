import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { Title } from "../../../components/commoms/Title";
import SearchScreen from "../../../components/screens/SearchScreen";

// componente que muestra la pagina de busqueda de géneros, con lista de generos a elegir
export default function GenreSearch() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/search/genre/28");
  };

  return (
    <SearchScreen>
      <Title>Genre list</Title>
      <Pressable onPress={handleNavigation}>
        <Title>Click to go to genre detail</Title>
      </Pressable>
    </SearchScreen>
  );
}
