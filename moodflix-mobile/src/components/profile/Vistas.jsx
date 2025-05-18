import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ListOfMovies from "../commoms/ListOfMovies";
import EmptyMovies from "./EmptyMovies";

export default function Vistas({ movies}) {

  return (
    <>
      {movies?.length > 0 ? (
        <ListOfMovies
          movies={movies}
          contentContainerStyle={{ paddingBottom: hp("6%") }}
        />
      ) : (
        <EmptyMovies
          title="No has visto ninguna película"
          textBtn="Descubrir nuevas películas"
          btnRoute="/search/popular"
        />
      )}
    </>
  );
}