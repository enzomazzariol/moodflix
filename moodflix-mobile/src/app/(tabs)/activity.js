import { Link } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import TabsScreen from "../../components/screens/TabsScreen";

export default function Activity() {
  return (
    <TabsScreen>
      <Text className="text-stone-100 text-3xl">Activity</Text>
      <Link href="/(auth)/login" asChild replace>
        <TouchableOpacity className="py-3 px-8 bg-bole rounded-sm  mt-10">
          <Text className="text-floral-white font-bold text-xl font-outfitSemiBold">
            Ir al login
          </Text>
        </TouchableOpacity>
      </Link>
    </TabsScreen>
  );
}
