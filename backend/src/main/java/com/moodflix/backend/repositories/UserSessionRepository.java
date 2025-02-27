package com.moodflix.backend.repositories;

import com.moodflix.backend.model.UserSession;
import io.jsonwebtoken.lang.Assert;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserSessionRepository {

    private static final String INSERT = "INSERT INTO user_sessions (user_id, session_token, device_info) VALUES (:user_id, :session_token, :device_info)";
    private static final String FIND_BY_SESSION_TOKEN = "SELECT * FROM user_sessions WHERE session_token = :session_token";
    private static final String FIND_BY_USER_ID = "SELECT * FROM user_sessions WHERE user_id = :user_id";
    private static final String DELETE_SESSION = "DELETE FROM user_sessions WHERE session_token = :session_token";


    private final JdbcClient jdbcClient;

    public UserSessionRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public void saveUserSession(UserSession userSession) {
        long affected = jdbcClient.sql(INSERT)
                .param("user_id", userSession.getUser_id())
                .param("session_token", userSession.getSession_token())
                .param("device_info", userSession.getDevice_info())
                .update();
        Assert.isTrue(affected == 1, "Could not add user session");
    }

    public Optional<UserSession> findBySessionToken(String sessionToken) {
        return jdbcClient.sql(FIND_BY_SESSION_TOKEN)
                .param("session_token", sessionToken)
                .query(new BeanPropertyRowMapper<>(UserSession.class))
                .optional();
    }

    public Optional<UserSession> findByUserId(int userId) {
        return jdbcClient.sql(FIND_BY_USER_ID)
                .param("user_id", userId)
                .query(new BeanPropertyRowMapper<>(UserSession.class))
                .optional();
    }

    public void deleteUserSession(String sessionToken) {
        jdbcClient.sql(DELETE_SESSION)
                .param("session_token", sessionToken)
                .update();
    }
}
