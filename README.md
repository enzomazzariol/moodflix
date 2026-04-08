# Moodflix

> **¿Qué ves cuando no sabes qué ver?**

La mayoría de plataformas de streaming te abruman con carruseles interminables de contenido. Moodflix plantea un enfoque diferente: en lugar de buscar por género o popularidad, le dices **cómo te sientes**, y encuentra la película adecuada para ese momento.

---

## El Problema

Abres Netflix. Scrolleas 20 minutos. No ves nada.

El problema real es que las recomendaciones basadas en tu historial no tienen en cuenta tu estado emocional actual. La misma persona quiere ver cosas completamente distintas un domingo lluvioso que un viernes por la noche con amigos. El estado de ánimo importa más que el historial.

---

## La Solución

Moodflix es una **aplicación móvil full-stack** que conecta tu emoción actual con una recomendación de película. Elige una emoción — *Nostalgia*, *Euforia*, *Ansiedad*, *Wonder* — y recibe una sugerencia inmediata y relevante. Sin navegación, sin parálisis de decisión.

Más allá del descubrimiento por emoción, la app cubre el ciclo completo de ver películas:

- **Inicio** — Populares, en cines, próximos estrenos y recomendaciones personalizadas basadas en tu última película favorita
- **Búsqueda y exploración** — Filtra por género, busca por título, explora categorías curadas (clásicos, indie, novedades, mejor valoradas)
- **Detalle de película** — Información completa, tráiler, disponibilidad en plataformas de streaming, reparto y películas similares
- **Randomizador** — Obtén una película aleatoria filtrada por género, década, plataforma, rating y duración
- **Perfil y actividad** — Registra películas vistas, favoritos, lista de seguimiento y un feed de tu actividad reciente
- **Reseñas y valoraciones** — Puntúa y reseña las películas que has visto

---

## Stack Tecnológico

### Móvil
- **React Native + Expo** (SDK 53) con **Expo Router** para navegación basada en archivos
- **NativeWind** (Tailwind CSS para React Native) para los estilos
- **Axios** con interceptor JWT y refresco automático de token

### Backend
- **Spring Boot 3.4** (Java 23) API REST
- **Spring Security** con autenticación JWT sin estado
- **JDBC puro** con MySQL 8 — sin ORM
- **Spring WebFlux WebClient** para llamadas no bloqueantes a APIs externas

### APIs Externas
- **TMDB API** — metadatos de películas, tráilers, plataformas de streaming, búsqueda y descubrimiento
- Las películas se obtienen de TMDB en la primera petición y se **cachean en la base de datos local**, por lo que las consultas posteriores son instantáneas

### Infraestructura
- **MySQL 8** mediante Docker Compose
- El mapeo emoción-película se ejecuta automáticamente cada vez que se ingesta una nueva película: se analizan géneros y palabras clave de la descripción para etiquetar cada película con las emociones que evoca

---

## Cómo Funciona el Mapeo de Emociones

Cuando se obtiene una nueva película de TMDB, `EmotionAnalyzerService` la clasifica automáticamente:

1. **Género → Emoción primaria** — cada género de TMDB se mapea a una emoción principal (ej. Terror → *Ansiedad*, Comedia → *Felicidad*, Misterio → *Sorpresa*)
2. **Descripción → Emoción secundaria** — la sinopsis se analiza buscando palabras clave emocionales (ej. "venganza" → *Ira*, "superación" → *Esperanza*)
3. Ambas emociones se persisten en la BD, de modo que `GET /movies/emotion/{nombre}` devuelve las películas etiquetadas con esa emoción

---

## Arquitectura

```
moodflix/
├── backend/          # API Spring Boot  (Java 23, Maven)
├── moodflix-mobile/  # App Expo + React Native
├── moodflix-web/     # Web app Next.js  (en desarrollo)
├── shared/           # Hooks JS y configs de Axios compartidos entre clientes
└── docker/           # Docker Compose para MySQL
```

La capa `shared/` desacopla la comunicación con la API de la app: todas las llamadas al backend pasan por `useMoodflix`, todas las llamadas a TMDB por `useTMDB`. Los hooks de pantalla (ej. `useMovieStatus`, `useActivity`) se componen encima de estos.

---

## Arrancar el Proyecto

**1. Iniciar la base de datos**
```bash
cd docker && docker compose up -d
```

**2. Iniciar el backend** (requiere Java 23)
```bash
cd backend && ./mvnw spring-boot:run
```

**3. Iniciar la app móvil**
```bash
cd moodflix-mobile && npm install && npx expo start
```

> Antes de arrancar, configura la IP del backend en `shared/services/apiMoodflixConfig.js` para que coincida con tu red local.

---

## Estado

En desarrollo activo. Las funcionalidades principales funcionan de extremo a extremo en dispositivos físicos. El cliente web está en fases iniciales.
