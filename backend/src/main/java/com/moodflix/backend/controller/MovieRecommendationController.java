package com.moodflix.backend.controller;

import com.moodflix.backend.service.MovieService;
import com.moodflix.backend.service.TmdbApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/moodflix")
@CrossOrigin("*")
public class MovieRecommendationController {

    private final TmdbApiService tmdbApiService;

    private final MovieService movieService;

    @Autowired
    public MovieRecommendationController(TmdbApiService tmdbApiService, MovieService movieService) {
        this.tmdbApiService = tmdbApiService;
        this.movieService = movieService;
    }

    @GetMapping("/movies/random")
    public ResponseEntity<?> getRandomMovieRecommendation(@RequestParam(required = false, defaultValue = "") String genre,
                                                          @RequestParam(required = false, defaultValue = "") String decade,
                                                          @RequestParam(required = false, defaultValue = "") String provider,
                                                          @RequestParam double minRating,
                                                          @RequestParam int maxDuration,
                                                          @RequestParam int index) {
        return tmdbApiService.fetchRandomMovie(genre, decade, provider, minRating, maxDuration, index);
    }

    @GetMapping("/movies/emotion")
    public ResponseEntity<?> getMovieByEmotion(@RequestParam String emotion) {
        return movieService.getMovieByEmotion(emotion);
    }
}
