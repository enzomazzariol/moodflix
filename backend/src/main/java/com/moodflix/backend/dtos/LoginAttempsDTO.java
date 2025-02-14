package com.moodflix.backend.dtos;

import java.time.LocalDateTime;

public record LoginAttempsDTO(String userOrEmail,
                              boolean success,
                              LocalDateTime attemptedAt) {
}
