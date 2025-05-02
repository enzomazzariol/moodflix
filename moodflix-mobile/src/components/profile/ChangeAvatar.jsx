import { useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import SubmitBtn from "../commoms/SubmitBtn";

export default function ChangeAvatar({ label, value, onChangeText }) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <TouchableOpacity
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={1}
      className="flex-row items-center justify-between w-full"
      style={{
        backgroundColor: isPressed ? colors.prussianBlue : "transparent",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: colors.prussianBlue,
        paddingLeft: hp("2%"),
        paddingVertical: hp("1%"),
      }}
    >
      <Image
        source={require("../../../assets/william.png")}
        className="rounded-full"
        resizeMode="cover"
        style={{ width: hp("9%"), height: hp("9%") }}
      />
      <View
        className="flex-col items-center justify-between"
        style={{ paddingEnd: hp("2%") }}
      >
        <SubmitBtn textStyles={"text-base"} width={wp("11%")} height={"4%"}>
          Seleccionar nuevo avatar
        </SubmitBtn>
        <Pressable>
          <Text className="text-floralWhite font-spaceGroteskBold text-lg underline">Borrar avatar</Text>
        </Pressable>
      </View>
    </TouchableOpacity>
  );
}
