import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, View, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import "../../global.css";

SplashScreen.preventAutoHideAsync(); 

export default function RootLayout() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      // Simulación de carga (puedes cargar fuentes, datos, etc.)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsAuthenticated(true); 
      setIsReady(true);
    };

    prepareApp();
  }, []);

   useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
      router.replace(isAuthenticated ? "/(tabs)" : "/(auth)/login");
    }
  }, [isReady]);
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
