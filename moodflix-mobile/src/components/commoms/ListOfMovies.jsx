import { FlatList, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import PosterMovie from '../home/PosterMovie';

export default function ListOfMovies({ movies, contentContainerStyle }) {
    // TODO: Arreglar tamaño de poster para tener 4 columans de posters
    return (
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PosterMovie
            posterPath={item.poster_path}
            title={item.title}
            idMovie={item.id}
            accessibilityLabel={`Ver película: ${item.title}`}
          />
        )}
        numColumns={4}
        contentContainerStyle={{
          paddingTop: hp("1.5%"),
          paddingHorizontal: hp("0.5%"),
          ...contentContainerStyle
        }}
        columnWrapperStyle={{ columnGap: hp("1%") }}
        ItemSeparatorComponent={() => <View style={{ height: hp("1%") }} />}
      />
    );
}
 