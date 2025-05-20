import { Animated, StyleSheet, Text } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useSearchHistory } from "../../context/SearchHistoryContext";
import RecentSearchText from "./recentSearchText";

export default function RecentSearchComponent() {
  const { history, deleteSearchFromHistory } = useSearchHistory();

  return (
    <Animated.View style={[styles.resultsContainer]}>
      {history.length > 0 && (
        <Text className="text-2xl text-jasper font-outfitBold">
          Búsquedas recientes
        </Text>
      )}
      {history.map((query, index) => (
        <RecentSearchText
          key={index}
          onDelete={() => deleteSearchFromHistory(query)}
        >
          {query}
        </RecentSearchText>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  resultsContainer: {
    marginTop: heightPercentageToDP("2%"),
    gap: 16,
    marginLeft: heightPercentageToDP("1.5%"),
  },
});
