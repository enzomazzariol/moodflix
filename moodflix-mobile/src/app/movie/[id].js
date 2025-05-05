import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import {
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
import PosterMovie from "../../components/commoms/PosterMovie";
import { Title } from "../../components/commoms/Title";
import MovieScreen from "../../components/screens/MovieScreen";
import { BackArrowIcon } from "../../components/ui/icons";
import movieDetails from "../../lib/mocks/movieDetails.json";
import { colors } from "../../utils/colors";

const { width } = Dimensions.get("window");
const HEADER_IMAGE_HEIGHT = Dimensions.get("window").height / 2.8;
const HEADER_MIN_HEIGHT = hp("12%"); // Altura mínima del header (10% de la pantalla)

export default function Movie() {
  const { id, title } = useLocalSearchParams();
  const navigation = useNavigation();
  const [movie, setMovie] = useState({
    id: id || 0,
    title: title || "Película",
    // Utiliza una imagen placeholder, idealmente esto vendría de tu API
    image:
      "https://image.tmdb.org/t/p/original/5C3RriLKkIAQtQMx85JLtu4rVI2.jpg",
  });

  // Valor del scroll para las animaciones
  const scrollY = new Animated.Value(0);

  // Calcula la opacidad del header basado en el scroll
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_IMAGE_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // Calcula la escala de la imagen basado en el scroll (efecto parallax)
  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.3, 1],
    extrapolate: "clamp",
  });

  useEffect(() => {
    // Oculta el header por defecto para mostrar nuestro header personalizado
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
        >
          {movie.title}
        </Title>
      </Animated.View>

      {/* Imagen de cabecera */}
      <View style={styles.headerImageContainer}>
        <Animated.Image
          source={{ uri: movie.image }}
          style={[styles.headerImage, { transform: [{ scale: imageScale }] }]}
        />
        {/* Gradiente para el efecto fade out en la parte inferior */}
        <LinearGradient
          colors={["transparent", colors.richBlue]}
          style={styles.gradientOverlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </View>

      {/* Botón de retroceso flotante sobre la imagen */}
      <TouchableOpacity style={styles.floatingBackButton} onPress={goBack}>
        <BackArrowIcon size={24} color="#fff" />
      </TouchableOpacity>

      {/* Contenido de la pantalla */}
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={styles.scrollContainer}
      >
        <View className="flex-1 flex-col gap-y-36">
          <Title style={styles.title}>{movie.title}</Title>
          <Text className="text-floralWhite text-base font-spaceGroteskRegular">
            {movieDetails.overview}
          </Text>
          <PosterMovie
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
    height: 100, // Altura del efecto de desvanecimiento
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
  scrollContainer: {
    paddingTop: HEADER_IMAGE_HEIGHT,
    minHeight: Dimensions.get("window").height,
  },
});
