import { Pressable, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";

export default function LinkRow({ title, onPress }) {
    return (
        <Pressable 
            className="items-center" 
            style={{ paddingVertical: hp("1%"), borderBottomWidth: 1, borderBottomColor: colors.prussianBlue }} 
            onPress={onPress}
        >
            <Text className="text-slate-200 text-2xl font-outfitRegular">{title}</Text>
        </Pressable>
    )
}