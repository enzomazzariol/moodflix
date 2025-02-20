import { useEffect, useState, useRef } from "react";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Animated, Easing } from "react-native";

SplashScreen.preventAutoHideAsync();

/* Funcion para produccion
SplashScreen.setOptions({
  fade: true,
})
*/

export default function Index() {

//TODO: Obtener usuario autenticado con un useEffect
  // SI esta logeado lo redirigimos al (tabs) sino al auth (login/sign up)
  const router = useRouter();
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
        router.replace("/(auth)");  
        setTimeout(() => SplashScreen.hideAsync(), 100); 
      });
    }
  }, [isReady]);

  if(!isReady) {
    return null;
  }
}