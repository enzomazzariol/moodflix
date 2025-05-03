import { Text, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function SubmitBtn({ handleSubmit, children, bgColor, textColor, width, height, btnStyles, textStyles }) {

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className={`p-3 rounded-lg mb-4 ${bgColor || "bg-jasper"} ${btnStyles}`}
      style={{
        width: width ? wp(width) : wp(""),
        height: height ? hp(height) : hp(""),
      }}
      onPress={handleSubmit}
    >
      <Text
        className={`text-xl font-outfitBold text-center ${textColor || "text-white"} ${textStyles}`}
        activeOpacity={1}
        maxFontSizeMultiplier={1.3}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
