package com.moodflix.backend.controller;

import com.moodflix.backend.dtos.EmotionRequest;
import com.moodflix.backend.model.Emotion;
import com.moodflix.backend.model.Movie;
import com.moodflix.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/moodflix/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovie(@PathVariable int id) {
        Movie movie = movieService.getOrFetchMovie(id);
        return ResponseEntity.ok(movie);
    }

    @PostMapping("/{movieId}/emotions")
    public ResponseEntity<?> addEmotionsToMovie(@PathVariable int movieId, @RequestBody EmotionRequest emotionRequest) {
        return movieService.addEmotionToMovie(movieId, emotionRequest.emotions());
    }
}
