package com.moodflix.backend.repositories;

import com.moodflix.backend.exceptions.DatabaseException;
import com.moodflix.backend.exceptions.NotFoundException;
import com.moodflix.backend.model.Movie;
import com.moodflix.backend.utils.MovieRowRapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class WatchlistRepository {
    private static final Logger logger = LoggerFactory.getLogger(WatchlistRepository.class);

    // QUERYS
    private static final String INSERT = "INSERT INTO watchlist (user_id, movie_id) VALUES (:user_id, :movie_id)";
    private static final String SEARCH_MOVIE_IN_WATCHLIST = "SELECT COUNT(*) FROM watchlist WHERE user_id = ? AND movie_id = ?";
    private static final String REMOVE_FROM_WATCHLIST = "DELETE FROM watchlist WHERE user_id = ? AND movie_id = ?";
    private static final String GET_MOVIE_IDS_FROM_WATCHLIST = "SELECT movie_id FROM watchlist WHERE user_id = ? ORDER BY added_at DESC";
    // MOVIE WITH EMOTION es una vista en la bd haciendo un join
    private static final String FIND_BY_ID = "SELECT * FROM movie_with_emotions WHERE movie_id = :movie_id";

    private final JdbcClient jdbcClient;

    public WatchlistRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    /**
     * Obtiene todas las películas en la watchlist del usuario
     */
    public List<Movie> getWatchlist(int user_id) {
        try {
            /**
             * Recogemos una lista de los IDs de las peliculas que estan en el watchlist del user
             * */
            List<Integer> movie_ids = jdbcClient.sql(GET_MOVIE_IDS_FROM_WATCHLIST)
                    .param(user_id)
                    .query(Integer.class)
                    .list();

            // Obtener detalles de cada película
            List<Movie> movies = new ArrayList<>();
            for (Integer id : movie_ids) {
                // Buscar la peli por ID
                Optional<Movie> movieOptional = jdbcClient.sql(FIND_BY_ID)
                        .param("movie_id", id)
                        .query(new MovieRowRapper())
                        .optional();

                movieOptional.ifPresent(movies::add);
            }

            return movies;
        } catch (EmptyResultDataAccessException e) {
            logger.warn("No watchlist found for user with ID {}", user_id);
            return new ArrayList<>();
        } catch (DataAccessException e) {
            logger.error("Failed to get watchlist for user with ID {}: Database access error", user_id, e);
            throw new DatabaseException("Error retrieving watchlist from database", e);
        } catch (Exception e) {
            logger.error("Unexpected error getting watchlist for user with ID {}", user_id, e);
            throw new DatabaseException("Unexpected error occurred while retrieving watchlist", e);
        }
    }

    /**
     * Añade una película a la watchlist del usuario
     */
    public boolean addToWatchlist(int user_id, int movie_id) {
        try {
                jdbcClient.sql(INSERT)
                    .param("user_id", user_id)
                    .param("movie_id", movie_id)
                    .update();
                return true;
        } catch (DuplicateKeyException e) {
            logger.error("Failed to save movie with ID {}: Duplicate key violation", movie_id, e);
            throw new DatabaseException("Movie already exists in the watchlist", e);
        } catch (DataIntegrityViolationException e) {
            logger.error("Failed to save movie with ID {}: Data integrity violation", movie_id, e);
            throw new DatabaseException("Movie data violates database constraints", e);
        } catch (DataAccessException e) {
            logger.error("Failed to save movie with ID {}: Database access error", movie_id, e);
            throw new DatabaseException("Database error while saving movie to watchlist", e);
        } catch (Exception e) {
            logger.error("Unexpected error saving movie with ID {} to watchlist", movie_id, e);
            throw new DatabaseException("Unexpected error occurred while saving movie to watchlist", e);
        }
    }

    /**
     * Verifica si la pelicula ya esta en el watchlist del usuario
     */
    public boolean existsInWatchlist(int user_id, int movie_id) {
        try {
            return jdbcClient.sql(SEARCH_MOVIE_IN_WATCHLIST)
                    .param(user_id)
                    .param(movie_id)
                    .query(Integer.class)
                    .single() > 0;
        } catch (EmptyResultDataAccessException e) {
            logger.warn("Error checking if movie {} exists in user {}'s watchlist: Empty result", movie_id, user_id);
            return false;
        } catch (DataAccessException e) {
            logger.error("Error checking if movie {} exists in user {}'s watchlist: Database access error", movie_id, user_id, e);
            throw new DatabaseException("Database error while checking movie in watchlist", e);
        } catch (Exception e) {
            logger.error("Unexpected error checking if movie {} exists in user {}'s watchlist", movie_id, user_id, e);
            throw new DatabaseException("Unexpected error occurred while checking movie in watchlist", e);
        }
    }

    /**
     * Elimina una película de la watchlist del usuario
     */
    public boolean removeFromWatchlist(int user_id, int movie_id) {
        try {
            long affected = jdbcClient.sql(REMOVE_FROM_WATCHLIST)
                    .param(user_id)
                    .param(movie_id)
                    .update();

            if (affected == 0) {
                logger.warn("Movie with ID {} not found in user {}'s watchlist", movie_id, user_id);
                throw new NotFoundException("Movie with ID " + movie_id + " not found in user's watchlist");
            }

            logger.info("Successfully removed movie with ID {} from user {}'s watchlist", movie_id, user_id);
            return true;

        } catch (NotFoundException e) {
            // Ya se ha logueado arriba, solo re-lanzamos
            throw e;
        } catch (DataAccessException e) {
            logger.error("Failed to remove movie with ID {} from user {}'s watchlist: Database access error", movie_id, user_id, e);
            throw new DatabaseException("Database error while removing movie from watchlist", e);
        } catch (Exception e) {
            logger.error("Unexpected error removing movie with ID {} from user {}'s watchlist", movie_id, user_id, e);
            throw new DatabaseException("Unexpected error occurred while removing movie from watchlist", e);
        }
    }

}