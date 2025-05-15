import MOODFLIX_API_CONFIG from "./apiMoodflixConfig";

export const setAuthToken = (token) => {
  if (token) {
    MOODFLIX_API_CONFIG.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  } else {
    delete MOODFLIX_API_CONFIG.defaults.headers.common["Authorization"];
  }
};
