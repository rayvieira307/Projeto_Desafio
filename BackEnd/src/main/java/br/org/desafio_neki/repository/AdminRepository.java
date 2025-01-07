package br.org.desafio_neki.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.org.desafio_neki.domain.Admin;

public interface AdminRepository extends JpaRepository <Admin, Long>{
   
    boolean existsByEmail(String email);

	Admin findByEmail(String email);

	Admin findByEmailAndSenha(String email, String senha);
}
