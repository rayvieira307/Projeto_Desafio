import React, { useContext, useState } from 'react';
import Modal from "../../components/Modal/Modal";
import { AuthContext } from '../../context/Auth';
import styles from './Excluir.module.css';

const ModalExcluirEvento = ({ isOpen, onClose, evento }) => {
  const { deletarEvento } = useContext(AuthContext);
  const [mensagem, setMensagem] = useState("");
  const [isModalMessageOpen, setIsModalMessageOpen] = useState(false);

  if (!isOpen) return null;

  const handleExcluirEvento = async () => {
    if (!evento) {
      setMensagem("Evento não encontrado.");
      setIsModalMessageOpen(true);
      return;
    }

    try {
      await deletarEvento(evento.idEvento); 
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
      <div className={styles.modalOverlay} aria-live="assertive" role="dialog" aria-labelledby="modalExcluirTitle" aria-describedby="modalExcluirDesc">
        <div className={styles.modalContent}>
          <h2 id="modalExcluirTitle" className={styles.title}>Excluir Evento</h2>
          <p id="modalExcluirDesc" className={styles.msgExcluir}>
            Tem certeza de que deseja <b>excluir</b> o evento <b>{evento?.nome_evento}</b>?
          </p>

          <div className={styles.ContainerBotao}>
            <button 
              onClick={handleExcluirEvento} 
              className={styles.AdicionarButton} 
              aria-label={`Confirmar a exclusão do evento ${evento?.nome_evento}`}
            >
              Confirmar
            </button>
            <button 
              onClick={onClose} 
              className={styles.CancelarButton} 
              aria-label="Cancelar a exclusão do evento"
            >
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