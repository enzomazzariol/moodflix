package com.moodflix.backend.service;

import com.moodflix.backend.dtos.HistoryUserMoviesDTO;
import com.moodflix.backend.exceptions.ApiResponse;
import com.moodflix.backend.repositories.UserMovieRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserMovieService {

    private static final Logger logger = LoggerFactory.getLogger(UserMovieService.class);
    private final UserMovieRepository userMovieRepository;

    public UserMovieService(UserMovieRepository userMovieRepository) {
        this.userMovieRepository = userMovieRepository;
    }

    /**
     * Metodo para setear una pelicula como watched (true/false)
     *
    * */
    public ResponseEntity<?> setWatched(int userId, int movieId, boolean watched) {
        try {
            userMovieRepository.setWatched(userId, movieId, watched);
            String message = watched ? "Película marcada como vista." : "Película desmarcada como vista.";
            logger.info("User {} marked movie {} as watched: {}", userId, movieId, watched);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            logger.error("Error al actualizar estado de película para el usuario {} y película {}", userId, movieId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    /**
     * Metodo para recuperar un booleano que nos dice si el usuario ha visto
     * una pelicula
     * */
    public ResponseEntity<?> hasUserWatchedMovie(int userId, int movieId) {
        try {
            boolean watched = userMovieRepository.hasUserWatchedMovie(userId, movieId);
            logger.info("Checked watched status for user {} and movie {}: {}", userId, movieId, watched);
            return ResponseEntity.ok(watched);
        } catch (Exception e) {
            logger.error("Error al verificar si el usuario {} vio la película {}", userId, movieId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    /**
     * Metodo para recuperar las peliculas vistas del usuario / historial de peliculas vistas
     * */
    public ResponseEntity<?> getUserWatchedMovies(int userId) {
        try {
            List<HistoryUserMoviesDTO> userWatchedMovies = userMovieRepository.getUserWatchedMovies(userId);
            logger.info("Retrieved watched movies for user {}: {}", userId, userWatchedMovies);
            return ResponseEntity.ok(userWatchedMovies);
        } catch (Exception e) {
            logger.error("Error al recuperar el historial de peliculas vistas del usuario {}", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
}
