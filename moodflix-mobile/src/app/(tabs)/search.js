import { Text } from "react-native";
import SearchScreen from "../../components/screens/SearchScreen";
import RecentSearchComponent from "../../components/search/recentSearchComponent";
import { useSearchContext } from "../../context/SearchContext";

export default function Search() {
  const { isFocused } = useSearchContext();

  return (
    <SearchScreen>
      {isFocused ? (
        <RecentSearchComponent />
      ) : (
        <Text className="text-stone-100 text-3xl">Search</Text>
      )}
    </SearchScreen>
  );
}
