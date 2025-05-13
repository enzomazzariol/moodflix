import MOODFLIX_API_CONFIG from "../services/apiMoodflixConfig";
import { useApiRequest } from "./useApiRequest";

export const useMoodflix = () => {
  const { sendRequest, isLoading, data, error } =
    useApiRequest(MOODFLIX_API_CONFIG);

  const getRandomMovie = async ({
    genre,
    decade,
    streaming,
    rating,
    duration,
  }) => {
    const data = await sendRequest({
      url: "/movies/random",
      method: "GET",
      params: {
        genre: genre ?? "",
        decade: decade ?? "",
        provider: streaming ?? "",
        minRating: rating,
        maxDuration: duration,
      },
    });
    return data;
  };
  return {
    getRandomMovie,
    isLoading,
    data,
    error,
  };
};
