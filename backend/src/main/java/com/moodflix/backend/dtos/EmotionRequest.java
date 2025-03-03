package com.moodflix.backend.dtos;

import java.util.List;

public record EmotionRequest(
        List<String> emotions
) {
}
