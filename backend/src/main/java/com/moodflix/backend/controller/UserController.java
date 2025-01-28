package com.moodflix.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/moodflix")
public class UserController {

    @GetMapping
    public ResponseEntity<?> getHealth(){
        return ResponseEntity.ok("Moodflix API is running!");
    }
}
