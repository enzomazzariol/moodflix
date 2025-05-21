import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useMoodflix } from "../../../../shared/hooks/useMoodflix";
import ReviewCard from "../../components/moviePage/ReviewCard";
import NewReviewModal from "../../components/review/NewReviewModal";
import MovieScreen from "../../components/screens/MovieScreen";
import { PlusIcon } from "../../components/ui/icons";
import { colors } from "../../utils/colors";

export default function Review() {
  const { movie, movieRating, openModal } = useLocalSearchParams();

  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { getMovieRating } = useMoodflix();

  // Parseamos movie y movieRating si existen
  const parsedMovie = movie ? JSON.parse(movie) : null;
  // Usamos estado local para manejar las reseñas actualizadas
  const [localMovieRating, setLocalMovieRating] = useState(
    movieRating ? JSON.parse(movieRating) : null
  );

  useEffect(() => {
    if (openModal === "true") {
      const timeout = setTimeout(() => {
        setModalVisible(true);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [openModal]);

  // Función para refrescar las reseñas con llamada a getMovieRating
  const onRefresh = async () => {
    if (!parsedMovie) return; // Si no hay película, no hacemos nada

    setRefreshing(true);

    try {
      // Suponiendo que getMovieRating recibe un id de película y devuelve el rating actualizado
      const updatedMovieRating = await getMovieRating(parsedMovie.movie_id);
      setLocalMovieRating(updatedMovieRating);
    } catch (error) {
      console.log("Error al obtener las reseñas actualizadas:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <MovieScreen>
      <View className="flex-1">
        <FlatList
          data={localMovieRating?.ratings}
          keyExtractor={(item) => item.ratingId?.toString()}
          renderItem={({ item }) => <ReviewCard review={item} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#EDE9E3"]}
              tintColor="#EDE9E3"
            />
          }
          ListEmptyComponent={
            <View
              className="flex-1 items-center justify-center"
              style={{ paddingTop: heightPercentageToDP("40%") }}
            >
              <Text className="font-spaceGroteskBold text-3xl text-floralWhite w-60 text-center">
                No hay reseñas para esta película.
              </Text>
            </View>
          }
        />

        <Pressable
          onPress={() => setModalVisible(true)}
          className="rounded-full bg-jasper items-center justify-center"
          style={{
            position: "absolute",
            bottom: heightPercentageToDP("7%"),
            right: heightPercentageToDP("3%"),
            height: heightPercentageToDP("6.5%"),
            width: heightPercentageToDP("6.5%"),
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <PlusIcon size={28} color={colors.floralWhite} />
        </Pressable>
      </View>

      <NewReviewModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        movie={parsedMovie}
      />
    </MovieScreen>
  );
}
