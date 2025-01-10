import React, { useContext, useState } from 'react';
import styles from './SideBar.module.css'; 
import { LiaSignOutAltSolid } from 'react-icons/lia';
import { FiPlusCircle } from 'react-icons/fi';

import ModalAdicionarEvento from '../../components/ModalAdicionarEvento/index';
import { AuthContext } from '../../context/Auth';

const Sidebar = () => {
  const [ModalAdicionar, setModalAdicionar] = useState(false);
  const { signOut } = useContext(AuthContext);
  const openModal = () => setModalAdicionar(true);
  const closeModal = () => setModalAdicionar(false);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarItem}>
        <FiPlusCircle 
          size={24} 
          color="black" 
          onClick={openModal} 
          title='Adicionar Evento'
        />
      </div>

      <div className={styles.sidebarItem}>
        <button 
          onClick={signOut}
          title="Deslogar"
        >
          <LiaSignOutAltSolid size={24} color="black" />
        </button>
      </div>
      <ModalAdicionarEvento isOpen={ModalAdicionar} onClose={closeModal} />
    </div>
  );
};

export default Sidebar;