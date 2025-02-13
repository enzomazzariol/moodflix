package com.moodflix.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/moodflix")
public class UserController {

    @GetMapping("/getApp")
    public ResponseEntity<?> getHealth(Principal principal){
        return ResponseEntity.ok("Moodflix API is running! " + principal.getName());
    }
}
