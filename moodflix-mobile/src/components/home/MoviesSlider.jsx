import { FlatList, View } from "react-native";
import {
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Title } from "../commoms/Title";
import PosterMovie from "./PosterMovie";

export default function MoviesSlider({ title, movies, onMoviePress}) {
    return (
      <View style={{ paddingVertical: hp("1%") }}>
        <Title className="text-2xl font-outfitLight">{title}</Title>
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PosterMovie
              posterPath={item.poster_path}
              title={item.title}
              onPress={() => onMoviePress && onMoviePress(item)}
              accessibilityLabel={`Ver película: ${item.title}`}
            />
          )}
          contentContainerStyle={{
            paddingVertical: hp("1.7%"),
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