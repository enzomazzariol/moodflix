import { Stack } from 'expo-router';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from 'react-native';
import '../../global.css';

export default function RootLayout() {

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  )
}