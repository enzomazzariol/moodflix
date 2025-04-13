import { Title } from "../../components/commoms/Title";
import MovieScreen from "../../components/screens/MovieScreen";

// componente que muestra la pagina de busqueda de películas con mejor calificación recuperadas de TMDB
export default function BestRatingSearch() {
  return (
    <MovieScreen className="flex-1 items-center justify-center">
      <Title>Best rating movies by TMDB</Title>
    </MovieScreen>
  );
}
