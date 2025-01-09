import React, { useContext, useState } from 'react';
import Modal from "../../components/Modal/Modal";
import { AuthContext } from '../../context/Auth';
import styles from './Excluir.module.css';

const ModalExcluirEvento = ({ isOpen, onClose, evento }) => {
  const { DeletarEvento } = useContext(AuthContext);
  const [mensagem, setMensagem] = useState("");
  const [isModalMessageOpen, setIsModalMessageOpen] = useState(false);

  if (!isOpen) return null;

  const handleExcluirEvento = async () => {
    try {
      await DeletarEvento(evento.idEvento);
      setMensagem("Evento excluído com sucesso!");
      setIsModalMessageOpen(true);

      setTimeout(() => {
        setIsModalMessageOpen(false);
        onClose();
      }, 1500);
    } catch (error) {
      setMensagem("Erro ao excluir o evento. Tente novamente.");
      setIsModalMessageOpen(true);
    }
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2>Excluir Evento</h2>
          <p>Tem certeza de que deseja excluir o evento "{evento?.nome_evento}"?</p>

          <div className={styles.BotaoContainer}>
            <button onClick={handleExcluirEvento} className={styles.AdicionarButton}>
              Confirmar
            </button>
            <button onClick={onClose} className={styles.CancelarButton}>
              Cancelar
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalMessageOpen} onClose={() => setIsModalMessageOpen(false)}>
        <h2>{mensagem}</h2>
      </Modal>
    </>
  );
};

export default ModalExcluirEvento;