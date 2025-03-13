package com.moodflix.backend.controller;

import com.moodflix.backend.service.UserMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/moodflix")
@CrossOrigin(origins = "http://localhost:8081") // For development only, replace with your frontend URL in production.
public class UserMovieController {

    @Autowired
    private UserMovieService userMovieService;

    @PutMapping("user/{userId}/movies/{movieId}/setWatched")
    public ResponseEntity<?> setWatched(@PathVariable int movieId, @PathVariable int userId, @RequestParam boolean watched) {
        return userMovieService.setWatched(userId, movieId, watched);
    }

    @GetMapping("user/movies/{movieId}/watched")
    public ResponseEntity<?> hasWatched(@PathVariable int movieId, @RequestParam int userId) {
        return userMovieService.hasUserWatchedMovie(userId, movieId);
    }
}
