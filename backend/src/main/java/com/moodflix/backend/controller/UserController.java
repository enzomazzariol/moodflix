package com.moodflix.backend.controller;

import com.moodflix.backend.dtos.UserDTO;
import com.moodflix.backend.model.CustomUserDetails;
import com.moodflix.backend.model.User;
import com.moodflix.backend.service.UserService;
import com.moodflix.backend.service.auth.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/moodflix")
@CrossOrigin("*")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getApp")
    public ResponseEntity<?> getHealth(){
        return ResponseEntity.ok("Moodflix API is running!");
    }

    /**
     * Endpoint para obtener a todos los usuarios
     */
    @GetMapping("/users")
    public ResponseEntity<?> getUsers() {
        return userService.getUsers();
    }

    /**
     * Endpoint para obtener a un usuario por ID
     */
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUsers(@PathVariable int id) {
        return userService.getUserById(id);
    }

    /**
     * Endpoint para obtener la info del usuario con token
     */
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Object principal = authentication.getPrincipal();

        if(!(principal instanceof CustomUserDetails)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        CustomUserDetails userDetails = (CustomUserDetails) principal;
        User user = userDetails.getUser();

        UserDTO userDTO = new UserDTO(user.getUser_id(), user.getUsername(), user.getEmail(), user.getAvatar_url());
        return ResponseEntity.ok(userDTO);
    }
}
