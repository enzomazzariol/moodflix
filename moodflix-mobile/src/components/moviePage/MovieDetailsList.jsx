import { ScrollView, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Title } from "../commoms/Title";

export default function MovieDetailsList() {

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: hp("1%"),
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 items-center">
        <Title>Detalles de la movie</Title>
      </View>
    </ScrollView>
  );
}
