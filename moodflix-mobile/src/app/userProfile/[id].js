import { Rating } from "@kolking/react-native-rating";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useActivity } from "../../../../shared/hooks/useActivity";
import { useUserInfo } from "../../../../shared/hooks/useUserInfo";
import PosterMovie from "../../components/commoms/PosterMovie";
import ProfilePicture from "../../components/commoms/ProfilePicture";
import { Title } from "../../components/commoms/Title";
import MoviesSlider from "../../components/home/MoviesSlider";
import ProfileInfoRow from "../../components/profile/ProfileInfoRow";
import MovieScreen from "../../components/screens/MovieScreen";
import { useUserMoviesProfile } from "../../hooks/useUserMoviesProfile";
import { colors } from "../../utils/colors";

// Screen de perfil de usuario
export default function UserProfile() {
  const { id, username } = useLocalSearchParams();
  const { userInfo } = useUserInfo(id);
  const navigation = useNavigation();
  const [profileImageVisible, setProfileImageVisible] = useState(false);
  const { error, isLoading, userFavorites, userWatchedMovies, userWatchlist } =
    useUserMoviesProfile(id);
  const { userActivity } = useActivity(id);
  console.log(userActivity);

  // Setea el título de la pantalla en función del usuario
  useEffect(() => {
    navigation.setOptions({
      title: username,
    });
  }, [username]);

  return (
    <MovieScreen className="flex-1">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          className=""
          style={{
            paddingHorizontal: wp("0%"),
            paddingVertical: hp("4%"),
          }}
        >
          <View
            className="items-center w-full"
            style={{
              borderBottomWidth: 1,
              borderColor: colors.prussianBlue,
              paddingBottom: hp("2%"),
            }}
          >
            {/* Imagen de perfil */}
            <ProfilePicture
              url={require("../../../assets/user-profile-img-favicon.jpg")}
              onPress={() => setProfileImageVisible(true)}
            />

            {/* Modal para ampliar la imagen de perfil */}
            <UserImageModal
              profileImageVisible={profileImageVisible}
              setProfileImageVisible={setProfileImageVisible}
            />

            <View
              className="flex-col items-center justify-center"
              style={{ rowGap: hp("1.5%") }}
            >
              <ProfileInfoRow
                location={"Madrid"}
                emotion={"Miedo"}
                genre={"Drama"}
              />
              <Text
                className="text-floralWhite font-spaceGroteskRegular text-base"
                style={{ width: wp("90%") }}
              >
                Me gusta ver películas con un tono de emoción.
              </Text>
            </View>
          </View>
          <View
            style={{ marginTop: hp("2%"), paddingHorizontal: wp("2%") }}
            className="flex-col justify-start items-start"
          >
            {userActivity?.length > 0 && (
              <>
                <Title
                  className="font-spaceGroteskRegular"
                  style={{ fontSize: hp("2.5%") }}
                >
                  Últimas reseñas
                </Title>

                {userActivity
                  ?.filter((activity) => activity.activityType === "review")
                  .slice(0, 3)
                  .map((activity, index) => (
                    <View
                      key={activity.activityId ?? index}
                      style={{ marginVertical: hp("2%") }}
                    >
                      {/* Poster de la película */}
                      <PosterMovie
                        idMovie={activity.movie.movieId}
                        posterPath={activity.movie.posterPath}
                        title={activity.movie.title}
                        posterHeight={hp("18%")}
                        posterWidth={wp("24%")}
                      />

                      {/* Si es una reseña, muestra el rating */}
                      {activity.activityType === "review" && (
                        <View
                          style={{
                            marginTop: hp("1%"),
                            flexDirection: "row",
                          }}
                        >
                          <Rating
                            size={13}
                            rating={activity?.review?.rating}
                            maxRating={5}
                            disabled={true}
                            baseColor={colors.floralWhite}
                            fillColor={colors.jasper}
                          />
                        </View>
                      )}
                    </View>
                  ))}
              </>
            )}
          </View>

          {/* Sliders de peliculas favoritas, vistas y watchlist */}
          <View
            style={{
              paddingHorizontal: wp("2%"),
              paddingVertical: hp("1%"),
            }}
          >
            {isLoading ? (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color={colors.floralWhite} />
              </View>
            ) : (
              <>
                {userFavorites?.length > 0 && (
                  <MoviesSlider
                    movies={userFavorites}
                    title={"Favoritas"}
                    posterHeight={hp("16%")}
                    posterWidth={wp("21%")}
                  />
                )}
                {userWatchlist?.length > 0 && (
                  <MoviesSlider
                    movies={userWatchlist}
                    title={"Watchlist"}
                    posterHeight={hp("16%")}
                    posterWidth={wp("21%")}
                  />
                )}

                {userWatchedMovies?.length > 0 && (
                  <MoviesSlider
                    movies={userWatchedMovies}
                    title={"Vistas"}
                    posterHeight={hp("16%")}
                    posterWidth={wp("21%")}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </MovieScreen>
  );
}

function UserImageModal({ profileImageVisible, setProfileImageVisible }) {
  return (
    <Modal visible={profileImageVisible} transparent animationType="slide">
      <TouchableOpacity
        className="flex-1 items-center justify-center"
        style={styles.modalContainer}
        onPress={() => setProfileImageVisible(false)}
      >
        {/* Imagen de perfil ampliada (cambiar para que sea la imagen del usuario) */}
        <Image
          source={require("../../../assets/user-profile-img-favicon.jpg")}
          style={styles.expandedImage}
        />
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  expandedImage: {
    width: wp("70%"),
    height: hp("40%"),
    resizeMode: "contain",
  },
});
