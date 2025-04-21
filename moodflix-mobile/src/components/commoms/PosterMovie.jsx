import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { colors } from "../../utils/colors";

export default function PosterMovie({ posterPath, title, idMovie, posterWidth, posterHeight }) {
  const path = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : null;
  const router = useRouter();
  const [hasError, setHasError] = useState(false);

  const goToMoviePage = () => {
    router.push(`/movie/${idMovie}`);
  };

  const posterHeightDefault = hp("16%");
  const posterWidthDefault = wp("22%");

  return (
    <Pressable onPress={goToMoviePage} className="items-center">
      <View
        className="justify-center items-center overflow-hidden bg-raisinBlack"
        style={{
          height: posterHeight ?? posterHeightDefault,
          width: posterWidth ?? posterWidthDefault,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: colors.prussianBlue,
        }}
      >
        {path && !hasError ? (
          <Image
            source={{ uri: path }}
            style={{ height: "100%", width: "100%" }}
            resizeMode="cover"
            onError={() => setHasError(true)}
          />
        ) : (
          <Text
            className="font-spaceGroteskRegular text-floralWhite text-center"
            style={{ fontSize: hp("1.5%") }}
          >
            {title}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
