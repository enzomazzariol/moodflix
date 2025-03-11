package com.moodflix.backend.controller;

import com.moodflix.backend.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("moodflix/users")
public class WatchlistController {

    @Autowired
    private WatchlistService watchlistService;

    @GetMapping("/{user_id}/watchlist")
    public ResponseEntity<?> getWatchlist(@PathVariable int user_id) {
        return watchlistService.getWatchlist(user_id);
    }

    @PostMapping("/{user_id}/watchlist/{movie_id}")
    public ResponseEntity<?> addToWatchlist(@PathVariable int user_id, @PathVariable int movie_id) {
        return watchlistService.addToWatchlist(user_id, movie_id);
    }

    @GetMapping("/{user_id}/watchlist/{movie_id}")
    public ResponseEntity<?> isInWatchlist(@PathVariable int user_id, @PathVariable int movie_id) {
        return watchlistService.isInWatchlist(user_id, movie_id);
    }

    @DeleteMapping("/{user_id}/watchlist/{movie_id}")
    public ResponseEntity<?> removeFromWatchlist(@PathVariable int user_id, @PathVariable int movie_id) {
        return watchlistService.removeFromWatchlist(user_id, movie_id);
    }
}
