// este componente se usa para mostrar links de secciones en la parte de search y profile
import { Text, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { RightArrowIcon } from "../ui/icons";

export default function SectionLink({ children, onPress, className }) {
    return (
        <TouchableOpacity
            className={`flex-row items-center justify-between bg-jasper rounded-lg ${className}`}
            style={{ height: hp("4%"), width: wp("92%"), padding: hp("1%") }}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text className="text-floralWhite font-outfitSemiBold text-xl">
                {children}
            </Text>

            <RightArrowIcon size={20} color={colors.floralWhite} />
        </TouchableOpacity>
    )
}