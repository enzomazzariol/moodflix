import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ListOfMovies from "../commoms/ListOfMovies";
import EmptyMovies from "./EmptyMovies";

export default function Watchlist({ movies }) {

  return (
    <>
      {movies?.length > 0 ? (
        <ListOfMovies
          movies={movies}
          contentContainerStyle={{ paddingBottom: hp("6%") }}
        />
      ) : (
        <EmptyMovies
          title="Empieza a guardar películas en tu watchlist"
          textBtn="Descubrir nuevas películas"
          btnRoute="/search/popular"
        />
      )}
    </>
  );
}
