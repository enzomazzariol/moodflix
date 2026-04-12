import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Title } from "../../components/commoms/Title";
import { colors } from "../../utils/colors";

const slides = [
  {
    key: "1",
    title: "Descubre películas",
    text: "Explora por estado de ánimo, género o lo más trending. Encuentra lo que más te apetezca en segundos.",
    image: require("../../../assets/onboarding/onboarding-8.webp"),
  },
  {
    key: "2",
    title: "Guarda tus favoritas",
    text: "Mantén todas tus películas y series favoritas organizadas en un solo lugar. Crea tu propia colección personalizada y accede rápidamente a ellas cuando más lo necesites.",
    image: require("../../../assets/onboarding/onboarding-5.webp"),
  },
  {
    key: "3",
    title: "Comparte con amigos",
    text: "Comparte tus descubrimientos y opiniones con amigos o con quienes comparten tu pasión por el cine. Crea un círculo para intercambiar recomendaciones, discutir sobre películas y dejar reseñas.",
    image: require("../../../assets/onboarding/onboarding-4.webp"),
  },
];

// Libreria de On boarding https://github.com/Jacse/react-native-app-intro-slider
export default function OnboardingScreen() {
  const router = useRouter();

  const onDone = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    router.replace("/(auth)/login");
  };

  const renderItem = ({ item }) => (
    <View className="flex-1 bg-richBlue">
      <View style={{ height: hp("65%"), position: "relative" }}>
        <Image
          source={item.image}
          style={{ width: "100%", height: "100%" }} // ¡Este es el que necesitás!
          resizeMode="cover" // o "contain", dependiendo de cómo querés mostrar la imagen
        />
        <LinearGradient
          colors={["transparent", colors.richBlue]} // Suaviza al azul oscuro
          style={{
            position: "absolute",
            bottom: 0,
            height: hp("30%"),
            width: "100%",
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.9 }}
        />
      </View>

      <View
        className="justify-center "
        style={{
          paddingStart: hp("1.5%"),
          paddingEnd: hp("3%"),
          rowGap: hp("1%"),
          top: hp("0%"),
        }}
      >
        <Title className="text-5xl font-spaceGroteskBold">{item.title}</Title>
        <Text className="text-floralWhite text-xl font-spaceGroteskRegular">
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      onDone={onDone}
      showSkipButton
      onSkip={onDone}
      renderNextButton={() => <GenericButton>Siguiente</GenericButton>}
      renderDoneButton={() => <GenericButton>Finalizar</GenericButton>}
      renderSkipButton={() => (
        <GenericButton isSkip={true}>Saltar</GenericButton>
      )}
      dotStyle={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
    />
  );
}

function GenericButton({ children, isSkip = false }) {
  return (
    <Text
      className="text-xl font-spaceGroteskBold text-floralWhite"
      style={{
        paddingTop: hp("1.4%"),
        paddingRight: hp("1%"),
        paddingLeft: isSkip ? hp("1") : 0,
      }}
    >
      {children}
    </Text>
  );
}
