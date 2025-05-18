import { Rating } from "@kolking/react-native-rating";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { MoreIcon } from "../ui/icons";

export default function ReviewCard({ review }) {
  const router = useRouter();
  const goToUserProfile = (id, username) => {
    router.push({
      pathname: "/userProfile/[id]",
      params: { id, username },
    });
  };
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: colors.prussianBlue,
        paddingVertical: hp("1.7%"),
      }}
    >
      <View
        className="flex-row items-center justify-between"
        style={{ paddingHorizontal: hp("2%"), paddingVertical: hp("1%") }}
      >
        <View className="flex-row items-center">
          <Pressable
            onPress={() =>
              goToUserProfile(review?.user?.user_id, review?.user?.username)
            }
          >
            <Image
              source={
                review?.user?.avatar
                  ? { uri: review.user.avatar }
                  : require("../../../assets/william.png")
              }
              className="w-12 h-12 rounded-full mr-3"
            />
          </Pressable>

          <View>
            <Text className="text-white font-semibold text-lg">
              {review?.user?.username}
            </Text>
            <Text className="text-slate-400 text-xs">
              {review?.createdAt?.slice(0, 10)}
            </Text>
          </View>
        </View>
        <Pressable className="flex-row items-center justify-end">
          <MoreIcon size={24} color={colors.floralWhite} />
        </Pressable>
      </View>

      <View
        className="flex-row justify-between"
        style={{ paddingHorizontal: hp("2%"), paddingBottom: hp("2%") }}
      >
        <Text
          className="text-slate-300 text-base leading-relaxed"
          style={{ width: widthPercentageToDP("65%") }}
        >
          {review?.review}
        </Text>

        <View
          style={{ width: 70, alignItems: "flex-end", alignSelf: "flex-start" }}
        >
          <Rating
            size={15}
            rating={review.rating}
            maxRating={5}
            disabled={true}
            baseColor={colors.floralWhite}
            fillColor={colors.jasper}
          />
        </View>
      </View>
    </View>
  );
}
