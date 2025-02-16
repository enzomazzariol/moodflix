package com.moodflix.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "Email o username no puede estar vacío")
        String emailOrUsername,

        @NotBlank(message = "La contraseña no puede estar vacío")
        String password
) {
}
