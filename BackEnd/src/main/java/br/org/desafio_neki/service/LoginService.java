package br.org.desafio_neki.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.org.desafio_neki.domain.Admin;
import br.org.desafio_neki.repository.AdminRepository;
import br.org.desafio_neki.util.JwtTokenUtil;


@Service
public class LoginService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AdminRepository adminRepository;

    public String autenticar(String email, String senha) {
   
        Admin admin = adminRepository.findByEmail(email);

       
        if (admin == null || !passwordEncoder.matches(senha, admin.getSenha())) {
            throw new RuntimeException("Email ou senha inválidos");
        }


        return JwtTokenUtil.gerarToken(admin.getEmail());
    }
}
