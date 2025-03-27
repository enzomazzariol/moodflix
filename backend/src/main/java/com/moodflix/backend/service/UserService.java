package com.moodflix.backend.service;

import com.moodflix.backend.dtos.UserDTO;
import com.moodflix.backend.exceptions.ApiResponse;
import com.moodflix.backend.model.User;
import com.moodflix.backend.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Metodo para devolver una lista de todos los usuarios de la BD
     * @return Lista de usuarios
     */
    public ResponseEntity<?> getUsers() {
        try {
            List<UserDTO> users = userRepository.findAll();

            if(users.isEmpty()) {
                logger.warn("No users found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ApiResponse(HttpStatus.NOT_FOUND.value(), "No users found")
                );
            }

            return ResponseEntity.ok(users);
        } catch (Exception e) {
            logger.error("Error retrieving users: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An error occurred while retrieving users")
            );
        }
    }

    /**
     * Metodo para devolver a un usuario por ID
     * @param id del usuario
     * @return Un objeto usuarioDTO
     */
    public ResponseEntity<?> getUserById(int id) {
        try {
            Optional<UserDTO> user = userRepository.findById(id);

            if(user.isPresent()) {
                return ResponseEntity.ok(user.get());
            }

            logger.warn("User not found with id: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ApiResponse(HttpStatus.NOT_FOUND.value(), "User not found")
            );
        } catch (Exception e) {
            logger.error("Error retrieving user with id: {} - {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An error occurred while retrieving user")
            );
        }
    }
}
