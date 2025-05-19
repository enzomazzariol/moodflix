import { Rating } from "@kolking/react-native-rating";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { formatRelativeDate } from "../../utils/dateUtils";
import PosterMovie from "../commoms/PosterMovie";

export default function ActivityCard({
  activity,
  onPressUser,
  onPressMovie,
  customText,
}) {
  const renderContent = () => {
    // Si hay texto personalizado, lo mostramos directamente
    if (customText) {
      return (
        <Text
          className="text-floralWhite text-base font-outfitRegular text-wrap"
          style={{ width: wp("70%") }}
        >
          {customText}
        </Text>
      );
    }

    switch (activity?.activityType) {
      case "like":
        return (
          <Text
            className="text-floralWhite text-base font-outfitRegular text-wrap"
            style={{ width: wp("70%") }}
          >
            <Text className="font-outfitBold">{activity?.user?.username} </Text>
            le ha gustado{" "}
            <Text className="font-outfitBold">{activity?.movie?.title}</Text>
          </Text>
        );

      case "watchlist":
        return (
          <Text
            className="text-floralWhite text-base font-outfitRegular text-wrap"
            style={{ width: wp("70%") }}
          >
            <Text className="font-outfitBold">{activity?.user?.username} </Text>
            ha guardado{" "}
            <Text className="font-outfitBold">{activity?.movie?.title} </Text>
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
              <Text className="font-outfitBold">
                {activity?.user?.username}{" "}
              </Text>
              reseñó{" "}
              <Text className="font-outfitBold">{activity?.movie?.title}</Text>
            </Text>

            {activity?.review?.rating > 0 && (
              <Rating
                size={13}
                rating={activity?.review?.rating}
                maxRating={5}
                disabled={true}
                baseColor={colors.floralWhite}
                fillColor={colors.jasper}
              />
            )}

            {activity?.review?.message && (
              <View className="flex-row" style={{ columnGap: hp("0%") }}>
                <Text
                  className="text-floralWhite text-base font-outfitRegular text-wrap self-start"
                  style={{ width: wp("50%") }}
                >
                  {activity?.review?.message}
                </Text>
              </View>
            )}

            <Text className="font-outfitRegular text-base text-slate-400 self-start">
              {formatRelativeDate(activity?.activityDate)}
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  // Para actividades simples (like, watchlist)
  if (
    activity?.activityType === "like" ||
    activity?.activityType === "watchlist"
  ) {
    return (
      <TouchableOpacity
        className="bg-prussianBlue rounded-md h-fit flex-row items-center justify-between"
        style={{ width: wp("95%"), padding: hp("1%") }}
        activeOpacity={0.8}
        onPress={onPressMovie}
      >
        <Pressable onPress={onPressUser}>
          <Image
            source={
              activity?.user?.avatarUrl
                ? { uri: activity.user.avatarUrl }
                : require("../../../assets/user-profile-img-favicon.jpg")
            }
            className="rounded-full"
            resizeMode="cover"
            style={{ width: hp("5%"), height: hp("5%") }}
          />
        </Pressable>

        <View
          className="flex-col"
          style={{ rowGap: hp("0.6%"), width: wp("75%") }}
        >
          {renderContent()}

          <Text className="font-outfitRegular text-base text-slate-400">
            {formatRelativeDate(activity?.activityDate)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  // Para actividades más complejas como reviews
  return (
    <TouchableOpacity
      className="bg-prussianBlue rounded-md h-fit flex-row items-center justify-between"
      style={{ width: wp("95%"), padding: hp("1%") }}
      activeOpacity={0.8}
      onPress={onPressMovie}
    >
      <Pressable onPress={onPressUser} className="self-start">
        <Image
          source={
            activity?.user?.avatarUrl
              ? { uri: activity.user.avatarUrl }
              : require("../../../assets/user-profile-img-favicon.jpg")
          }
          className="rounded-full"
          resizeMode="cover"
          style={{ width: hp("5%"), height: hp("5%") }}
        />
      </Pressable>

      {renderContent()}

      {activity?.activityType === "review" && (
        <PosterMovie
          posterPath={activity?.movie?.posterPath}
          title={activity?.movie?.title}
          idMovie={activity?.movie?.movieId}
          posterHeight={hp("16%")}
          posterWidth={wp("21%")}
        />
      )}
    </TouchableOpacity>
  );
}
