import { View } from "lucide-react-native";
import { ActivityIndicator } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useMoviesByCategory } from "../../../../shared/hooks/useMoviesByCategory";
import ListOfMovies from "../../components/commoms/ListOfMovies";
import MovieScreen from "../../components/screens/MovieScreen";
import { colors } from "../../utils/colors";

// componente que muestra la pagina de busqueda de películas populares recuperadas de TMDB
export default function PopularSearch() {
  const {
    movies: popularMovies,
    isLoading,
    error,
  } = useMoviesByCategory({
    category: "popular",
    pages: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
  });

  if (isLoading) {
    return (
      <MovieScreen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.floralWhite} />
        </View>
      </MovieScreen>
    );
  }

  return (
    <MovieScreen>
      <ListOfMovies
        movies={popularMovies}
        contentContainerStyle={{ paddingBottom: heightPercentageToDP("6%") }}
      />
    </MovieScreen>
  );
}
