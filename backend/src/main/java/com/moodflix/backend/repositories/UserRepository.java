package com.moodflix.backend.repositories;

import com.moodflix.backend.model.User;
import io.jsonwebtoken.lang.Assert;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserRepository {

    private static final String INSERT = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)";
    private static final String FIND_BY_EMAIL = "SELECT * FROM users WHERE email = :email";

    private final JdbcClient jdbcClient;

    public UserRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public void saveUser(User user) {
        long affected = jdbcClient.sql(INSERT)
                .param("username", user.getUsername())
                .param("email", user.getEmail())
                .param("password", user.getPassword())
                .update();
        Assert.isTrue(affected == 1, "Could not add user");
    }

    public Optional<User> findByEmail(String email) {
        return jdbcClient.sql(FIND_BY_EMAIL)
                .param("email", email)
                .query(User.class)
                .optional();
    }
}
