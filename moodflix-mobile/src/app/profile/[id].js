import { useLocalSearchParams } from "expo-router/build/hooks";
import { Title } from "../../components/commoms/Title";
import MovieScreen from "../../components/screens/MovieScreen";

export default function UserProfile() {
  const { id } = useLocalSearchParams();
  return (
    <MovieScreen className="flex-1 items-center justify-center">
      <Title>Usuario profile - ID: {id}</Title>
    </MovieScreen>
  );
}
