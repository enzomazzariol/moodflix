import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BgSVG from "../../../assets/test-login.svg"; // Background de la pantalla
import { Link } from "expo-router";

export default function Login() {
  
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View className="absolute">
        <BgSVG  />
      </View>

      <Text className="text-xl font-bold text-white">Login</Text>
      <Link href='/signup' asChild>
        <TouchableOpacity className="p-3 rounded-full bg-stone-500 shadow-md">
          <Text>Ir al sign up</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  )
}

const styles = {
  container: `items-center flex-1 justify-center bg-stone-900`,
  title: `text-xl font-bold text-stone-100`,
  image: 'flex-1 cover justify-center items-center',
}