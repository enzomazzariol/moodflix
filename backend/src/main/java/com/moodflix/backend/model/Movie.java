package com.moodflix.backend.model;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.gson.annotations.SerializedName;

import java.util.Date;
import java.util.List;

public class Movie {

    @SerializedName("id")
    private int movie_id;

    @SerializedName("title")
    private String title;

    @SerializedName("overview")
    private String description;

    @SerializedName("release_date")
    private Date release_date;

    @SerializedName("runtime")
    private int duration;

    @SerializedName("poster_path")
    private String poster_url;

    private String trailer_url;

    @SerializedName("backdrop_path")
    private String file_path;

    @SerializedName("genres")
    private List<Genre> genre;

    @SerializedName("vote_average")
    private double rating;

    private String platforms;

    @SerializedName("tagline")
    private String tagline;
    private String created_at;

    private List<Emotion> emotions;

    public Movie() {}

    public Movie(int movie_id, String title, String description, Date release_date, int duration, String poster_url, String trailer_url, String file_path, List<Genre> genre, double rating, String platforms, String tagline, String created_at, List<Emotion> emotions) {
        this.movie_id = movie_id;
        this.title = title;
        this.description = description;
        this.release_date = release_date;
        this.duration = duration;
        this.poster_url = poster_url;
        this.trailer_url = trailer_url;
        this.file_path = file_path;
        this.genre = genre;
        this.rating = rating;
        this.platforms = platforms;
        this.tagline = tagline;
        this.created_at = created_at;
        this.emotions = emotions;
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

    public String getFile_path() {
        return file_path;
    }

    public void setFile_path(String file_path) {
        this.file_path = file_path;
    }

    public List<Genre> getGenre() {
        return genre;
    }

    public void setGenre(List<Genre> genre) {
        this.genre = genre;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getPlatforms() {
        return platforms;
    }

    public void setPlatforms(String platforms) {
        this.platforms = platforms;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    public List<Emotion> getEmotions() {
        return emotions;
    }

    public void setEmotions(List<Emotion> emotions) {
        this.emotions = emotions;
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
                ", file_path='" + file_path + '\'' +
                ", genre=" + genre +
                ", rating=" + rating +
                ", platforms='" + platforms + '\'' +
                ", tagline='" + tagline + '\'' +
                ", created_at='" + created_at + '\'' +
                ", emotions=" + emotions +
                '}';
    }
}
