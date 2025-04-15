import { FlatList, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EmotionSlider from "../../components/home/EmotionSlider";
import MoviesSlider from "../../components/home/MoviesSlider";
import HomeScreen from "../../components/screens/HomeScreen";
import mocksMovies from "../../lib/mocks/movies.json";

export default function Home() {
  const insets = useSafeAreaInsets();
  // Configuración de las secciones de películas
  const movieSections = [
    {
      id: "popular-week",
      title: "Populares esta semana",
      data: mocksMovies,
    },
    {
      id: "popular-friends",
      title: "Populares entre tus amigos",
      data: mocksMovies,
    },
    {
      id: "coming-soon",
      title: "Proximamente",
      data: mocksMovies,
    },
  ];

  const renderHeader = () => (
    <EmotionSlider
      emotions={[
        "amor",
        "tristeza",
        "felicidad",
        "alegría",
        "enojo",
        "triunfo",
        "temor",
        "ansiedad",
      ]}
      title="¿Cómo te sientes hoy?"
    />
  );

  // Renderizar cada sección de películas
  const RenderMovieSection = ({ item }) => (
    <MoviesSlider movies={item.data} title={item.title} />
  );

  // Separador entre secciones de películas
  const RenderSectionSeparator = () => <View style={{ height: hp("0%") }} />;

  return (
    <HomeScreen>
      <FlatList
        data={movieSections}
        keyExtractor={(item) => item.id}
        renderItem={RenderMovieSection}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: hp("1%"),
          paddingVertical: hp("4%"),
        }}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={RenderSectionSeparator}
      />
    </HomeScreen>
  );
}
