import { FlatList, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useRecommendedMoviesFromLastLike } from "../../../../shared/hooks/useLastLikedMovie";
import { useMoviesByCategory } from "../../../../shared/hooks/useMoviesByCategory";
import EmotionSlider from "../../components/home/EmotionSlider";
import MoviesSlider from "../../components/home/MoviesSlider";
import HomeScreen from "../../components/screens/HomeScreen";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { currentEmotion, favoriteGenre, user } = useAuth();
  const { recommendedMovies, basedOnTitle } = useRecommendedMoviesFromLastLike(
    user?.user_id
  );

  // Configuración de las secciones de películas
  const { movies: popularMovies } = useMoviesByCategory({
    category: "popular",
    page: 1,
  });
  const { movies: upcomingMovies } = useMoviesByCategory({
    category: "upcoming",
    page: 1,
  });
  const { movies: nowPlayingMovies } = useMoviesByCategory({
    category: "now_playing",
    page: 1,
  });

  const movieSections = [
    {
      id: "popular-week",
      title: "Populares esta semana",
      data: popularMovies,
    },
    ...(recommendedMovies.length > 0
      ? [
          {
            id: "recommended",
            title: `Porque te gustó "${basedOnTitle}"`,
            data: recommendedMovies,
          },
        ]
      : []),
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
