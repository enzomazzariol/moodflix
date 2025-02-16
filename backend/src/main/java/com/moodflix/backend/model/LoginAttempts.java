package com.moodflix.backend.model;

import java.time.LocalDateTime;

public class LoginAttempts {

        private Long id;              // ID único para el intento
        private String userOrEmail;   // En vez de ID, podemos guardar el email o nombre de usuario
        private LocalDateTime attemptedAt;
        private Boolean success;

        // Constructor
        public LoginAttempts(Long id, String userOrEmail, LocalDateTime attemptedAt, Boolean success) {
            this.id = id;
            this.userOrEmail = userOrEmail;
            this.attemptedAt = attemptedAt;
            this.success = success;
        }

        // Getters y setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getUserOrEmail() {
            return userOrEmail;
        }

        public void setUserOrEmail(String userOrEmail) {
            this.userOrEmail = userOrEmail;
        }

        public LocalDateTime getAttemptedAt() {
            return attemptedAt;
        }

        public void setAttemptedAt(LocalDateTime attemptedAt) {
            this.attemptedAt = attemptedAt;
        }

        public Boolean getSuccess() {
            return success;
        }

        public void setSuccess(Boolean success) {
            this.success = success;
        }
    }
