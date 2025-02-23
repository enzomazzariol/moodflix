package com.moodflix.backend.service;

import com.moodflix.backend.model.Movie;
import com.moodflix.backend.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private TmdbApiService tmdbApiService;

    // Metodo para buscar una pelicula por ID
    // Sino esta en la Base de datos, hacemos un fetch a la API de TMDB
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
}
