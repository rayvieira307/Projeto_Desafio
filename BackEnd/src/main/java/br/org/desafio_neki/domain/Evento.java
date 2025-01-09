package br.org.desafio_neki.domain;


import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "evento")
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento")
    private Long idEvento;

    @NotNull
    @Size(max = 255)
    @Column(name = "nome_evento", nullable = false, length = 255)
    private String nome_evento;

    @Column(name = "data", nullable = false)
    private LocalDate date;

    @Size(max = 500)
    @Column(name = "localizacao", length = 500)
    private String localizacao;

    @Size(max = 65535)  // Para permitir URLs grandes
    @Column(name = "imagem", length = 65535)
    private String imagem;  // URL da imagem (pode ser muito grande)

    @ManyToOne
    @JoinColumn(name = "id_admin")
    @JsonBackReference
    private Admin admin;
	


	public Evento() {
		// TODO Auto-generated constructor stub
	}

	public Long getIdEvento() {
		return idEvento;
	}

	public void setIdEvento(Long idEvento) {
		this.idEvento = idEvento;
	}

	public Evento(Long idEvento, String nome_evento, LocalDate date, String localizacao, String imagem, Admin admin) {
		super();
		this.idEvento = idEvento;
		this.nome_evento = nome_evento;
		this.date = date;
		this.localizacao = localizacao;
		this.imagem = imagem;
		this.admin = admin;
	}

	public String getNome_evento() {
		return nome_evento;
	}

	public void setNome_evento(String nome_evento) {
		this.nome_evento = nome_evento;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getLocalizacao() {
		return localizacao;
	}

	public void setLocalizacao(String localizacao) {
		this.localizacao = localizacao;
	}

	public String getImagem() {
		return imagem;
	}

	public void setImagem(String imagem) {
		this.imagem = imagem;
	}

	public Admin getAdmin() {
		return admin;
	}

	public void setAdmin(Admin admin) {
		this.admin = admin;
	}

	
	
	
	

}