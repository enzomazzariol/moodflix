import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../moodflix-mobile/src/context/AuthContext";
import MOODFLIX_API_CONFIG from "../services/apiMoodflixConfig";
import { useApiRequest } from "./useApiRequest";

export const useMoodflix = () => {
  const { setUser } = useAuth();
  const { sendRequest, isLoading, data, error } =
    useApiRequest(MOODFLIX_API_CONFIG);

  const getMovie = async (movieId) => {
    const data = await sendRequest({
      url: `/movies/${movieId}`,
      method: "GET",
    });

    return data;
  };

  const loginAuth = async (emailOrUsername, password) => {
    console.log("campos en la request", emailOrUsername, password);
    const data = await sendRequest({
      url: "/auth/login",
      method: "POST",
      data: {
        emailOrUsername,
        password,
      },
    });
    if (data.token) {
      await AsyncStorage.setItem("authToken", data.token);
      setUser({ ...data });
    }

    return data;
  };

  const registerAuth = async (username, email, password) => {
    const data = await sendRequest({
      url: "/auth/signup",
      method: "POST",
      data: {
        username,
        email,
        password,
      },
    });
    return data;
  };

  const getMovieRating = async (movieId) => {
    const data = await sendRequest({
      url: `/rating/${movieId}`,
      method: "GET",
      params: {
        movieId,
      },
    });

    return data;
  };

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
    getMovie,
    loginAuth,
    registerAuth,
    getRandomMovie,
    getMovieRating,
    isLoading,
    data,
    error,
  };
};
