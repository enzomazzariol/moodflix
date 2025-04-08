import { Text, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function SubmitBtn({ handleSubmit, text, bgColor, textColor, width, height }) {
  const buttonStyles = bgColor ? `bg-${bgColor}` : "bg-jasper";
  const textStyles = textColor ? `text-${textColor}` : "text-white";
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className={`p-3 rounded-lg mb-4 ${buttonStyles} ${textStyles}`}
      style={{ width: width ? wp(width) : wp(""), height: height ? hp(height) : hp("") }}
      onPress={handleSubmit}
    >
      <Text
        className="text-lg font-outfitBold text-white text-center"
        activeOpacity={1}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
