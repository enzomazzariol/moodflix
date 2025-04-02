package com.moodflix.backend.dtos;

import com.moodflix.backend.model.Movie;

import java.util.List;

public record TmdbRandomMovieResponse(
        List<Movie> results
) {
}
