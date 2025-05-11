import { useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { Title } from "../commoms/Title";
import ChangeAvatar from "./ChangeAvatar";
import EditableRow from "./EditableRow";

export default function SettingsModal({ visible, onClose}) {
    return (
      <>
        {/* Modal de configuración */}
        <Modal
          animationType="slide"
          visible={visible}
          presentationStyle="pageSheet"
          onRequestClose={onClose}
        >
          <View className="bg-raisinBlack" style={{ height: hp("100%") }}>
            <ModalHeader title={"Configuración"} onClose={onClose} />
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <ScrollView
                className="shadow-lg bg-raisinBlack"
                contentContainerStyle={{ flexGrow: 1 }}
              >
                <ModalContent />
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      </>
    );
}

function ModalHeader({ title, onClose }) {
    return (
      <View
        className="flex-row items-center justify-between"
        style={{
          padding: hp("2%"),
          height: hp("7%"),
          borderBottomWidth: 1,
          borderColor: colors.prussianBlue,
          backgroundColor: colors.prussianBlue,
        }}
      >
        <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
          <Text className="font-spaceGroteskBold text-lg text-floralWhite">
            Cerrar
          </Text>
        </TouchableOpacity>

        <Title className="">{title}</Title>
        <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
          <Text className="font-spaceGroteskBold text-lg text-jasper">
            Guardar
          </Text>
        </TouchableOpacity>
      </View>
    );
}

function ModalContent() {
  const[userData, setUserData] = useState({
    username: "Enzo Mazzariol",
    email: "mazzariol@gmail.com",
    password: "12345678",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Barcelona",
    currentMood: "Nostalgia",
    favoriteGenre: "Comedia",
  });

  const handleInputChange = (field, val) => {
    setUserData((prevState) => ({
      ...prevState,
      [field]: val,
    }))
  }

  return (
    <>
      <Title
        className="text-2xl font-spaceGroteskBold text-floralWhite"
        style={{ padding: hp("2%") }}
      >
        Editar
      </Title>
      <ChangeAvatar />

      <View className="flex-col">
        <EditableRow label={"Nombre de usuario"} value={userData?.username} onChangeText={(val) => handleInputChange("username", val)}/>
        <EditableRow label={"Email"} value={userData?.email} onChangeText={(val) => handleInputChange("email", val)}/>
        <EditableRow label={"Contraseña"} value={userData?.password} onChangeText={(val) => handleInputChange("password", val)}/>
        <EditableRow rowHeight={hp("12%")} multiline={true} numberOfLines={6} label={"Bio"} value={userData?.bio.slice(0, 100)} onChangeText={(val) => handleInputChange("bio", val)}/>
        <EditableRow label={"Ubicación"} value={userData?.location} onChangeText={(val) => handleInputChange("location", val)}/>
        <EditableRow label={"Emoción actual"} value={userData?.currentMood} onChangeText={(val) => handleInputChange("currentMood", val)}/>
        <EditableRow label={"Género favorito"} value={userData?.favoriteGenre} onChangeText={(val) => handleInputChange("favoriteGenre", val)}/>
      </View>
      <View style={{ paddingVertical: hp("8%") }}>
        <EditableRow
          label={"Cerrar sesión"}
          btnStyles={{ borderTopWidth: 1, borderColor: colors.prussianBlue }}
          textClassName={"text-red-600"}
          onPress={() => console.log("Logout")}
        />
      </View>
    </>
  );
}