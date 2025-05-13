import { heightPercentageToDP } from "react-native-responsive-screen";
import { useMoviesByCategory } from "../../../../shared/hooks/useMoviesByCategory";
import ListOfMovies from "../../components/commoms/ListOfMovies";
import MovieScreen from "../../components/screens/MovieScreen";

// componente que muestra la pagina de busqueda de películas con mejor calificación recuperadas de TMDB
export default function BestRatingSearch() {
  const {
    movies: topRatedMovies,
    error,
    isLoading,
  } = useMoviesByCategory({
    category: "top_rated",
    pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  });
  return (
    <MovieScreen className="flex-1">
      <ListOfMovies
        movies={topRatedMovies}
        contentContainerStyle={{ paddingBottom: heightPercentageToDP("6%") }}
      />
    </MovieScreen>
  );
}
