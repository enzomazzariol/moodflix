package com.moodflix.backend.dtos;

public record MovieStatusUpdateDTO(
        Integer userId,
        Integer movieId,
        Boolean favorite,
        Boolean viewed,
        Boolean inWatchlist
) {
}
