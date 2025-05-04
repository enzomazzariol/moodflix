import { Rating } from "@kolking/react-native-rating";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import PosterMovie from "../../components/commoms/PosterMovie";
import ActivityScreen from "../../components/screens/ActivityScreen";
import { colors } from "../../utils/colors";

// Libreria de rating https://github.com/kolking/react-native-rating

export default function Activity() {
  const router = useRouter();

  const goToMovie = () => {
    router.push(`/movie/278`);
    s;
  };

  const goToUserProfile = () => {
    router.push(`/profile/1`);
  };

  return (
    <ActivityScreen>
      <View
        className="flex-1 items-center"
        style={{ padding: hp("2%"), rowGap: hp("1.5%") }}
      >
        <TouchableOpacity
          className="bg-prussianBlue rounded-md h-fit flex-row items-center justify-between"
          style={{ width: wp("95%"), padding: hp("1%") }}
          activeOpacity={0.8}
          onPress={goToMovie}
        >
          <Pressable onPress={goToUserProfile}>
            <Image
              source={require("../../../assets/william.png")}
              className="rounded-full"
              resizeMode="cover"
              style={{ width: hp("5%"), height: hp("5%") }}
            />
          </Pressable>

          <Text
            className="text-floralWhite text-base font-outfitRegular text-wrap"
            style={{ width: wp("70%") }}
          >
            <Text className="font-outfitBold">Enzo Mazzariol </Text>
            le ha gustado{" "}
            <Text className="font-outfitBold">The Shawshank Redemption</Text>
          </Text>

          <Text
            className="font-outfitRegular text-base text-floralWhite self-start"
            style={{ marginTop: hp("0.6%") }}
          >
            3h
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-prussianBlue rounded-md h-fit flex-row items-center justify-between"
          style={{ width: wp("95%"), padding: hp("1%") }}
          activeOpacity={0.8}
          onPress={goToMovie}
        >
          <Pressable onPress={goToUserProfile}>
            <Image
              source={{ uri: "https://picsum.photos/id/10/200/300" }}
              defaultSource={require("../../../assets/splash-expo.png")}
              className="rounded-full"
              resizeMode="cover"
              style={{ width: hp("5%"), height: hp("5%") }}
            />
          </Pressable>

          <Text
            className="text-floralWhite text-base font-outfitRegular text-wrap"
            style={{ width: wp("70%") }}
          >
            <Text className="font-outfitBold">Jackson Esponja </Text>
            ha guardado{" "}
            <Text className="font-outfitBold">
              Star Wars: The Force Awakens{" "}
            </Text>
            en su lista de favoritos
          </Text>

          <Text
            className="font-outfitRegular text-base text-floralWhite self-start"
            style={{ marginTop: hp("0.6%") }}
          >
            3h
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-prussianBlue rounded-md h-fit flex-row items-center justify-between"
          style={{ width: wp("95%"), padding: hp("1%") }}
          activeOpacity={0.8}
          onPress={goToMovie}
        >
          <Pressable onPress={goToUserProfile} className="self-start">
            <Image
              source={{ uri: "https://picsum.photos/id/10/200/300" }}
              defaultSource={require("../../../assets/splash-expo.png")}
              className="rounded-full"
              resizeMode="cover"
              style={{ width: hp("5%"), height: hp("5%") }}
            />
          </Pressable>

          <View className="flex-col" style={{ rowGap: hp("0.8%") }}>
            <Text
              className="text-floralWhite text-base font-outfitRegular text-wrap"
              style={{ width: wp("50%") }}
            >
              <Text className="font-outfitBold">Roberto Hernandez </Text>
              vió
              <Text className="font-outfitBold"> The Godfather: Part II </Text>
            </Text>

            <Rating
              size={13}
              rating={3}
              maxRating={5}
              disabled={true}
              baseColor={colors.floralWhite}
              fillColor={colors.jasper}
            />

            <View className="flex-row" style={{ columnGap: hp("0%") }}>
              <Text
                className="text-floralWhite text-base font-outfitRegular text-wrap self-start"
                style={{ width: wp("50%") }}
              >
                Esta pelicula es muy buena, la recomiendo mucho porque trata
                sobre la mafia en nueva york en los años 80.
              </Text>
            </View>
            <Text className="font-outfitRegular text-base text-floralWhite self-start">
              3h
            </Text>
          </View>

          <PosterMovie
            posterPath="/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
            title="The Godfather: Part II"
            idMovie="238"
            posterHeight={hp("16%")}
            posterWidth={wp("21%")}
          />
        </TouchableOpacity>
      </View>
    </ActivityScreen>
  );
}
