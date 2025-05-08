import { useState } from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { Title } from "../commoms/Title";
import { ToggleIconButton } from "../commoms/ToggleIconButton";
import {
    EyeIconFill,
    EyeIconOutline,
    HeartFillIcon,
    HeartOutlineIcon,
    WatchlistFillIcon,
    WatchlistOutlineIcon,
} from "../ui/icons";

export default function MovieModal({ movie, visible, closeModal }) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={closeModal}
    >
      <Pressable
        className="flex-1 justify-end"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        onPress={closeModal}
      >
        <Pressable
          className="bg-raisinBlack rounded-t-2xl overflow-hidden"
          style={{ height: hp("65%") }}
          onPress={(e) => {
            // This prevents the parent Pressable's onPress from being triggered
            e.stopPropagation();
          }}
        >
          <ModalHeader title={movie.title} onClose={closeModal} />
          <ScrollView
            contentContainerStyle={{ paddingBottom: hp("2%"), flexGrow: 1 }}
          >
            <ModalContent />
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function ModalHeader({ title, onClose }) {
  return (
    <View
      className="flex-row items-center justify-center"
      style={{
        padding: hp("2%"),
        height: hp("7%"),
        borderBottomWidth: 1,
        borderColor: colors.prussianBlue,
        backgroundColor: colors.prussianBlue,
      }}
    >
      <Title className="text-xl">{title}</Title>
    </View>
  );
}

export function ModalContent() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isViewed, setIsViewed] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View
        className="flex-row items-center justify-between"
        style={{
          paddingHorizontal: wp("10%"),
          paddingVertical: hp("2%"),
          borderBottomColor: colors.prussianBlue,
          borderBottomWidth: 1,
        }}
      >
        <ToggleIconButton
          isActive={isFavorite}
          onPress={() => setIsFavorite(!isFavorite)}
          ActiveIcon={HeartFillIcon}
          InactiveIcon={HeartOutlineIcon}
          label="Favoritos"
          activeColor={colors.jasper}
          inactiveColor={colors.floralWhite}
        />
        <ToggleIconButton
          isActive={isViewed}
          onPress={() => setIsViewed(!isViewed)}
          ActiveIcon={EyeIconFill}
          InactiveIcon={EyeIconOutline}
          label="Vista"
          activeColor="#0ea5e9"
          inactiveColor={colors.floralWhite}
        />
        <ToggleIconButton
          isActive={isInWatchlist}
          onPress={() => setIsInWatchlist(!isInWatchlist)}
          ActiveIcon={WatchlistFillIcon}
          InactiveIcon={WatchlistOutlineIcon}
          label="Watchlist"
          activeColor={colors.coral}
          inactiveColor={colors.floralWhite}
        />
      </View>

      <View style={{ padding: hp("2%") }}>
        <Title className="text-xl text-white">Hacer reseña</Title>

        {/* Contenido adicional para demostrar scroll */}
        <View style={{ height: hp("50%"), marginTop: hp("2%") }}>
          
          
        </View>
      </View>
    </View>
  );
}
