package com.moodflix.backend.service;

import com.moodflix.backend.exceptions.ApiResponse;
import com.moodflix.backend.model.Emotion;
import com.moodflix.backend.repositories.EmotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmotionService {

    @Autowired
    private EmotionRepository emotionRepository;

    public ResponseEntity<?> insertEmotion(Emotion emotion) {
        try {
            emotionRepository.save(emotion);
            return ResponseEntity.ok(new ApiResponse(HttpStatus.CREATED.value(), "Emoción insertada correctamente"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()));        }
    }

    public ResponseEntity<?> insertManyEmotions(List<Emotion> emotions) {
        try {
            emotionRepository.saveAll(emotions);
            return ResponseEntity.ok(new ApiResponse(HttpStatus.CREATED.value(), "Emociones insertadas correctamente"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()));        }
    }
}
