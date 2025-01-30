package com.moodflix.backend.dtos;

public class UserDTO {

    private int user_id;
    private String username;
    private String email;
    private String avatar_url;

    public UserDTO() {

    }
    public UserDTO(int user_id, String username, String email, String avatar_url) {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.avatar_url = avatar_url;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatar_url() {
        return avatar_url;
    }

    public void setAvatar_url(String avatar_url) {
        this.avatar_url = avatar_url;
    }
}
