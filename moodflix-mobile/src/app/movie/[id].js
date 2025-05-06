import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
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
import { Title } from "../../components/commoms/Title";
import PosterMovieDownload from "../../components/moviePage/PosterMovieDownload";
import MovieScreen from "../../components/screens/MovieScreen";
import { BackArrowIcon, MoreIcon } from "../../components/ui/icons";
import movieDetails from "../../lib/mocks/movieDetails.json";
import { colors } from "../../utils/colors";

const { width } = Dimensions.get("window");
const HEADER_IMAGE_HEIGHT = Dimensions.get("window").height / 2.5; // Altura de la imagen del header
const HEADER_MIN_HEIGHT = hp("12%"); // Altura mínima del header (10% de la pantalla)
const OVERSCROLL_DISTANCE = 130; // Distancia de overscroll para el efecto de rebote

export default function Movie() {
  const { id, title } = useLocalSearchParams();
  const navigation = useNavigation();
  const [movie, setMovie] = useState({
    id: id || 0,
    title: title || "Película",
    image:
      "https://image.tmdb.org/t/p/original/5C3RriLKkIAQtQMx85JLtu4rVI2.jpg",
  });

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
          {movie.title}
        </Title>
        <TouchableOpacity
          onPress={() => Alert.alert("Menu abierto para compartir peli")}
          style={styles.backButton}
        >
          <MoreIcon size={24} color={colors.floralWhite} />
        </TouchableOpacity>
      </Animated.View>

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
            source={{ uri: movie.image }}
            style={styles.headerImage}
          />
          <LinearGradient
            colors={["transparent", colors.richBlue]}
            style={styles.gradientOverlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        </Animated.View>

        {/* Contenido de la pantalla */}
        <View className="flex-1 flex-col">
          <Title className="font-spaceGroteskRegular">{movie.title}</Title>
          <Text className="text-floralWhite text-base font-spaceGroteskRegular">
            {movieDetails.overview}
          </Text>
          <PosterMovieDownload
            posterHeight={hp("22%")}
            posterWidth={wp("30%")}
            posterPath={movieDetails.poster_path}
            title={movieDetails.title}
            idMovie={movieDetails.id}
          />
          <Text className="text-floralWhite text-base font-spaceGroteskRegular">
            {movieDetails.release_date}
          </Text>
          <Text className="text-floralWhite text-base font-spaceGroteskRegular">
            {movieDetails.tagline}
          </Text>
          <Text className="text-floralWhite text-base font-spaceGroteskRegular">
            {movieDetails.runtime} min
          </Text>
          <Text className="text-floralWhite text-base font-spaceGroteskRegular">
            {movieDetails.revenue} USD
          </Text>
          <Text className="text-floralWhite text-base font-spaceGroteskRegular">
            {movieDetails.genres.map((genre) => genre.name).join(", ")}
          </Text>
        </View>
      </Animated.ScrollView>

      {/* Botón de retroceso flotante sobre la imagen */}
      <TouchableOpacity style={styles.floatingBackButton} onPress={goBack}>
        <BackArrowIcon size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => Alert.alert("Menu abierto para compartir peli")}
        style={styles.floatingMoreButton}
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
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  scrollContainer: {
    paddingTop: HEADER_IMAGE_HEIGHT,
    minHeight: Dimensions.get("window").height,
  },
});
