import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { RemoveItemIcon } from "../ui/icons";

export default function RecentSearchText({ children }) {
  return (
    <TouchableOpacity className="border-b-[1px] border-blue-100" activeOpacity={0.8}>
      <View className="flex-row justify-between" style={{marginEnd: heightPercentageToDP(1)}}>
        <Text className="text-floralWhite pb-4 text-xl font-outfitRegular">
          {children}
        </Text>
        <RemoveItemIcon size={20} color={colors.floralWhite} />
      </View>
    </TouchableOpacity>
  );
}