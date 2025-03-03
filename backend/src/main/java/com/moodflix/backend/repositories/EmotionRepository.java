package com.moodflix.backend.repositories;

import com.moodflix.backend.model.Emotion;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class EmotionRepository {

    public static final String FIND_ALL = "SELECT * FROM emotions";
    public static final String FIND_BY_NAME = "SELECT * FROM emotions WHERE name = :name";
    private static final String INSERT_EMOTION = "INSERT INTO emotions (name, description) VALUES (:name, :description)";

    private final JdbcClient jdbcClient;

    public EmotionRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Emotion> findAll () {
        return jdbcClient.sql(FIND_ALL)
                .query(Emotion.class)
                .list();
    }

    public Optional<Emotion> findByName(String name) {
        return jdbcClient.sql(FIND_BY_NAME)
                .param("name", name)
                .query(Emotion.class)
                .optional();
    }

    public void save(Emotion emotion) {
        jdbcClient.sql(INSERT_EMOTION)
                .param("name", emotion.getName())
                .param("description", emotion.getDescription())
                .update();
    }

    public void saveAll(List<Emotion> emotions) {
        for(Emotion emotion : emotions) {
            jdbcClient.sql(INSERT_EMOTION)
                    .param("name", emotion.getName())
                    .param("description", emotion.getDescription())
                    .update();
        }
    }
}
