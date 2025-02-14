package com.moodflix.backend.controller.auth;

import com.moodflix.backend.config.JwtHelper;
import com.moodflix.backend.config.UserDetailsServiceImpl;
import com.moodflix.backend.dtos.LoginRequest;
import com.moodflix.backend.dtos.LoginResponse;
import com.moodflix.backend.dtos.SignupRequest;
import com.moodflix.backend.model.User;
import com.moodflix.backend.service.UserService;
import com.moodflix.backend.service.auth.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/moodflix/auth")
public class AuthController {

    @Autowired
    AuthService authService;


    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@Valid @RequestBody SignupRequest signupRequest) {
        authService.signup(signupRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        return authService.authenticateUser(loginRequest);
    }
}
