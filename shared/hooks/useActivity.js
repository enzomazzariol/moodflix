import { useCallback, useEffect, useState } from "react";
import { useMoodflix } from "./useMoodflix";

export function useActivity(userId) {
  const { getActivities, getActivitiesByUser } = useMoodflix();
  const [activity, setActivity] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivity = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getActivities();
      let userData;

      try {
        userData = await getActivitiesByUser(userId);
        if (!Array.isArray(userData)) {
          userData = [];
        }
      } catch (userErr) {
        userData = [];
      }

      setActivity(Array.isArray(data) ? data : []);
      setUserActivity(userData);
    } catch (err) {
      setError(err);
      setActivity([]);
      setUserActivity([]);
    } finally {
      setIsLoading(false);
    }
  }, [getActivities, getActivitiesByUser, userId]);

  useEffect(() => {
    if (!userId) return;
    fetchActivity();
  }, []);

  return {
    activity,
    userActivity,
    isLoading,
    error,
    refetch: fetchActivity,
  };
}
