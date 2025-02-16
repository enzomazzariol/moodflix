package com.moodflix.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
@Component
public class JwtHelper {

    private final Key SECRET_KEY;

    public JwtHelper(@Value("${jwt.secret}") String secret) {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.SECRET_KEY = Keys.hmacShaKeyFor(keyBytes);
    }

    public Key getSecretKey() {
        return SECRET_KEY;
    }

    private static final int ACCESS_TOKEN_EXPIRATION_HOURS = 24;
    private static final int REFRESH_TOKEN_EXPIRATION_DAYS = 7;

    public String generateToken(String email) {
        Instant now = Instant.now();
        Instant expiration = now.plus(ACCESS_TOKEN_EXPIRATION_HOURS, ChronoUnit.HOURS);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(expiration))
                .signWith(getSecretKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    // Generar el Refresh Token
    public String generateRefreshToken(String email) {
        Instant now = Instant.now();
        Instant expiration = now.plus(REFRESH_TOKEN_EXPIRATION_DAYS, ChronoUnit.DAYS);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(expiration))
                .signWith(getSecretKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Extrer nombre de usuario del token
    public String extractUsername(String token) {
        return getTokenBody(token).getSubject();
    }

    // Validar token de acceso
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    // Validar el Refresh Token
    public Boolean validateRefreshToken(String token) {
        return !isTokenExpired(token);
    }

    private Claims getTokenBody(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSecretKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (SignatureException e) { // Invalid signature or expired token
            throw new AccessDeniedException("Acceso denegado: Firma del token invalida. La validez de JWT no se puede afirmar");
        } catch(ExpiredJwtException e) {
            throw new AccessDeniedException("Acceso denegado: El token ha expirado");
        }
    }

    private boolean isTokenExpired(String token) {
        Claims claims = getTokenBody(token);
        return claims.getExpiration().before(new Date());
    }
}
