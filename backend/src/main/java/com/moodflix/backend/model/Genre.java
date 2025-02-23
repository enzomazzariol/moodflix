package com.moodflix.backend.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Genre {

    @SerializedName("id")
    private int id;

    @SerializedName("name")
    private String name;

    public Genre(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public Genre() {}

    public static String convertGenresToJson(List<Genre> genres) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(genres);
        } catch (Exception e) {
            throw new RuntimeException("Error serializing genres to JSON", e);
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}