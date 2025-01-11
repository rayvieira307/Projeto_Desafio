import React from 'react';
import { View, Text, TouchableOpacity, Modal as RNModal } from 'react-native';
import styles from './style';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <RNModal transparent={true} visible={isOpen} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose} accessible={true} accessibilityLabel="Fechar Modal">
            <Text style={styles.closeButtonText}>&times;</Text>
          </TouchableOpacity>
          <View style={styles.modalBody}>
            {children}
          </View>
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;