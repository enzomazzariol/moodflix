import { Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { SelectArrowIcon } from "../ui/icons";

export default function SelectInput({ label, options, onChange, placeholder, value }) {
  return (
    <View className="mb-4" style={{ width: wp("70%") }}>
      <Text className="text-2xl font-outfitBold text-floralWhite mb-2">
        {label}
      </Text>

      <RNPickerSelect
        onValueChange={(val) => onChange(val)}
        value={value ?? "todos"}
        items={options}
        doneText="Hecho"
        touchableWrapperProps={{ focusable: true }}
        key={options.value}
        placeholder={{ label: placeholder, value: "todos" }}
        useNativeAndroidPickerStyle={false}
        Icon={() => <SelectArrowIcon size={24} color={colors.black} />}
        style={{
          inputIOS: {
            fontSize: 18,
            fontFamily: "Outfit-Regular",
            width: wp("70%"),
            height: hp("5%"),
            paddingHorizontal: 10,
            backgroundColor: colors.jasper,
            borderRadius: 8,
            color: colors.black,
          },
          inputAndroid: {
            fontSize: 16,
            fontFamily: "Outfit-Regular",
            width: wp("70%"),
            height: hp("5%"),
            paddingHorizontal: 10,
            backgroundColor: "#ffffff",
            borderRadius: 8,
            color: colors.black,
          },
          iconContainer: {
            top: 10,
            right: 10,
          },
          placeholder: {
            fontSize: 16,
            fontFamily: "Outfit-Regular",
            color: colors.black,
          },
        }}
      />
    </View>
  );
}
