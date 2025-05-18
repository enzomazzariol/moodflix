import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { useMoodflix } from "../../../shared/hooks/useMoodflix";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isAuthenticated = !!user;
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [location, setLocation] = useState(null);
  const [favoriteGenre, setFavoriteGenre] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // <- para controlar loading
  const router = useRouter();
  const { getUserDetails} = useMoodflix();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem(
          "hasSeenOnboarding"
        );
        const authToken = await AsyncStorage.getItem("authToken");
        const rememberMe = await AsyncStorage.getItem("rememberMe");

        if (!hasSeenOnboarding) {
          router.replace("/(onboarding)/onboarding");
          return;
        }

        if (authToken && rememberMe === "true") {
          const userData = await getUserDetails();
          if (userData) {
            setUser(userData);
            router.replace("/(tabs)");
          } else {
            await AsyncStorage.removeItem("authToken");
            router.replace("/(auth)/login");
          }
        } else {
          router.replace("/(auth)/login");
        }
      } catch (error) {
        console.log("Error restaurando sesión", error);
        router.replace("/(auth)/login");
      } finally {
        setIsAuthLoading(false);
      }
    };

    restoreSession();
  }, []);

  const logout = async () => {
    console.log("sesión cerrada");
    await AsyncStorage.removeItem("authToken");
    setUser(null);
    router.push("/(auth)/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        logout,
        currentEmotion,
        setCurrentEmotion,
        location,
        setLocation,
        favoriteGenre,
        setFavoriteGenre,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
