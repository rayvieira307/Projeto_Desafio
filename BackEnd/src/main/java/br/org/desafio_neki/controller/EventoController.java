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

@RestController
@RequestMapping("/evento")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    // Listar eventos do administrador
    @GetMapping("/eventos/{adminId}")
    public List<Evento> getEventsByAdmin(@PathVariable Long adminId) {
        return eventoService.getEventsByAdmin(adminId);
    }

    // Criar evento
    @PostMapping("/cadastrar")
    public Evento createEvent(@RequestBody CadastroEventoDto eventDTO, @RequestParam Long adminId) {
        return eventoService.createEvent(eventDTO, adminId);
    }

    // Atualizar evento
    @PutMapping("/atualizar/{eventoId}")
    public Evento updateEvent(@PathVariable Long eventoId, @RequestBody CadastroEventoDto eventDTO) {
        return eventoService.updateEvento(eventoId, eventDTO).orElse(null);
    }

    // Excluir evento
    @DeleteMapping("/{eventoId}")
    public void deleteEvent(@PathVariable Long eventoId) {
        eventoService.deleteEvento(eventoId);
    }
}