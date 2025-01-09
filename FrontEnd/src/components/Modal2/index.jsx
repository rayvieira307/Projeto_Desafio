import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/Auth';  // Importando o hook para acessar o contexto
import styles from './Modal2.module.css';

const ModalAddEvent = ({ isOpen, onClose }) => {
  const { user, cadastrarEvento } = useContext(AuthContext); // Pegando a função cadastrarEvento e o user do contexto
  const [novoEvento, setNovoEvento] = useState({
    nome_evento: '',
    date: '',
    localizacao: '',
    imagem: '',
  });

  if (!isOpen) return null;

  const handleAddEvent = (e) => {
    e.preventDefault();
    // Chama a função cadastrarEvento do contexto para adicionar o evento
    cadastrarEvento(novoEvento);
    onClose(); // Fecha o modal após adicionar
    setNovoEvento({
      nome_evento: '',
      date: '',
      localizacao: '',
      imagem: '',
    });  // Limpa os campos do formulário após a submissão
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Adicionar Novo Evento</h2>
        <form className={styles.FormularioC} onSubmit={handleAddEvent}>
          <input
            className={styles.inputs}
            type="text"
            placeholder="Nome do Evento"
            value={novoEvento.nome_evento}
            onChange={(e) => setNovoEvento({ ...novoEvento, nome_evento: e.target.value })}
            required
          />
          <input
            className={styles.inputs}
            type="date"
            value={novoEvento.date}
            onChange={(e) => setNovoEvento({ ...novoEvento, date: e.target.value })}
            required
          />
          <input
            className={styles.inputs}
            type="text"
            placeholder="Localização"
            value={novoEvento.localizacao}
            onChange={(e) => setNovoEvento({ ...novoEvento, localizacao: e.target.value })}
            required
          />
          <input
            className={styles.inputs}
            type="text"
            placeholder="Insira uma url valida"
            value={novoEvento.imagem}
            onChange={(e) => setNovoEvento({ ...novoEvento, imagem: e.target.value })}
            required
          />
          <div className={styles.modalActions}>
            <button type="submit" className={styles.AdicionarButton}>
              Adicionar Evento
            </button>
            <button type="button" onClick={onClose} className={styles.CancelarButton}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddEvent;