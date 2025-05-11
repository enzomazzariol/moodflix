import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ProfilePicture from "../../components/commoms/ProfilePicture";
import MoviesSlider from "../../components/home/MoviesSlider";
import ProfileInfoRow from "../../components/profile/ProfileInfoRow";
import MovieScreen from "../../components/screens/MovieScreen";
import movies from "../../lib/mocks/movies.json";
import { colors } from "../../utils/colors";

// Screen de perfil de usuario
export default function UserProfile() {
  const { id, username } = useLocalSearchParams();
  const navigation = useNavigation();
  const [profileImageVisible, setProfileImageVisible] = useState(false);
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  // Setea el título de la pantalla en función del usuario
  useEffect(() => {
    navigation.setOptions({
      title: username,
    });
  }, [username]);

  return (
    <MovieScreen className="flex-1">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="items-center"
          style={{ paddingHorizontal: wp("0%"), paddingVertical: hp("4%") }}
        >
          <View
            className="items-center w-full"
            style={{
              borderBottomWidth: 1,
              borderColor: colors.prussianBlue,
              paddingBottom: hp("2%"),
            }}
          >
            {/* Imagen de perfil */}
            <ProfilePicture
              url={require("../../../assets/william.png")}
              onPress={() => setProfileImageVisible(true)}
            />

            {/* Modal para ampliar la imagen de perfil */}
            <UserImageModal
              profileImageVisible={profileImageVisible}
              setProfileImageVisible={setProfileImageVisible}
            />

            <View
              className="flex-col items-center justify-center"
              style={{ rowGap: hp("1.5%") }}
            >
              <ProfileInfoRow
                location={"London"}
                emotion={"Miedo"}
                genre={"Drama"}
              />
              <Text
                className="text-floralWhite font-spaceGroteskRegular text-base"
                style={{ width: wp("90%") }}
              >
                {description}
              </Text>
            </View>
          </View>
          {/* Favoritas del usuario */}
          <View
            style={{
              paddingHorizontal: wp("2%"),
              paddingVertical: hp("1%"),
            }}
          >
            <MoviesSlider
              movies={movies}
              title={"Favoritas"}
              posterHeight={hp("16%")}
              posterWidth={wp("21%")}
            />
          </View>

          {/* Historial del usuario, reviews recientes */}
        </View>
      </ScrollView>
    </MovieScreen>
  );
}

function UserImageModal({ profileImageVisible, setProfileImageVisible }) {
  return (
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
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  expandedImage: {
    width: wp("70%"),
    height: hp("40%"),
    resizeMode: "contain",
  },
});
