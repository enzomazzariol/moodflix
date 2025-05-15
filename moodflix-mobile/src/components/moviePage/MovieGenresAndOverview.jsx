// components/moviePage/MovieGenresAndOverview.tsx
import { Pressable, Text, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ReviewSummaryCard from "./ReviewSummaryCard";
import WhereToWatch from "./WhereToWatch";

export default function MovieGenresAndOverview({
  movie,
  streamingProviders,
}) {
  return (
    <View className="flex-col" style={{ rowGap: hp("2%") }}>
      {/* Géneros */}
      <View
        className="flex-row flex-wrap"
        style={{
          columnGap: wp("3%"),
          paddingTop: hp("2%"),
          rowGap: wp("4%"),
        }}
      >
        {movie?.genre?.map((genre) => (
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

      {/* Tagline */}
      {movie?.tagline ? (
        <Text className="text-floralWhite text-base font-spaceGroteskRegular">
          {movie.tagline.toUpperCase()}
        </Text>
      ) : null}

      {/* Descripción */}
      <Text className="text-floralWhite text-base font-spaceGroteskRegular shadow-lg">
        {movie?.description}
      </Text>

      {/* Dónde ver */}
      <WhereToWatch streamingProviders={streamingProviders.results} />

      {/* Resumen de reviews */}
      <ReviewSummaryCard
        averageRating={"4.5"}
        totalReviews={movie?.vote_count}
        movie={movie}
      />
    </View>
  );
}
