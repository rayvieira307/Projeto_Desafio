package br.org.desafio_neki.dto;

import java.time.LocalDate;

public class AtualizarEventoDto {

	 private LocalDate date;
	 private String localizacao;
	 
	
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
	 
	 
	
	
}
