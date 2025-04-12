import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BgSVG from "../../../assets/randomizer-bg.svg";

export default function RandomizerMovieScreen({ children }) {
  return (
    <View className="flex-1 relative">
      {/* Fondo SVG posicionado absolutamente */}
      <View
        className="absolute top-0 left-0 right-0 bottom-0 -z-10"
        style={{ position: "absolute" }}
      >
        <BgSVG
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        />
      </View>

      {/* Contenido encima */}
      <SafeAreaView className="flex-1 items-center bg-transparent">
        {children}
      </SafeAreaView>
    </View>
  );
}
