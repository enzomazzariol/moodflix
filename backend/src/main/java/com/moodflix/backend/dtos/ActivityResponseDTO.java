package com.moodflix.backend.dtos;

import java.time.LocalDateTime;

public class ActivityResponseDTO {
    private int activityId;
    private String activityType;
    private LocalDateTime activityDate;

    private MovieDTO movie;
    private UserDTO user;
    private ReviewDTO review;

    public int getActivityId() {
        return activityId;
    }

    public void setActivityId(int activityId) {
        this.activityId = activityId;
    }

    public String getActivityType() {
        return activityType;
    }

    public void setActivityType(String activityType) {
        this.activityType = activityType;
    }

    public LocalDateTime getActivityDate() {
        return activityDate;
    }

    public void setActivityDate(LocalDateTime activityDate) {
        this.activityDate = activityDate;
    }

    public MovieDTO getMovie() {
        return movie;
    }

    public void setMovie(MovieDTO movie) {
        this.movie = movie;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public ReviewDTO getReview() {
        return review;
    }

    public void setReview(ReviewDTO review) {
        this.review = review;
    }

    public static class MovieDTO {
        private int movieId;
        private String title;
        private String posterPath;

        public int getMovieId() {
            return movieId;
        }

        public void setMovieId(int movieId) {
            this.movieId = movieId;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getPosterPath() {
            return posterPath;
        }

        public void setPosterPath(String posterPath) {
            this.posterPath = posterPath;
        }
    }

    public static class UserDTO {
        private int userId;
        private String username;
        private String avatarUrl;

        public int getUserId() {
            return userId;
        }

        public void setUserId(int userId) {
            this.userId = userId;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getAvatarUrl() {
            return avatarUrl;
        }

        public void setAvatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
        }
    }

    public static class ReviewDTO {
        private int reviewId;
        private Integer rating;
        private String message;
        private LocalDateTime createdAt;

        public int getReviewId() {
            return reviewId;
        }

        public void setReviewId(int reviewId) {
            this.reviewId = reviewId;
        }

        public Integer getRating() {
            return rating;
        }

        public void setRating(Integer rating) {
            this.rating = rating;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public LocalDateTime getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
        }
    }
}