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
  const isSimpleActivity =
    activity?.activityType === "like" || activity?.activityType === "watchlist";

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

      <View
        className="flex-col"
        style={{
          rowGap: hp("0.6%"),
          width: isSimpleActivity ? wp("75%") : wp("50%"),
        }}
      >
        {customText ? (
          <>
            <Text className="text-floralWhite text-base font-outfitRegular text-wrap">
              {customText.text}{" "}
              <Text className="font-outfitBold">{customText.title}</Text>
              {customText.suffix ? ` ${customText.suffix}` : ""}
            </Text>

            {customText.rating > 0 && (
              <Rating
                size={13}
                rating={customText.rating}
                maxRating={5}
                disabled={true}
                baseColor={colors.floralWhite}
                fillColor={colors.jasper}
              />
            )}

            {customText.message && (
              <Text className="text-floralWhite text-base font-outfitRegular text-wrap">
                {customText.message}
              </Text>
            )}
          </>
        ) : activity?.activityType === "like" ? (
          <Text className="text-floralWhite text-base font-outfitRegular text-wrap">
            <Text className="font-outfitBold">{activity?.user?.username} </Text>
            ha guardado{" "}
            <Text className="font-outfitBold">{activity?.movie?.title}</Text>
            {" "}en su lista de favoritos
          </Text>
        ) : activity?.activityType === "watchlist" ? (
          <Text className="text-floralWhite text-base font-outfitRegular text-wrap">
            <Text className="font-outfitBold">{activity?.user?.username} </Text>
            ha guardado{" "}
            <Text className="font-outfitBold">{activity?.movie?.title} </Text>
            en su watchlist
          </Text>
        ) : activity?.activityType === "review" ? (
          <>
            <Text className="text-floralWhite text-base font-outfitRegular text-wrap">
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
              <Text className="text-floralWhite text-base font-outfitRegular text-wrap">
                {activity?.review?.message}
              </Text>
            )}
          </>
        ) : null}

        <Text className="font-outfitRegular text-base text-slate-400 self-start">
          {formatRelativeDate(activity?.activityDate)}
        </Text>
      </View>

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
