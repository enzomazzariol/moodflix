import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MockMovies from "../../lib/mocks/muchasMovies.json";
import ListOfMovies from "../commoms/ListOfMovies";

export default function Vistas() {

  return (
    <>
      <ListOfMovies movies={MockMovies} contentContainerStyle={{paddingBottom: hp("6%")}} />
    </>
  );
}
