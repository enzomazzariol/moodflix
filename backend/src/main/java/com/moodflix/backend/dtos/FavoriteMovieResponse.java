package com.moodflix.backend.dtos;

public record FavoriteMovieResponse(
        int movie_id,
        String title,
        String poster_url
) {
}
