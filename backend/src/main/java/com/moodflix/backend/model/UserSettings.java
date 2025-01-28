package com.moodflix.backend.model;

public class UserSettings {
    private int userId;
    private Theme theme;
    private Language language;
    private boolean notifications_enabled;
    private boolean sound_enabled;

    public UserSettings() {

    }

    public UserSettings(int userId, Theme theme, Language language, boolean notifications_enabled, boolean sound_enabled) {
        this.userId = userId;
        this.theme = theme;
        this.language = language;
        this.notifications_enabled = notifications_enabled;
        this.sound_enabled = sound_enabled;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Theme getTheme() {
        return theme;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public boolean isNotifications_enabled() {
        return notifications_enabled;
    }

    public void setNotifications_enabled(boolean notifications_enabled) {
        this.notifications_enabled = notifications_enabled;
    }

    public boolean isSound_enabled() {
        return sound_enabled;
    }

    public void setSound_enabled(boolean sound_enabled) {
        this.sound_enabled = sound_enabled;
    }
}
