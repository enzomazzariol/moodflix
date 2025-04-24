import { StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import SelectDropdown from "react-native-select-dropdown";
import { colors } from "../../utils/colors";
import { SelectArrowIcon } from "../ui/icons";

// Componente de selección de opciones | Recibe un array de opciones y una función para actualizar el estado
export default function SelectInput({
  label,
  options,
  onChange,
  placeholder,
  value,
}) {
  return (
    <View className="mb-4" style={{ width: wp("70%") }}>
      <Text className="text-2xl font-spaceGroteskBold text-floralWhite mb-2">
        {label}
      </Text>

      <SelectDropdown
        data={options}
        defaultValue={value}
        onSelect={(selectedItem) => onChange(selectedItem.value)}
        defaultValueByIndex={0}
        renderButton={(selectedItem) => (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {selectedItem?.label || placeholder || "Selecciona una opción"}
            </Text>
            <SelectArrowIcon size={22} color={colors.black} />
          </View>
        )}
        renderItem={(item, index, isSelected) => (
          <View
            key={index}
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: colors.jasper }),
            }}
          >
            <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
        buttonStyle={{ width: wp("70%"), height: hp("5%") }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "100%",
    height: hp("5%"),
    backgroundColor: colors.jasper,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Outfit-Regular",
    color: colors.black,
  },
  dropdownButtonIconStyle: {
    fontSize: 24,
    marginRight: 8,
    color: colors.black,
  },
  dropdownMenuStyle: {
    backgroundColor: colors.prussianBlue,
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderTopColor: colors.richBlue,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.richBlue,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Outfit-Regular",
    color: colors.floralWhite,
  },
  
});
