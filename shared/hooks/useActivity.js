import { useEffect, useState } from "react";
import { useMoodflix } from "./useMoodflix";

export function useActivity() {
  const { getActivities, isLoading, data, error } = useMoodflix();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await getActivities();
        setActivity(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivity();
  }, []);

  return {
    activity,
    isLoading,
    error,
  };
}
