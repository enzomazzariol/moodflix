import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MockMovies from "../../lib/mocks/muchasMovies.json";
import ListOfMovies from "../commoms/ListOfMovies";

export default function Watchlist() {
  return (
    <>
      <ListOfMovies
        movies={MockMovies}
        contentContainerStyle={{ paddingBottom: hp("6%") }}
      />
    </>
  );
}
