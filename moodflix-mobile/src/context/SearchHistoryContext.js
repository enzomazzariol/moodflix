// SearchHistoryContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const SearchHistoryContext = createContext();

export const SearchHistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const stored = await AsyncStorage.getItem("recentSearches");
        const parsed = stored ? JSON.parse(stored) : [];
        setHistory(parsed);
      } catch (err) {
        console.log("Error cargando historial de búsqueda", err);
      }
    };
    loadHistory();
  }, []);

  const saveSearchToHistory = async (query) => {
    if (query.trim().length === 0) return;
    try {
      setHistory((currentHistory) => {
        const filtered = currentHistory.filter((q) => q !== query);
        const updated = [query, ...filtered].slice(0, 10);
        AsyncStorage.setItem("recentSearches", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.log("Error guardando historial de búsqueda", err);
    }
  };

  const deleteSearchFromHistory = async (query) => {
    try {
      setHistory((currentHistory) => {
        const filtered = currentHistory.filter((q) => q !== query);
        AsyncStorage.setItem("recentSearches", JSON.stringify(filtered));
        return filtered;
      });
    } catch (err) {
      console.log("Error eliminando búsqueda del historial", err);
    }
  };

  return (
    <SearchHistoryContext.Provider
      value={{ history, saveSearchToHistory, deleteSearchFromHistory }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
};

export const useSearchHistory = () => {
  const context = useContext(SearchHistoryContext);
  if (!context) {
    throw new Error(
      "useSearchHistory debe usarse dentro de un SearchHistoryProvider"
    );
  }
  return context;
};
