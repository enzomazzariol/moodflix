import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ children}) {
  return (
    <SafeAreaView className="flex-1 bg-richBlue" edges={["top"]}>
      {children}
    </SafeAreaView>
  );
}