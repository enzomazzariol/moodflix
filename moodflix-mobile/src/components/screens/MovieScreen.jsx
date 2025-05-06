import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function MovieScreen({ children }) {
  const insets = useSafeAreaInsets();
  return (
    <View className="bg-richBlue flex-1" style={{ paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>
      {children}
    </View>
  );
}
