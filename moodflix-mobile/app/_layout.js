import { Stack, router } from 'expo-router';
import { useState, useEffect, useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from 'expo-splash-screen';
import '../global.css';
import { StatusBar } from 'react-native';

SplashScreen.preventAutoHideAsync();

/* Funcion para produccion
SplashScreen.setOptions({
  fade: true,
})
*/

export default function RootLayout() {
  //TODO: Obtener usuario autenticado con un useEffect
  // SI esta logeado lo redirigimos al (tabs) sino al auth (login/sign up)
  const[isReady, setIsReady] = useState(false);
  // Falta estado para autenticacion

  useEffect(() => {
    const checkAuth = async () => {
      // Simulación de carga de datos para PRUEBA
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simula un delay de carga
      setIsReady(true);
    };

    checkAuth();
  }, [])

  const OnLayoutRootView = useCallback(async () => {
    if(isReady) {
      await SplashScreen.hideAsync();
      router.replace('(tabs)')
       // router.replace(isAuthenticated ? "(tabs)" : "(auth)");
    }
  }, [isReady])

  if(!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={OnLayoutRootView}>
      <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    </SafeAreaProvider>
  )
}