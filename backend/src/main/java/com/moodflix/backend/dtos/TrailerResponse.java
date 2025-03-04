package com.moodflix.backend.dtos;

import com.moodflix.backend.model.Trailer;

import java.util.List;

public record TrailerResponse(List<Trailer> results) {
}
