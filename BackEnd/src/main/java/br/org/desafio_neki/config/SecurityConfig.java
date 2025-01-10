package br.org.desafio_neki.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import br.org.desafio_neki.util.JwtAuthenticationFilter;
import br.org.desafio_neki.util.JwtTokenUtil;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Content-Type", "Authorization"));

		// Configuração do Cors para a URL
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfiguration); 
		return source;
	}

	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public InMemoryUserDetailsManager userDetailsService(PasswordEncoder passwordEncoder) {
		UserDetails admin = User.withUsername("admin").password(passwordEncoder.encode("123")) 
				.build();

		return new InMemoryUserDetailsManager(admin);
	}
	
	
	 @Bean
	 public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	     http
	         .cors(cors -> cors.configurationSource(corsConfigurationSource()))
	         .csrf(csrf -> csrf.disable())
	         .authorizeHttpRequests(authz -> authz
	             .requestMatchers(HttpMethod.POST, "/login").permitAll()  
	             .anyRequest().permitAll()
	         )
	         .addFilterBefore(new JwtAuthenticationFilter(new JwtTokenUtil()), UsernamePasswordAuthenticationFilter.class); 

	     return http.build();
	 }
	 
	 

	

	    		
}