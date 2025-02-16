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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    private final JwtHelper jwtHelper;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, UserDetailsServiceImpl userDetailsService, LoginAttemptRepository loginAttemptRepository, JwtHelper jwtHelper){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.loginAttemptRepository = loginAttemptRepository;
        this.jwtHelper = jwtHelper;
    }

    @Transactional
    public void signup(SignupRequest signupRequest){
        String email = signupRequest.email();
        String username = signupRequest.username();

        if(userRepository.findByEmail(email).isPresent()){
            throw new DuplicateException(String.format("El correo '%s' ya está en uso.", email));
        }

        if(userRepository.findByUsername(username).isPresent())
            throw new DuplicateException(String.format("El nombre de usuario '%s' ya está en uso.", username));

        String hashedPassword = passwordEncoder.encode(signupRequest.password());
        User user = new User(signupRequest.username(), email, hashedPassword);
        userRepository.saveUser(user);
    }

    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
        String user = loginRequest.emailOrUsername();

        // Comprobar los intentos fallidos antes de proceder con la autenticación
        if (!checkLoginAttempts(user)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiErrorResponse(HttpStatus.FORBIDDEN.value(), "Muchos intentos de login. Por favor intentalo más tarde."));
        }
        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(user);

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDetails.getUsername(), loginRequest.password())
            );
            // Generamos el token si la autenticacion es exitosa
            String token = jwtHelper.generateToken(userDetails.getUsername());

            // Registrar el intento de login exitoso
            addLoginAttempt(user, true);
            // Limpiar intentos fallidos
            loginAttemptRepository.clearFailedAttempts(user);

            return ResponseEntity.ok(new LoginResponse(userDetails.getUsername(), token));
        }
        catch (UsernameNotFoundException e) {
            // Registrar intento fallido si el usuario no existe
            addLoginAttempt(loginRequest.emailOrUsername(), false);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiErrorResponse(HttpStatus.NOT_FOUND.value(), "Usuario no existe: " + loginRequest.emailOrUsername()));
        }
        catch (BadCredentialsException e) {
            // Registrar el intento de login fallido
            addLoginAttempt(user, false);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiErrorResponse(HttpStatus.BAD_REQUEST.value(), "Contraseña incorrecta"));
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

        // Filtrar intentos fallidos en los últimos 15 minutos
        LocalDateTime fifteenMinutesAgo = LocalDateTime.now().minusMinutes(15);
        long failedAttempts = recentAttempts.stream()
                .filter(attempt -> !attempt.getSuccess() && attempt.getAttemptedAt().isAfter(fifteenMinutesAgo))
                .count();

        return failedAttempts < 5; // Permitir si hay menos de 5 intentos fallidos en los últimos 15 min
    }
}
