import { Image, Text } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import TabsScreen from "../../components/screens/TabsScreen";
import movieDataMock from "../../lib/mocks/movieDetails.json";

export default function RandomizerMovie() {
  const pathPoster = `https://image.tmdb.org/t/p/original${movieDataMock.poster_path}`;
  return (
    <TabsScreen>
      <Text className="text-2xl font-outfitBold text-floralWhite mb-2">
        {movieDataMock.original_title}
      </Text>

      <Image
        source={{ uri: pathPoster }}
        style={{ width: wp("50%"), height: hp("30%") }}
        className="rounded-md"
      />

      <Text className="text-base font-outfitBold text-floralWhite mb-2 text-center">
        {movieDataMock.overview}
      </Text>
    </TabsScreen>
  );
}
