package com.moodflix.backend.controller;

import com.moodflix.backend.model.Emotion;
import com.moodflix.backend.service.EmotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("moodflix/emotion")
public class EmotionController {

    @Autowired
    private EmotionService emotionService;

    @PostMapping
    public ResponseEntity<?> insertEmotion(@RequestBody Emotion emotion) {
        return emotionService.insertEmotion(emotion);
    }

    @PostMapping("/many")
    public ResponseEntity<?> insertManyEmotions(@RequestBody List<Emotion> emotions) {
        return emotionService.insertManyEmotions(emotions);
    }
}
