package com.moodflix.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

public class JwtHelper {

    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final int ACCESS_TOKEN_EXPIRATION_HOURS = 24;
    private static final int REFRESH_TOKEN_EXPIRATION_DAYS = 7;

    public static String generateToken(String email) {
        Instant now = Instant.now();
        Instant expiration = now.plus(ACCESS_TOKEN_EXPIRATION_HOURS, ChronoUnit.HOURS);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(expiration))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }
    // Generar el Refresh Token
    public static String generateRefreshToken(String email) {
        Instant now = Instant.now();
        Instant expiration = now.plus(REFRESH_TOKEN_EXPIRATION_DAYS, ChronoUnit.DAYS);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(expiration))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    // Extrer nombre de usuario del token
    public static String extractUsername(String token) {
        return getTokenBody(token).getSubject();
    }

    // Validar token de acceso
    public static Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    // Validar el Refresh Token
    public static Boolean validateRefreshToken(String token) {
        return !isTokenExpired(token);
    }

    private static Claims getTokenBody(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (SignatureException | ExpiredJwtException e) { // Invalid signature or expired token
            throw new AccessDeniedException("Access denied: " + e.getMessage());
        }
    }

    private static boolean isTokenExpired(String token) {
        Claims claims = getTokenBody(token);
        return claims.getExpiration().before(new Date());
    }
}
