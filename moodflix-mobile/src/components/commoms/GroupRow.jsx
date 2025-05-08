import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { RightArrowIcon } from "../ui/icons";
import { Title } from "./Title";

export default function GroupRow({
  title,
  items,
  iconColor = colors.timberwolf,
  needIcon = true,
}) {
    const [PressedIndex, setPressedIndex] = useState(null);
  return (
    <View style={{ paddingVertical: hp("0.6%") }}>
      <Title
        className="text-floralWhite text-lg"
        style={{
          paddingVertical: hp("1%"),
          paddingHorizontal: hp("2.6%"),
        }}
      >
        {title}
      </Title>

      {items.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          activeOpacity={0.8}
          onPressIn={() => setPressedIndex(idx)}
          onPressOut={() => setPressedIndex(null)}
          className="flex-row items-center justify-between w-full"
          style={{
            borderTopWidth: idx === 0 ? 1 : 0,
            borderBottomWidth: 1,
            borderColor: colors.prussianBlue,
            paddingVertical: hp("1.4%"),
            paddingHorizontal: hp("2.6%"),
            backgroundColor: PressedIndex === idx ? colors.prussianBlue : "transparent",
          }}
        >
          <Text className="text-slate-200 text-base font-spaceGroteskRegular">
            {item}
          </Text>
          {needIcon && (
            <RightArrowIcon size={20} color={iconColor} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}
