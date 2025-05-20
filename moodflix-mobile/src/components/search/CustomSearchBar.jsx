import { SearchBar } from "@rneui/themed";
import { useCallback } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSearchContext } from "../../context/SearchContext";
import { useSearchHistory } from "../../context/SearchHistoryContext";
import { colors } from "../../utils/colors";
import { Title } from "../commoms/Title";

export default function CustomHeaderSearchBar() {
  const { searchText, setSearchText, setIsFocused } = useSearchContext();
  const { saveSearchToHistory} = useSearchHistory();
  const onChangeText = useCallback((value) => {
    setSearchText(value);
  }, []);

  return (
    <View
      className="flex-col bg-raisinBlack"
      style={{ height: hp("16%"), paddingVertical: hp("6.5%") }}
    >
      <Title
        className="text-center font-outfitSemiBold"
        style={{ fontSize: 24, padding: 0 }}
      >
        Buscar
      </Title>
      <SearchBar
        placeholder="Buscar películas..."
        onChangeText={onChangeText}
        value={searchText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
        }}
        onSubmitEditing={() => {
          if (searchText.trim().length < 3) return;
          Keyboard.dismiss();
          saveSearchToHistory(searchText); 
        }}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={{ color: colors.floralWhite }}
        cancelButtonTitle="Cancelar"
        showCancel={true}
        maxFontSizeMultiplier={1.3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    paddingHorizontal: hp("1.8%"),
  },
  searchBarInputContainer: {
    backgroundColor: colors.richBlue,
    height: hp("4.2%"),
    borderRadius: 6,
  },
  resultsContainer: {
    marginTop: 20,
    gap: 16,
    marginLeft: hp("1.2%"),
  },
});
