import { ScrollView, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function PerfilView() {
  const posterHeightFavoritos = hp("16.5%");
  const posterWidthFavoritos = wp("21.5%");
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: hp("1%"),
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 items-center" style={{ paddingHorizontal: hp("1.5%") }}>
        
      </View>
    </ScrollView>
  );
}
