package com.moodflix.backend.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
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
        if (genreJson != null) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                genres = objectMapper.readValue(genreJson, objectMapper.getTypeFactory().constructCollectionType(List.class, Genre.class));
            } catch (Exception e) {
                throw new SQLException("Error deserializing genres from JSON", e);
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
                genres,
                rs.getDouble("rating"),
                rs.getString("platforms"),
                rs.getString("tagline"),
                rs.getTimestamp("created_at").toString()
        );
    }
}