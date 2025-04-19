import ListOfMovies from "../../components/commoms/ListOfMovies";
import MovieScreen from "../../components/screens/MovieScreen";
import MockMovies from "../../lib/mocks/muchasMovies.json";

// componente que muestra la pagina de busqueda de películas con mejor calificación recuperadas de TMDB
export default function BestRatingSearch() {
  return (
    <MovieScreen className="flex-1">
      <ListOfMovies movies={MockMovies} />
    </MovieScreen>
  );
}
