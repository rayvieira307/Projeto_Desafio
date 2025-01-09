import React, { useState, useContext } from 'react';
import styles from './HomeEventos.module.css'; 
import { AuthContext } from '../../context/Auth';
import ModalEditarEvento from '../../components/ModalEditarEvento';
import ModalExcluirEvento from '../../components/ModalExcluirEvento';
import SideBar from "../../components/SideBar/index";
import { TbEditCircle } from 'react-icons/tb';
import { IoTrashOutline } from 'react-icons/io5';

export const HomeEventos = () => {
  const { eventos, loading, nomeAdmin, AtualizarEvento, DeletarEvento } = useContext(AuthContext);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Função para abrir o modal de edição
  const handleEdit = (event) => {
    setSelectedEvent(event);
    setModalEditOpen(true);
  };

  // Função para abrir o modal de exclusão
  const handleDelete = (event) => {
    setSelectedEvent(event);
    setModalDeleteOpen(true);
  };

  if (loading) return <p>Carregando eventos...</p>;

  return (
    <>
      <SideBar />
      <div className={styles.container}>
        <h1 className={styles.title}>Bem-vindo, {nomeAdmin || 'Carregando...'}</h1>

        <div className={styles.eventosContainer}>
          {eventos.length > 0 ? (
            eventos.map((event) => (
              <div
                key={event.idEvento}
                className={styles.eventCard}
                onMouseEnter={() => setHoveredEvent(event.idEvento)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <img
                  src={event.imagem}
                  alt={event.nome_evento}
                  className={styles.eventImage}
                />
                <h2 className={styles.eventTitle}>{event.nome_evento}</h2>
                <p className={styles.eventDate}>{event.date}</p>
                <p className={styles.eventLocation}>{event.localizacao}</p>

                {hoveredEvent === event.idEvento && (
                  <div className={styles.icons}>
                    <button onClick={() => handleEdit(event)}><TbEditCircle className={styles.Icones}/></button>
                    <button onClick={() => handleDelete(event)}> <IoTrashOutline className={styles.Icones} /></button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className={styles.msg}>Não há eventos cadastrados.</p>
          )}
        </div>
      </div>

      {/* Modal de Edição */}
      {modalEditOpen && (
        <ModalEditarEvento
          isOpen={modalEditOpen}
          onClose={() => setModalEditOpen(false)}
          evento={selectedEvent}
        />
      )}

      {/* Modal de Exclusão */}
      {modalDeleteOpen && (
        <ModalExcluirEvento
          isOpen={modalDeleteOpen}
          onClose={() => setModalDeleteOpen(false)}
          evento={selectedEvent}
        />
      )}
    </>
  );
};