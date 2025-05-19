import { useEffect, useState } from "react";
import { useMoodflix } from "./useMoodflix";

export function useActivity(userId) {
  const { getActivities, getActivitiesByUser, isLoading, data, error } =
    useMoodflix();
  const [activity, setActivity] = useState(null);
  const [userActivity, setUserActivity] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
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
    };

    fetchActivity();
  }, []);

  return {
    activity,
    userActivity,
    isLoading,
    error,
  };
}
