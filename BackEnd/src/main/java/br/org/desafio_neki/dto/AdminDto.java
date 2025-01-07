package br.org.desafio_neki.dto;

import br.org.desafio_neki.domain.Admin;

public record AdminDto(
		
		Long idAdmin,
		String nome,
		String email
		){
		
		public Admin toEntity() {
			Admin admin = new Admin();
			admin.setIdAdmin(this.idAdmin);
			admin.setNome(this.nome);
			admin.setEmail(this.email);
			
			return admin;
		}
		
		public static AdminDto toDto(Admin admin) {

			return new AdminDto(admin.getIdAdmin(), admin.getNome(),admin.getEmail());

		}
		
	}

		
