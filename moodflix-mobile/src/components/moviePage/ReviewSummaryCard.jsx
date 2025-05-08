import { Rating } from "@kolking/react-native-rating";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";

export default function ReviewSummaryCard({ averageRating, totalReviews, movie }) {
  const route = useRouter();

  const handleNavigation = () => {
    route.push("/movie/review");
  };

  return (
    <View className="bg-prussianBlue rounded-lg p-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-slate-100 text-lg font-spaceGroteskBold">
          Reseñas
        </Text>
        <TouchableOpacity
          className="bg-richBlue rounded-e-xl rounded-s-xl"
          style={{ padding: hp("0.8%"), paddingHorizontal: hp("1.2%") }}
          onPress={handleNavigation}
        >
          <Text className="text-jasper text-base font-outfitRegular">
            Ver todas
          </Text>
        </TouchableOpacity>
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
            {totalReviews > 0 ? averageRating : "N/A"} / 5
          </Text>
        </View>
        <Text className="text-slate-400">{totalReviews} reseñas</Text>
      </View>
{/* BOTON DESACTIVADO
      <TouchableOpacity
        onPress={() => navigation.navigate("WriteReviewScreen")}
        className="mt-4 bg-jasper/80 rounded-xl py-2 px-4"
      >
        <Text className="text-white text-center font-spaceGroteskBold">
          Escribir una reseña
        </Text>
      </TouchableOpacity>
*/}
    </View>
  );
}
