package com.moodflix.backend.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.moodflix.backend.model.Emotion;
import com.moodflix.backend.model.Genre;
import com.moodflix.backend.model.Movie;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MovieRowRapper implements RowMapper<Movie> {

    @Override
    public Movie mapRow(ResultSet rs, int rowNum) throws SQLException {

        // Obtener el array de géneros desde el ResultSet
        String genreJson = rs.getString("genre");

        List<Genre> genres = null;
        // Deserializar el array de géneros si es necesario
        if (genreJson != null) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                genres = objectMapper.readValue(genreJson, objectMapper.getTypeFactory().constructCollectionType(List.class, Genre.class));
            } catch (Exception e) {
                throw new SQLException("Error deserializing genres from JSON", e);
            }
        }

        // Recuperar las emociones
        List<Emotion> emotions = new ArrayList<>();
        String emotionsJson = rs.getString("emotions");
        // Deserealizar el array de emociones
        if(emotionsJson != null) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                emotions = objectMapper.readValue(emotionsJson, objectMapper.getTypeFactory().constructCollectionType(List.class, Emotion.class));
            } catch (Exception e) {
                throw new SQLException("Error deserializing emotions from JSON", e);
            }
        }

        return new Movie(
                rs.getInt("movie_id"),
                rs.getString("title"),
                rs.getString("description"),
                rs.getDate("release_date"),
                rs.getInt("duration"),
                rs.getString("poster_url"),
                rs.getString("trailer_url"),
                rs.getString("file_path"),
                genres, // Pasamos la lista de géneros deserializada
                rs.getDouble("rating"),
                rs.getString("platforms"),
                rs.getString("tagline"),
                rs.getTimestamp("created_at").toString(),
                emotions
        );
    }
}
