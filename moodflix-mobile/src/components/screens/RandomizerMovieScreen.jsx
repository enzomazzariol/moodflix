import { SafeAreaView, ScrollView, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import BgSVG from "../../../assets/randomizer-bg.svg";

export default function RandomizerMovieScreen({ children }) {

  const paddingVertical = heightPercentageToDP("9%");
  return (
    <View className="flex-1 relative">
      {/* Fondo SVG posicionado absolutamente */}
      <View
        className="absolute top-0 left-0 right-0 bottom-0 -z-10"
      >
        <BgSVG
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        />
      </View>

      {/* Contenido encima */}
      <SafeAreaView className="flex-1 bg-transparent">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingVertical: paddingVertical }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 items-center justify-center">{children}</View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
