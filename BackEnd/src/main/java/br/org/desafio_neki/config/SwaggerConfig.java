package br.org.desafio_neki.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;

@Configuration
@OpenAPIDefinition(info = @Info(
        title = "API do projeto Petropolis Participa",
        version = "1.0",
        description = "Documentação da API Petropolis Participa"
))
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new io.swagger.v3.oas.models.info.Info()
                        .title("API do projeto")
                        .version("1.0")
                        .description("Documentação da API")
                        .contact(new Contact()
                                .name("Equipe")
                                .url("http://www.petropolis.com.br"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0")));
    }
}