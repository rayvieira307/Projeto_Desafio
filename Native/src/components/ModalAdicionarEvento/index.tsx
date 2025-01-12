import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal as RNModal,
} from "react-native";
import { AuthContext } from "../../hooks/Auth";
import Modal from "../../components/Modal/index";
import styles from "./style";
import { TouchableOpacity } from "react-native";

interface NovoEvento {
  nome_evento: string;
  date: string;
  localizacao: string;
  imagem: string;
}

interface ModalAdicionarEventoProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAdicionarEvento: React.FC<ModalAdicionarEventoProps> = ({
  isOpen,
  onClose,
}) => {
  const { cadastrarEvento } = useContext(AuthContext);
  const [isModalMessageOpen, setIsModalMessageOpen] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [novoEvento, setNovoEvento] = useState<NovoEvento>({
    nome_evento: "",
    date: "",
    localizacao: "",
    imagem: "",
  });

  if (!isOpen) return null;

  const handleAdicionarEvento = async () => {
    try {

      cadastrarEvento(novoEvento);
      setMensagem("Evento cadastrado com sucesso!");
      setIsModalMessageOpen(true);
      setNovoEvento({
        nome_evento: "",
        date: "",
        localizacao: "",
        imagem: "",
      });

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      setMensagem("Erro ao cadastrar o evento. Tente novamente.");
      setIsModalMessageOpen(true);
    }
  };

  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.TitlePrincipal}>Novo Evento</Text>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Nome do Evento"
              value={novoEvento.nome_evento}
              onChangeText={(text) =>
                setNovoEvento({ ...novoEvento, nome_evento: text })
              }
            />
            <TextInput
              style={styles.inputs}
              placeholder="Data: YYYY-MM-DD "
              value={novoEvento.date}
              onChangeText={(text) =>
                setNovoEvento({ ...novoEvento, date: text })
              }
            />
            <TextInput
              style={styles.inputs}
              placeholder="Localização"
              value={novoEvento.localizacao}
              onChangeText={(text) =>
                setNovoEvento({ ...novoEvento, localizacao: text })
              }
            />
            <TextInput
              style={styles.inputs}
              placeholder="Insira uma URL válida"
              value={novoEvento.imagem}
              onChangeText={(text) =>
                setNovoEvento({ ...novoEvento, imagem: text })
              }
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAdicionarEvento}
              >
                <Text  style = {styles.ButtonText}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style = {styles.ButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <Modal
        isOpen={isModalMessageOpen}
        onClose={() => setIsModalMessageOpen(false)}
      >
     <Text style={styles.modalMessage}>{mensagem}</Text>
      </Modal>

      
    </RNModal>
  );
};

export default ModalAdicionarEvento;
