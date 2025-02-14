package com.moodflix.backend.service.auth;

import com.moodflix.backend.config.JwtHelper;
import com.moodflix.backend.config.UserDetailsServiceImpl;
import com.moodflix.backend.dtos.LoginRequest;
import com.moodflix.backend.dtos.LoginResponse;
import com.moodflix.backend.dtos.SignupRequest;
import com.moodflix.backend.exceptions.ApiErrorResponse;
import com.moodflix.backend.exceptions.DuplicateException;
import com.moodflix.backend.model.User;
import com.moodflix.backend.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, UserDetailsServiceImpl userDetailsService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
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
        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.emailOrUsername());

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDetails.getUsername(), loginRequest.password())
            );

            String token = JwtHelper.generateToken(userDetails.getUsername());
            return ResponseEntity.ok(new LoginResponse(userDetails.getUsername(), token));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiErrorResponse(HttpStatus.UNAUTHORIZED.value(), "Credenciales incorrectas para usuario: " + loginRequest.emailOrUsername()));
        }
    }
}
