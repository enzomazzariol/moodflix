package com.moodflix.backend.dtos;

public record FavoriteMovieRequest(
        int user_id,
        int movie_id
) {
}
