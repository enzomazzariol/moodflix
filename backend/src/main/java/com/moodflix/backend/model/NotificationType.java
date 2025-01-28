package com.moodflix.backend.model;

public enum NotificationType {
    MOVIE_RECOMMENDATION("movie_recommendation"),
    ACTIVITY_UPDATE("activity_update"),
    COMMENT_REPLY("comment_reply");

    private final String value;

    NotificationType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    // Método para obtener el enum a partir de un valor
    public static NotificationType fromValue(String value) {
        for (NotificationType type : values()) {
            if (type.value.equals(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid notification type: " + value);
    }
}

