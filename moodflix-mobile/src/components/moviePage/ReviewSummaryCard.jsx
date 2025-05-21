import { Rating } from "@kolking/react-native-rating";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";

export default function ReviewSummaryCard({ movie, movieRating }) {
  const route = useRouter();
  const totalReviews = movieRating?.ratings?.length ?? 0;
  const averageRating = movieRating?.averageRating ?? 0;

  
  const handleNavigation = () => {
    route.push({
      pathname: "/movie/review",
      params: { movie: JSON.stringify(movie), movieRating: JSON.stringify(movieRating) },
    })
  };

  return (
    <View className="bg-prussianBlue rounded-lg p-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-slate-100 text-lg font-spaceGroteskBold">
          Reseñas
        </Text>
        <View className="flex-row items-center" style={{ columnGap: hp("1%") }}>
        <TouchableOpacity
          className="bg-richBlue rounded-e-xl rounded-s-xl"
          style={{ padding: hp("0.8%"), paddingHorizontal: hp("2%") }}
          onPress={handleNavigation}
        >
          <Text className="text-jasper text-base font-outfitRegular">
            Ver todas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-richBlue rounded-e-xl rounded-s-xl"
          style={{paddingHorizontal: hp("0.7%"), paddingVertical: hp("0.4%")}}
          onPress={handleNavigation}
        >
          <Plus size={24} color={colors.jasper} />
        </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center" style={{ columnGap: hp("1%") }}>
          <Rating
            size={13}
            rating={totalReviews > 0 ? averageRating : 0}
            maxRating={5}
            disabled={true}
            baseColor={colors.floralWhite}
            fillColor={colors.jasper}
          />
          <Text className="text-slate-400 text-lg font-bold">
            {totalReviews > 0 ? averageRating : "0"} / 5
          </Text>
        </View>
        {totalReviews === 1 ? (
          <Text className="text-slate-400">{totalReviews} reseña</Text>
        ) : (
          <Text className="text-slate-400">{totalReviews} reseñas</Text>
        )}
      </View>
    </View>
  );
}
