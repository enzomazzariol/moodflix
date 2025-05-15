import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const isAuthenticated = !!user; 
    const [currentEmotion, setCurrentEmotion] = useState(null); // Initialize currentEmotion state
    const [location, setLocation] = useState(null);
    const [favoriteGenre, setFavoriteGenre] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const restoreSession = async () => {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          // Si tienes un endpoint tipo /me, podrías pedir los datos del usuario
        }
      };

      restoreSession();
    }, []);

    const logout = async () => {
        console.log("sesion cerrada")
      await AsyncStorage.removeItem("authToken");
      setUser(null);
      router.push("/(auth)/login");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, logout, currentEmotion, setCurrentEmotion, location, setLocation, favoriteGenre, setFavoriteGenre }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);