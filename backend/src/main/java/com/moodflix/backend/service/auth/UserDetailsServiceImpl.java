package com.moodflix.backend.service.auth;

import com.moodflix.backend.exceptions.NotFoundException;
import com.moodflix.backend.model.CustomUserDetails;
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
        return userRepository.findByEmailOrUsername(identifier)
                .map(user -> new CustomUserDetails(user))  // Aquí envuelves tu User en CustomUserDetails
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + identifier));
    }
}
