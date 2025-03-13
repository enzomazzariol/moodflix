package com.moodflix.backend.controller;

import com.moodflix.backend.dtos.MovieRatingRequest;
import com.moodflix.backend.service.MovieRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/moodflix/rating")
@CrossOrigin(origins = "http://localhost:8081")
public class MovieRatingController {

    private final MovieRatingService movieRatingService;

    public MovieRatingController(MovieRatingService movieRatingService) {
        this.movieRatingService = movieRatingService;
    }
    /**
        Endpoint para calificar una película o actualizar una calificación existente
     */
    @PostMapping
    public ResponseEntity<?> rateMovie(@RequestBody MovieRatingRequest movieRatingRequest) {
        // Por ahora solo se hace el review despues de haber entrado en la pagina de la peli (para que se inserte la peli en la bd)
        // si se quiere cambiar esto, se debe hacer el fetch de la API si la pelicula no existe antes de generar el review
        return movieRatingService.rateMovie(
                movieRatingRequest.userId(),
                movieRatingRequest.movieId(),
                movieRatingRequest.rating(),
                movieRatingRequest.review()
        );
    }

    /**
     Endpoint para obtener todas las calificaciones de una película
     */
    @GetMapping("/{movieId}")
    public ResponseEntity<?> getMovieRatings(@PathVariable int movieId) {
        return movieRatingService.getMovieRatings(movieId);
    }
    /**
     Endpoint para obtener el promedio de calificaciones de una película
     */
    @GetMapping("/{movieId}/average")
    public ResponseEntity<?> getAverageRating(@PathVariable int movieId) {
        return movieRatingService.getAverageRating(movieId);
    }

    /**
     Endpoint para eliminar una reseña de una película
     */
    @DeleteMapping("/{userId}/movie/{movieId}")
    public ResponseEntity<?> deleteReview(@PathVariable int userId, @PathVariable int movieId) {
        return movieRatingService.deleteReview(userId, movieId);
    }
}
