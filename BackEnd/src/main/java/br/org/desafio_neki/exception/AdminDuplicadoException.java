package br.org.desafio_neki.exception;

public class AdminDuplicadoException extends RuntimeException  {

	
	private static final long serialVersionUID = 1L;
	
	public AdminDuplicadoException(String mensagem) {
        super(mensagem);
    }
	
	
}
