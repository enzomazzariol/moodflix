import { Text, View, TouchableOpacity } from "react-native";
import TabsScreen from "../../components/screens/TabsScreen";
import { Link } from "expo-router";

export default function Home() {
  
  return (
    <TabsScreen>
        <Text className="text-stone-100 text-3xl">Home</Text>
        <Link href='/(auth)/login' asChild>
          <TouchableOpacity className="p-3 rounded-full bg-stone-500 shadow-md">
            <Text>Ir al login</Text>
          </TouchableOpacity>
        </Link>
    </TabsScreen>
  );
}
