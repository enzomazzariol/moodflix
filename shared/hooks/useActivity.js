import { useCallback, useEffect, useState } from "react";
import { useMoodflix } from "./useMoodflix";

export function useActivity(userId) {
  const { getActivities, getActivitiesByUser } = useMoodflix();
  const [activity, setActivity] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // <-- define local
  const [error, setError] = useState(null); // <-- define local

  const fetchActivity = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getActivities();
      const userData = await getActivitiesByUser(userId);
      setActivity(data);
      setUserActivity(userData);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [getActivities, getActivitiesByUser, userId]);

  useEffect(() => {
    fetchActivity();
  }, []);

  return {
    activity,
    userActivity,
    isLoading,
    error,
    refetch: fetchActivity, // 👈 lo expones
  };
}
