package com.moodflix.backend.service;

import com.moodflix.backend.exceptions.ApiResponse;
import com.moodflix.backend.model.Activity;
import com.moodflix.backend.repositories.ActivityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {
    private static final Logger logger = LoggerFactory.getLogger(ActivityService.class);
    private final ActivityRepository activityRepository;

    @Autowired
    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    /**
     * Método para guardar un registro de la actividad del usuario, como un like, review o si añadió una peli a su watchlist
     * @param activity Objeto Actividad
     * */
    public ResponseEntity<?> saveActivity(Activity activity) {
        try {
            if(activity.getUser_id() == 0) {
                logger.error("Error con el id del usuario en el objeto Activity {} ", activity.getUser_id());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                        new ApiResponse(HttpStatus.BAD_REQUEST.value(), "Usuario no encontrado, no se puedo guardar la actividad")
                );
            }
            activityRepository.saveActivity(activity);
            return ResponseEntity.ok(
                    new ApiResponse(HttpStatus.CREATED.value(), "Actividad insertada correctamente")
            );
        } catch (Exception e) {
            logger.error("Failed to save activity for user {} ", activity.getUser_id(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al guardar la actividad en la base de datos")
            );
        }
    }

    /**
     * Método para recuperar la actividad reciente de un usuario
     * @param userId Id del usuario
     * */
    public ResponseEntity<?> findActivitiesByUser(int userId) {
        try {
            List<Activity> actividades = activityRepository.findByUser(userId);
            if(actividades.isEmpty()) {
                return ResponseEntity.ok(
                        new ApiResponse(HttpStatus.NO_CONTENT.value(), "No hay actividades disponibles para el usuario " + userId)
                );
            }

            return ResponseEntity.ok(actividades);
        } catch (Exception e) {
            logger.error("Error al recuperar la lista de actividades para el usuario {} ", userId);
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al recuperar la lista de actividades para el usuario " + userId)
            );
        }
    }
}
