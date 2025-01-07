package br.org.desafio_neki.dto;

import br.org.desafio_neki.domain.Admin;

public record CadastroAdmin(
		String nome,
		String email,
		String senha,
		String confirmasenha
		) {
	
	public static CadastroAdmin toDto(Admin admin) {

		return new CadastroAdmin (
				admin.getNome(), 
				admin.getEmail(), 
				admin.getSenha(), 
			    admin.getSenha()
				);

	}

}
