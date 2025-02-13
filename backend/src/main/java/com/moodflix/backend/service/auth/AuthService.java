package com.moodflix.backend.service.auth;

import com.moodflix.backend.dtos.SignupRequest;
import com.moodflix.backend.model.User;
import com.moodflix.backend.repositories.UserRepository;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void signup(SignupRequest signupRequest){
        String email = signupRequest.email();
        Optional<User> existingUser = userRepository.findByEmail(email);
        if(existingUser.isPresent()) {
            throw new DuplicateKeyException(String.format("User with the email address '%s' already exists.", email));
        }

        String hashedPassword = passwordEncoder.encode(signupRequest.password());
        User user = new User(signupRequest.username(), email, hashedPassword);
        userRepository.saveUser(user);
    }
}
