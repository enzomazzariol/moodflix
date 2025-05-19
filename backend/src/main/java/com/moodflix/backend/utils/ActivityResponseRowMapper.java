package com.moodflix.backend.utils;

import com.moodflix.backend.dtos.ActivityResponseDTO;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ActivityResponseRowMapper implements RowMapper<ActivityResponseDTO> {
    @Override
    public ActivityResponseDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
        ActivityResponseDTO dto = new ActivityResponseDTO();
        dto.setActivityId(rs.getInt("activity_id"));
        dto.setActivityType(rs.getString("activity_type"));
        dto.setActivityDate(rs.getTimestamp("activity_date").toLocalDateTime());

        ActivityResponseDTO.MovieDTO movie = new ActivityResponseDTO.MovieDTO();
        movie.setMovieId(rs.getInt("movie_id"));
        movie.setTitle(rs.getString("title"));
        movie.setPosterPath(rs.getString("movie_poster_path"));
        dto.setMovie(movie);

        ActivityResponseDTO.UserDTO user = new ActivityResponseDTO.UserDTO();
        user.setUserId(rs.getInt("user_id"));
        user.setUsername(rs.getString("username"));
        user.setAvatarUrl(rs.getString("avatar_url"));
        dto.setUser(user);

        int reviewId = rs.getInt("review_id");
        if (!rs.wasNull()) {
            ActivityResponseDTO.ReviewDTO review = new ActivityResponseDTO.ReviewDTO();
            review.setReviewId(reviewId);
            review.setRating(rs.getInt("review_rating"));
            review.setMessage(rs.getString("review_message"));
            review.setCreatedAt(rs.getTimestamp("review_created_at").toLocalDateTime());
            dto.setReview(review);
        }

        return dto;
    }
}

