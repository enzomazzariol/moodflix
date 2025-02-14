package com.moodflix.backend.service.auth;

import com.moodflix.backend.config.JwtHelper;
import com.moodflix.backend.config.UserDetailsServiceImpl;
import com.moodflix.backend.dtos.LoginAttempsDTO;
import com.moodflix.backend.dtos.LoginRequest;
import com.moodflix.backend.dtos.LoginResponse;
import com.moodflix.backend.dtos.SignupRequest;
import com.moodflix.backend.exceptions.ApiErrorResponse;
import com.moodflix.backend.exceptions.DuplicateException;
import com.moodflix.backend.model.LoginAttempts;
import com.moodflix.backend.model.User;
import com.moodflix.backend.repositories.LoginAttemptRepository;
import com.moodflix.backend.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final LoginAttemptRepository loginAttemptRepository;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, UserDetailsServiceImpl userDetailsService, LoginAttemptRepository loginAttemptRepository){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.loginAttemptRepository = loginAttemptRepository;
    }

    @Transactional
    public void signup(SignupRequest signupRequest){
        String email = signupRequest.email();
        Optional<User> existingUser = userRepository.findByEmail(email);
        if(existingUser.isPresent()) {
            throw new DuplicateException(String.format("User with the email address '%s' already exists.", email));
        }

        String hashedPassword = passwordEncoder.encode(signupRequest.password());
        User user = new User(signupRequest.username(), email, hashedPassword);
        userRepository.saveUser(user);
    }

    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
        boolean success;

        // Comprobar los intentos fallidos antes de proceder con la autenticación
        if (!checkLoginAttempts(loginRequest.emailOrUsername())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiErrorResponse(HttpStatus.FORBIDDEN.value(), "Too many failed login attempts. Please try again later."));
        }

        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.emailOrUsername());

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDetails.getUsername(), loginRequest.password())
            );
            // Generamos el token si la autenticacion es exitosa
            String token = JwtHelper.generateToken(userDetails.getUsername());
            // Registrar el intento de login exitoso
            addLoginAttempt(loginRequest.emailOrUsername(), true);
            return ResponseEntity.ok(new LoginResponse(userDetails.getUsername(), token));
        } catch (BadCredentialsException e) {

            // Registrar el intento de login fallido
            addLoginAttempt(loginRequest.emailOrUsername(), false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiErrorResponse(HttpStatus.UNAUTHORIZED.value(), "Credenciales incorrectas para usuario: " + loginRequest.emailOrUsername()));
        }
    }

    public void addLoginAttempt(String userOrEmail, boolean success) {
        LoginAttempsDTO loginAttempts = new LoginAttempsDTO(userOrEmail, success, LocalDateTime.now());
        loginAttemptRepository.add(loginAttempts);
    }

    public List<LoginAttempts> findRecentLoginAttempts(String userOrEmail) {
        return loginAttemptRepository.findRecent(userOrEmail);
    }

    public boolean checkLoginAttempts(String userOrEmail) {
        List<LoginAttempts> recentAttempts = loginAttemptRepository.findRecent(userOrEmail);
        long failedAttempts = recentAttempts.stream()
                .filter(attempt -> !attempt.getSuccess())  // Filtrar solo intentos fallidos
                .count();

        if (failedAttempts >= 5) {
            // Comprobar si han pasado 15 minutos desde el primer intento fallido
            LocalDateTime firstFailedAttemptTime = recentAttempts.get(0).getAttemptedAt();
            if (Duration.between(firstFailedAttemptTime, LocalDateTime.now()).toMinutes() < 15) {
                // Si no han pasado 15 minutos, no se permiten más intentos
                return false;
            }
        }
        return true;  // Si no hay bloqueos, permitir el intento
    }
}
