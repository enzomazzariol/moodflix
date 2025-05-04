import { Rating } from "@kolking/react-native-rating";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import PosterMovie from "../commoms/PosterMovie";

export default function ActivityCard({ activity, onPressUser, onPressMovie }) {
  const { type, user, movie, message, rating, createdAt } = activity;

  const renderContent = () => {
    // Contenido específico según el tipo de actividad
    switch (type) {
      case "like":
        return (
          <Text
            className="text-floralWhite text-base font-outfitRegular text-wrap"
            style={{ width: wp("70%") }}
          >
            <Text className="font-outfitBold">{user.name} </Text>
            le ha gustado <Text className="font-outfitBold">{movie.title}</Text>
          </Text>
        );

      case "watchlist":
        return (
          <Text
            className="text-floralWhite text-base font-outfitRegular text-wrap"
            style={{ width: wp("70%") }}
          >
            <Text className="font-outfitBold">{user.name} </Text>
            ha guardado <Text className="font-outfitBold">{movie.title} </Text>
            en su lista de favoritos
          </Text>
        );

      case "review":
        return (
          <View className="flex-col" style={{ rowGap: hp("0.8%") }}>
            <Text
              className="text-floralWhite text-base font-outfitRegular text-wrap"
              style={{ width: wp("50%") }}
            >
              <Text className="font-outfitBold">{user.name} </Text>
              {type === "watch" ? "vió" : "reseñó"}{" "}
              <Text className="font-outfitBold">{movie.title}</Text>
            </Text>

            {rating > 0 && (
              <Rating
                size={13}
                rating={rating}
                maxRating={5}
                disabled={true}
                baseColor={colors.floralWhite}
                fillColor={colors.jasper}
              />
            )}

            {message && (
              <View className="flex-row" style={{ columnGap: hp("0%") }}>
                <Text
                  className="text-floralWhite text-base font-outfitRegular text-wrap self-start"
                  style={{ width: wp("50%") }}
                >
                  {message}
                </Text>
              </View>
            )}

            <Text className="font-outfitRegular text-base text-floralWhite self-start">
              {createdAt}
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  // Para actividades simples (like, favorite)
  if (type === "like" || type === "watchlist") {
    return (
      <TouchableOpacity
        className="bg-prussianBlue rounded-md h-fit flex-row items-center justify-between"
        style={{ width: wp("95%"), padding: hp("1%") }}
        activeOpacity={0.8}
        onPress={onPressMovie}
      >
        <Pressable onPress={onPressUser}>
          <Image
            source={{ uri: user.avatar }}
            defaultSource={require("../../../assets/splash-expo.png")}
            className="rounded-full"
            resizeMode="cover"
            style={{ width: hp("5%"), height: hp("5%") }}
          />
        </Pressable>

        {renderContent()}

        <Text
          className="font-outfitRegular text-base text-floralWhite self-start"
          style={{ marginTop: hp("0.6%") }}
        >
          {createdAt}
        </Text>
      </TouchableOpacity>
    );
  }

  // Para actividades que requieren más espacio (review)
  return (
    <TouchableOpacity
      className="bg-prussianBlue rounded-md h-fit flex-row items-center justify-between"
      style={{ width: wp("95%"), padding: hp("1%") }}
      activeOpacity={0.8}
      onPress={onPressMovie}
    >
      <Pressable onPress={onPressUser} className="self-start">
        <Image
          source={{ uri: user.avatar }}
          defaultSource={require("../../../assets/splash-expo.png")}
          className="rounded-full"
          resizeMode="cover"
          style={{ width: hp("5%"), height: hp("5%") }}
        />
      </Pressable>

      {renderContent()}

      {type === "review" && (
        <PosterMovie
          posterPath={movie.posterPath}
          title={movie.title}
          idMovie={movie.id}
          posterHeight={hp("16%")}
          posterWidth={wp("21%")}
        />
      )}
    </TouchableOpacity>
  );
}
