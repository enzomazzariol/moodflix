import { Skeleton } from "@rneui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useTMDB } from "../../../../shared/hooks/useTMDB";
import SubmitBtn from "../../components/commoms/SubmitBtn";
import { Title } from "../../components/commoms/Title";
import RandomizerMovieScreen from "../../components/screens/RandomizerMovieScreen";

export default function RandomizerMovie() {
  const router = useRouter();
  const {
    movie = "{}",
    randomizerData = "{}",
    index = "0",
  } = useLocalSearchParams();
  const parsedRandomizerData = JSON.parse(randomizerData);
  const initialMovie = JSON.parse(movie);
  console.log(parsedRandomizerData);

  const [currentMovie, setCurrentMovie] = useState(initialMovie);
  const [isFetching, setIsFetching] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const { getRandomMovieBaseOn } = useTMDB();

  const pathPoster = `https://image.tmdb.org/t/p/original`;

  const handleBackNavigation = () => {
    router.back();
  };

  const goToMoviePage = (id) => {
    router.push(`/movie/${id}`);
  };

  const handleSubmit = async () => {
    setIsFetching(true);
    setIsImageLoading(true);
    const newMovie = await getRandomMovieBaseOn({
      ...parsedRandomizerData,
    });
    if (newMovie) {
      setCurrentMovie(newMovie);
    } else {
      Alert.alert("Error", "No se encontró ninguna película.");
    }
    setIsFetching(false);
  };

  return (
    <RandomizerMovieScreen>
      <View
        className="flex-1 items-center gap-y-10"
        style={{ width: wp("80%") }}
      >
        <Title
          className="text-center text-3xl font-outfitBold text-floralWhite"
          accessibilityRole="header"
        >
          Click en el poster para ver más detalles
        </Title>

        <Text className="text-2xl font-outfitBold text-jasper text-center">
          {currentMovie.title}
        </Text>

        <Pressable onPress={() => goToMoviePage(currentMovie.id)}>
          <View style={{ width: wp("60%"), height: hp("40%") }}>
            {(isFetching || isImageLoading) && (
              <Skeleton
                animation="wave"
                width="100%"
                height="100%"
                style={{ borderRadius: 8 }}
              />
            )}
            <Image
              source={{ uri: `${pathPoster}${currentMovie.poster_path}` }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 8,
                position: "absolute",
              }}
              onLoadEnd={() => setIsImageLoading(false)}
            />
          </View>
        </Pressable>

        <View className="flex-row gap-x-6">
          <SubmitBtn
            width={wp("7%")}
            bgColor="bg-raisinBlack"
            handleSubmit={handleBackNavigation}
          >
            Filtros
          </SubmitBtn>
          <SubmitBtn
            width={wp("7%")}
            bgColor="bg-floralWhite"
            textColor="text-raisinBlack"
            handleSubmit={handleSubmit}
            disabled={isFetching}
          >
            {isFetching ? "Cargando..." : "Randomizar"}
          </SubmitBtn>
        </View>
      </View>
    </RandomizerMovieScreen>
  );
}
