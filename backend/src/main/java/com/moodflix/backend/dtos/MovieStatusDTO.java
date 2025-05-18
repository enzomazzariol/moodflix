package com.moodflix.backend.dtos;

public record MovieStatusDTO(
        boolean isFavorite,
        boolean isViewed,
        boolean isInWatchlist
) {

}