import { Text, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function SubmitBtn({ handleSubmit, children, bgColor, textColor, width, height }) {

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className={`p-3 rounded-lg mb-4 ${bgColor || "bg-jasper"}`}
      style={{
        width: width ? wp(width) : wp(""),
        height: height ? hp(height) : hp(""),
      }}
      onPress={handleSubmit}
    >
      <Text
        className={`text-xl font-outfitBold text-center ${textColor || "text-white"}`}
        activeOpacity={1}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
