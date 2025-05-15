import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Linking,
  Platform,
  Pressable,
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
import MovieModal from "../../components/moviePage/MovieModal";
import MovieTabsView from "../../components/moviePage/MovieTabsView";
import PosterMovieDownload from "../../components/moviePage/PosterMovieDownload";
import ReviewSummaryCard from "../../components/moviePage/ReviewSummaryCard";
import WhereToWatch from "../../components/moviePage/WhereToWatch";
import MovieScreen from "../../components/screens/MovieScreen";
import {
  BackArrowIcon,
  MoreIcon,
  TrailerIcon,
} from "../../components/ui/icons";
import castMovie from "../../lib/mocks/castMovie.json";
import mockMovies from "../../lib/mocks/movies.json";
import streamingProviders from "../../lib/mocks/streamingProviders.json";
import { colors } from "../../utils/colors";

const { width } = Dimensions.get("window");
const HEADER_IMAGE_HEIGHT = Dimensions.get("window").height / 2.7; // Altura de la imagen del header
const HEADER_MIN_HEIGHT = hp("12%"); // Altura mínima del header (10% de la pantalla)
const OVERSCROLL_DISTANCE = 140; // Distancia de overscroll para el efecto de rebote

export default function Movie() {
  const { id, title } = useLocalSearchParams();
  const { movie: movieDetails, isLoading, error } = useMovie(id);
  console.log("movie", movieDetails);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  //const [isInWatchlist, setIsInWatchlist] = useState(false);
  //const [isInFavorites, setIsInFavorites] = useState(false);

  const director = castMovie.crew.find((person) => person.job === "Director");

  const scrollY = new Animated.Value(0);

  // Interpolación para la opacidad del header (para que desaparezca al hacer scroll)
  const headerOpacity = scrollY.interpolate({
    inputRange: [hp("33%"), hp("38%")],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // Interpolación para el escalado de la imagen (para que se vea más grande al hacer pull)
  const imageScale = scrollY.interpolate({
    inputRange: [-OVERSCROLL_DISTANCE, 0],
    outputRange: [1.5, 1],
    extrapolate: "clamp",
  });

  // Interpolación para la posición Y de la imagen (para que cubra todo al hacer pull)
  const imageTranslateY = scrollY.interpolate({
    inputRange: [-OVERSCROLL_DISTANCE, 0],
    outputRange: [-OVERSCROLL_DISTANCE / 3, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const showAlert = () => {
    Alert.alert("Menu abierto para compartir peli");
  };

  const showModal = () => {
    setModalVisible(true);
  };

  // Puedes mostrar un loader mientras se carga
  if (isLoading) {
    return (
      <MovieScreen>
        <View className="flex-1 items-center justify-center">
          <Text style={{ color: "white", textAlign: "center", marginTop: 50 }}>
            Cargando película...
          </Text>
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
            style={{ color: "red", textAlign: "center" }}
          >
            Error al cargar la película.
          </Text>
        </View>
      </MovieScreen>
    );
  }

  const backdroptUrl = movieDetails?.file_path
    ? "https://image.tmdb.org/t/p/original" + movieDetails?.file_path
    : undefined;

  const goToTrailer = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error("Error al abrir el trailer:", err)
      );
    }
  };

  return (
    <MovieScreen>
      {/* Header normal que aparece al hacer scroll */}
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

      {/* Modal que aparece al hacer clic en el botón de tres puntos */}
      <MovieModal
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
        movie={movieDetails}
      />

      {/* El contenedor con la imagen dentro del ScrollView */}
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={styles.scrollContainer}
        bounces={true}
      >
        {/* Imagen dentro del scroll y animada */}
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
          {/* Contenido de la pantalla */}
          <View className="flex-1 flex-row" style={{ paddingBottom: hp("0%") }}>
            {/* Contenedor de la imagen del poster en la izquierda */}
            <View className="self-start" style={{}}>
              <PosterMovieDownload
                posterHeight={hp("22%")}
                posterWidth={wp("30%")}
                posterPath={movieDetails?.poster_url}
                title={movieDetails?.title}
                idMovie={movieDetails?.movie_id}
              />
            </View>

            {/* Contenedor de la información de la película a la derecha */}
            <View
              className="flex-col"
              style={{
                marginLeft: wp("5%"),
                rowGap: wp("2%"),
                width: wp("60%"),
              }}
            >
              <Title className="font-spaceGroteskBold text-slate-100">
                {movieDetails?.title}
              </Title>

              <View>
                <Text className="text-floralWhite text-lg font-spaceGroteskRegular">
                  Dirigido por:
                </Text>
                <Text className="text-slate-400 font-outfitBold text-lg">
                  {director?.name ?? "Desconocido"}
                </Text>
              </View>

              <View
                className="flex-row items-center"
                style={{ columnGap: wp("3%") }}
              >
                <Text className="text-slate-400 text-base font-spaceGroteskRegular">
                  {movieDetails?.release_date.slice(0, 4)}
                </Text>

                <Text className="text-floralWhite text-base font-spaceGroteskRegular">
                  {movieDetails?.duration} min
                </Text>
              </View>
              <Text className="text-floralWhite text-base font-spaceGroteskBold">
                {movieDetails?.rating?.toFixed(1)}$
              </Text>
              <TouchableOpacity
                className="bg-prussianBlue flex-row items-center justify-between px-4"
                style={{ height: hp("3%"), width: wp("25%"), borderRadius: 9 }}
                onPress={() => goToTrailer(movieDetails?.trailer_url)}
              >
                <TrailerIcon size={16} color={colors.floralWhite} />
                <Text className="text-floralWhite text-lg font-outfitRegular ms-1">
                  TRAILER
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Contenedor de los géneros y la sinopsis */}
          <View className="flex-col" style={{ rowGap: hp("2%") }}>
            <View
              className="flex-row "
              style={{ columnGap: wp("3%"), paddingTop: hp("2%") }}
            >
              {movieDetails?.genre?.map((genre) => (
                <Pressable
                  key={genre.id ?? genre.name}
                  className="bg-prussianBlue rounded-full px-4 py-2"
                >
                  <Text className="text-floralWhite text-lg font-outfitRegular">
                    {genre.name}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Text className="text-floralWhite text-base font-spaceGroteskRegular">
              {movieDetails?.tagline.toUpperCase()}
            </Text>

            <Text className="text-floralWhite text-base font-spaceGroteskRegular shadow-lg">
              {movieDetails?.description}
            </Text>

            <WhereToWatch streamingProviders={streamingProviders.results} />

            <ReviewSummaryCard
              averageRating={"4.5"}
              totalReviews={movieDetails?.vote_count}
              movie={movieDetails}
            />
          </View>
        </View>
        <MovieTabsView />

        <View className="flex-col">
          <MoviesSlider
            movies={mockMovies}
            title={"Películas similares"}
            flatlistStyles={{ paddingHorizontal: wp("5%") }}
            titleStyles={{ paddingLeft: wp("5%") }}
          />
        </View>
      </Animated.ScrollView>

      {/* Botón de retroceso flotante sobre la imagen */}
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
    paddingBottom: hp("10%"),
  },
});
