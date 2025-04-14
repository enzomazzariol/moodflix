import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import SectionLink from "../../../components/commoms/SectionLink";
import SearchScreen from "../../../components/screens/SearchScreen";
import { genreList } from "../../../lib/searchData/genreList"; // lista que contiene id y nombre del genero

// componente que muestra la pagina de busqueda de géneros, con lista de generos a elegir
export default function GenreSearch() {
  const router = useRouter();

  const handleNavigation = (idGenre, name) => {
    router.push({
      pathname: `/search/genre/${idGenre}`,
      params: { name },
    });
  };

  return (
    <SearchScreen>
      <FlatList
        data={genreList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SectionLink onPress={() => handleNavigation(item.id, item.name)}>
            {item.name}
          </SectionLink>
        )}
        contentContainerStyle={{
          paddingHorizontal: hp("1.7%"),
          paddingVertical: hp("2%"),
          gap: hp("2%"),
        }}
      />
    </SearchScreen>
  );
}
