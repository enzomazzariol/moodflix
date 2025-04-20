import { SafeAreaView } from "react-native";

export default function ProfileScreen({ children }) {
  return (
    <SafeAreaView className="bg-richBlue flex-1">
      {children}
    </SafeAreaView>
  );
}