package com.moodflix.backend.service;

import com.moodflix.backend.dtos.FavoriteMovieRequest;
import com.moodflix.backend.dtos.MovieStatusDTO;
import com.moodflix.backend.exceptions.ApiResponse;
import com.moodflix.backend.model.Emotion;
import com.moodflix.backend.model.Movie;
import com.moodflix.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
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
    *
    * SI por alguna razon se hace muy tedioso trabajar con la bd o no es escalable, quitamos la comprobacion de la base de datos
    * y dejamos solo recuperar las pelis a traves de la api
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
    * @param id de la pelicula
    * @param Lista de emociones
    */
    public ResponseEntity<?> addEmotionToMovie(int movie_id, List<String> emotion_names) {
        List<String> notFound = new ArrayList<>();

        try {
            for (String name : emotion_names) {
                Optional<Emotion> optionalEmotion = emotionRepository.findByName(name);
                if (optionalEmotion.isPresent()) {
                    movieRepository.addEmotionToMovie(movie_id, optionalEmotion.get().getEmotion_id());
                } else {
                    notFound.add(name); // Agregar la emoción que no se encontró
                }
            }

            if (!notFound.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(HttpStatus.NOT_FOUND.value(), "Emociones no encontradas: " + notFound));
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        }

        return ResponseEntity.ok(new ApiResponse(HttpStatus.OK.value(), "Emociones insertadas correctamente a la movie: " + movie_id));
    }


    /*
    * Metodo para buscar peliculas por una emocion
    */
    public ResponseEntity<?> getMoviesByEmotion(String emotion_name) {
        List<Movie> movies = movieRepository.findMoviesByEmotion(emotion_name);

        if(movies.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(HttpStatus.NOT_FOUND.value(), "No se encontraron películas con la emoción: " + emotion_name));
        }

        return ResponseEntity.ok(movies);
    }
}
