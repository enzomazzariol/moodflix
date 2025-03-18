package com.moodflix.backend.repositories;

import com.moodflix.backend.dtos.FavoriteMovieResponse;
import com.moodflix.backend.exceptions.DatabaseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserFavoritesRepository {

    private static final Logger logger = LoggerFactory.getLogger(UserFavoritesRepository.class);
    private JdbcClient jdbcClient;

    public UserFavoritesRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }
    //QUERYS
    private static final String ADD_FAVORITE = """
        INSERT INTO user_favorites (user_id, movie_id) VALUES (:user_id, :movie_id)
        """;
    private static final String REMOVE_FAVORITE = """
        DELETE FROM user_favorites WHERE user_id = :user_id AND movie_id = :movie_id
        """;
    private static final String GET_USER_FAVORITES = """
        SELECT m.movie_id, m.title, m.poster_url 
        FROM user_favorites uf
        JOIN movies m ON uf.movie_id = m.movie_id
        WHERE uf.user_id = :user_id
    """;
    private static final String EXISTS_FAVORITE = """
        SELECT COUNT(*) FROM user_favorites WHERE user_id = :user_id AND movie_id = :movie_id
        """;

    /**
     * Agrega una pelicula como favorita
     * @param userId ID del usuario que guarda la pelicula
     * @param movieId ID de la película que se está guardando como favorita
    * */
    public boolean addFavorite(int userId, int movieId) {
        try {
            jdbcClient.sql(ADD_FAVORITE)
                    .param("user_id", userId)
                    .param("movie_id", movieId)
                    .update();
            return true;
        } catch(DatabaseException e){
            logger.error("Error adding favorite movie for user {}: {}", userId, e.getMessage());
            return false;
        }
    }

    /**
    * Elimina una pelicula de las favoritas del usuario
     * @param userId ID del usuario que elimina la pelicula
     * @param movieId ID de la película que se está eliminando de las favoritas
    * */
    public boolean removeFavorite(int userId, int movieId) {
        try {
            jdbcClient.sql(REMOVE_FAVORITE)
                    .param("user_id", userId)
                    .param("movie_id", movieId)
                    .update();
            return true;
        } catch(DatabaseException e){
            logger.error("Error removing favorite movie for user {}: {}", userId, e.getMessage());
            return false;
        }
    }
    /**
     * Verifica si una pelicula esta en la lista de las peliculas favoritas del usuario
     * @param userId ID del usuario que verifica la pelicula
     * @param movieId ID de la película que se está verificando de las favoritas
     * */
    public boolean isFavorite(int userId, int movieId) {
        try {
            Integer count = jdbcClient.sql(EXISTS_FAVORITE)
                    .param("user_id", userId)
                    .param("movie_id", movieId)
                    .query(Integer.class)
                    .single();
            return count > 0;
        } catch(DatabaseException e) {
            logger.error("Error verificando favorite movie for user {}: {}", userId, e.getMessage());
            return false;
        }
    }

    /**
     * Recoge las peliculas favoritas del usuario, con el id de la pelicula, titulo y la url del poster
     * @param userId ID del usuario para recoger sus favoritas
    * */
    public List<FavoriteMovieResponse> getUserFavorites(int userId) {
        try {
            return jdbcClient.sql(GET_USER_FAVORITES)
                    .param("user_id", userId)
                    .query((rs, rowNum) -> new FavoriteMovieResponse(
                            rs.getInt("movie_id"),
                            rs.getString("title"),
                            rs.getString("poster_url")
                    ))
                    .list();
        } catch(DatabaseException e) {
            logger.error("Error getting user favorites for user {}: {}", userId, e.getMessage());
            return List.of();
        }
    }
}
