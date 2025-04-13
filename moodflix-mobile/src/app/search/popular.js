import { Title } from "../../components/commoms/Title";
import MovieScreen from "../../components/screens/MovieScreen";

// componente que muestra la pagina de busqueda de películas populares recuperadas de TMDB
export default function PopularSearch() {
  return (
    <MovieScreen className="flex-1 items-center justify-center">
      <Title>Popular movies by TMDB</Title>
    </MovieScreen>
  );
}
