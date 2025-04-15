import { Text, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function EmotionBtn({ children, onPress, style, width }) {
    // this component is used to show the emotions buttons in the search screen
    // it receives the children prop to show the name of the emotion
    return (
        <TouchableOpacity
         className={`items-center justify-center bg-prussianBlue rounded-lg ${style}`}
         style={{ height: hp("5%"), width: wp(width), padding: hp("1%") }}
         onPress={onPress}
         activeOpacity={0.8}
         >
            <Text className="text-floralWhite font-outfitSemiBold text-xl">
                {children}
            </Text>
        </TouchableOpacity>
    )
}