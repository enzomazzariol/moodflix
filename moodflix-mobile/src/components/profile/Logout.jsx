import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";

export default function Logout({
  label,
  onPress,
  btnStyles,
  textClassName,
  rowHeight = hp("5.2%"),
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
          paddingVertical: hp("1%"),
        },
      ]}
    >
      <Text
        className={`text-xl font-outfitSemiBold text-jasper ${textClassName}`}
        style={{
          paddingStart: hp("2%"),
          width: wp("40%"),
        }}
      >
        {label}
      </Text> 
    </TouchableOpacity>
  );
}

