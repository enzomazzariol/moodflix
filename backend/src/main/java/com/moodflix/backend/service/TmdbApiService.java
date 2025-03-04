package com.moodflix.backend.service;

import com.google.gson.Gson;
import com.moodflix.backend.dtos.PlatformResponse;
import com.moodflix.backend.dtos.PlatformResult;
import com.moodflix.backend.dtos.TrailerResponse;
import com.moodflix.backend.exceptions.ApiResponse;
import com.moodflix.backend.model.Movie;
import com.moodflix.backend.model.PlatformProvider;
import com.moodflix.backend.model.Trailer;
import com.moodflix.backend.repositories.MovieRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.stream.Collectors;

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
        // Buscamos la Movie en la API de TMDB y la insertamos en la BD

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

        if (movie != null) {
            // Guardamos la película primero
            movieRepository.saveMovie(movie);

            // Añadimos el trailer
            fetchTrailerFromTmdb(movie);

            // Añadimos las plataformas
            fetchPlatformsFromTmdb(movie);

            // Volvemos a guardar la movie con los datos añadidos
            movieRepository.saveMovie(movie);
        }

        return movie;
    }

    public void fetchTrailerFromTmdb(Movie movie) {
        try {
            // Fetch trailer information from TMDB API
            String jsonResponse = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/movie/{movie_id}/videos")
                            .queryParam("api_key", API_KEY)
                            .queryParam("language", "en-EN")
                            .build(movie.getMovie_id()))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            // Map API response to TrailerResponse
            TrailerResponse trailerResponse = gson.fromJson(jsonResponse, TrailerResponse.class);
            String trailerPath = null;

            // Priority order for trailer selection
            if (trailerResponse.results() != null) {
                // First, try to find an official YouTube trailer
                trailerPath = trailerResponse.results().stream()
                        .filter(trailer -> trailer.getType().equals("Trailer") &&
                                trailer.isOfficial() &&
                                trailer.getSite().equals("YouTube"))
                        .findFirst()
                        .map(trailer -> "https://www.youtube.com/watch?v=" + trailer.getKey())
                        .orElse(null);

                // If no official trailer, try any YouTube trailer
                if (trailerPath == null) {
                    trailerPath = trailerResponse.results().stream()
                            .filter(trailer -> trailer.getSite().equals("YouTube"))
                            .findFirst()
                            .map(trailer -> "https://www.youtube.com/watch?v=" + trailer.getKey())
                            .orElse(null);
                }
            }
            // seteamos el trailer path a la movie
            if (trailerPath != null) {
                movie.setTrailer_url(trailerPath);
            }
        } catch (Exception e) {
            // Proper error logging
            System.err.println("Error fetching trailer for movie ID " + movie.getMovie_id() + ": " + e.getMessage());
            throw new RuntimeException("Failed to fetch trailer", e);
        }
    }

    public void fetchPlatformsFromTmdb(Movie movie) {
        try {
            // Buscamos el path del trailer en la API
            String jsonResponse = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/movie/{movie_id}/watch/providers")
                            .queryParam("api_key", API_KEY)
                            .build(movie.getMovie_id()))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            PlatformResponse platformResponse = gson.fromJson(jsonResponse, PlatformResponse.class);

            String platforms = "";

            if (platformResponse != null &&
                    platformResponse.getResults() != null &&
                    platformResponse.getResults().containsKey("ES")) {

                PlatformResult result = platformResponse.getResults().get("ES");

                if (result != null && result.getFlatrate() != null && !result.getFlatrate().isEmpty()) {
                    platforms = result.getFlatrate().stream()
                            .map(PlatformProvider::getProvider_name)
                            .collect(Collectors.joining(", "));
                }
            }

            if(platforms != null) {
                movie.setPlatforms(platforms);
            }

        } catch(Exception e) {
            System.err.println("Error fetching platforms: " + e.getMessage());
        }
    }
}
