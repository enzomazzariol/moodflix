import { SearchBar } from "@rneui/themed";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import { Title } from "../commoms/Title";

export default function CustomHeaderSearchBar() {
  const [text, setText] = useState("");

  const onChangeText = useCallback((value) => {
    setText(value);
  }, []);

  return (
    <View className="flex-col bg-raisinBlack pt-16"
    style={{ height: hp("17%") }}>
      <Title className="text-center p-0 mb-2 font-outfitSemiBold" style={{ fontSize: 24 }}>
        Buscar
      </Title>
      <SearchBar
        placeholder="Buscar películas, actores, directores..."
        onChangeText={onChangeText}
        value={text}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={{
          color: colors.floralWhite,
        }}
        cancelButtonTitle="Cancelar"
        showCancel={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    paddingHorizontal: 12,
  },
  searchBarInputContainer: {
    backgroundColor: colors.richBlue,
    height: 38,
    borderRadius: 4
  },
});
