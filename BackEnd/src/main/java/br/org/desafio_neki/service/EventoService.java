package br.org.desafio_neki.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.org.desafio_neki.domain.Admin;
import br.org.desafio_neki.domain.Evento;
import br.org.desafio_neki.dto.CadastroEventoDto;
import br.org.desafio_neki.repository.AdminRepository; 
import br.org.desafio_neki.repository.EventoRepository;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private AdminRepository adminRepository; 

   
    public List<Evento> getEventsByAdmin(Long adminId) {
        return eventoRepository.findByAdmin_IdAdmin(adminId); 
    }

    
    public Evento createEvent(CadastroEventoDto eventDTO, Long adminId) {
      
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Administrador não encontrado"));

     
        Evento evento = new Evento();
        evento.setNome_evento(eventDTO.getNome_evento());
        evento.setDate(eventDTO.getDate());
        evento.setLocalizacao(eventDTO.getLocalizacao());
        evento.setImagem(eventDTO.getImagem());
        evento.setAdmin(admin); // Associando o admin recuperado

        return eventoRepository.save(evento);
    }

    // Atualizar evento
    public Optional<Evento> updateEvento(Long eventoId, CadastroEventoDto eventDTO) {
        Optional<Evento> evento = eventoRepository.findById(eventoId);
        if (evento.isPresent()) {
            Evento updatedEvento = evento.get();
            updatedEvento.setNome_evento(eventDTO.getNome_evento());
            updatedEvento.setDate(eventDTO.getDate());
            updatedEvento.setLocalizacao(eventDTO.getLocalizacao());
            updatedEvento.setImagem(eventDTO.getImagem());

            return Optional.of(eventoRepository.save(updatedEvento));
        }
        return Optional.empty();
    }

    // Excluir evento
    public void deleteEvento(Long eventoId) {
        eventoRepository.deleteById(eventoId);
    }
}