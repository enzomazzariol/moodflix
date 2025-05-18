package com.moodflix.backend.dtos;

import java.time.LocalDateTime;

public class MovieRatingResponse {
    private int ratingId;
    private double rating;
    private String review;
    private LocalDateTime createdAt;
    private UserSummary user;

    public MovieRatingResponse(int ratingId, double rating, String review, LocalDateTime createdAt, UserSummary user) {
        this.ratingId = ratingId;
        this.rating = rating;
        this.review = review;
        this.createdAt = createdAt;
        this.user = user;
    }

    public int getRatingId() {
        return ratingId;
    }

    public void setRatingId(int ratingId) {
        this.ratingId = ratingId;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public UserSummary getUser() {
        return user;
    }

    public void setUser(UserSummary user) {
        this.user = user;
    }

    public static class UserSummary {
        private int user_id;
        private String username;
        private String avatar_url;

        public UserSummary(int user_id, String username, String avatar_url) {
            this.user_id = user_id;
            this.username = username;
            this.avatar_url = avatar_url;
        }

        public int getUser_id() {
            return user_id;
        }

        public void setUser_id(int user_id) {
            this.user_id = user_id;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getAvatar_url() {
            return avatar_url;
        }

        public void setAvatar_url(String avatar_url) {
            this.avatar_url = avatar_url;
        }
    }
}
