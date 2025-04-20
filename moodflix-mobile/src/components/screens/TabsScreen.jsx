import { SafeAreaView } from "react-native";

export default function TabsScreen({ children}) {
  return (
    <SafeAreaView className="bg-richBlue flex-1 justify-center items-center">
      {children}
    </SafeAreaView>
  );
}