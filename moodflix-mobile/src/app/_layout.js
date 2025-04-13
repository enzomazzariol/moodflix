import * as Font from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import { SearchProvider } from "../context/SearchContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Outfit-Regular": require("../../assets/fonts/Outfit-Regular.ttf"),
      "Outfit-Bold": require("../../assets/fonts/Outfit-Bold.ttf"),
      "Outfit-Light": require("../../assets/fonts/Outfit-Light.ttf"),
      "Outfit-Black": require("../../assets/fonts/Outfit-Black.ttf"),
      "Outfit-SemiBold": require("../../assets/fonts/Outfit-SemiBold.ttf"),
      "Outfit-Thin": require("../../assets/fonts/Outfit-Thin.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    const prepareApp = async () => {
      // Simulación de carga (puedes cargar fuentes, datos, etc.)
      loadFonts();
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
      <SearchProvider>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SearchProvider>
    </SafeAreaProvider>
  );
}
