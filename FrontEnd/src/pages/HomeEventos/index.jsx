import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './HomeEventos.module.css'; 
import { AuthContext } from '../../context/Auth';
import Modal from '../../components/Modal/Modal';
import ModalAddEvent from '../../components/Modal2/index';  // Importando o novo modal
import SideBar from "../../components/SideBar/index";

export const HomeEventos = () => {
  const { eventos, loading, nomeAdmin, AtualizarEvento, DeletarEvento, AdicionarEvento } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);  
  const [NovoEvento, setNovoEvento] = useState({ nome_evento: '', date: '', localizacao: '',imagem: '' });
  const [successMessage, setSuccessMessage] = useState('');

  if (loading) {
    return <p>Carregando eventos...</p>;
  }

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true); 
  };

  const handleAddEvento = async () => {
    await AdicionarEvento(NovoEvento); 
    setSuccessMessage('Evento adicionado com sucesso!');
    setIsAddModalOpen(false);
    setNovoEvento({ nome_evento: '', date: '', localizacao: '', imagem: '' });  
  };

  return (
    <>
    <SideBar/>
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo, {nomeAdmin || 'Carregando...'}</h1>

      <button onClick={handleOpenAddModal} className={styles.addButton}>Adicionar Evento</button> {/* Botão para abrir o modal */}

      <div className={styles.eventosContainer}>
        {eventos.length > 0 ? (
          eventos.map(event => (
            <div
              key={event.idEvento}
              className={styles.eventCard}
            >
              <img
                src={event.imagem}
                alt={event.nome_evento}
                className={styles.eventImage}
              />
              <h2 className={styles.eventTitle}>{event.nome_evento}</h2>
              <p className={styles.eventDate}>
                {event.date} - {event.localizacao}
              </p>
            </div>
          ))
        ) : (
          <p className={styles.msg}>Não há eventos cadastrados.</p>
        )}
      </div>

      {/* Modal de mensagem de sucesso */}
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

      {/* Modal de adicionar evento */}
      <ModalAddEvent
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddEvento}
        novoEvento={NovoEvento}
        setNovoEvento={setNovoEvento}
      />
    </div>
    </>
  );
};