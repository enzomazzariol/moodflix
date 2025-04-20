import { useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MockMovies from "../../lib/mocks/muchasMovies.json";
import ListOfMovies from "../commoms/ListOfMovies";
import SubmitBtn from "../commoms/SubmitBtn";

export default function Watchlist() {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  }

  const hasMore = visibleCount < MockMovies.length;
  const movies = MockMovies.slice(0, visibleCount);
  return (
    <>
      <ListOfMovies
        movies={movies}
        contentContainerStyle={{ paddingBottom: hp("6%") }}
      />

      {hasMore && <SubmitBtn handleSubmit={handleLoadMore}>Ver más</SubmitBtn>}
    </>
  );
}
