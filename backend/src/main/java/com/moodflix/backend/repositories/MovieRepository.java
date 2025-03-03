package com.moodflix.backend.repositories;

import com.moodflix.backend.model.Movie;
import com.moodflix.backend.utils.MovieRowRapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import static com.moodflix.backend.model.Genre.convertGenresToJson;

@Repository
public class MovieRepository {

    // QUERYS
    private static final String INSERT_MOVIE = """
        INSERT INTO movies (movie_id, title, description, release_date, duration, poster_url, trailer_url, file_path, genre, platforms, rating, tagline)
        VALUES (:movie_id, :title, :description, :release_date, :duration, :poster_url, :trailer_url, :file_path, :genre, :platforms, :rating, :tagline)
        ON DUPLICATE KEY UPDATE
        title = VALUES(title), description = VALUES(description), release_date = VALUES(release_date),
        duration = VALUES(duration), poster_url = VALUES(poster_url), trailer_url = VALUES(trailer_url),
        file_path = VALUES(file_path), genre = VALUES(genre), platforms = VALUES(platforms), rating = VALUES(rating), tagline = VALUES(tagline);
    """;

    private static final String SELECT_ALL = "";
    private static final String FIND_BY_ID = "SELECT * FROM movies WHERE movie_id = :movie_id";
    private static final String INSERT_MOVIE_EMOTION = """
            INSERT INTO movie_emotions(movie_id, emotion_id)
            VALUES (:movie_id, :emotion_id)
            ON DUPLICATE KEY UPDATE movie_id = VALUES(movie_id), emotion_id = VALUES(emotion_id);
            """;
    private static final String FIND_MOVIES_BY_EMOTION = """
            SELECT m.* from movies m
            JOIN movie_emotions me ON m.movie_id = me.movie_id
            JOIN emotions e ON me.emotion_id = e.emotion_id
            WHERE e.name = :emotion_name
            """;

    private final JdbcClient jdbcClient;

    public MovieRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public void saveMovie(Movie movie) {
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
                .param("platforms", movie.getPlatforms())
                .param("rating", movie.getRating())
                .param("tagline", movie.getTagline())
                .update();

        if (affected != 1) {
            throw new RuntimeException("Could not add movie");
        }
    }

    public Optional<Movie> findById(int movie_id) {
        return jdbcClient.sql(FIND_BY_ID)
                .param("movie_id", movie_id)
                .query(new MovieRowRapper())
                .optional();
    }

    public void addEmotionToMovie(int movie_id, int emotion_id) {
        jdbcClient.sql(INSERT_MOVIE_EMOTION)
                .param("movie_id", movie_id)
                .param("emotion_id", emotion_id)
                .update();
    }

    public List<Movie> findMoviesByEmotion(String emotion_name) {
        return jdbcClient.sql(FIND_MOVIES_BY_EMOTION)
                .param("emotion_name", emotion_name)
                .query(Movie.class)
                .list();
    }
}
