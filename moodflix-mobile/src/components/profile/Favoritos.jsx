import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MockMovies from "../../lib/mocks/muchasMovies.json";
import ListOfMovies from "../commoms/ListOfMovies";
import EmptyMovies from "./EmptyMovies";

export default function Favoritos() {
  const movies = MockMovies || [];

  return (
    <>
      {movies.length > 0 ? (
        <ListOfMovies
          movies={movies}
          contentContainerStyle={{ paddingBottom: hp("6%") }}
        />
      ) : (
        <EmptyMovies
          title="No hay ninguna películas en tus favoritos. ¡Añade algunas!"
          textBtn="Descubrir nuevas películas"
          btnRoute="/search/popular"
        />
      )}
    </>
  );
}