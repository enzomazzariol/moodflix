import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useSearchContext } from "../../context/SearchContext";
import { colors } from "../../utils/colors";
import { RemoveItemIcon } from "../ui/icons";

export default function RecentSearchText({ children, onDelete }) {
  const { setSearchText } = useSearchContext();
  
  return (
    <TouchableOpacity
      className="border-b-[1px] border-blue-100"
      activeOpacity={0.8}
      onPress={() => setSearchText(children)}
    >
      <View
        className="flex-row justify-between"
        style={{ marginEnd: heightPercentageToDP(1) }}
      >
        <Text className="text-floralWhite pb-4 text-xl font-outfitRegular">
          {children}
        </Text>
        <Pressable onPress={onDelete}>
          <RemoveItemIcon size={20} color={colors.floralWhite} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
}