import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  //TODO: Obtener usuario autenticado con un useEffect
  // SI esta logeado lo redirigimos al (tabs) sino al auth (login/sign up)
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('home')
    }, 2000)
  }, [])

  return (
    <SafeAreaProvider>
      <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  )
}