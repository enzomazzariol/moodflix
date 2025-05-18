package com.moodflix.backend.controller.auth;

import com.moodflix.backend.config.JwtHelper;
import com.moodflix.backend.dtos.LoginRequest;
import com.moodflix.backend.dtos.LoginResponse;
import com.moodflix.backend.dtos.SignupRequest;
import com.moodflix.backend.exceptions.ApiResponse;
import com.moodflix.backend.model.User;
import com.moodflix.backend.service.UserService;
import com.moodflix.backend.service.auth.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/moodflix/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @Autowired
    JwtHelper jwtHelper;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest signupRequest) {
        authService.signup(signupRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ApiResponse(HttpStatus.CREATED.value(), "Usuario creado exitosamente")
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        return authService.authenticateUser(loginRequest);
    }

    @PostMapping("/refresh-token")
    @PreAuthorize("isAuthenticated()")  // Asegura que el usuario esté autenticado
    public ResponseEntity<?> refreshToken(@RequestBody String refreshToken){
        if(jwtHelper.validateRefreshToken(refreshToken)) {
            String username = jwtHelper.extractUsername(refreshToken);
            String newAccessToken = jwtHelper.generateToken(username);
            String newRefreshToken = jwtHelper.generateRefreshToken(username);
            return ResponseEntity.ok(new LoginResponse(null, newAccessToken, newRefreshToken));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Refresh token inválido o expirado");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        /*
        *
        // QUITAR ESTA COMPROBACION MAS ADELANTE CUANDO SE ACTIVE EL FILTRO DE SECURITY
        *
        */
        // Verificamos que la cabecera no venga vacía
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido");
        }

        // Extraer el token quitando el prefijo "Bearer "
        String token = authHeader.substring(7);

        return authService.logout(token);

    }
}
