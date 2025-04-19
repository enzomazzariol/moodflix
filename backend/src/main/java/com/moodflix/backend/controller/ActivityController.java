package com.moodflix.backend.controller;

import com.moodflix.backend.model.Activity;
import com.moodflix.backend.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/moodflix/activity")
public class ActivityController {

    private final ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @PostMapping
    public ResponseEntity<?> saveActivity(@RequestBody Activity activity) {
        return activityService.saveActivity(activity);
    }

    @GetMapping
    public ResponseEntity<?> findActivitiesByUser(@RequestParam int userId) {
        return activityService.findActivitiesByUser(userId);
    }
}
