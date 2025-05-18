import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import ReviewCard from "../../components/moviePage/ReviewCard";
import NewReviewModal from "../../components/review/NewReviewModal";
import MovieScreen from "../../components/screens/MovieScreen";
import { PlusIcon } from "../../components/ui/icons";
import { colors } from "../../utils/colors";

export default function Review() {
  const { movie, movieRating, openModal } = useLocalSearchParams();

  const [modalVisible, setModalVisible] = useState(false);

  // Parseamos movie y movieRating si existen
  const parsedMovie = movie ? JSON.parse(movie) : null;
  const parsedMovieRating = movieRating ? JSON.parse(movieRating) : null;

  // Abre el modal de reseña si se ha pasado el parámetro openModal
  useEffect(() => {
    if (openModal === "true") {
      const timeout = setTimeout(() => {
        setModalVisible(true);
      }, 1200);

      return () => clearTimeout(timeout);
    }
  }, [openModal]);

  return (
    <MovieScreen>
      <View className="flex-1">
        {parsedMovieRating?.ratings?.length > 0 ? (
          <FlatList
            data={parsedMovieRating?.ratings}
            keyExtractor={(item) => item.ratingId?.toString()}
            renderItem={({ item }) => <ReviewCard review={item} />}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="font-spaceGroteskBold text-3xl text-floralWhite w-60 text-center">
              No hay reseñas para este película.
            </Text>
          </View>
        )}

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
