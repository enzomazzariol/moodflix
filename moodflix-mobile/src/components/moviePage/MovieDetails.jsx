// components/moviePage/MovieDetails.tsx
import { Star } from "lucide-react-native";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { Title } from "../commoms/Title";
import { TrailerIcon } from "../ui/icons";
import PosterMovieDownload from "./PosterMovieDownload";

export default function MovieDetails({ movie, director }) {
  const goToTrailer = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error("Error al abrir el trailer:", err)
      );
    }
  };

  return (
    <View className="flex-1 flex-row" style={{ paddingBottom: hp("0%") }}>
      {/* Poster */}
      <View className="self-start">
        <PosterMovieDownload
          posterHeight={hp("22%")}
          posterWidth={wp("30%")}
          posterPath={movie?.poster_url}
          title={movie?.title}
          idMovie={movie?.movie_id}
        />
      </View>

      {/* Info de la película */}
      <View
        className="flex-col"
        style={{
          marginLeft: wp("5%"),
          rowGap: wp("2%"),
          width: wp("60%"),
        }}
      >
        <Title className="font-spaceGroteskBold text-slate-100">
          {movie?.title}
        </Title>

        <View>
          <Text className="text-floralWhite text-lg font-spaceGroteskRegular">
            Dirigido por:
          </Text>
          <Text className="text-slate-400 font-outfitBold text-lg">
            {director?.name ?? "Desconocido"}
          </Text>
        </View>

        <View className="flex-row items-center" style={{ columnGap: wp("3%") }}>
          <Text className="text-slate-400 text-base font-spaceGroteskRegular">
            {movie?.release_date?.slice(0, 4)}
          </Text>

          <Text className="text-floralWhite text-base font-spaceGroteskRegular">
            {movie?.duration} min
          </Text>
        </View>

        <View className="flex-row items-center" style={{ columnGap: wp("1.2%") }}>
          <Text className="text-floralWhite text-base font-spaceGroteskBold">
            {movie?.rating?.toFixed(1)}
          </Text>
          <Star size={16} color={colors.pigmentGreen} fill={colors.pigmentGreen} />
        </View>

        <TouchableOpacity
          className="bg-prussianBlue flex-row items-center justify-between px-4"
          style={{ height: hp("3%"), width: wp("25%"), borderRadius: 9 }}
          onPress={() => goToTrailer(movie?.trailer_url)}
        >
          <TrailerIcon size={16} color={colors.floralWhite} />
          <Text className="text-floralWhite text-lg font-outfitRegular ms-1">
            TRAILER
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
