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
        if (err?.response) {
          const data = err.response.data;
        
          let errorMessage = "Error del servidor";
          let statusCode = err.response.status;
        
          if (Array.isArray(data.errors)) {
            // Caso de errores de validación
            errorMessage = data.errors.map(e => e.message).join("\n");
          } else {
            // Caso de error simple
            errorMessage = data?.message || "Error del servidor";
          }
        
          const customError = {
            message: errorMessage,
            statusCode,
            raw: err,
          };

          console.log("API Error in useApiRequest:", customError);
          setError(customError);
          throw customError;
        }
      } finally {
        setIsLoading(false);
      }
    },
    [client]
  );

  return { sendRequest, isLoading, data, error };
}
