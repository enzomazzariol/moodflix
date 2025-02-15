package com.moodflix.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignupRequest(
        @NotBlank(message = "Nombre de usuario no puede estar vacio")
        String username,

        @Email(message = "Formato de email invalido")
        @NotBlank(message = "Email no puede estar vacio")
        String email,

        @NotBlank(message = "La contraseña no puede estar vacio")
        @Size(min = 8, max = 20, message = "La contraseña debe tener entre 6 y 20 dígitos")
        String password
        ) {

}
