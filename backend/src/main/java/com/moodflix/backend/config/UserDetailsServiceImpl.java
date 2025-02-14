package com.moodflix.backend.config;

import com.moodflix.backend.exceptions.NotFoundException;
import com.moodflix.backend.model.User;
import com.moodflix.backend.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String identifier) {
        User user = userRepository.findByEmailOrUsername(identifier)
                .orElseThrow(() ->  new UsernameNotFoundException(String.format("\u001B[31m Credenciales incorrectas para usuario: %s \u001B[0m", identifier)));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .build();
    }
}
