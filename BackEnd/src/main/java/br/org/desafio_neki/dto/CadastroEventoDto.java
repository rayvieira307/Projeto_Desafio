package br.org.desafio_neki.dto;

import java.time.LocalDate;

public class CadastroEventoDto {

	 private String nome_evento;
	 private LocalDate date; 
	 private String localizacao;
	 private String imagem;
	 
	 
	
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
	    
	    
	    
}
