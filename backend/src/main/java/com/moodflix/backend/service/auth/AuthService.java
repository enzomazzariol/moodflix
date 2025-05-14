package com.moodflix.backend.service.auth;

import com.moodflix.backend.config.JwtHelper;
import com.moodflix.backend.dtos.*;
import com.moodflix.backend.exceptions.*;
import com.moodflix.backend.model.*;
import com.moodflix.backend.model.User;
import com.moodflix.backend.repositories.*;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final UserSessionRepository userSessionRepository;
    private final JwtHelper jwtHelper;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,
                       UserDetailsServiceImpl userDetailsService, LoginAttemptRepository loginAttemptRepository,
                       UserSessionRepository userSessionRepository, JwtHelper jwtHelper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.loginAttemptRepository = loginAttemptRepository;
        this.userSessionRepository = userSessionRepository;
        this.jwtHelper = jwtHelper;
    }

    /*
     * Método para registrar un nuevo usuario.
     * @param signupRequest Los detalles de la solicitud de registro.
     */
    @Transactional
    public void signup(SignupRequest signupRequest) {
        validateDuplicateUser(signupRequest);
        User user = createUser(signupRequest);
        userRepository.saveUser(user);
    }

    /*
     * Método para autenticar un usuario mediante correo electrónico o nombre de usuario.
     * @param loginRequest Los detalles de la solicitud de login.
     * @return ResponseEntity<?> Contiene la respuesta al intento de autenticación.
     */
    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
        String user = loginRequest.emailOrUsername();
        if (!isLoginAllowed(loginRequest.emailOrUsername())) {
            return forbiddenResponse("Muchos intentos de login. Por favor intentalo más tarde.");
        }
        try {
            // Recuperar usuario
            UserDetails userDetails = userDetailsService.loadUserByUsername(user);
            // Autenticar el usuario
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDetails.getUsername(), loginRequest.password()));
            // Generar token JWT y crear sesión
            String token = jwtHelper.generateToken(userDetails.getUsername());
            createSession(userDetails.getUsername(), token);
            // registrar intento de login
            registerLoginAttempt(user, true);
            // limpiar intentos fallidos del usuario
            loginAttemptRepository.clearFailedAttempts(user);
            // devolvemos el usuario y el token generado
            return ResponseEntity.ok(new LoginResponse(userDetails.getUsername(), token));
        } catch (UsernameNotFoundException e) {
            registerLoginAttempt(loginRequest.emailOrUsername(), false);
            return notFoundResponse("Usuario no existe: " + loginRequest.emailOrUsername());
        } catch (BadCredentialsException e) {
            registerLoginAttempt(loginRequest.emailOrUsername(), false);
            return badRequestResponse("Contraseña incorrecta");
        }
    }

    /*
     * Método para validar si un correo o nombre de usuario ya está registrado.
     * @param signupRequest Los detalles de la solicitud de registro.
     */
    private void validateDuplicateUser(SignupRequest signupRequest) {
        userRepository.findByEmail(signupRequest.email()).ifPresent(user -> {
            throw new DuplicateException("El correo '" + signupRequest.email() + "' ya está en uso.");
        });
        userRepository.findByUsername(signupRequest.username()).ifPresent(user -> {
            throw new DuplicateException("El nombre de usuario '" + signupRequest.username() + "' ya está en uso.");
        });
    }

    /*
     * Método para crear un nuevo usuario con contraseña cifrada.
     * @param signupRequest Los detalles de la solicitud de registro.
     * @return User El usuario creado.
     */
    private User createUser(SignupRequest signupRequest) {
        String hashedPassword = passwordEncoder.encode(signupRequest.password());
        return new User(signupRequest.username(), signupRequest.email(), hashedPassword);
    }

    /*
     * Método para crear una nueva sesión para un usuario autenticado.
     * @param username El nombre de usuario del usuario.
     * @param token El token JWT generado para recuperar el UUID.
     */
    private void createSession(String username, String token) {
        userRepository.findByUsername(username).ifPresent(user -> {
            String uuid = jwtHelper.extractUUID(token);
            UserSession session = new UserSession(user.getUser_id(), uuid, "default_device_info");
            userSessionRepository.saveUserSession(session);
        });
    }

    /*
     * Método para registrar un intento de inicio de sesión (fallido o exitoso).
     * @param userOrEmail Correo electrónico o nombre de usuario.
     * @param success Indica si el intento fue exitoso o no.
     */
    private void registerLoginAttempt(String userOrEmail, boolean success) {
        loginAttemptRepository.add(new LoginAttempsDTO(userOrEmail, success, LocalDateTime.now()));
    }

    /*
     * Método para verificar si se permiten más intentos de inicio de sesión para un usuario.
     * @param userOrEmail Correo electrónico o nombre de usuario.
     * @return boolean Indica si se permiten más intentos.
     */
    private boolean isLoginAllowed(String userOrEmail) {
        List<LoginAttempts> attempts = loginAttemptRepository.findRecent(userOrEmail);
        long failedAttempts = attempts.stream()
                .filter(attempt -> !attempt.getSuccess() && attempt.getAttemptedAt().isAfter(LocalDateTime.now().minusMinutes(15)))
                .count();
        return failedAttempts < 5;
    }

    /*
     * Método para cerrar la sesión de un usuario.
     * @param token El token JWT del usuario a desconectar.
     */
    public ResponseEntity<?> logout(String token) {
        // Extrer el UUID de la sesión desde el token
        String uuid = jwtHelper.extractUUID(token);

        // Buscar la sesión en la base de datos
        Optional<UserSession> userSessionOptional = userSessionRepository.findBySessionToken(uuid);

        if(userSessionOptional.isEmpty()) {
            return notFoundResponse("Sesión no encontrada o ya cerrada");
        }

        // Eliminar la sesión de la base de datos
        userSessionRepository.deleteUserSession(uuid);

        // Devolver respuesta de exito
        return ResponseEntity.ok(new ApiResponse(HttpStatus.OK.value(), "Sesión cerrada exitosamente"));
    }

    /*
     * Método para generar una respuesta HTTP 403 (Forbidden).
     * @param message El mensaje de error a incluir en la respuesta.
     * @return ResponseEntity<?> La respuesta HTTP.
     */
    private ResponseEntity<?> forbiddenResponse(String message) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiResponse(HttpStatus.FORBIDDEN.value(), message));
    }

    /*
     * Método para generar una respuesta HTTP 404 (Not Found).
     * @param message El mensaje de error a incluir en la respuesta.
     * @return ResponseEntity<?> La respuesta HTTP.
     */
    private ResponseEntity<?> notFoundResponse(String message) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(HttpStatus.NOT_FOUND.value(), message));
    }

    /*
     * Método para generar una respuesta HTTP 400 (Bad Request).
     * @param message El mensaje de error a incluir en la respuesta.
     * @return ResponseEntity<?> La respuesta HTTP.
     */
    private ResponseEntity<?> badRequestResponse(String message) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(HttpStatus.BAD_REQUEST.value(), message));
    }
}
