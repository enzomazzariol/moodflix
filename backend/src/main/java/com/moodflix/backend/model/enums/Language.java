package com.moodflix.backend.model.enums;

public enum Language {
    EN("en"),
    ES("es");

    private final String value;

    Language(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    // Método para obtener el enum a partir de un valor
    public static Language fromValue(String value) {
        for (Language language : values()) {
            if (language.value.equals(value)) {
                return language;
            }
        }
        throw new IllegalArgumentException("Invalid language: " + value);
    }
}
