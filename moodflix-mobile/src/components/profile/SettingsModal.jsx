import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { Title } from "../commoms/Title";

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
              className="p-8 shadow-lg bg-raisinBlack"
              contentContainerStyle={{ flexGrow: 1 }}
              style={{ height: hp("100%") }}
            >
              <Pressable
                className="bg-jasper py-3 px-6 rounded-full"
                onPress={onClose}
              >
                <Text className="text-floralWhite font-spaceGroteskBold">
                  Cerrar
                </Text>
              </Pressable>
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

        <Title className="">Configuración</Title>
        <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
          <Text className="font-spaceGroteskBold text-lg text-jasper">
            Guardar
          </Text>
        </TouchableOpacity>
      </View>
    );
}