import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { AuthContext } from "../../hooks/Auth";
import { FontAwesome } from "@expo/vector-icons";
import ModalEditarEvento from "../../components/ModalEditarEvento";
import ModalExcluirEvento from "../../components/ModalExcluirEvento";
import SideBar from "../../components/SideBar";
import styles from "./style";

interface Evento {
  idEvento: string;
  nome_evento: string;
  imagem: string;
  date: string;
  localizacao: string;
}

const FormatarData = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const HomeEventos = () => {
  const { eventos, loading, nomeAdmin } = useContext(AuthContext);
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);
  const [modalEditOpen, setModalEditOpen] = useState<boolean>(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null); // Estado para controlar o evento sobre o qual o dedo passou
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null); // Estado para controlar o evento "aberto"

  const handleEdit = (evento: Evento) => {
    setEventoSelecionado(evento);
    setModalEditOpen(true);
  };

  const handleDelete = (evento: Evento) => {
    setEventoSelecionado(evento);
    setModalDeleteOpen(true);
  };

  const handleCardClick = (eventoId: string) => {
    // Se o evento já estiver selecionado, desmarque
    if (selectedEvent === eventoId) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(eventoId); // Se não, marque o evento como "aberto"
    }
  };

  // Fechar o card se o clique for fora do card (fechar quando o usuário clicar em outro lugar)
  const handleOutsideClick = () => {
    setSelectedEvent(null);
  };

  if (loading) return <Text style={styles.msg}>Carregando eventos...</Text>;

  return (
    <>
      {/* Ao clicar fora, os ícones do evento selecionado são fechados */}
      <TouchableWithoutFeedback onPress={handleOutsideClick}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>
            Bem-vindo, {nomeAdmin || "Usuário"}! Gerencie seus eventos aqui.
          </Text>

          <View style={styles.eventosContainer}>
            {eventos.length > 0 ? (
              eventos.map((evento: Evento) => (
                <TouchableOpacity
                  key={evento.idEvento}
                  style={styles.eventCard}
                  onPress={() => handleCardClick(evento.idEvento)} // Ao clicar no card, alterna entre aberto/fechado
                  activeOpacity={0.7} // Ajuste para opacidade ao pressionar
                >
                  <Image
                    source={{ uri: evento.imagem }}
                    style={styles.eventImage}
                  />
                  <Text style={styles.eventName}>{evento.nome_evento}</Text>
                  <Text style={styles.eventDate}>
                    {FormatarData(evento.date)}
                  </Text>
                  <Text style={styles.eventLocation}>{evento.localizacao}</Text>

                  {(selectedEvent === evento.idEvento || hoveredEvent === evento.idEvento) && (
                    <View style={styles.icons}>
                      <TouchableOpacity onPress={() => handleEdit(evento)}>
                        <FontAwesome name="edit" style={styles.IconeEdit} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDelete(evento)}>
                        <FontAwesome name="trash" style={styles.Icones} />
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.msg}>Não há eventos cadastrados :/</Text>
            )}
          </View>

          {/* Modal de Edição */}
          {modalEditOpen && eventoSelecionado && (
            <ModalEditarEvento
              isOpen={modalEditOpen}
              onClose={() => setModalEditOpen(false)}
              evento={eventoSelecionado}
            />
          )}

          {/* Modal de Exclusão */}
          {modalDeleteOpen && eventoSelecionado && (
            <ModalExcluirEvento
              isOpen={modalDeleteOpen}
              onClose={() => setModalDeleteOpen(false)}
              evento={eventoSelecionado}
            />
          )}
        </ScrollView>
      </TouchableWithoutFeedback>

      <SideBar />
    </>
  );
};
