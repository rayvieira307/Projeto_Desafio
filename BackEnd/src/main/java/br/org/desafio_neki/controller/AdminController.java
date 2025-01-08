package br.org.desafio_neki.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.org.desafio_neki.dto.AdminDto;
import br.org.desafio_neki.dto.CadastroAdmin;
import br.org.desafio_neki.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/admin")
public class AdminController {

	
	 @Autowired
	  private AdminService service;

    @GetMapping
    @Operation(summary = "Retorna todos os admins.", description = "Exibe uma lista de todos os admins com as informações gerais.")
    @ApiResponse(responseCode = "200", description = "Admins localizados.")
    public List<AdminDto> obterTodos() {
        return service.listarTodos();
    }
	
    
    @GetMapping("/{id}")
    @Operation(summary = "Retorna um admin pelo id", description = "Ao inserir o id, é exibido o admin com as informações gerais.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "404", description = "Não foi encontrado o admin pelo id informado. Verifique!"),
        @ApiResponse(responseCode = "200", description = "Admin localizado") })
    public ResponseEntity<CadastroAdmin> obterPorId(@PathVariable Long id){
        Optional<CadastroAdmin> dto = service.obterPorId(id);
        if(!dto.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto.get());
    }
	
    
    @Operation(summary = "Cadastrar um novo admin", description = "Cria um novo admin e retorna os detalhes do admin criado")
    @PostMapping
    @ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Não foi possível criar um novo admin."),
        @ApiResponse(responseCode = "200", description = "Admin criado.") })
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AdminDto> cadastrarAdmin(@Valid @RequestBody CadastroAdmin cadastroAdmin){
    	return ResponseEntity.ok(service.salvarAdmin(cadastroAdmin));
    }
    
    
    @Operation(summary = "Deletar um admin", description = "Deleta um admin baseado no ID fornecido")
    @DeleteMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Não foi possível deletar o admin."),
        @ApiResponse(responseCode = "404", description = "Admin não encontrado."),
        @ApiResponse(responseCode = "200", description = "Admin deletado com sucesso.") })
    @ResponseStatus(HttpStatus.NO_CONTENT) 
    public ResponseEntity<Void> deletarAdmin(@PathVariable Long id) {
        service.deletarAdmin(id); 
        return ResponseEntity.noContent().build(); 
    }

}
