package com.moodflix.backend.dtos;

import com.moodflix.backend.model.PlatformProvider;

import java.util.List;

public class PlatformResult {
    private List<PlatformProvider> flatrate;

    public List<PlatformProvider> getFlatrate() {
        return flatrate != null ? flatrate : List.of();
    }
}
