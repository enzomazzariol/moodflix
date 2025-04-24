import { ScrollView, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import MockMovies from "../../lib/mocks/muchasMovies.json";
import MoviesSlider from "../home/MoviesSlider";

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
        <MoviesSlider movies={MockMovies} title="Favoritas" posterHeight={posterHeightFavoritos} posterWidth={posterWidthFavoritos} />
      </View>
    </ScrollView>
  );
}
