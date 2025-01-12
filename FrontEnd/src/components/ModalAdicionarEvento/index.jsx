import React, { useContext, useState } from 'react';
import Modal from "../../components/Modal/Modal"; 
import { AuthContext } from '../../context/Auth';  
import styles from './Modal2.module.css';

const ModalAdicionarEvento = ({ isOpen, onClose }) => {
  const { cadastrarEvento } = useContext(AuthContext); 
  const [isModalMessageOpen, setIsModalMessageOpen] = useState(false); 
  const [mensagem, setMensagem] = useState(""); 
  const [novoEvento, setNovoEvento] = useState({
    nome_evento: '',
    date: '',
    localizacao: '',
    imagem: '',
  });

  if (!isOpen) return null;

  const handleAdicionarEvento = async (e) => {
    e.preventDefault();

    try {
  
      await cadastrarEvento(novoEvento);
      setMensagem("Evento cadastrado com sucesso!");
      setIsModalMessageOpen(true); 
      setNovoEvento({
        nome_evento: '',
        date: '',
        localizacao: '',
        imagem: '',
      });

      
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
    
      setMensagem("Erro ao cadastrar o evento. Tente novamente.");
      setIsModalMessageOpen(true); 
    }
  };

  return (
    <>
      
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2 className={styles.TitlePrincipal} >Vamos criar seu evento</h2>
          <form className={styles.FormularioC} onSubmit={handleAdicionarEvento}>
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

            <div className={styles.BotaoContainer}>
              <button type="submit" className={styles.AdicionarButton}>
                Adicionar
              </button>
              <button type="button" onClick={onClose} className={styles.CancelarButton}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

      <Modal isOpen={isModalMessageOpen} onClose={() => setIsModalMessageOpen(false)}>
        <h2>{mensagem}</h2>
      </Modal>
    </>
  );
};

export default ModalAdicionarEvento;