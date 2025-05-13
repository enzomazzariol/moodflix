import { FlatList, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNowPlayingMovies } from "../../../../shared/hooks/useNowPlayingMovies";
import { usePopularMovies } from "../../../../shared/hooks/usePopularMovies";
import { useUpcomingMovies } from "../../../../shared/hooks/useUpcomingMovies";
import EmotionSlider from "../../components/home/EmotionSlider";
import MoviesSlider from "../../components/home/MoviesSlider";
import HomeScreen from "../../components/screens/HomeScreen";

export default function Home() {
  // Configuración de las secciones de películas
  const { movies: popularMovies } = usePopularMovies();
  const { movies: upcomingMovies } = useUpcomingMovies();
  const { movies: nowPlayingMovies } = useNowPlayingMovies();
  const movieSections = [
    {
      id: "popular-week",
      title: "Populares esta semana",
      data: popularMovies,
    },
    {
      id: "now-playing",
      title: "En cines ahora",
      data: nowPlayingMovies,
    },
    {
      id: "coming-soon",
      title: "Próximamente",
      data: upcomingMovies,
    },
  ];

  const renderHeader = () => (
    <EmotionSlider
      emotions={[
        "amor",
        "tristeza",
        "feliz",
        "alegre",
        "enojado",
        "esperanza",
        "miedo",
        "ansiedad",
      ]}
      title="¿Cómo te sientes hoy?"
    />
  );

  // Renderizar cada sección de películas
  const RenderMovieSection = ({ item }) => (
    <MoviesSlider
      movies={item.data}
      title={item.title}
      flatlistStyles={{ paddingHorizontal: hp("1.5%") }}
      titleStyles={{ paddingLeft: hp("1.5%") }}
    />
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
          paddingVertical: hp("4%"),
        }}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={RenderSectionSeparator}
      />
    </HomeScreen>
  );
}
