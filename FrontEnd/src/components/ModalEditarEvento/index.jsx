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
    
 
    console.log("Evento Editado:", eventoEditado);

    try {
     
      const eventoData = {
        date: eventoEditado.date,
        localizacao: eventoEditado.localizacao,
      };

   
      await AtualizarEvento(evento.idEvento, eventoData);
      
      setMensagem("Evento atualizado com sucesso!");
      setIsModalMessageOpen(true);

      setTimeout(() => {
        setIsModalMessageOpen(false);
        onClose(); 
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      setMensagem("Erro ao atualizar o evento. Tente novamente.");
      setIsModalMessageOpen(true);
    }
  };

  return (
    <>
      <div className={styles.modalOverlay} aria-live="assertive" role="dialog" aria-labelledby="modalEditarTitle" aria-describedby="modalEditarDesc">
        <div className={styles.modalContent}>
          <h2 id="modalEditarTitle" className={styles.TitlePrincipal}>Editar Evento</h2>
          <form className={styles.FormularioC} onSubmit={handleEditarEvento}>
            <label htmlFor="date" className={styles.label}>Data do Evento:</label>
            <input
              id="date"
              className={styles.inputs}
              type="date"
              value={eventoEditado.date || ""}
              onChange={(e) => setEventoEditado({ ...eventoEditado, date: e.target.value })}
              required
            />
            
            <label htmlFor="localizacao" className={styles.label}>Localização:</label>
            <input
              id="localizacao"
              className={styles.inputs}
              type="text"
              placeholder="Localização"
              value={eventoEditado.localizacao || ""}
              onChange={(e) => setEventoEditado({ ...eventoEditado, localizacao: e.target.value })}
              required
            />

            <div className={styles.BotaoContainer}>
              <button type="submit" className={styles.AdicionarButton} aria-label="Salvar alterações do evento">
                Salvar
              </button>
              <button 
                type="button" 
                onClick={onClose} 
                className={styles.CancelarButton} 
                aria-label="Cancelar a edição do evento"
              >
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
