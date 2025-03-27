package com.moodflix.backend.controller;

import com.moodflix.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
}
