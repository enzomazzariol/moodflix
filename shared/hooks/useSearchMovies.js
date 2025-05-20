import { useEffect, useState } from "react";
import { useSearchContext } from "../../moodflix-mobile/src/context/SearchContext";
import { useSearchHistory } from "../../moodflix-mobile/src/context/SearchHistoryContext";
import { useTMDB } from "./useTMDB";

export const useSearchMovies = () => {
  const { searchText } = useSearchContext();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searchMovies } = useTMDB();
  const { saveSearchToHistory } = useSearchHistory();

  useEffect(() => {
    const saveHistory = async () => {
      if (searchText.trim().length >= 3) {
        await saveSearchToHistory(searchText.trim());
      }
    };

    const handler = setTimeout(saveHistory, 1000);

    return () => clearTimeout(handler);
  }, [searchText]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchText.trim().length === 0) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const data = await searchMovies(searchText);
        setResults(data?.results || []);
      } catch (err) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchData, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  return { results, loading };
};
