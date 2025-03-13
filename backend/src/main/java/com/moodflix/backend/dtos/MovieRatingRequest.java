package com.moodflix.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MovieRatingRequest(
        int userId,
        int movieId,
        @NotBlank(message = "El rating no debe estar vacio")
        double rating,
        @NotBlank(message = "El review no puede estar vacio")
        String review
) {
}
