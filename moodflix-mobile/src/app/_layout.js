import * as Font from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import { AuthProvider } from "../context/AuthContext";
import { SearchProvider } from "../context/SearchContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Outfit-Regular": require("../../assets/fonts/Outfit-Regular.ttf"),
      "Outfit-Bold": require("../../assets/fonts/Outfit-Bold.ttf"),
      "Outfit-Light": require("../../assets/fonts/Outfit-Light.ttf"),
      "Outfit-Black": require("../../assets/fonts/Outfit-Black.ttf"),
      "Outfit-SemiBold": require("../../assets/fonts/Outfit-SemiBold.ttf"),
      "Outfit-Thin": require("../../assets/fonts/Outfit-Thin.ttf"),
      "SpaceGrotesk-Regular": require("../../assets/fonts/SpaceGrotesk-Regular.ttf"),
      "SpaceGrotesk-Bold": require("../../assets/fonts/SpaceGrotesk-Bold.ttf"),
      "SpaceGrotesk-Light": require("../../assets/fonts/SpaceGrotesk-Light.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await loadFonts();
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.log("Error cargando la app", error);
      } finally {
        setIsReady(true);
      }
    };

    prepareApp();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady || !fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <AuthProvider>
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
            <Stack.Screen
              name="(onboarding)"
              options={{ headerShown: false }}
            />
          </Stack>
        </SearchProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
