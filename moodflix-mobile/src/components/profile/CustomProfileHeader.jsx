import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Title } from "../commoms/Title";

export default function CustomProfileHeader() {
  return (
    <View className="flex-col bg-raisinBlack" style={{ height: hp("28%") }}>
      <ImageBackground
        source={require("../../../assets/test-login.svg")}
        resizeMode="cover"
        className="absolute top-0 left-0 w-full h-full"
        style={{ opacity: 0.4 }}
      />
      <View className="z-10 flex-1 items-center" style={{ padding: hp("5%") }}>
        <Title
          className="text-center font-outfitSemiBold text-floralWhite shadow-black"
          style={{ fontSize: 30, paddingVertical: hp("2%") }}
        >
          Enzo Mazzariol
        </Title>

        <Image
          source={require("../../../assets/william.png")}
          className="rounded-full w-24 h-24"
          resizeMode="cover"
        />

        <View className="flex-row items-center gap-x-4" style={{ marginTop: hp("2%") }}>
          <Text className="text-lg text-floralWhite font-outfitSemiBold">
            Barcelona
          </Text>
          <Text className="text-lg text-floralWhite font-outfitSemiBold">
            Nostalgia
          </Text>
          <Text className="text-lg text-floralWhite font-outfitSemiBold">
            Comedia
          </Text>
        </View>
      </View>
    </View>
  );
}
