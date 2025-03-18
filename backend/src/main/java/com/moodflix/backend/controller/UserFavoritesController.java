package com.moodflix.backend.controller;

import com.moodflix.backend.dtos.FavoriteMovieRequest;
import com.moodflix.backend.service.UserFavoritesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/moodflix/favorites")
@CrossOrigin("*")
public class UserFavoritesController {

    private final UserFavoritesService userFavoritesService;

    public UserFavoritesController(UserFavoritesService userFavoritesService) {
        this.userFavoritesService = userFavoritesService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getFavorites(@PathVariable int userId) {
        return userFavoritesService.getUserFavorites(userId);
    }

    @PostMapping
    public ResponseEntity<?> addFavorites(@RequestBody FavoriteMovieRequest favoriteMovieRequest) {
        return userFavoritesService.addFavorite(favoriteMovieRequest);
    }

    @DeleteMapping
    public ResponseEntity<?> removeFavorites(@RequestBody FavoriteMovieRequest favoriteMovieRequest) {
        return userFavoritesService.removeFavorite(favoriteMovieRequest);
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkFavorite(@RequestBody FavoriteMovieRequest favoriteMovieRequest) {
        return userFavoritesService.isFavorite(favoriteMovieRequest);
    }
}
