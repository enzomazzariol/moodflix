package com.moodflix.backend.service;

import com.moodflix.backend.model.Emotion;
import com.moodflix.backend.model.Movie;
import com.moodflix.backend.repositories.EmotionRepository;
import com.moodflix.backend.repositories.MovieRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
public class EmotionAnalyzerService {

    private static final Logger logger = LoggerFactory.getLogger(EmotionAnalyzerService.class);

    private final MovieRepository movieRepository;
    private final EmotionRepository emotionRepository;
    // URL de servicio externo de NLP (reemplazar con tu servicio real)
    private static final String NLP_SERVICE_URL = "https://api.tuservicionlp.com/analyze";

    // Mapeo de Generos a Emotions
    private static final Map<Integer, List<String>> GENRE_TO_EMOTIONS = new HashMap<>();

    // El bloque static {} permite inicializar el HashMap con más de 10 entradas.
    static {
        GENRE_TO_EMOTIONS.put(28, List.of("Euforia", "Adrenaline Rush", "Ira")); // Acción
        GENRE_TO_EMOTIONS.put(12, List.of("Aventura", "Wonder", "Liberation")); // Aventura
        GENRE_TO_EMOTIONS.put(16, List.of("Felicidad", "Nostalgia", "Dreamy")); // Animación
        GENRE_TO_EMOTIONS.put(35, List.of("Comedia", "Felicidad", "Cynicism")); // Comedia
        GENRE_TO_EMOTIONS.put(80, List.of("Intrigado", "Desesperación", "Ira")); // Crimen
        GENRE_TO_EMOTIONS.put(99, List.of("Curiosidad", "Gratitud", "Reflexión")); // Documental
        GENRE_TO_EMOTIONS.put(18, List.of("Melancolía", "Euphoric Sadness", "Gravedad")); // Drama
        GENRE_TO_EMOTIONS.put(10751, List.of("Felicidad", "Nostalgia", "Gratitud")); // Familia
        GENRE_TO_EMOTIONS.put(14, List.of("Asombro", "Dreamy", "Curiosidad")); // Fantasía
        GENRE_TO_EMOTIONS.put(36, List.of("Gravedad", "Curiosidad", "Reflexión")); // Historia
        GENRE_TO_EMOTIONS.put(27, List.of("Ansiedad", "Shocked", "Desesperación")); // Terror
        GENRE_TO_EMOTIONS.put(10402, List.of("Euforia", "Hopeful Darkness", "Felicidad")); // Música
        GENRE_TO_EMOTIONS.put(9648, List.of("Sorpresa", "Uncertainty", "Intrigado")); // Misterio
        GENRE_TO_EMOTIONS.put(10749, List.of("Romántico", "Heartbroken", "Esperanza")); // Romance
        GENRE_TO_EMOTIONS.put(878, List.of("Curiosidad", "Wonder", "Uncertainty")); // Ciencia ficción
        GENRE_TO_EMOTIONS.put(10770, List.of("Relajación", "Nostalgia", "Felicidad")); // Película de TV
        GENRE_TO_EMOTIONS.put(53, List.of("Ansiedad", "Sorpresa", "Adrenaline Rush")); // Thriller
        GENRE_TO_EMOTIONS.put(10752, List.of("Ira", "Desesperación", "Gravedad")); // Guerra
        GENRE_TO_EMOTIONS.put(37, List.of("Nostalgia", "Liberation", "Gravedad")); // Western
    }

    public EmotionAnalyzerService(MovieRepository movieRepository,
                                  EmotionRepository emotionRepository) {
        this.movieRepository = movieRepository;
        this.emotionRepository = emotionRepository;
    }

    /**
     * Analiza y asigna emociones a una película basado en múltiples fuentes
     */
    public void analyzeAndAssignEmotions(Movie movie) {
        try {
            Set<String> emotionNames = getEmotionsByGenre(movie);
            Set<Emotion> emotions = new HashSet<>();

            for (String emotionName : emotionNames) {
                emotionRepository.findByName(emotionName).ifPresentOrElse(
                        emotions::add,
                        () -> logger.warn("Emoción no encontrada en la base de datos: {}", emotionName)
                );
            }

            if (!emotions.isEmpty()) {
                emotions.forEach(emotion -> movieRepository.addEmotionToMovie(movie.getMovie_id(), emotion.getEmotion_id()));
            }
        } catch (Exception e) {
            logger.error("Error al analizar emociones para la película {}: {}", movie.getMovie_id(), e.getMessage());
        }
    }

    /**
     * Obtiene emociones basadas en los géneros de la película
     * Devuelve las emociones encontradas en el hashmap de generos
     */
    private Set<String> getEmotionsByGenre(Movie movie) {
        Set<String> emotions = new HashSet<>();

        if(movie.getGenre() != null) {
            movie.getGenre().forEach(genre -> {
                List<String> genreEmotions = GENRE_TO_EMOTIONS.get(genre.getId());
                if(genreEmotions != null) {
                    emotions.addAll(genreEmotions);
                }
            });
        }
        return emotions;
    }

    /**
     * Analiza la descripción de la película para extraer emociones
     * Usa un servicio externo de NLP
     */
    private void getEmotionsByDescription(Movie movie) {
        //TODO
    }
}
