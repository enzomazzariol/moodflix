import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../../utils/colors";
import { BackArrowIcon, MoreIcon } from "../ui/icons";

export const FloatingButtons = ({ onBack, onMore }) => (
  <>
    <TouchableOpacity style={styles.backButton} onPress={onBack}>
      <BackArrowIcon size={24} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.moreButton} onPress={onMore}>
      <MoreIcon size={24} color={colors.floralWhite} />
    </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    left: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
  },
  moreButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    right: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
  },
});
