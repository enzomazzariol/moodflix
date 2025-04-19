package com.moodflix.backend.model.enums;

public enum ActivityType {
    WATCH("watch"),
    LIKE("like"),
    REVIEW("review");

    private final String value;

    ActivityType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    // Método para obtener el enum a partir de un valor
    public static ActivityType fromValue(String value) {
        for (ActivityType type : values()) {
            if (type.value.equals(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid activity type: " + value);
    }
}

