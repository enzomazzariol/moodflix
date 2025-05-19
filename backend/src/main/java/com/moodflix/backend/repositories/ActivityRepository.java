package com.moodflix.backend.repositories;

import com.moodflix.backend.dtos.ActivityResponseDTO;
import com.moodflix.backend.exceptions.DatabaseException;
import com.moodflix.backend.model.Activity;
import com.moodflix.backend.utils.ActivityResponseRowMapper;
import com.moodflix.backend.utils.ActivityRowMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import javax.xml.crypto.Data;
import java.util.List;

@Repository
public class ActivityRepository {

    private static final Logger logger = LoggerFactory.getLogger(ActivityRepository.class);

    private static final String INSERT_ACTIVITY = """
            INSERT INTO activities (user_id, movie_id, review_id, activity_type)
            VALUES (:user_id, :movie_id, :review_id, :activity_type)
            """;
    private static final String FIND_ACTIVIY_BY_USER = """
            SELECT 
              a.activity_id, a.activity_type, a.activity_date,
        
              m.movie_id, m.title, m.poster_url AS movie_poster_path,
        
              u.user_id, u.username, u.avatar_url,
        
              r.rating_id AS review_id,
              r.rating AS review_rating,
              r.review AS review_message,
              r.created_at AS review_created_at
        
            FROM activities a
            LEFT JOIN movies m ON a.movie_id = m.movie_id
            LEFT JOIN users u ON a.user_id = u.user_id
            LEFT JOIN movie_ratings r ON a.review_id = r.rating_id
            WHERE a.user_id = :user_id
            """;

    private static final String FIND_ALL_WITH_JOINS = """
    SELECT 
      a.activity_id, a.activity_type, a.activity_date,

      m.movie_id, m.title, m.poster_url AS movie_poster_path,

      u.user_id, u.username, u.avatar_url,

      r.rating_id AS review_id,
      r.rating AS review_rating,
      r.review AS review_message,
      r.created_at AS review_created_at

    FROM activities a
    LEFT JOIN movies m ON a.movie_id = m.movie_id
    LEFT JOIN users u ON a.user_id = u.user_id
    LEFT JOIN movie_ratings r ON a.review_id = r.rating_id
""";


    /**
     Arreglar esta query cuando sea necesario
     tiene que buscar las actividades del usuario y la de las personas que sigue
     **/
    private static final String FIND_RECENT_ACTIVITIES = """
            SELECT * from activities;
            """;

    private final JdbcClient jdbcClient;

    @Autowired
    public ActivityRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public void saveActivity(Activity activity) {
        try {
            long affected = jdbcClient.sql(INSERT_ACTIVITY)
                    .param("user_id", activity.getUser_id())
                    .param("movie_id", activity.getMovie_id())
                    .param("review_id", activity.getReview_id())
                    .param("activity_type", activity.getActivity_type().getValue())
                    .update();

            if(affected != 1) {
                logger.error("Fallo al guardar la actividad con el ID {}: ", activity.getUser_id());
                throw new DatabaseException("No se pudo guardar la actividad en la base de datos");
            }
        } catch (Exception e) {
            logger.error("Error inesperado al guardar la actividad");
            throw new DatabaseException("Unexpected error occurred while saving activity", e);
        }
    }

    public void deleteActivityByType(int userId, int movieId, String activityType) {
        String DELETE_ACTIVITY = """
        DELETE FROM activities
        WHERE user_id = :user_id AND movie_id = :movie_id AND activity_type = :activity_type
    """;

        try {
            jdbcClient.sql(DELETE_ACTIVITY)
                    .param("user_id", userId)
                    .param("movie_id", movieId)
                    .param("activity_type", activityType)
                    .update();
        } catch (Exception e) {
            logger.error("Error al eliminar la actividad ({}): {}", activityType, e.getMessage());
            throw new DatabaseException("Error al eliminar la actividad", e);
        }
    }

    public List<ActivityResponseDTO> findByUser(int userId) {
        try {
            return jdbcClient.sql(FIND_ACTIVIY_BY_USER)
                    .param("user_id", userId)
                    .query(new ActivityResponseRowMapper())
                    .list();
        } catch (DatabaseException e) {
            logger.error("Error inesperado al recuperar las actividades del usuario con ID {} ", userId);
            throw new DatabaseException("Unexpected error occurred while recovering activity", e);
        }
    }

    public List<ActivityResponseDTO> findAll() {
        try {
            return jdbcClient.sql(FIND_ALL_WITH_JOINS)
                    .query(new ActivityResponseRowMapper())
                    .list();
        }catch (DatabaseException e) {
            logger.error("Error inesperado al recuperar las actividades");
            throw new DatabaseException("Unexpected error occurred while recovering activity", e);
        }
    }
}
