import { Rating } from "@kolking/react-native-rating";
import { useState } from "react";
import {
  ActionSheetIOS,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useMoodflix } from "../../../../shared/hooks/useMoodflix";
import { useAuth } from "../../context/AuthContext";
import { EventBus } from "../../services/eventBus";
import { colors } from "../../utils/colors";
import { Title } from "../commoms/Title";
import PosterMovieDownload from "../moviePage/PosterMovieDownload";

export default function NewReviewModal({ visible, onClose, movie }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { user } = useAuth();

  const { rateMovie } = useMoodflix();

  const handleRating = (val) => {
    setRating(val);
  };

  const handleReview = (val) => {
    setReview(val);
  };

  const handleReviewSubmit = async () => {
    if(rating === 0 || review.length === 0) return;
    await rateMovie(user?.user_id, movie?.movie_id, rating, review);
    EventBus.emit("reviewPosted");
    onClose();
  }

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
          <ModalHeader title={"Añadir reseña"} onClose={onClose} review={review} handleReview={handleReview} handleReviewSubmit={handleReviewSubmit} />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              <ModalContent
                movie={movie}
                rating={rating}
                handleRating={handleRating}
                review={review}
                handleReview={handleReview}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
}

function ModalHeader({ title, onClose, review, handleReview, handleReviewSubmit }) {
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
      <TouchableOpacity activeOpacity={0.7} onPress={() => showCancelConfirmation(review, onClose, handleReview)}>
        <Text className="font-spaceGroteskBold text-xl text-floralWhite">
          Cancelar
        </Text>
      </TouchableOpacity>

      <Title className="">{title}</Title>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleReviewSubmit}
      >
        <Text className="font-spaceGroteskBold text-xl text-green-500">
          Subir
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function ModalContent({
  movie,
  rating,
  handleRating,
  review,
  handleReview,
}) {
  return (
    <>
      <View
        className="items-start flex-row border-b-prussianBlue border-b-[1px]"
        style={{ padding: hp("2%"), columnGap: hp("1%") }}
      >
        <PosterMovieDownload
          idMovie={movie?.id_movie}
          posterPath={movie?.poster_url}
          title={movie.title}
          posterHeight={hp("12%")}
          posterWidth={wp("16%")}
        />
        <View>
          <Text
            className="text-2xl text-jasper font-spaceGroteskBold"
            maxFontSizeMultiplier={1.3}
          >
            {movie?.title}
          </Text>
          <Text className="text-floralWhite text-lg font-spaceGroteskRegular">
            {movie?.release_date.slice(0, 4)}
          </Text>
        </View>
      </View>
      <Title
        className="text-xl font-spaceGroteskBold text-floralWhite"
        style={{ padding: hp("2%") }}
      >
        Calificar
      </Title>
      <View
        className="border-b-[1px] border-b-prussianBlue text-sla"
        style={{ paddingHorizontal: hp("2%"), paddingBottom: hp("2.5%") }}
      >
        <Rating
          size={30}
          rating={rating}
          onChange={handleRating}
          maxRating={5}
          baseColor="#94a3b8"
          fillColor={colors.jasper}
          touchColor={colors.timberwolf}
          scale={1.5}
        />
      </View>
      <View>
        <Title
          className="text-xl font-spaceGroteskBold text-floralWhite"
          style={{ padding: hp("2%") }}
        >
          Escribe una reseña
        </Title>
        <View style={{ paddingHorizontal: hp("2%") }}>
          <TextInput
            multiline
            numberOfLines={8}
            textAlignVertical="top"
            placeholder="Escribe tu reseña"
            placeholderTextColor="#ccc"
            onChangeText={handleReview}
            value={review}
            className="text-lg text-floralWhite border border-prussianBlue rounded-xl"
            style={{
              paddingStart: hp("2%"),
              height: hp("30%"),
            }}
            clearButtonMode="always"
            maxLength={1000}
          />
        </View>
      </View>
    </>
  );
}

const showCancelConfirmation = (review, onClose, handleReview) => {
  if (review.length > 0) {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancelar", "Descartar reseña"],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 0,
          title: "¿Seguro que quieres descartar la reseña?",
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            handleReview("");
            onClose();
          }
        }
      );
    } else {
      Alert.alert("¿Descartar reseña?", "Se perderá todo lo que escribiste.", [
        { text: "Cancelar", style: "cancel" },
        { text: "Descatar", style: "destructive", onPress: () => onClose() },
      ]);
    }
  } else{
      handleReview("");
      onClose();
  }
};
