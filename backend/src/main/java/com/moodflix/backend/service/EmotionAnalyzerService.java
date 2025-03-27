package com.moodflix.backend.service;

import com.moodflix.backend.model.Emotion;
import com.moodflix.backend.model.Movie;
import com.moodflix.backend.repositories.EmotionRepository;
import com.moodflix.backend.repositories.MovieRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.*;

@Service
public class EmotionAnalyzerService {
    private static final Logger logger = LoggerFactory.getLogger(EmotionAnalyzerService.class);

    private final MovieRepository movieRepository;
    private final EmotionRepository emotionRepository;

    // Mapeo refinado de Géneros a Emociones Principales
    private static final Map<Integer, String> GENRE_TO_PRIMARY_EMOTION = new HashMap<>();

    static {
        GENRE_TO_PRIMARY_EMOTION.put(28, "Adrenaline Rush");      // Acción
        GENRE_TO_PRIMARY_EMOTION.put(12, "Wonder");               // Aventura
        GENRE_TO_PRIMARY_EMOTION.put(16, "Nostalgia");            // Animación
        GENRE_TO_PRIMARY_EMOTION.put(35, "Felicidad");            // Comedia
        GENRE_TO_PRIMARY_EMOTION.put(80, "Intrigado");            // Crimen
        GENRE_TO_PRIMARY_EMOTION.put(99, "Curiosidad");           // Documental
        GENRE_TO_PRIMARY_EMOTION.put(18, "Melancolía");           // Drama
        GENRE_TO_PRIMARY_EMOTION.put(10751, "Gratitud");          // Familia
        GENRE_TO_PRIMARY_EMOTION.put(14, "Asombro");              // Fantasía
        GENRE_TO_PRIMARY_EMOTION.put(36, "Reflexión");            // Historia
        GENRE_TO_PRIMARY_EMOTION.put(27, "Ansiedad");             // Terror
        GENRE_TO_PRIMARY_EMOTION.put(10402, "Euforia");           // Música
        GENRE_TO_PRIMARY_EMOTION.put(9648, "Sorpresa");           // Misterio
        GENRE_TO_PRIMARY_EMOTION.put(10749, "Romántico");         // Romance
        GENRE_TO_PRIMARY_EMOTION.put(878, "Curiosidad");          // Ciencia ficción
        GENRE_TO_PRIMARY_EMOTION.put(10770, "Nostalgia");         // Película de TV
        GENRE_TO_PRIMARY_EMOTION.put(53, "Ansiedad");             // Thriller
        GENRE_TO_PRIMARY_EMOTION.put(10752, "Gravedad");          // Guerra
        GENRE_TO_PRIMARY_EMOTION.put(37, "Nostalgia");            // Western
    }

    // Diccionario de palabras clave para análisis emocional
    private static final Map<String, String> EMOTION_KEYWORDS = new HashMap<>();

    static {
        EMOTION_KEYWORDS.put("amor", "Romántico");
        EMOTION_KEYWORDS.put("triste", "Melancolía");
        EMOTION_KEYWORDS.put("feliz", "Felicidad");
        EMOTION_KEYWORDS.put("miedo", "Ansiedad");
        EMOTION_KEYWORDS.put("esperanza", "Esperanza");
        EMOTION_KEYWORDS.put("aventura", "Wonder");
        EMOTION_KEYWORDS.put("misterio", "Intrigado");
        EMOTION_KEYWORDS.put("muerte", "Gravedad");
        EMOTION_KEYWORDS.put("guerra", "Gravedad");
        EMOTION_KEYWORDS.put("venganza", "Ira");
        EMOTION_KEYWORDS.put("fantasía", "Dreamy");
        EMOTION_KEYWORDS.put("comedia", "Comedia");
        EMOTION_KEYWORDS.put("terror", "Ansiedad");
        EMOTION_KEYWORDS.put("horror", "Ansiedad");
        EMOTION_KEYWORDS.put("sorpresa", "Sorpresa");
        EMOTION_KEYWORDS.put("drama", "Nostalgia");
        EMOTION_KEYWORDS.put("acción", "Adrenaline Rush");
        EMOTION_KEYWORDS.put("ciencia ficción", "Curiosidad");
        EMOTION_KEYWORDS.put("superhéroes", "Liberation");
        EMOTION_KEYWORDS.put("thriller", "Uncertainty");
        EMOTION_KEYWORDS.put("suspenso", "Uncertainty");
        EMOTION_KEYWORDS.put("policial", "Cynicism");
        EMOTION_KEYWORDS.put("crimen", "Cynicism");
        EMOTION_KEYWORDS.put("persecución", "Adrenaline Rush");
        EMOTION_KEYWORDS.put("distopía", "Desesperación");
        EMOTION_KEYWORDS.put("futuro", "Curiosidad");
        EMOTION_KEYWORDS.put("pasado", "Nostalgia");
        EMOTION_KEYWORDS.put("historia", "Gravedad");
        EMOTION_KEYWORDS.put("familia", "Gratitud");
        EMOTION_KEYWORDS.put("niños", "Felicidad");
        EMOTION_KEYWORDS.put("robots", "Curiosidad");
        EMOTION_KEYWORDS.put("viaje en el tiempo", "Wonder");
        EMOTION_KEYWORDS.put("desamor", "Heartbroken");
        EMOTION_KEYWORDS.put("tragedia", "Desesperación");
        EMOTION_KEYWORDS.put("soledad", "Vulnerable");
        EMOTION_KEYWORDS.put("libertad", "Liberation");
        EMOTION_KEYWORDS.put("superación", "Hopeful Darkness");
        EMOTION_KEYWORDS.put("amistad", "Gratitud");
    }

