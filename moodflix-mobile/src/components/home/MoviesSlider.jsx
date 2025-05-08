import { FlatList, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import PosterMovie from "../commoms/PosterMovie";
import { Title } from "../commoms/Title";

export default function MoviesSlider({ title, movies, posterHeight, posterWidth, flatlistStyles, titleStyles }) {
    return (
      <View style={{ paddingVertical: hp("1%") }}>
        <Title className={`font-spaceGroteskRegular`} style={{ ...titleStyles, fontSize: hp("2.5%") }}>{title}</Title>
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PosterMovie
              posterPath={item.poster_path}
              title={item.title}
              idMovie={item.id}
              posterHeight={posterHeight || hp("18%")}
              posterWidth={posterWidth || wp("24%")}
              accessibilityLabel={`Ver película: ${item.title}`}
            />
          )}
          contentContainerStyle={{
            ...flatlistStyles,
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