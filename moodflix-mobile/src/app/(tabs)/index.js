import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useRecommendedMoviesFromLastLike } from "../../../../shared/hooks/useLastLikedMovie";
import { useMoviesByCategory } from "../../../../shared/hooks/useMoviesByCategory";
import PosterMovie from "../../components/commoms/PosterMovie";
import { Title } from "../../components/commoms/Title";
import EmotionSlider from "../../components/home/EmotionSlider";
import MoviesSlider from "../../components/home/MoviesSlider";
import HomeScreen from "../../components/screens/HomeScreen";
import { useAuth } from "../../context/AuthContext";
import { useMoviesByEmotion } from "../../hooks/useMovieByEmotion";
import { colors } from "../../utils/colors";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const { recommendedMovies, basedOnTitle } = useRecommendedMoviesFromLastLike(
    user?.user_id
  );
  const { movie: selectedEmotionMovie, isLoading: isLoadingEmotion } =
    useMoviesByEmotion(selectedEmotion);

  const handleEmotionMoviePress = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  // Configuración de las secciones de películas
  const { movies: popularMovies } = useMoviesByCategory({
    category: "popular",
    page: 1,
  });
  const { movies: upcomingMovies } = useMoviesByCategory({
    category: "upcoming",
    page: 1,
  });
  const { movies: nowPlayingMovies } = useMoviesByCategory({
    category: "now_playing",
    page: 1,
  });

  const movieSections = [
    {
      id: "popular-week",
      title: "Populares esta semana",
      data: popularMovies,
    },
    ...(recommendedMovies.length > 0
      ? [
          {
            id: "recommended",
            title: `Porque te gustó "${basedOnTitle}"`,
            data: recommendedMovies,
          },
        ]
      : []),
    {
      id: "now-playing",
      title: "En cines ahora",
      data: nowPlayingMovies,
    },
    {
      id: "coming-soon",
      title: "Próximamente",
      data: upcomingMovies,
    },
  ];

  const renderHeader = () => (
    <>
      <EmotionSlider
        emotions={[
          "Sorpresa",
          "Nostalgia",
          "Felicidad",
          "Euforia",
          "Esperanza",
          "Melancolía",
          "Ansiedad",
          "Wonder",
        ]}
        title="¿Cómo te sientes hoy?"
        onEmotionPress={(emotion) => {
          if (!isLoadingEmotion) {
            setSelectedEmotion(emotion);
          }
        }}
        disabled={isLoadingEmotion}
      />

      {selectedEmotion && (
        <TouchableOpacity
          onPress={() =>
            handleEmotionMoviePress(selectedEmotionMovie?.movie_id)
          }
          className="h-fit"
          activeOpacity={0.7}
          style={{
            marginHorizontal: hp("1.5%"),
            padding: hp("1%"),
            backgroundColor: colors.prussianBlue,
            borderRadius: 12,
            height: hp("24%"),
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <View style={{ padding: hp("1%") }}>
            <Title
              className="text-floralWhite font-spaceGroteskBold text-lg"
              style={{ paddingBottom: hp("1%") }}
              maxFontSizeMultiplier={1.3}
            >
              Recomendación para ti basada en {selectedEmotion}
            </Title>

            {isLoadingEmotion ? (
              <ActivityIndicator
                size="large"
                color="#fff"
                style={{ marginTop: 10 }}
              />
            ) : selectedEmotionMovie ? (
              <View className="flex-row" style={{ columnGap: hp("1.4%") }}>
                <PosterMovie
                  posterPath={selectedEmotionMovie?.poster_url}
                  title={selectedEmotionMovie?.title}
                  movieId={selectedEmotionMovie?.movie_id}
                  height={hp("20%")}
                  width={hp("13%")}
                />
                <View className="flex-col">
                  <Title
                    className="text-jasper text-lg font-spaceGroteskBold"
                    maxFontSizeMultiplier={1.3}
                    style={{ width: widthPercentageToDP("60%") }}
                  >
                    {selectedEmotionMovie?.title}
                  </Title>
                  <Text
                    className="text-slate-400 text-base font-spaceGroteskRegular"
                    maxFontSizeMultiplier={1.3}
                  >
                    {selectedEmotionMovie?.release_date.slice(0, 4)}
                  </Text>
                  <Text
                    className="text-floralWhite text-base font-spaceGroteskRegular"
                    style={{ width: widthPercentageToDP("60%") }}
                    maxFontSizeMultiplier={1.3}
                  >
                    {selectedEmotionMovie?.description.slice(0, 200)}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      )}
    </>
  );

  // Renderizar cada sección de películas
  const RenderMovieSection = ({ item }) => (
    <MoviesSlider
      movies={item.data}
      title={item.title}
      flatlistStyles={{ paddingHorizontal: hp("1.5%") }}
      titleStyles={{ paddingLeft: hp("1.5%") }}
    />
  );

  // Separador entre secciones de películas
  const RenderSectionSeparator = () => <View style={{ height: hp("0%") }} />;

  return (
    <HomeScreen>
      <FlatList
        data={movieSections}
        keyExtractor={(item) => item.id}
        renderItem={RenderMovieSection}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: hp("4%"),
        }}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={RenderSectionSeparator}
      />
    </HomeScreen>
  );
}
