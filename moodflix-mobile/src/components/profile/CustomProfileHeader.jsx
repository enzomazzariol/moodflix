import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { Title } from "../commoms/Title";
import { SettingsIcon } from "../ui/icons";

export default function CustomProfileHeader() {
  return (
    <View className="flex-col bg-raisinBlack" style={{ height: hp("28%") }}>
      <View className=" flex-1 items-center" style={{ padding: hp("5%") }}>
        <View className="flex-row w-full justify-between items-center">
          <Pressable onPress={() => console.log("settings")} className="">
            <SettingsIcon
              size={22}
              color={colors.floralWhite}
              className="mr-2"
            />
          </Pressable>

          <Title
            className="text-center font-spaceGroteskBold text-floralWhite shadow-black"
            style={{ fontSize: 30, paddingVertical: hp("2%") }}
          >
            Enzo Mazzariol
          </Title>
        </View>

        <Pressable onPress={() => console.log("pressado")}>
          <Image
            source={require("../../../assets/william.png")}
            className="rounded-full"
            resizeMode="cover"
            style={{ width: hp("10%"), height: hp("10%") }}
          />
        </Pressable>

        <View
          className="flex-row items-center gap-x-4"
          style={{ marginTop: hp("2%") }}
        >
          <Text className="text-lg text-floralWhite font-spaceGroteskRegular">
            Barcelona
          </Text>
          <Text className="text-lg text-floralWhite font-spaceGroteskRegular">
            Nostalgia
          </Text>
          <Text className="text-lg text-floralWhite font-spaceGroteskRegular">
            Comedia
          </Text>
        </View>
      </View>
    </View>
  );
}
