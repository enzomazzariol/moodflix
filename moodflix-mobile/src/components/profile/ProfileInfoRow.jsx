import { Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FilmIcon, MapPinIcon, SmileIcon } from "../ui/icons";

export default function ProfileInfoRow({ location, emotion, genre }) {
  return (
    <View
      className="flex-row items-center gap-x-4"
      style={{ marginTop: hp("2%") }}
    >
      <View className="items-center flex-row gap-x-1">
        <MapPinIcon size={18} color="#cbd5e1" />
        <Text
          className="text-lg text-floralWhite font-spaceGroteskRegular text-sla"
          maxFontSizeMultiplier={1.3}
        >
          {location}
        </Text>
      </View>

      <View className="items-center flex-row gap-x-1">
        <SmileIcon size={18} color="#cbd5e1" />
        <Text
          className="text-lg text-floralWhite font-spaceGroteskRegular"
          maxFontSizeMultiplier={1.3}
        >
          {emotion}
        </Text>
      </View>
      <View className="items-center flex-row gap-x-1">
        <FilmIcon size={18} color="#cbd5e1" />
        <Text
          className="text-lg text-floralWhite font-spaceGroteskRegular"
          maxFontSizeMultiplier={1.3}
        >
          {genre}
        </Text>
      </View>
    </View>
  );
}
