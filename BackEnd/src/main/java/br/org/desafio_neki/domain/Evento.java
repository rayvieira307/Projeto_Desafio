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

@Entity
@Table(name = "evento")
public class Evento {
   
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_evento")
	private Long idEvento;
	
	private String nome;
	
	private LocalDate date;
	
	private String localizacao;
	
	private String imagem;
	
	@ManyToOne
	@JoinColumn(name = "id_admin")
    @JsonBackReference
	private Admin admin;
	
	public Evento(Long idEvento, String nome, LocalDate date, String localizacao, String imagem, Admin admin) {
		super();
		this.idEvento = idEvento;
		this.nome = nome;
		this.date = date;
		this.localizacao = localizacao;
		this.imagem = imagem;
		this.admin = admin;
	}

	public Evento() {
		// TODO Auto-generated constructor stub
	}

	public Long getIdEvento() {
		return idEvento;
	}

	public void setIdEvento(Long idEvento) {
		this.idEvento = idEvento;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
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