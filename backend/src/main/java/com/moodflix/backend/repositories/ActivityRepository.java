package com.moodflix.backend.repositories;

import com.moodflix.backend.exceptions.DatabaseException;
import com.moodflix.backend.model.Activity;
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
            INSERT INTO activities (user_id, movie_id, activity_type)
            VALUES (:user_id, :movie_id, :activity_type)
            """;
    private static final String FIND_ACTIVIY_BY_USER = """
            SELECT * from activities WHERE user_id = :user_id
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

    public List<Activity> findByUser(int userId) {
        try {
            return jdbcClient.sql(FIND_ACTIVIY_BY_USER)
                    .param("user_id", userId)
                    .query(new ActivityRowMapper())
                    .list();
        } catch (DatabaseException e) {
            logger.error("Error inesperado al recuperar las actividades del usuario con ID {} ", userId);
            throw new DatabaseException("Unexpected error occurred while saving activity", e);
        }
    }
}
