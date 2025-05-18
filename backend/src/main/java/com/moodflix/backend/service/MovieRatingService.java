package com.moodflix.backend.service;

import com.moodflix.backend.dtos.MovieRatingResponse;
import com.moodflix.backend.exceptions.ApiResponse;
import com.moodflix.backend.model.Activity;
import com.moodflix.backend.model.MovieRating;
import com.moodflix.backend.model.enums.ActivityType;
import com.moodflix.backend.repositories.ActivityRepository;
import com.moodflix.backend.repositories.MovieRatingRepository;
import com.moodflix.backend.repositories.MovieRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MovieRatingService {
    private static final Logger logger = LoggerFactory.getLogger(MovieRatingService.class);
    private static final double MIN_RATING = 1.0;
    private static final double MAX_RATING = 5.0;

    private final MovieRatingRepository movieRatingRepository;
    private final MovieRepository movieRepository;
    private final ActivityRepository activityRepository;

    public MovieRatingService(MovieRatingRepository movieRatingRepository, MovieRepository movieRepository, ActivityRepository activityRepository) {
        this.movieRatingRepository = movieRatingRepository;
        this.movieRepository = movieRepository;
        this.activityRepository = activityRepository;
    }

    /**
     * Método para calificar una película o actualizar una calificación existente
     *
     * @param userId ID del usuario que realiza la calificación
     * @param movieId ID de la película que se está calificando
     * @param rating Calificación numérica
     * @param review Texto de la reseña
     * @return ResponseEntity con el resultado de la operación
     */
    public ResponseEntity<ApiResponse> rateMovie(int userId, int movieId, double rating, String review) {
        try {
            // Validación de parámetros
            if (rating < MIN_RATING || rating > MAX_RATING) {
                logger.warn("Invalid rating value {} provided by user {}", rating, userId);
                return ResponseEntity.badRequest().body(
                        new ApiResponse(HttpStatus.BAD_REQUEST.value(),
                                String.format("Rating must be between %.1f and %.1f", MIN_RATING, MAX_RATING))
                );
            }

            // Verificar que la película existe
            if (!movieRepository.existsById(movieId)) {
                logger.warn("User {} attempted to rate non-existent movie {}", userId, movieId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ApiResponse(HttpStatus.NOT_FOUND.value(), "Movie not found")
                );
            }

            boolean isUpdate = movieRatingRepository.existsRating(userId, movieId);
            int reviewId = movieRatingRepository.saveOrUpdateRating(userId, movieId, rating, review);
            // Crear un registro de actividad
            Activity activity = new Activity(userId, movieId, reviewId, ActivityType.REVIEW);
            activityRepository.saveActivity(activity);

            String message = isUpdate ? "Review actualizada con éxito" : "Review guardada con éxito";
            logger.info("User {} {} rating for movie {} with {} stars", userId,
                    isUpdate ? "updated" : "created", movieId, rating);

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ApiResponse(HttpStatus.OK.value(), message)
            );
        } catch (Exception e) {
            logger.error("Failed to rate movie {} by user {}", movieId, userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to process movie rating")
            );
        }
    }

    /**
     * Método para recuperar todas las reseñas de una película
     *
     * @param movieId ID de la película
     * @return ResponseEntity con las reseñas o mensaje de error
     */
    public ResponseEntity<?> getMovieRatings(int movieId) {
        try {
            // Verificar que la película existe
            if (!movieRepository.existsById(movieId)) {
                logger.warn("Attempted to get ratings for non-existent movie {}", movieId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ApiResponse(HttpStatus.NOT_FOUND.value(), "Movie not found")
                );
            }

            // Recuperar ratings de las peliculas y la media
            List<MovieRatingResponse> ratings = movieRatingRepository.getMovieRatings(movieId);
            double averageRating = movieRatingRepository.getAverageRating(movieId);

            Map<String, Object> response = new HashMap<>();
            response.put("ratings", ratings);
            response.put("averageRating", averageRating);

            if(ratings.isEmpty()) {
                logger.info("No ratings found for movie {}", movieId);
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ApiResponse(HttpStatus.OK.value(), "No ratings found for this movie " + ratings)
                );
            }

            logger.info("Fetched {} ratings for movie {}", ratings.size(), movieId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Failed to fetch ratings for movie {}", movieId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to retrieve movie ratings")
            );
        }
    }

    /**
     * Método para obtener el promedio de calificaciones de una película
     *
     * @param movieId ID de la película
     * @return ResponseEntity con el promedio o mensaje de error
     */
    public ResponseEntity<?> getAverageRating(int movieId) {
        try {
            // Verificar que la película existe
            if (!movieRepository.existsById(movieId)) {
                logger.warn("Attempted to get average rating for non-existent movie {}", movieId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ApiResponse(HttpStatus.NOT_FOUND.value(), "Movie not found")
                );
            }

            double avgRating = movieRatingRepository.getAverageRating(movieId);
            logger.info("Average rating for movie {} is {}", movieId, avgRating);
            return ResponseEntity.ok(avgRating);
        } catch (Exception e) {
            logger.error("Failed to fetch average rating for movie {}", movieId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to retrieve average rating")
            );
        }
    }

    /**
     * Método para eliminar la reseña de un usuario para una película
     *
     * @param userId ID del usuario
     * @param movieId ID de la película
     * @return ResponseEntity con el resultado de la operación
     */
    public ResponseEntity<?> deleteReview(int userId, int movieId) {
        try {
            // Verificar que la película existe
            if (!movieRepository.existsById(movieId)) {
                logger.warn("Attempted to delete review for non-existent movie {}", movieId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ApiResponse(HttpStatus.NOT_FOUND.value(), "Movie not found")
                );
            }

            boolean deleted = movieRatingRepository.deleteUserReview(userId, movieId);
            if (deleted) {
                logger.info("Review deleted for user {} on movie {}", userId, movieId);
                return ResponseEntity.ok( "Review deleted successfully");
            } else {
                logger.info("No review found to delete for user {} on movie {}", userId, movieId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ApiResponse(HttpStatus.NOT_FOUND.value(), "No review found for this user and movie")
                );
            }
        } catch (Exception e) {
            logger.error("Failed to delete review for user {} on movie {}", userId, movieId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to delete review")
            );
        }
    }
}
