import { Skeleton } from "@rneui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useMoodflix } from "../../../../shared/hooks/useMoodflix";
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
  console.log("parsedRandomizerData", parsedRandomizerData);
  const initialMovie = JSON.parse(movie);
  const [currentIndex, setCurrentIndex] = useState(parseInt(index, 10));
  const [currentMovie, setCurrentMovie] = useState(initialMovie);
  const [isLoading, setIsLoading] = useState(true);
  const { getRandomMovie, isLoading: loadingRandom } = useMoodflix();

  const pathPoster = `https://image.tmdb.org/t/p/original`;

  const handleBackNavigation = () => {
    router.back();
  };

  const goToMoviePage = (id) => {
    router.push(`/movie/${id}`);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const newIndex = currentIndex + 1;
    const newMovie = await getRandomMovie({
      ...parsedRandomizerData,
      index: newIndex,
    });
    if (newMovie) {
      setCurrentMovie(newMovie);
      setCurrentIndex(newIndex);
    }
    setIsLoading(false);
  };

  return (
    <RandomizerMovieScreen>
      <View
        className="flex-1 items-center gap-y-10"
        style={{ width: wp("80%") }}
      >
        <Title className="text-center text-3xl font-outfitBold text-floralWhite">
          Click en el poster para ver más detalles
        </Title>

        <Text className="text-2xl font-outfitBold text-jasper">
          {currentMovie.title}
        </Text>

        <Pressable onPress={() => goToMoviePage(currentMovie.movie_id)}>
          <View style={{ width: wp("60%"), height: hp("40%") }}>
            {isLoading && (
              <Skeleton
                animation="wave"
                width="100%"
                height="100%"
                style={{ borderRadius: 8 }}
              />
            )}
            <Image
              source={{ uri: `${pathPoster}${currentMovie.poster_url}` }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 8,
                position: "absolute",
              }}
              onLoadEnd={() => setIsLoading(false)}
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
          >
            Randomizar
          </SubmitBtn>
        </View>
      </View>
    </RandomizerMovieScreen>
  );
}
