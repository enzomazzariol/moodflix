import React, { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { Title } from "../commoms/Title";
import { SettingsIcon } from "../ui/icons";
import ProfileInfoRow from "./ProfileInfoRow";
import SettingsModal from "./SettingsModal";

export default function CustomProfileHeader() {

  const [modalVisible, setModalVisible] = useState(false);
  const [profileImageVisible, setProfileImageVisible] = useState(false);

  return (
    <View className="flex-col bg-raisinBlack" style={{ height: hp("29%") }}>
      <SettingsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <View className=" flex-1 items-center" style={{ padding: hp("5%") }}>
        <View className="flex-row w-full relative items-center">
          <Pressable
            onPress={() => setModalVisible(true)}
            className="absolute -left-6"
          >
            <SettingsIcon size={26} color={colors.floralWhite} />
          </Pressable>

          <Title
            className="text-center font-spaceGroteskBold text-floralWhite shadow-black w-full"
            style={{ fontSize: 30, paddingVertical: hp("2%") }}
            maxFontSizeMultiplier={1.3}
          >
            Enzo Mazzariol
          </Title>
        </View>

        <Pressable onPress={() => setProfileImageVisible(true)}>
          <Image
            source={require("../../../assets/william.png")}
            className="rounded-full"
            resizeMode="cover"
            style={{ width: hp("10%"), height: hp("10%") }}
          />
        </Pressable>

        <Modal visible={profileImageVisible} transparent animationType="slide">
          <TouchableOpacity
            className="flex-1 items-center justify-center"
            style={styles.modalContainer}
            onPress={() => setProfileImageVisible(false)}
          >
            {/* Imagen de perfil ampliada (cambiar para que sea la imagen del usuario) */}
            <Image
              source={require("../../../assets/william.png")}
              style={styles.expandedImage}
            />
          </TouchableOpacity>
        </Modal>

       <ProfileInfoRow
         location="Barcelona"
         emotion="Nostalgia"
         genre="Comedia"
       />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  expandedImage: {
    width: widthPercentageToDP("70%"),
    height: hp("40%"),
    resizeMode: "contain",
  },
});