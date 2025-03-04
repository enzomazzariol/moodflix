package com.moodflix.backend.model;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class Emotion {

    private int emotion_id;
    private String name;
    private String description;

    public Emotion(){}
    public Emotion(int emotion_id, String name, String description) {
        this.emotion_id = emotion_id;
        this.name = name;
        this.description = description;
    }

    public Emotion(int emotion_id, String name) {
        this.emotion_id = emotion_id;
        this.name = name;
    }

    public static String convertEmotionsToJson(List<Emotion> emotions) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(emotions);
        } catch (Exception e) {
            throw new RuntimeException("Error serializing genres to JSON", e);
        }
    }

    public int getEmotion_id() {
        return emotion_id;
    }

    public void setEmotion_id(int emotion_id) {
        this.emotion_id = emotion_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


}
