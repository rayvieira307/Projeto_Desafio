import React, { useContext, useState } from 'react';
import Modal from "../../components/Modal/Modal";
import { AuthContext } from '../../context/Auth';
import styles from './Editar.module.css';

const ModalEditarEvento = ({ isOpen, onClose, evento }) => {
  const { AtualizarEvento } = useContext(AuthContext);
  const [mensagem, setMensagem] = useState("");
  const [isModalMessageOpen, setIsModalMessageOpen] = useState(false);
  const [eventoEditado, setEventoEditado] = useState(evento || {});

  if (!isOpen) return null;

  const handleEditarEvento = async (e) => {
    e.preventDefault();

    try {
      await AtualizarEvento(eventoEditado);
      setMensagem("Evento atualizado com sucesso!");
      setIsModalMessageOpen(true);

      setTimeout(() => {
        setIsModalMessageOpen(false);
        onClose();
      }, 1500);
    } catch (error) {
      setMensagem("Erro ao atualizar o evento. Tente novamente.");
      setIsModalMessageOpen(true);
    }
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2>Editar Evento</h2>
          <form className={styles.FormularioC} onSubmit={handleEditarEvento}>
            <input
              className={styles.inputs}
              type="date"
              value={eventoEditado.date || ""}
              onChange={(e) => setEventoEditado({ ...eventoEditado, date: e.target.value })}
              required
            />
            <input
              className={styles.inputs}
              type="text"
              placeholder="Localização"
              value={eventoEditado.localizacao || ""}
              onChange={(e) => setEventoEditado({ ...eventoEditado, localizacao: e.target.value })}
              required
            />

            <div className={styles.BotaoContainer}>
              <button type="submit" className={styles.AdicionarButton}>
                Salvar
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

export default ModalEditarEvento;