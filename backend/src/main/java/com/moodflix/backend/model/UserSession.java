package com.moodflix.backend.model;

public class UserSession {

    private int session_id;
    private int user_id;
    private String session_token;
    private String last_activity;

    public UserSession() {}

    public UserSession(int session_id, int user_id, String session_token, String last_activity) {
        this.session_id = session_id;
        this.user_id = user_id;
        this.session_token = session_token;
        this.last_activity = last_activity;
    }

    public int getSession_id() {
        return session_id;
    }

    public void setSession_id(int session_id) {
        this.session_id = session_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getSession_token() {
        return session_token;
    }

    public void setSession_token(String session_token) {
        this.session_token = session_token;
    }

    public String getLast_activity() {
        return last_activity;
    }

    public void setLast_activity(String last_activity) {
        this.last_activity = last_activity;
    }
}
