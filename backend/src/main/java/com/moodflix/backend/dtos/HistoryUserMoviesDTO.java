package com.moodflix.backend.dtos;

public record HistoryUserMoviesDTO(
        int movieId, String title, String poster_url, String watchedAt
) {
}
