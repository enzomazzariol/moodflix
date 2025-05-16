import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useMovie } from "../../../../shared/hooks/useMovie";
import { Title } from "../../components/commoms/Title";
import MoviesSlider from "../../components/home/MoviesSlider";
import MovieDetails from "../../components/moviePage/MovieDetails";
import MovieGenresAndOverview from "../../components/moviePage/MovieGenresAndOverview";
import MovieModal from "../../components/moviePage/MovieModal";
import MovieTabsView from "../../components/moviePage/MovieTabsView";
import MovieScreen from "../../components/screens/MovieScreen";
import { BackArrowIcon, MoreIcon } from "../../components/ui/icons";
import { colors } from "../../utils/colors";

const { width } = Dimensions.get("window");
const HEADER_IMAGE_HEIGHT = Dimensions.get("window").height / 2.7;
const HEADER_MIN_HEIGHT = hp("12%");
const OVERSCROLL_DISTANCE = 140;

export default function Movie() {
  const { id } = useLocalSearchParams();
  const {
    movie: movieDetails,
    credits,
    similarMovies,
    isLoading,
    error,
  } = useMovie(id);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [hp("33%"), hp("38%")],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-OVERSCROLL_DISTANCE, 0],
    outputRange: [1.5, 1],
    extrapolate: "clamp",
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [-OVERSCROLL_DISTANCE, 0],
    outputRange: [-OVERSCROLL_DISTANCE / 3, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const backdroptUrl = movieDetails?.file_path
    ? "https://image.tmdb.org/t/p/original" + movieDetails?.file_path
    : undefined;

  const goBack = () => navigation.goBack();

  const showModal = () => setModalVisible(true);

  const goToTrailer = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error("Error al abrir el trailer:", err)
      );
    }
  };

  if (isLoading) {
    return (
      <MovieScreen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.floralWhite} />
        </View>
      </MovieScreen>
    );
  }

  if (error) {
    return (
      <MovieScreen>
        <View className="flex-1 items-center justify-center">
          <Text
            className="font-outfitBold text-3xl"
            style={{ color: colors.jasper, textAlign: "center" }}
          >
            Error al cargar la película.
          </Text>
        </View>
      </MovieScreen>
    );
  }

  return (
    <MovieScreen>
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <BackArrowIcon size={24} color={colors.floralWhite} />
        </TouchableOpacity>
        <Title
          numberOfLines={1}
          className="text-center font-spaceGroteskBold self-center"
          style={{ fontSize: hp("2.4%") }}
          adjustsFontSizeToFit={true}
        >
          {movieDetails?.title}
        </Title>
        <TouchableOpacity onPress={showModal} style={styles.backButton}>
          <MoreIcon size={24} color={colors.floralWhite} />
        </TouchableOpacity>
      </Animated.View>

      <MovieModal
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
        movie={movieDetails}
      />

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={styles.scrollContainer}
        bounces={true}
      >
        <Animated.View
          style={[
            styles.headerImageContainer,
            {
              transform: [
                { scale: imageScale },
                { translateY: imageTranslateY },
              ],
            },
          ]}
        >
          <Animated.Image
            source={{ uri: backdroptUrl }}
            style={styles.headerImage}
          />
          <LinearGradient
            colors={["transparent", colors.richBlue]}
            style={styles.gradientOverlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        </Animated.View>

        <View className="flex-col" style={{ paddingHorizontal: wp("5%") }}>
          <MovieDetails
            movie={movieDetails}
            director={credits?.crew.find((p) => p.job === "Director")}
            goToTrailer={goToTrailer}
          />
          <MovieGenresAndOverview
            movie={movieDetails}
            streamingProviders={movieDetails?.platforms}
          />
        </View>

        <MovieTabsView movieId={id} credits={credits} />

        <View className="flex-col" style={{ paddingTop: hp("3%") }}>
          <MoviesSlider
            movies={similarMovies?.results?.map(
              ({ id, poster_path, title }) => ({
                id,
                poster_path,
                title,
              })
            )}
            title={"Películas similares"}
            flatlistStyles={{ paddingHorizontal: wp("5%") }}
            titleStyles={{ paddingLeft: wp("5%") }}
          />
        </View>
      </Animated.ScrollView>

      <TouchableOpacity
        style={styles.floatingBackButton}
        onPress={goBack}
        activeOpacity={0.7}
        className="rounded-full"
      >
        <BackArrowIcon size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={showModal}
        style={styles.floatingMoreButton}
        activeOpacity={0.7}
        className="rounded-full"
      >
        <MoreIcon size={24} color={colors.floralWhite} />
      </TouchableOpacity>
    </MovieScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    width: width,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MIN_HEIGHT,
    backgroundColor: colors.richBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    zIndex: 99,
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    borderBottomWidth: hp("0.2%"),
    borderBottomColor: colors.prussianBlue,
  },
  headerImage: {
    width: width,
    height: HEADER_IMAGE_HEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
  },
  headerImageContainer: {
    width: width,
    height: HEADER_IMAGE_HEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
    overflow: "hidden",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: hp("16"),
  },
  backButton: {
    padding: hp("2.3%"),
  },
  floatingBackButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    left: 20,
    zIndex: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  floatingMoreButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    right: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  scrollContainer: {
    paddingTop: HEADER_IMAGE_HEIGHT,
    minHeight: Dimensions.get("window").height,
    paddingBottom: hp("6%"),
  },
});
