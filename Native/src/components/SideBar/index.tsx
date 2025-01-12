import React, { useContext, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import ModalAdicionarEvento from '../../components/ModalAdicionarEvento';
import { AuthContext } from '../../hooks/Auth';  // Certifique-se de que o caminho está correto
import styles from './style';

const Sidebar: React.FC = () => {
  const [modalAdicionar, setModalAdicionar] = useState<boolean>(false);
  const context = useContext(AuthContext);
  const { signOut } = context;

  const openModal = () => setModalAdicionar(true);
  const closeModal = () => setModalAdicionar(false);

  return (
    <View style={styles.sidebar}>
      <View style={styles.sidebarItem}>
        <TouchableOpacity onPress={openModal} style={styles.iconButton}>
          <FontAwesome name="plus" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.sidebarItem}>
        <TouchableOpacity onPress={signOut} style={styles.iconButton}>
          <FontAwesome name="sign-out" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <ModalAdicionarEvento isOpen={modalAdicionar} onClose={closeModal} />
    </View>
  );
};

export default Sidebar;