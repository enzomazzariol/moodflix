package com.moodflix.backend.service;

import com.moodflix.backend.repositories.UserMovieRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
            return ResponseEntity.status(500).body("Error interno al actualizar el estado de la película.");
        }
    }

    public ResponseEntity<?> hasUserWatchedMovie(int userId, int movieId) {
        try {
            boolean watched = userMovieRepository.hasUserWatchedMovie(userId, movieId);
            logger.info("Checked watched status for user {} and movie {}: {}", userId, movieId, watched);
            return ResponseEntity.ok(watched);
        } catch (Exception e) {
            logger.error("Error al verificar si el usuario {} vio la película {}", userId, movieId, e);
            return ResponseEntity.status(500).body("Error al recuperar si el usuario ha visto una pelicula o no");
        }
    }
}
