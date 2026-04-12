import { SafeAreaView, ScrollView, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default function RandomizerMovieScreen({ children }) {

  const paddingVertical = heightPercentageToDP("9%");
  return (
    <View className="flex-1 relative bg-raisinBlack">

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
