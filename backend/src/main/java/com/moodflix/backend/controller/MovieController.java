package com.moodflix.backend.controller;

import com.moodflix.backend.dtos.EmotionRequest;
import com.moodflix.backend.dtos.MovieStatusDTO;
import com.moodflix.backend.dtos.MovieStatusUpdateDTO;
import com.moodflix.backend.exceptions.ApiResponse;
import com.moodflix.backend.model.Activity;
import com.moodflix.backend.model.Emotion;
import com.moodflix.backend.model.Movie;
import com.moodflix.backend.model.enums.ActivityType;
import com.moodflix.backend.repositories.ActivityRepository;
import com.moodflix.backend.repositories.UserFavoritesRepository;
import com.moodflix.backend.repositories.UserMovieRepository;
import com.moodflix.backend.repositories.WatchlistRepository;
import com.moodflix.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/moodflix/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @Autowired
    private UserFavoritesRepository userFavoritesRepository;

    @Autowired
    private UserMovieRepository userMovieRepository;

    @Autowired
    private WatchlistRepository watchlistRepository;

    @Autowired
    private ActivityRepository activityRepository;

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovie(@PathVariable int id) {
        Movie movie = movieService.getOrFetchMovie(id);
        return ResponseEntity.ok(movie);
    }

    @PostMapping("/{movieId}/emotions")
    public ResponseEntity<?> addEmotionsToMovie(@PathVariable int movieId, @RequestBody EmotionRequest emotionRequest) {
        return movieService.addEmotionToMovie(movieId, emotionRequest.emotions());
    }

    @GetMapping("/emotion/{emotion_name}")
    public ResponseEntity<?> getMoviesByEmotion(@PathVariable String emotion_name) {
        return movieService.getMoviesByEmotion(emotion_name);
    }

    @GetMapping("/status/{userId}/{movieId}")
    public ResponseEntity<MovieStatusDTO> getMovieStatus(
            @PathVariable int userId,
            @PathVariable int movieId){
        boolean isFav = userFavoritesRepository.isFavorite(userId, movieId);
        boolean isViewed = userMovieRepository.hasUserWatchedMovie(userId, movieId);
        boolean isInWatchlist = watchlistRepository.existsInWatchlist(userId, movieId);

        MovieStatusDTO status = new MovieStatusDTO(isFav, isViewed, isInWatchlist);
        return ResponseEntity.ok(status);
    }

    @PatchMapping("/status")
    public ResponseEntity<Void> updateMovieStatus(@RequestBody MovieStatusUpdateDTO dto) {
        int userId = dto.userId();
        int movieId = dto.movieId();

        if (dto.favorite() != null) {
            if (dto.favorite()) {
                userFavoritesRepository.addFavorite(userId, movieId);
                Activity activity = new Activity();
                activity.setUser_id(userId);
                activity.setMovie_id(movieId);
                activity.setActivity_type(ActivityType.LIKE);
                activityRepository.saveActivity(activity);
            } else {
                userFavoritesRepository.removeFavorite(userId, movieId);
                activityRepository.deleteActivityByType(userId, movieId, ActivityType.LIKE.getValue());
            }
        }

        if (dto.viewed() != null) {
            if (dto.viewed()) {
                userMovieRepository.setWatched(userId, movieId, true);
            } else {
                userMovieRepository.setWatched(userId, movieId, false);
            }
        }

        if (dto.inWatchlist() != null) {
            if (dto.inWatchlist()) {
                watchlistRepository.addToWatchlist(userId, movieId);
                Activity activity = new Activity();
                activity.setUser_id(userId);
                activity.setMovie_id(movieId);
                activity.setActivity_type(ActivityType.WATCHLIST);
                activityRepository.saveActivity(activity);
            } else {
                watchlistRepository.removeFromWatchlist(userId, movieId);
                activityRepository.deleteActivityByType(userId, movieId, ActivityType.WATCHLIST.getValue());
            }
        }

        return ResponseEntity.noContent().build();
    }
}
