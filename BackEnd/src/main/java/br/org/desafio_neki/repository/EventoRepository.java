package br.org.desafio_neki.repository;

import br.org.desafio_neki.domain.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {
	
	
	
	public List<Evento> findByAdmin_IdAdmin(Long idAdmin);
    
}