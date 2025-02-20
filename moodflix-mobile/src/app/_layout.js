import { Stack, router } from 'expo-router';
import { useState, useEffect, useRef } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar, Animated, Easing } from 'react-native';
import '../../global.css';

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
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  // Falta estado para autenticacion

  useEffect(() => {
    const checkAuth = async () => {
      // Simulación de carga de datos para PRUEBA
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula un delay de carga
      setIsReady(true);
    };

    checkAuth();
  }, [])

  useEffect(() => {
    if (isReady) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, 
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
        delay: 200
      }).start(async () => {
        await SplashScreen.hideAsync();
        router.replace('(tabs)');
      });
    }
  }, [isReady]);

  if(!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </Animated.View>
    </SafeAreaProvider>
  )
}