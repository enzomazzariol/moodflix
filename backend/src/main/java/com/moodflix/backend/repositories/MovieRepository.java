package com.moodflix.backend.repositories;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moodflix.backend.exceptions.DatabaseException;
import com.moodflix.backend.model.Movie;
import com.moodflix.backend.utils.MovieRowRapper;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.moodflix.backend.model.Genre.convertGenresToJson;

@Repository
public class MovieRepository {

    private static final Logger logger = LoggerFactory.getLogger(MovieRepository.class);

    // QUERYS
    private static final String INSERT_MOVIE = """
        INSERT INTO movies (movie_id, title, description, release_date, duration, poster_url, trailer_url, file_path, genre, platforms, rating, tagline)
        VALUES (:movie_id, :title, :description, :release_date, :duration, :poster_url, :trailer_url, :file_path, :genre, :platforms, :rating, :tagline)
        ON DUPLICATE KEY UPDATE
        title = VALUES(title), description = VALUES(description), release_date = VALUES(release_date),
        duration = VALUES(duration), poster_url = VALUES(poster_url), trailer_url = VALUES(trailer_url),
        file_path = VALUES(file_path), genre = VALUES(genre), platforms = VALUES(platforms), rating = VALUES(rating), tagline = VALUES(tagline);
    """;
    private static final String SELECT_ALL = "SELECT * FROM movie_with_emotions";
    private static final String FIND_BY_ID = "SELECT * FROM movie_with_emotions WHERE movie_id = :movie_id";
    private static final String FIND_MOVIES_BY_EMOTION = "SELECT * FROM movie_with_emotions WHERE JSON_CONTAINS(emotions, JSON_OBJECT('name', :emotion_name))";
    private static final String INSERT_MOVIE_EMOTION = """
            INSERT INTO movie_emotions(movie_id, emotion_id)
            VALUES (:movie_id, :emotion_id)
            ON DUPLICATE KEY UPDATE movie_id = VALUES(movie_id), emotion_id = VALUES(emotion_id);
            """;

    private final JdbcClient jdbcClient;

    public MovieRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public void saveMovie(Movie movie) {
        try {

            long affected = jdbcClient.sql(INSERT_MOVIE)
                    .param("movie_id", movie.getMovie_id())
                    .param("title", movie.getTitle())
                    .param("description", movie.getDescription())
                    .param("release_date", movie.getRelease_date())
                    .param("duration", movie.getDuration())
                    .param("poster_url", movie.getPoster_url())
                    .param("trailer_url", movie.getTrailer_url())
                    .param("file_path", movie.getFile_path())
                    .param("genre", convertGenresToJson(movie.getGenre()))
                    .param("platforms", movie.getPlatforms() != null ? movie.getPlatforms() : "")
                    .param("rating", movie.getRating())
                    .param("tagline", movie.getTagline() != null ? movie.getTagline() : "")
                    .update();

            // Note: Since you're using ON DUPLICATE KEY UPDATE, affected might be 2 if row was updated
            // See MySQL documentation on ROW_COUNT() function behavior with ON DUPLICATE KEY
            if (affected != 1 && affected != 2) {
                logger.error("Failed to save movie with ID {}: Unexpected affected rows count: {}", movie.getMovie_id(), affected);
                throw new DatabaseException("Could not add or update movie: Unexpected database response");
            }

            logger.info("Successfully saved movie with ID: {}", movie.getMovie_id());

        } catch (DuplicateKeyException e) {
            logger.error("Failed to save movie with ID {}: Duplicate key violation", movie.getMovie_id(), e);
            throw new DatabaseException("Movie already exists with the same unique key", e);
        } catch (DataIntegrityViolationException e) {
            logger.error("Failed to save movie with ID {}: Data integrity violation", movie.getMovie_id(), e);
            throw new DatabaseException("Movie data violates database constraints", e);
        } catch (DataAccessException e) {
            logger.error("Failed to save movie with ID {}: Database access error", movie.getMovie_id(), e);
            throw new DatabaseException("Database error while saving movie", e);
        } catch (Exception e) {
            logger.error("Unexpected error saving movie with ID {}", movie.getMovie_id(), e);
            throw new DatabaseException("Unexpected error occurred while saving movie", e);
        }
    }

    public Optional<Movie> findById(int movie_id) {
        try {
            return jdbcClient.sql(FIND_BY_ID)
                    .param("movie_id", movie_id)
                    .query(new MovieRowRapper())
                    .optional();
        } catch (DataAccessException e) {
            logger.error("Failed to find movie with ID {}: Database access error", movie_id, e);
            throw new DatabaseException("Database error while finding movie", e);
        } catch (Exception e) {
            logger.error("Unexpected error finding movie with ID {}", movie_id, e);
            throw new DatabaseException("Unexpected error occurred while finding movie", e);
        }
    }

    public void addEmotionToMovie(int movie_id, int emotion_id) {
        try {
            int affected = jdbcClient.sql(INSERT_MOVIE_EMOTION)
                    .param("movie_id", movie_id)
                    .param("emotion_id", emotion_id)
                    .update();

            if (affected != 1 && affected != 2) {
                logger.warn("Unexpected result adding emotion {} to movie {}: Affected rows {}", emotion_id, movie_id, affected);
            }

            logger.info("Successfully added emotion {} to movie {}", emotion_id, movie_id);

        } catch (DataIntegrityViolationException e) {
            logger.error("Failed to add emotion {} to movie {}: Data integrity violation", emotion_id, movie_id, e);
            throw new DatabaseException("Failed to associate emotion with movie. Movie or emotion might not exist.", e);
        } catch (DataAccessException e) {
            logger.error("Database error adding emotion {} to movie {}", emotion_id, movie_id, e);
            throw new DatabaseException("Database error while adding emotion to movie", e);
        } catch (Exception e) {
            logger.error("Unexpected error adding emotion {} to movie {}", emotion_id, movie_id, e);
            throw new DatabaseException("Unexpected error occurred while adding emotion to movie", e);
        }
    }
    public List<Movie> findMoviesByEmotion(String emotion_name) {
        try {
            return jdbcClient.sql(FIND_MOVIES_BY_EMOTION)
                    .param("emotion_name", emotion_name)
                    .query(new MovieRowRapper())
                    .list();
        } catch(DataAccessException e) {
            logger.error("Failed to find movies by emotion {}: Database access error", emotion_name, e);
            throw new DatabaseException("Database error while finding movies by emotion", e);
        } catch (Exception e) {
            logger.error("Unexpected error finding movies by emotion {}", emotion_name, e);
            throw new DatabaseException("Unexpected error occurred while finding movies by emotion", e);
        }

    }
}
