import { View, Text } from "react-native";
import TabsScreen from "../../components/screens/TabsScreen";

export default function Home() {
  return (
    <TabsScreen>
      <Text className="text-stone-100 text-3xl">Home</Text>
    </TabsScreen>
  )
}