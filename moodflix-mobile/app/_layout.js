import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  //TODO: Obtener usuario autenticado con un useEffect
  // SI esta logeado lo redirigimos al (tabs) sino al auth (login/sign up)
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('login')
    }, 2000)
  }, [])

  return (
    <Stack>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  )
}