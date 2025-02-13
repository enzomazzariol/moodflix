package com.moodflix.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @Email(message = "Formato de email inválido")
        @NotBlank(message = "Email no puede estar vacío")
        String email,

        @NotBlank(message = "Password no puede estar vacío")
        String password
) {
}
