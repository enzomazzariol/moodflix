package com.moodflix.backend.model;

public class UserFavorites {

    private int user_id;
    private int movie_id;
    private String created_at;

    public UserFavorites(int user_id, int movie_id, String created_at) {
        this.user_id = user_id;
        this.movie_id = movie_id;
        this.created_at = created_at;
    }

    public UserFavorites() {
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

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }
}
