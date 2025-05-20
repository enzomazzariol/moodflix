import AsyncStorage from "@react-native-async-storage/async-storage";
import MOODFLIX_API_CONFIG from "../services/apiMoodflixConfig";
import { useApiRequest } from "./useApiRequest";

export const useMoodflix = () => {
  const { sendRequest, isLoading, data, error } =
    useApiRequest(MOODFLIX_API_CONFIG);

  const getMovie = async (movieId) => {
    const data = await sendRequest({
      url: `/movies/${movieId}`,
      method: "GET",
    });

    return data;
  };

  const getUserDetails = async () => {
    const data = await sendRequest({
      url: "/me",
      method: "GET",
    });
    return data;
  };

  const loginAuth = async (emailOrUsername, password) => {
    const data = await sendRequest({
      url: "/auth/login",
      method: "POST",
      data: {
        emailOrUsername,
        password,
      },
    });
    if (data.token || data.refreshToken) {
      await AsyncStorage.setItem("authToken", data.token);
      await AsyncStorage.setItem("refreshToken", data.refreshToken);
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
    index,
  }) => {
    try {
      const data = await sendRequest({
        url: "/movies/random",
        method: "GET",
        params: {
          genre: genre ?? "",
          decade: decade ?? "",
          provider: streaming ?? "",
          minRating: rating,
          maxDuration: duration,
          index: index,
        },
      });
      return data;
    } catch (error) {
      console.log("Error obteniendo película randomizada:", error);
      return null;
    }
  };

  const getMovieStatus = async (userId, movieId) => {
    const data = await sendRequest({
      url: `/movies/status/${userId}/${movieId}`,
      method: "GET",
    });

    return data;
  };

  const updateMovieStatus = async (
    userId,
    movieId,
    favorite,
    viewed,
    inWatchlist
  ) => {
    const data = await sendRequest({
      url: `/movies/status`,
      method: "PATCH",
      data: {
        userId,
        movieId,
        favorite,
        viewed,
        inWatchlist,
      },
    });
    return data;
  };

  const getUserFavorites = async (userId) => {
    const data = await sendRequest({
      url: `/favorites/${userId}`,
      method: "GET",
    });
    return data;
  };

  const getUserWatchlist = async (userId) => {
    const data = await sendRequest({
      url: `/users/${userId}/watchlist`,
      method: "GET",
    });
    return data;
  };

  const getUserWatchedMovies = async (userId) => {
    const data = await sendRequest({
      url: `/user/${userId}/watched`,
      method: "GET",
    });
    return data;
  };

  const rateMovie = async (userId, movieId, rating, review) => {
    const data = await sendRequest({
      url: `/rating`,
      method: "POST",
      data: {
        userId,
        movieId,
        rating,
        review,
      },
    });

    return data;
  };

  const getActivities = async () => {
    const data = await sendRequest({
      url: `/activity`,
      method: "GET",
    });
    return data;
  };

  const getActivitiesByUser = async (userId) => {
    const data = await sendRequest({
      url: `/activity/${userId}`,
      method: "GET",
    });
    return data;
  };

  const getUserById = async (userId) => {
    const data = await sendRequest({
      url: `/users/${userId}`,
      method: "GET",
    });
    return data;
  };

  const getUserLikedMovies = async (userId) => {
    const data = await sendRequest({
      url: `/favorites/last-liked/${userId}`,
      method: "GET",
    });
    return data;
  };

  return {
    getMovie,
    loginAuth,
    registerAuth,
    getRandomMovie,
    getMovieRating,
    getUserDetails,
    updateMovieStatus,
    getMovieStatus,
    getUserFavorites,
    getUserWatchlist,
    getUserWatchedMovies,
    rateMovie,
    getActivities,
    getActivitiesByUser,
    getUserById,
    getUserLikedMovies,
    isLoading,
    data,
    error,
  };
};
