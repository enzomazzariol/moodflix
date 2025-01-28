package com.moodflix.backend.model;

public enum Theme {
    LIGHT("light"),
    DARK("dark");

    private final String value;

    Theme(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    // Método para obtener el enum a partir de un valor
    public static Theme fromValue(String value) {
        for (Theme theme : values()) {
            if (theme.value.equals(value)) {
                return theme;
            }
        }
        throw new IllegalArgumentException("Invalid theme: " + value);
    }
}

