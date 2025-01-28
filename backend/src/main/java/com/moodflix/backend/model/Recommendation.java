package com.moodflix.backend.model;

public class Recommendation { //Guardar recomendaciones personalizadas del usuario

    private int recommendation_id;
    private int user_id;
    private int movie_id;
    private String recommendation_reason;

    public Recommendation(){}

    public Recommendation(int recommendation_id, int user_id, int movie_id, String recommendation_reason) {
        this.recommendation_id = recommendation_id;
        this.user_id = user_id;
        this.movie_id = movie_id;
        this.recommendation_reason = recommendation_reason;
    }

    public int getRecommendation_id() {
        return recommendation_id;
    }

    public void setRecommendation_id(int recommendation_id) {
        this.recommendation_id = recommendation_id;
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

    public String getRecommendation_reason() {
        return recommendation_reason;
    }

    public void setRecommendation_reason(String recommendation_reason) {
        this.recommendation_reason = recommendation_reason;
    }
}
