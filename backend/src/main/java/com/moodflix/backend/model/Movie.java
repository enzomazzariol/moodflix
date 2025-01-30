package com.moodflix.backend.model;
import java.util.Date;

public class Movie {

    private int movie_id;
    private String title;
    private String description;
    private Date release_date;
    private int duration;
    private String poster_url;
    private String trailer_url;
    private String genre;
    private double rating;
    private String created_at;

    public Movie() {}

    public Movie(int movie_id, String title, String description, Date release_date, int duration, String poster_url, String trailer_url, String genre, double rating, String created_at) {
        this.movie_id = movie_id;
        this.title = title;
        this.description = description;
        this.release_date = release_date;
        this.duration = duration;
        this.poster_url = poster_url;
        this.trailer_url = trailer_url;
        this.genre = genre;
        this.rating = rating;
        this.created_at = created_at;
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

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Date getRelease_date() {
        return release_date;
    }

    public void setRelease_date(Date release_date) {
        this.release_date = release_date;
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

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "movie_id=" + movie_id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", release_date=" + release_date +
                ", duration=" + duration +
                ", poster_url='" + poster_url + '\'' +
                ", trailer_url='" + trailer_url + '\'' +
                ", genre='" + genre + '\'' +
                ", rating=" + rating +
                '}';
    }
}
