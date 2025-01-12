import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Modal as RNModal } from 'react-native';
import { AuthContext } from '../../hooks/Auth';
import styles from './style'; // Suponha que você tenha um arquivo de estilo separado

// Definindo a interface para o tipo Evento
interface Evento {
  idEvento: string;
  nome_evento: string;
}

interface ModalExcluirEventoProps {
  isOpen: boolean;
  onClose: () => void;
  evento: Evento;
}

const ModalExcluirEvento: React.FC<ModalExcluirEventoProps> = ({ isOpen, onClose, evento }) => {
  const { deletarEvento } = useContext(AuthContext);
  const [mensagem, setMensagem] = useState<string>("");
  const [isModalMessageOpen, setIsModalMessageOpen] = useState<boolean>(false);

  if (!isOpen) return null;

  // Função para excluir o evento
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

      // Fecha o modal após um tempo
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
      {/* Modal Principal */}
      <RNModal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.Title}>Excluir Evento</Text>
            <Text style={styles.msgExcluir}>
              Tem certeza de que deseja <b>excluir</b> o evento <b>{evento?.nome_evento}</b>?
            </Text>

            <View style={styles.ContainerBotao}>
              <TouchableOpacity 
                onPress={handleExcluirEvento} 
                style={styles.AdicionarButton}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={onClose} 
                style={styles.CancelarButton}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RNModal>

      {/* Modal de Mensagem (feedback de sucesso ou erro) */}
      <RNModal
        visible={isModalMessageOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalMessageOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>{mensagem}</Text>
          </View>
        </View>
      </RNModal>
    </>
  );
};

export default ModalExcluirEvento;