import { Clapperboard } from "lucide-react-native";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { Title } from "../commoms/Title";
import { RightArrowIcon } from "../ui/icons";

export default function PeopleList({ people, isCasting = true }) {
    const [pressedIndex, setPressedIndex] = useState(false);

  if (!people || people.length === 0) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ paddingHorizontal: hp("1.5%"), paddingVertical: hp("1%") }}
      >
        <Title>No hay personas para mostrar</Title>
      </View>
    );
  }

  return (
      <View
        className="items-center border-t-slate-500"
        style={{ borderTopWidth: 1 }}
      >
        {people.slice(0, 20).map((person, index) => (
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={() => setPressedIndex(index)}
            onPressOut={() => setPressedIndex(false)}
            key={index}
            className=""
            style={{
              backgroundColor:
                pressedIndex === index ? colors.prussianBlue : "transparent",
              width: wp("100%"),
              paddingVertical: hp("0.9%"),
              paddingHorizontal: wp("5%"),
              borderBottomColor: colors.prussianBlue,
              borderBottomWidth: 1,
            }}
          >
            <View className="flex-row items-center justify-between">
              {person.profile_path ? (
                <Image
                  source={{
                    uri: person.profile_path
                      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                      : "https://via.placeholder.com/150",
                  }}
                  className="rounded-lg"
                  style={{
                    width: wp("10%"),
                    height: wp("10%"),
                    marginRight: wp("2.5%"),
                  }}
                  resizeMode="cover"
                />
              ) : (
                <View
                  style={{
                    width: wp("10%"),
                    height: wp("10%"),
                    marginRight: wp("2.5%"),
                  }}
                  className="items-center justify-center bg-prussianBlue rounded-lg"
                >
                  <Clapperboard
                    fill={colors.jasper}
                    size={24}
                    stroke={colors.black}
                    strokeWidth={1.2}
                  />
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Title className="text-lg font-spaceGroteskBold">
                  {person.name}
                </Title>
                {isCasting && (
                  <Text className="text-base text-slate-300">
                    {person.character}
                  </Text>
                )}
                {!isCasting && (
                  <Text className="text-base text-slate-300">{person.job}</Text>
                )}
              </View>
              <View style={{ paddingLeft: wp("2%") }}>
                <RightArrowIcon size={20} color="#cbd5e1" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
  );
}
