import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useMoviesByGenre } from "../../../../../shared/hooks/useMoviesByGenre";
import PosterMovie from "../../../components/commoms/PosterMovie";
import Title from "../../../components/commoms/Title";
import SearchScreen from "../../../components/screens/SearchScreen";
import { colors } from "../../../utils/colors";

export default function GenreMovies() {
  const { id, name } = useLocalSearchParams();
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const onEndReachedCalledDuringMomentum = useRef(false);

  const {
    movies: moviesByGenre,
    fetchMore,
    isLoading,
    error,
    hasMore,
    hasInitiallyLoaded,
  } = useMoviesByGenre({ genreId: id });

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [navigation, name]);

  const handleEndReached = useCallback(() => {
    if (!onEndReachedCalledDuringMomentum.current && hasMore && !isLoading) {
      fetchMore();
      onEndReachedCalledDuringMomentum.current = true;
    }
  }, [fetchMore, hasMore, isLoading]);

  // Mostrar pantalla de carga solo durante la carga inicial
  if (!hasInitiallyLoaded && isLoading) {
    return (
      <SearchScreen>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.floralWhite} />
        </View>
      </SearchScreen>
    );
  }

  // Mostrar mensaje de error si hay algún problema
  if (error) {
    return (
      <SearchScreen>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Title>Ocurrió un error al cargar las películas</Title>
        </View>
      </SearchScreen>
    );
  }

  return (
    <SearchScreen>
      <FlatList
        ref={flatListRef}
        data={moviesByGenre}
        keyExtractor={(item) => item.id.toString()}
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
          paddingHorizontal: hp("1.3%"),
        }}
        columnWrapperStyle={{ columnGap: hp("1%") }}
        ItemSeparatorComponent={() => <View style={{ height: hp("1%") }} />}
        ListFooterComponent={() => (isLoading ? <RenderFooter /> : null)}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        onEndReached={handleEndReached}
      />
    </SearchScreen>
  );
}

function RenderFooter() {
  return (
    <View style={{ paddingVertical: hp("2%") }}>
      <ActivityIndicator size="large" color={colors.floralWhite} />
    </View>
  );
}
