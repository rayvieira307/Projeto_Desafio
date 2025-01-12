import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal as RNModal,
  TouchableWithoutFeedback,
} from "react-native";
import { AuthContext } from "../../hooks/Auth";
import Modal from "../../components/Modal/index";
import styles from "./style";

// Definindo o tipo Evento
interface Evento {
  idEvento: string;
  date: string;
  localizacao: string;
}

// Definindo as props do ModalEditarEvento
interface ModalEditarEventoProps {
  isOpen: boolean;
  onClose: () => void;
  evento: Evento;
}

const ModalEditarEvento: React.FC<ModalEditarEventoProps> = ({
  isOpen,
  onClose,
  evento,
}) => {
  const { AtualizarEvento } = useContext(AuthContext);
  const [mensagem, setMensagem] = useState<string>("");
  const [isModalMessageOpen, setIsModalMessageOpen] = useState<boolean>(false);

  // Inicializando o evento editado com o evento atual
  const [eventoEditado, setEventoEditado] = useState<Evento>(evento);

  useEffect(() => {
    setEventoEditado(evento); // Atualiza o estado quando o evento é passado
  }, [evento]);

  // Se o modal não está aberto, não renderiza
  if (!isOpen) return null;

  // Função para editar o evento
  const handleEditarEvento = async () => {
    // Verifica se houve mudanças nos campos
    if (
      eventoEditado.date !== evento.date ||
      eventoEditado.localizacao !== evento.localizacao
    ) {
      try {
        const eventoData = {
          date: eventoEditado.date,
          localizacao: eventoEditado.localizacao,
        };

        // Atualiza o evento
        await AtualizarEvento(evento.idEvento, eventoData);

        setMensagem("Evento atualizado com sucesso!");
        setIsModalMessageOpen(true);

        // Fecha o modal após um tempo
        setTimeout(() => {
          setIsModalMessageOpen(false);
          onClose();
        }, 1500);
      } catch (error) {
        console.error("Erro ao atualizar evento:", error);
        setMensagem("Erro ao atualizar o evento. Tente novamente.");
        setIsModalMessageOpen(true);
      }
    } else {
      setMensagem("Nenhuma alteração foi feita.");
      setIsModalMessageOpen(true);
    }
  };

  return (
    <>
      {/* Modal Principal */}
      <RNModal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.TitlePrincipal}>Editar Evento</Text>

                <Text style={styles.label} >Data: </Text>
                <TextInput
                  style={styles.inputs}
                  value={eventoEditado.date}
                  onChangeText={(text) =>
                    setEventoEditado({ ...eventoEditado, date: text })
                  }
                  placeholder="Data do Evento"
                  keyboardType="default"
                />
                <Text style={styles.labell} >Localização: </Text>
                <TextInput
                  style={styles.inputs}
                  value={eventoEditado.localizacao}
                  onChangeText={(text) =>
                    setEventoEditado({ ...eventoEditado, localizacao: text })
                  }
                  placeholder="Localização"
                />

                {/* Botões de Salvar e Cancelar */}
                <View style={styles.BotaoContainer}>
                  <TouchableOpacity
                    onPress={handleEditarEvento}
                    style={styles.AdicionarButton}
                  >
                    <Text style={styles.buttonText}>Salvar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.CancelarButton}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </RNModal>

      {/* Modal de Mensagem (Feedback ao usuário) */}
      <Modal
        isOpen={isModalMessageOpen}
        onClose={() => setIsModalMessageOpen(false)}
      >
        <Text>{mensagem}</Text>
      </Modal>
    </>
  );
};

export default ModalEditarEvento;
