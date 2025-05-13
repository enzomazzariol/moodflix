import { heightPercentageToDP } from "react-native-responsive-screen";
import { useMoviesByCategory } from "../../../../shared/hooks/useMoviesByCategory";
import ListOfMovies from "../../components/commoms/ListOfMovies";
import MovieScreen from "../../components/screens/MovieScreen";

// componente que muestra la pagina de busqueda de películas populares recuperadas de TMDB
export default function PopularSearch() {
  const {
    movies: popularMovies,
    isLoading,
    error,
  } = useMoviesByCategory({
    category: "popular",
    pages: [1, 2, 3, 4, 5, 6],
  });

  return (
    <MovieScreen>
      <ListOfMovies
        movies={popularMovies}
        contentContainerStyle={{ paddingBottom: heightPercentageToDP("6%") }}
      />
    </MovieScreen>
  );
}
