package com.moodflix.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignupRequest(
        @NotBlank(message = "Username no puede estar vacio")
        String username,

        @Email(message = "Formato de email invalido")
        @NotBlank(message = "Email no puede estar vacio")
        String email,

        @NotBlank(message = "Password no puede estar vacio")
        @Size(min = 6, max = 20, message = "Password must be between 6 and 20 characters")
        String password
        ) {

}
