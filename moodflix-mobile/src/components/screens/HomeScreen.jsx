import { SafeAreaView } from "react-native";

export default function HomeScreen({ children}) {
  return (
    <SafeAreaView className="flex-1 bg-richBlue">
          {children}
    </SafeAreaView>
  );
}