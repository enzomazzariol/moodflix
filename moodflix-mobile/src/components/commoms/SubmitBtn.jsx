import { Text, TouchableOpacity } from "react-native";

export default function SubmitBtn({ handleSubmit, text, bgColor, textColor }) {
  const buttonStyles = bgColor ? `bg-${bgColor}` : "bg-richBlue";
  const textStyles = textColor ? `text-${textColor}` : "text-white";
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className={`p-3 rounded-lg mb-4 ${buttonStyles} ${textStyles}`}
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
