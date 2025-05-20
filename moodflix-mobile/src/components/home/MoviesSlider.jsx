import { FlatList, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import PosterMovie from "../commoms/PosterMovie";
import { Title } from "../commoms/Title";

// Slider de películas que renderiza una lista de posters
// Props: title de la pelicula, lista de películas, altura y anchura de los posters, estilos de título y lista
export default function MoviesSlider({ title, movies, posterHeight, posterWidth, flatlistStyles, titleStyles }) {
    return (
      <View style={{ paddingVertical: hp("1%") }}>
        <Title
          className={`font-spaceGroteskRegular`}
          style={{ ...titleStyles, fontSize: hp("2.5%") }}
        >
          {title}
        </Title>
        <FlatList
          data={movies}
          keyExtractor={(item, index) =>
            (item.id ?? item.movie_id ?? index).toString()
          }
          renderItem={({ item }) => (
            <PosterMovie
              posterPath={item.poster_path ?? item.poster_url}
              title={item.title}
              idMovie={item.id ?? item.movie_id}
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
          ListEmptyComponent={
            <Text
              style={{ color: "white", paddingHorizontal: 10 }}
              className="font-spaceGroteskRegular text-2xl"
            >
              No hay películas para mostrar.
            </Text>
          }
        />
      </View>
    );
}