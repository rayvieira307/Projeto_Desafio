package br.org.desafio_neki.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.JwtParser;
import javax.crypto.SecretKey;
import jakarta.servlet.http.HttpServletRequest;

public class JwtTokenUtil {

    // Usando uma chave de 256 bits (HS256)
    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256); 
   
    // Gera o token JWT
    public static String gerarToken(String email) {
        return Jwts.builder()
            .setSubject(email)
            .signWith(SECRET_KEY) // Usa a chave gerada de forma segura
            .compact();
    }

    // Obtém o token do cabeçalho da requisição
    public static String getTokenFromRequest(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7); // Retira o "Bearer " do começo
        }
        return null;
    }

    // Valida o token
    public static boolean validateToken(String token) {
        try {
            JwtParser jwtParser = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY) // Configura a chave de assinatura
                .build(); // Cria o parser

            // Tenta parsear e validar o token
            jwtParser.parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            // Log pode ser adicionado aqui para erros específicos
            return false;
        }
    }

    // Extrai o username (email) do token
    public static String getUsernameFromToken(String token) {
        JwtParser jwtParser = Jwts.parserBuilder()
            .setSigningKey(SECRET_KEY)
            .build();

        Claims claims = jwtParser.parseClaimsJws(token).getBody();
        return claims.getSubject(); // Retorna o subject, que no caso é o email
    }
}