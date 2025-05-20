import AsyncStorage from "@react-native-async-storage/async-storage";

export const getRecentSearches = async () => {
  try {
    const stored = await AsyncStorage.getItem("recentSearches");
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("Error cargando historial de búsqueda", err);
    return [];
  }
};
