import { SearchBar } from "@rneui/themed";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSearchContext } from "../../context/SearchContext";
import { colors } from "../../utils/colors";
import { Title } from "../commoms/Title";

export default function CustomHeaderSearchBar() {
  const { searchText, setSearchText, setIsFocused } = useSearchContext();

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
        placeholder="Buscar películas, actores, directores..."
        onChangeText={onChangeText}
        value={searchText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
