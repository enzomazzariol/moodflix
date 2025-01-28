package com.moodflix.backend.model;

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
