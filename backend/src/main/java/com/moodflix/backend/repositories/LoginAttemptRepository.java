package com.moodflix.backend.repositories;

import com.moodflix.backend.dtos.LoginAttempsDTO;
import com.moodflix.backend.model.LoginAttempts;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;

@Repository
public class LoginAttemptRepository {

    private static final int RECENT_COUNT = 10; // can be in the config
    private static final String INSERT = "INSERT INTO login_attempts (userOrEmail, success, attempted_at) VALUES(:userOrEmail, :success, :attempted_at)";
    private static final String FIND_RECENT = "SELECT * FROM login_attempts WHERE userOrEmail = :userOrEmail ORDER BY attempted_at DESC LIMIT :recentCount";

    private final JdbcClient jdbcClient;
    private final JdbcTemplate jdbcTemplate;

    public LoginAttemptRepository(JdbcClient jdbcClient, JdbcTemplate jdbcTemplate) {
        this.jdbcClient = jdbcClient;
        this.jdbcTemplate = jdbcTemplate;
    }

    public void add(LoginAttempsDTO loginAttemptDTO) {
        long affected = jdbcClient.sql(INSERT)
                .param("userOrEmail", loginAttemptDTO.userOrEmail())
                .param("success", loginAttemptDTO.success())
                .param("attempted_at", loginAttemptDTO.attemptedAt())
                .update();

        Assert.isTrue(affected == 1, "Could not add login attempt.");
    }

    public List<LoginAttempts> findRecent(String userOrEmail) {
        return jdbcClient.sql(FIND_RECENT)
                .param("userOrEmail", userOrEmail)
                .param("recentCount", RECENT_COUNT)
                .query(LoginAttempts.class)
                .list();
    }
}
