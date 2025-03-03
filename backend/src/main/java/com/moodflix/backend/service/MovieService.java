package com.moodflix.backend.service;

import com.moodflix.backend.exceptions.ApiResponse;
import com.moodflix.backend.model.Movie;
import com.moodflix.backend.repositories.EmotionRepository;
import com.moodflix.backend.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private TmdbApiService tmdbApiService;

    @Autowired
    private EmotionRepository emotionRepository;

    /*
    * Metodo para buscar una pelicula por ID
    * Sino esta en la Base de datos, hacemos un fetch a la API de TMDB
    */
    public Movie getOrFetchMovie(int id) {
        Optional<Movie> movieOptional = movieRepository.findById(id);
        if(movieOptional.isPresent()) {
            System.out.println("movie obtenida de la base de datos");
            return movieOptional.get();
        } else {
            Movie movie = tmdbApiService.fetchMovieFromTmdb(id);
            movieRepository.saveMovie(movie);
            System.out.println("movie obtenida de la API");
            return movie;
        }
    }

    /*
    * Metodo para agregar una emocion a una pelicula
    */
    public ResponseEntity<?> addEmotionToMovie(int movie_id, List<String> emotion_names) {
        try{
            for(String name : emotion_names) {
                emotionRepository.findByName(name).ifPresent(emotion ->{
                    movieRepository.addEmotionToMovie(movie_id, emotion.getEmotion_id());
                });
            }
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        }
        return ResponseEntity.ok(new ApiResponse(HttpStatus.OK.value(), "Emociones insertadas correctamente a la movie: " + movie_id));
    }

    /*
    * Metodo para buscar peliculas por una emocion
    */
    public List<Movie> getMoviesByEmotion(String emotion_name) {
        return movieRepository.findMoviesByEmotion(emotion_name);
    }
}
