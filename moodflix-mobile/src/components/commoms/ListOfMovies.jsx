import { FlatList, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import PosterMovie from './PosterMovie';

export default function ListOfMovies({ movies, contentContainerStyle }) {
    // TODO: Arreglar tamaño de poster para tener 4 columans de posters
    return (
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id ?? item.movie_id ?? item.movieId}
        renderItem={({ item }) => (
          <PosterMovie
            posterPath={item.poster_path ?? item.poster_url}
            title={item.title}
            idMovie={item.id ?? item.movie_id ?? item.movieId}
            accessibilityLabel={`Ver película: ${item.title}`}
          />
        )}
        numColumns={4}
        contentContainerStyle={{
          paddingTop: hp("1.5%"),
          paddingHorizontal: hp("1.3%"),
          ...contentContainerStyle,
        }}
        columnWrapperStyle={{ columnGap: hp("1%") }}
        ItemSeparatorComponent={() => <View style={{ height: hp("1%") }} />}
      />
    );
}
 