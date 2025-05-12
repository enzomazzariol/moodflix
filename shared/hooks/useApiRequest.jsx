import { useCallback, useState } from "react";

// Hook Generico para realizar peticiones a la API
export function useApiRequest(client) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (config) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await client.request(config);
        setData(response.data);
        return response.data;
      } catch (err) {
        const message =
          err.response?.data?.message || err.message || "Unknown error";
        setError(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [client]
  );

  return { sendRequest, isLoading, data, error };
}
