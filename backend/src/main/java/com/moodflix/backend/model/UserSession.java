package com.moodflix.backend.model;

public class UserSession {

    private int session_id;
    private int user_id;
    private String session_token;
    private String device_info;
    private String created_at;
    private String last_activity;
    private boolean revoked;

    public UserSession() {
    }

    public UserSession(int session_id, int user_id, String session_token, String device_info, String created_at, String last_activity, boolean revoked) {
        this.session_id = session_id;
        this.user_id = user_id;
        this.session_token = session_token;
        this.device_info = device_info;
        this.created_at = created_at;
        this.last_activity = last_activity;
        this.revoked = revoked;
    }

    public UserSession(int user_id, String session_token, String device_info) {
        this.user_id = user_id;
        this.session_token = session_token;
        this.device_info = device_info;
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

    public String getDevice_info() {
        return device_info;
    }

    public void setDevice_info(String device_info) {
        this.device_info = device_info;
    }

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    public String getLast_activity() {
        return last_activity;
    }

    public void setLast_activity(String last_activity) {
        this.last_activity = last_activity;
    }

    public boolean isRevoked() {
        return revoked;
    }

    public void setRevoked(boolean revoked) {
        this.revoked = revoked;
    }
}
