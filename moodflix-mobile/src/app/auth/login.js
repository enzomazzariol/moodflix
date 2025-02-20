import { View, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const url = require('../../../assets/bg-login.png');
  return (
    <ImageBackground source={url} style={{flex: 1, objectFit: 'cover'}}>
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold text-white">Login</Text>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = {
  container: `items-center flex-1 justify-center bg-stone-900`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold text-stone-100`,
  image: 'flex-1 cover justify-center items-center',
}