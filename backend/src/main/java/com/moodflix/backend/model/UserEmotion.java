package com.moodflix.backend.model;

public class UserEmotion {

    private int user_id;
    private int emotion_id;

    public UserEmotion(){}
    public UserEmotion(int user_id, int emotion_id) {
        this.user_id = user_id;
        this.emotion_id = emotion_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getEmotion_id() {
        return emotion_id;
    }

    public void setEmotion_id(int emotion_id) {
        this.emotion_id = emotion_id;
    }
}
