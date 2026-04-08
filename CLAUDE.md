# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Moodflix is a movie/series recommendation app that suggests content based on the user's mood/emotion. It consists of:

- **`backend/`** — Spring Boot 3.4 REST API (Java 23, Maven)
- **`moodflix-mobile/`** — React Native + Expo (SDK 53) mobile app
- **`moodflix-web/`** — Next.js web app (minimal, currently early stage)
- **`shared/`** — Shared JS hooks and API services used by both mobile and web

## Development Commands

### Mobile (`moodflix-mobile/`)
```bash
cd moodflix-mobile
npm install
npx expo start          # Start dev server (scan QR with Expo Go)
npx expo start --ios    # Run on iOS simulator
npx expo start --android
```

### Backend (`backend/`)
```bash
cd backend
./mvnw spring-boot:run          # Run with hot-reload
./mvnw clean package            # Build JAR
./mvnw test                     # Run tests
./mvnw test -Dtest=ClassName    # Run single test class
```

### Database (Docker)
```bash
cd docker
docker compose up -d   # Start MySQL 8.0
```

## Architecture

### Backend
- **Spring Boot** with pure JDBC (no ORM/JPA) — all DB access is in `repositories/` using `JdbcTemplate`
- **Pattern**: Controller → Service → Repository
- **Auth**: JWT (stateless), `JwtAuthFilter` intercepts all requests. Only `/auth/login` and `/auth/signup` are public
- **Movie data**: Movies are fetched from TMDB API on first access and cached in local MySQL DB (`MovieService.getOrFetchMovie`)
- **Base URL**: All endpoints are prefixed with `/moodflix`
- **Key external dependency**: TMDB API (`TmdbApiService`) for movie metadata, trailers, streaming providers

### Mobile
- **Expo Router** (file-based routing) — screens live in `src/app/`
- **Route groups**: `(auth)` login/signup, `(tabs)` main app, `(onboarding)` first-run, `(randomizerMovie)` randomizer result
- **Styling**: NativeWind (Tailwind CSS for React Native) + inline styles; custom colors in `src/utils/colors.js`, fonts in `src/utils/fonts.js`
- **Fonts**: Outfit (primary) and SpaceGrotesk (headers), loaded in root `_layout.js`
- **Context providers** (root `_layout.js`): `AuthProvider`, `SearchProvider`, `SearchHistoryProvider`

### Shared Hooks & Services
- `shared/services/apiMoodflixConfig.js` — Axios instance for the backend API. **The `BASE_URL` hardcodes a local IP** (`192.168.0.19:8080`) — must be updated to match your network
- `shared/services/tmdbApiConfig.js` — Axios instance for TMDB. API key is hardcoded as fallback; prefer `EXPO_TMDB_API_KEY` env var
- `shared/hooks/useMoodflix.js` — Main hook wrapping all backend API calls
- `shared/hooks/useTMDB.js` — Hook for direct TMDB API calls (search, genres, similar movies, etc.)
- Domain-specific hooks (e.g., `useMovie`, `useMovieStatus`, `useActivity`) build on top of `useMoodflix`

### Data Flow
1. Mobile calls `useMoodflix` hooks → `MOODFLIX_API_CONFIG` (Axios) → Spring Boot backend
2. Backend checks local MySQL DB; if movie not found, fetches from TMDB and caches it
3. Movie status (liked/watched/watchlist) is stored in the backend DB and triggers activity log entries

## Key Configuration

- **Backend IP for mobile**: Change `BASE_URL` in `shared/services/apiMoodflixConfig.js` when switching Wi-Fi networks
- **Docker env vars**: Create a `.env` in `docker/` with `COMPOSE_PROJECT_NAME`, `MYSQL_PORT`, `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`
- **Backend DB config**: `backend/src/main/resources/application.properties` (not committed — configure MySQL connection there)
- **Java version**: 23 with `--enable-preview` compiler flag

## Design System

Colors (defined in `src/utils/colors.js` and `tailwind.config.js`):
- Primary background: `raisinBlack` (#19212E)
- Primary text: `floralWhite` (#FFFCF2)
- Accent/active: `jasper` (#D66853)
- Available as both `colors.X` JS constants and Tailwind classes (e.g., `bg-raisinBlack`)
