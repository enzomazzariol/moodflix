import { SafeAreaView } from "react-native-safe-area-context"

export default function TabsScreen({ children}) {
  return (
    <SafeAreaView className="bg-black flex-1 justify-center items-center">
        {children}
    </SafeAreaView>
  )
}