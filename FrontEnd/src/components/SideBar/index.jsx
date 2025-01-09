import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SideBar.module.css'; 
import { LiaSignOutAltSolid } from 'react-icons/lia';
import { FiPlusCircle } from 'react-icons/fi';
import ModalAdicionarEvento from '../../components/ModalAdicionarEvento/index';

const Sidebar = () => {
  const [ModalAdicionar, setModalAdicionar] = useState(false);
  
  const openModal = () => setModalAdicionar(true);
  const closeModal = () => setModalAdicionar(false);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarItem}>
        <FiPlusCircle size={24} color="black" onClick={openModal} />
      </div>
      <div className={styles.sidebarItem}>
        <Link>
          <LiaSignOutAltSolid size={24} color="black" />
        </Link>
      </div>
      <ModalAdicionarEvento isOpen={ModalAdicionar} onClose={closeModal} />
    </div>
  );
};

export default Sidebar;