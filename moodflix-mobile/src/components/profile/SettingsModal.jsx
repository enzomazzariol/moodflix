import { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
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
            <ScrollView
              className="shadow-lg bg-raisinBlack"
              contentContainerStyle={{ flexGrow: 1 }}
              style={{ height: hp("100%") }}
            >
              <ModalContent />
            </ScrollView>
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
  const[userData, setUserData] = useState({});
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
        <EditableRow label={"Nombre de usuario"} value={"Nombre de usuario"} />
        <EditableRow label={"Email"} value={"Email"} />
        <EditableRow label={"Contraseña"} value={"Contraseña"} />
        <EditableRow label={"Bio"} value={"Bio"} />
        <EditableRow label={"Ubicación"} value={"Ubicación"} />
        <EditableRow label={"Emoción actual"} value={"Emoción actual"} />
        <EditableRow label={"Género favorito"} value={"Género favorito"} />
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