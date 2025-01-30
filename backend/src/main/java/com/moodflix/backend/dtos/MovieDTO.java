package com.moodflix.backend.dtos;

import java.util.Date;

public class MovieDTO {

    private int movie_id;
    private String title;
    private String description;
    private Date release_date;
    private int duration;
    private String poster_url;
    private String trailer_url;
    private String genre;
    private double rating;

    public MovieDTO() {

    }

    public MovieDTO(int movie_id, String title, String description, Date release_date, int duration, String poster_url, String trailer_url, String genre, double rating) {
        this.movie_id = movie_id;
        this.title = title;
        this.description = description;
        this.release_date = release_date;
        this.duration = duration;
        this.poster_url = poster_url;
        this.trailer_url = trailer_url;
        this.genre = genre;
        this.rating = rating;
    }

    public int getMovie_id() {
        return movie_id;
    }

    public void setMovie_id(int movie_id) {
        this.movie_id = movie_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getRelease_date() {
        return release_date;
    }

    public void setRelease_date(Date release_date) {
        this.release_date = release_date;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getPoster_url() {
        return poster_url;
    }

    public void setPoster_url(String poster_url) {
        this.poster_url = poster_url;
    }

    public String getTrailer_url() {
        return trailer_url;
    }

    public void setTrailer_url(String trailer_url) {
        this.trailer_url = trailer_url;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }
}
