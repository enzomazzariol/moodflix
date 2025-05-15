import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import { AuthProvider } from "../context/AuthContext";
import { SearchProvider } from "../context/SearchContext";

// web de la librería del async storage https://react-native-async-storage.github.io/async-storage/

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
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

        const hasSeenOnboarding = await AsyncStorage.getItem(
          "hasSeenOnboarding"
        );
        const authToken = await AsyncStorage.getItem("authToken");
        const rememberMe = await AsyncStorage.getItem("rememberMe");

        if (!hasSeenOnboarding) {
          router.replace("/(onboarding)/onboarding");
        } else if (authToken && rememberMe === "true") {
          router.replace("/(tabs)");
        } else {
          router.replace("/(auth)/login");
        }
      } catch (error) {
        console.error("Error cargando la app", error);
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
