import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SideBar.module.css'; 
import { LiaSignOutAltSolid } from 'react-icons/lia';
import { IoTrashOutline } from 'react-icons/io5';
import { TbEditCircle } from 'react-icons/tb';
import { FiPlusCircle } from 'react-icons/fi';

const Sidebar = () => {

  const navigate = useNavigate();


  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarItem}>
        <Link to="/create-event">
          <FiPlusCircle size={24} color='black' />
        </Link>
      </div>
      <div className={styles.sidebarItem}>
        <Link to="/edit-event">
          <TbEditCircle size={24} color='black' />
        </Link>
      </div>
      <div className={styles.sidebarItem}>
        <Link to="/delete-event">
          <IoTrashOutline size={24} color='black' />
        </Link>
      </div>
      <div className={styles.sidebarItem}>
        <Link>
          <LiaSignOutAltSolid size={24} color='black' />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;