import { Rating } from "@kolking/react-native-rating";
import { Image, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";

export default function ReviewCard({ review }) {
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
          <Image
            source={{ uri: review.avatar }}
            className="w-10 h-10 rounded-full mr-3"
          />
          <View>
            <Text className="text-white font-semibold text-lg">
              {review.username}
            </Text>
            <Text className="text-slate-400 text-xs">{review.date}</Text>
          </View>
        </View>

        <Rating
          size={15}
          rating={review.rating}
          maxRating={5}
          disabled={true}
          baseColor={colors.floralWhite}
          fillColor={colors.jasper}
        />
      </View>

      <Text
        className="text-slate-300 text-base leading-relaxed"
        style={{ paddingHorizontal: hp("2%") }}
      >
        {review.comment}
      </Text>
    </View>
  );
}
