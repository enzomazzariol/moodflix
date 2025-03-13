package com.moodflix.backend.repositories;

import com.moodflix.backend.exceptions.DatabaseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
public class UserMovieRepository {

    private static final Logger logger = LoggerFactory.getLogger(MovieRepository.class);

    // Query para insertar o actualizar el estado de watched
    private static final String UPSERT_USER_MOVIE = "INSERT INTO user_movies (user_id, movie_id, watched) VALUES (:user_id, :movie_id, :watched) ON DUPLICATE KEY UPDATE watched = :watched";
    // Query para obtener el estado watched de una película
    private static final String GET_USER_WATCHED_MOVIE = "SELECT watched FROM user_movies WHERE user_id = :user_id AND movie_id = :movie_id";

    private final JdbcClient jdbcClient;

    public UserMovieRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public void setWatched(int userId, int movieId, boolean watched) {
       try {
           jdbcClient.sql(UPSERT_USER_MOVIE)
                   .param("user_id", userId)
                   .param("movie_id", movieId)
                   .param("watched", watched)
                   .update();

            logger.info("Added user {} to watched movies for movie {}", userId, movieId);
        } catch (DatabaseException e) {
           logger.error("Failed to add movie into user_movie for user {} and movie {}", userId, movieId);
           throw new DatabaseException("Could not add or update movie: Unexpected database response");
       } catch (Exception e) {
           logger.error("Unexpected error getting movie with ID {}", movieId, e);
           throw new DatabaseException("Unexpected error occurred while getting movie", e);
       }
    }

    public boolean hasUserWatchedMovie(int userId, int movieId) {
        try {
            boolean watched =  jdbcClient.sql(GET_USER_WATCHED_MOVIE)
                    .param("user_id", userId)
                    .param("movie_id", movieId)
                    .query(Boolean.class)
                    .optional()
                    .orElse(false);

            if(watched) {
                logger.info("User {} has watched movie {}", userId, movieId);
                return true;
            }

            logger.info("User {} has not watched movie {}", userId, movieId);
            return false;
        } catch (DatabaseException e) {
            logger.error("Failed to get user watched movie for user {}", userId, e);
            throw new DatabaseException("Could not get user watched movie: Unexpected database response");
        } catch (Exception e) {
            logger.error("Unexpected error getting movie with ID {}", movieId, e);
            throw new DatabaseException("Unexpected error occurred while getting movie", e);
        }
    }
}
