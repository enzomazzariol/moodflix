import Slider from "@react-native-community/slider";
import { useState } from "react";
import { Text, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { colors } from "../../utils/colors";

export default function RandomizerSlider({ label, minValue, maxValue, suffix }) {
  const [value, setValue] = useState(minValue);

    const handleValueChange = (val) => {
        setValue(val);
    };
  return (
    <View className="mb-4" style={{ width: wp("70%") }}>
      <Text className="text-2xl font-outfitBold text-floralWhite mb-2">
        {label}: {Math.round(value)} {suffix}
      </Text>
      <Slider
        style={{ width: wp("70%"), height: hp("5%") }}
        minimumValue={minValue ?? 0}
        maximumValue={maxValue ?? 100}
        minimumTrackTintColor={colors.prussianBlue}
        maximumTrackTintColor={colors.jasper}
        thumbTintColor={colors.floralWhite}
        value={value}
        onValueChange={handleValueChange}
      />
    </View>
  );
}
