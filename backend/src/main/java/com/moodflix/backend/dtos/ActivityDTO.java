package com.moodflix.backend.dtos;

import com.moodflix.backend.model.enums.ActivityType;

public class ActivityDTO {

    private int activity_id;
    private int user_id;
    private int movie_id;
    private ActivityType activity_type;
    private String activity_date;

    public ActivityDTO() {

    }

    public ActivityDTO(int activity_id, int user_id, int movie_id, ActivityType activity_type, String activity_date) {
        this.activity_id = activity_id;
        this.user_id = user_id;
        this.movie_id = movie_id;
        this.activity_type = activity_type;
        this.activity_date = activity_date;
    }

    public int getActivity_id() {
        return activity_id;
    }

    public void setActivity_id(int activity_id) {
        this.activity_id = activity_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getMovie_id() {
        return movie_id;
    }

    public void setMovie_id(int movie_id) {
        this.movie_id = movie_id;
    }

    public ActivityType getActivity_type() {
        return activity_type;
    }

    public void setActivity_type(ActivityType activity_type) {
        this.activity_type = activity_type;
    }

    public String getActivity_date() {
        return activity_date;
    }

    public void setActivity_date(String activity_date) {
        this.activity_date = activity_date;
    }
}
