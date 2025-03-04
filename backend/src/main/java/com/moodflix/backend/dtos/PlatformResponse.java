package com.moodflix.backend.dtos;

import java.util.Map;

public class PlatformResponse {
    private Map<String, PlatformResult> results;

    public Map<String, PlatformResult> getResults() {
        return results;
    }
}
