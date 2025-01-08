package br.org.desafio_neki.dto;

import java.time.LocalDate;

public class CadastroEventoDto {

	 private String nome;
	 private LocalDate date; 
	 private String localizacao;
	 private String imagem;
	 
	 
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
	    
	    
	    
}
