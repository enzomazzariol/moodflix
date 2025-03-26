package com.moodflix.backend.model;

public class UserMovies {

    private int user_id;
    private int movie_id;
    private boolean watched;
    private String watchedAt;

    public UserMovies(){}

    public UserMovies(int user_id, int movie_id, boolean watched, String watchedAt) {
        this.user_id = user_id;
        this.movie_id = movie_id;
        this.watched = watched;
        this.watchedAt = watchedAt;
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

    public boolean isWatched() {
        return watched;
    }

    public void setWatched(boolean watched) {
        this.watched = watched;
    }

    public String getWatchedAt() {
        return watchedAt;
    }

    public void setWatchedAt(String watchedAt) {
        this.watchedAt = watchedAt;
    }
}
