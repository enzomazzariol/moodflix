package com.moodflix.backend.repositories;

import com.moodflix.backend.dtos.UserDTO;
import com.moodflix.backend.exceptions.DatabaseException;
import com.moodflix.backend.model.User;
import io.jsonwebtoken.lang.Assert;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {

    private static final String INSERT = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)";
    private static final String FIND_BY_EMAIL = "SELECT * FROM users WHERE email = :email";
    private static final String FIND_BY_USERNAME = "SELECT * FROM users WHERE username = :username";
    private static final String FIND_BY_EMAIL_OR_USERNAME = "SELECT * FROM users WHERE email = :identifier OR username = :identifier";
    private static final String FIND_ALL_USERS = "SELECT * FROM users";
    private static final String FIND_BY_ID = "SELECT * FROM users WHERE user_id = :user_id";

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

    public Optional<User> findByUsername(String username) {
        return jdbcClient.sql(FIND_BY_USERNAME)
                .param("username", username)
                .query(User.class)
                .optional();
    }

    public Optional<User> findByEmailOrUsername(String identifier) {
        return jdbcClient.sql(FIND_BY_EMAIL_OR_USERNAME)
                .param("identifier", identifier)
                .query(User.class)
                .optional();
    }

    public List<UserDTO> findAll() {
        try {
            return jdbcClient.sql(FIND_ALL_USERS)
                    .query(UserDTO.class)
                    .list();
        } catch(DataAccessException e) {
            throw new DatabaseException("Could not retrieve all users");
        }
    }

    public Optional<UserDTO> findById(int id) {
        try {
            return jdbcClient.sql(FIND_BY_ID)
                    .param("user_id", id)
                    .query(UserDTO.class)
                    .optional();
        } catch (DataAccessException e) {
            throw new DatabaseException("Could not retrieve user by id");
        }
    }
}
