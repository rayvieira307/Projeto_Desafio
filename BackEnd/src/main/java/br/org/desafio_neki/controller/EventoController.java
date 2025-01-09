package br.org.desafio_neki.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.org.desafio_neki.domain.Evento;
import br.org.desafio_neki.dto.CadastroEventoDto;
import br.org.desafio_neki.service.EventoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping("/evento")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @Operation(summary = "Lista todos os eventos com suas informações, incluindo imagem.")
    @ApiResponse(responseCode = "200", description = "Eventos do Admin localizado.")
    @GetMapping("/eventos/{adminId}")
    public List<Evento> getEventsByAdmin(@PathVariable Long adminId) {
        return eventoService.getEventsByAdmin(adminId);
    }
    
    @Operation(summary = "Cria todos os eventos com suas informações, incluindo imagem que deve ser fornecida com uma url válida.")
    @ApiResponse(responseCode = "200", description = "Cadastro do Evento do Admin feito.")
    @PostMapping("/cadastrar")
    public Evento createEvent(@RequestBody CadastroEventoDto eventDTO, @RequestParam Long adminId) {
        return eventoService.createEvent(eventDTO, adminId);
    }
    
    
    @Operation(summary = "Atualiza todos os eventos com suas informações, incluindo imagem.")
    @ApiResponse(responseCode = "200", description = "Evento do Admin atualizado.")
    @PutMapping("/atualizar/{eventoId}")
    public Evento updateEvent(@PathVariable Long eventoId, @RequestBody CadastroEventoDto eventDTO) {
        return eventoService.updateEvento(eventoId, eventDTO).orElse(null);
    }

    
    @Operation(summary = "Deleta o evento com suas informações.")
    @ApiResponse(responseCode = "200", description = "Evento do Admin deletado.")
    @DeleteMapping("/{eventoId}")
    public void deleteEvent(@PathVariable Long eventoId) {
        eventoService.deleteEvento(eventoId);
    }
}