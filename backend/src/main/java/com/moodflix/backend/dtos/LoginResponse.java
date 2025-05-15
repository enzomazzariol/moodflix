package com.moodflix.backend.dtos;
import com.moodflix.backend.dtos.UserDTO;

public record LoginResponse(UserDTO userDTO, String token) {
}
