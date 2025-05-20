import { Text, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function EmotionBtn({ children, onPress, style, width }) { 
    return (
        <TouchableOpacity
         className={`items-center justify-center bg-prussianBlue rounded-lg ${style}`}
         style={{ height: hp("5%"), width: wp(width) }}
         onPress={onPress}
         activeOpacity={0.8}
         >
            <Text className="text-floralWhite font-outfitSemiBold text-xl" maxFontSizeMultiplier={1.2}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}