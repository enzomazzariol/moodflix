import { useState } from "react";
import { Alert, Image, Pressable, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { EditIcon } from "../ui/icons";

export default function ChangeAvatar({ label, value, onChangeText }) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <TouchableOpacity
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={1}
      className="flex-row items-center justify-center w-full"
      style={{
        backgroundColor: isPressed ? colors.prussianBlue : "transparent",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: colors.prussianBlue,
        paddingLeft: hp("2%"),
        paddingVertical: hp("1.8%"),
      }}
    >
      <Pressable className="relative" onPress={() => AlertModal()}>
        <Image
          source={require("../../../assets/william.png")}
          className="rounded-full"
          resizeMode="cover"
          style={{ width: hp("13%"), height: hp("13%") }}
        />
        <View
          className="bg-floralWhite/90 rounded-lg absolute"
          style={{
            padding: hp("0.5%"),
            top: hp("10%"),
            right: hp("-1%"),
          }}
        >
          <EditIcon size={22} color={colors.raisinBlack} />
        </View>
      </Pressable>
    </TouchableOpacity>
  );
}

function AlertModal() {
  return Alert.alert(
    "Cambiar foto de perfil", // título
    "Selecciona una opción", // mensaje
    [
      {
        text: "Elegir de galería",
        onPress: () => console.log("Elegir de galería"),
      },
      {
        text: "Tomar foto",
        onPress: () => console.log("Tomar foto"),
      },
      {
        text: "Eliminar la foto actual",
        onPress: () => console.log("Eliminar la foto actual"),
        style: "destructive",
      },
      {
        text: "Cancelar",
        onPress: () => console.log("Cancelar"),
        style: "cancel",
      },
    ],
    { cancelable: true }
  );
}
