import React, { useState, useContext } from "react";
import styles from "./HomeEventos.module.css";
import { AuthContext } from "../../context/Auth";
import ModalEditarEvento from "../../components/ModalEditarEvento";
import ModalExcluirEvento from "../../components/ModalExcluirEvento";
import SideBar from "../../components/SideBar/index";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";

const FormatarData = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const HomeEventos = () => {
  const { eventos, loading, nomeAdmin } = useContext(AuthContext);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const handleEdit = (evento) => {
    setEventoSelecionado(evento);
    setModalEditOpen(true);
  };

  const handleDelete = (evento) => {
    setEventoSelecionado(evento);
    setModalDeleteOpen(true);
  };

  if (loading) return <p>Carregando eventos...</p>;

  return (
    <>
      <SideBar />
      <main className={styles.container}>
        <header>
          <h1 className={styles.title}>
            Bem-vindo, {nomeAdmin || "Usuário"}! Gerencie seus eventos aqui.
          </h1>
        </header>

        <section className={styles.eventosContainer}>
          {eventos.length > 0 ? (
            eventos.map((evento) => (
              <article
                key={evento.idEvento}
                className={styles.eventCard}
                onMouseEnter={() => setEventoSelecionado(evento.idEvento)}
                onMouseLeave={() => setEventoSelecionado(null)}
              >
                <img
                  src={evento.imagem}
                  alt={`Imagem do evento ${evento.nome_evento}`}
                  className={styles.eventImage}
                />
                <h2 className={styles.eventName}>{evento.nome_evento}</h2>
                <p className={styles.eventDate}>
                  {FormatarData(evento.date)}
                </p>
                <p className={styles.eventLocation}>{evento.localizacao}</p>

                {eventoSelecionado === evento.idEvento && (
                  <div className={styles.icons}>
                    <button
                      aria-label="Editar evento"
                      onClick={() => handleEdit(evento)}
                    >
                      <CiEdit className={styles.Icones} title="EDITAR EVENTO" />
                    </button>
                    <button
                      aria-label="Excluir evento"
                      onClick={() => handleDelete(evento)}
                    >
                      <GoTrash className={styles.Icones} title="EXCLUIR EVENTO"  />
                    </button>
                  </div>
                )}
              </article>
            ))
          ) : (
            <div>
              <p className={styles.msg}>Não há eventos cadastrados :/</p>
              <p className={styles.msg}>
                Clique no ícone de adicionar para criar um evento :)
              </p>
            </div>
          )}
        </section>
      </main>

     
      {modalEditOpen && (
        <ModalEditarEvento
          isOpen={modalEditOpen}
          onClose={() => setModalEditOpen(false)}
          evento={eventoSelecionado}
        />
      )}

      {modalDeleteOpen && (
        <ModalExcluirEvento
          isOpen={modalDeleteOpen}
          onClose={() => setModalDeleteOpen(false)}
          evento={eventoSelecionado}
        />
      )}
    </>
  );
};