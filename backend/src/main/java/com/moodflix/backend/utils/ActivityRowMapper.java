package com.moodflix.backend.utils;

import com.moodflix.backend.model.Activity;
import com.moodflix.backend.model.Movie;
import com.moodflix.backend.model.enums.ActivityType;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ActivityRowMapper implements RowMapper<Activity> {

    @Override
    public Activity mapRow(ResultSet rs, int rowNum) throws SQLException {
        Activity activity = new Activity();
        activity.setActivity_id(rs.getInt("activity_id"));
        activity.setUser_id(rs.getInt("user_id"));
        activity.setMovie_id(rs.getInt("movie_id"));
        activity.setReview_id(rs.getInt("review_id"));
        activity.setActivity_type(ActivityType.fromValue(rs.getString("activity_type")));
        activity.setActivity_date(String.valueOf(rs.getTimestamp("activity_date").toLocalDateTime()));

        return activity;
    }
}
