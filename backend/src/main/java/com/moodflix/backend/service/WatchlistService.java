package com.moodflix.backend.service;

import com.moodflix.backend.exceptions.ApiResponse;
import com.moodflix.backend.model.Activity;
import com.moodflix.backend.model.Movie;
import com.moodflix.backend.model.enums.ActivityType;
import com.moodflix.backend.repositories.ActivityRepository;
import com.moodflix.backend.repositories.MovieRepository;
import com.moodflix.backend.repositories.WatchlistRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class WatchlistService {
    private static final Logger logger = LoggerFactory.getLogger(WatchlistService.class);

    private final WatchlistRepository watchlistRepository;
    private final MovieRepository movieRepository;
    private final TmdbApiService tmdbApiService;
    private final ActivityRepository activityRepository;

    @Autowired
    public WatchlistService(WatchlistRepository watchlistRepository, MovieRepository movieRepository, TmdbApiService tmdbApiService, ActivityRepository activityRepository) {
        this.watchlistRepository = watchlistRepository;
        this.movieRepository = movieRepository;
        this.tmdbApiService = tmdbApiService;
        this.activityRepository = activityRepository;
    }


    public ResponseEntity<?> getWatchlist(int userId) {
        try {
            List<Movie> movies = watchlistRepository.getWatchlist(userId);
            return ResponseEntity.ok(movies);
        } catch(DataAccessException e) {
            logger.error("Error getting watchlist for user {}: {}", userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al obtener la watchlist " +e.getMessage()));
        } catch(Exception e) {
            logger.error("Unexpected error getting watchlist for user {}: {}", userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<?> addToWatchlist(int userId, int movieId) {
        try {
            if (watchlistRepository.existsInWatchlist(userId, movieId)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse(HttpStatus.BAD_REQUEST.value(), "La película ya está en tu watchlist"));
            }

            Optional<Movie> movie = movieRepository.findById(movieId);
            if (movie.isEmpty()) {
                Movie newMovie = tmdbApiService.fetchMovieFromTmdb(movieId);
                movieRepository.saveMovie(newMovie);
            }

            Activity activity = new Activity();
            activity.setUser_id(userId);
            activity.setMovie_id(movieId);
            activity.setActivity_type(ActivityType.WATCHLIST);
            activityRepository.saveActivity(activity);

            boolean added = watchlistRepository.addToWatchlist(userId, movieId);
            if (!added) {
                logger.warn("Failed to add movie {} to watchlist for user {}", movieId, userId);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al añadir la película a tu watchlist"));
            }

            logger.info("Successfully added movie {} to watchlist for user {}", movieId, userId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ApiResponse(HttpStatus.OK.value(), "Película añadida correctamente a tu watchlist"));

        } catch (DataAccessException e) {
            logger.error("Error adding movie {} to watchlist for user {}: {}", movieId, userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al añadir la película a tu watchlist: " + e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error adding movie {} to watchlist for user {}: {}", movieId, userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    public ResponseEntity<?> isInWatchlist(int userId, int movieId) {
        try {
            boolean isInWatchlist = watchlistRepository.existsInWatchlist(userId, movieId);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ApiResponse(HttpStatus.OK.value(), "" + isInWatchlist));
        } catch(DataAccessException e) {
            logger.error("Error checking if movie {} is in watchlist for user {}: {}", movieId, userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al verificar la película en la watchlist " +e.getMessage()));
        } catch(Exception e) {
            logger.error("Unexpected error checking if movie {} is in watchlist for user {}: {}", movieId, userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<?> removeFromWatchlist(int userId, int movieId) {
        try {
            boolean removed = watchlistRepository.removeFromWatchlist(userId, movieId);
            if (!removed) {
                logger.warn("Failed to remove movie {} from watchlist for user {}", movieId, userId);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al eliminar la película de tu watchlist"));
            }

            activityRepository.deleteActivityByType(userId, movieId, ActivityType.WATCHLIST.getValue());

            logger.info("Successfully removed movie {} from watchlist for user {}", movieId, userId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ApiResponse(HttpStatus.OK.value(), "Película eliminada de tu watchlist correctamente"));

        } catch (DataAccessException e) {
            logger.error("Error removing movie {} from watchlist for user {}: {}", movieId, userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al eliminar la película de tu watchlist: " + e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error removing movie {} from watchlist for user {}: {}", movieId, userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

}
