import { Title } from "../../components/commoms/Title";
import MovieScreen from "../../components/screens/MovieScreen";

// componente que muestra la pagina de busqueda de nuevas películas recuperadas de TMDB
export default function NewMoviesSearch() {
  return (
    <MovieScreen className="flex-1 items-center justify-center">
      <Title>New movies by TMDB</Title>
    </MovieScreen>
  );
}
