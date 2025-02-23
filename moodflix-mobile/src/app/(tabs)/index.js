import { Text, View, TouchableOpacity } from "react-native";
import TabsScreen from "../../components/screens/TabsScreen";
import { Link } from "expo-router";

export default function Home() {
  
  return (
    <TabsScreen>
        <Text className="text-jasper font-light text-5xl">Home</Text>
        <Link href='/(auth)/login' asChild>
          <TouchableOpacity className="py-3 px-8 bg-bole rounded-sm  mt-10">
            <Text className="text-floral-white font-bold text-xl">Ir al login</Text>
          </TouchableOpacity>
        </Link>
    </TabsScreen>
  );
}