    public EmotionAnalyzerService(MovieRepository movieRepository,
                                  EmotionRepository emotionRepository) {
        this.movieRepository = movieRepository;
        this.emotionRepository = emotionRepository;
    }

    /**
     * Analiza y asigna emociones a una película basado en género y descripción
     */
    public void analyzeAndAssignEmotions(Movie movie) {
        try {
            // Obtener emoción por género
            String primaryEmotion = getPrimaryEmotionByGenre(movie);

            // Analizar descripción para refinar o añadir una segunda emoción
            String secondaryEmotion = analyzeDescriptionEmotion(movie.getDescription());

            // Asignar emociones
            assignEmotionsToMovie(movie, primaryEmotion, secondaryEmotion);
        } catch (Exception e) {
            logger.error("Error al analizar emociones para la película {}: {}",
                    movie.getMovie_id(), e.getMessage());
        }
    }

    /**
     * Obtiene la emoción principal basada en los géneros de la película
     */
    private String getPrimaryEmotionByGenre(Movie movie) {
        if (movie.getGenre() != null && !movie.getGenre().isEmpty()) {
            // Toma el primer género como referencia principal
            Integer firstGenreId = movie.getGenre().get(0).getId();
            return GENRE_TO_PRIMARY_EMOTION.getOrDefault(firstGenreId, "Neutral");
        }
        return "Neutral";
    }

    /**
     * Analiza la descripción para extraer emociones adicionales
     */
    private String analyzeDescriptionEmotion(String description) {
        if (description == null || description.isEmpty()) {
            return null;
        }

        // Convertir a minúsculas para comparación
        description = description.toLowerCase();

        // Buscar palabras clave de emociones
        for (Map.Entry<String, String> entry : EMOTION_KEYWORDS.entrySet()) {
            if (description.contains(entry.getKey())) {
                return entry.getValue();
            }
        }

        return null;
    }

    /**
     * Asigna las emociones encontradas a la película
     */
    private void assignEmotionsToMovie(Movie movie, String primaryEmotion, String secondaryEmotion) {
        Set<Emotion> emotions = new HashSet<>();

        // Añadir emoción primaria
        findAndAddEmotion(emotions, primaryEmotion);

        // Añadir emoción secundaria si es diferente de la primaria
        if (secondaryEmotion != null && !secondaryEmotion.equals(primaryEmotion)) {
            findAndAddEmotion(emotions, secondaryEmotion);
        }

        // Guardar emociones en la base de datos
        if (!emotions.isEmpty()) {
            emotions.forEach(emotion ->
                    movieRepository.addEmotionToMovie(movie.getMovie_id(), emotion.getEmotion_id())
            );
        }
    }

    /**
     * Busca una emoción en el repositorio y la añade al conjunto
     */
    private void findAndAddEmotion(Set<Emotion> emotions, String emotionName) {
        emotionRepository.findByName(emotionName).ifPresentOrElse(
                emotions::add,
                () -> logger.warn("Emoción no encontrada en la base de datos: {}", emotionName)
        );
    }
}