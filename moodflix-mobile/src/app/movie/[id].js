import { useLocalSearchParams } from "expo-router/build/hooks";
import { Title } from "../../components/commoms/Title";
import MovieScreen from "../../components/screens/MovieScreen";

export default function Movie() {
  const { id } = useLocalSearchParams();
  return (
    <MovieScreen className="flex-1 items-center justify-center">
      <Title>Movie page - ID: {id}</Title>
    </MovieScreen>
  );
}
