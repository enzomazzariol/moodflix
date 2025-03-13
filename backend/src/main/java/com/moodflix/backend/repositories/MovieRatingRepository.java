package com.moodflix.backend.repositories;

import com.moodflix.backend.exceptions.DatabaseException;
import com.moodflix.backend.model.MovieRating;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class MovieRatingRepository {

    private static final Logger logger = LoggerFactory.getLogger(MovieRatingRepository.class);

    // QUERYS
    private static final String ADD_OR_UPDATE_RATING = """
          INSERT INTO movie_ratings (user_id, movie_id, rating, review) VALUES
          (:user_id, :movie_id, :rating, :review) ON DUPLICATE KEY UPDATE rating = VALUES(rating), review = VALUES(review)
          """;
    private static final String GET_MOVIE_RATINGS = "SELECT * FROM movie_ratings WHERE movie_id = :movie_id";
    private static final String GET_AVERAGE_RATING = "SELECT COALESCE(AVG(rating), 0) FROM movie_ratings WHERE movie_id = :movie_id";
    private static final String DELETE_USER_REVIEW = "DELETE FROM movie_ratings WHERE user_id = :user_id AND movie_id = :movie_id";
    private static final String CHECK_RATING_EXISTS = "SELECT COUNT(*) FROM movie_ratings WHERE user_id = :user_id AND movie_id = :movie_id";

    private final JdbcClient jdbcClient;

    public MovieRatingRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    /**
     * Guarda o actualiza una calificación y reseña de película
     *
     * @param userId ID del usuario que realiza la calificación
     * @param movieId ID de la película que se está calificando
     * @param rating Calificación numérica (entre 1.0 y 5.0)
     * @param review Texto de la reseña
     * @throws DatabaseException Si ocurre un error en la base de datos
     */
    public void saveOrUpdateRating(int userId, int movieId, double rating, String review) {
        try {
            jdbcClient.sql(ADD_OR_UPDATE_RATING)
                    .param("user_id", userId)
                    .param("movie_id", movieId)
                    .param("rating", rating)
                    .param("review", review)
                    .update();
            logger.info("Rating saved/updated for user {} on movie {}", userId, movieId);
        } catch (Exception e) {
            logger.error("Failed to save/update rating for user {} on movie {}", userId, movieId, e);
            throw new DatabaseException("Could not save or update movie rating");
        }
    }

    /**
     * Obtiene todas las calificaciones para una película
     *
     * @param movieId ID de la película
     * @return Lista de calificaciones
     * @throws DatabaseException Si ocurre un error en la base de datos
     */
    public List<MovieRating> getMovieRatings(int movieId) {
        try {
            return jdbcClient.sql(GET_MOVIE_RATINGS)
                    .param("movie_id", movieId)
                    .query(MovieRating.class)
                    .list();
        } catch (Exception e) {
            logger.error("Failed to fetch ratings for movie {}", movieId, e);
            throw new DatabaseException("Could not retrieve movie ratings");
        }
    }

    /**
     * Obtiene la calificación promedio de una película
     *
     * @param movieId ID de la película
     * @return Calificación promedio (0.0 si no hay calificaciones)
     * @throws DatabaseException Si ocurre un error en la base de datos
     */
    public double getAverageRating(int movieId) {
        try {
            return jdbcClient.sql(GET_AVERAGE_RATING)
                    .param("movie_id", movieId)
                    .query(Double.class)
                    .optional()
                    .orElse(0.0);
        } catch (Exception e) {
            logger.error("Failed to fetch average rating for movie {}", movieId, e);
            throw new DatabaseException("Could not retrieve average movie rating");
        }
    }

    /**
     * Elimina la reseña de un usuario para una película
     *
     * @param userId ID del usuario
     * @param movieId ID de la película
     * @return true si se eliminó una reseña, false si no existía ninguna
     * @throws DatabaseException Si ocurre un error en la base de datos
     */
    public boolean deleteUserReview(int userId, int movieId) {
        try {
            int rowsAffected = jdbcClient.sql(DELETE_USER_REVIEW)
                    .param("user_id", userId)
                    .param("movie_id", movieId)
                    .update();

            if (rowsAffected > 0) {
                logger.info("Deleted review for user {} on movie {}", userId, movieId);
                return true;
            } else {
                logger.warn("No review found for user {} on movie {}", userId, movieId);
                return false;
            }
        } catch (Exception e) {
            logger.error("Failed to delete review for user {} on movie {}", userId, movieId, e);
            throw new DatabaseException("Could not delete movie review");
        }
    }

    /**
     * Verifica si ya existe una calificación para la película por parte del usuario
     *
     * @param userId ID del usuario
     * @param movieId ID de la película
     * @return true si ya existe una calificación, false en caso contrario
     * @throws DatabaseException Si ocurre un error en la base de datos
     */
    public boolean existsRating(int userId, int movieId) {
        try {
            Integer count = jdbcClient.sql(CHECK_RATING_EXISTS)
                    .param("user_id", userId)
                    .param("movie_id", movieId)
                    .query(Integer.class)
                    .single();
            return count != null && count > 0;
        } catch (Exception e) {
            logger.error("Failed to check if rating exists for user {} on movie {}", userId, movieId, e);
            throw new DatabaseException("Could not check if rating exists");
        }
    }
}