import { Animated, StyleSheet, Text } from "react-native";
//import Animated from "react-native-reanimated";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useSearchContext } from "../../context/SearchContext";
import RecentSearchText from "./recentSearchText";


export default function RecentSearchComponent() {
    const { isFocused } = useSearchContext();
    //const {animatedStyle} = useSearchBarAnimation(isFocused);
    return (
    <Animated.View style={[styles.resultsContainer]}>
      <Text className="text-2xl text-jasper font-outfitBold">
        Búsquedas recientes
      </Text>
      <RecentSearchText>Interstellar</RecentSearchText>
      <RecentSearchText>Inception</RecentSearchText>
      <RecentSearchText>Shrek</RecentSearchText>
      <RecentSearchText>Avengers</RecentSearchText>
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