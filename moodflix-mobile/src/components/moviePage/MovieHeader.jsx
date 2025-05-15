import {
    Animated,
    Dimensions,
    Platform,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { colors } from "../../../utils/colors";
import { Title } from "../commoms/Title";
import { BackArrowIcon, MoreIcon } from "../ui/icons";

const { width } = Dimensions.get("window");

export const MovieHeader = ({ title, opacity, onBack, onMore }) => (
  <Animated.View style={[styles.header, { opacity }]}>
    <TouchableOpacity onPress={onBack} style={styles.backButton}>
      <BackArrowIcon size={24} color={colors.floralWhite} />
    </TouchableOpacity>
    <Title
      numberOfLines={1}
      className="text-center font-spaceGroteskBold self-center"
      style={{ fontSize: 20 }}
      adjustsFontSizeToFit={true}
    >
      {title}
    </Title>
    <TouchableOpacity onPress={onMore} style={styles.backButton}>
      <MoreIcon size={24} color={colors.floralWhite} />
    </TouchableOpacity>
  </Animated.View>
);

const styles = StyleSheet.create({
  header: {
    width,
    position: "absolute",
    top: 0,
    height: Dimensions.get("window").height * 0.12,
    backgroundColor: colors.richBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    zIndex: 99,
    paddingTop: Platform.OS === "ios" ? 40 : 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.prussianBlue,
  },
  backButton: {
    padding: 10,
  },
});
