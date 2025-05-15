import { LinearGradient } from "expo-linear-gradient";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";

const { width } = Dimensions.get("window");
const HEADER_IMAGE_HEIGHT = Dimensions.get("window").height / 2.7;

export const HeaderImageAnimated = ({
  backdroptUrl,
  imageScale,
  imageTranslateY,
}) => (
  <Animated.View
    style={[
      styles.headerImageContainer,
      { transform: [{ scale: imageScale }, { translateY: imageTranslateY }] },
    ]}
  >
    <Animated.Image source={{ uri: backdroptUrl }} style={styles.headerImage} />
    <LinearGradient
      colors={["transparent", colors.richBlue]}
      style={styles.gradientOverlay}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    />
  </Animated.View>
);

const styles = StyleSheet.create({
  headerImage: {
    width,
    height: HEADER_IMAGE_HEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
  },
  headerImageContainer: {
    width,
    height: HEADER_IMAGE_HEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
    overflow: "hidden",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: Dimensions.get("window").height * 0.16,
  },
});
