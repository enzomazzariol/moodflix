import { useRouter } from "expo-router";
import { ActivityIndicator, Linking, Modal, Pressable, ScrollView, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useMovieStatus } from "../../../../shared/hooks/useMovieStatus";
import { useAuth } from "../../context/AuthContext";
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
import LinkRow from "./LinkRow";

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
          style={{ height: hp("55%") }}
          onPress={(e) => {
            // This prevents the parent Pressable's onPress from being triggered
            e.stopPropagation();
          }}
        >
          <ModalHeader title={movie?.title} onClose={closeModal} />
          <ScrollView
            contentContainerStyle={{ paddingBottom: hp("2%"), flexGrow: 1 }}
          >
            <ModalContent closeModal={closeModal} movie={movie} />
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function ModalHeader({ title }) {
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

export function ModalContent({ closeModal, movie }) {
  const { user } = useAuth();
  const router = useRouter();

  const {
    isFavorite,
    isViewed,
    isInWatchlist,
    toggleFavorite,
    toggleViewed,
    toggleWatchlist,
    isLoading
  } = useMovieStatus(user?.user_id, movie?.movie_id);

  const handleLinkNavigation = (link) => {
    if (link.url.startsWith("http")) {
      Linking.openURL(link.url);
    } else {
      closeModal();
      router.push({
        pathname: link.url,
        params: { 
          movie: JSON.stringify(movie),
          openModal: "true"
         },
      })
    }
  }

  const links = [
    {
      title: "Ver trailer en Youtube",
      url: movie?.trailer_url,
    },
    {
      title: "Hacer reseña",
      url: "/movie/review",
    },
    {
      title: "Ver en IMDB",
      url: "https://www.imdb.com/title/tt0111161/",
    },
    {
      title: "Ver en Rotten Tomatoes",
      url: "https://www.rottentomatoes.com/m/the_godfather/",
    },
    {
      title: "Compartir",
      url: "",
    },
  ];

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color={colors.floralWhite} />
      </View>
    );
  }

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
          onPress={() => toggleFavorite(user?.user_id, movie?.movie_id)}
          ActiveIcon={HeartFillIcon}
          InactiveIcon={HeartOutlineIcon}
          label="Favoritos"
          activeColor={colors.jasper}
          inactiveColor={colors.floralWhite}
        />
        <ToggleIconButton
          isActive={isViewed}
          onPress={() => toggleViewed(user?.user_id, movie?.movie_id)}
          ActiveIcon={EyeIconFill}
          InactiveIcon={EyeIconOutline}
          label="Vista"
          activeColor="#0ea5e9"
          inactiveColor={colors.floralWhite}
        />
        <ToggleIconButton
          isActive={isInWatchlist}
          onPress={() => toggleWatchlist(user?.user_id, movie?.movie_id)}
          ActiveIcon={WatchlistFillIcon}
          InactiveIcon={WatchlistOutlineIcon}
          label="Watchlist"
          activeColor={colors.coral}
          inactiveColor={colors.floralWhite}
        />
      </View>

      {/* Contenido adicional para demostrar scroll */}
      <View style={{}}>
        {links.map((link, index) => (
          <LinkRow
            key={index}
            title={link.title}
            onPress={() => handleLinkNavigation(link)}
          />
        ))}
        <View style={{ paddingVertical: hp("2%") }}>
          <Pressable
            className="items-center"
            style={{
              paddingVertical: hp("1%"),
            }}
            onPress={closeModal}
          >
            <Text className="text-jasper text-2xl font-outfitRegular">
              Salir
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
