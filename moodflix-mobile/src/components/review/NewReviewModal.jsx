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
import movie from "../../lib/mocks/movieDetails.json";
import { colors } from "../../utils/colors";
import { Title } from "../commoms/Title";
import PosterMovieDownload from "../moviePage/PosterMovieDownload";

export default function NewReviewModal({ visible, onClose, movieId }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRating = (val) => {
    setRating(val);
  };

  const handleReview = (val) => {
    setReview(val);
  };

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
          <ModalHeader title={"Añadir reseña"} onClose={onClose} review={review} handleReview={handleReview} />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              <ModalContent
                movieId={movieId}
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

function ModalHeader({ title, onClose, review, handleReview }) {
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
        onPress={() => console.log("Subir")}
      >
        <Text className="font-spaceGroteskBold text-xl text-green-500">
          Subir
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function ModalContent({ movieId, rating, handleRating, review, handleReview }) {
  return (
    <>
      <View
        className="items-start flex-row border-b-prussianBlue border-b-[1px]"
        style={{ padding: hp("2%"), columnGap: hp("1%") }}
      >
        <PosterMovieDownload
          idMovie={movie.id}
          posterPath={movie.poster_path}
          title={movie.title}
          posterHeight={hp("12%")}
          posterWidth={wp("16%")}
        />
        <View>
          <Text
            className="text-2xl text-jasper font-spaceGroteskBold"
            maxFontSizeMultiplier={1.3}
          >
            {movie.title}
          </Text>
          <Text className="text-floralWhite text-lg font-spaceGroteskRegular">
            {movie.release_date.slice(0, 4)}
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
