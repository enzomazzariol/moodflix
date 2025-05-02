import { Skeleton } from "@rneui/themed";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import SubmitBtn from "../../components/commoms/SubmitBtn";
import { Title } from "../../components/commoms/Title";
import RandomizerMovieScreen from "../../components/screens/RandomizerMovieScreen";
import movieDataMock from "../../lib/mocks/movieDetails.json";

export default function RandomizerMovie() {
  const router = useRouter();
  const { id, genre, year, streaming, rating, duration } =
    useLocalSearchParams();
  const pathPoster = `https://image.tmdb.org/t/p/original${movieDataMock.poster_path}`;

  const [isLoading, setIsLoading] = useState(true);

  const handleBackNavigation = () => {
    router.back();
  };

  const goToMoviePage = () => {
    router.push(`/movie/${id}`);
  };

  console.log("Datos recibidos:", {
    genre,
    year,
    streaming,
    rating,
    duration,
  });

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
          {movieDataMock.original_title}
        </Text>

        <Pressable onPress={goToMoviePage}>
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
              source={{ uri: pathPoster }}
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
            handleSubmit={handleBackNavigation}
          >
            Randomizar
          </SubmitBtn>
        </View>
      </View>
    </RandomizerMovieScreen>
  );
}
