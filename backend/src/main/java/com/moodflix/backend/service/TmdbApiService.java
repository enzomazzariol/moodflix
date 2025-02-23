package com.moodflix.backend.service;

import com.google.gson.Gson;
import com.moodflix.backend.model.Movie;
import com.moodflix.backend.repositories.MovieRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Optional;

@Service
public class TmdbApiService {

    private static final String TMDB_MOVIE_DETAILS_URL = "https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=es-ES";
    private static final String API_KEY = "a611b32cd1c6f2f99992b6aa4cf54f34";

    private final WebClient webClient;
    private final MovieRepository movieRepository;
    private final Gson gson;

    public TmdbApiService(WebClient.Builder webClientBuilder, MovieRepository movieRepository, Gson gson) {
        this.webClient = webClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
        this.movieRepository = movieRepository;
        this.gson = gson;
    }

    public Movie fetchMovieFromTmdb(int movie_id) {

        // Verificamos que la pelicula esta en la base de datos
        Optional<Movie> movieOptional = movieRepository.findById(movie_id);
        if(movieOptional.isPresent()) {
            return movieOptional.get();
        }

        // Si no esta, la buscamos en la API de TMDB y la insertamos en la BD
        String jsonResponse = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/{movie_id}")
                        .queryParam("api_key", API_KEY)
                        .queryParam("language", "es-ES")
                        .build(movie_id))
                .retrieve()
                .bodyToMono(String.class)
                .block();

        Movie movie = gson.fromJson(jsonResponse, Movie.class);

        if(movie != null) {
            movieRepository.saveMovie(movie);
        }

        return movie;
    }
}
