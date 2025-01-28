package com.moodflix.backend.model;

public class Notification {

    private int notification_id;
    private int user_id;
    private NotificationType notification_type;
    private String message;
    private boolean read_status;

    public Notification() {

    }

    public Notification(int notification_id, int user_id, NotificationType notification_type, String message, boolean read_status) {
        this.notification_id = notification_id;
        this.user_id = user_id;
        this.notification_type = notification_type;
        this.message = message;
        this.read_status = read_status;
    }

    public int getNotification_id() {
        return notification_id;
    }

    public void setNotification_id(int notification_id) {
        this.notification_id = notification_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public NotificationType getNotification_type() {
        return notification_type;
    }

    public void setNotification_type(NotificationType notification_type) {
        this.notification_type = notification_type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isRead_status() {
        return read_status;
    }

    public void setRead_status(boolean read_status) {
        this.read_status = read_status;
    }
}
