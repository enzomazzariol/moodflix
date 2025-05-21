import { useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useAuth } from "../../context/AuthContext";
import { colors } from "../../utils/colors";
import { Title } from "../commoms/Title";
import ChangeAvatar from "./ChangeAvatar";
import EditableRow from "./EditableRow";
import Logout from "./Logout";

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
                <ModalContent onClose={onClose} />
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

function ModalContent({ onClose}) {
  const { user, location, favoriteGenre, setFavoriteGenre, currentEmotion, setCurrentEmotion } = useAuth();

  const[userData, setUserData] = useState({
    username: user?.username,
    email: user?.email,
    password: "contraseña",
    avatar: user?.avatar_url,
    bio: "",
    location: location,
    currentMood: currentEmotion,
    favoriteGenre: favoriteGenre,
  });

  const { logout } = useAuth();

  const handleInputChange = (field, val) => {
    setUserData((prevState) => ({
      ...prevState,
      [field]: val,
    }))
  }

  const handleLogout = async () => {
    await logout();
    onClose();
  }

  return (
    <>
      <Title
        className="text-2xl font-spaceGroteskBold text-floralWhite"
        style={{ padding: hp("2%") }}
      >
        Editar
      </Title>
      <ChangeAvatar imageUri={userData?.avatar} />

      <View className="flex-col">
        <EditableRow label={"Nombre de usuario"} value={userData?.username} onChangeText={(val) => handleInputChange("username", val)}/>
        <EditableRow label={"Email"} value={userData?.email} onChangeText={(val) => handleInputChange("email", val)}/>
        <EditableRow label={"Contraseña"} value={userData?.password} onChangeText={(val) => handleInputChange("password", val)}/>
        <EditableRow rowHeight={hp("12%")} multiline={true} numberOfLines={6} label={"Bio"} value={userData?.bio.slice(0, 100) || "Escribe tu biografía"} onChangeText={(val) => handleInputChange("bio", val)}/>
        <EditableRow label={"Ubicación"} value={userData?.location || "Escoge tu ubicación"} onChangeText={(val) => handleInputChange("location", val)}/>
        <EditableRow label={"Emoción actual"} value={userData?.currentMood || "Escoge tu emoción actual"} onChangeText={(val) => handleInputChange("currentMood", val)}/>
        <EditableRow label={"Género favorito"} value={userData?.favoriteGenre || "Escoge tu género favorito"} onChangeText={(val) => handleInputChange("favoriteGenre", val)}/>
      </View>
      <View style={{ paddingVertical: hp("8%") }}>
        <Logout
          label={"Cerrar sesión"}
          btnStyles={{ borderTopWidth: 1, borderColor: colors.prussianBlue }}
          textClassName={"text-red-600"}
          onPress={handleLogout}
        />
      </View>
    </>
  );
}