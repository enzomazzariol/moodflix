import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";

export default function EditableRow({
  label,
  value,
  onChangeText,
  onPress,
  btnStyles,
  textClassName,
  rowHeight = hp("5.2%"),
  multiline = false,
  numberOfLines = 1,
}) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      activeOpacity={1}
      className="w-full"
      style={[
        {
          ...btnStyles,
          backgroundColor: isPressed ? colors.prussianBlue : "transparent",
          borderBottomWidth: 1,
          borderColor: colors.prussianBlue,
          minHeight: rowHeight,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: multiline ? "flex-start" : "center",
          paddingVertical: hp("1%"),
        },
      ]}
    >
      <Text
        className={`text-xl font-outfitSemiBold text-jasper ${textClassName}`}
        style={{
          paddingStart: hp("2%"),
          paddingTop: multiline ? hp("1.2%") : 0,
          width: wp("40%"),
        }}
      >
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        className="text-lg font-outfitSemiBold text-timberwolf"
        style={{
          flex: 1,
          paddingHorizontal: hp("2%"),
          textAlign: "left",
          paddingBottom: hp("0.6%")
        }}
        placeholderTextColor="#999"
      />
    </TouchableOpacity>
  );
}

