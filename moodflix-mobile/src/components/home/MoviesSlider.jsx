import { FlatList, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import PosterMovie from "../commoms/PosterMovie";
import { Title } from "../commoms/Title";

export default function MoviesSlider({ title, movies}) {
    return (
      <View style={{ paddingVertical: hp("1%") }}>
        <Title className="font-spaceGroteskRegular" style={{ fontSize: hp("2.5%") }}>{title}</Title>
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PosterMovie
              posterPath={item.poster_path}
              title={item.title}
              idMovie={item.id}
              posterHeight={hp("18%")}
              posterWidth={wp("24%")}
              accessibilityLabel={`Ver película: ${item.title}`}
            />
          )}
          contentContainerStyle={{
            paddingVertical: hp("1%"),
            gap: hp("1%"),
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={5}
          windowSize={3}
        />
      </View>
    );
}