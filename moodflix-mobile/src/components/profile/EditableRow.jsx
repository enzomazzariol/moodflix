import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";

export default function EditableRow({ label, value, onChangeText, onPress, btnStyles, textClassName }) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <TouchableOpacity
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      activeOpacity={1}
      className="flex-row items-center justify-between w-full"
      style={[
        {
          ...btnStyles,
          backgroundColor: isPressed ? colors.prussianBlue : "transparent",
          borderBottomWidth: 1,
          borderColor: colors.prussianBlue,
        }]}
    >
      <Text
        className={`text-xl font-outfitSemiBold text-jasper ${textClassName}`}
        style={{ paddingStart: hp("2%"), paddingVertical: hp("1.4%") }}
      >
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        className="text-lg font-outfitSemiBold text-timberwolf"
        style={{ paddingEnd: hp("2%") }}
      />
    </TouchableOpacity>
  );
}
