import React, { useContext, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { AuthContext } from "../../hooks/Auth";
import { FontAwesome } from "@expo/vector-icons";
import ModalEditarEvento from "../../components/ModalEditarEvento";
import ModalExcluirEvento from "../../components/ModalExcluirEvento";
import SideBar from "../../components/SideBar";
import styles from "./style";
import Header from "../../components/Header";

interface Evento {
  idEvento: string;
  nome_evento: string;
  imagem: string;
  date: string;
  localizacao: string;
}

const FormatarData = (dateString: string) => {
  const date = new Date(dateString + "T00:00:00");

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
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null); 
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null); 

  const handleEdit = (evento: Evento) => {
    setEventoSelecionado(evento);
    setModalEditOpen(true);
  };

  const handleDelete = (evento: Evento) => {
    setEventoSelecionado(evento);
    setModalDeleteOpen(true);
  };

  const handleCardClick = (eventoId: string) => {

    if (selectedEvent === eventoId) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(eventoId); 7
    }
  };

  const handleOutsideClick = () => {
    setSelectedEvent(null);
  };

  if (loading) return <Text style={styles.msg}>Carregando eventos...</Text>;

  return (
    <>
    <Header/>
      <TouchableWithoutFeedback onPress={handleOutsideClick}>
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
        Bem-vindo,{" "}
        <Text style={styles.nomeAdmin}>
          {nomeAdmin  || "Usuário "}
        </Text>! Gerencie seus eventos aqui.
      </Text>

          <View style={styles.eventosContainer}>
            {eventos.length > 0 ? (
              eventos.map((evento: Evento) => (
                <TouchableOpacity
                  key={evento.idEvento}
                  style={styles.eventCard}
                  onPress={() => handleCardClick(evento.idEvento)} 
                  activeOpacity={0.7} 
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

          
          {modalEditOpen && eventoSelecionado && (
            <ModalEditarEvento
              isOpen={modalEditOpen}
              onClose={() => setModalEditOpen(false)}
              evento={eventoSelecionado}
            />
          )}

      
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
