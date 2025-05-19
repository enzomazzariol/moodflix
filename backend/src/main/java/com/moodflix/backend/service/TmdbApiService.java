package com.moodflix.backend.service;

import com.google.gson.Gson;
import com.moodflix.backend.dtos.PlatformResponse;
import com.moodflix.backend.dtos.PlatformResult;
import com.moodflix.backend.dtos.TmdbRandomMovieResponse;
import com.moodflix.backend.dtos.TrailerResponse;
import com.moodflix.backend.exceptions.ApiResponse;
import com.moodflix.backend.exceptions.NotFoundException;
import com.moodflix.backend.model.Movie;
import com.moodflix.backend.model.PlatformProvider;
import com.moodflix.backend.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class TmdbApiService {

    private static final String TMDB_MOVIE_DETAILS_URL = "https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=es-ES";
    private static final String API_KEY = "a611b32cd1c6f2f99992b6aa4cf54f34";

    private final WebClient webClient;
    private final MovieRepository movieRepository;
    private final Gson gson;
    private final EmotionAnalyzerService emotionAnalyzerService;

    @Autowired
    public TmdbApiService(WebClient.Builder webClientBuilder, MovieRepository movieRepository, Gson gson, EmotionAnalyzerService emotionAnalyzerService) {
        this.webClient = webClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
        this.movieRepository = movieRepository;
        this.gson = gson;
        this.emotionAnalyzerService = emotionAnalyzerService;
    }

    public Movie fetchMovieFromTmdb(int movie_id) {
        try {
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
                // Añadimos el trailer
                fetchTrailerFromTmdb(movie);

                // Añadimos las plataformas
                fetchPlatformsFromTmdb(movie);

                // Volvemos a guardar la movie con los datos añadidos
                movieRepository.saveMovie(movie);

                // Asignamos las emociones a la movie
                // SI HAY TIEMPO HAY QUE MEJORAR ESTE METODO
                emotionAnalyzerService.analyzeAndAssignEmotions(movie);

                return movie;
            } else {
                throw new NotFoundException("Movie with ID " + movie_id + " not found in TMDB API");
            }
        } catch (WebClientResponseException e) {
            if (e.getStatusCode().equals(HttpStatus.NOT_FOUND)) {
                throw new NotFoundException("Movie with ID " + movie_id + " not found in TMDB API");
            } else {
                throw new RuntimeException("Error fetching movie from TMDB: " + e.getMessage(), e);
            }
        }
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

            // Mapeamos los datos
            PlatformResponse platformResponse = gson.fromJson(jsonResponse, PlatformResponse.class);

            StringBuilder platformsBuilder = new StringBuilder();

            if (platformResponse.getResults().containsKey("ES")) {
                PlatformResult result = platformResponse.getResults().get("ES");
                if (result != null && result.getFlatrate() != null && !result.getFlatrate().isEmpty()) {
                    String platforms = result.getFlatrate().stream()
                            .map(PlatformProvider::getProvider_name)
                            .collect(Collectors.joining(", "));
                    platformsBuilder.append(platforms);
                }
            }

            movie.setPlatforms(platformsBuilder.toString());
            System.out.println("Platforms found for movie " + movie.getMovie_id() + ": " + movie.getPlatforms());

        } catch(Exception e) {
            System.err.println("Error fetching platforms for movie " + movie.getMovie_id() + ": " + e.getMessage());
            e.printStackTrace();

            // Asegurarse de que las plataformas no queden nulas
            if (movie.getPlatforms() == null) {
                movie.setPlatforms("");
            }
        }
    }

    public ResponseEntity<?> fetchRandomMovie(String genre, String decade, String provider, Double minRating, Integer maxDuration, int index) {
        System.out.println(genre + decade + provider + minRating + maxDuration + index);
        try {
            // Asignar valores por defecto si son nulos o vacíos
            String genreFinal = (genre == null || genre.isEmpty()) ? null : genre;
            String decadeFinal = (decade == null || decade.isEmpty()) ? null : decade;
            String providerFinal = (provider == null || provider.isEmpty()) ? null : provider;
            double minRatingFinal = (minRating == null) ? 0.0 : minRating;
            int maxDurationFinal = (maxDuration == null) ? 240 : maxDuration;

            String startDate;
            String endDate;
            if (decadeFinal != null) {
                int startYear = Integer.parseInt(decadeFinal);
                int endYear = startYear + 9;
                startDate = startYear + "-01-01";
                endDate = endYear + "-12-31";
            } else {
                startDate = null;
                endDate = null;
            }

            //Construcción dinámica del URI eliminando parámetros innecesarios
            WebClient.RequestHeadersUriSpec<?> uriSpec = webClient.get();
            Mono<String> responseMono = uriSpec.uri(uriBuilder -> {
                uriBuilder.path("/discover/movie")
                        .queryParam("api_key", API_KEY)
                        .queryParam("language", "es-ES")
                        .queryParam("sort_by", "popularity.desc")
                        .queryParam("vote_average.gte", minRatingFinal)
                        .queryParam("with_runtime.lte", maxDurationFinal)
                        .queryParam("watch_region", "ES")
                        .queryParam("with_watch_monetization_types", "flatrate,free,ads,rent,buy");

                if (startDate != null) {
                    uriBuilder.queryParam("release_date.gte", startDate);
                    uriBuilder.queryParam("release_date.lte", endDate);
                }
                if (genreFinal != null) uriBuilder.queryParam("with_genres", genreFinal);
                if (providerFinal != null) uriBuilder.queryParam("with_watch_providers", providerFinal);

                return uriBuilder.build();
            }).retrieve().bodyToMono(String.class);

            // Procesar respuesta de la API
            String jsonResponse = responseMono.block();

            // Mapear usando GSON a una lista de objetos Movie
            TmdbRandomMovieResponse tmdbResponse = gson.fromJson(jsonResponse, TmdbRandomMovieResponse.class);

            List<Movie> movies = tmdbResponse.results();

            if (!movies.isEmpty() && index < movies.size()) {
                Movie selectedMovie = movies.get(index);
                Movie movieData = fetchMovieFromTmdb(selectedMovie.getMovie_id());
                return ResponseEntity.ok(movieData);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(404, "No hay más películas en la lista"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Ocurrió un error recuperando las películas, intentar de nuevo mas tarde."));
        }
    }
}

