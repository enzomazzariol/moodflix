package com.moodflix.backend.service;

import com.moodflix.backend.dtos.FavoriteMovieRequest;
import com.moodflix.backend.dtos.FavoriteMovieResponse;
import com.moodflix.backend.dtos.MovieInfo;
import com.moodflix.backend.exceptions.ApiResponse;
import com.moodflix.backend.model.Activity;
import com.moodflix.backend.model.enums.ActivityType;
import com.moodflix.backend.repositories.ActivityRepository;
import com.moodflix.backend.repositories.UserFavoritesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserFavoritesService {
    private static final Logger logger = LoggerFactory.getLogger(UserFavoritesService.class);
    private final UserFavoritesRepository userFavoritesRepository;
    private final ActivityRepository activityRepository;

    @Autowired
    public UserFavoritesService(UserFavoritesRepository userFavoritesRepository, ActivityRepository activityRepository) {
        this.userFavoritesRepository = userFavoritesRepository;
        this.activityRepository = activityRepository;
    }

    @Transactional
    public ResponseEntity<?> addFavorite(FavoriteMovieRequest favoriteMovieRequest) {
        int userId = favoriteMovieRequest.user_id();
        int movieId = favoriteMovieRequest.movie_id();
        try {
            if (userFavoritesRepository.isFavorite(userId, movieId)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse(HttpStatus.BAD_REQUEST.value(), "La película ya está en tus favoritos"));
            }

            boolean result = userFavoritesRepository.addFavorite(userId, movieId);
            if (result) {
                Activity activity = new Activity();
                activity.setUser_id(userId);
                activity.setMovie_id(movieId);
                activity.setActivity_type(ActivityType.LIKE);
                activityRepository.saveActivity(activity);

                logger.info("Successfully added movie {} to favorites for user {}", movieId, userId);
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ApiResponse(HttpStatus.OK.value(), "Película añadida correctamente a tus favoritos"));
            } else {
                logger.warn("Failed to add movie {} to favorites for user {}", movieId, userId);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al añadir la película a tus favoritos"));
            }
        } catch (Exception e) {
            logger.error("Unexpected error adding movie {} to favorites for user {}: {}", movieId, userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<?> removeFavorite(FavoriteMovieRequest favoriteMovieRequest) {
        int movieId = favoriteMovieRequest.movie_id();
        int userId = favoriteMovieRequest.user_id();
        try {
            boolean result = userFavoritesRepository.removeFavorite(userId, movieId);
            if (result) {
                activityRepository.deleteActivityByType(userId, movieId, ActivityType.LIKE.getValue());
                logger.info("Successfully removed movie {} from favorites for user {}", movieId, userId);
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ApiResponse(HttpStatus.OK.value(), "Película eliminada de tus favoritos correctamente"));
            } else {
                logger.warn("Failed to remove movie {} from favorites for user {}", movieId, userId);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al eliminar la película de tus favoritos"));
            }
        } catch (Exception e) {
            logger.error("Unexpected error removing movie {} from favorites for user {}: {}", movieId, userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    public ResponseEntity<?> getUserFavorites(int userId) {
        try {
            List<FavoriteMovieResponse> favorites = userFavoritesRepository.getUserFavorites(userId);
            logger.info("Retrieved {} favorite movies for user {}", favorites.size(), userId);
            return ResponseEntity.ok(favorites);
        } catch (Exception e) {
            logger.error("Unexpected error retrieving favorite movies for user {}: {}", userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    public ResponseEntity<?> isFavorite(FavoriteMovieRequest favoriteMovieRequest) {
        int userId = favoriteMovieRequest.user_id();
        int movieId = favoriteMovieRequest.movie_id();
        try {
            boolean result = userFavoritesRepository.isFavorite(userId, movieId);
            logger.debug("Movie {} is{} a favorite for user {}", movieId, result ? "" : " not", userId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ApiResponse(HttpStatus.OK.value(), "" + result));
        } catch (Exception e) {
            logger.error("Unexpected error checking if movie {} is favorite for user {}: {}", movieId, userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    public Optional<MovieInfo> getLastLikedMovieId(Long userId) {
        return userFavoritesRepository.findLastLikedMovieInfoByUser(userId);
    }
}