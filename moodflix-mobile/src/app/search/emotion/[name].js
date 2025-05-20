import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useMoviesByEmotion } from "../../../../../shared/hooks/useMoviesByEmotion";
import ListOfMovies from "../../../components/commoms/ListOfMovies";
import SubmitBtn from "../../../components/commoms/SubmitBtn";
import { Title } from "../../../components/commoms/Title";
import MovieScreen from "../../../components/screens/MovieScreen";
import { colors } from "../../../utils/colors";

// componente que muestra la pagina de busqueda de emociones, recibe como parametro el nombre de la emocion que se quiere buscar
export default function SearchEmotion() {
  const navigation = useNavigation();
  const { name } = useLocalSearchParams();
  const { moviesByEmotion, isLoading } = useMoviesByEmotion(name);

  useEffect(() => {
    navigation.setOptions({
      title: `${name}`,
    });
  }, []);

  if (isLoading) {
    return (
      <MovieScreen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.floralWhite} />
        </View>
      </MovieScreen>
    );
  }

  if (!moviesByEmotion) {
    return (
      <MovieScreen>
        <View className="flex-1 items-center justify-center gap-y-4">
          <Title>No hay películas para esta emoción</Title>
          <SubmitBtn handleSubmit={() => navigation.goBack()}>
            <Text className="text-xl font-outfitBold text-white">
              Volver a buscar
            </Text>
          </SubmitBtn>
        </View>
      </MovieScreen>
    );
  }

  return (
    <MovieScreen className="flex-1 items-center justify-center">
      <ListOfMovies
        movies={moviesByEmotion}
        contentContainerStyle={{ paddingBottom: heightPercentageToDP("6%") }}
      />
    </MovieScreen>
  );
}
