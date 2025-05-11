import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { Title } from '../commoms/Title';

export default function NewReviewModal({ visible, onClose}) {
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
            <ModalHeader title={"Añadir reseña"} onClose={onClose} />
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
            Cancelar
          </Text>
        </TouchableOpacity>

        <Title className="">{title}</Title>
        <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
          <Text className="font-spaceGroteskBold text-lg text-jasper">
            Subir
          </Text>
        </TouchableOpacity>
      </View>
    );
}

function ModalContent() {
  return (
    <>
      <Title
        className="text-2xl font-spaceGroteskBold text-floralWhite"
        style={{ padding: hp("2%") }}
      >
        Editar
      </Title>
    </>
  );
}