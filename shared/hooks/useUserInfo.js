import { useEffect, useState } from "react";
import { useMoodflix } from "./useMoodflix";

export function useUserInfo(userId) {
  const { getUserById, isLoading, data, error } = useMoodflix();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserById(userId);
        setUserInfo(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return {
    userInfo,
    isLoading,
    error,
  };
}
