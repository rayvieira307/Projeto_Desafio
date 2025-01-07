package br.org.desafio_neki.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.org.desafio_neki.domain.Admin;
import br.org.desafio_neki.dto.AdminDto;
import br.org.desafio_neki.dto.CadastroAdmin;
import br.org.desafio_neki.exception.AdminDuplicadoException;
import br.org.desafio_neki.repository.AdminRepository;

@Service
public class AdminService {
	
	 @Autowired
	    private AdminRepository repositorio;

	    @Autowired
	    private PasswordEncoder passwordEncoder;
 
	    public List<AdminDto> listarTodos() {
	        return repositorio.findAll().stream().map(AdminDto::toDto).toList();
	    }

	    public Optional<CadastroAdmin> obterPorId(Long id) {
	        if (!repositorio.existsById(id)) {
	            return Optional.empty();
	        }
	        return Optional.of(CadastroAdmin.toDto(repositorio.findById(id).get()));
	    }

	    public AdminDto salvarAdmin(CadastroAdmin dto) {
	    	
	    
	        validarCadastroAdmin(dto); 
	        
	        Admin novoAdmin = new Admin();
	        novoAdmin.setNome(dto.nome());
	        novoAdmin.setEmail(dto.email());
	        novoAdmin.setSenha(passwordEncoder.encode(dto.senha()));
	

	        Admin adminSalvo = repositorio.save(novoAdmin);
	        
	        return AdminDto.toDto(adminSalvo);
	    }

		private void validarCadastroAdmin(CadastroAdmin dto) {
			
			  if (repositorio.existsByEmail(dto.email())) {
		            throw new AdminDuplicadoException("Email já cadastrado: " + dto.email());
		        }
		              
		}

}
